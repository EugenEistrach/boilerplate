import { db } from "@/db/db"
import { and, desc, eq, inArray } from "drizzle-orm"
import { requireUser } from "../user/user-session"
import { Notes } from "./note-tables"

export const getNotes = async () => {
  const user = await requireUser()
  const notes = await db
    .select()
    .from(Notes)
    .where(
      inArray(
        Notes.teamId,
        user.teams.map(team => team.id)
      )
    )
    .orderBy(desc(Notes.createdAt))
  return notes
}

export const createNote = async (content: string) => {
  const user = await requireUser()
  const note = await db
    .insert(Notes)
    .values({ content, teamId: user.defaultTeamId })
    .returning()
  return note
}

export const updateNote = async (id: string, content: string) => {
  const user = await requireUser()
  const note = await db
    .update(Notes)
    .set({ content })
    .where(and(eq(Notes.id, id), eq(Notes.teamId, user.defaultTeamId)))
    .returning()
  return note
}

export const deleteNote = async (id: string) => {
  const user = await requireUser()
  const note = await db
    .delete(Notes)
    .where(and(eq(Notes.id, id), eq(Notes.teamId, user.defaultTeamId)))
  return note
}
