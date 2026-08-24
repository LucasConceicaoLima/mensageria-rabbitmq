import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";

import type { OrderResponse } from "../../../types/OrderResponse";

import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";
import { formatDateBr } from "../../../utils/formatDateBr";
import { getStatusColor } from "../../../utils/getStatusColor";
import { translateOrderStatus } from "../../../utils/translateOrderStatus";

interface Props {
  order: OrderResponse;
}

export const OrderInfo = ({ order }: Props) => {
  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Resumo do Pedido
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Pedido
            </Typography>

            <Typography
              fontWeight={700}
            >
              #
              {order.id
                .slice(-8)
                .toUpperCase()}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Status
            </Typography>

            <Chip
              label={translateOrderStatus(order.status)}
              color={getStatusColor(
                order.status,
              )}
              sx={{
                width: "fit-content",
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <PaymentsIcon
              color="success"
            />

            <Stack>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Total
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                {formatCurrencyBrl(
                  order.total,
                )}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <ShoppingCartIcon
              color="primary"
            />

            <Stack>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Itens
              </Typography>

              <Typography>
                {order.items.length}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <CalendarTodayIcon
              color="action"
            />

            <Stack>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Criado em 
              </Typography>

              <Typography>
                {formatDateBr(
                  order.createdAt,
                )}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <UpdateIcon
              color="action"
            />

            <Stack>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Última atualização em
              </Typography>

              <Typography>
                {formatDateBr(
                  order.updatedAt,
                )}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};