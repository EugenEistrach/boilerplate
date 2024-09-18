import { cuid } from "@/lib/utils"
import { relations } from "drizzle-orm"
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core"

export const Users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  defaultTeamId: text("default_team_id")
    .notNull()
    .references(() => Teams.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date())
})

export const Teams = sqliteTable("team", {
  id: text("id")
    .primaryKey()
    .$default(() => cuid()),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date())
})

export const TeamMembers = sqliteTable(
  "team_member",
  {
    id: text("id")
      .primaryKey()
      .$default(() => cuid()),
    teamId: text("team_id")
      .references(() => Teams.id)
      .notNull(),
    userId: text("user_id")
      .references(() => Users.id)
      .notNull(),

    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date()
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date())
  },
  table => ({
    teamUserUnique: unique().on(table.teamId, table.userId)
  })
)

export const usersRelations = relations(Users, ({ one, many }) => ({
  defaultTeam: one(Teams, {
    fields: [Users.defaultTeamId],
    references: [Teams.id]
  }),
  teams: many(TeamMembers)
}))

export const teamsRelations = relations(Teams, ({ many }) => ({
  members: many(TeamMembers)
}))

export const teamMembersRelations = relations(TeamMembers, ({ one }) => ({
  team: one(Teams, {
    fields: [TeamMembers.teamId],
    references: [Teams.id]
  }),
  user: one(Users, {
    fields: [TeamMembers.userId],
    references: [Users.id]
  })
}))

export type Team = typeof Teams.$inferSelect
