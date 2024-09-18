import "server-only"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserByEmail } from "./user-queries"

export async function getUser() {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    return null
  }

  return getUserByEmail(email)
}

export async function requireUser() {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    throw redirect("/sign-in")
  }

  const user = await getUserByEmail(email)

  if (!user) {
    throw redirect("/onboarding")
  }

  return user
}
