# Perfux Boilerplate

A modern, feature-rich SaaS boilerplate built with Next.js 15, TypeScript, and more.

## Key Features

- **Next.js 14 with App Router**: Utilizing the latest Next.js features for optimal performance and developer experience.

- **TypeScript**: Full TypeScript support for enhanced code quality and developer productivity.

- **Custom Server Setup**: Non-serverless configuration for maximum flexibility and control.

- **Authentication System**:
  - NextAuth integration with multiple provider support (GitHub, Discord)
  - Custom onboarding flow for new users
  - Automatic user creation and workspace redirection

- **User and Team Management**:
  - Multi-tenancy support with team-based structure
  - User profiles with avatars and customizable settings

- **Database Integration**:
  - SQLite with Drizzle ORM for efficient data management
  - Easy-to-use database reset and seeding scripts

- **UI and Design**:
  - Tailwind CSS for responsive, utility-first styling
  - Shadcn UI components for a sleek, modern interface
  - Dark mode support for improved user experience

- **API and State Management**:
  - Server Actions for efficient API calls
  - React Server Components for optimized server-side rendering

- **Background Jobs**:
  - Built-in cron job system for scheduled tasks

- **Error Tracking and Monitoring**:
  - Sentry integration for comprehensive error tracking and performance monitoring

- **Deployment and DevOps**:
  - Docker support for containerized deployments
  - Deployment documentation for various platforms

- **Marketing and Landing Page**:
  - Fully responsive marketing page with:
    - Feature showcase
    - Pricing plans
    - Call-to-action sections
  - Seamless integration with the main application

## Project Structure

- `/src/app`: Main application code (Next.js App Router)
  - `/(marketing)`: Public marketing pages
  - `/workspace`: Protected app area
  - `/onboarding`: User onboarding process
- `/src/components`: Reusable UI components
- `/src/db`: Database configuration and schema
- `/src/lib`: Utility functions and configurations

## Feature Organization

Each feature in the boilerplate is typically organized as follows:

- `/src/app/workspace/[feature-name]/`: Main directory for the feature
  - `ui/`: Subdirectory for feature-specific UI components
  - `page.tsx`: Main page component for the feature
  - `*-tables.ts`: Database schema definitions
  - `*-queries.tsx`: Database queries and data access functions
  - `*-actions.ts`: Server actions for API calls
  - `*-validations.ts`: Zod schemas for input validation
  - `*-types.ts`: Type definitions for the feature
  - `*-jobs.ts`: Cron jobs related to the feature (if applicable)

This structure promotes modularity and makes it easy to add, modify, or remove features while maintaining a clear separation of concerns.

Main features include:
- User management: `/src/app/workspace/user/`
- Cron jobs: `/src/app/workspace/cronjobs/`

Example features include:
- Notes: `/src/app/workspace/notes/`

## Development

1. Clone the repository:
   ```bash
   pnpm dlx degit https://github.com/EugenEistrach/perfux-boilerplate
   cd perfux-boilerplate
   ```

2. Set up environment variables and generate a secret key:
   ```bash
   cp .env.example .env && sed -i 's/^AUTH_SECRET=.*/AUTH_SECRET='$(openssl rand -base64 33)'/' .env
   ```

3. Create a GitHub OAuth app at https://github.com/settings/developers and update the following variables in `.env`:
   - `AUTH_GITHUB_ID`: Your GitHub App's Client ID
   - `AUTH_GITHUB_SECRET`: Your GitHub App's Client Secret
   - `AUTH_DISCORD_ID`: Your Discord App's Client ID
   - `AUTH_DISCORD_SECRET`: Your Discord App's Client Secret

4. Install dependencies:
   ```bash
   pnpm install
   ```

5. Initialize the database:
   ```bash
   pnpm run db:reset
   ```

6. Start the development server:
   ```bash
   pnpm run dev
   ```

## Deployment

- Deployment docs [here](./docs/DEPLOYMENT.md).
