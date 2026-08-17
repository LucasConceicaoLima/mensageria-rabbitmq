import {
  Card,
  CardContent,
  Skeleton,
  Box,
} from "@mui/material";

export const OrderStatusChartSkeleton = () => {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
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
          <Skeleton
            variant="text"
            width={100}
            height={32}
          />

          <Skeleton
            variant="text"
            width={180}
            height={24}
            sx={{ mt: 0.3 }}
          />
        </Box>

        <Box
          sx={{
            height: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width={240}
            height={240}
          />
        </Box>
      </CardContent>
    </Card>
  );
};