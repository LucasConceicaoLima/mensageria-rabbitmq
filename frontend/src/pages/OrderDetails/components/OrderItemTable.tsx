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
    <Card
      elevation={5}
      sx={{
        borderRadius: 3,
        p: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Itens do pedido
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Produto
              </TableCell>

              <TableCell>
                Quantidade
              </TableCell>

              <TableCell>
                Preço unitário
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