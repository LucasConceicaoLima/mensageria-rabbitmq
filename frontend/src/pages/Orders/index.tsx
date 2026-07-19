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

  return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
      >
        Orders
      </Typography>

      {isLoading ? (
        <OrdersTableSkeleton />
      ) : (
        <OrdersTable orders={orders} />
      )}
    </Box>
  );
}