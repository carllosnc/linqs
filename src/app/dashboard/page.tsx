import { checkSession } from "@/lib/check-session"
import { CreatePageButton } from "@/components/create-page-button"
import { ListPages } from "@/components/dashboard/list-pages"

export default async function Dashboard() {
  await checkSession()

  return (
    <main>
      <CreatePageButton />
      <ListPages />
    </main>
  )
}