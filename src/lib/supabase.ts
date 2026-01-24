import { createClient } from "@supabase/supabase-js";
import z from "zod";

const env = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY: z.string(),
  })
  .parse(process.env);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
