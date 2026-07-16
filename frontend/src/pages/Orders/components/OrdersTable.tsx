import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import type { OrderResponse } from "../../../types/OrderResponse";
import { StatusChip } from "./StatusChip";

interface Props {
  orders: OrderResponse[];
}

export const OrdersTable = ({
  orders,
}: Props) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {order.id.slice(0, 8)}...
              </TableCell>

              <TableCell>
                <StatusChip
                  status={order.status}
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

              <TableCell align="center">
                <IconButton
                  onClick={() =>
                    navigate(`/orders/${order.id}`)
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};