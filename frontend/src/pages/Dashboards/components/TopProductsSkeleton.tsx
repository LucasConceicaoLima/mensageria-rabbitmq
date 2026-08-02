import {
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export const TopProductsSkeleton = () => (
  <Card
    elevation={3}
    sx={{ borderRadius: 3 }}
  >
    <CardContent>
      <Skeleton
        width={180}
        height={35}
      />

      <Stack spacing={2} mt={2}>
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <Skeleton
              key={index}
              height={35}
            />
          ),
        )}
      </Stack>
    </CardContent>
  </Card>
);