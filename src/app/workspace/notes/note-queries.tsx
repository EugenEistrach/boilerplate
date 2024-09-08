import "server-only"
import { db } from "@/db/db"
import { desc, eq } from "drizzle-orm"
import { Notes } from "./note-tables"

export const getNotes = async () => {
  const notes = await db.select().from(Notes).orderBy(desc(Notes.createdAt))
  return notes
}

export const createNote = async (content: string) => {
  const note = await db.insert(Notes).values({ content }).returning()
  return note
}

export const updateNote = async (id: string, content: string) => {
  const note = await db
    .update(Notes)
    .set({ content })
    .where(eq(Notes.id, id))
    .returning()
  return note
}

export const deleteNote = async (id: string) => {
  const note = await db.delete(Notes).where(eq(Notes.id, id))
  return note
}
