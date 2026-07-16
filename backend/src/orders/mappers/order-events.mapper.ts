import { OrderEvent } from '@prisma/client';

import { OrderEventResponseDto } from '../dto/order-event-response.dto';

export class OrderEventsMapper {
  static toResponse(
    event: OrderEvent,
  ): OrderEventResponseDto {
    return {
      id: event.id,
      status: event.status,
      message: event.message,
      createdAt: event.createdAt,
    };
  }
}