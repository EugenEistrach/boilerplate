"use server"

import { db } from "@/db/db"
import { cronjobManager } from "@/jobs"
import { eq } from "drizzle-orm"
import { CronjobState, type CronjobStateType } from "./cronjob-tables"

type UpdateType = Partial<Pick<CronjobStateType, "enabled" | "expression">>

export async function updateCronjobState(
  name: string,
  updates: UpdateType
): Promise<CronjobStateType> {
  const existingState = await db
    .select()
    .from(CronjobState)
    .where(eq(CronjobState.name, name))
    .get()

  let updatedState: CronjobStateType

  if (existingState) {
    updatedState = await db
      .update(CronjobState)
      .set(updates)
      .where(eq(CronjobState.name, name))
      .returning()
      .get()
  } else {
    const newState: Omit<CronjobStateType, "id"> = {
      name,
      expression: updates.expression ?? "* * * * *",
      enabled: updates.enabled ?? true
    }
    updatedState = await db
      .insert(CronjobState)
      .values(newState)
      .returning()
      .get()
  }

  // Update the running cronjob
  cronjobManager.updateJob(updatedState)

  return updatedState
}
