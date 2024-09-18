import { db } from "@/db/db"
import { and, eq } from "drizzle-orm"
import { type Team, TeamMembers, Teams, Users } from "./user-tables"

export type User = typeof Users.$inferSelect & {
  teams: Team[]
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await db.query.Users.findFirst({
    where: eq(Users.email, email),
    with: {
      teams: {
        with: {
          team: true
        }
      }
    }
  })

  if (!user) {
    return null
  }

  return {
    ...user,
    teams: user?.teams.map(team => team.team) ?? []
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await db.query.Users.findFirst({
    where: eq(Users.id, id),
    with: {
      teams: {
        with: {
          team: true
        }
      }
    }
  })

  if (!user) {
    return null
  }

  return {
    ...user,
    teams: user?.teams.map(team => team.team) ?? []
  }
}

export async function createUser(
  email: string,
  name?: string,
  avatarUrl?: string
) {
  return await db.transaction(async tx => {
    const [defaultTeam] = await tx.insert(Teams).values({}).returning()

    const [user] = await tx
      .insert(Users)
      .values({ email, avatarUrl, name, defaultTeamId: defaultTeam.id })
      .returning()

    await addUserToTeam(user.id, defaultTeam.id)
    return user.id
  })
}

export async function getTeamById(id: string) {
  return db.query.Teams.findFirst({
    where: eq(Teams.id, id),
    with: {
      members: {
        with: {
          user: true
        }
      }
    }
  })
}

export async function addUserToTeam(userId: string, teamId: string) {
  const [member] = await db
    .insert(TeamMembers)
    .values({ userId, teamId })
    .onConflictDoNothing()
    .returning({ id: TeamMembers.id })

  if (!member) {
    const existingMember = await db.query.TeamMembers.findFirst({
      where: and(
        eq(TeamMembers.userId, userId),
        eq(TeamMembers.teamId, teamId)
      ),
      columns: { id: true }
    })
    return existingMember?.id
  }

  return member.id
}

export async function removeUserFromTeam(userId: string, teamId: string) {
  const user = await getUserById(userId)
  if (user?.defaultTeamId === teamId) {
    throw new Error("Cannot remove user from their default team")
  }
  return db
    .delete(TeamMembers)
    .where(and(eq(TeamMembers.userId, userId), eq(TeamMembers.teamId, teamId)))
    .returning()
}
