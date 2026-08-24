import { Injectable } from '@nestjs/common';

import { DashboardRepository } from './repositories/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async findDashboard() {
    const [
      kpis,
      status,
      ordersPerDay,
      revenuePerDay,
      latestOrders,
      topProducts,
    ] = await Promise.all([
      this.dashboardRepository.getKPIs(),
      this.dashboardRepository.getStatusSummary(),
      this.dashboardRepository.getOrdersTimeline(),
      this.dashboardRepository.getRevenueTimeline(),
      this.dashboardRepository.getLatestOrders(),
      this.dashboardRepository.getTopProducts(),
    ]);

    return {
      kpis,
      status,
      ordersPerDay,
      revenuePerDay,
      latestOrders,
      topProducts,
    };
  }
}
