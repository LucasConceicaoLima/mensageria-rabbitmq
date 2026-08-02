import { ApiProperty } from '@nestjs/swagger';

export class OrdersPerDayDto {
  @ApiProperty({
    example: '2026-07-31',
  })
  date!: string;

  @ApiProperty({
    example: 12,
  })
  totalOrders!: number;
}