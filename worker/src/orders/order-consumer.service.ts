import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RABBITMQ_QUEUE } from '../rabbitmq/rabbitmq.constants';
import { PaymentService } from './payment.service';

type OrderCreatedMessage = {
  event: string;
  orderId: string;
  total: number;
};

@Injectable()
export class OrderConsumerService implements OnModuleInit {
  private readonly logger = new Logger(OrderConsumerService.name);

  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly paymentService: PaymentService,
  ) {}

  async onModuleInit() {
    await this.rabbitMQService.consume(
      RABBITMQ_QUEUE,
      async (message) => {
        await this.handleMessage(message as OrderCreatedMessage);
      },
    );
  }

  private async handleMessage(message: OrderCreatedMessage) {
    this.logger.log(
      `Received order ${message.orderId}`,
    );

    await this.paymentService.process(message.orderId);
  }
}