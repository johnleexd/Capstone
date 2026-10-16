# TravelMate development

TravelMate uses two TypeScript projects:

```text
Next.js frontend (port 3000) -> Express backend (port 5000) -> Prisma -> Neon PostgreSQL
```

`MASTERPROMPT.md` records the original product direction, while
`PRODUCT_BASELINE.md` documents current implemented behavior. The dashboard expresses its
core workflow as **Define → Generate → Understand → Refine → Save → Reopen**;
budget, travel options, weather, and crowd context support that same trip rather
than acting as unrelated products.

## Documentation map

- `docs/README.md` — supporting documentation index with requirements traceability,
  editable diagrams and test execution guidance.
- `PRODUCT_BASELINE.md` — current workflow, persistence behavior, and verification checklist.
- `CAPSTONE_READINESS_TRACKER.md` — current phase scores, verification evidence,
  and prioritized release blockers.
- `IMPLEMENTATION_STATUS.md` — concise feature-by-feature implementation audit.
- `travelmate-frontend-new/README.md` — frontend setup, workflow, and CI behavior.
- `travelmate-backend-api/README.md` — API architecture, providers, and data rules.
- Both project `DEPLOYMENT.md` files — production release, smoke, monitoring, and
  rollback procedures.
- `travelmate-frontend-new/docs/ACCESSIBILITY_AUDIT.md` — automated accessibility
  evidence and the remaining manual screen-reader checklist.

## First-time setup

Clone the parent repository with its frontend and backend submodules:

```powershell
git clone --recurse-submodules https://github.com/johnleexd/Capstone.git
```

Install each project's dependencies separately:

```powershell
cd travelmate-backend-api
npm.cmd install
cd ..\travelmate-frontend-new
npm.cmd install
```

Configure `travelmate-backend-api/.env` with the Neon pooled `DATABASE_URL` and
development-safe secrets. Keep `AI_MOCK_FALLBACK=true` only for an explicitly
labeled local/demo itinerary fallback; configured provider failures do not silently
become mock plans. Then initialize the database from the backend directory:

```powershell
npm.cmd run db:setup
```

## Development

Start both services from the frontend directory:

```powershell
cd C:\Users\Admin\Desktop\TRAVELMATE\travelmate-frontend-new
npm.cmd run dev
```

This starts the sibling backend automatically and waits for the API before
starting Next.js. An already running backend is reused. Ctrl+C stops the services
started by this command. To manage the services separately, run `npm.cmd run dev`
in the backend and `npm.cmd run dev:frontend` in the frontend.

Open http://localhost:3000 in the browser. The backend API and health endpoint
run at http://localhost:5000.

Use `npm run dev` instead of `npm.cmd run dev` from Command Prompt,
Git Bash, or a PowerShell installation that permits `npm.ps1`.

## Verification and CI

Each project repository contains its own `.github/workflows/ci.yml`. The backend
workflow runs unit/type/build checks and database integration against ephemeral
PostgreSQL. The frontend workflow runs lint/unit/build checks and the complete
Playwright suite against a separately migrated and seeded PostgreSQL service.

Because the frontend E2E job checks out the backend as a sibling repository, a
private backend requires the frontend repository secret `BACKEND_REPO_TOKEN` with
read-only Contents permission. Runtime provider keys and the production Neon
database are not used by either workflow.
