import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useProducts } from "../../hooks/useProducts";
import { ProductsTable } from "./components/ProductsTable";

const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useProducts();
  
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Error loading products.
      </Alert>
    );
  }

  return (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      borderRadius: 3,
    }}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      m={3}
    >
      <Typography
        variant="h4"
        fontWeight={600}
      >
        Products
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
      >
        New Product
      </Button>
    </Box>

    <ProductsTable products={products ?? []} />
  </Paper>
);
};

export default ProductsPage;