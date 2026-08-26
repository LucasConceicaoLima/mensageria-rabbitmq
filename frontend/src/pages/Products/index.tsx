import { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useSnackbar } from "../../hooks/useSnackbar";
import { useProducts } from "../../hooks/useProducts";
import { useCreateProduct } from "../../hooks/useCreateProducts";
import { useUpdateProduct } from "../../hooks/useUpdateProducts";
import { useDeleteProduct } from "../../hooks/useDeleteProducts";

import { ProductsTable } from "./components/ProductsTable";
import { ProductsTableSkeleton } from "./components/ProductsTableSkeleton";
import { ProductFormDialog } from "./components/ProductFormDialog";
import { DeleteProductDialog } from "./components/DeleteProductDialog";

import type { Product } from "../../types/Product";
import type { CreateProductDto } from "../../types/dto/CreateProductDto";

import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const ProductsPage = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const { showSnackbar } = useSnackbar();

  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product>();

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

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
    try {
      if (selectedProduct) {
        await updateMutation.mutateAsync({
          id: selectedProduct.id,
          dto,
        });

        showSnackbar(
          "Produto atualizado com sucesso!",
          "success",
        );
      } else {
        await createMutation.mutateAsync(dto);

        showSnackbar(
          "Produto criado com sucesso!",
          "success",
        );
      }

      setFormOpen(false);
      setSelectedProduct(undefined);
    } catch (error) {
      showSnackbar(
        getApiErrorMessage(error),
        "error",
      );
    }
  };

  const handleConfirmDelete =
    async () => {
      if (!selectedProduct) {
        return;
      }

      try {
        await deleteMutation.mutateAsync(
          selectedProduct.id,
        );

        showSnackbar(
          "Produto excluído com sucesso!",
          "success",
        );

        setDeleteOpen(false);
        setSelectedProduct(undefined);
      } catch (error) {
        showSnackbar(
          getApiErrorMessage(error),
          "error",
        );
      }
    };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={600}
            >
              Produtos
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              Gerencie os produtos disponíveis na plataforma.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disabled
          >
            Novo produto
          </Button>
        </Stack>

        <ProductsTableSkeleton />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
        >
          <Typography
            variant="h6"
            fontWeight={600}
          >
            Não foi possível carregar os produtos
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Ocorreu um erro ao buscar os dados.
            Tente novamente.
          </Typography>

          <Button
            variant="contained"
            onClick={() => refetch()}
          >
            Tentar novamente
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={4}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing="-0.02em"
            >
              Produtos
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              Gerencie os produtos disponíveis na plataforma.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Novo produto
          </Button>
        </Stack>

        {products.length > 0 && (
          <TextField
            fullWidth
            size="small"
            placeholder="Pesquisar produtos..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            sx={{
              mb: 3,
              maxWidth: 400,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        )}

        {products.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={8}
            gap={2}
          >
            <Typography
              variant="h6"
              fontWeight={600}
            >
              Nenhum produto encontrado
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
            >
              Crie seu primeiro produto para começar
              a receber pedidos.
            </Typography>
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={8}
            gap={2}
          >
            <Typography
              variant="h6"
              fontWeight={600}
            >
              Nenhum produto encontrado
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
            >
              Tente pesquisar com um nome diferente.
            </Typography>
          </Box>
        ) : (
          <ProductsTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Box>

      <ProductFormDialog
        open={formOpen}
        title={
          selectedProduct
            ? "Editar Produto"
            : "Novo Produto"
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
        loading={deleteMutation.isPending}
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