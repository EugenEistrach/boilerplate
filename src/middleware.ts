import { auth } from "@/lib/auth"
import { createI18nMiddleware } from "next-international/middleware"

import { NextResponse } from "next/server"
import { url } from "./locales/server"

const isProtectedRoute = (path: string) => {
  return path.includes("/workspace")
}

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en"
})

const isSkipI18nRoute = (path: string) => {
  return path.startsWith("/api")
}

export default auth(req => {
  if (!isSkipI18nRoute(req.nextUrl.pathname)) {
    const i18nResponse = I18nMiddleware(req)
    if (i18nResponse) return i18nResponse
  }

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
