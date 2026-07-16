import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { OrderResponse } from "../../../types/OrderResponse";

interface Props {
  order: OrderResponse;
}

const getStatusColor = (
  status: string,
):
  | "warning"
  | "info"
  | "success"
  | "error"
  | "default" => {
  switch (status) {
    case "PENDING":
      return "warning";

    case "PROCESSING_PAYMENT":
      return "info";

    case "APPROVED":
      return "success";

    case "REJECTED":
      return "error";

    default:
      return "default";
  }
};

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
              {order.total.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                },
              )}
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
              {new Date(
                order.createdAt,
              ).toLocaleString()}
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
              {new Date(
                order.updatedAt,
              ).toLocaleString()}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};