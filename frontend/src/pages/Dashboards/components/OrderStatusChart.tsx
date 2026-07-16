import { PieChart } from "@mui/x-charts/PieChart";

import {
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";

interface Props {
  pending: number;
  processing: number;
  approved: number;
  rejected: number;
}

export const OrderStatusChart = ({
  pending,
  processing,
  approved,
  rejected,
}: Props) => {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Orders by Status
        </Typography>

        <PieChart
          height={320}
          series={[
            {
              innerRadius: 60,
              outerRadius: 120,
              paddingAngle: 3,
              cornerRadius: 5,
              data: [
                {
                  id: 0,
                  value: pending,
                  label: "Pending",
                  color: theme.palette.warning.main,
                },
                {
                  id: 1,
                  value: processing,
                  label: "Processing",
                  color: "#3B82F6",
                },
                {
                  id: 2,
                  value: approved,
                  label: "Approved",
                  color: theme.palette.success.main,
                },
                {
                  id: 3,
                  value: rejected,
                  label: "Rejected",
                  color: theme.palette.error.main,
                },
              ],
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};