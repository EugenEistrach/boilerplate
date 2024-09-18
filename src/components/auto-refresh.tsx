"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAutoRefresh(intervalMs = 5000) {
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh()
    }, intervalMs)

    return () => clearInterval(interval)
  }, [router, intervalMs])
}

export function AutoRefreshComponent() {
  useAutoRefresh()
  return null
}
