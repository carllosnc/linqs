import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema";

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  numberOfLinks: int().notNull(),
  slug: text(),
  name: text().notNull(),
  userId: text().notNull().references(() => users.id),
});