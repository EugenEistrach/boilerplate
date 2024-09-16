import { db } from "@/db/db"
import { eq, inArray, not } from "drizzle-orm"
import cron from "node-cron"
import { CronjobState, type CronjobStateType } from "./cronjob-tables"

export type CronjobDefinition = {
  name: string
  expression: string
  job: JobFunction
}

export type JobFunction = () => Promise<void> | void

export function job(job: CronjobDefinition) {
  return job
}

export class CronjobManager {
  private scheduledJobs: Map<string, cron.ScheduledTask> = new Map()
  private jobMap: Record<string, JobFunction> = {}

  constructor(private jobs: CronjobDefinition[]) {
    this.jobMap = Object.fromEntries(jobs.map(job => [job.name, job.job]))
  }

  updateJob(cronjobState: CronjobStateType): void {
    const existingJob = this.scheduledJobs.get(cronjobState.name)
    if (existingJob) {
      existingJob.stop()
    }

    if (cronjobState.enabled) {
      const jobFunction = this.jobMap[cronjobState.name]
      if (!jobFunction) {
        console.error(`No job function found for ${cronjobState.name}`)
        return
      }

      if (cron.validate(cronjobState.expression)) {
        const task = cron.schedule(cronjobState.expression, jobFunction, {
          scheduled: true
        })
        this.scheduledJobs.set(cronjobState.name, task)
        console.log(`Cronjob "${cronjobState.name}" updated and scheduled`)
      } else {
        console.error(
          `Invalid cron expression for "${cronjobState.name}": ${cronjobState.expression}`
        )
      }
    } else {
      console.log(`Cronjob "${cronjobState.name}" is disabled`)
    }
  }

  stopAll(): void {
    for (const job of this.scheduledJobs.values()) {
      job.stop()
    }
    this.scheduledJobs.clear()
  }

  async setup(): Promise<void> {
    console.log("Starting cronjob setup...")

    const defaultJobNames = this.jobs.map(job => job.name)

    // Step 1: Remove cronjobs from DB that are no longer in the code
    await this.removeOutdatedCronjobs(defaultJobNames)

    // Step 2: Upsert default cronjobs
    await this.upsertDefaultCronjobs()

    console.log("Cronjob setup completed successfully")
  }

  private async removeOutdatedCronjobs(
    defaultJobNames: string[]
  ): Promise<void> {
    console.log("Checking for cronjobs to remove...")
    const removedCronjobs = await db
      .select({ name: CronjobState.name })
      .from(CronjobState)
      .where(not(inArray(CronjobState.name, defaultJobNames)))
      .all()

    if (removedCronjobs.length > 0) {
      console.log(`Found ${removedCronjobs.length} cronjob(s) to remove:`)
      for (const job of removedCronjobs) {
        console.log(`- ${job.name}`)
      }

      await db
        .delete(CronjobState)
        .where(not(inArray(CronjobState.name, defaultJobNames)))
        .execute()

      console.log("Removed outdated cronjobs from the database")
    } else {
      console.log("No cronjobs to remove")
    }
  }

  private async upsertDefaultCronjobs(): Promise<void> {
    console.log("Upserting default cronjobs...")
    for (const defaultJob of this.jobs) {
      const existingJob = await db
        .select()
        .from(CronjobState)
        .where(eq(CronjobState.name, defaultJob.name))
        .get()

      const dbState = await db
        .insert(CronjobState)
        .values({
          name: defaultJob.name,
          expression: defaultJob.expression,
          enabled: true
        })
        .onConflictDoUpdate({
          target: CronjobState.name,
          set: {
            name: defaultJob.name
          }
        })
        .returning()
        .get()

      if (!existingJob) {
        console.log(`Created new cronjob "${defaultJob.name}" in database`)
      }

      // Update or schedule the job
      this.updateJob(dbState)
      console.log(`Scheduled cronjob "${defaultJob.name}"`)
    }
  }
}
