import { OrderEvent, Prisma } from '@prisma/client';
import { OrderResponseDto } from '../dto/order-response.dto';
import { OrderEventResponseDto } from '../dto/order-event-response.dto';

type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: true;
  };
}>;

export class OrdersMapper {
  static toResponse(order: OrderWithItems): OrderResponseDto {
    return {
      id: order.id,
      status: order.status,
      total: Number(order.total),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        subtotal: Number(item.subtotal),
      })),
    };
  }

  static toEventResponse(event: OrderEvent): OrderEventResponseDto {
  return {
    id: event.id,
    status: event.status,
    message: event.message,
    createdAt: event.createdAt,
  };
}
}