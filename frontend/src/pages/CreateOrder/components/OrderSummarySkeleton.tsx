import {
  Button,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";

export const OrderSummarySkeleton = () => {
  return (
    <Card>

      <CardContent>

        <Skeleton
          variant="text"
          width="55%"
          height={34}
        />

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1}>

          {[1, 2, 3].map((item) => (
            <Stack
              key={item}
              direction="row"
              justifyContent="space-between"
            >
              <Skeleton
                variant="text"
                width="45%"
              />

              <Skeleton
                variant="text"
                width={70}
              />
            </Stack>
          ))}

        </Stack>

        <Divider sx={{ my: 2 }} />

        <Skeleton
          variant="text"
          width="70%"
          height={40}
        />

        <Button
          fullWidth
          disabled
          sx={{ mt: 3 }}
        >
          <Skeleton
            width="100%"
            height={24}
          />
        </Button>

      </CardContent>

    </Card>
  );
};