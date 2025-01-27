import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function checkAuth() {
  const session = await auth()
  return session?.user ? redirect("/") : session
}

export async function checkSession() {
  const session = await auth()
  return !session?.user ? redirect("/auth") : session
}
