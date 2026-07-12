import { api } from "./axios";

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[];
}

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await api.get("/orders");
  return data;
};

export const getOrderById = async (
  id: string,
): Promise<Order> => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const createOrder = async (
  dto: CreateOrderDto,
): Promise<Order> => {
  const { data } = await api.post("/orders", dto);
  return data;
};

export const processPayment = async (
  id: string,
): Promise<Order> => {
  const { data } = await api.patch(
    `/orders/${id}/process-payment`,
  );

  return data;
};