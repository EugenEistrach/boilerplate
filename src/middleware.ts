import { auth } from "@/lib/auth"

import { NextResponse } from "next/server"

const isProtectedRoute = (path: string) => {
  return path.startsWith("/workspace")
}

export default auth(req => {
  if (isProtectedRoute(req.nextUrl.pathname)) {
    if (req.auth?.user) {
      return NextResponse.next()
    }

    const redirectTo = req.nextUrl.pathname?.trim() ?? undefined
    return NextResponse.redirect(
      new URL(`/sign-in?${new URLSearchParams({ redirectTo })}`, req.url)
    )
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next|monitoring-tunnel).*)", "/", "/(api|trpc)(.*)"]
}
