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
  useTheme,
} from "@mui/material";

import type { TopProducts as Ranking } from "../../../types/dashboard/TopProducts";

interface Props {
  products: Ranking[];
}

export const TopProducts = ({ products }: Props) => {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          m: 2,
          p: 0,
          "&:last-child": {
            pb: 0,
          },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: theme.palette.text.primary,
              letterSpacing: "-0.3px",
            }}
          >
            Produtos Mais Vendidos
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mt: 0.3,
            }}
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
                  color: theme.palette.text.secondary,
                }}
              >
                Produto
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
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
                        minWidth: 24,
                        color:
                          index < 3
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                      }}
                    >
                      #{index + 1}
                    </Typography>

                    <Typography variant="body2">
                      {product.productName}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    variant="body2"
                    fontWeight={700}
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
                    color: theme.palette.text.secondary,
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