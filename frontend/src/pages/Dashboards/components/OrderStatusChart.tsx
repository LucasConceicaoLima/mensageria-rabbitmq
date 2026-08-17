import { PieChart } from "@mui/x-charts/PieChart";
import { translateOrderStatus } from "../../../utils/translateOrderStatus";
import {
  Card,
  CardContent,
  Typography,
  Box,
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
        backgroundColor: theme.palette.background.paper,
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
            Distribuição por status
          </Typography>
        </Box>

        <PieChart
          height={320}
          series={[
            {
              innerRadius: 60,
              outerRadius: 120,
              paddingAngle: 3,
              cornerRadius: 5,

              highlightScope: {
                fade: "global",
                highlight: "item",
              },

              faded: {
                innerRadius: 55,
                additionalRadius: -5,
                color: "gray",
              },

              data: [
                {
                  id: 0,
                  value: pending,
                  label: translateOrderStatus("PENDING"),
                  color: theme.palette.warning.main,
                },
                {
                  id: 1,
                  value: processing,
                  label: translateOrderStatus("PROCESSING_PAYMENT"),
                  color: "#3B82F6",
                },
                {
                  id: 2,
                  value: approved,
                  label: translateOrderStatus("APPROVED"),
                  color: theme.palette.success.main,
                },
                {
                  id: 3,
                  value: rejected,
                  label: translateOrderStatus("REJECTED"),
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