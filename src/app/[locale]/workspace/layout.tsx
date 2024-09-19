import { UserButton } from "@/app/[locale]/workspace/user/ui/user-button"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "@/components/ui/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { signOut } from "@/lib/auth"
import { Zap } from "lucide-react"
import { UserProvider } from "./user/user-provider"
import { requireUser } from "./user/user-session"

export default async function WorkspaceLayout({
  children
}: { children: React.ReactNode }) {
  const currentUser = await requireUser()

  return (
    <UserProvider user={currentUser}>
      <div className="flex flex-col h-screen">
        <header className="border-b">
          <div className="flex items-center justify-between container mx-auto p-4 ">
            <div className="flex items-center">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/workspace"
                    className="flex items-center bg-muted rounded-md p-2"
                  >
                    <Zap className="h-6 w-6 " />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Your App Name</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
              <UserButton
                signOutAction={async () => {
                  "use server"
                  await signOut()
                }}
              />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </UserProvider>
  )
}
