import type { TClient } from "@/locales/client"
import * as z from "zod"

export const CreateNoteSchema = (t: TClient) =>
  z.object({
    content: z.string().min(1, { message: t("errors.contentRequired") })
  })

export const UpdateNoteSchema = (t: TClient) =>
  z.object({
    id: z.string(),
    content: z.string().min(1, { message: t("errors.contentRequired") })
  })

export const DeleteNoteSchema = z.object({
  id: z.string()
})

export type CreateNoteSchemaType = z.infer<ReturnType<typeof CreateNoteSchema>>
export type UpdateNoteSchemaType = z.infer<ReturnType<typeof UpdateNoteSchema>>
export type DeleteNoteSchemaType = z.infer<typeof DeleteNoteSchema>
