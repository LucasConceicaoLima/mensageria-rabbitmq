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
      elevation={3}
      sx={{
        height: 420,
        borderRadius: 3,
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
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: theme.palette.text.primary,
              letterSpacing: "-0.3px",
            }}
          >
            Pedidos
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mt: 0.3,
            }}
          >
            Pedidos ao longo do período
          </Typography>
        </Box>

        <BarChart
          height={320}
          grid={{
            vertical: false,
            horizontal: true,
          }}
          xAxis={[
            {
              scaleType: "band",
              data: data.map((item) => formatDateBr(item.date)),
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
              data: data.map((item) => item.orders),
              color: theme.palette.primary.main,
            },
          ]}
          borderRadius={6}
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