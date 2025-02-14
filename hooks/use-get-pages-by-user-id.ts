import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetPagesByUserId(userId: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["getSession"],
    queryFn: async () => {
      const profile = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const pages = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      return {
        profile: profile.data,
        pages: pages.data
      }
    }
  })
}
