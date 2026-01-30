import Elysia from "elysia";
import { Product, productFiltersSchema, productSchema } from "./product-schema";
import { supabaseServerClient } from "@/supabase/server";
import { getCatalogBySlug } from "../catalog/catalog-controller";
import supabase from "@/supabase";

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
