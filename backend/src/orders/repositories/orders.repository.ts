import { Injectable } from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.OrderCreateInput,
    tx: Prisma.TransactionClient = this.prisma,
  ) {
    return tx.order.create({
      data,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        events: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        events: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
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
        items: {
          include: {
            product: true,
          },
        },
        events: true,
      },
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
}
