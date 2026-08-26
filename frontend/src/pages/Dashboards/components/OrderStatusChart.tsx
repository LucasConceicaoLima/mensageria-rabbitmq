import { PieChart } from "@mui/x-charts/PieChart";

import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

import { translateOrderStatus } from "../../../utils/translateOrderStatus";

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

  const primary = theme.palette.primary.main;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
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
            Distribuição por status
          </Typography>
        </Box>

        {/* Chart */}
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
                  color:
                    theme.palette.mode === "dark"
                      ? `${primary}55`
                      : `${primary}45`,
                },
                {
                  id: 1,
                  value: processing,
                  label: translateOrderStatus(
                    "PROCESSING_PAYMENT",
                  ),
                  color:
                    theme.palette.mode === "dark"
                      ? `${primary}75`
                      : `${primary}65`,
                },
                {
                  id: 2,
                  value: approved,
                  label: translateOrderStatus("APPROVED"),
                  color:
                    theme.palette.mode === "dark"
                      ? `${primary}95`
                      : `${primary}85`,
                },
                {
                  id: 3,
                  value: rejected,
                  label: translateOrderStatus("REJECTED"),
                  color: primary,
                },
              ],
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};