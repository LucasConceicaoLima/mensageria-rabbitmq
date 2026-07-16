import { api } from "./axios";

import type { ApiResponse } from "../types/ApiResponse";
import type { Product } from "../types/Product";
import type { CreateProductDto } from "../types/dto/CreateProductDto";
import type { UpdateProductDto } from "../types/dto/UpdateProductDto";

export const getProducts = async (): Promise<Product[]> => {
  const { data } =
    await api.get<ApiResponse<Product[]>>("/products");

  return data.data;
};

export const getProductById = async (
  id: string,
): Promise<Product> => {
  const { data } =
    await api.get<ApiResponse<Product>>(`/products/${id}`);

  return data.data;
};

export const createProduct = async (
  dto: CreateProductDto,
): Promise<Product> => {
  const { data } =
    await api.post<ApiResponse<Product>>(
      "/products",
      dto,
    );

  return data.data;
};

export const updateProduct = async (
  id: string,
  dto: UpdateProductDto,
): Promise<Product> => {
  const { data } =
    await api.put<ApiResponse<Product>>(
      `/products/${id}`,
      dto,
    );

  return data.data;
};

export const deleteProduct = async (
  id: string,
): Promise<void> => {
  await api.delete(`/products/${id}`);
};