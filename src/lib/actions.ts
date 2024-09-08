import * as Sentry from "@sentry/nextjs"
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient
} from "next-safe-action"
import { env } from "./env"

export const actionClient = createSafeActionClient({
  handleServerError: (error, utils) => {
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils

    env.NEXT_PUBLIC_SENTRY_DSN &&
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

    console.error(error)

    return DEFAULT_SERVER_ERROR_MESSAGE
  }
})
