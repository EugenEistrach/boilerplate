import "dotenv/config"
import { db } from "./db"
import { users } from "./schema"

async function main() {
  const [user] = await db
    .insert(users)
    .values({ email: "testing@example.com" })
    .returning()
}

main()
