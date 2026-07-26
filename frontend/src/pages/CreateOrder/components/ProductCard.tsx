import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import type { Product } from "../../../types/Product";
import { QuantitySelector } from "./QuantitySelector";
import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";

interface Props {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const ProductCard = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <Card>
      <CardContent>

        <Typography variant="h6">
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {product.description}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            color="primary"
            fontWeight={700}
          >
            {formatCurrencyBrl(product.price)}
          </Typography>

          <QuantitySelector
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

        </Box>

      </CardContent>
    </Card>
  );
};