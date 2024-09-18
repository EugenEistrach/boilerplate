"use server"

import { cronjobManager } from "@/app/[locale]/workspace/cronjobs/cronjob-jobs"
import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { type CronjobStateType, Cronjobs } from "./cronjob-tables"

type UpdateType = Partial<Pick<CronjobStateType, "enabled" | "expression">>

export async function updateCronjobState(
  name: string,
  updates: UpdateType
): Promise<CronjobStateType> {
  const existingState = await db
    .select()
    .from(Cronjobs)
    .where(eq(Cronjobs.name, name))
    .get()

  let updatedState: CronjobStateType

  if (existingState) {
    updatedState = await db
      .update(Cronjobs)
      .set(updates)
      .where(eq(Cronjobs.name, name))
      .returning()
      .get()
  } else {
    const newState: Omit<CronjobStateType, "id"> = {
      name,
      expression: updates.expression ?? "* * * * *",
      enabled: updates.enabled ?? true
    }
    updatedState = await db.insert(Cronjobs).values(newState).returning().get()
  }

  // Update the running cronjob
  cronjobManager.updateJob(updatedState)

  return updatedState
}
