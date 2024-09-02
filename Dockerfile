# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Set environment variable for SQLite database temporarily
ENV DATABASE_URL=database.sqlite

# Create a temporary SQLite file
RUN touch $DATABASE_URL

# Run the db:reset command to set up the database
RUN pnpm run db:reset

# Build the application
RUN pnpm run build

# Clean up the SQLite files
RUN pnpm run db:clear

# Unset the environment variable
ENV DATABASE_URL=

# Stage 2: Serve the application
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
