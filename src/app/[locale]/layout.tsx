import "../[locale]/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { I18nProviderClient } from "@/locales/client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perfux - Boilerplate",
  description: "Perfux - Boilerplate"
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
