"use client"

import { Button } from "@/components/ui/button"

export default function ClientErrorPage() {
  return (
    <div>
      Client Error
      <Button
        onClick={() => {
          throw new Error("Client Error")
        }}
      >
        Throw Error
      </Button>
    </div>
  )
}
