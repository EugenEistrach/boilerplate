import * as Sentry from "@sentry/nextjs"
import { createSafeActionClient } from "next-safe-action"

export const actionClient = createSafeActionClient({
  handleServerErrorLog: (error, utils) => {
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils

    // @ts-ignore
    Sentry.setContext("clientInput", clientInput)
    Sentry.setContext("bindArgsClientInputs", bindArgsClientInputs)
    // @ts-ignore
    Sentry.setContext("metadata", metadata)
    Sentry.setContext("ctx", ctx)

    Sentry.captureException(error)
    console.log("Server Error", error)
  }
})
