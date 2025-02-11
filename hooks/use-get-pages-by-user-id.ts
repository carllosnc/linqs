import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useGetPagesByUserId(userId: string) {
  const [pages, setPages] = useState<Tables<'pages'>[]>([])
  const [loadingPages, setLoadingPages] = useState<boolean>(false)

  async function getPages(){
    setLoadingPages(true)

    const supabase = createClient()

    const pages = await supabase
      .from('pages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setPages(pages.data!)
    setLoadingPages(false)
  }

  useEffect(() => {
    getPages()
  }, [])

  return {pages, loadingPages}
}
