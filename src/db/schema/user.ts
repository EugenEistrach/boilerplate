import { cuid } from "@/lib/utils"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  email: text("email").notNull()
})
