param(
  [string]$Name = "init"
)

Write-Host "Creating Prisma migration: $Name"

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  Write-Error "npx is not installed or not in PATH. Install Node.js/npm first."
  exit 1
}

npx prisma migrate dev --name $Name

if (Test-Path prisma/migrations) {
  git add prisma/migrations
  try {
    git commit -m "prisma: add initial migrations ($Name)"
  } catch {
    Write-Host "No changes to commit"
  }
  git push
  Write-Host "Migration created, committed and pushed."
} else {
  Write-Error "No migrations directory found after running migrate dev."
  exit 1
}
