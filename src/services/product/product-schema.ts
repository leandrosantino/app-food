import z from "zod";

export const productSchema = z.object({
  id: z.string(),
  price: z.number(),
  name: z.string(),
  description: z.string(),
  image_url: z.url(),
  category: z.enum(["acai", "lanches", "salgados", "bebidas", "combos"]),
});

export type Product = z.infer<typeof productSchema>;

export const productFiltersSchema = z.object({
  category: z.string().optional(),
  text: z.string().optional(),
});

export type ProductFilters = z.infer<typeof productFiltersSchema>;
