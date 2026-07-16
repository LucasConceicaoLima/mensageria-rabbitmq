import { Injectable } from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        events: true,
      },
    });
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
    tx: Prisma.TransactionClient = this.prisma,
  ) {
    return tx.order.update({
      where: { id },
      data: {
        status,
      },
      include: {
        items: true,
        events: true,
      },
    });
  }

  async createEvent(
    data: Prisma.OrderEventCreateInput,
    tx: Prisma.TransactionClient = this.prisma,
  ) {
    return tx.orderEvent.create({
      data,
    });
  }

  async findEvents(orderId: string) {
    return this.prisma.orderEvent.findMany({
      where: {
        orderId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async executeTransaction<T>(
    callback: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(callback);
  }
}