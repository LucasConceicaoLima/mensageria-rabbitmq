import {
  Card,
  CardContent,
  Box,
  Skeleton,
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
      <CardContent>
        <Skeleton
          variant="text"
          width="45%"
          height={32}
        />

        <Box
          display="flex"
          justifyContent="center"
          mt={2}
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