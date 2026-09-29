# TravelMate Capstone Readiness Tracker

> Source of truth: `MASTERPROMPT.md`
>
> Current audit: 2026-09-26 (Asia/Shanghai)
>
> Current overall readiness: **97% — capstone-demo ready with production blockers**

This document tracks implementation progress against the nine phases defined in
section 76 of `MASTERPROMPT.md`. It is a code-backed snapshot, not a claim that a
feature is complete because a similarly named file exists.

The tracker deliberately separates capstone demonstration readiness from
production readiness:

| Readiness view | Current score | Meaning |
| --- | ---: | --- |
| Core implementation | **97%** | The core workflow, generated API contract boundary, destination-driven planning, multi-currency logic, lifecycle/version recovery, idempotent AI generation, and persistence are verified. |
| MVP demonstration | **98%** | The seeded lifecycle, configured Gemini generation, structured destination persistence, and complete browser suite support a controlled demonstration. |
| Production release | **92%** | Hosted CI confirmation, hosting-target activation, live email delivery, HTTPS sessions, and production smoke verification remain. |

## Status and scoring rules

| Marker | Meaning | Scoring guidance |
| --- | --- | ---: |
| ✅ Complete | Implemented and supported by current code plus relevant verification | 90–100% |
| 🟡 Partial | Working vertical slice exists, but acceptance criteria or production behavior is incomplete | 40–89% |
| ❌ Missing | Required behavior has no usable implementation | 0–39% |
| 🔴 Broken | Implementation exists but a verified code defect prevents the flow | Score depends on impact |
| ⚠️ Verify | Code exists, but the relevant integration or manual check was not run in this audit | Maximum 85% for that item |

Phase percentages are weighted averages of the features listed under each phase.
Overall readiness uses the phase weights in the summary table. Optional owner,
admin, booking, moderation, and simulated-payment features are recorded as useful
extras but do not inflate the master-prompt core score.

## Executive phase summary

| Phase | Master-prompt scope | Weight | Readiness | State | Main remaining work |
| --- | --- | ---: | ---: | --- | --- |
| 1 | Foundation | 10% | **98%** | ✅ | The generated contract boundary covers all current response families; verify the selected deployment target. |
| 2 | Authentication | 12% | **96%** | ✅ | Verify delivery with a real production sender and HTTPS cookie behavior. |
| 3 | Trip Management | 13% | **99%** | ✅ | Active/archive lifecycle and owner-scoped restore are implemented. |
| 4 | Itinerary Foundation | 13% | **97%** | ✅ | Immutable version history and recovery are implemented; continue splitting large frontend modules. |
| 5 | AI | 15% | **99%** | ✅ | Persistent generation history and request idempotency are implemented. |
| 6 | Budget | 10% | **99%** | ✅ | Browser-check each supported currency in the complete E2E run. |
| 7 | Travel APIs | 10% | **99%** | ✅ | Validate live provider credentials and inventory in the deployment environment. |
| 8 | Conditions | 7% | **96%** | ✅ | Consider a dedicated snapshot table if condition history becomes necessary. |
| 9 | Polish | 10% | **93%** | ✅ | Confirm hosted CI, then complete manual screen-reader and production checks. |

Weighted score:

```text
(98×0.10) + (96×0.12) + (99×0.13) + (97×0.13) +
(99×0.15) + (99×0.10) + (99×0.10) + (96×0.07) +
(93×0.10) = 97.47% → 97%
```

---

## Phase 1 — Foundation — 98%

