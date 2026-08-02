import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { TopProducts as Ranking } from "../../../types/dashboard/TopProducts";

interface Props {
  products: Ranking[];
}

export const TopProducts = ({
  products,
}: Props) => {
  return (
    <Card
      elevation={3}
      sx={{ borderRadius: 3 }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Top Products
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Product
              </TableCell>

              <TableCell align="right">
                Sold
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.productId}
              >
                <TableCell>
                  {product.productName}
                </TableCell>

                <TableCell align="right">
                  {product.quantitySold}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};