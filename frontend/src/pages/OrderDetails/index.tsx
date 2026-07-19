import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

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
          {loading ? (
            <OrderItemTableSkeleton />
          ) : (
            <OrderItemTable order={order!} />
          )}
        </Grid>

        <Grid size={4}>
          {loading ? (
            <OrderInfoSkeleton />
          ) : (
            <OrderInfo order={order!} />
          )}
        </Grid>

        <Grid size={12}>
          {loading ? (
            <OrderTimelineSkeleton />
          ) : (
            <OrderTimeline events={events} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}