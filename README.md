# Prerequisites
- Node.js (v20 or later)
- PostgreSQL
- Clerk 
- Sentry 
- Vercel 

# Setup Steps

1. Clone the repository:
   ```bash
   npx degit https://github.com/EugenEistrach/perfux-boilerplate.git your-project-name
   cd your-project-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```

4. Set up the database:
   - Create a PostgreSQL database for your project
   - Update the `DATABASE_URL` in `.env` with your database connection string

5. Set up Clerk:
   - Create a new project in your Clerk dashboard
   - Copy the `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` from your Clerk dashboard to your `.env` file

6. Set up Sentry:
   - Create a new project in your Sentry dashboard
   - Copy the `NEXT_PUBLIC_SENTRY_DSN` from your Sentry project settings to your `.env` file
   - Set `SENTRY_ORG` and `SENTRY_PROJECT` in your `.env` file based on your Sentry organization and project names

7. Configure `NEXT_PUBLIC_ROOT_PATH` in `.env` if your project is not hosted at the root of the domain

8. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

9. Build the project:
   ```bash
   npm run build
   ```

10. Start the development server:
    ```bash
    npm run dev
    ```

Your project should now be running at `http://localhost:3000`.

# Environment Variables

Ensure these variables are set in your `.env` file:
```
DATABASE_URL=your_postgresql_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_ROOT_PATH=/your_root_path
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org_name
SENTRY_PROJECT=your_sentry_project_name
```


# CI/CD Configuration

For CI/CD environments, you'll need to set an additional environment variable:
```
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```


This token is used for uploading source maps to Sentry during the build process in CI environments.

# Additional Configuration

- Configure additional Clerk and Sentry settings as needed for your project.

# Deployment

Use Vercel's "Deployment Protection" feature:
      - In your Vercel dashboard, go to your project settings.
      - Under "Git" section, find "Deployment Protection".
      - Add a command to run before each deployment: `npx prisma migrate deploy`
