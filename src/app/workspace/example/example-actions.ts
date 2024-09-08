"use server"

import { actionClient } from "@/lib/actions"
import "server-only"
import { returnValidationErrors } from "next-safe-action"
import { revalidatePath } from "next/cache"
import {
  createExample,
  deleteExample,
  getExamples,
  updateExample
} from "./example-queries"
import {
  createExampleSchema,
  deleteExampleSchema,
  updateExampleSchema
} from "./example-validations"

export const createExampleAction = actionClient
  .schema(createExampleSchema)
  .action(async ({ parsedInput: { name } }) => {
    const examples = await getExamples()
    const isDuplicate = examples.some(
      example => example.note.toLowerCase() === name.toLowerCase()
    )

    if (isDuplicate) {
      returnValidationErrors(createExampleSchema, {
        name: { _errors: ["This name already exists"] }
      })
    }

    const example = await createExample(name)
    revalidatePath("/workspace/example")
    return { success: true, example }
  })

export const updateExampleAction = actionClient
  .schema(updateExampleSchema)
  .action(async ({ parsedInput: { id, name } }) => {
    const examples = await getExamples()
    const isDuplicate = examples.some(
      example =>
        example.id !== id && example.note.toLowerCase() === name.toLowerCase()
    )

    if (isDuplicate) {
      returnValidationErrors(updateExampleSchema, {
        name: { _errors: ["This name already exists"] }
      })
    }

    const example = await updateExample(id, name)
    revalidatePath("/workspace/example")
    return { success: true, example }
  })

export const deleteExampleAction = actionClient
  .schema(deleteExampleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await deleteExample(id)
    revalidatePath("/workspace/example")
    return { success: true }
  })
