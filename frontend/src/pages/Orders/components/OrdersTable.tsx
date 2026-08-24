import { useMemo, useState } from "react";

import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import type { OrderResponse } from "../../../types/OrderResponse";
import { formatCurrencyBrl } from "../../../utils/formatCurrencyBrl";
import { formatDateBr } from "../../../utils/formatDateBr";
import { translateOrderStatus } from "../../../utils/translateOrderStatus";
import { getStatusColor } from "../../../utils/getStatusColor";

interface Props {
  orders: OrderResponse[];
}

type Order = "asc" | "desc";
type OrderBy = "createdAt" | "status" | "total";

export const OrdersTable = ({
  orders,
}: Props) => {
  const navigate = useNavigate();

  const [order, setOrder] =
    useState<Order>("desc");

  const [orderBy, setOrderBy] =
    useState<OrderBy>("createdAt");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      let comparison = 0;

      switch (orderBy) {
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime();
          break;

        case "status":
          comparison =
            a.status.localeCompare(b.status);
          break;

        case "total":
          comparison = a.total - b.total;
          break;
      }

      return order === "asc"
        ? comparison
        : -comparison;
    });
  }, [orders, order, orderBy]);

  const visibleOrders =
    sortedOrders.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

  const handleSort = (field: OrderBy) => {
    const isAsc =
      orderBy === field &&
      order === "asc";

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
              borderColor:
                "rgba(255, 255, 255, 0.2)",
            },

            "& .MuiTableBody-root .MuiTableRow:last-child .MuiTableCell-root":
              {
                borderBottom: "none",
              },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={order}
                  onClick={() =>
                    handleSort("status")
                  }
                >
                  Status
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "total"}
                  direction={order}
                  onClick={() =>
                    handleSort("total")
                  }
                >
                  Total
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={
                    orderBy === "createdAt"
                  }
                  direction={order}
                  onClick={() =>
                    handleSort("createdAt")
                  }
                >
                  Criado em
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
            {visibleOrders.map(
              (orderItem) => (
                <TableRow key={orderItem.id}>
                  <TableCell>
                    {orderItem.id.slice(0, 8)}
                    ...
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={translateOrderStatus(
                        orderItem.status,
                      )}
                      color={getStatusColor(
                        orderItem.status,
                      )}
                      size="small"
                      sx={{
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {formatCurrencyBrl(
                      orderItem.total,
                    )}
                  </TableCell>

                  <TableCell>
                    {formatDateBr(
                      orderItem.createdAt,
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/orders/${orderItem.id}`,
                        )
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={orders.length}
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
          `${from}–${to} de ${
            count !== -1
              ? count
              : `mais de ${to}`
          }`
        }
      />
    </Paper>
  );
};