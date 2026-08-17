import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { RevenueTimeline } from "../../../types/dashboard/RevenueTimeline";

interface Props {
  data: RevenueTimeline[];
}

export function RevenueTimeline({ data }: Props) {
  const theme = useTheme();

  const labels = data.map((item) =>
    new Date(item.date).toLocaleDateString("pt-BR")
  );

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
            Receita
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mt: 0.3,
            }}
          >
            Receita ao longo do período
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
      data: labels,
      categoryGapRatio: 0.75,
    },
  ]}
  yAxis={[
    
    {
      width: 75,
      valueFormatter: (value: number) =>
        `R$ ${value.toLocaleString("pt-BR")}`,
    },
  ]}
  series={[
    {
      label: "Receita",
      data: data.map((item) => item.revenue),
      color: theme.palette.primary.main,
      valueFormatter: (value) =>
        value !== null
          ? `R$ ${value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "",
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
