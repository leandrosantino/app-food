import z from "zod";
import { categorySchema } from "../category/category-schema";

export const productSchema = z.object({
  id: z.string(),
  price: z.number(),
  name: z.string(),
  description: z.string(),
  image_url: z.url(),
  category: categorySchema.optional(),
  category_id: z.number(),
});

export type Product = z.infer<typeof productSchema>;

export const productFiltersSchema = z.object({
  category: z.string().optional(),
  text: z.string().optional(),
  catalog_id: z.string().optional(),
});

export type ProductFilters = z.infer<typeof productFiltersSchema>;
