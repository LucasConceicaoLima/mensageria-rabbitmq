import { useState } from "react";

import {
  Grid,
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
          "Order created successfully!",
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

  return (
    <>
      <Typography
        variant="h4"
        mb={3}
      >
        New Order
      </Typography>

      <Grid container spacing={3}>
        <Grid
          size={{ xs: 12, md: 8 }}
        >
          <Stack spacing={2}>
            {isLoading
              ? Array.from({
                  length: 6,
                }).map((_, index) => (
                  <ProductCardSkeleton
                    key={index}
                  />
                ))
              : items.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={
                        product.quantity
                      }
                      onIncrease={() =>
                        updateQuantity(
                          product.id,
                          product.quantity +
                            1,
                        )
                      }
                      onDecrease={() =>
                        updateQuantity(
                          product.id,
                          product.quantity -
                            1,
                        )
                      }
                    />
                  ),
                )}
          </Stack>
        </Grid>

        <Grid
          size={{ xs: 12, md: 4 }}
        >
          {isLoading ? (
            <OrderSummarySkeleton />
          ) : (
            <OrderSummary
              items={items}
              onCreate={
                handleCreateOrder
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}