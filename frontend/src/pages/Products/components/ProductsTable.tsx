import { useMemo, useState } from "react";

import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Product } from "../../../types/Product";
import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

type Order = "asc" | "desc";
type OrderBy = "name" | "description" | "price" | "stock";

export const ProductsTable = ({
  products,
  onEdit,
  onDelete,
}: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] =
    useState<OrderBy>("name");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      let comparison = 0;

      switch (orderBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;

        case "description":
          comparison = a.description.localeCompare(
            b.description,
          );
          break;

        case "price":
          comparison = a.price - b.price;
          break;

        case "stock":
          comparison = a.stock - b.stock;
          break;
      }

      return order === "asc"
        ? comparison
        : -comparison;
    });
  }, [products, order, orderBy]);

  const visibleProducts =
    sortedProducts.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

  const handleSort = (field: OrderBy) => {
    const isAsc =
      orderBy === field && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  return (
    <Paper>
      <TableContainer
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderBottom: "none",
          borderRadius: 2,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          overflow: "hidden",
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              borderRight: "1px solid",
              borderColor: "divider",
            },

            "& .MuiTableCell-root:last-child": {
              borderRight: "none",
            },

            "& .MuiTableHead-root .MuiTableCell-root": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },

            "& .MuiTableBody-root .MuiTableRow:last-child .MuiTableCell-root": {
              borderBottom: "none",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={order}
                  onClick={() =>
                    handleSort("name")
                  }
                >
                  Nome
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "description"}
                  direction={order}
                  onClick={() => handleSort("description")}
                >
                  Descrição
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={order}
                  onClick={() =>
                    handleSort("price")
                  }
                >
                  Preço
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "stock"}
                  direction={order}
                  onClick={() =>
                    handleSort("stock")
                  }
                >
                  Estoque
                </TableSortLabel>
              </TableCell>

              <TableCell
                width={120}
                align="center"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleProducts.map(
              (product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.name}
                  </TableCell>

                  <TableCell>
                    {product.description}
                  </TableCell>

                  <TableCell>
                    {formatCurrencyBrl(
                      product.price,
                    )}
                  </TableCell>

                  <TableCell>
                    {product.stock}
                  </TableCell>

                  <TableCell align="center">
                    <Stack
                      direction="row"
                      justifyContent="center"
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
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={products.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(
            Number(e.target.value),
          );
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
      />
    </Paper>
  );
};