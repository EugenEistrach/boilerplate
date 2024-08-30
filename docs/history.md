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

6. Create new supabase project

7. Install prisma

```
pnpm install prisma --save-dev
pnpm dlx prisma init --datasource-provider postgresql

```

8. Add supabase DATABASE_URL to .env

```
DATABASE_URL="postgresql://postgres.wrphzidiclikoilkvwrr:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.wrphzidiclikoilkvwrr.supabase.co:5432/postgres"
```

9. Add directUrl to prisma/schema.prisma

```
directUrl = env("DIRECT_URL")
```

10. Create some models and create first migration:

```
pnpm dlx prisma migrate dev --name init
```

11. Add Prisma Client to src/lib/db.server.ts

12. Install ts-node

```
pnpm install ts-node --save-dev
```

```


```

13. Create seed file prisma/seed.ts and add some data

14. Extend package.json scripts

```
"type": "module",
"scripts": {
  "db:migrate": "prisma migrate dev --name init",
  "db:studio": "prisma studio",
  "db:seed": "node --loader ts-node/esm prisma/seed.ts"
}
```

15. Run seed

```
pnpm db:seed
```