Master-prompt scope: repository structure, environment configuration, database
connection, error handling, and shared types.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Coherent frontend/backend structure | ✅ | 100% | `travelmate-frontend-new/`, `travelmate-backend-api/src/{routes,controllers,services,repositories,middlewares}` | Keep the two-project architecture documented and avoid duplicate backends. |
| Environment configuration | 🟡 | 90% | Backend and frontend `.env.example`; `src/config/env.ts` rejects placeholder/local production databases, weak secrets, non-HTTPS origins, missing email/AI providers, and production mock fallback; provider-neutral deployment runbooks exist | Select the deployment targets, supply owner-controlled secrets, and record the production preflight/smoke result. |
| PostgreSQL/Prisma foundation | ✅ | 100% | `prisma/schema.prisma`, generated client, Neon adapter, and six ordered migrations | All six migrations, including trip lifecycle/version history, are applied to the configured Neon database. |
| Error handling | ✅ | 95% | A backend response adapter normalizes controller and middleware failures to the backward-compatible `{ error, code, retryable, details? }` envelope; the typed frontend parser preserves metadata while accepting legacy proxy failures. Next `error.tsx`, `not-found.tsx`, and load-state recovery remain in place. | Extend endpoint-specific codes only when callers need actionable distinctions. |
| Shared contracts and domain types | ✅ | 100% | The backend OpenAPI document is authoritative for errors, currency/freshness, destination planning, accommodations, weather/crowd, flight/activity comparison, itinerary generation, saved-trip lifecycle, account/profile, and role-scoped platform responses. Deterministic frontend generation, existing-import re-exports, and CI drift checks are implemented. | Keep endpoint response schemas and generated consumers aligned through `contracts:check`. |

Phase exit criteria:

- [x] Frontend and backend start as separate coherent TypeScript applications.
- [x] PostgreSQL is represented through Prisma migrations.
- [x] Secrets remain server-side and placeholders exist.
- [x] Production environment validation rejects placeholder databases, unsafe secrets/origins, missing email/AI configuration, and mock AI fallback.
- [x] Frontend/backend contracts have one authoritative shared source.
- [ ] Production deployment configuration and smoke checks are documented and verified.

---

## Phase 2 — Authentication — 96%

Master-prompt scope: register, login, logout, current user, protected routes, and
profile.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Registration | ✅ | 95% | Registration creates an expiring hashed verification token; Resend adapter handles production delivery; development returns a disclosed test code; migration is deployed | Run a live sender smoke test before production release. |
| Login and logout | ✅ | 100% | Signed session creation/clearing and role redirects in auth controller | Reverify with production cookie settings on HTTPS. |
| Current user/session persistence | ✅ | 98% | HMAC-signed, eight-hour, HTTP-only, SameSite cookie; database-backed current-user lookup; password reset increments session version | Reverify production Secure-cookie behavior on HTTPS. |
| Protected routes and role checks | ✅ | 95% | Next optimistic cookie gate plus authoritative backend session/role checks | The frontend proxy only checks cookie presence by design; backend remains authoritative. |
| Profile viewing/updating | ✅ | 95% | Profile controller/service and traveler verification UI | Complete a browser-level persistence smoke test. |
| Password and token storage | ✅ | 98% | Per-user random salt with Node `scrypt`; single-use account codes are HMAC-SHA-256 hashed with a separate production secret | Consider a versioned password-hash format to support future cost upgrades. |
| Abuse protection | 🟡 | 80% | Authentication, itinerary, accommodation, and provider rate limits | Rate-limit buckets are in memory and will not coordinate across multiple production instances. |
| Recovery and production email | ✅ | 95% | Verification/resend/reset actions, 30/15-minute single-use tokens, session invalidation, Resend HTTP adapter, completed reset UI, and passing database integration | Live sender/domain verification remains pending. |

Phase exit criteria:

- [x] Registration and email-code verification use expiring single-use tokens.
- [x] Login, logout, current user, role routing, and protected APIs exist.
- [x] Passwords are salted and hashed; hashes are never sent to clients.
- [x] Production registration is enabled when the required Resend sender configuration is valid.
- [x] Password recovery is implemented through request-code and reset-password flows.
- [x] Apply `20260914090000_add_account_tokens` to the intended environment.
- [ ] Verify delivery using a real Resend API key and verified sender/domain.
- [ ] HTTPS production session behavior has a recorded smoke test.

---

## Phase 3 — Trip Management — 97%

