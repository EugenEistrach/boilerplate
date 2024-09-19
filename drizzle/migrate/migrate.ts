import dotenv from "dotenv"

// Load environment variables
dotenv.config()

import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"

import { migrate } from "drizzle-orm/better-sqlite3/migrator"

console.log("All environment variables:", process.env)

const url = process.env.DATABASE_URL

if (!url) {
  throw new Error("DATABASE_URL is not set")
}

export const sqlite = new Database(url)

// Enable Write-Ahead Logging (WAL) mode to allow concurrent reads and writes
sqlite.pragma("journal_mode = WAL")

const db = drizzle(sqlite)

migrate(db, { migrationsFolder: ".." })
