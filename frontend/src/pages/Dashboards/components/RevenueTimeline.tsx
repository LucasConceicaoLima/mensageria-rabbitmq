import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { LineChart } from "@mui/x-charts/LineChart";

import type { RevenueTimeline } from "../../../types/dashboard/RevenueTimeline";
import { formatCurrencyBrlCompact } from "../../../utils/formatCurrencyBrlCompact";

interface Props {
  data: RevenueTimeline[];
}

export function RevenueTimeline({
  data,
}: Props) {
  return (
    <Card
      elevation={3}
      sx={{
        height: 420,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Revenue Timeline
        </Typography>

        <LineChart
          height={320}
          xAxis={[
            {
              scaleType: "point",
              data: data.map((item) => item.date),
            },
          ]}
          yAxis={[
            {
              valueFormatter: (value: number) =>
                formatCurrencyBrlCompact(value),
            },
          ]}
          series={[
            {
              label: "Revenue",
              data: data.map(
                (item) => item.revenue,
              ),
              area: true,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}