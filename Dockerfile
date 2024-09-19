# Base image with pnpm installed
FROM node:20-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Stage 1: Build the application
FROM base AS builder

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .


ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_RUNTIME=nodejs
ENV NODE_ENV=production
ENV AUTH_SECRET=needed_to_fail_during_migrations
# Set environment variable for SQLite database temporarily
ARG DATABASE_URL=database.sqlite
ARG NEXT_PUBLIC_SENTRY_DSN
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT

# Create a temporary SQLite file
RUN touch $DATABASE_URL

# Run the db:reset command to set up the database
RUN pnpm run db:reset

# Build the application
RUN pnpm run build

# Clean up the SQLite files
RUN pnpm run db:clear

# Stage 2: Serve the application
FROM base AS runner

# Set working directory
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_RUNTIME=nodejs
ENV AUTH_TRUST_HOST=true
ENV DATABASE_URL=${DATABASE_URL}
ENV HOSTNAME=${HOSTNAME}
ENV AUTH_URL=${HOSTNAME}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV SENTRY_ORG=${SENTRY_ORG}
ENV SENTRY_PROJECT=${SENTRY_PROJECT}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_GITHUB_ID=${AUTH_GITHUB_ID}
ENV AUTH_GITHUB_SECRET=${AUTH_GITHUB_SECRET}
ENV AUTH_DISCORD_ID=${AUTH_DISCORD_ID}
ENV AUTH_DISCORD_SECRET=${AUTH_DISCORD_SECRET}
ENV EMAIL_FROM=${EMAIL_FROM}
ENV RESEND_API_KEY=${RESEND_API_KEY}

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/run.sh ./run.sh

# TODO: Solve this
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Install only production dependencies
RUN pnpm install --prod

RUN cd drizzle/migrate && pnpm i
RUN cd ..

RUN chmod +x ./run.sh

WORKDIR /app

# Expose the port the app runs on
EXPOSE 3000

# Start the application
RUN ls -la /app
RUN ls -al 
CMD ["./run.sh"]
