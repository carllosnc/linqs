import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetPages() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["getPages"],
    queryFn: async () =>{
      const { data: { user } } = await supabase.auth.getUser();

      const request = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      const pages = request.data as Tables<'pages'>[]

      return {
        pages,
        user
      };
    }
  })
}
