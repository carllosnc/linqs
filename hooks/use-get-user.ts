import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["useGetUser"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data;
    }
  })
}