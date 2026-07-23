export type OrderItemResponse = {
  id: string;

  product: {
    id: string;
    name: string;
  };

  quantity: number;
  unitPrice: number;
  subtotal: number;
};