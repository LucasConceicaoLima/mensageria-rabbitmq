import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const OrdersTableSkeleton = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton width={90} />
              </TableCell>

              <TableCell>
                <Skeleton
                  variant="rounded"
                  width={90}
                  height={28}
                />
              </TableCell>

              <TableCell>
                <Skeleton width={90} />
              </TableCell>

              <TableCell>
                <Skeleton width={150} />
              </TableCell>

              <TableCell align="center">
                <Skeleton
                  variant="circular"
                  width={36}
                  height={36}
                  sx={{ mx: "auto" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};