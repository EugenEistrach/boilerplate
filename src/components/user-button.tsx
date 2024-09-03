"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react"
import type { User } from "next-auth"
import { use } from "react"
import { Skeleton } from "./ui/skeleton"

export const UserButtonSkeleton = () => {
  return <Skeleton className="h-8 w-8 rounded-full" />
}

export const UserButton = ({
  userPromise,
  signOut
}: {
  userPromise: Promise<User | null>
  signOut: () => void
}) => {
  const user = use(userPromise)

  if (!user) return <UserButtonSkeleton />

  const name = user?.name || user?.email?.split("@")[0] || "User"
  const email = user.email
  const image = user.image ?? ""

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
            <AvatarImage src={image} alt="@username" />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-0" align="end">
        <div className="flex items-center p-4 border-b">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={image} alt="@username" />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-base">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        {/* <DropdownMenuItem className="p-3 focus:bg-accent hover:bg-accent">
          <Settings className="mr-3 h-5 w-5" />
          <span className="text-sm">Manage account</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            signOut()
          }}
          className="p-3 focus:bg-accent hover:bg-accent"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="text-sm">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
