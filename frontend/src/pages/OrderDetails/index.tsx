import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useOrder } from "../../hooks/useOrders";
import { useOrderEvents } from "../../hooks/useOrderEvents";

import { OrderInfo } from "./components/OrderInfo";
import { OrderInfoSkeleton } from "./components/OrderInfoSkeleton";

import { OrderItemTable } from "./components/OrderItemTable";
import { OrderItemTableSkeleton } from "./components/OrderItemTableSkeleton";

import { OrderTimeline } from "./components/OrderTimeline";
import { OrderTimelineSkeleton } from "./components/OrderTimelineSkeleton";

import { translateOrderStatus } from "../../utils/translateOrderStatus";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useOrder(id!);

  const {
    data: events = [],
  } = useOrderEvents(id!);

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Box mb={4}>
          <Typography
            variant="h5"
            fontWeight={600}
          >
            Pedido #
            {id?.slice(-8).toUpperCase()}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Detalhes do pedido
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <OrderInfoSkeleton />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <OrderTimelineSkeleton />
          </Grid>

          <Grid size={12}>
            <OrderItemTableSkeleton />
          </Grid>
        </Grid>
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
            Não foi possível carregar o pedido
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Ocorreu um erro ao buscar os dados
            do pedido. Tente novamente.
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

  if (!order) {
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
            Pedido não encontrado
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            O pedido informado não existe ou
            não está mais disponível.
          </Typography>
        </Stack>
      </Box>
    );
  }

  const chipColor =
    order.status === "APPROVED"
      ? "success"
      : order.status === "REJECTED"
        ? "error"
        : order.status ===
          "PROCESSING_PAYMENT"
          ? "warning"
          : "default";

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            letterSpacing="-0.02em"
          >
            Pedido #
            {order.id
              .slice(-8)
              .toUpperCase()}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Detalhes do pedido
          </Typography>
        </Box>

        <Chip
          label={translateOrderStatus(order.status)}
          color={chipColor}
          sx={{
            px: 1,
            fontWeight: 600,
          }}
        />
      </Stack>

      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <OrderInfo order={order} />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <OrderTimeline
            events={events}
          />
        </Grid>

        <Grid size={12}>
          <OrderItemTable
            order={order}
          />
        </Grid>
      </Grid>
    </Box>
  );
}