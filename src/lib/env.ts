import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NODE_ENV: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    AUTH_SECRET: z.string().min(1),
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),
    AUTH_URL: z.string().default("http://localhost:3000")
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional()
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_ORG: process.env.SENTRY_ORG,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_URL: process.env.AUTH_URL
  }
})
