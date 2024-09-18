# Deployment Guide

## Step 1: Initialize Git and Create GitHub Repository

1. **Initialize Git in your project directory:**
   ```sh
   git init
   ```

2. **Create and push to a new GitHub repository:**
   ```sh
   gh repo create
   ```


## Step 2: Set Up OAuth Apps

1. **Create GitHub OAuth App:**
   - Go to GitHub Developer Settings > OAuth Apps > New OAuth App
   - Set Homepage URL to your app's URL
   - Set Authorization callback URL to `<your-app-url>/api/auth/callback/github`
   - Note down the Client ID and generate a Client Secret

2. **Create Discord OAuth App:**
   - Go to Discord Developer Portal > Applications > New Application
   - In OAuth2 settings, add redirect URL: `<your-app-url>/api/auth/callback/discord`
   - Note down the Client ID and Client Secret

## Step 3: Set Up Coolify Project

1. **Create New Project in Coolify:**
   - Log in to your Coolify instance
   - Create a new project and select "Docker Compose" as deployment method

2. **Configure Environment Variables:**
   - Add all variables from your `.env` file
   - Include OAuth credentials:
     ```
     GITHUB_CLIENT_ID=<your-github-client-id>
     GITHUB_CLIENT_SECRET=<your-github-client-secret>
     DISCORD_CLIENT_ID=<your-discord-client-id>
     DISCORD_CLIENT_SECRET=<your-discord-client-secret>
     ```

3. **Set Up Webhook:**
   - In Coolify project settings, find the webhook URL
   - Copy this URL for later use

4. **Create Coolify API Token:**
   - In Coolify settings, create a new API token
   - Copy this token for later use

## Step 4: Configure GitHub Repository

1. **Add Coolify Secrets to GitHub:**
   - Go to your GitHub repository settings > Secrets and variables > Actions
   - Add two new repository secrets:
     - Name: `COOLIFY_WEBHOOK_URL`, Value: <webhook-url-from-coolify>
     - Name: `COOLIFY_API_KEY`, Value: <api-token-from-coolify>

## Step 5: Update Application and Test Deployment

1. **Update App Name:**
   - In `src/app/layout.tsx`, change the app name as desired

2. **Commit and Push Changes:**
   ```sh
   git add .
   git commit -m "Update app name and deployment configuration"
   git push
   ```

3. **Monitor Deployment:**
   - Check your GitHub Actions tab to see the build and deployment process
   - Verify in Coolify that the new deployment is triggered and completed successfully

4. **Access Your Application:**
   - Once deployed, access your application via the URL provided by Coolify

## Summary

This guide walks you through initializing your Git repository, setting up OAuth apps, configuring Coolify, setting up GitHub secrets, and testing the automated deployment process. Ensure all environment variables and secrets are correctly set for a successful deployment.
