import { ApiProperty } from '@nestjs/swagger';

export class RevenuePerDayDto {
  @ApiProperty({
    example: '2026-07-31',
  })
  date!: string;

  @ApiProperty({
    example: 1542.9,
  })
  revenue!: number;
}