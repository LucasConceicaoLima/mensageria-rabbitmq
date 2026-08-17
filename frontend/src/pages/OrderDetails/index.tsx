import { useParams } from "react-router-dom";

import {
  Box,
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

export default function OrderDetailsPage() {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
  } = useOrder(id!);

  const {
    data: events = [],
  } = useOrderEvents(id!);

  if (!order && !isLoading) {
    return (
      <Typography>
        Order not found.
      </Typography>
    );
  }

  const chipColor =
    order?.status === "APPROVED"
      ? "success"
      : order?.status === "REJECTED"
      ? "error"
      : order?.status ===
        "PROCESSING_PAYMENT"
      ? "warning"
      : "default";

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4">
            {isLoading
              ? "Order"
              : `Order #${order!.id
                  .slice(-8)
                  .toUpperCase()}`}
          </Typography>

          <Typography
            color="text.secondary"
            mt={0.5}
          >
            Monitor every stage of this
            order processing.
          </Typography>
        </Box>

        {!isLoading && (
          <Chip
            label={order!.status}
            color={chipColor}
            sx={{
              px: 1,
              fontWeight: 700,
            }}
          />
        )}
      </Stack>

      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          {isLoading ? (
            <OrderInfoSkeleton />
          ) : (
            <OrderInfo order={order!} />
          )}
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          {isLoading ? (
            <OrderTimelineSkeleton />
          ) : (
            <OrderTimeline
              events={events}
            />
          )}
        </Grid>

        <Grid size={12}>
          {isLoading ? (
            <OrderItemTableSkeleton />
          ) : (
            <OrderItemTable
              order={order!}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}