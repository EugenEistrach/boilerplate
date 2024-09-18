"use server"

import { actionClient } from "@/lib/actions"
import { getI18n, i18n } from "@/locales/server"
import { returnValidationErrors } from "next-safe-action"
import { revalidatePath } from "next/cache"
import { createNote, deleteNote, getNotes, updateNote } from "./note-queries"
import {
  CreateNoteSchema,
  DeleteNoteSchema,
  UpdateNoteSchema
} from "./note-validations"

export const createNoteAction = actionClient
  .schema(i18n(CreateNoteSchema))
  .action(async ({ parsedInput: { content } }) => {
    const notes = await getNotes()
    const isDuplicate = notes.some(
      note => note.content.toLowerCase() === content.toLowerCase()
    )

    if (isDuplicate) {
      const t = await getI18n()
      returnValidationErrors(CreateNoteSchema(t), {
        content: { _errors: [t("errors.contentAlreadyExists")] }
      })
    }

    const note = await createNote(content)
    revalidatePath("/workspace/notses")
    return { success: true, note }
  })

export const updateNoteAction = actionClient
  .schema(i18n(UpdateNoteSchema))
  .action(async ({ parsedInput: { id, content } }) => {
    const notes = await getNotes()
    const isDuplicate = notes.some(
      note =>
        note.id !== id && note.content.toLowerCase() === content.toLowerCase()
    )

    if (isDuplicate) {
      const t = await getI18n()
      returnValidationErrors(UpdateNoteSchema(t), {
        content: { _errors: [t("errors.contentAlreadyExists")] }
      })
    }

    const note = await updateNote(id, content)
    revalidatePath("/workspace/notes")
    return { success: true, note }
  })

export const deleteNoteAction = actionClient
  .schema(DeleteNoteSchema)
  .action(async ({ parsedInput: { id } }) => {
    await deleteNote(id)
    revalidatePath("/workspace/notes")
    return { success: true }
  })
