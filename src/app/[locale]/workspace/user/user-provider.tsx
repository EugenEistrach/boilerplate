"use client"

import { createContext, use, useContext } from "react"
import type { User } from "./user-queries"

const UserContext = createContext<User | null>(null)

export function UserProvider({
  user,
  children
}: { user: User; children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  const user = useContext(UserContext)
  if (!user) throw new Error("useUser must be used within a UserProvider")
  return user
}
