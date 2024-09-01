import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { env } from "./lib/env"

const isProtectedRoute = createRouteMatcher([
  `${env.NEXT_PUBLIC_ROOT_PATH}(.*)`
])
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = auth()

  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next()
  }

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: "/login" })
  }

  if (userId && isProtectedRoute(req)) {
    return NextResponse.next()
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
