import { db } from "@/database"
import { users } from "@/db-schemas/user-schema"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"

export async function getCurrentUser(session: Session){
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session!.user!.email!))

  return user[0]
}
