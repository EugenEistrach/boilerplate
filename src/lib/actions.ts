import * as Sentry from "@sentry/nextjs"
import { createSafeActionClient } from "next-safe-action"

export const actionClient = createSafeActionClient({
  handleServerErrorLog: (error, utils) => {
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils
    // Create a new scope for this error
    Sentry.withScope(scope => {
      // Set context data
      // @ts-ignore
      scope.setContext("clientInput", Object.fromEntries(clientInput))

      scope.setContext(
        "bindArgsClientInputs",
        // @ts-ignore
        Object.fromEntries(bindArgsClientInputs)
      )
      // @ts-ignore
      scope.setContext("metadata", metadata)
      // @ts-ignore
      scope.setContext("ctx", ctx)

      // Add extra data if needed
      scope.setExtra("errorLocation", "serverAction")

      // Capture the exception with the new scope
      Sentry.captureException(error)
    })

    console.error("Server Error", error)
  }
})
