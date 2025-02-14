import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetProfileById(userId: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["useGetProfileById"],
    queryFn: async () => {
      const profileRequest = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const profile = profileRequest.data as Tables<'profiles'>

      const pagesRequest = await supabase
        .from("pages")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      const pages = pagesRequest.data as Tables<'pages'>[]

      return {
        profile,
        pages
      }
    }
  })
}