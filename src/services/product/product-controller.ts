import Elysia from "elysia";
import { Product, productFiltersSchema, productSchema } from "./product-schema";
import supabase from "@/lib/supabase";
import { getCatalogBySlug } from "../catalog/catalog-controller";

export const productController = new Elysia({ prefix: "/product" }).get(
  "/",
  async ({ query: filters, set }) => {
    const catalog = await getCatalogBySlug(filters.catalog_slug);
    if (catalog == null) {
      return [];
    }

    const { data, error } = await supabase
      .from("product")
      .select<string, Product>("*")
      .eq("catalog_id", catalog.id);

    if (error) {
      set.status = 500;
      throw error;
    }

    return data;
  },
  {
    query: productFiltersSchema,
  },
);