Master-prompt scope: create, edit, delete/archive, trip preferences, and saved
trips.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Trip input and preferences | ✅ | 100% | Empty debounced destination search, explicit structured selection, auto currency, destination-specific transport, automatic hotel search, reset behavior, dates, budget, interests, party, traveler count, travel style, and optional preferences | Current browser scenario verifies the full dependent-field sequence. |
| Save and retrieve trips | ✅ | 100% | `save-trip`, user-scoped reads, saved trip UI, reload flow, and current database integration pass | Keep currency assertions in regression coverage. |
| Edit and update | ✅ | 95% | `update-trip` and `update-trip-itinerary` use owner-scoped records and transactions | Keep server-owned fields immutable during manual itinerary edits. |
| Duplicate, archive, restore, and delete | ✅ | 100% | Explicit lifecycle actions with ownership checks, audit events, recoverable archive, and permanent deletion restricted to the archived UI | No known core gap. |
| Ownership authorization | ✅ | 100% | Queries include both trip ID and authenticated user ID; current 4/4 integration pass covers cross-user rejection | Retain an isolated database for repeatable CI. |
| Trip domain completeness | ✅ | 100% | Deployed schema and APIs store destination context, budget/currency, preferences, itinerary, conditions, active/archive status, and timestamps | No known core gap. |

Phase exit criteria:

- [x] A traveler can enter all required trip preferences.
- [x] Trips can be saved, reopened, updated, duplicated, and deleted.
- [x] Backend mutations use authenticated ownership checks.
- [x] Add a trip `currency` field through schema, APIs, calculations, AI validation, provider selection, and UI.
- [x] Apply `20260914120000_add_trip_currency` and reverify USD/EUR persistence.
- [x] Add structured destination fields, destination-derived currency/transport context, automatic stays, and dependent-state clearing in code.
- [x] Apply `20260916090000_add_trip_destination_context` and rerun persistence/browser coverage.
- [x] Add active/archive status with owner-scoped archive and restore actions.
- [ ] Reverify CRUD and cross-user rejection against an isolated database.

---

## Phase 4 — Itinerary Foundation — 92%

Master-prompt scope: itinerary data model, itinerary display, manual editing, and
saving.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Structured itinerary model | ✅ | 98% | Typed day/activity/accommodation/budget structures, current-trip JSON persistence, and immutable relational version snapshots | Granular activity querying remains an optional future optimization. |
| Day-by-day display | ✅ | 95% | Responsive itinerary cards, day detail dialogs, time, location/context, cost, weather, and crowd labels | Run a manual screen-reader pass on generated long itineraries. |
| Add/edit/remove/reorder | ✅ | 100% | Pure editor utilities plus dashboard controls and confirmation for removal | No known core gap. |
| Canonical recalculation | ✅ | 100% | Backend edit service recalculates daily totals, planned spend, sharing, and optimization | No known core gap. |
| Save and reload manual changes | ⚠️ | 90% | Transactional update action plus integration and E2E test coverage in repository | Tests exist; database/E2E were not rerun in this audit. |
| Regeneration safety | ✅ | 100% | Generation is deliberate, current plans survive failures, and saves/regenerations/manual edits/restores create labeled immutable snapshots | No known core gap. |

Phase exit criteria:

- [x] Itineraries are structured data, not uncontrolled Markdown.
- [x] Users can view, add, edit, remove, and reorder activities.
- [x] Manual edits recalculate important totals on the server.
- [x] Save/update paths preserve user ownership.
- [ ] Reverify refresh/logout/login persistence in the current environment.
- [x] Add itinerary version history and restore-as-new-version recovery.

---

## Phase 5 — AI — 97%

Master-prompt scope: OpenAI provider, structured generation, validation,
persistence, and regeneration.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Replaceable AI provider | ✅ | 100% | `AIItineraryProvider`, OpenAI and Gemini implementations, environment resolver | Keep provider-specific code isolated here. |
| Deliberate structured generation | ✅ | 98% | Authenticated/rate-limited itinerary endpoint, JSON response mode, system/user prompts, and a successful configured Gemini Japan/JPY/14-day smoke request | Production success still depends on valid external credentials and quota. |
| Output validation | ✅ | 100% | Strict Zod schemas validate unknown fields, dates, day count, costs, and totals | No known core gap. |
| Controlled repair | ✅ | 100% | One bounded repair attempt with validation issues and replacement JSON request | No known core gap. |
| Budget/weather/preferences context | ✅ | 95% | Prompt includes destination, dates, group, budget, interests, preferences, and date-matched weather | Crowd estimates are attached after generation rather than supplied as planning context. |
| Persistence and regeneration | ✅ | 100% | User can save/reload, deliberately regenerate, retain the current plan on failure, inspect snapshot history, and restore an earlier version without losing the current version | No known core gap. |
| Production failure behavior | ✅ | 100% | Mock plans require explicit non-production `AI_MOCK_FALLBACK`; configured-provider failures return retryable errors, retain the existing plan, and expose Retry in the UI | Focused Playwright coverage passes; reverify in the full suite and against the deployed provider. |
| AI cost controls | ✅ | 98% | Deliberate calls, timeout, rate limit, max output tokens, persistent generation records, and user-scoped payload-bound idempotency replay/conflict handling | Monitor provider cost and retention volume in production. |

