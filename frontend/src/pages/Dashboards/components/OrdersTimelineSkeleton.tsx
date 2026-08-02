import {
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export function OrdersTimelineSkeleton() {
  return (
    <Card
      elevation={3}
      sx={{
        height: 420,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Skeleton
            width={170}
            height={35}
          />

          <Skeleton
            variant="rounded"
            height={300}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}