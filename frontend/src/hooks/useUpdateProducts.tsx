import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProduct } from "../api/products.api";

import type { UpdateProductDto } from "../types/dto/UpdateProductDto";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;
      dto: UpdateProductDto;
    }) => updateProduct(id, dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};