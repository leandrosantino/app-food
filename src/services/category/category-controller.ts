import Elysia from "elysia";
import { Category } from "./category-schema";
import z from "zod";
import { getCatalogBySlug } from "../catalog/catalog-controller";
import supabase from "@/supabase";

export const categoryController = new Elysia({ prefix: "/category" }).get(
  "/",
  async ({ query: filters, set }) => {
    const catalog = await getCatalogBySlug(filters.catalog_slug);
    if (catalog == null) {
      return [];
    }

    const { data, error } = await supabase
      .from("category")
      .select<string, Category>("*")
      .eq("catalog_id", catalog.id)
      .order("id", { ascending: true });

    if (error) {
      set.status = 500;
      throw error;
    }

    return data;
  },
  {
    query: z.object({
      catalog_slug: z.string(),
    }),
  },
);
