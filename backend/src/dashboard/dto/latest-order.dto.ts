import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class LatestOrderDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: OrderStatus,
  })
  status!: OrderStatus;

  @ApiProperty()
  total!: number;

  @ApiProperty()
  createdAt!: Date;
}