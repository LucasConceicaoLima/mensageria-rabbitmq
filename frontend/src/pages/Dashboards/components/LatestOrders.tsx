import {
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { translateOrderStatus } from "../../../utils/translateOrderStatus";
import { useNavigate } from "react-router-dom";
import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";
import { formatTimestampBr } from "../../../utils/formatTimestampBr";
import { getStatusColor } from "../../../utils/getStatusColor";

import type { LatestOrders as Latest } from "../../../types/dashboard/LatestOrders";

interface Props {
  orders: Latest[];
}

export const LatestOrders = ({ orders }: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent
        sx={{
          m: 2,
          p: 0,
          "&:last-child": {
            pb: 0,
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: theme.palette.text.primary,
              letterSpacing: "-0.3px",
            }}
          >
            Últimos Pedidos
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mt: 0.3,
            }}
          >
            Pedidos mais recentes
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                }}
              >
                Pedido
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                }}
              >
                Status
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                }}
              >
                Total
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                }}
              >
                Data
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{
                  cursor: "pointer",
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                  >
                    #{order.id.slice(-8)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={translateOrderStatus(order.status)}
                    color={getStatusColor(order.status)}
                    size="small"
                    sx={{
                      fontWeight: 500,
                    }}
                  />
                </TableCell>

                <TableCell>
                  {formatCurrencyBrl(order.total)}
                </TableCell>

                <TableCell>
                  {formatTimestampBr(order.createdAt)}
                </TableCell>
              </TableRow>
            ))}

            {!orders.length && (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={4}
                  sx={{
                    py: 5,
                    color: theme.palette.text.secondary,
                    borderBottom: 0,
                  }}
                >
                  <Typography variant="body2">
                    Nenhum pedido encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};