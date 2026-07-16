import { Module } from '@nestjs/common';

import { OrdersRepository } from './repositories/orders.repository';
import { OrderConsumerService } from './order-consumer.service';
import { PaymentService } from './payment.service';

@Module({
  providers: [
    OrdersRepository,
    OrderConsumerService,
    PaymentService,
  ],
})
export class OrdersModule {}