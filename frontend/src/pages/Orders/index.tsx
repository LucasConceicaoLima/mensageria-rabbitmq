import { useMemo, useState } from "react";

import {
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  Badge,
  Button,
  Stack,
  Paper,
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
    isError,
    refetch,
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
    return (
      <Paper
        elevation={5}
        sx={{
          m: 3,
          p: 5,
          borderRadius: 5,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          p={2}
        >
          <Typography
            variant="h4"
            fontWeight={600}
          >
            Pedidos
          </Typography>
        </Box>

        <OrdersTableSkeleton />
      </Paper>
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
            Não foi possível carregar os pedidos
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

  return (
    <Paper
      elevation={5}
      sx={{
        m: 3,
        p: 5,
        borderRadius: 5,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        p={2}
      >
        <Typography
          variant="h4"
          fontWeight={600}
        >
          Pedidos
        </Typography>
      </Box>

      {orders.length > 0 && (
        <>
          <TextField
            fullWidth
            size="small"
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
              mb: 3,
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
                  <Box pr={2}>Todos</Box>
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
                  <Box pr={2}>Pendente</Box>
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
                  <Box pr={2}>Processando</Box>
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
                  <Box pr={2}>Aprovado</Box>
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
                  <Box pr={2}>Rejeitado</Box>
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
            Nenhum pedido encontrado
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
          >
            Crie seu primeiro pedido para começar
            a rastrear seu processamento.
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
            Nenhum pedido encontrado
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
          >
            Nenhum pedido corresponde aos filtros selecionados.
          </Typography>
        </Box>
      ) : (
        <OrdersTable
          orders={filteredOrders}
        />
      )}
    </Paper>
  );
}