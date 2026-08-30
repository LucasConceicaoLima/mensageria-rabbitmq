import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersMapper } from './mappers/orders.mapper';
import { OrdersRepository } from './repositories/orders.repository';
import { ProductsRepository } from '../products/repositories/products.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

import {
  ORDER_CREATED_EVENT,
  RABBITMQ_QUEUE,
} from '../rabbitmq/rabbitmq.constants';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ordersRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async create(dto: CreateOrderDto) {
    const productIds = dto.items.map((item) => item.productId);

    const products = await this.productsRepository.findManyByIds(productIds);

    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products were not found.');
    }

    const productsMap = new Map(
      products.map((product) => [product.id, product]),
    );

    let total = new Prisma.Decimal(0);

    const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];

    for (const item of dto.items) {
      const product = productsMap.get(item.productId);

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found.`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for "${product.name}".`,
        );
      }

      const subtotal = product.price.mul(item.quantity);

      total = total.plus(subtotal);

      orderItems.push({
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal,
        product: {
          connect: {
            id: product.id,
          },
        },
      });
    }

    const order = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await this.ordersRepository.create(
        {
          status: OrderStatus.PENDING,
          total,
          items: {
            create: orderItems,
          },
          events: {
            create: [
              {
                status: OrderStatus.PENDING,
                message: 'Order created.',
              },
            ],
          },
        },
        tx,
      );

      for (const item of dto.items) {
        await this.productsRepository.decreaseStock(
          item.productId,
          item.quantity,
          tx,
        );
      }

      return createdOrder;
    });

    this.rabbitMQService.publish(RABBITMQ_QUEUE, {
      event: ORDER_CREATED_EVENT,
      orderId: order.id,
      total: Number(order.total),
    });

    return OrdersMapper.toResponse(order);
  }

  async findAll() {
    const orders = await this.ordersRepository.findAll();

    return orders.map((order) => OrdersMapper.toResponse(order));
  }

  async findById(id: string) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    return OrdersMapper.toResponse(order);
  }

  async findEvents(orderId: string) {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    const events = await this.ordersRepository.findEvents(orderId);

    return events.map((event) => OrdersMapper.toEventResponse(event));
  }

  async reprocessDlq() {
    return this.rabbitMQService.reprocessFromDlq();
  }
}
