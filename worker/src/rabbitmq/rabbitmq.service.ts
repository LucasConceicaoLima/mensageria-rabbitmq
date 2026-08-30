import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

import {
  RABBITMQ_QUEUE,
  RABBITMQ_RETRY_QUEUE,
  RABBITMQ_DLQ,
  MAX_RETRIES,
  RETRY_DELAY,
} from './rabbitmq.constants';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);

  private connection!: amqp.ChannelModel;
  private channel!: amqp.Channel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const url = this.configService.get<string>('RABBITMQ_URL');

    if (!url) {
      throw new Error('RABBITMQ_URL not configured.');
    }

    this.connection = await amqp.connect(url);

    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(RABBITMQ_DLQ, {
      durable: true,
    });

    await this.channel.assertQueue(RABBITMQ_QUEUE, {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': RABBITMQ_DLQ,
      },
    });

    await this.channel.assertQueue(RABBITMQ_RETRY_QUEUE, {
      durable: true,
      arguments: {
        'x-message-ttl': RETRY_DELAY,
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': RABBITMQ_QUEUE,
      },
    });

    this.logger.log('[RABBITMQ] Connected successfully');

    this.logger.log(`[QUEUE] Main queue ready: ${RABBITMQ_QUEUE}`);

    this.logger.log(`[QUEUE] Retry queue ready: ${RABBITMQ_RETRY_QUEUE}`);

    this.logger.log(`[QUEUE] DLQ ready: ${RABBITMQ_DLQ}`);
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();

    this.logger.log('[RABBITMQ] Connection closed');
  }

  getChannel() {
    return this.channel;
  }

  publish<T>(queue: string, message: T): boolean {
    const published = this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    );

    const orderId =
      typeof message === 'object' && message !== null && 'orderId' in message
        ? String((message as { orderId: unknown }).orderId)
        : 'unknown';

    this.logger.log(
      `[PUBLISH] queue=${queue} orderId=${orderId} published=${published}`,
    );

    return published;
  }

  async consume(queue: string, callback: (message: unknown) => Promise<void>) {
    await this.channel.consume(queue, (msg) => {
      if (!msg) {
        return;
      }

      void (async () => {
        const startedAt = Date.now();

        try {
          const content: unknown = JSON.parse(msg.content.toString());

          const orderId =
            typeof content === 'object' &&
            content !== null &&
            'orderId' in content
              ? String(content.orderId)
              : 'unknown';

          const retryCount = Number(
            msg.properties.headers?.['x-retry-count'] ?? 0,
          );

          this.logger.log(
            `[CONSUME] queue=${queue} orderId=${orderId} attempt=${retryCount + 1}`,
          );

          await callback(content);

          this.channel.ack(msg);

          const duration = Date.now() - startedAt;

          this.logger.log(
            `[ACK] queue=${queue} orderId=${orderId} duration=${duration}ms`,
          );
        } catch (error) {
          const duration = Date.now() - startedAt;

          this.logger.error(
            `[ERROR] queue=${queue} duration=${duration}ms`,
            error instanceof Error ? error.stack : String(error),
          );

          await this.handleRetry(msg);
        }
      })();
    });

    this.logger.log(`[CONSUMER] Listening on queue=${queue}`);
  }

  private async handleRetry(msg: amqp.ConsumeMessage) {
    const retryCount = Number(msg.properties.headers?.['x-retry-count'] ?? 0);

    let orderId = 'unknown';

    try {
      const message = JSON.parse(msg.content.toString()) as {
        orderId?: string;
      };

      orderId = message.orderId ?? 'unknown';
    } catch {
      this.logger.warn('[RETRY] Could not extract orderId from message.');
    }

    if (retryCount >= MAX_RETRIES) {
      this.logger.error(
        `[DLQ] orderId=${orderId} attempts=${retryCount} destination=${RABBITMQ_DLQ}`,
      );

      this.channel.sendToQueue(RABBITMQ_DLQ, msg.content, {
        persistent: true,
        headers: {
          ...msg.properties.headers,
          'x-retry-count': retryCount,
        },
      });

      this.channel.ack(msg);

      return;
    }

    const nextRetryCount = retryCount + 1;

    this.channel.sendToQueue(RABBITMQ_RETRY_QUEUE, msg.content, {
      persistent: true,
      headers: {
        ...msg.properties.headers,
        'x-retry-count': nextRetryCount,
      },
    });

    this.logger.warn(
      `[RETRY] orderId=${orderId} attempt=${nextRetryCount}/${MAX_RETRIES} delay=${RETRY_DELAY}ms`,
    );

    this.channel.ack(msg);
  }
}
