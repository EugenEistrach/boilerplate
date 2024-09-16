import { CronjobManager, job } from "./app/workspace/cronjobs/cronjob-manager"

export const JOBS = [
  job({
    name: "test",
    expression: "* * * * *",
    job: () => {
      console.log("test")
    }
  })
]

export const cronjobManager = new CronjobManager(JOBS)
