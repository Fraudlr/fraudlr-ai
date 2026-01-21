#!/usr/bin/env bash
set -euo pipefail

# Create a Prisma migration locally, commit the generated files, and push to origin
# Usage: ./scripts/create-migration.sh init

NAME=${1:-init}

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is not installed or not in PATH. Install Node.js/npm first." >&2
  exit 1
fi

echo "Creating Prisma migration: $NAME"
npx prisma migrate dev --name "$NAME"

if [ -d prisma/migrations ]; then
  git add prisma/migrations
  git commit -m "prisma: add initial migrations ($NAME)" || echo "No changes to commit"
  git push
  echo "Migration created, committed and pushed."
else
  echo "No migrations directory found after running migrate dev." >&2
  exit 1
fi
