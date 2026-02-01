import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { supabaseServerClient } from "@/supabase/server";

export default async function ProtectedPage() {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.from("address").select("*");

  return (
    <div className="p-4 flex flex-wrap gap-4">
      <LogoutButton />
      <pre>{!error && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
