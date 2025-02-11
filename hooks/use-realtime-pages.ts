import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useRealtimePages(pages: Tables<'pages'>[]) {
  const supabase = createClient();
  const [listOfPages, setListOfPages] = useState<Tables<'pages'>[]>(pages);

  useEffect(() => {
    const subscription = supabase
      .channel("pages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pages" },
        (payload) => {
          setListOfPages(c => [payload.new, ...c] as Tables<'pages'>[]);
        },
      ).subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase]);

  return listOfPages;
}
