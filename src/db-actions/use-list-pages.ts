import { getPages } from "@/repository/page-service"
import { getCurrentUser } from "@/repository/user-service"
import { useSession } from "next-auth/react"
import { useCallback, useEffect } from "react"
import { atomPages, atomPagesLoading } from "@/atoms/page-atoms"
import { useAtom } from "jotai"

export function useListPages(){
  const { data: session } = useSession()
  const [, setPages] = useAtom(atomPages)
  const [, setLoading] = useAtom(atomPagesLoading)

  const getPagesAction = useCallback(async () => {
    setLoading(true)

    if (!session) return

    const user = await getCurrentUser(session!)
    const pages = await getPages(user)

    setLoading(false)
    setPages(pages)
  }, [session, setPages, setLoading])

  useEffect(() => {
    getPagesAction()
  }, [ session, getPagesAction ])
}