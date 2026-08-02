import { ApiProperty } from '@nestjs/swagger';

export class DashboardKPIsDto {
  @ApiProperty()
  totalOrders!: number;

  @ApiProperty()
  totalRevenue!: number;

  @ApiProperty()
  averageTicket!: number;

  @ApiProperty()
  productsSold!: number;

  @ApiProperty({
    description: 'Percentage of approved orders.',
    example: 82.5,
  })
  approvalRate!: number;

  @ApiProperty({
    description: 'Percentage of rejected orders.',
    example: 12.5,
  })
  rejectionRate!: number;

  @ApiProperty({
    description: 'Average processing time in seconds.',
    example: 18,
  })
  averageProcessingTime!: number;
}