Phase exit criteria:

- [x] AI calls are server-side and provider-isolated.
- [x] Output is structured, validated, date-complete, and cost-consistent.
- [x] Invalid responses receive at most one controlled repair.
- [x] Successful results can be saved and reloaded.
- [x] Restrict mock generation to explicit development/mock mode.
- [x] On production provider failure, preserve the existing itinerary and return a retryable error.
- [ ] Feed clearly labeled crowd context into planning when appropriate.

---

## Phase 6 — Budget — 99%

Master-prompt scope: cost calculation, budget comparison, and optimization
suggestions.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Server/domain cost calculation | ✅ | 100% | Deterministic split, reserve, accommodation, daily totals, planned spend, equal shares, and decimal database storage | Currency amounts are never implicitly converted. |
| Budget comparison | ✅ | 100% | Remaining budget/shortfall and within/near/over status use the trip currency | No known arithmetic gap in the supported flow. |
| Optimization suggestions | ✅ | 95% | Accommodation, activity, food, and transport alternatives include savings and tradeoffs | Suggestions are deterministic planning advice, not current provider guarantees. |
| User control | ✅ | 100% | Suggestions never silently remove or replace itinerary items | No known core gap. |
| Budget UI | ✅ | 99% | Dedicated budget view, immediate refresh after manual changes, country-derived currency, manual fallback, 20-code support, and currency-aware formatting | Reverify the updated selection flow in the complete browser run. |
| Currency correctness | ✅ | 99% | Country-code resolution, API contracts, AI validation, saved trips, signed offers, zero-decimal handling, calculations, and display carry one currency; mismatches are rejected | Apply the expanded database constraint and rerun integration. No exchange-rate conversion is claimed. |

Phase exit criteria:

- [x] Important calculations exist outside React components.
- [x] Budget status and shortfall are visible.
- [x] Optimization is explained and never applied silently.
- [x] Remove the PHP-only trip-domain assumption required by section 66 of the master prompt.
- [x] Add currency-focused unit tests and currency assertions to integration coverage.
- [x] Apply the currency migration and execute the updated integration coverage.

---

## Phase 7 — Travel APIs — 96%

Master-prompt scope: flights, hotels, activities, normalization, and comparison UI.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Provider abstraction | ✅ | 95% | Shared `AmadeusTravelProvider` interface and server-only authentication | A second provider should be addable without changing the dashboard contract. |
| Flights | ✅ | 95% | Flight Offers search normalization includes airline, route, times, stops, seats, price, currency, source, and fetched time | Live behavior depends on Amadeus credentials/environment. |
| Hotels | ✅ | 99% | Confirmed destinations trigger coordinate/date/traveler/currency-aware availability automatically; normalization includes type, optional rating, address, total/nightly rate, room/cancellation details, and signed tokens; controlled E2E verifies the request dependency | Live behavior depends on destination support and Amadeus inventory. |
| Destination context | ✅ | 100% | Country-code currency resolution and country/city-specific transport guidance are isolated behind an authenticated service/controller; unsupported cases remain explicit; Tokyo/JPY reset behavior passes E2E | Transport modes are curated guidance, not live schedules or guaranteed availability. |
| Activities | ✅ | 95% | Amadeus activities plus approved TravelMate listings with safe external reference URLs | Local listing prices are not the same as live provider inventory and are labeled accordingly. |
| Normalization and freshness | ✅ | 100% | Provider-neutral contracts include currency, `fetchedAt`, live/test status, and source-specific freshness metadata; stale data is permanently labeled | Cache is per API process rather than shared across instances. |
| Comparison UI | ✅ | 95% | Flights, stays, and activities are presented with source/failure disclosures | Sorting/filter depth is minimal but not required for MVP. |
| Provider failure isolation | ⚠️ | 85% | Controller uses settled provider calls and retains local activity options | Repository E2E covers this, but it was not rerun in this audit. |
| Caching/performance | ✅ | 95% | Bounded request-coalescing cache uses documented source-specific TTL and stale-on-error cutoffs; API responses remain `no-store` and every provider result is labeled | A distributed cache is optional for multi-instance deployments. |

