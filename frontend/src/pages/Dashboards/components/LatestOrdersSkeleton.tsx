import {
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

export const LatestOrdersSkeleton = () => {
  return (
    <Card
      elevation={3}
      sx={{
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
        <Box sx={{ mb: 2 }}>
          <Skeleton
            variant="text"
            width={160}
            height={32}
          />

          <Skeleton
            variant="text"
            width={150}
            height={24}
            sx={{ mt: 0.3 }}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={60}
                  height={24}
                />
              </TableCell>

              <TableCell>
                <Skeleton
                  variant="text"
                  width={55}
                  height={24}
                />
              </TableCell>

              <TableCell>
                <Skeleton
                  variant="text"
                  width={45}
                  height={24}
                />
              </TableCell>

              <TableCell>
                <Skeleton
                  variant="text"
                  width={70}
                  height={24}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton
                    variant="text"
                    width={75}
                    height={24}
                  />
                </TableCell>

                <TableCell>
                  <Skeleton
                    variant="rounded"
                    width={85}
                    height={24}
                  />
                </TableCell>

                <TableCell>
                  <Skeleton
                    variant="text"
                    width={75}
                    height={24}
                  />
                </TableCell>

                <TableCell>
                  <Skeleton
                    variant="text"
                    width={110}
                    height={24}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};