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
    AUTH_DISCORD_ID: z.string().optional(),
    AUTH_DISCORD_SECRET: z.string().optional(),
    AUTH_URL: z.string().default("http://localhost:3000"),
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().optional()
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    NEXT_PUBLIC_GITHUB_SSO_ENABLED: z.boolean().optional(),
    NEXT_PUBLIC_DISCORD_SSO_ENABLED: z.boolean().optional(),
    NEXT_PUBLIC_MAGIC_LINK_ENABLED: z.boolean().optional()
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
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_GITHUB_SSO_ENABLED: Boolean(
      process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
    ),
    NEXT_PUBLIC_DISCORD_SSO_ENABLED: Boolean(
      process.env.AUTH_DISCORD_ID && process.env.AUTH_DISCORD_SECRET
    ),
    NEXT_PUBLIC_MAGIC_LINK_ENABLED: Boolean(process.env.RESEND_API_KEY)
  }
})
