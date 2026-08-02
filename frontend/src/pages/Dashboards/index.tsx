import {
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useDashboard } from "../../hooks/useDashboard";

import { DashboardCard } from "./components/DashboardCard";
import { DashboardCardSkeleton } from "./components/DashboardCardSkeleton";

import { OrderStatusChart } from "./components/OrderStatusChart";
import { OrderStatusChartSkeleton } from "./components/OrderStatusChartSkeleton";

import { RevenueTimeline } from "./components/RevenueTimeline";
import { RevenueTimelineSkeleton } from "./components/RevenueTimelineSkeleton";

import { OrdersTimeline } from "./components/OrdersTimeline";
import { OrdersTimelineSkeleton } from "./components/OrdersTimelineSkeleton";

import { LatestOrders } from "./components/LatestOrders";
import { LatestOrdersSkeleton } from "./components/LatestOrdersSkeleton";

import { TopProducts } from "./components/TopProducts";
import { TopProductsSkeleton } from "./components/TopProductsSkeleton";

export default function Dashboard() {
  const {
    data: dashboard,
    isLoading,
  } = useDashboard();

  if (isLoading) {
    return (
      <Stack spacing={4}>
        <Grid container spacing={3}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 3 }}
            >
              <DashboardCardSkeleton />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
            >
              <DashboardCardSkeleton />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <OrderStatusChartSkeleton />
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <RevenueTimelineSkeleton />
          </Grid>
        </Grid>

        <OrdersTimelineSkeleton />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <LatestOrdersSkeleton />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TopProductsSkeleton />
          </Grid>
        </Grid>
      </Stack>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <Stack spacing={4}>
      <Stack>
        <Typography variant="h4">
          Dashboard
        </Typography>

        <Typography color="text.secondary">
          Monitor the asynchronous order processing pipeline.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard
            title="Orders"
            value={dashboard.kpis.totalOrders}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard
            title="Revenue"
            value={dashboard.kpis.totalRevenue}
            color="success.main"
            currency
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard
            title="Average Ticket"
            value={dashboard.kpis.averageTicket}
            color="warning.main"
            currency
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard
            title="Products Sold"
            value={dashboard.kpis.productsSold}
            color="info.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard
            title="Approval Rate"
            value={dashboard.kpis.approvalRate}
            color="success.main"
            suffix="%"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard
            title="Rejection Rate"
            value={dashboard.kpis.rejectionRate}
            color="error.main"
            suffix="%"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard
            title="Avg Processing"
            value={
              dashboard.kpis.averageProcessingTime
            }
            color="secondary.main"
            suffix=" min"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <OrderStatusChart
            pending={dashboard.status.pending}
            processing={
              dashboard.status.processing
            }
            approved={dashboard.status.approved}
            rejected={dashboard.status.rejected}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <RevenueTimeline
            data={dashboard.revenuePerDay}
          />
        </Grid>
      </Grid>

      <OrdersTimeline
        data={dashboard.ordersPerDay}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LatestOrders
            orders={dashboard.latestOrders}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopProducts
            products={dashboard.topProducts}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}