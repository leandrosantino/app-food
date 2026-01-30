import z from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY: z.string(),
});
