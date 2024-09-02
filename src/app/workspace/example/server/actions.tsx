"use server"

import { actionClient } from "@/lib/actions"
import "server-only"
import { revalidatePath } from "next/cache"
import { zfd } from "zod-form-data"
import { createExample, deleteExample, updateExample } from "./queries"

export const createExampleAction = actionClient
  .schema(
    zfd.formData({
      name: zfd.text()
    })
  )
  .action(async ({ parsedInput: { name } }) => {
    await createExample(name)
    revalidatePath("/workspace/example")
  })

export const updateExampleAction = actionClient
  .schema(
    zfd.formData({
      id: zfd.text(),
      name: zfd.text()
    })
  )
  .action(async ({ parsedInput: { id, name } }) => {
    await updateExample(id, name)
    revalidatePath("/workspace/example")
  })

export const deleteExampleAction = actionClient
  .schema(
    zfd.formData({
      id: zfd.text()
    })
  )
  .action(async ({ parsedInput: { id } }) => {
    await deleteExample(id)
    revalidatePath("/workspace/example")
  })
