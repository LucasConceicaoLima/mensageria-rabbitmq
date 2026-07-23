import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
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

  return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
      >
        Order Details
      </Typography>

      <Grid container spacing={3}>
        <Grid size={8}>
          {isLoading ? (
            <OrderItemTableSkeleton />
          ) : (
            <OrderItemTable order={order!} />
          )}
        </Grid>

        <Grid size={4}>
          {isLoading ? (
            <OrderInfoSkeleton />
          ) : (
            <OrderInfo order={order!} />
          )}
        </Grid>

        <Grid size={12}>
          {isLoading ? (
            <OrderTimelineSkeleton />
          ) : (
            <OrderTimeline events={events} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}