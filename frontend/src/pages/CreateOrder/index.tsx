import { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useProducts } from "../../hooks/useProducts";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useSnackbar } from "../../hooks/useSnackbar";

import { ProductCard } from "./components/ProductCard";
import { ProductCardSkeleton } from "./components/ProductCardSkeleton";
import { OrderSummary } from "./components/OrderSummary";
import { OrderSummarySkeleton } from "./components/OrderSummarySkeleton";

import type { SelectedProduct } from "../../types/SelectedProduct";

import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export default function NewOrderPage() {
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts();

  const createOrderMutation =
    useCreateOrder();

  const { showSnackbar } =
    useSnackbar();

  const [quantities, setQuantities] =
    useState<Record<string, number>>({});

  const items: SelectedProduct[] =
    products.map((product) => ({
      ...product,
      quantity:
        quantities[product.id] ?? 0,
    }));

  const updateQuantity = (
    productId: string,
    quantity: number,
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  };

  const handleCreateOrder =
    async () => {
      const selectedItems =
        items.filter(
          (item) => item.quantity > 0,
        );

      if (!selectedItems.length) {
        return;
      }

      try {
        await createOrderMutation.mutateAsync(
          {
            items: selectedItems.map(
              (item) => ({
                productId: item.id,
                quantity: item.quantity,
              }),
            ),
          },
        );

        showSnackbar(
          "Pedido criado com sucesso!",
          "success",
        );

        setQuantities({});
      } catch (error) {
        showSnackbar(
          getApiErrorMessage(error),
          "error",
        );
      }
    };

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
          alignItems="center"
          mb={3}
          p={2}
        >
          <Typography
            variant="h4"
            fontWeight={600}
          >
            Criar pedido
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid
            size={{ xs: 12, md: 8 }}
          >
            <Stack spacing={2}>
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <ProductCardSkeleton
                  key={index}
                />
              ))}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
          >
            <OrderSummarySkeleton />
          </Grid>
        </Grid>
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
            Não foi possível carregar o formulário de criar pedido
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
        alignItems="center"
        mb={3}
        p={2}
      >
        <Typography
          variant="h4"
          fontWeight={600}
        >
          Criar pedido
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid
          size={{ xs: 12, md: 8 }}
        >
          <Stack spacing={2}>
            {items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={product.quantity}
                onIncrease={() =>
                  updateQuantity(
                    product.id,
                    product.quantity + 1,
                  )
                }
                onDecrease={() =>
                  updateQuantity(
                    product.id,
                    product.quantity - 1,
                  )
                }
              />
            ))}
          </Stack>
        </Grid>

        <Grid
          size={{ xs: 12, md: 4 }}
        >
          <OrderSummary
            items={items}
            onCreate={handleCreateOrder}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}