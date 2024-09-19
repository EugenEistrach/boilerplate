#!/bin/sh -e

env

# Save the current directory
current_dir=$(pwd)

# Change to the migrate directory and run the migration
cd ./drizzle/migrate
pnpm db:migrate

# Return to the original directory
cd "$current_dir"

# Start the application
pnpm start
