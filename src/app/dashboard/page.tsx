import { checkSession } from "@/lib/check-session"

export default async function Dashboard() {
  await checkSession()

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1>Dashboard</h1>
    </div>
  )
}