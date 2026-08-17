import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nome deve possuir pelo menos 3 caracteres"),

  description: z
    .string()
    .trim()
    .min(5, "Descrição deve possuir pelo menos 5 caracteres"),

  price: z.coerce
    .number()
    .min(0.01, "Preço deve ser maior que 0"),

  stock: z.coerce
    .number()
    .int("Estoque deve ser um número inteiro")
    .min(0, "Estoque não pode ser negativo ou zero"),
});

export type ProductFormData = z.input<typeof productFormSchema>;