#!/usr/bin/env node

import { exec } from "node:child_process"
import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"
import util from "node:util"

const execPromise = util.promisify(exec)

const config = await readConfig()

async function runCommand(command: string, local = false): Promise<void> {
  try {
    console.log(`Running: ${command}`)
    const { stdout, stderr } = await execPromise(
      local ? command : `ssh root@${config.domain} '${command}'`
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

async function generateAndSetupSSHKey(appName: string): Promise<void> {
  const keyPath = path.join(process.env.HOME || "", ".ssh", `id_rsa_${appName}`)

  // Generate SSH key
  await runCommand(
    `ssh-keygen -t rsa -b 4096 -C "${appName}" -f "${keyPath}" -N ""`,
    true
  )
  console.log(`Generated SSH key: ${keyPath}`)

  // Read the public key
  const publicKey = await fs.readFile(`${keyPath}.pub`, "utf8")

  // Add the public key to Dokku using the new approach
  await runCommand(`echo "${publicKey.trim()}" | dokku ssh-keys:add ${appName}`)
  console.log("Added SSH public key to Dokku")

  // Read the private key
  const privateKey = await fs.readFile(keyPath, "utf8")

  // Set the private key as a GitHub secret
  try {
    await runCommand(
      `gh secret set DOKKU_SSH_PRIVATE_KEY -b"${privateKey}"`,
      true
    )
    console.log("Set DOKKU_SSH_PRIVATE_KEY as a GitHub secret")
  } catch (error) {
    console.error("Failed to set GitHub secret:", error)
    console.log(
      "Please set the DOKKU_SSH_PRIVATE_KEY secret manually in your GitHub repository settings."
    )
  }
}

async function setupDokkuApp(): Promise<void> {
  const { appName, domain } = config

  // Setup GitHub repository
  console.log("Setting up GitHub repository...")
  try {
    await runCommand(
      `gh repo create ${appName} --public --source=. --remote=upstream --confirm`,
      true
    )
    console.log(`GitHub repository '${appName}' created successfully.`)
  } catch (error) {
    console.error("Failed to create GitHub repository:", error)
    console.log("Please create the repository manually if needed.")
  }

  // Setup GitHub secret for Dokku remote URL
  console.log("Setting up GitHub secret for Dokku remote URL...")
  try {
    await runCommand(
      `gh secret set DOKKU_REMOTE_URL -b"ssh://dokku@${domain}:22/${appName}"`,
      true
    )
    console.log("GitHub secret 'DOKKU_REMOTE_URL' set successfully.")
  } catch (error) {
    console.error("Failed to set GitHub secret:", error)
    console.log(
      "Please set the DOKKU_REMOTE_URL secret manually in your GitHub repository settings."
    )
  }

  console.log(`Setting up Dokku app: ${appName}`)
  // Create the app
  await runCommand(`dokku apps:create ${appName}`)

  // Generate and setup SSH key
  await generateAndSetupSSHKey(appName)

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

  // Set port mapping
  await runCommand(`dokku ports:set ${appName} https:443:3000`)
  console.log("Set port mapping for HTTP and HTTPS")

  // Add remote to local git (assuming you're in the project directory)
  try {
    await runCommand(`git remote add dokku dokku@${domain}:${appName}`, true)
    console.log("Added git remote: dokku")
  } catch (error) {
    console.log("Git remote 'dokku' already exists. Skipping...")
  }

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

  console.log("\nOAuth Setup:")
  console.log("For GitHub OAuth: https://github.com/settings/developers")
  console.log("For Discord OAuth: https://discord.com/developers/applications")
  console.log("\nUse these callback URLs when setting up OAuth:")
  console.log(`GitHub: ${hostname}/api/auth/callback/github`)
  console.log(`Discord: ${hostname}/api/auth/callback/discord`)

  console.log(
    "Once everything is setup you can push the code to github and it will automatically deploy to the server:"
  )
  console.log("git push")
}

setupDokkuApp().catch(error => {
  console.error("An error occurred during setup:", error)
  process.exit(1)
})
