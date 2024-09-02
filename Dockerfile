# Base image with pnpm installed
FROM node:20-slim AS base

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

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/run.sh ./run.sh

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
