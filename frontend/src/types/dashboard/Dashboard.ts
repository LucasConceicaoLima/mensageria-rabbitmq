import type { DashboardKPIs } from "./DashboardKPIs";
import type { DashboardStatus } from "./DashboardStatus";
import type { LatestOrders } from "./LatestOrders";
import type { TopProducts } from "./TopProducts";
import type { OrdersTimeline } from "./OrdersTimeline";
import type { RevenueTimeline } from "./RevenueTimeline";

export type Dashboard = {
  kpis: DashboardKPIs;
  status: DashboardStatus;
  ordersPerDay: OrdersTimeline[];
  revenuePerDay: RevenueTimeline[];
  latestOrders: LatestOrders[];
  topProducts: TopProducts[];
};