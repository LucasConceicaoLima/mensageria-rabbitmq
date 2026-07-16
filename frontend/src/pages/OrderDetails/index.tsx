import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { useParams } from "react-router-dom";

import { useOrder } from "../../hooks/useOrders";
import { OrderInfo } from "./components/OrderInfo";
import { OrderItemTable } from "./components/OrderItemTable";
import { OrderTimeline } from "./components/OrderTimeline";
import { useOrderEvents } from "../../hooks/useOrderEvents";

export default function OrderDetailsPage() {
 const { id } = useParams();

const {
  data: order,
  isLoading,
} = useOrder(id!);

const {
  data: events = [],
} = useOrderEvents(id!);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!order) {
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

      <Grid
        container
        spacing={3}
      >
        <Grid size={8}>
          <OrderItemTable order={order} />
        </Grid>

        <Grid size={4}>
          <OrderInfo order={order} />
        </Grid>

        <Grid size={12}>
          <OrderTimeline events={events} />
        </Grid>
      </Grid>
    </Box>
  );
}