import { useEffect, useState } from "react";

import {
  Grid,
  Stack,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";

import { useProducts } from "../../hooks/useProducts";
import { useCreateOrder } from "../../hooks/useCreateOrder";

import { ProductCard } from "./components/ProductCard";
import { OrderSummary } from "./components/OrderSummary";

import type { SelectedProduct } from "../../types/SelectedProduct";

export default function NewOrderPage() {
  const { data: products = [] } = useProducts();

  const createOrderMutation = useCreateOrder();

  const [items, setItems] = useState<SelectedProduct[]>([]);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (!products.length) {
      return;
    }

    setItems(
      products.map((product) => ({
        ...product,
        quantity: 0,
      })),
    );
  }, [products]);

  const updateQuantity = (
    productId: string,
    quantity: number,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
            ...item,
            quantity: Math.max(0, quantity),
          }
          : item,
      ),
    );
  };

  const handleCreateOrder = async () => {
    const selectedItems = items.filter(
      (item) => item.quantity > 0,
    );

    if (!selectedItems.length) {
      return;
    }

    await createOrderMutation.mutateAsync({
      items: selectedItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });

    setSuccessOpen(true);

    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        quantity: 0,
      })),
    );
  };

  return (
    <>
      <Typography variant="h4" mb={3}>
        New Order
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
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

        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummary
            items={items}
            onCreate={handleCreateOrder}
          />
        </Grid>
      </Grid>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessOpen(false)}
        >
          Order created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}