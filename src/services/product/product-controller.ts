import Elysia from "elysia";
import { Product, productFiltersSchema, productSchema } from "./product-schema";
import supabase from "@/lib/supabase";

export const productController = new Elysia({ prefix: "/product" }).get(
  "/",
  async ({ query: filters, set }) => {
    const query = supabase.from("product").select<string, Product>("*");

    query.eq("catalog_id", filters.catalog_id);

    const { data, error } = await query;

    if (error) {
      set.status = 500;
      throw error;
    }

    return data;
  },
  {
    query: productFiltersSchema,
    // response: productSchema,
  },
);
