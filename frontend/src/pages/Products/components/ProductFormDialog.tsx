import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import type { Product } from "../../../types/Product";
import type { CreateProductDto } from "../../../types/dto/CreateProductDto";

import { ProductForm } from "./ProductForm";

interface Props {
  open: boolean;
  title: string;
  loading?: boolean;
  product?: Product;
  onClose: () => void;
  onSubmit: (
    dto: CreateProductDto,
  ) => void;
}

export const ProductFormDialog = ({
  open,
  title,
  loading,
  product,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        <ProductForm
          initialValues={product}
          loading={loading}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};