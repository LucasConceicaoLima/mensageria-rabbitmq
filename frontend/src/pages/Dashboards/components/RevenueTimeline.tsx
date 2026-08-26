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
    new Date(item.date).toLocaleDateString("pt-BR"),
  );

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
            Receita
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Receita ao longo do período
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
              data: data.map(
                (item) => item.revenue,
              ),
              color: theme.palette.primary.main,
              valueFormatter: (value) =>
                value !== null
                  ? `R$ ${value.toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}`
                  : "",
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