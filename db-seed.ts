import { Product } from "@/services/product/product-schema";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const env = z
  .object({
    VITE_SUPABASE_URL: z.string(),
    VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string(),
  })
  .parse(process.env);

const supabaseUrl = env.VITE_SUPABASE_URL!;
const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const storage_base_url =
  "https://xpmrmuypbgnnknxjsjpe.supabase.co/storage/v1/object/public/product_images";

export async function saveProducts(products: Product[]) {
  for (const { id, image_url, price, ...product } of products) {
    const { error } = await supabase.from("product").insert({
      ...product,
      price: Math.ceil(price * 100),
      image_url: `${storage_base_url}/${image_url}`,
    });

    if (error) {
      console.error(`Erro ao salvar produto ${id}`, error);
      throw error;
    }
  }
}

saveProducts(products);
