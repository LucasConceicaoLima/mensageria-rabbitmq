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
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { translateOrderStatus } from "../../../utils/translateOrderStatus";
import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";
import { formatTimestampBr } from "../../../utils/formatTimestampBr";
import { getStatusColor } from "../../../utils/getStatusColor";

import type { LatestOrders as Latest } from "../../../types/dashboard/LatestOrders";

interface Props {
  orders: Latest[];
}

export const LatestOrders = ({
  orders,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          p: 2.5,

          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        {/* Header */}
        <Box mb={2}>
          <Typography
            variant="h6"
            fontWeight={600}
            letterSpacing="-0.01em"
          >
            Últimos Pedidos
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
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
                  color: "text.secondary",
                  borderColor: "divider",
                }}
              >
                Pedido
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  borderColor: "divider",
                }}
              >
                Status
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  borderColor: "divider",
                }}
              >
                Total
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  borderColor: "divider",
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
                onClick={() =>
                  navigate(`/orders/${order.id}`)
                }
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
                    label={translateOrderStatus(
                      order.status,
                    )}
                    color={getStatusColor(
                      order.status,
                    )}
                    size="small"
                    sx={{
                      fontWeight: 500,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    color="text.primary"
                  >
                    {formatCurrencyBrl(
                      order.total,
                    )}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {formatTimestampBr(
                      order.createdAt,
                    )}
                  </Typography>
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
                    color: "text.secondary",
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