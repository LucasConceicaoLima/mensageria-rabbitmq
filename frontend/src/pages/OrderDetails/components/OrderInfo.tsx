import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { OrderResponse } from "../../../types/OrderResponse";
import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";
import { formatDateBr } from "../../../utils/formatDateBr";
import { getStatusColor } from "../../../utils/getStatusColor";

interface Props {
  order: OrderResponse;
}

export const OrderInfo = ({
  order,
}: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Order Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <div>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Order ID
            </Typography>

            <Typography variant="body2">
              {order.id}
            </Typography>
          </div>

          <div>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Status
            </Typography>

            <br />

            <Chip
              label={order.status}
              color={getStatusColor(
                order.status,
              )}
            />
          </div>

          <div>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Total
            </Typography>

            <Typography variant="h5">
              {formatCurrencyBrl(order.total)}
            </Typography>
          </div>

          <div>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Created
            </Typography>

            <Typography>
              {formatDateBr(order.createdAt)}
            </Typography>
          </div>

          <div>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Updated
            </Typography>

            <Typography>
              {formatDateBr(order.updatedAt)}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};