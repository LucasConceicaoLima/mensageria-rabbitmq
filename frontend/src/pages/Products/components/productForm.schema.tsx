import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must have at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(5, "Description must have at least 5 characters"),

  price: z.coerce
    .number()
    .min(0.01, "Price must be greater than 0"),

  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

export type ProductFormData = z.input<typeof productFormSchema>;