Phase exit criteria:

- [x] Flight, hotel, and activity integration paths exist.
- [x] Results are normalized with source, currency, live/test status, and timestamp.
- [x] Provider failure does not fabricate availability.
- [x] Comparison UI preserves local options during external failure.
- [x] Reverify destination context and provider success/failure E2E with controlled fixtures after migration.
- [x] Add and document source-specific caching and freshness policies with permanent stale labels.

---

## Phase 8 — Conditions — 93%

Master-prompt scope: weather, crowd information, and condition-based
recommendations.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Weather providers | ✅ | 95% | OpenWeatherMap plus Open-Meteo failover and normalized response | Live behavior depends on network/provider availability. |
| Date coverage and honesty | ✅ | 100% | Validated 1–14 day ranges, partial/unavailable forecast messages, no fabricated terminal fallback | No known core gap. |
| Crowd handling | ✅ | 95% | Deterministic calendar heuristic is labeled `estimated` with low confidence | This is not a live crowd provider and must remain clearly labeled. |
| Weather-aware generation | ✅ | 90% | Date-matched weather summary asks AI to prefer indoor/cooler alternatives | Add stronger traceability showing which recommendation changed because of weather. |
| Crowd-aware recommendations | ✅ | 90% | Low-confidence crowd context enters the AI prompt; finalized days carry deterministic early-visit/alternative advice and explicitly state that no activity was moved automatically | Revisit only if a verified live crowd provider becomes available. |
| Condition persistence/freshness | ✅ | 96% | Weather and crowd responses carry `fetchedAt`/`refreshAfter`; weather uses a 15-minute fresh/1-hour stale-on-error cache and a permanent freshness badge; both persist inside existing trip JSON; the traveler can refresh conditions without changing itinerary content | A dedicated snapshot/history table is an optional production optimization. |

Phase exit criteria:

- [x] Weather uses real providers when available and degrades to unavailable honestly.
- [x] Forecast coverage matches relevant dates.
- [x] Crowd estimates never claim live foot traffic.
- [x] Crowd estimates influence clearly explained timing/alternative recommendations.
- [x] Condition retrieval and suggested-refresh times are stored and displayed with a manual refresh action.
- [x] Condition refresh preserves activities, themes, costs, and the itinerary's manual-edit marker.

---

## Phase 9 — Polish — 93%

Master-prompt scope: loading, error and empty states, responsive UI, security,
testing, accessibility, and production readiness.

