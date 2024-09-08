import "server-only"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { Examples } from "./example-schemas"

export const getExamples = async () => {
  const examples = await db.select().from(Examples)
  return examples
}

export const createExample = async (note: string) => {
  const example = await db.insert(Examples).values({ note }).returning()
  return example
}

export const updateExample = async (id: string, note: string) => {
  const example = await db
    .update(Examples)
    .set({ note })
    .where(eq(Examples.id, id))
  return example
}

export const deleteExample = async (id: string) => {
  const example = await db.delete(Examples).where(eq(Examples.id, id))
  return example
}
