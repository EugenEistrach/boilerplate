# Perfux Boilerplate

A modern, feature-rich SaaS boilerplate built with Next.js 15, TypeScript, and more.

## Key Features

- **Next.js 15 with App Router**: Utilizing the latest Next.js features for optimal performance and developer experience.

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

- **Email Integration**:
  - React Email for creating beautiful, responsive emails
  - Resend for reliable email delivery
  - Easy-to-customize email templates

- **Internationalization (i18n)**:
  - Built-in support for multiple languages
  - Easy-to-use translation system with next-international
  - Server-side and client-side translation support
  - Language switcher component included
  - Supports Zod schema translations for form validations

## Project Structure

- `/src/app/[locale]`: Main application code (Next.js App Router)
  - `/auth`: Authentication pages
  - `/marketing`: Public marketing pages
  - `/workspace`: Protected app area
  - `/onboarding`: User onboarding process
- `/src/app/api`: API routes
- `/src/components`: Reusable UI components
- `/src/db`: Database configuration and schema
- `/src/lib`: Utility functions and configurations
- `/src/locales`: Translation files for different languages
- `/emails`: Email templates using React Email

## Feature Organization

Each feature in the boilerplate is typically organized as follows:

- `/src/app/[locale]/workspace/[feature-name]/`: Main directory for the feature
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
- User management: `/src/app/[locale]/workspace/user/`
- Cron jobs: `/src/app/[locale]/workspace/cronjobs/`

Example features include:
- Notes: `/src/app/[locale]/workspace/notes/`

## Development

1. Clone and set up the repository:

   For bash/zsh:
   ```bash
   PROJECT_NAME=my-new-project && pnpm dlx degit EugenEistrach/perfux-boilerplate $PROJECT_NAME && cd $PROJECT_NAME && node setup.js
   ```

   For fish shell:
   ```fish
   set PROJECT_NAME my-new-project && pnpm dlx degit EugenEistrach/perfux-boilerplate $PROJECT_NAME && cd $PROJECT_NAME && node setup.js
   ```

   To save as a fish function:
   ```fish
   function create-perfux-project; pnpm dlx degit EugenEistrach/perfux-boilerplate $argv[1] && cd $argv[1] && node setup.js $argv[1]; end; funcsave create-perfux-project
   ```
   Then use it as: `create-perfux-project my-new-project`

2. Set up OAuth apps:
   - Create a GitHub OAuth app at https://github.com/settings/developers
   - Create a Discord OAuth app at https://discord.com/developers/applications
   - Update the following variables in `.env`:
     - `AUTH_GITHUB_ID`: Your GitHub App's Client ID
     - `AUTH_GITHUB_SECRET`: Your GitHub App's Client Secret
     - `AUTH_DISCORD_ID`: Your Discord App's Client ID
     - `AUTH_DISCORD_SECRET`: Your Discord App's Client Secret

3. Start the development server:
   ```bash
   pnpm run dev
   ```

## Deployment

Run `pnpm run setup-deployment <dokku-host>` to setup github repo and automated deployments.
