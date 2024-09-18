"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useChangeLocale, useCurrentLocale } from "@/locales/client"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Suspense } from "react"

const locales = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" }
] as const

function LocaleSwitcherInner() {
  const changeLocale = useChangeLocale({ preserveSearchParams: true })
  const currentLocale = useCurrentLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="mr-2 h-4 w-4" />
          {locales.find(l => l.value === currentLocale)?.label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map(locale => (
          <DropdownMenuItem
            key={locale.value}
            onClick={() => changeLocale(locale.value)}
          >
            {locale.label}
            {locale.value === currentLocale && (
              <Check className="ml-2 h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LocaleSwitcher() {
  return (
    <Suspense
      fallback={
        <Button variant="outline" size="sm" disabled>
          Loading...
        </Button>
      }
    >
      <LocaleSwitcherInner />
    </Suspense>
  )
}
