import { db } from "@/db/db"
import { users } from "@/db/schema"

export default async function AppPage() {
  const user = await db.select().from(users)
  return (
    <div>
      App
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
