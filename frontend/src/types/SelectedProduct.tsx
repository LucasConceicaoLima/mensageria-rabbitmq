import type { Product } from "./Product";

export type SelectedProduct = Product & {
  quantity: number;
};