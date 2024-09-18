import { cuid } from "@/lib/utils"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { Teams } from "../user/user-tables"

export const Notes = sqliteTable("note", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  content: text("content").notNull(),
  teamId: text("team_id")
    .references(() => Teams.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$default(() => new Date())
    .notNull(),
  modifiedAt: integer("modified_at", { mode: "timestamp" })
    .$default(() => new Date())
    .notNull()
    .$onUpdate(() => new Date())
})
