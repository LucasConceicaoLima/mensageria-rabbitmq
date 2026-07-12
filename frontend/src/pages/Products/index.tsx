import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
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
    <Stack spacing={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">
          Products
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Product
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <ProductsTable
          products={products ?? []}
        />
      </Paper>
    </Stack>
  );
};

export default ProductsPage;