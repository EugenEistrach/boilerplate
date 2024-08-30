# Project History

1. Create Next App

```
npx create-next-app@latest

```

2. Switch to pnpm by deleting package-lock.json

```
pnpm install
```

3. Upgrade to Next 15 and react 19

```
pnpm up next@rc react@rc react-dom@rc eslint-config-next@rc
```

4. Change react types in package.json

```
{
  "dependencies": {
    "@types/react": "npm:types-react@rc",
    "@types/react-dom": "npm:types-react-dom@rc"
  },
  "overrides": {
    "@types/react": "npm:types-react@rc",
    "@types/react-dom": "npm:types-react-dom@rc"
  }
}
```

```
pnpm install
```

5. Install shadcn/ui

```
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button
```

6. Install prisma

```
pnpm install prisma --save-dev
pnpm dlx prisma init --datasource-provider postgresql

```

7. Add postgres DATABASE_URL and DIRECT_URL (supabase, neon, etc.) to .env

```
DATABASE_URL="postgresql://postgres.wrphzidiclikoilkvwrr:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.wrphzidiclikoilkvwrr.supabase.co:5432/postgres"
```

8. Add directUrl to prisma/schema.prisma

```
directUrl = env("DIRECT_URL")
```

9. Create some models and create first migration:

```
pnpm dlx prisma migrate dev --name init
```

10. Add Prisma Client to src/lib/db.server.ts

11. Install ts-node

```
pnpm install ts-node --save-dev
```

12. Create seed file prisma/seed.ts and add some data

13. Extend package.json scripts

```
"type": "module",
"scripts": {
  "db:migrate": "prisma migrate dev --name init",
  "db:studio": "prisma studio",
  "db:seed": "node --loader ts-node/esm prisma/seed.ts"
}
```

14. Run seed

```
pnpm db:seed
```

15. Enable react compiler

```
pnpm install babel-plugin-react-compiler
```

```
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

```

16. Enable turbo in dev mode (package.json)

```
"dev": "next dev --turbo"
```

17. Install prettier and eslint-config-prettier

```
pnpm install prettier eslint-config-prettier --save-dev
```

18. Update prettier config and rerurn for all files in /src

```
pnpm prettier --write src
```
