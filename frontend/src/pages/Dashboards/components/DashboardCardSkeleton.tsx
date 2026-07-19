import {
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

export const DashboardCardSkeleton = () => {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
        borderLeft: "6px solid transparent",
      }}
    >
      <CardContent sx={{ ml: 2 }}>
        <Skeleton
          variant="text"
          width="50%"
          height={22}
        />

        <Skeleton
          variant="text"
          width={90}
          height={56}
        />
      </CardContent>
    </Card>
  );
};