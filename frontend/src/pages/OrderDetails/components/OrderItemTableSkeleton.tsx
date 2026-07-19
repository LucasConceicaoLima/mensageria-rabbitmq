import {
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const OrderItemTableSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Items
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton width="80%" />
                </TableCell>

                <TableCell>
                  <Skeleton width={40} />
                </TableCell>

                <TableCell>
                  <Skeleton width={90} />
                </TableCell>

                <TableCell>
                  <Skeleton width={90} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};