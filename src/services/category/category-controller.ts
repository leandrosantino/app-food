import Elysia from "elysia";
import supabase from "@/lib/supabase";
import { Category } from "./category-schema";
import z from "zod";

export const categoryController = new Elysia({ prefix: "/category" }).get(
  "/",
  async ({ query: filters, set }) => {
    const query = supabase.from("category").select<string, Category>("*");

    query.eq("catalog_id", filters.catalog_slug);
    query.order("id", { ascending: true });

    const { data, error } = await query;
    console.log(data, error);
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
