import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { SelectedProduct } from "../../../types/SelectedProduct";
import { formatCurrency}  from "../../../utils/formatCurrencyBrl";

interface Props {
  items: SelectedProduct[];
  onCreate: () => void;
}

export const OrderSummary = ({
  items,
  onCreate,
}: Props) => {
  const total = items.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0,
  );

  return (
    <Card>

      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
        >
          Order Summary
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1}>

          {items
            .filter((i) => i.quantity > 0)
            .map((item) => (
              <Stack
                key={item.id}
                direction="row"
                justifyContent="space-between"
              >
                <Typography>
                  {item.name} x{item.quantity}
                </Typography>

                <Typography>
                  {formatCurrency(item.price * item.quantity)}
                </Typography>
              </Stack>
            ))}

        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h5"
          fontWeight={700}
        >
          Total:{" "}
          {formatCurrency(total)}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={onCreate}
          disabled={total === 0}
        >
          Create Order
        </Button>

      </CardContent>

    </Card>
  );
};