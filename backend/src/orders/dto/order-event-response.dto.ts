import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class OrderEventResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: OrderStatus,
  })
  status!: OrderStatus;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  createdAt!: Date;
}
