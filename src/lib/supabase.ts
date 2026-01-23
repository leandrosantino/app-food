import { createClient } from "@supabase/supabase-js";
import z from "zod";

const env = z
  .object({
    SUPABASE_URL: z.string(),
    SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string(),
  })
  .parse(process.env);

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
