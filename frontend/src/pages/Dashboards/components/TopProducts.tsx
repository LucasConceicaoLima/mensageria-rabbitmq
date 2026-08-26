import {
  Box,
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
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          p: 2.5,

          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        {/* Header */}
        <Box mb={2}>
          <Typography
            variant="h6"
            fontWeight={600}
            letterSpacing="-0.01em"
          >
            Produtos Mais Vendidos
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Ranking de produtos por quantidade vendida
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  borderColor: "divider",
                }}
              >
                Produto
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  borderColor: "divider",
                }}
              >
                Vendidos
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={product.productId}
                sx={{
                  "&:last-child td": {
                    borderBottom: 0,
                  },

                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        minWidth: 28,
                        color:
                          index < 3
                            ? "primary.main"
                            : "text.secondary",
                      }}
                    >
                      #{index + 1}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.primary"
                    >
                      {product.productName}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.primary"
                  >
                    {product.quantitySold}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}

            {!products.length && (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{
                    py: 5,
                    color: "text.secondary",
                    borderBottom: 0,
                  }}
                >
                  <Typography variant="body2">
                    Nenhum produto encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};