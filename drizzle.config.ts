import { env } from "@/lib/env"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL
  },
  breakpoints: true,
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true
})
