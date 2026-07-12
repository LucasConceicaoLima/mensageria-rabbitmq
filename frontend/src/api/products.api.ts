import { api } from "./axios";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data.data;
};

export const getProductById = async (
  id: string,
): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (
  dto: CreateProductDto,
): Promise<Product> => {
  const { data } = await api.post("/products", dto);
  return data;
};

export const updateProduct = async (
  id: string,
  dto: UpdateProductDto,
): Promise<Product> => {
  const { data } = await api.put(`/products/${id}`, dto);
  return data;
};

export const deleteProduct = async (
  id: string,
): Promise<void> => {
  await api.delete(`/products/${id}`);
};