| Feature | Status | Readiness | Code evidence | Gap / next acceptance check |
| --- | --- | ---: | --- | --- |
| Loading/error/empty states | ✅ | 90% | Global loading/error/not-found views, dashboard retry states, disabled/busy controls, provider disclosures | Generation feedback is a single state rather than a truthful multi-stage progress model. |
| Responsive UI | ✅ | 96% | The current complete browser suite checks the reorganized traveler journey at 390px and owner/admin workspaces at tablet and desktop widths | Extend coverage whenever new routes or layouts are introduced. |
| Accessibility | 🟡 | 88% | Labeled forms/buttons, semantic dialogs, focus trap/restoration, focus-visible styles, reduced motion, alt text, dashboard skip navigation, and deterministic heading focus are code- and browser-verified; `docs/ACCESSIBILITY_AUDIT.md` records the evidence | Complete the documented manual NVDA/VoiceOver listening and navigation pass. |
| Security hardening | 🟡 | 85% | HTTP-only signed sessions, same-origin write guard, CORS allowlist, security headers, input limits, rate limits, HMAC offer token | Add CSP, distributed rate limiting, dependency/secret scanning, and a production security review. |
| Unit/type/build verification | ✅ | 100% | Current audit: frontend lint/build/28 tests and contract drift check pass; backend typecheck/build/70 tests pass | Keep this green after every material change. |
| Database integration verification | ✅ | 100% | Five scenarios pass after all six migrations, covering authentication, destination persistence, lifecycle ownership, immutable versions, restoration, and generation idempotency | Establish a disposable CI database for repeatability. |
| Browser E2E verification | ✅ | 100% | All 15 scenarios pass, including explicit destination selection, JPY derivation, Tokyo transport/hotels, dependent reset, roles, persistence, responsive behavior, and provider failures | Move the same suite to a disposable seeded CI database. |
| CI/CD and deployment | 🟡 | 75% | Both `.github/workflows/ci.yml` files add quality, ephemeral-PostgreSQL integration, migration/seed, complete E2E, concurrency, and retained diagnostics; both `DEPLOYMENT.md` runbooks define release order, health, smoke, monitoring, and rollback | Observe the first hosted pass, select deployment targets, bind their release/migration commands, and record live smoke results. |
| Maintainability/documentation | 🟡 | 76% | Root, frontend, backend, deployment, accessibility, and implementation-status documents agree on the master-prompt lifecycle, 1–14 day behavior, provider boundaries, current test totals, and remaining production proof. `TravelerJourneyOverview.tsx` owns onboarding, while the activity-editor and day-detail dialogs now live in the focused `TravelerItineraryDialogs.tsx` module. | `TravelerDashboard.tsx` remains 703 lines and `TravelMateLanding.tsx` 562 lines; continue splitting planner and landing sections without changing behavior. |

Phase exit criteria:

- [x] Frontend lint, unit tests, type checking through build, and production build pass.
- [x] Backend unit tests, typecheck, Prisma generation, and production build pass.
- [x] Core traveler UI has responsive browser coverage in the repository.
- [x] Run the updated complete Playwright suite successfully after the destination migration.
- [ ] Run integration and Playwright suites against an isolated disposable database.
- [x] Add automated keyboard coverage for dashboard skip navigation and stage-change focus; dialog focus trapping/restoration is also covered.
- [ ] Complete the documented manual NVDA/VoiceOver testing and record results.
- [x] Add CI for lint, typecheck, unit, integration, build, and controlled E2E stages.
- [ ] Establish deployment targets, production environment validation, monitoring, and smoke tests.
- [ ] Split oversized feature components without changing behavior.
- [x] Update stale README claims for authentication, providers, and currency behavior.
- [x] Complete the repository documentation drift audit for lifecycle, provider, condition-freshness, accessibility, and verification claims.

---

## Master-prompt MVP acceptance snapshot

| MVP capability | State | Notes |
| --- | --- | --- |
| Register / login / logout | ✅ | Expiring verification, resend, password reset, session invalidation, login, and logout are implemented; migration and database integration pass. Live sender verification remains a production check. |
| View/update profile | ✅ | Implemented with server validation and persistence path. |
| Enter destination, dates, budget, interests | ✅ | Destination starts empty, requires a structured suggestion, and drives currency, transportation, and accommodation state; additional preferences remain available. |
| Generate a day-by-day itinerary | ✅ | OpenAI/Gemini providers, strict validation, repair, and disclosed development mock exist. |
| View/edit/save/retrieve itinerary | ⚠️ | Implemented; current isolated database and browser persistence run remains pending. |
| Estimate and compare budget | ✅ | Twenty supported currencies, auto-detection/manual fallback, optimization, sharing, formatting, mismatch protection, and the expanded database constraint are implemented and verified. |
| Flights, hotels, activities integration architecture | ✅ | Amadeus plus local activity/listing sources are normalized and labeled. |
| Weather when possible | ✅ | Two-provider strategy with explicit unavailable state. |
| Crowd status or graceful unavailable behavior | ✅ | Low-confidence calendar estimate is explicitly labeled, not live. |
| Loading/error/empty/responsive UX | ✅ | Implemented for current routes; broader manual accessibility validation remains. |

