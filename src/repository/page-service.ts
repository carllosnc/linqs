import { db } from "@/database"
import { pages } from "@/db-schemas/page-schema"
import { NewPage, User } from "@/lib/db-types"
import { eq } from "drizzle-orm"

export async function createPage(page: NewPage){
  return await db.insert(pages).values(page).returning({
    insertedId: pages.id,
  })
}

export async function getPages(user: User){
  return await db.select().from(pages).where(eq(pages.userId, user.id))
}

export async function getPage(id: string){
  return await db.select().from(pages).where(eq(pages.id, id))
}

export async function updatePage(id: string, page: NewPage){
  return await db.update(pages).set(page).where(eq(pages.id, id))
}

export async function deletePage(id: string){
  return await db.delete(pages).where(eq(pages.id, id))
}
