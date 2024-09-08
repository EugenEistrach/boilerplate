import { z } from "zod"

export const createNoteSchema = z.object({
  content: z.string().min(1, "Content is required")
})

export const updateNoteSchema = z.object({
  id: z.string(),
  content: z.string().min(1, "Content is required")
})

export const deleteNoteSchema = z.object({
  id: z.string()
})
