"use client"

import { useUser } from "@/app/[locale]/workspace/user/user-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/locales/client"
import { LogOut } from "lucide-react"
import { Skeleton } from "../../../../../components/ui/skeleton"

export const UserButtonSkeleton = () => {
  return <Skeleton className="h-8 w-8 rounded-full" />
}

export const UserButton = ({
  signOutAction
}: {
  signOutAction: () => void
}) => {
  const user = useUser()
  const t = useI18n()

  const name = user.name || user.email.split("@")[0] || t("user.defaultName")
  const email = user.email
  const image = user.avatarUrl ?? ""

  const shortName = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={image} alt={t("user.avatarAlt")} />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-0" align="end">
        <div className="flex items-center p-4 border-b">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={image} alt={t("user.avatarAlt")} />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-base">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        {/* <DropdownMenuItem className="p-3 focus:bg-accent hover:bg-accent">
          <Settings className="mr-3 h-5 w-5" />
          <span className="text-sm">{t("user.manageAccount")}</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            signOutAction()
          }}
          className="p-3 focus:bg-accent hover:bg-accent"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="text-sm">{t("user.signOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
