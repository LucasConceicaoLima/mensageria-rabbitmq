import { Box, Button, Stack, TextField,} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../../types/Product";
import type { CreateProductDto } from "../../../types/dto/CreateProductDto";
import { productFormSchema, type ProductFormData } from "./productForm.schema";

interface Props {
  initialValues?: Product;
  loading?: boolean;
  onSubmit: (
    values: CreateProductDto,
  ) => void;
}

export const ProductForm = ({
  initialValues,
  loading,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
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
      onSubmit={handleSubmit((values) => onSubmit(values as CreateProductDto))}
      sx={{ mt: 2 }}
    >
      <Stack spacing={2}>
        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          fullWidth
          {...register("description")}
          error={!!errors.description}
          helperText={
            errors.description?.message
          }
        />

        <TextField
          label="Price"
          type="number"
          {...register("price", {
            valueAsNumber: true,
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          label="Stock"
          type="number"
          {...register("stock", {
            valueAsNumber: true,
          })}
          error={!!errors.stock}
          helperText={errors.stock?.message}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Stack>
    </Box>
  );
};