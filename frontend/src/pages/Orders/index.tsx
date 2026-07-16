import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useOrders } from "../../hooks/useOrders";

import { OrdersTable } from "./components/OrdersTable";

export default function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
  } = useOrders();

  return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
      >
        Orders
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <OrdersTable orders={orders} />
      )}
    </Box>
  );
}