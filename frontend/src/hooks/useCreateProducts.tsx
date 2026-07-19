import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "../api/products.api";

import type { CreateProductDto } from "../types/dto/CreateProductDto";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateProductDto) =>
      createProduct(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};