import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useGetPagesById(userId: string) {
  const [pages, setPages] = useState<Tables<'pages'>[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function getPages(){
    setLoading(true)

    const supabase = createClient()

    const pages = await supabase
      .from('pages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setPages(pages.data!)
    setLoading(false)
  }

  useEffect(() => {
    getPages()
  }, [])

  return {pages, loading}
}
