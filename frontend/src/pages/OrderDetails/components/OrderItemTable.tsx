import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { OrderResponse } from "../../../types/OrderResponse";
import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";

interface Props {
  order: OrderResponse;
}

export const OrderItemTable = ({
  order,
}: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Order Items
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Product
              </TableCell>

              <TableCell>
                Quantity
              </TableCell>

              <TableCell>
                Unit Price
              </TableCell>

              <TableCell>
                Subtotal
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.product.name}
                </TableCell>

                <TableCell>
                  {item.quantity}
                </TableCell>

                <TableCell>
                  {formatCurrencyBrl(item.unitPrice)}
                </TableCell>

                <TableCell>
                  {formatCurrencyBrl(item.subtotal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};