import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { LineChart } from "@mui/x-charts/LineChart";

import type { OrdersTimeline } from "../../../types/dashboard/OrdersTimeline";

interface Props {
  data: OrdersTimeline[];
}

export function OrdersTimeline({
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
          Orders Timeline
        </Typography>

        <LineChart
          height={320}
          xAxis={[
            {
              scaleType: "point",
              data: data.map((item) => item.date),
            },
          ]}
          series={[
            {
              label: "Orders",
              data: data.map(
                (item) => item.orders,
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}