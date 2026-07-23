import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Product } from "../../../types/Product";
import { formatCurrency } from "../../../utils/formatCurrencyBrl";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductsTable = ({
  products,
  onEdit,
  onDelete,
}: Props) => {
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
        "& tbody tr:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell
            align="center"
            width={120}
          >
            Actions
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>

            <TableCell>
              {product.description}
            </TableCell>

            <TableCell>
              {formatCurrency(product.price)}
            </TableCell>

            <TableCell>
              {product.stock}
            </TableCell>

            <TableCell align="center">
              <Stack
                direction="row"
                sx={{
                  justifyContent: "center",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() =>
                    onEdit(product)
                  }
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    onDelete(product)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};