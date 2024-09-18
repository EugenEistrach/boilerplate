import { auth } from "@/lib/auth"
import { sendEmail } from "@/lib/email"
import { redirect } from "next/navigation"
import WelcomeEmail from "../../../../emails/welcome"
import { createUser, getUserByEmail } from "../workspace/user/user-queries"

export default async function OnboardingPage() {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    return redirect("/sign-in")
  }

  const currentUser = await getUserByEmail(email)

  if (currentUser) {
    return redirect("/workspace")
  }

  // We create the user here and then redirect to the workspace
  // If you want the user to have manual onboarding, create the form for it and then create user manually yourself instead

  await createUser(
    email,
    session?.user?.name ?? undefined,
    session?.user?.image ?? undefined
  )

  await sendEmail({
    to: email,
    subject: "Welcome to Perfux Boilerplate",
    react: <WelcomeEmail username={email} />
  })

  return redirect("/workspace")
}
