import { cuid } from "@/lib/utils"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Examples = sqliteTable("example", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  note: text("note").notNull()
})
