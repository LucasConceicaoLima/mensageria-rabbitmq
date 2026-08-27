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
  MAX_RETRIES,
  RETRY_DELAY,
} from './rabbitmq.constants';

@Injectable()
export class RabbitMQService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(
    RabbitMQService.name,
  );

  private connection!: amqp.ChannelModel;
  private channel!: amqp.Channel;

  async onModuleInit() {
    const url =
      this.configService.get<string>('RABBITMQ_URL');

    if (!url) {
      throw new Error('RABBITMQ_URL not configured.');
    }

    this.connection = await amqp.connect(url);

    this.channel =
      await this.connection.createChannel();

    await this.channel.assertQueue(
      RABBITMQ_QUEUE,
      {
        durable: true,
      },
    );

    await this.channel.assertQueue(
      RABBITMQ_RETRY_QUEUE,
      {
        durable: true,
        arguments: {
          'x-message-ttl': RETRY_DELAY,
          'x-dead-letter-exchange': '',
          'x-dead-letter-routing-key':
            RABBITMQ_QUEUE,
        },
      },
    );

    this.logger.log(
      'Connected to RabbitMQ',
    );

    this.logger.log(
      `Queue "${RABBITMQ_QUEUE}" is ready`,
    );

    this.logger.log(
      `Retry queue "${RABBITMQ_RETRY_QUEUE}" is ready`,
    );
  }

  constructor(
    private readonly configService: ConfigService,
  ) {}

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }

  getChannel() {
    return this.channel;
  }

  publish<T>(
    queue: string,
    message: T,
  ): boolean {
    const published =
      this.channel.sendToQueue(
        queue,
        Buffer.from(
          JSON.stringify(message),
        ),
        {
          persistent: true,
        },
      );

    this.logger.log(
      `Message published to "${queue}"`,
    );

    return published;
  }

  async consume(
    queue: string,
    callback: (
      message: unknown,
    ) => Promise<void>,
  ) {
    await this.channel.consume(
      queue,
      (msg) => {
        if (!msg) {
          return;
        }

        void (async () => {
          try {
            const content: unknown =
              JSON.parse(
                msg.content.toString(),
              );

            await callback(content);

            this.channel.ack(msg);
          } catch (error) {
            this.logger.error(
              'Error processing message',
              error,
            );

            await this.handleRetry(
              queue,
              msg,
            );
          }
        })();
      },
    );

    this.logger.log(
      `Consuming queue "${queue}"`,
    );
  }

  private async handleRetry(
    queue: string,
    msg: amqp.ConsumeMessage,
  ) {
    const retryCount = Number(
      msg.properties.headers?.[
        'x-retry-count'
      ] ?? 0,
    );

    if (retryCount >= MAX_RETRIES) {
      this.logger.error(
        `Message exceeded maximum retries (${MAX_RETRIES}).`,
      );

      this.channel.nack(
        msg,
        false,
        false,
      );

      return;
    }

    const nextRetryCount =
      retryCount + 1;

    this.channel.sendToQueue(
      RABBITMQ_RETRY_QUEUE,
      msg.content,
      {
        persistent: true,
        headers: {
          ...msg.properties.headers,
          'x-retry-count':
            nextRetryCount,
        },
      },
    );

    this.logger.warn(
      `Message sent to retry queue. Attempt ${nextRetryCount}/${MAX_RETRIES}.`,
    );

    this.channel.ack(msg);
  }
}