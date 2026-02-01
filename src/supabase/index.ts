import { supabaseServerClient } from "./server";

const supabase = await supabaseServerClient({
  noCookies: true,
});

export default supabase;
