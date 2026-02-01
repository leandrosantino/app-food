import supabase from "@/supabase";
import { Address, Catalog, OpeningHours } from "./catalog-schema";

export async function getCatalogBySlug(slug?: string) {
  const { data, error } = await supabase
    .from("catalog")
    .select<string, Catalog>("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  return data;
}

export async function getAddressByCatalog(catalogId: number) {
  const { data, error } = await supabase
    .from("address")
    .select<any, Address>(`*`)
    .eq("catalog_id", "1")
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

export async function getOpeningHoursByCatalog(catalogId: number) {
  const { data, error } = await supabase
    .from("opening_hours")
    .select<any, OpeningHours>("*")
    .eq("catalog_id", catalogId)
    .order("id", { ascending: true });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}
