import { createI18nServer } from "next-international/server"
import type { z } from "zod"
import type { TClient } from "./client"

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    en: () => import("./en"),
    de: () => import("./de")
  })

export type TServer = ReturnType<typeof getI18n>

export function i18n<T extends (t: TClient) => z.ZodType>(schema: T) {
  return async () => {
    const t = await getI18n()
    return schema(t)
  }
}

export function url(path: string) {
  const currentLocale = getCurrentLocale()
  return `/${currentLocale}/${path}`
}
