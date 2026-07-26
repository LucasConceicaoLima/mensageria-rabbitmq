import { Controller, Post } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ORDER_CREATED_EVENT, RABBITMQ_QUEUE } from './rabbitmq.constants';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('test')
  publishTestMessage() {
    this.rabbitMQService.publish(RABBITMQ_QUEUE, {
      event: ORDER_CREATED_EVENT,
      orderId: 'test-order-123',
      total: 199.9,
    });

    return {
      message: 'Message published successfully.',
    };
  }
}
