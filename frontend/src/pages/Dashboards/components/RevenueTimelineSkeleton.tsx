import {
  Box,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

export function RevenueTimelineSkeleton() {
  const bars = [70, 45, 85, 60, 95, 55, 75];

  return (
    <Card
      elevation={3}
      sx={{
        height: 420,
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
            width={210}
            height={24}
            sx={{ mt: 0.3 }}
          />
        </Box>

        <Box
          sx={{
            height: 320,
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
            px: 6,
            pb: 4,
          }}
        >
          {bars.map((height, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              sx={{
                flex: 1,
                height: `${height}%`,
                borderRadius: "6px 6px 0 0",
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}