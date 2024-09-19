import "@/load-env"

import { createServer } from "node:http"
import { parse } from "node:url"
import next from "next"

import { cronjobManager } from "@/app/[locale]/workspace/cronjobs/cronjob-jobs"

const port = Number.parseInt(process.env.PORT || "3000")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port, "0.0.0.0")

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  )

  cronjobManager.setup().catch(console.error)

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server")
    server.close(() => {
      console.log("HTTP server closed")
    })
    cronjobManager.stopAll()
  })
})
