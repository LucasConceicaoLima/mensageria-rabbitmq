import { api } from "./axios";

import type { ApiResponse } from "../types/ApiResponse";
import type { CreateOrderDto } from "../types/dto/CreateOrderDto";
import type { OrderResponse } from "../types/OrderResponse";
import type { OrderEventResponse } from "../types/OrderEventResponse";

export const getOrders = async (): Promise<OrderResponse[]> => {
  const { data } =
    await api.get<ApiResponse<OrderResponse[]>>("/orders");

  return data.data;
};

export const getOrderById = async (
  id: string,
): Promise<OrderResponse> => {
  const { data } =
    await api.get<ApiResponse<OrderResponse>>(`/orders/${id}`);

  return data.data;
};

export const getOrderEvents = async (
  id: string,
): Promise<OrderEventResponse[]> => {
  const response = await api.get(`/orders/${id}/events`);

  return response.data.data;
};

export const createOrder = async (
  dto: CreateOrderDto,
): Promise<OrderResponse> => {
  const { data } =
    await api.post<ApiResponse<OrderResponse>>(
      "/orders",
      dto,
    );

  return data.data;
};

export const processPayment = async (
  id: string,
): Promise<OrderResponse> => {
  const { data } =
    await api.patch<ApiResponse<OrderResponse>>(
      `/orders/${id}/process-payment`,
    );

  return data.data;
};