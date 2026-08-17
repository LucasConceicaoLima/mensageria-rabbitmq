import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyField } from "../../../components/CurrencyField";
import type { Product } from "../../../types/Product";
import type { CreateProductDto } from "../../../types/dto/CreateProductDto";
import {
  productFormSchema,
  type ProductFormData,
} from "./productForm.schema";

interface Props {
  initialValues?: Product;
  loading?: boolean;
  onSubmit: (
    values: CreateProductDto,
  ) => void;
  onCancel: () => void;
}

export const ProductForm = ({
  initialValues,
  loading,
  onSubmit,
  onCancel,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    if (!initialValues) {
      reset({
        name: "",
        description: "",
        price: 0,
        stock: 0,
      });

      return;
    }

    reset({
      name: initialValues.name,
      description: initialValues.description,
      price: initialValues.price,
      stock: initialValues.stock,
    });
  }, [initialValues, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((values) =>
        onSubmit(values as CreateProductDto),
      )}
      sx={{ mt: 2 }}
    >
      <Stack spacing={2}>
        <TextField
          label="Nome"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Descrição"
          multiline
          rows={3}
          fullWidth
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <CurrencyField<ProductFormData>
          name="price"
          control={control}
          label="Preço"
          fullWidth
        />

        <TextField
          label="Estoque"
          type="number"
          {...register("stock", {
            valueAsNumber: true,
          })}
          error={!!errors.stock}
          helperText={errors.stock?.message}
        />

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            loading={loading}
          >
            Salvar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};