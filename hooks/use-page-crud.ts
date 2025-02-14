import { Tables, TablesInsert, TablesUpdate } from "@/database.types"
import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { pagesAtom } from "@/atoms/pages-atom"
import { useAtom } from "jotai"
import { QueryCache } from "@tanstack/react-query"

export function usePageCrud() {
  const supabase = createClient();
  const [globalPages, setGlobalPages] = useAtom(pagesAtom);

  const getAllPages = useQuery({
    gcTime: 0,
    queryKey: ["useGetPages"],
    queryFn: async () =>{
      const { data: { user } } = await supabase.auth.getUser();

      const request = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      const pages = request.data as Tables<'pages'>[]

      setGlobalPages(pages)

      return {
        pages,
        user
      };
    }
  })

  const createPage = useMutation({
    onSuccess(result) {
      const newPage = result.data![0]
      setGlobalPages([newPage, ...globalPages])
    },
    mutationFn: async (data: any) => {
      const { data: { user } } = await supabase.auth.getUser();

      const pageData: TablesInsert<"pages"> = {
        user_id: user?.id,
        description: data.description,
        title: data.title,
      };

      return await supabase
        .from("pages")
        .insert(pageData)
        .select("*")
    }
  })

  const deletePage = (pageId: string) => useMutation({
    onSuccess(result) {
      const deletedPage = result.data![0]
      setGlobalPages(globalPages.filter(page => page.id !== deletedPage.id))
    },
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();

      return await supabase
        .from("pages")
        .delete()
        .eq("id", pageId)
        .eq("user_id", user?.id)
        .select("*")
    }
  })

  const updatePage = (pageId: string) => useMutation({
    onSuccess(result) {
      const updatedPage = result.data![0]
      setGlobalPages(globalPages.map(page => {
        if (page.id === updatedPage.id) {
          return updatedPage
        }

        return page
      }))
    },
    mutationFn: async (data: TablesUpdate<"pages">) => {
      const { data: { user } } = await supabase.auth.getUser();

      return await supabase
        .from("pages")
        .update(data)
        .eq("id", pageId)
        .eq("user_id", user?.id)
        .select("*")
    }
  })

  return {
    globalPages,
    getAllPages,
    createPage,
    deletePage,
    updatePage
  }
}
