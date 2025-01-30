import { pages } from "@/db-schemas/page-schema"
import { users } from "@/db-schemas/user-schema"

export type NewPage = typeof pages.$inferInsert
export type Page = typeof pages.$inferSelect
export type User = typeof users.$inferSelect
