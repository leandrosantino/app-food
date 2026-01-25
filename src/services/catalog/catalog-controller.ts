import supabase from "@/lib/supabase";
import { Catalog } from "./catalog-schema";

export async function getCatalogBySlug(slug?: string) {
  const { data, error } = await supabase
    .from("catalog")
    .select<string, Catalog>("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  return data;
}
