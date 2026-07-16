import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

import { OrdersRepository } from './repositories/orders.repository';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async process(orderId: string): Promise<void> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(
        `Order ${orderId} not found.`,
      );
    }

    // Atualiza para PROCESSING_PAYMENT
    await this.ordersRepository.executeTransaction(async (tx) => {
      await this.ordersRepository.updateStatus(
        order.id,
        OrderStatus.PROCESSING_PAYMENT,
        tx,
      );

      await this.ordersRepository.createEvent(
        {
          status: OrderStatus.PROCESSING_PAYMENT,
          message: 'Processing payment.',
          order: {
            connect: {
              id: order.id,
            },
          },
        },
        tx,
      );
    });

    this.logger.log(
      `Order ${order.id} is now PROCESSING_PAYMENT.`,
    );

    // Simula o tempo de um gateway de pagamento
    await this.sleep(3000);

    // Regra de aprovação (temporária)
    const approved = Number(order.total) <= 1000;

    const finalStatus = approved
      ? OrderStatus.APPROVED
      : OrderStatus.REJECTED;

    // Atualiza o status final
    await this.ordersRepository.executeTransaction(async (tx) => {
      await this.ordersRepository.updateStatus(
        order.id,
        finalStatus,
        tx,
      );

      await this.ordersRepository.createEvent(
        {
          status: finalStatus,
          message: approved
            ? 'Payment approved.'
            : 'Payment rejected.',
          order: {
            connect: {
              id: order.id,
            },
          },
        },
        tx,
      );
    });

    this.logger.log(
      `Order ${order.id} finished with status ${finalStatus}.`,
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}