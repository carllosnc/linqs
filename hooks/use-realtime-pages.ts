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
          if(payload.eventType === "INSERT"){
            setListOfPages(c => [payload.new, ...c] as Tables<'pages'>[]);
          }

          if(payload.eventType === "DELETE"){
            setListOfPages(c => c.filter(page => page.id !== payload.old.id));
          }
        },
      ).subscribe();

    return () => {
      //supabase.removeChannel(subscription);
    };
  }, [supabase]);

  return listOfPages;
}
