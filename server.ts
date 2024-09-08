import { createServer } from "node:http"
import { parse } from "node:url"
import next from "next"

import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

const port = Number.parseInt(process.env.PORT || "3000")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  )
})
