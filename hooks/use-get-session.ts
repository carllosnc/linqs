import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetSession() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["getSession"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data;
    }
  })
}