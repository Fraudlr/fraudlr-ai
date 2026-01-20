# NEXT STEPS — Fraudlr AI

Short handoff notes to pick up development later.

## Current status

- Repository: `main` branch pushed to https://github.com/Fraudlr/fraudlr-ai
- Landing page implemented (modeled after https://graphite.com/)
- Dashboard shell implemented using shadcn/ui patterns
- Authentication API routes and pages created
- Prisma schema created at `prisma/schema.prisma`
- `README.md`, `.env.example`, and `.gitignore` present

## Key files & locations

- Landing page: `src/app/page.tsx`
- Landing components: `src/components/landing/`
- Dashboard layout: `src/app/dashboard/layout.tsx`
- Dashboard components: `src/components/dashboard/`
- Auth API routes: `src/app/api/auth/`
- Prisma client: `src/lib/prisma.ts`
- Utils & auth helpers: `src/lib/utils.ts`, `src/lib/auth.ts`
- Public images: `public/images/`

## Quick local start

1. Copy `.env.example` to `.env` and fill values.

```powershell
cd "c:\Users\janse\OneDrive - MRJ Consultants\Documents\GitHub\fraudlr-ai"
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Note: If `npm` is not available on your machine, install Node.js (LTS) first.

## Remaining work (pick up here)

- Implement and test API endpoints for cases and integrations (server handlers)
- Wire up Prisma models to API routes and add validation
- Add unit/integration tests and CI (GitHub Actions)
- Polish UX, accessibility, and responsive details
- Add subscription/billing integration (Stripe) if needed
- Configure production deployment (PM2/systemd, Nginx, SSL)

## Helpful commands

- Run linting: `npm run lint`
- Open Prisma Studio: `npx prisma studio`
- Build for production: `npm run build`

## Notes

- Do not commit real secrets. Use `.env` locally and CI secrets in GitHub.
- Branching: create feature branches off `main` and open PRs to `main`.

---

If you want, I can also add a basic GitHub Actions CI template, tests scaffold, or implement the next API endpoints now.

