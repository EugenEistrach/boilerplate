# Deployment Guide

## Step 1: Create and Push GitHub Repository

1. **Create a New GitHub Repository using GitHub CLI:**
   ```sh
   gh repo create <your-repo-name> --public --source=. --remote=origin
   ```

2. **Push the Project to GitHub:**
   ```sh
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

## Step 2: Link GitHub Repository in Coolify

1. **Log in to Coolify:**
   - Open your Coolify instance in your web browser and log in.

2. **Add a New Application:**
   - Go to the "Applications" section and click "Add Application".

3. **Select Docker Compose Preset:**
   - Choose "Docker Compose" as the deployment method.

4. **Link GitHub Repository:**
   - Select "GitHub" as the source.
   - Authenticate with GitHub if prompted.
   - Select the repository you just created.
   - Choose the `main` branch.

5. **Configure Docker Compose:**
   - Ensure the Docker Compose file path is set to `docker-compose.yml`.

6. **Set Environment Variables:**
   - Add the environment variables from your `.env` file in the Coolify interface.

7. **Set Up Volumes:**
   - Ensure the volume for the SQLite database is correctly set up in Coolify. This should match the volume defined in your `docker-compose.yml` file.

8. **Set Up Webhooks:**
   - In Coolify, set up a webhook to trigger deployments on push events to the `main` branch of your GitHub repository.

9. **Deploy the Application:**
   - Click "Deploy" to start the deployment process.

## Step 3: Verify the Deployment

1. **Check the Application Status:**
   - Once the deployment is complete, check the status of your application in Coolify to ensure it is running correctly.

2. **Access the Application:**
   - Open the URL provided by Coolify to access your deployed Next.js application.

## Summary

By following these steps, you have created a GitHub repository, pushed your project, and linked it in Coolify using webhooks and Docker Compose preset. Coolify will handle the deployment process, ensuring that your application is up and running.
