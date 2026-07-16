import type { OrderItemResponse } from "./OrderItemResponse";
import type { OrderEventResponse } from "./OrderEventResponse";

export type OrderResponse = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItemResponse[];
  events: OrderEventResponse[];
};
