import {
  Box,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

export const DashboardCardSkeleton = () => {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        height: "100%",
        minHeight: 136,

        borderRadius: 3,

        border: "1px solid",
        borderColor: "divider",
        borderLeft: "6px solid",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          ml: 1,
          p: 2.5,

          "&:last-child": {
            pb: 2.5,
          },

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Skeleton
            variant="text"
            width="45%"
            height={24}
          />

          {/* Icon */}
          <Skeleton
            variant="rounded"
            width={44}
            height={44}
            sx={{
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Value */}
        <Box sx={{ mt: 1 }}>
          <Skeleton
            variant="text"
            width="65%"
            height={48}
          />
        </Box>
      </CardContent>
    </Card>
  );
};