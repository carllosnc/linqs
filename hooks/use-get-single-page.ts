import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetSinglePage(id: string) {
  const supabase = createClient();

    return useQuery({
      gcTime: 0,
      queryKey: ["useGetSinglePage", id],
      queryFn: async () =>{
        const singlePageRequest = await supabase
          .from("pages")
          .select("*")
          .eq("id", id)
          .single();

        const singlePageData = singlePageRequest.data as Tables<'pages'>

        const linksRequest = await supabase
          .from("links")
          .select("*")
          .eq("page_id", id)
          .order("created_at", { ascending: false });

        const linksData = linksRequest.data as Tables<'links'>[]

        return {
          page: singlePageData,
          links: linksData
        };
    }
  })
}
