import { useMemo, useState } from "react";

import {
  Badge,
  Box,
  Button,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useOrders } from "../../hooks/useOrders";
import { OrdersTable } from "./components/OrdersTable";
import { OrdersTableSkeleton } from "./components/OrdersTableSkeleton";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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
        (o) => o.status === "PROCESSING_PAYMENT",
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
        order.id.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query) ||
        order.items.some((item) =>
          item.product.name
            .toLowerCase()
            .includes(query),
        );

      const matchesStatus =
        statusFilter === "ALL" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  if (isLoading) {
    return (
      <Box
        sx={{
          m: 3,
        }}
      >
        <Box mb={4}>
          <Typography
            variant="h4"
            fontWeight={700}
            letterSpacing="-0.02em"
          >
            Pedidos
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Acompanhe e gerencie os pedidos realizados.
          </Typography>
        </Box>

        <OrdersTableSkeleton />
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
    <Box
      sx={{
        m: 3,
      }}
    >
      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={700}
          letterSpacing="-0.02em"
        >
          Pedidos
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
        >
          Acompanhe e gerencie os pedidos realizados.
        </Typography>
      </Box>

      {orders.length > 0 && (
        <>
          <Box mb={2}>
            <TextField
              size="small"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      fontSize="small"
                      color="action"
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: {
                  xs: "100%",
                  md: 420,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
              borderBottom: "1px solid",
              borderColor: "divider",
              mb: 3,
              "&::-webkit-scrollbar": {
                height: 6,
              },
            }}
          >
            <Tabs
              value={statusFilter}
              onChange={(_, value) => setStatusFilter(value)}
              variant="fullWidth"
              sx={{
                minWidth: 600,
                "& .MuiTab-root": {
                  flex: 1,
                  maxWidth: "none",
                },
              }}
            >
              <Tab
                value="ALL"
                label={
                  <Badge
                    color="primary"
                    badgeContent={counts.ALL}
                    max={99}
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "static",
                        transform: "none",
                        marginLeft: 1,
                      },
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>Todos</Box>
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
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "static",
                        transform: "none",
                        marginLeft: 1,
                      },
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>Pendente</Box>
                  </Badge>
                }
              />

              <Tab
                value="PROCESSING_PAYMENT"
                label={
                  <Badge
                    color="info"
                    badgeContent={counts.PROCESSING_PAYMENT}
                    max={99}
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "static",
                        transform: "none",
                        marginLeft: 1,
                      },
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>Processando</Box>
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
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "static",
                        transform: "none",
                        marginLeft: 1,
                      },
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>Aprovado</Box>
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
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "static",
                        transform: "none",
                        marginLeft: 1,
                      },
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>Rejeitado</Box>
                  </Badge>
                }
              />
            </Tabs>
          </Box>
        </>
      )}

      {orders.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={10}
          gap={1}
        >
          <Typography
            variant="h6"
            fontWeight={600}
          >
            Nenhum pedido encontrado
          </Typography>

          <Typography
            variant="body2"
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
          py={10}
          gap={1}
        >
          <Typography
            variant="h6"
            fontWeight={600}
          >
            Nenhum pedido encontrado
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            Nenhum pedido corresponde aos filtros
            selecionados.
          </Typography>
        </Box>
      ) : (
        <OrdersTable orders={filteredOrders} />
      )}
    </Box>
  );
}