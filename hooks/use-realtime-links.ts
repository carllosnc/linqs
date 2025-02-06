import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useRealtimeLinks(links: Tables<'links'>[]) {
  const supabase = createClient();
  const [listOfLinks, setListOfLinks] = useState<Tables<'links'>[]>(links);

  useEffect(() => {
    const subscription = supabase
      .channel("links")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "links" },
        (payload) => {
          setListOfLinks(c => [payload.new, ...c] as Tables<'links'>[]);
        },
      ).on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "links" },
        (payload) => {
          setListOfLinks(c => c.filter(link => link.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase]);

  return listOfLinks;
}
