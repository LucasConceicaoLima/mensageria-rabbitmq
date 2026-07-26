import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { RABBITMQ_QUEUE } from './rabbitmq.constants';

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

    await this.channel.assertQueue(RABBITMQ_QUEUE, {
      durable: true,
    });

    this.logger.log('Connected to RabbitMQ');
    this.logger.log(`Queue "${RABBITMQ_QUEUE}" is ready`);
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
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

    this.logger.log(`Message published to "${queue}"`);

    return published;
  }
}
