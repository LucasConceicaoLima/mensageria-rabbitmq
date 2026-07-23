import { BarChart } from "@mui/x-charts/BarChart";

import {
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { formatCurrency } from "../../../utils/formatCurrencyBrl";

interface Props {
  pending: number;
  processing: number;
  approved: number;
  rejected: number;
}

export const RevenueChart = ({
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
          Revenue by Status
        </Typography>

        <BarChart
          height={320}
          xAxis={[
            {
              scaleType: "band",
              data: [
                "Pending",
                "Processing",
                "Approved",
                "Rejected",
              ],
            },
          ]}
          series={[
            {
              label: "Revenue",
              data: [
                pending,
                processing,
                approved,
                rejected,
              ],
              color: theme.palette.primary.main,
              valueFormatter: (value) =>
                value == null
                  ? ""
                  : formatCurrency(value),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};