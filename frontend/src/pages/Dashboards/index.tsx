import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";

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
    isError,
    refetch,
  } = useDashboard();

  if (isLoading) {
    return (
      <Box sx={{ m: 3 }}>
        <Stack spacing={4}>
          <Grid container spacing={3}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={index}
                size={{ xs: 12, sm: 6, md: 3 }}
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
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
        >
          <Typography
            variant="h6"
            fontWeight={600}
          >
            Não foi possível carregar o dashboard
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Ocorreu um erro ao buscar os dados.
            Tente novamente.
          </Typography>

          <Button
            variant="contained"
            onClick={() => refetch()}
          >
            Tentar novamente
          </Button>
        </Stack>
      </Box>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <Box sx={{ m: 3 }}>
      <Stack spacing={4}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <DashboardCard
              title="Pedidos"
              value={dashboard.kpis.totalOrders}
              icon={<ShoppingCartIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <DashboardCard
              title="Receita"
              value={dashboard.kpis.totalRevenue}
              currency
              icon={<PaymentsIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <DashboardCard
              title="Ticket Médio"
              value={dashboard.kpis.averageTicket}
              currency
              icon={<ReceiptLongIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <DashboardCard
              title="Produtos Vendidos"
              value={dashboard.kpis.productsSold}
              icon={<Inventory2Icon />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              title="Taxa de Aprovação"
              value={dashboard.kpis.approvalRate}
              suffix="%"
              icon={<CheckCircleIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              title="Taxa de Rejeição"
              value={dashboard.kpis.rejectionRate}
              suffix="%"
              icon={<CancelIcon />}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              title="Tempo Médio de Processamento"
              value={dashboard.kpis.averageProcessingTime}
              suffix=" min"
              icon={<ScheduleIcon />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <OrderStatusChart
              pending={dashboard.status.pending}
              processing={dashboard.status.processing}
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

        {/* Orders */}
        <OrdersTimeline
          data={dashboard.ordersPerDay}
        />

        {/* Tables */}
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
    </Box>
  );
}