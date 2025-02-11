import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useGetProfile(userId: string) {
  const [profile, setProfile] = useState<Tables<'profiles'>>();
  const [loadingProfile, setLoading] = useState(false);

  async function getProfile() {
    setLoading(true);
    const supabase = createClient();
    const profile = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

      setProfile(await profile.data!)
      setLoading(false);
  }

  useEffect(() => {
    getProfile();
  }, [])

  return { profile, loadingProfile };
}