import type { OrderItemResponse } from "./OrderItemResponse";

export type OrderResponse = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItemResponse[];
};
