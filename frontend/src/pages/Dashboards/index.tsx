import {
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useOrders } from "../../hooks/useOrders";
import { DashboardCard } from "./components/DashboardCard";
import { OrderStatusChart } from "./components/OrderStatusChart";
import { RevenueChart } from "./components/RevenueChart";
import { LatestOrders } from "./components/LatestOrders";
import { DashboardCardSkeleton } from "./components/DashboardCardSkeleton";
import { RevenueChartSkeleton } from "./components/RevenueChartSkeleton";
import { LatestOrdersSkeleton } from "./components/LatestOrdersSkeleton";
import { OrderStatusChartSkeleton } from "./components/OrderStatusChartSkeleton";

export default function Dashboard() {
  const { data: orders = [], isLoading } = useOrders();

  const metrics = useMemo(() => {
    const pendingOrders = orders.filter(
      (o) => o.status === "PENDING",
    );

    const processingOrders = orders.filter(
      (o) => o.status === "PROCESSING_PAYMENT",
    );

    const approvedOrders = orders.filter(
      (o) => o.status === "APPROVED",
    );

    const rejectedOrders = orders.filter(
      (o) => o.status === "REJECTED",
    );

    const sum = (list: typeof orders) => list.reduce((acc, order) => acc + order.total, 0);

    return {
      total: orders.length,
      pending: pendingOrders.length,
      processing: processingOrders.length,
      approved: approvedOrders.length,
      rejected: rejectedOrders.length,
      pendingRevenue: sum(pendingOrders),
      processingRevenue: sum(processingOrders),
      approvedRevenue: sum(approvedOrders),
      rejectedRevenue: sum(rejectedOrders),
    };
  }, [orders]);

  const latestOrders = useMemo(
    () => orders.slice(0, 5),
    [orders],
  );

  return (
    <Stack spacing={4}>
      <Stack>
        <Typography variant="h4">
          Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          variant="body1"
        >
          Monitor the asynchronous order
          processing pipeline.
        </Typography>
      </Stack>

      {isLoading ? (
        <>
          <Grid
            container
            spacing={3}
          >
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <Grid
                  key={index}
                  size={{ xs: 12, md: 3 }}
                >
                  <DashboardCardSkeleton />
                </Grid>
              ),
            )}
          </Grid>

          <Grid
            container
            spacing={3}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <OrderStatusChartSkeleton />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RevenueChartSkeleton />
            </Grid>
          </Grid>

          <LatestOrdersSkeleton />
        </>
      ) : orders.length === 0 ? (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ py: 10 }}
        >
          <Typography variant="h6">
            No data available
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
          >
            Create your first order to view
            charts, metrics and recent activity.
          </Typography>
        </Stack>
      ) : (
        <>
          <Grid
            container
            spacing={3}
          >
            <Grid size={{ xs: 12, md: 3 }}>
              <DashboardCard
                title="Total Orders"
                value={metrics.total}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <DashboardCard
                title="Pending"
                value={metrics.pending}
                color="warning.main"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <DashboardCard
                title="Approved"
                value={metrics.approved}
                color="success.main"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <DashboardCard
                title="Rejected"
                value={metrics.rejected}
                color="error.main"
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <OrderStatusChart
                pending={metrics.pending}
                processing={metrics.processing}
                approved={metrics.approved}
                rejected={metrics.rejected}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RevenueChart
                pending={metrics.pendingRevenue}
                processing={metrics.processingRevenue}
                approved={metrics.approvedRevenue}
                rejected={metrics.rejectedRevenue}
              />
            </Grid>
          </Grid>

          <LatestOrders
            orders={latestOrders}
          />
        </>
      )}
    </Stack>
  );
}