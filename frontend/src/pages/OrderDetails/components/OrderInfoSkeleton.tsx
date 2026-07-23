import {
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

export const OrderInfoSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <div>
            <Typography variant="caption" color="text.secondary">
              Order ID
            </Typography>

            <Skeleton width="100%" />
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>

            <br />

            <Skeleton
              variant="rounded"
              width={100}
              height={32}
            />
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>

            <Skeleton
              width={120}
              height={40}
            />
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              Created
            </Typography>

            <Skeleton width="80%" />
          </div>

          <div>
            <Typography variant="caption" color="text.secondary">
              Updated
            </Typography>

            <Skeleton width="80%" />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};