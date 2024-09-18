"use server"

import { actionClient } from "@/lib/actions"
import { returnValidationErrors } from "next-safe-action"
import { revalidatePath } from "next/cache"
import { createNote, deleteNote, getNotes, updateNote } from "./note-queries"
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema
} from "./note-validations"

export const createNoteAction = actionClient
  .schema(createNoteSchema)
  .action(async ({ parsedInput: { content } }) => {
    const notes = await getNotes()
    const isDuplicate = notes.some(
      note => note.content.toLowerCase() === content.toLowerCase()
    )

    if (isDuplicate) {
      returnValidationErrors(createNoteSchema, {
        content: { _errors: ["This content already exists"] }
      })
    }

    const note = await createNote(content)
    revalidatePath("/workspace/notes")
    return { success: true, note }
  })

export const updateNoteAction = actionClient
  .schema(updateNoteSchema)
  .action(async ({ parsedInput: { id, content } }) => {
    const notes = await getNotes()
    const isDuplicate = notes.some(
      note =>
        note.id !== id && note.content.toLowerCase() === content.toLowerCase()
    )

    if (isDuplicate) {
      returnValidationErrors(updateNoteSchema, {
        content: { _errors: ["This content already exists"] }
      })
    }

    const note = await updateNote(id, content)
    revalidatePath("/workspace/notes")
    return { success: true, note }
  })

export const deleteNoteAction = actionClient
  .schema(deleteNoteSchema)
  .action(async ({ parsedInput: { id } }) => {
    await deleteNote(id)
    revalidatePath("/workspace/notes")
    return { success: true }
  })
