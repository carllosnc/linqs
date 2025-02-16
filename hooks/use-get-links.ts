import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetLinks(id: string) {
  const supabase = createClient();

    return useQuery({
      queryKey: ["getLinks", id],
      queryFn: async () => {
        const singlePageRequest = await supabase
          .from("pages")
          .select("*")
          .eq("id", id)
          .single();

        const singlePageData = singlePageRequest.data as Tables<'pages'>

        const userId = singlePageData.user_id

        const linksRequest = await supabase
          .from("links")
          .select("*")
          .eq("page_id", id)
          .order("created_at", { ascending: false });

        const linksData = linksRequest.data as Tables<'links'>[]

        const profileRequest = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        const profileData = profileRequest.data as Tables<'profiles'>

        const {data: {user}} = await supabase.auth.getUser()

        return {
          page: singlePageData,
          links: linksData,
          profile: profileData,
          user: user
        };
      }
  })
}
