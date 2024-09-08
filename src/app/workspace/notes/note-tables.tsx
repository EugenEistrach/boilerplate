import { cuid } from "@/lib/utils"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Notes = sqliteTable("note", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$default(() => new Date())
    .notNull(),
  modifiedAt: integer("modified_at", { mode: "timestamp" })
    .$default(() => new Date())
    .notNull()
    .$onUpdate(() => new Date())
})
