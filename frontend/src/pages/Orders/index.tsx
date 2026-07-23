import {
  Box,
  Typography,
} from "@mui/material";

import { useOrders } from "../../hooks/useOrders";
import { OrdersTable } from "./components/OrdersTable";
import { OrdersTableSkeleton } from "./components/OrdersTableSkeleton";

export default function OrdersPage() {

  const {
    data: orders = [],
    isLoading,
  } = useOrders();

  if (isLoading) {
    return <OrdersTableSkeleton />;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
      >
        Orders
      </Typography>

      {orders.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={8}
          gap={2}
        >
          <Typography variant="h6">
            No orders found
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
          >
            Create your first order to start
            tracking its processing.
          </Typography>

        </Box>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </Box>
  );
}