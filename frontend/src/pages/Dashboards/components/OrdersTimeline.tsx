import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";

import type { OrdersTimeline } from "../../../types/dashboard/OrdersTimeline";
import { formatDateBr } from "../../../utils/formatDateBr";

interface Props {
  data: OrdersTimeline[];
}

export function OrdersTimeline({ data }: Props) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: 420,
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
        <Box mb={1}>
          <Typography
            variant="h6"
            fontWeight={600}
            letterSpacing="-0.01em"
          >
            Pedidos
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Pedidos ao longo do período
          </Typography>
        </Box>

        {/* Chart */}
        <BarChart
          height={320}
          grid={{
            vertical: false,
            horizontal: true,
          }}
          xAxis={[
            {
              scaleType: "band",
              data: data.map((item) =>
                formatDateBr(item.date),
              ),
              categoryGapRatio: 0.75,
            },
          ]}
          yAxis={[
            {
              valueFormatter: (value: number) =>
                Math.round(value).toString(),
              tickMinStep: 1,
            },
          ]}
          series={[
            {
              label: "Pedidos",
              data: data.map(
                (item) => item.orders,
              ),
              color: theme.palette.primary.main,
            },
          ]}
          borderRadius={4}
          sx={{
            "& .MuiChartsSurface-root": {
              overflow: "visible",
            },

            "& svg": {
              overflow: "visible",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}