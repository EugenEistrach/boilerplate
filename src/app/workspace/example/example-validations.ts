import { z } from "zod"

export const createExampleSchema = z.object({
  name: z.string().min(1, "Name is required")
})

export const updateExampleSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required")
})

export const deleteExampleSchema = z.object({
  id: z.string()
})
