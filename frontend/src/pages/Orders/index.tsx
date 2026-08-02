import { useMemo, useState } from "react";

import {
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  Badge
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useOrders } from "../../hooks/useOrders";
import { OrdersTable } from "./components/OrdersTable";
import { OrdersTableSkeleton } from "./components/OrdersTableSkeleton";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const {
    data: orders = [],
    isLoading,
  } = useOrders();

  const counts = useMemo(
    () => ({
      ALL: orders.length,
      PENDING: orders.filter(
        (o) => o.status === "PENDING",
      ).length,
      PROCESSING_PAYMENT: orders.filter(
        (o) =>
          o.status === "PROCESSING_PAYMENT",
      ).length,
      APPROVED: orders.filter(
        (o) => o.status === "APPROVED",
      ).length,
      REJECTED: orders.filter(
        (o) => o.status === "REJECTED",
      ).length,
    }),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        order.id
          .toLowerCase()
          .includes(query) ||
        order.status
          .toLowerCase()
          .includes(query) ||
        order.items.some((item) =>
          item.product.name
            .toLowerCase()
            .includes(query),
        );

      const matchesStatus =
        statusFilter === "ALL" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [orders, search, statusFilter]);

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

      {orders.length > 0 && (
        <>
          <TextField
            fullWidth
            size="small"
            placeholder="Search orders..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Tabs
            value={statusFilter}
            onChange={(_, value) =>
              setStatusFilter(value)
            }
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 3
            }}
          >
            <Tab
              value="ALL"
              label={
                <Badge
                  color="primary"
                  badgeContent={counts.ALL}
                  max={99}
                >
                  <Box pr={2}>All</Box>
                </Badge>
              }
            />

            <Tab
              value="PENDING"
              label={
                <Badge
                  color="warning"
                  badgeContent={counts.PENDING}
                  max={99}
                >
                  <Box pr={2}>Pending</Box>
                </Badge>
              }
            />

            <Tab
              value="PROCESSING_PAYMENT"
              label={
                <Badge
                  color="info"
                  badgeContent={
                    counts.PROCESSING_PAYMENT
                  }
                  max={99}
                >
                  <Box pr={2}>Processing</Box>
                </Badge>
              }
            />

            <Tab
              value="APPROVED"
              label={
                <Badge
                  color="success"
                  badgeContent={counts.APPROVED}
                  max={99}
                >
                  <Box pr={2}>Approved</Box>
                </Badge>
              }
            />

            <Tab
              value="REJECTED"
              label={
                <Badge
                  color="error"
                  badgeContent={counts.REJECTED}
                  max={99}
                >
                  <Box pr={2}>Rejected</Box>
                </Badge>
              }
            />
          </Tabs>
        </>
      )}

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
      ) : filteredOrders.length === 0 ? (
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
            No orders match the selected filters.
          </Typography>
        </Box>
      ) : (
        <OrdersTable
          orders={filteredOrders}
        />
      )}
    </Box>
  );
}