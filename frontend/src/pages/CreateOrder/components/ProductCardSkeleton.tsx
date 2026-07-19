import {
  Box,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

export const ProductCardSkeleton = () => {
  return (
    <Card>
      <CardContent>

        <Skeleton
          variant="text"
          width="45%"
          height={34}
        />

        <Skeleton
          variant="text"
          width="80%"
          height={22}
          sx={{ mb: 2 }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton
            variant="text"
            width={90}
            height={32}
          />

          <Skeleton
            variant="rounded"
            width={120}
            height={36}
          />
        </Box>

      </CardContent>
    </Card>
  );
};