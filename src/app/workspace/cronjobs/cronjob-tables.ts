import { cuid } from "@/lib/utils"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const CronjobState = sqliteTable("cronjob_state", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  name: text("name").notNull().unique(),
  expression: text("expression").notNull(),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true)
})

export type CronjobStateType = typeof CronjobState.$inferSelect
export type NewCronjobStateType = typeof CronjobState.$inferInsert
