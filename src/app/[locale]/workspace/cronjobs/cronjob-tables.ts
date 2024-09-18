import { cuid } from "@/lib/utils"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Cronjobs = sqliteTable("cronjob", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  name: text("name").notNull().unique(),
  expression: text("expression").notNull(),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true)
})

export type CronjobStateType = typeof Cronjobs.$inferSelect
export type NewCronjobStateType = typeof Cronjobs.$inferInsert
