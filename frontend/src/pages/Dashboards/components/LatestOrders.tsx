import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { OrderResponse } from "../../../types/OrderResponse";

interface Props {
  orders: OrderResponse[];
}

export const LatestOrders = ({
  orders,
}: Props) => {
  const navigate = useNavigate();

  const getChipColor = (
    status: string,
  ):
    | "warning"
    | "success"
    | "error"
    | "info" => {
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
        return "info";
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Latest Orders
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/orders/${order.id}`,
                  )
                }
              >
                <TableCell>
                  #{order.id.slice(-8)}
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.status.replaceAll(
                      "_",
                      " ",
                    )}
                    color={getChipColor(
                      order.status,
                    )}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {order.total.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  )}
                </TableCell>

                <TableCell>
                  {new Date(
                    order.createdAt,
                  ).toLocaleString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}

            {!orders.length && (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={4}
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};