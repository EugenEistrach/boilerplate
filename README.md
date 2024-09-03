# Boilerplate 

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

