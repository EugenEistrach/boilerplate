import "server-only"

import type { ReactElement } from "react"
import { Resend } from "resend"
import { env } from "./env"

const resend = new Resend(env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  react
}: {
  to: string
  subject: string
  react: ReactElement
}) {
  if (!env.EMAIL_FROM || !env.RESEND_API_KEY) {
    console.log(`Simulating email send: ${subject}, to: ${to}, html: ${react}`)
    return
  }

  await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    react
  })
}
