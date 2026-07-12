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

import type { Product } from "../../../api/products.api";

interface Props {
    products: Product[];
}

export const ProductsTable = ({
    products,
}: Props) => {
    return (
        <Table>
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
                        <TableCell>
                            {product.name}
                        </TableCell>

                        <TableCell>
                            {product.description}
                        </TableCell>

                        <TableCell>
                            {product.price.toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL",
                                },
                            )}
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
                                <IconButton>
                                    <EditIcon />
                                </IconButton>

                                <IconButton color="error">
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