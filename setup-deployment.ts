#!/usr/bin/env node

import { exec } from "node:child_process"
import crypto from "node:crypto"
import fs from "node:fs/promises"
import util from "node:util"

const execPromise = util.promisify(exec)

const remoteHost = process.argv[2]
if (!remoteHost) {
  console.error("Please provide the remote host as an argument.")
  console.error("Usage: ts-node setup-deployment.ts <remote_host>")
  process.exit(1)
}

async function runCommand(command: string, local = false): Promise<void> {
  try {
    console.log(`Running: ${command}`)
    const { stdout, stderr } = await execPromise(
      local ? command : `ssh root@${remoteHost} "${command}"`
    )
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
  } catch (error) {
    console.error(`Error executing command: ${command}`)
    if (error instanceof Error) {
      console.error(error.message)
    }
    // Don't exit here, allow the script to continue
  }
}

async function readConfig() {
  let deploymentConfig: { domain: string; appName: string }
  try {
    deploymentConfig = JSON.parse(await fs.readFile("deployment.json", "utf8"))
  } catch (error) {
    throw new Error("deployment.json file not found or invalid JSON")
  }

  if (!deploymentConfig.appName) {
    throw new Error("appName is not specified in deployment.json")
  }

  if (!deploymentConfig.domain) {
    throw new Error("domain is not specified in deployment.json")
  }

  return deploymentConfig
}

async function setupDokkuApp(): Promise<void> {
  const deploymentConfig = await readConfig()
  const { appName, domain } = deploymentConfig

  console.log(`Setting up Dokku app: ${appName}`)
  // Create the app
  await runCommand(`dokku apps:create ${appName}`)

  // Set up SQLite storage
  await runCommand(`dokku storage:ensure-directory ${appName}`)
  await runCommand(
    `dokku storage:mount ${appName} /var/lib/dokku/data/storage/${appName}:/app/database`
  )

  // Set environment variables
  console.log("\nSetting up Dokku environment variables...")

  const hostname = `https://${appName}.${domain}`
  await runCommand(
    `dokku config:set --no-restart ${appName} HOSTNAME=${hostname} AUTH_URL=${hostname} DATABASE_URL=/app/database/database.sqlite AUTH_TRUST_HOST=true`
  )

  // Generate and set AUTH_SECRET
  const authSecret = crypto.randomBytes(33).toString("base64")
  await runCommand(
    `dokku config:set --no-restart ${appName} AUTH_SECRET=${authSecret}`
  )
  console.log("Generated and set AUTH_SECRET")

  // Set EMAIL_FROM
  await runCommand(
    `dokku config:set --no-restart ${appName} EMAIL_FROM=noreply@${domain}`
  )
  console.log("Set EMAIL_FROM")

  // Set up Let's Encrypt
  await runCommand(`dokku letsencrypt:enable ${appName}`)

  // Add remote to local git (assuming you're in the project directory)
  try {
    await runCommand(
      `git remote add dokku dokku@${remoteHost}:${appName}`,
      true
    )
    console.log("Added git remote: dokku")
  } catch (error) {
    console.log("Git remote 'dokku' already exists. Skipping...")
  }

  console.log("\nDokku app setup complete. You can now push your code with:")
  console.log("git push dokku main")

  console.log("\nNext steps:")
  console.log("Set the following environment variables manually:")
  const manualVars = [
    "SENTRY_AUTH_TOKEN",
    "NEXT_PUBLIC_SENTRY_DSN",
    "SENTRY_ORG",
    "SENTRY_PROJECT",
    "AUTH_GITHUB_ID",
    "AUTH_GITHUB_SECRET",
    "AUTH_DISCORD_ID",
    "AUTH_DISCORD_SECRET",
    "RESEND_API_KEY"
  ]
  for (const varName of manualVars) {
    console.log(`dokku config:set --no-restart ${appName} ${varName}=`)
  }

  console.log("\nTo set environment variables from clipboard, use:")
  console.log(
    `pbpaste | ssh root@${remoteHost} dokku config:set --encoded --no-restart ${appName}`
  )
}

setupDokkuApp().catch(error => {
  console.error("An error occurred during setup:", error)
  process.exit(1)
})
