import { ApiProperty } from '@nestjs/swagger';

import { DashboardKPIsDto } from './dashboard-kpis.dto';
import { DashboardStatusDto } from './dashboard-status.dto';
import { LatestOrderDto } from './latest-order.dto';
import { TopProductDto } from './top-product.dto';
import { OrdersPerDayDto } from './orders-per-day.dto';
import { RevenuePerDayDto } from './revenue-per-day.dto';

export class DashboardResponseDto {
  @ApiProperty({
    type: DashboardKPIsDto,
  })
  kpis!: DashboardKPIsDto;

  @ApiProperty({
    type: DashboardStatusDto,
  })
  status!: DashboardStatusDto;

  @ApiProperty({
    type: [OrdersPerDayDto],
  })
  ordersPerDay!: OrdersPerDayDto[];

  @ApiProperty({
    type: [RevenuePerDayDto],
  })
  revenuePerDay!: RevenuePerDayDto[];

  @ApiProperty({
    type: [LatestOrderDto],
  })
  latestOrders!: LatestOrderDto[];

  @ApiProperty({
    type: [TopProductDto],
  })
  topProducts!: TopProductDto[];
}