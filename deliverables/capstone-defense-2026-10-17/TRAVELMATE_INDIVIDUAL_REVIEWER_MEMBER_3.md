# TravelMate Individual Defense Reviewer — Member 3

**Member name:** ________________________________  
**Project title:** TravelMate — AI-Assisted Travel Planning and Itinerary Management System  
**Suggested study focus:** AI, external APIs, maps, quotas, payments, testing and limitations  

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

1. Explain grounded AI generation and the difference between AI arrangement and provider evidence.
2. Open the map and explain why a route needs verified coordinates.
3. Open My Plan and explain used/reserved/remaining allowance and recovery.
4. Explain PayMongo test verification and show test status only if safely configured.

## Criterion A — Technical understanding

Use this answer pattern: **UI → API → service/business rule → database/provider → response/UI**.

- Study `src/services/ai/provider.ts`, `grounded-schedule.ts`, `itinerary-schema.ts` and provider-error handling.
- Study `src/services/plans/plan-service.ts`, `test-checkout-service.ts` and `paymongo-webhook-routes.ts`.
- Explain timeouts, retry/repair, strict validation, provider fallbacks and honest unavailable states.
- Know the executed test evidence and the single Docker timeout limitation.

Practice explanation:

“My assigned area starts in the frontend component where the user enters or selects data. The frontend calls a protected `/api` endpoint. Express middleware checks the session and request rules. The controller validates the payload, the service applies the business rule, and Prisma reads or writes only records owned by the authenticated user. The response returns a safe contract to the UI. External provider data is treated as evidence, and missing data stays unavailable instead of being fabricated.”

## Criterion B — Defense and reasoning

Answer in four steps: **Direct answer → reason → TravelMate evidence → limitation**.

- **Q: Can the AI invent an attraction?**  
A: The grounded scheduler is instructed and validated to use only IDs from a verified place catalog. Invalid IDs are rejected, though real-world details still require confirmation.
- **Q: What happens on provider timeout?**  
A: The request returns a controlled failure; optional data may remain unavailable, while failed generation is released or reconciled so it is not falsely charged.
- **Q: Why use idempotency?**  
A: A repeated request or webhook can be recognized as the same operation, preventing duplicate generation charges or plan activation.
- **Q: Why is a payment redirect insufficient?**  
A: A browser URL can be forged or arrive before settlement. The server re-fetches and verifies the exact test payment and metadata.
- **Q: What works without the internet?**  
A: Only content already loaded in the browser may remain visible. Provider, API, authentication, database, save and map operations need connectivity.
- **Q: What test evidence can you claim?**  
A: Frontend 186/186 passed, backend typecheck passed, and backend 605/606 passed; the remaining Windows Docker test timed out launching Git Bash.

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