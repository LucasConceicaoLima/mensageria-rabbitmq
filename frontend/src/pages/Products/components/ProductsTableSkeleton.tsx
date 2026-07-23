import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const ProductsTableSkeleton = () => {
  return (
      <Table
        sx={{
          "& th": {
            fontWeight: 700,
            backgroundColor: "action.hover",
          },
          "& td, & th": {
            py: 1.5,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton width={140} />
              </TableCell>

              <TableCell>
                <Skeleton width="90%" />
              </TableCell>

              <TableCell>
                <Skeleton width={90} />
              </TableCell>

              <TableCell>
                <Skeleton width={45} />
              </TableCell>

              <TableCell align="center">
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={32}
                  sx={{ mx: "auto" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};