import { useState } from "react";
import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import { useSnackbar } from "../../context/SnackbarContext";
import AddIcon from "@mui/icons-material/Add";
import { useProducts } from "../../hooks/useProducts";
import { useCreateProduct } from "../../hooks/useCreateProducts";
import { useUpdateProduct } from "../../hooks/useUpdateProducts";
import { useDeleteProduct } from "../../hooks/useDeleteProducts";
import { ProductsTable } from "./components/ProductsTable";
import { ProductFormDialog } from "./components/ProductFormDialog";
import { DeleteProductDialog } from "./components/DeleteProductDialog";

import type { Product } from "../../types/Product";
import type { CreateProductDto } from "../../types/dto/CreateProductDto";
import { ProductsTableSkeleton } from "./components/ProductsTableDialog";

const ProductsPage = () => {
  const { data: products, isLoading, isError } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const { showSnackbar } = useSnackbar();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const handleCreate = () => {
    setSelectedProduct(undefined);
    setFormOpen(true);
  };

  const handleEdit = (
    product: Product,
  ) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleDelete = (
    product: Product,
  ) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleSubmit = async (
    dto: CreateProductDto,
  ) => {
    if (selectedProduct) {
      await updateMutation.mutateAsync({
        id: selectedProduct.id,
        dto,
      });
      showSnackbar(
        "Product updated successfully!",
        "success",
      );
    } else {
      await createMutation.mutateAsync(dto);
      showSnackbar(
        "Product created successfully!",
        "success",
      );
    }

    setFormOpen(false);
    setSelectedProduct(undefined);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(
        selectedProduct.id,
      );

      showSnackbar(
        "Product deleted successfully!",
        "success",
      );

      setDeleteOpen(false);
      setSelectedProduct(undefined);
    } catch {
      showSnackbar(
        "Error deleting product.",
        "error",
      );
    }
  };

  if (isLoading) {
    return (
      <>
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
            mb={3}
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
              disabled
            >
              New Product
            </Button>
          </Box>

          <ProductsTableSkeleton />
        </Paper>
      </>
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
    <>
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
          mb={3}
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
            onClick={handleCreate}
          >
            New Product
          </Button>
        </Box>

        <ProductsTable
          products={products ?? []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      <ProductFormDialog
        open={formOpen}
        title={
          selectedProduct
            ? "Edit Product"
            : "New Product"
        }
        product={selectedProduct}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onClose={() => {
          setFormOpen(false);
          setSelectedProduct(undefined);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteProductDialog
        open={deleteOpen}
        loading={
          deleteMutation.isPending
        }
        onClose={() => {
          setDeleteOpen(false);
          setSelectedProduct(undefined);
        }}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

export default ProductsPage;