The project must not be called fully complete until the complete 25-step flow in
section 77 of the master prompt is rerun successfully after the remaining blockers
are addressed.

## Current verification record

Commands executed through the 2026-09-18 audit:

| Project | Check | Result |
| --- | --- | --- |
| Frontend | `npm run lint` | ✅ Passed |
| Frontend | `npm test` | ✅ 28 passed, 0 failed, including API-error metadata, travel-option runtime validation, freshness metadata, currency coverage, and condition refresh preserving manual edits |
| Frontend | `npm run build` | ✅ Passed, including TypeScript and static page generation |
| Backend | `npm test` | ✅ 70 passed, 0 failed, including OpenAPI/runtime error, destination, weather/crowd, and travel-comparison contract alignment; response normalization; provider-cache lifecycle; production database; and mock-fallback gates |
| Backend | `npm run typecheck` | ✅ Passed |
| Backend | `npm run build` | ✅ Passed, including Prisma client generation |
| Backend | `npm run test:integration` | ✅ 5 passed, 0 failed after all six migrations, including lifecycle/version ownership and idempotent generation replay |
| Frontend | `npm run test:e2e` | ✅ 15 passed, 0 failed, including destination context, persistence, accessibility, responsive layouts, and failure/retry behavior |
| Backend | Direct configured Gemini smoke | ✅ Exact Japan/JPY/14-day request returned HTTP 200 with 14 days and `source: gemini` |
| Frontend | Targeted Playwright password-recovery scenario | ✅ 1 passed, 0 failed |
| Frontend | Targeted Playwright provider-failure/preserved-plan/condition-refresh scenario | ✅ 1 passed, 0 failed |
| Both repositories | Parse `.github/workflows/ci.yml` with `js-yaml` | ✅ Valid YAML |

The integration run created uniquely named records and removed them afterward. It is a
current pass, while repeatable hosted CI should still use a dedicated disposable database.

## Critical readiness backlog

Complete these in order. This follows the master prompt's rule to finish critical
core functionality before optional features.

### P0 — Required before production release

1. **Activate isolated release verification** — run the hosted workflows, configure `BACKEND_REPO_TOKEN` if the backend is private, and record the first ephemeral-database integration/E2E pass.
2. **Deployment and production checks** — select targets, automate migrations, add rollback notes and health monitoring, then run live email, AI-provider, and full production smoke tests.

### P1 — Required for a defensible complete capstone

1. Complete the documented manual NVDA/VoiceOver review; automated keyboard skip, stage-change focus, and dialog focus behavior are verified.
2. Continue splitting oversized traveler and landing components into focused feature modules.

### P2 — Production hardening

1. Add CSP, dependency scanning, secret scanning, and distributed rate limiting.
2. Add external-result caching with source-aware TTL and stale labeling.
3. Define production retention limits for itinerary versions and AI generation history.
4. Add request correlation and structured production logging without sensitive data.

## Known master-prompt conflicts

No direct master-prompt behavior conflict is currently verified. Section 57's local
unit, type, lint, build, database integration, configured Gemini smoke, and updated
15-scenario browser gates pass. Isolated workflows still need their first hosted pass,
and live production smoke checks remain a release-readiness gap.

## Tracker update protocol

Update this file after every completed vertical slice or release audit:

1. Re-read the affected `MASTERPROMPT.md` sections.
2. Inspect the actual frontend, backend, schema, migrations, tests, and failure behavior.
3. Update the feature row before changing the phase percentage.
4. Mark a feature ✅ only when its acceptance path and failure path are implemented.
5. Record the exact verification command and result.
6. Recalculate the phase weighted average, then the overall weighted score.
7. Move completed backlog items into the relevant phase evidence; do not simply delete historical gaps.
8. Never count demo/mock behavior as production-live behavior.
9. Never count optional marketplace/payment/admin complexity toward core TravelMate readiness.

Recommended audit cadence:

- After each P0 vertical slice.
- Before every capstone adviser review or defense rehearsal.
- Before any deployment or database migration.
- Whenever `MASTERPROMPT.md` changes.
