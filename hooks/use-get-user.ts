import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useGetUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getUser() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, [])

  return { user, loading };
}