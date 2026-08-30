import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderStatus } from '@prisma/client';

import { OrdersRepository } from './repositories/orders.repository';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly configService: ConfigService,
  ) {}

  async process(orderId: string): Promise<void> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found.`);
    }

    const simulateError =
      this.configService.get<string>('SIMULATE_PAYMENT_ERROR') === 'true';

    if (simulateError) {
      throw new Error('Erro simulado para testar retry.');
    }

    const started = await this.ordersRepository.executeTransaction(
      async (tx) => {
        const updated = await this.ordersRepository.startPayment(order.id, tx);

        if (!updated) {
          return false;
        }

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

        return true;
      },
    );

    if (!started) {
      this.logger.warn(
        `Order ${order.id} is already being processed or has been processed.`,
      );

      return;
    }

    this.logger.log(`Order ${order.id} is now PROCESSING_PAYMENT.`);

    await this.sleep(3000);

    const approved = Number(order.total) <= 1000;

    const finalStatus = approved ? OrderStatus.APPROVED : OrderStatus.REJECTED;

    await this.ordersRepository.executeTransaction(async (tx) => {
      await this.ordersRepository.updateStatus(
        order.id,
        finalStatus,
        {
          approvedAt: approved ? new Date() : null,
        },
        tx,
      );

      await this.ordersRepository.createEvent(
        {
          status: finalStatus,
          message: approved ? 'Payment approved.' : 'Payment rejected.',
          order: {
            connect: {
              id: order.id,
            },
          },
        },
        tx,
      );
    });

    this.logger.log(`Order ${order.id} finished with status ${finalStatus}.`);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
