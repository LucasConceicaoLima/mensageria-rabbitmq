import {
  Box,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

export const RevenueChartSkeleton = () => {
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
          mt={3}
          display="flex"
          alignItems="flex-end"
          justifyContent="space-around"
          height={250}
        >
          <Skeleton variant="rounded" width={40} height={80} />
          <Skeleton variant="rounded" width={40} height={150} />
          <Skeleton variant="rounded" width={40} height={220} />
          <Skeleton variant="rounded" width={40} height={120} />
        </Box>
      </CardContent>
    </Card>
  );
};