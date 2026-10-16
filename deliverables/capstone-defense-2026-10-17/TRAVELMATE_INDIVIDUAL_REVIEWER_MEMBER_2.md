# TravelMate Individual Defense Reviewer — Member 2

**Member name:** ________________________________  
**Project title:** TravelMate — AI-Assisted Travel Planning and Itinerary Management System  
**Suggested study focus:** Backend, database, authentication and business rules  

> This focus is a study/demo assignment only. It is **not** a claim about who actually coded each feature. Before defense, replace the ownership blanks with truthful contributions and evidence.

## How the individual rubric is scored

Each criterion is /5, total /20.

- **A — Technical understanding:** explain architecture, tools, data flow and implementation decisions accurately.
- **B — Defense and reasoning:** answer directly, then justify using code, test or observed behavior.
- **C — Contribution and ownership:** explain your real work, show the exact source or test, and connect it to the full system.
- **D — Awareness of limitations:** identify what is incomplete/unverified and give a practical improvement.

## 60-second opening answer

“TravelMate is an AI-assisted recommendation and itinerary management system for travelers. The traveler defines destination, dates, budget, group and preferences. The Next.js frontend sends validated requests to an Express API. The backend checks the authenticated user, applies business rules, gathers verified place/context data, asks the configured AI provider to arrange an itinerary, validates the result, calculates labeled estimates and stores the trip in PostgreSQL through Prisma. The traveler remains in control because recommendations can be edited, saved, reopened, mapped, marked complete and recorded as visited. The system does not guarantee live prices, bookings or real-world availability.”

## Your assigned demo path

1. Explain login/session ownership without displaying credentials.
2. Trace successful generation save into Trip and ItineraryVersion.
3. Mark a trip done, then record visited places separately and explain database uniqueness.
4. Open Budget Review and explain units, precision and missing estimates.

## Criterion A — Technical understanding

Use this answer pattern: **UI → API → service/business rule → database/provider → response/UI**.

- Study `src/app.ts`, `src/routes/index.ts`, `src/middlewares/auth-middleware.ts` and `src/services/platform/platform-service.ts`.
- Study Prisma models User, Trip, VisitedPlace, ItineraryVersion, ItineraryGeneration, PlanSubscription and AuditEvent.
- Explain transactions, ownership filters, unique keys, lifecycle status and audit evidence.
- Study `src/lib/expense-ledger.ts` for group/per-person/day/night rules.

Practice explanation:

“My assigned area starts in the frontend component where the user enters or selects data. The frontend calls a protected `/api` endpoint. Express middleware checks the session and request rules. The controller validates the payload, the service applies the business rule, and Prisma reads or writes only records owned by the authenticated user. The response returns a safe contract to the UI. External provider data is treated as evidence, and missing data stays unavailable instead of being fabricated.”

## Criterion B — Defense and reasoning

Answer in four steps: **Direct answer → reason → TravelMate evidence → limitation**.

- **Q: How do you stop users from editing another trip?**  
A: The backend loads or writes the trip using both trip ID and authenticated user ID. UI hiding is not trusted as authorization.
- **Q: Why use database transactions?**  
A: Related writes such as trip/version/audit or allowance/result must succeed together so the system does not keep half-completed state.
- **Q: How are duplicates prevented?**  
A: Unique save/idempotency/place keys plus transaction checks make retries safe and prevent repeated records.
- **Q: How are costs calculated?**  
A: The ledger extends an amount according to its unit—per person, group, day, night, room or leg—and rounds using the selected currency’s precision.
- **Q: Why not use zero for a missing price?**  
A: Zero means known free cost. Missing evidence is marked unavailable or partial so affordability is not overstated.
- **Q: What is an audit event?**  
A: It is a server-side record connecting an actor, action and target for important account, moderation, plan and trip operations.

## Criterion C — Contribution and ownership

Complete this truthfully before defense:

- My actual contribution: ________________________________________________
- Exact file(s) or module(s): _____________________________________________
- Problem before my change: ______________________________________________
- Decision I made and why: _______________________________________________
- How I verified it: _____________________________________________________
- How it connects to other modules: ______________________________________

Suggested 45-second format:

“My contribution was ____. The problem was ____. I worked in ____. The frontend/backend flow is ____. I chose ____ because ____. I verified it using ____. One limitation is ____, and the next improvement is ____.”

## Criterion D — Awareness of limitations

- Provider-dependent features need internet and valid server configuration.
- AI output is validated, but real-world hours, access, weather, availability and prices still need traveler confirmation.
- Accommodation is suggestion-only; no booking is completed.
- Budget values are estimates; partial or unavailable categories must not be called free.
- PayMongo is test-mode demonstration only.
- Live production providers/deployment were not exercised during this reviewer run.

## Shared facts every member must know

- Roles: traveler and admin.
- Stack: Next.js 16 + React 19 frontend; Express 5 + TypeScript backend; Prisma 7 + PostgreSQL database.
- Main workflow: Define → Generate → Understand → Refine → Save → Reopen.
- 1–31 inclusive trip days; party types solo/couple/family/friends.
- Successful generation auto-saves; manual edits need explicit save.
- Mark as done and Record visited places are separate.
- Free/Plus defaults are 3/30 per calendar month, configurable and provisional.
- A successful test-payment redirect alone does not activate Plus; the backend verifies the provider record.
- Never claim guaranteed prices, booking, automatic AI training or complete offline operation.

## Individual /20 self-check

| Criterion | Ready evidence | Self-score /5 |
|---|---|---:|
| A Technical understanding | I can trace my demo from UI to database/provider. | |
| B Defense and reasoning | I answer directly and cite a rule/test. | |
| C Contribution and ownership | I can show my real file/change/test. | |
| D Awareness of limitations | I name a real gap and improvement. | |
| **Total** | | **/20** |

## Five-minute review before presenting

1. State what the system does in one sentence.
2. Trace your assigned feature using UI → API → backend → database.
3. Rehearse your real contribution and one test.
4. Memorize two limitations and two future improvements.
5. If unsure, say: “That behavior was not runtime-verified; the code shows ____, and I would verify it by ____.”

Source references use paths relative to travelmate-frontend-new/ or travelmate-backend-api/.