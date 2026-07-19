import {
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const LatestOrdersSkeleton = () => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Skeleton
          variant="text"
          width="35%"
          height={32}
          sx={{ mb: 1 }}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton width={70} />
              </TableCell>

              <TableCell>
                <Skeleton width={70} />
              </TableCell>

              <TableCell>
                <Skeleton width={70} />
              </TableCell>

              <TableCell>
                <Skeleton width={100} />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>

                <TableCell>
                  <Skeleton
                    variant="rounded"
                    width={90}
                    height={24}
                  />
                </TableCell>

                <TableCell>
                  <Skeleton width={80} />
                </TableCell>

                <TableCell>
                  <Skeleton width={120} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};