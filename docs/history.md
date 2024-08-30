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
