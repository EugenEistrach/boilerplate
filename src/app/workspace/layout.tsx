import { UserButton, UserButtonSkeleton } from "@/components/user-button"
import { auth } from "@/lib/auth"
import { Suspense } from "react"

export default function Header() {
  const userPromise = auth().then(session => session?.user ?? null)

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold">Your App Name</h1>
      <Suspense fallback={<UserButtonSkeleton />}>
        <UserButton userPromise={userPromise} />
      </Suspense>
    </header>
  )
}
