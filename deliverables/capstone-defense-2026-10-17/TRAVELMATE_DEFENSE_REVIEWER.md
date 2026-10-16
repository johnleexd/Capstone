# TravelMate Complete Capstone Defense Reviewer and Study Guide

**Prepared from the current frontend and backend implementation**  
**Review date:** 2026-10-17  
**Language:** beginner-friendly Cebuanolish; technical terms remain in English  

> This reviewer supports the Cordova Public College group rubric (Presentation 15, Functionality 30, Usability 25) and individual rubric (Technical understanding, Defense/reasoning, Contribution/ownership, Awareness of limitations; 20 points). It does not assign real contributions to unnamed members.

## How to use this packet

1. Every member studies the System Overview, User Journeys, Architecture, Security, Quick Review and at least 40 Q&As.
2. Each member uses their separate individual reviewer for a focused demo and truthful contribution evidence.
3. During defense, answer directly, explain the reason, cite the implementation/test, then state the limitation.
4. Never show `.env` values, API keys, passwords, tokens or personal user records.

## 1. System overview

### What TravelMate is

TravelMate is an **AI-assisted travel recommendation and itinerary management system**. A traveler chooses a destination, dates, budget, party, interests, pace, transportation preference and optional accommodation. The system gathers verified place/context data, asks a configured AI provider to arrange a schedule, validates that response, calculates labeled planning estimates, saves the plan and lets the traveler edit, reopen, map, complete and record visits.

### Problem addressed

Manual travel planning is fragmented: users search places, compare constraints, build daily schedules, estimate costs and remember decisions across many sources. TravelMate organizes those steps into one workflow and preserves the result. It reduces planning effort; it does not remove the traveler’s responsibility to confirm real-world conditions.

### Users and roles

- **Traveler:** manages only their own profile, trips, visits, feedback, notifications and plan allowance.
- **Admin:** monitors system summaries and manages users, reports, appeals, feedback, notifications and health information.

Only `traveler` and `admin` are valid roles in the current schema/session checks.

### Objectives

- Generate a relevant, day-by-day trip recommendation from user constraints.
- Ground activities in verified destination/place data.
- Allow manual refinement without spending another AI generation.
- Persist trips and versions for later reopening.
- Show maps, weather/context and estimated expenses with honest source/availability states.
- Keep completion status and actual visit history accurate and separate.

### Scope and limitations

TravelMate supports 1–31 inclusive trip days, solo/couple/family/friends parties, country-aware destinations, itinerary generation/editing, accommodation suggestions, maps, budget review, completion/visits, feedback, notifications, plan quotas and admin workflows. It depends on internet/server/provider availability. It does not guarantee live prices, bookings, operating hours, accessibility, safety, weather or traffic. PayMongo is test-mode demonstration only.

### AI assistance and traveler control

AI **arranges** a schedule using the supplied constraints and verified place IDs. Backend schemas and business rules validate the output. The traveler still chooses the inputs, reviews every recommendation, edits or removes activities, chooses accommodation, saves changes and decides whether to follow the plan. This makes TravelMate a recommendation system rather than an autonomous booking agent.

### Accommodation and costs

Accommodation entries are suggestions or saved choices; no reservation is completed. Cost values are estimates or explicit provider/user amounts. A missing price remains unavailable/partial and must never be presented as zero or free.

**Primary sources:** frontend `components/features/traveler/TravelerDashboard.tsx`, `lib/help-guides.ts`; backend `src/app.ts`, `src/routes/index.ts`, `prisma/schema.prisma`, `docs/PRODUCT_BASELINE.md` (cross-check only).

## 2. Complete feature review

**Status legend:** IMPLEMENTED = code path exists and is covered by local static/test evidence; PARTIAL = some path/config is present but full live behavior was not verified; UNAVAILABLE = explicitly absent/retired; UNVERIFIED = cannot be responsibly claimed without runtime/provider access.

### 1. Registration, email verification, password login, recovery, ug Google sign-in — **IMPLEMENTED; live provider setup needs runtime verification**

**Purpose ug access.** Makahimo ang traveler og account, ma-verify ang email, maka-sign in, maka-reset sa password, o mogamit sa Google OAuth.

**Actual workflow.** Sa landing page, pili Register o Sign in. Registration validates personal details ug password, sends an eight-character verification code, ug dili pa makalogin hangtod verified. Forgot password sends a reset code. Google sign-in starts a protected OAuth flow and returns the user to the correct dashboard.

**Input → output.** Name/contact/email/password o Google identity → verified traveler account ug HttpOnly session cookie.

**Frontend → API → backend → database.** Auth form → `/api/auth` or `/api/auth/oauth/google` → auth controller/service → User, AccountToken, OAuthAccount, RevokedSession, ug AuditEvent records.

**Validation, permission, ug error handling.** Email format, strong password, confirmation match, cooldown/rate limit, expiring limited-use codes, verified Google email, OAuth state/nonce/PKCE, and active-account checks. Safe generic recovery messages reduce account discovery.

**Limitasyon.** Email, Google OAuth, ug database credentials must be correctly configured. Provider outage can block registration delivery or OAuth without exposing secrets.

**Possible panel question:** Ngano dili dayon makalogin human register?  
**Suggested answer:** Because TravelMate requires email verification first. This proves control of the address and prevents an unverified account from receiving a session.

**Source:** frontend `components/features/landing/AuthModal.tsx`; backend `src/controllers/auth-controller.ts:65-170`, `src/controllers/google-oauth-controller.ts:32-86`, `src/services/auth/google-oauth-service.ts:35-203`, `src/middlewares/auth-middleware.ts:1-105`.

### 2. Traveler profile, account settings, sign-out, suspension ug appeal — **IMPLEMENTED**

**Purpose ug access.** Makaupdate ang user sa public profile/contact details, safely sign out, ug maka-appeal kung suspended.

**Actual workflow.** Open profile drawer → Account settings → edit allowed fields → Save. Sign-out revokes the current token and clears cookies. A suspended user is routed to the appeal page, can submit one bounded message, and waits for admin review.

**Input → output.** Allowed profile fields or appeal text → updated profile, appeal record, and account notices.

**Frontend → API → backend → database.** Profile/appeal UI → `/api/profile`, `/api/account/appeal`, or `/api/auth` → profile/appeal/auth services → User, Moderation, Notification, RevokedSession, AuditEvent.

**Validation, permission, ug error handling.** Email is read-only in the UI; image URL must be HTTPS or blank; appeal text is bounded; ownership and role checks apply. Sign-out distinguishes local cookie clearing from confirmed server revocation.

**Limitasyon.** Changing the account email requires support. Appeal approval depends on an administrator.

**Possible panel question:** Unsa ang mahitabo kung suspended ang account?  
**Suggested answer:** Trip-planning access is paused, but saved trips are preserved. The traveler is directed to the appeal page and can submit an explanation for admin review.

**Source:** frontend `app/account/appeal/page.tsx:11-56`, `lib/help-guides.ts:83-92`; backend `src/controllers/appeal-controller.ts`, `src/controllers/profile-controller.ts`, `src/middlewares/auth-middleware.ts:65-105`.

### 3. Destination search ug country-aware browsing — **IMPLEMENTED; coverage depends on geographic sources**

**Purpose ug access.** Makapili og verified city or town and keep the correct country/area identity, including duplicate place names.

**Actual workflow.** Type a destination or choose Browse by country, select a country/region/city result, then continue when a specific place with valid coordinates is selected.

**Input → output.** Search text, country scope, page cursor → normalized destination identity, country code, coordinates, timezone/currency context, and coverage messages.

**Frontend → API → backend → database.** Destination selector → `/api/locations` and `/api/destination-context` → location/catalogue/geocoder services → bundled/global catalogue plus provider responses; selected identity is saved with the Trip.

**Validation, permission, ug error handling.** Input length, country membership, settlement type, coordinates, pagination, ambiguity, wrong-country and boundary checks. Provider failure stays retryable or returns honest limited coverage.

**Limitasyon.** Some areas have sparse public data. An administrative region without a specific town cannot be used as the final trip destination.

**Possible panel question:** How do you avoid choosing the wrong city with the same name?  
**Suggested answer:** The system keeps country, parent area, provider identity, and coordinates together. Ambiguous names are not accepted as an arbitrary first match.

**Source:** frontend `components/features/traveler/DestinationSelector.tsx`; backend `src/controllers/location-controller.ts`, `src/services/locations/`, tests `tests/country-browsing.test.ts`, `tests/destination-areas.test.ts`.

### 4. Trip-planning inputs ug validation — **IMPLEMENTED**

**Purpose ug access.** Collects the constraints used to build a relevant itinerary.

**Actual workflow.** Choose destination, currency, total budget, dates, party type/travelers, travel style, interests, transportation preference, expense assumptions, and optional accommodation. Resolve every requirement card before Generate is enabled.

**Input → output.** 1–31 inclusive days, supported currency, positive budget, party/traveler count, preferences → normalized generation request.

**Frontend → API → backend → database.** TravelerDashboard form → itinerary API contract → itinerary controller/schema → generation services and persistence.

**Validation, permission, ug error handling.** Dates, destination identity, currency precision, budget, party-size rules, stay selection, request size, and authenticated ownership are validated on both client and server.

**Limitasyon.** Input quality affects recommendation quality. Preferences guide recommendations but do not guarantee opening hours, access, or exact prices.

**Possible panel question:** Why validate on frontend and backend?  
**Suggested answer:** Frontend validation gives quick feedback, while backend validation is authoritative because a client request can be changed outside the browser.

**Source:** frontend `components/features/traveler/TravelerDashboard.tsx:1011-1031,1210-1292`; backend `src/controllers/itinerary-controller.ts`, `src/schemas/itinerary/`.

### 5. AI itinerary generation, regeneration, ug day replan — **IMPLEMENTED; requires configured AI/place providers**

**Purpose ug access.** Creates a personalized schedule from verified place candidates and the traveler’s constraints.

**Actual workflow.** Generate reserves one allowance, loads place evidence, asks the configured AI to arrange verified place IDs, validates/repairs the response, computes advisory data, saves the trip, then commits the allowance. Regeneration updates a saved trip/version; Replan My Day creates a preview that the user accepts separately.

**Input → output.** Normalized trip request + verified catalog + weather/context → dated itinerary days, activities, estimates, sources, and saved trip/version.

**Frontend → API → backend → database.** Generate button → `/api/itinerary` and `/api/plan` → controller → place discovery + AI provider + schema/grounding + expense services → ItineraryGeneration, Trip, ItineraryVersion.

**Validation, permission, ug error handling.** Idempotency key, allowance reservation, one active request, rate limit, 45-second provider timeout, bounded retry/repair, strict JSON/schema, exact dates/currency, allowed place IDs, and transaction-based persistence.

**Limitasyon.** AI arranges recommendations; it does not prove live opening hours, accessibility, safety, or availability. Sparse providers may leave a day incomplete.

**Possible panel question:** Why use AI instead of a fixed itinerary?  
**Suggested answer:** AI can arrange the verified place catalog around dates, pace, interests, and group needs. The backend still validates the output, and the traveler can edit or reject it.

**Source:** backend `src/services/ai/provider.ts:50-166`, `src/services/ai/grounded-schedule.ts:46-67`, `src/services/ai/itinerary-generator.ts:7-99`, `src/services/plans/plan-service.ts:70-119`.

### 6. Day-by-day activities, culture focus, details, ug manual editing — **IMPLEMENTED**

**Purpose ug access.** Shows useful daily activities with cultural descriptions and lets users add, edit, remove, and reorder stops.

**Actual workflow.** Open generated or saved itinerary → choose a day → inspect activity details → Add/Edit/Remove/Move → save the activity → Update saved trip or Save changes.

**Input → output.** Activity title, place, time/duration, notes, participants, coordinates and optional explicit cost → updated browser draft, then saved Trip version.

**Frontend → API → backend → database.** ItineraryWorkspace/DailyItineraryCard → update-trip-itinerary platform action → platform service → Trip payload + ItineraryVersion + AuditEvent.

**Validation, permission, ug error handling.** Named places and coordinates are validated; generic allowances remain separate from place activities; changing a place clears stale photo identity; owner check occurs before write.

**Limitasyon.** Manual edits remain a browser draft until explicitly saved. A place without verified coverage can remain without image/map routing.

**Possible panel question:** Can the traveler change AI recommendations?  
**Suggested answer:** Yes. The itinerary is editable. Manual edits do not consume an AI generation, but the user must save the changed trip so it persists.

**Source:** frontend `components/features/traveler/ItineraryWorkspace.tsx`, `DailyItineraryCard.tsx`, `ActivityDetails.tsx`; backend `src/services/platform/platform-service.ts:472-480`; tests `tests/activity-photo-lifecycle.test.ts`.

### 7. Accommodation suggestions — **IMPLEMENTED AS SUGGESTIONS; booking unavailable**

**Purpose ug access.** Suggests nearby stays or allows a manual choice without pretending to complete a reservation.

**Actual workflow.** Select a destination → browse suggestions or enter a stay manually → choose the stay or Choose later → generate/save the plan.

**Input → output.** Destination coordinates, dates, group and preference → property details, source, optional evidenced photo, and supported estimate state.

**Frontend → API → backend → database.** AccommodationPicker → `/api/accommodations` → accommodation/provider services → response is attached to the itinerary/trip when selected.

**Validation, permission, ug error handling.** Coordinates/country/distance checks, source-type filtering, deduplication, signed quote checks where price confirmation applies, and honest missing-price handling.

**Limitasyon.** TravelMate does not book accommodation. Availability, room rules, and live price must be confirmed with the provider.

**Possible panel question:** Does TravelMate reserve the hotel?  
**Suggested answer:** No. It presents suggestions and may save the user’s selection, but the user must confirm and book through the actual provider.

**Source:** frontend `components/features/traveler/AccommodationPicker.tsx`; backend `src/controllers/accommodation-controller.ts`, `src/services/accommodation/`; tests `tests/accommodation-suggestions-only.test.ts`.

### 8. Activity photos ug saved-trip cover photos — **IMPLEMENTED WITH STRICT FALLBACKS; photos may remain unavailable**

**Purpose ug access.** Displays a relevant, licensed photo for a specific place and avoids sharing one unrelated image across activities.

**Actual workflow.** Use stored verified photo first. For a missing image, resolve exact place identity/coordinates through Wikimedia sources; use an illustrative Unsplash fallback only when allowed and labeled; otherwise show a placeholder.

**Input → output.** Place name, destination, coordinates, provider identity → image URL, creator/license/source attribution, or unavailable state.

**Frontend → API → backend → database.** ActivityPhoto components → photo API/services → Wikidata/Wikipedia/Wikimedia Commons/Unsplash/Google Places fallback rules → permitted metadata saved or displayed.

**Validation, permission, ug error handling.** Exact entity/location match, distance, file type, reusable license, creator/attribution, safe hosts, cache, cooldown, timeout, and no overwrite of unrelated stored photos.

**Limitasyon.** No image is better than an inaccurate or unlicensed image. External rate limits may leave placeholders.

**Possible panel question:** Why can two activities have no photo instead of a generic city photo?  
**Suggested answer:** Because the system prioritizes correctness and licensing. A city-wide or unrelated photo could misrepresent the exact activity.

**Source:** frontend `components/common/ActivityPhoto.tsx`; backend `src/services/itinerary/activity-photo-fallback.ts`; tests `tests/activity-photo-fallback.test.ts`, `tests/destination-cover-photo.test.ts`.

### 9. Automatic saving, saved trips, editing, versions, archive ug delete — **IMPLEMENTED**

**Purpose ug access.** Keeps generated plans recoverable and lets the traveler manage their own trip lifecycle.

**Actual workflow.** Successful generation auto-saves. Saved trips has Active/Completed/Archived filters. View opens a saved itinerary modal/workspace, Edit changes the active plan, Archive hides it, Restore returns it, and Delete permanently removes it after confirmation.

**Input → output.** Trip save/update/lifecycle request → owned Trip summary, version history, audit trail, and refreshed list.

**Frontend → API → backend → database.** SavedTripLifecycle/TravelerDashboard → `/api/platform` → save/update/lifecycle service → Trip, ItineraryVersion, AuditEvent and related records.

**Validation, permission, ug error handling.** Authenticated owner lookup, save-key uniqueness, lifecycle transition rules, payload validation, and transactional writes.

**Limitasyon.** Manual edits are not durable until saved. Completed-trip edits may be saved as a new trip depending on the workflow.

**Possible panel question:** What happens if the browser closes after generation?  
**Suggested answer:** A validated successful generation is persisted server-side before the response is treated as complete. Recent generation recovery also helps reconnect to a result.

**Source:** frontend `TravelerDashboard.tsx:580-612,731-759`, `SavedTripLifecycle.tsx:139-222`; backend `platform-service.ts:350-485`; Prisma `schema.prisma:394-490`.

### 10. Maps, day route, directions ug transportation guidance — **IMPLEMENTED; routing depends on mapped stops/providers**

**Purpose ug access.** Lets travelers inspect saved stops, preview a day route, and open external directions.

**Actual workflow.** Saved trips → View map / Navigate → select day and travel mode → Show day route. Select a stop for Navigate here or open Google Maps. If a place lacks exact mapping, use Choose exact place/Find place.

**Input → output.** Saved coordinates/names, day, mode, optional current/manual origin → markers, route geometry/duration/distance when available, or an explicit non-routable state.

**Frontend → API → backend → database.** SavedTripMapDialog → navigation API → routing/place services → route response; external Google Maps links are built client-side from safe place data.

**Validation, permission, ug error handling.** Owned trip, finite coordinates, encoded names, route-mode validation, abort/timeout/cache, and distinction between straight-line preview and navigable route.

**Limitasyon.** Maps need internet. Missing coordinates or provider failure disables Show day route. Route estimates are not guaranteed traffic conditions or actual fares.

**Possible panel question:** Why is Show day route sometimes disabled?  
**Suggested answer:** It needs enough verified mapped stops. Budget entries or text-only activities are not valid map points, so the UI explains what is missing instead of inventing a route.

**Source:** frontend `components/features/traveler/SavedTripMapDialog.tsx`, `lib/help-guides.ts:45-54`; backend `src/controllers/trip-navigation-controller.ts`, `src/services/navigation/`; tests `tests/saved-trip-navigation.test.ts`.

### 11. Weather and destination context — **IMPLEMENTED; forecast availability varies by date/provider**

**Purpose ug access.** Adds advisory forecast, timezone, currency and transport context to planning.

**Actual workflow.** After selecting destination/dates, TravelMate requests context and forecast. It displays complete, partial, stale or unavailable status with source/freshness labels.

**Input → output.** Coordinates and travel dates → timezone-aware weather/context metadata.

**Frontend → API → backend → database.** Frontend services → `/api/weather` and `/api/destination-context` → Open-Meteo/context services → transient response and saved advisory data where applicable.

**Validation, permission, ug error handling.** Date range, coordinates, timezone, response-shape, freshness, retry-after and provider timeout checks.

**Limitasyon.** Far-future dates may have no forecast. Weather is advice, not a guarantee, and generation can continue when optional weather fails.

**Possible panel question:** What happens if weather API fails?  
**Suggested answer:** The itinerary can still generate. Weather is marked unavailable instead of fabricated, and the user can refresh later.

**Source:** backend `src/controllers/weather-controller.ts`, `src/services/weather/`; tests `tests/activity-weather.test.ts`, `tests/generation-weather-dates.test.ts`.

### 12. Budget estimates, currencies ug Budget Review — **IMPLEMENTED AS PLANNING ESTIMATES**

**Purpose ug access.** Compares the traveler’s budget with known/estimated accommodation, food, transportation, activities, other costs and contingency.

**Actual workflow.** Generate itinerary → open Budget review → inspect category status, allowances, assumptions, remaining or over-budget amount → edit trip budget/assumptions and save changes.

**Input → output.** Budget, currency, days/nights, travelers, units, explicit estimates and selected stay → currency-precise category totals and completeness status.

**Frontend → API → backend → database.** BudgetReview → local review helpers plus saved itinerary expense data → backend expense ledger during generation/save → Trip payload/version.

**Validation, permission, ug error handling.** Supported ISO precision, minor-unit rounding, group vs per-person units, rooms/nights, shared fares counted once, currency matching, and missing amounts marked unavailable/partial rather than zero.

**Limitasyon.** These are not receipts, charges, or guaranteed live prices. Incomplete categories make affordability provisional.

**Possible panel question:** How accurate is the estimated budget?  
**Suggested answer:** It is a planning estimate based on user inputs, explicit provider evidence, and labeled allowances. Missing prices stay missing, so the system does not claim full affordability when coverage is partial.

**Source:** frontend `BudgetReview.tsx:14-78`; backend `src/lib/expense-ledger.ts:1-150`; tests `tests/expense-estimates.test.ts`, `tests/currency.test.ts`.

### 13. Completed trips — **IMPLEMENTED**

**Purpose ug access.** Separates finished travel from active planning while preserving itinerary and selected accommodation.

**Actual workflow.** In Saved trips, click Mark as done → trip moves to Completed with completedAt. Click Mark as not done to return it to Active.

**Input → output.** Owned trip ID + lifecycle action → updated status and completion timestamp.

**Frontend → API → backend → database.** SavedTripLifecycle → platform action `complete-trip`/`reopen-trip` → lifecycle transaction → Trip + AuditEvent.

**Validation, permission, ug error handling.** Owner-only, archived-trip restrictions, idempotent timestamp handling, and status transition rules.

**Limitasyon.** Completion does not automatically create Visited Places records.

**Possible panel question:** Why are Completed Trips and Visited Places separate?  
**Suggested answer:** Completion is the status of the whole planned trip. Visited Places records the exact places the traveler confirms they actually visited; separating them avoids false visit history.

**Source:** frontend `SavedTripLifecycle.tsx:139-198`; backend `platform-service.ts:368-386`.

### 14. Visited Places ug record-from-trip — **IMPLEMENTED**

**Purpose ug access.** Creates a personal record of places actually visited, independently from trip completion.

**Actual workflow.** From a saved trip, choose Record visited places → select named activities → enter actual date → Save. Or open Visited places → Record a visit manually. Search and remove records as needed.

**Input → output.** Place/destination/date or selected trip place keys → deduplicated VisitedPlace records and refreshed Visited places view.

**Frontend → API → backend → database.** RecordTripVisitsDialog/VisitedPlaces → platform actions → recordVisit/recordTripVisits service → VisitedPlace + AuditEvent.

**Validation, permission, ug error handling.** Owner-only trip lookup, named recordable place, today-or-earlier date, stable place key, uniqueness rules, and already-recorded indicators.

**Limitasyon.** A trip may be complete with zero recorded places; recording a place does not complete the trip.

**Possible panel question:** What prevents duplicate visited records?  
**Suggested answer:** The database and service use stable place/date keys and uniqueness checks. The trip dialog also marks existing records so the same selection is not added again.

**Source:** frontend `RecordTripVisitsDialog.tsx:20-75`, `VisitedPlaces.tsx`, `lib/help-guides.ts:57-67`; backend `platform-service.ts:130-250`; Prisma `schema.prisma:431-451`.

### 15. Feedback ug problem reports — **IMPLEMENTED**

**Purpose ug access.** Collects trip ratings/comments and operational problem reports for administrator review.

**Actual workflow.** Open a saved trip → Rate this trip, or open Feedback → Report a problem. Admin opens User Feedback or Reports and reviews/resolves items.

**Input → output.** Owned itinerary rating/comment or bounded report → Feedback/Moderation record and linked notifications.

**Frontend → API → backend → database.** TripFeedbackForm/ReportProblem → feedback/platform API → service/repository → Feedback, Moderation, Notification, AuditEvent.

**Validation, permission, ug error handling.** Traveler ownership, rating/text validation, role separation, stable retry keys, admin-only resolution, and safe public user fields.

**Limitasyon.** Feedback records user opinion; it does not automatically retrain the AI model.

**Possible panel question:** Does feedback train your AI immediately?  
**Suggested answer:** No verified code performs model training. Feedback is stored for review and product improvement; we should not claim automatic training.

**Source:** frontend `TripFeedbackForm.tsx`, `ReportProblem.tsx`; backend `src/controllers/feedback-controller.ts`, `src/services/feedback/`; tests `tests/feedback.test.ts`.

### 16. Traveler and admin notifications — **IMPLEMENTED**

**Purpose ug access.** Shows account, feedback, warning, report, appeal and system-related notices with unread state.

**Actual workflow.** Open Notifications → read an item or mark all read. Admin notifications can link to relevant feedback/report screens.

**Input → output.** Notification query/read action → ordered notifications and unread count.

**Frontend → API → backend → database.** Notification UI → `/api/platform/notifications` or platform action → notification service/repository → Notification rows.

**Validation, permission, ug error handling.** Recipient ownership, admin/traveler role filters, stable categories/links, pagination and read-state update rules.

**Limitasyon.** In-app notifications require the user to open the system; push/SMS delivery is not verified.

**Possible panel question:** How do you prevent one traveler from seeing another’s notification?  
**Suggested answer:** Queries and updates are scoped to the authenticated user ID, and admin views require the admin role.

**Source:** frontend `TravelerNotifications.tsx`, `AdminNotificationsView.tsx`; backend `platform-service.ts:415-455`; Prisma `schema.prisma:339-392`.

### 17. Help / User Guide — **IMPLEMENTED**

**Purpose ug access.** Gives step-by-step help for creating trips, saved trips, maps, visited places, budget and account settings.

**Actual workflow.** Open Help / User Guide → choose a topic → follow steps → use action button to navigate to the related dashboard section.

**Input → output.** Guide selection → static verified instructions and navigation action.

**Frontend → API → backend → database.** HelpUserGuide reads `HELP_GUIDES`; no database write.

**Validation, permission, ug error handling.** Accessible topic controls and explicit destinations.

**Limitasyon.** Static help can become stale when workflows change, so it must be reviewed with releases.

**Possible panel question:** Why include an in-app guide?  
**Suggested answer:** It reduces user confusion for multi-step workflows and supports the usability rubric by helping users locate and complete tasks.

**Source:** frontend `HelpUserGuide.tsx:8-67`, `lib/help-guides.ts:1-92`.

### 18. My Plan, generation quotas ug recovery — **IMPLEMENTED; limits are configurable/provisional**

**Purpose ug access.** Shows monthly AI allowance, used/reserved/remaining counts, and recent generation recovery.

**Actual workflow.** Open My Plan → inspect Free/Plus allowance and progress → check an in-progress operation or reopen a saved result. Generation and AI regeneration consume allowance only after a validated successful result.

**Input → output.** Authenticated user → plan source/status, monthly counts, recent operations, checkout availability.

**Frontend → API → backend → database.** MyPlan → `/api/plan` and operation endpoint → plan service → PlanSubscription, ItineraryGeneration, GenerationTracking.

**Validation, permission, ug error handling.** Row locking, reservation lease, idempotency keys, rate window, transaction commit/release, and ownership.

**Limitasyon.** Defaults Free 3 and Plus 30 are environment-configurable and provisional, not approved commercial terms.

**Possible panel question:** Does opening a saved trip consume AI allowance?  
**Suggested answer:** No. Viewing, manual editing, maps, visited places, budget review and place-coverage retry do not consume it. Successful AI generation/regeneration does.

**Source:** frontend `MyPlan.tsx:38-59`; backend `plan-policy.ts:14-21`, `plan-service.ts:20-119`.

### 19. PayMongo test checkout — **IMPLEMENTED IN TEST MODE ONLY; availability depends on test configuration**

**Purpose ug access.** Demonstrates a verified payment-to-entitlement flow without real money.

**Actual workflow.** From My Plan, create test checkout → PayMongo-hosted test page → return to app → backend verifies the exact session/payment or processes a signed test webhook → activates demo Plus.

**Input → output.** Persistent idempotency key and verified test provider records → paid order and `paymongo_test` subscription source.

**Frontend → API → backend → database.** Upgrade dialog → plan checkout routes → test checkout service → PayMongo test API/webhook → PlanCheckoutOrder, PlanSubscription, AuditEvent.

**Validation, permission, ug error handling.** Test-mode (`livemode=false`) checks, amount/currency/order/user metadata match, provider re-fetch, signature verification, idempotency, ownership and transaction lock.

**Limitasyon.** A success redirect alone does not activate Plus. This is demo access and not live pricing or production billing.

**Possible panel question:** Does a successful redirect prove payment?  
**Suggested answer:** No. The backend must verify the PayMongo test resource and matching amount, currency, order, user and payment intent before activation.

**Source:** backend `src/services/plans/test-checkout-service.ts:20-153`, `src/routes/paymongo-webhook-routes.ts:1-67`, `src/services/plans/paymongo-test-provider.ts`.

### 20. Administration — **IMPLEMENTED**

**Purpose ug access.** Allows verified admins to monitor users, reports, appeals, feedback, notifications, health and account settings.

**Actual workflow.** Admin signs in → admin dashboard → choose Overview, Users, Reports, System Health, Settings, User Feedback or Notifications → perform permitted moderation/access actions.

**Input → output.** Admin filters/actions → scoped summaries, decisions, warnings, user status updates and audit entries.

**Frontend → API → backend → database.** AdminDashboard → `/api/platform?scope=admin`, platform actions and streams → admin services/repositories → User, Moderation, Feedback, Notification, AuditEvent.

**Validation, permission, ug error handling.** Admin role, active account, validated action/payload, no raw secrets, audit logging, and user-facing notification of decisions.

**Limitasyon.** Admin actions must be demonstrated with a safe test account. Production monitoring depth beyond shown configuration/health data is unverified.

**Possible panel question:** Can a traveler call an admin endpoint?  
**Suggested answer:** The backend checks the authenticated role, so hiding the button is not the security boundary. A traveler request is rejected before protected data is read.

**Source:** frontend `components/features/admin/AdminDashboard.tsx:22-237`; backend `src/services/platform/platform-service.ts:481-485`, `src/repositories/admin-overview-repository.ts`.

### 21. Deployment, health checks ug API proxy — **PARTIAL VERIFICATION**

**Purpose ug access.** Provides local/server startup, frontend-to-backend proxying, migrations and health endpoints.

**Actual workflow.** Frontend rewrites `/api/*` to the configured backend. Backend exposes liveness/readiness. Docker/deployment scripts are designed to migrate before replacing the app and roll back an unhealthy release.

**Input → output.** Environment configuration and HTTP request → proxied API response or health status.

**Frontend → API → backend → database.** Next.js rewrite/reverse proxy → Express app → services/database; Docker/CI uses build, migration and health scripts.

**Validation, permission, ug error handling.** Production URL/HTTPS/config validation, CORS trusted origins, same-origin writes, HSTS/security headers, readiness DB check.

**Limitasyon.** Local code and tests were inspected. Actual hosting state, secrets, DNS, and production provider health were not verified in this reviewer run. One Windows Docker deployment test timed out launching Git Bash.

**Possible panel question:** Can you claim deployment is working?  
**Suggested answer:** We can explain the verified deployment configuration and tests, but we should only claim live deployment after checking the actual environment and health endpoint.

**Source:** frontend `next.config.ts`, `proxy.ts`; backend `src/app.ts:24-42`, `src/routes/system-routes.ts`, `docker/`, `.github/workflows/ci.yml`.


### Explicitly unavailable or retired

- **Direct accommodation booking:** unavailable; suggestions only.
- **Live production payment/subscription sale:** unavailable/unverified; current checkout is PayMongo test mode.
- **Guaranteed live prices, hours, traffic or availability:** unavailable by design.
- **Standalone GPS page:** retired; navigation belongs to Saved trips.
- **Trip duplication:** backend explicitly rejects it as no longer available.
- **Offline full operation:** unavailable because core API/database/providers require connectivity.

## 3. End-to-end user journeys

### Journey 1 — New user registration

1. User opens Register and submits valid identity/contact/email/password fields.
2. Frontend performs early validation; backend repeats authoritative validation and rate limiting.
3. Backend creates the traveler and a short-lived hashed verification token, then asks the configured email provider to send the code.
4. User enters the code. Backend checks expiry/attempts and marks email verified.
5. Login validates credentials and returns an HttpOnly signed session cookie. Suspended users go to Appeal; admins go to Admin Dashboard; travelers go to Dashboard.

Behind the scenes: `AuthModal` → `/api/auth` → auth controller/service → User/AccountToken/AuditEvent → session cookie. Google sign-in follows a separate state/nonce/PKCE flow.

### Journey 2 — Create and generate a trip

1. Traveler selects a verified city/town and destination currency.
2. Enters budget, dates, party/travelers, style, interests, transport and expense assumptions; accommodation is optional.
3. UI displays unresolved requirement cards and enables Generate only when ready.
4. Backend reserves one AI allowance under an idempotency key and loads verified place/context data.
5. AI arranges allowed places; backend validates/repairs schema, dates and IDs, calculates estimates and persists result.
6. UI displays the itinerary and Saved trips contains the new record.

### Journey 3 — Open, edit and save

1. Saved trips → View itinerary opens the owned saved plan while preserving return context.
2. User opens a day, edits/adds/removes/reorders activities.
3. The browser marks the plan dirty; manual editing itself uses no AI allowance.
4. User clicks Update saved trip/Save changes.
5. Backend validates ownership/payload and writes the Trip, version snapshot and audit record.

### Journey 4 — Maps and budget

1. Saved trips → View map / Navigate.
2. Choose a day and transport mode. Show day route is available only for mapped stops.
3. Select a stop for external directions; current location is optional.
4. Open Budget review to see category totals, assumptions, completeness and remaining/over-budget amount.
5. Missing routes or prices are described honestly.

### Journey 5 — Complete trip and record visits

1. Mark as done changes Trip status to Completed and stores completion time.
2. Record visited places opens the saved itinerary’s named places.
3. Traveler selects actual places and a today-or-earlier visit date, then saves.
4. App goes/refers to Visited places, where records can be searched or removed.
5. These two operations remain independent to avoid claiming every planned stop was actually visited.

### Journey 6 — AI limit and recovery

1. My Plan shows used, reserved/in-progress and remaining counts.
2. A new generation reserves allowance; validated success charges one.
3. Failure releases it; uncertain interruption remains reserved until safe reconciliation.
4. At zero remaining, generation returns `MONTHLY_AI_LIMIT`, while saved/manual/non-AI functions remain usable.

### Journey 7 — PayMongo test upgrade

1. If test checkout is configured, user creates one persistent order.
2. PayMongo test page handles test payment.
3. Return URL is not trusted as proof. Backend verifies session/payment metadata or receives a signed test webhook.
4. Exact verified paid test order activates `paymongo_test` demo Plus once.

### Journey 8 — Admin workflow

1. Admin session opens Admin Dashboard.
2. Admin reviews overview/users/reports/appeals/health/feedback/notifications.
3. Role-checked actions update status, send warnings or resolve reports/appeals.
4. Notifications and audit events record important outcomes.

## 4. Technology and architecture

### Verified stack

- **Frontend:** Next.js 16.3.8, React 19.2.4, TypeScript, Tailwind/styled components, Radix UI, Leaflet, GSAP and Three (`travelmate-frontend-new/package.json`).
- **Backend:** Node.js 22+, Express 5.2.1, TypeScript 5.9, Zod 4.6, Google auth library and Nodemailer (`travelmate-backend-api/package.json`).
- **Database:** PostgreSQL accessed through Prisma 7.10 and versioned migrations (`prisma/schema.prisma`, `prisma/migrations/`).
- **Boundary:** browser calls `/api`; Next.js rewrite/proxy forwards to the backend; Express routes/controllers/services enforce the contract.
- **Deployment assets:** Docker, Compose/deploy scripts, health checks and GitHub Actions exist. The actual live infrastructure was not authenticated or inspected here.

### Beginner glossary with TravelMate examples

- **Frontend:** screens/buttons/forms in the traveler’s browser, such as the Plan a trip form.
- **Backend:** trusted server code that validates, authorizes, calls providers and saves data.
- **API:** the agreed request/response bridge; `/api/platform` carries saved-trip actions.
- **Database:** durable structured records such as User, Trip and VisitedPlace.
- **Server:** the process running Express and accepting API requests.
- **Endpoint:** a URL + HTTP method for one operation, such as GET `/api/plan`.
- **Middleware:** reusable request checks, such as session, CORS, HTTPS or rate-limit handling.
- **Session:** authenticated login state represented by a signed token.
- **Cookie:** browser storage sent with requests; TravelMate’s session cookie is HttpOnly and SameSite=Lax.
- **Migration:** a versioned database schema change applied before compatible code runs.
- **Environment variable:** server configuration such as provider key or database URL; never print its value.

### Architecture flow

```text
Traveler/Admin browser
        ↓ Next.js pages and React components
        ↓ /api requests through rewrite/proxy
Express middleware → routes → controllers → services
        ↙                         ↘
Prisma → PostgreSQL        AI/place/weather/photo/map/email/payment providers
        ↘                         ↙
        validated API response → React UI
```

## 5. AI and external integrations

### How AI generation works

The grounded scheduler receives traveler dates/group/pace/context and a verified catalog of place IDs. The system prompt requires JSON and forbids invented IDs. Gemini or OpenAI is selected by server configuration. Provider requests have a 45-second timeout. Temporary failures may retry once; invalid output gets one bounded repair attempt. Local validation checks JSON shape, dates, currency, activities, totals and place IDs. Only a usable validated result is persisted and charged.

The AI is responsible for arrangement and descriptive schedule output. Specialized providers are responsible for geographic/place evidence, photos, forecasts, routes, accommodation/travel offers, email identity flow and test payments.

| Integration | Purpose | Verified behavior / limitation |
|---|---|---|
| Gemini / OpenAI | Arrange a verified schedule and repair invalid output | Configured provider only; strict JSON/schema; 45s timeout; bounded retry. No training claim. |
| Open-Meteo | Weather, timezone/geocoding support | Validates coordinates/dates/freshness; unavailable remains unavailable. |
| GeoNames / location catalogues / Nominatim / OpenStreetMap / Overpass | Country-aware destination and mapped place discovery | Exact country/boundary/coordinate checks; fallbacks and rate protection. |
| Wikidata / Wikipedia / Wikimedia Commons | Place evidence and reusable photo metadata | Exact identity/location/license/attribution checks; rate-limit caches. |
| Unsplash | Illustrative fallback imagery | Must be relevant and attributed; not represented as exact when unverified. |
| Google Places photos / Google Maps links | Optional photo evidence and external directions | Safe hosts/attribution; browser link is external navigation. |
| Amadeus / LiteAPI | Provider travel/accommodation data where configured | Malformed/missing currency or availability is excluded; active credentials not assumed. |
| Google OAuth | Sign-in identity | PKCE/state/nonce and verified email; live setup not tested here. |
| Resend / Gmail SMTP | Verification and password-reset emails | Backend only; delivery requires valid provider configuration. |
| PayMongo | Test checkout demonstration | Test mode only; backend re-verification and signed webhook. |

## 6. Database and business rules

| Entity | Meaning |
|---|---|
| User | Account, role, verification/status, profile and session version; parent of owned data. |
| AccountToken / OAuthAccount / RevokedSession / RateLimitBucket | Verification/recovery, Google link, logout revocation and abuse controls. |
| Trip | Owned saved plan, dates, status, payload, summary and completion/archive timestamps. |
| ItineraryVersion | Snapshot labeled saved, regenerated, manual_edit, duplicated or restored. |
| VisitedPlace | Owned actual visit record with stable place/date identity. |
| Feedback / Moderation / Notification | Ratings/comments, reports/appeals and recipient notices. |
| ItineraryGeneration / GenerationTracking | Idempotent AI operation, allowance state, result/error and monthly tracking. |
| PlanSubscription / PlanCheckoutOrder / PlanActivation | Entitlement source/expiry, exact test checkout and auditable activation. |
| AuditEvent | Actor/action/target evidence for security-sensitive and lifecycle operations. |

### Core rules

- A protected record is queried/written with the authenticated user ID; admin actions require role `admin`.
- Save keys, idempotency keys and unique place/date keys make retries safer and reduce duplicates.
- Valid trip duration is 1–31 inclusive days. Nights are calculated separately from stay dates.
- Expense units decide whether an amount multiplies by people, days, nights, rooms or legs. Shared group costs are counted once.
- Currency precision follows the ISO currency rule; not every currency has two decimals.
- Missing price is unavailable/partial, never automatically zero.
- A successful validated generation charges one allowance; failed operations release/reconcile without charge.
- Payment activation requires backend-verified PayMongo test resources. Repeated webhook/verify calls are idempotent.

### Worked example

Suppose four friends have a three-day trip, two nights, a shared airport fare of PHP 1,200, a per-person activity of PHP 300 and a room-night estimate of PHP 2,000 for two rooms:

- Shared fare: PHP 1,200 × 1 = PHP 1,200.
- Activity: PHP 300 × 4 participants = PHP 1,200.
- Stay: PHP 2,000 × 2 rooms × 2 nights = PHP 8,000.
- Known subtotal = PHP 10,400, before other evidenced items/allowances.

If food has no supported amount, the system should say food estimate unavailable/partial. It must not claim total trip cost is exactly PHP 10,400 or that food is free.

## 7. Security and privacy

- **Passwords/account access:** strong password rules, password derivation helper, email verification, reset tokens, session expiry/version and per-session logout revocation.
- **OAuth:** state, nonce, PKCE, sealed HttpOnly flow cookie, verified email and identity token checks.
- **Input validation:** frontend guidance plus authoritative backend schemas, bounded strings, dates, IDs, coordinates and currency precision.
- **Authorization:** current user and role are reloaded from the database; owner filters protect trips/visits/feedback/plans.
- **Rate/abuse controls:** stored rate buckets, auth/provider limits, monthly generation allowance, operation reservation and idempotency.
- **Web security:** HTTPS enforcement in production, trusted-origin CORS, same-origin writes, security headers, API no-cache and request/error handling.
- **Payment:** raw webhook body, HMAC/timing-safe signature check, test-mode-only resource validation and server-side re-fetch.
- **Secrets/privacy:** keys stay in backend environment; error diagnostics name missing variables without printing values; public responses avoid passwords/tokens.

Known gaps/unverified items: a full production penetration test, production secret rotation process, retention/deletion policy review, live provider security configuration and real deployment controls were not verified in this task.

## 8. Defense questions and answers

### 1. [General] What is TravelMate?

TravelMate is an AI-assisted travel recommendation and itinerary management system. It helps a traveler define a trip, receive a grounded day-by-day plan, edit it, save it, review estimates, use maps, and record completed travel.

### 2. [General] What problem does it solve?

Manual planning requires searching many sites and arranging places, dates, budget, weather, routes and group needs. TravelMate brings those tasks into one guided workflow while showing uncertainty.

### 3. [General] Who are the verified users?

The code has two roles: traveler and admin. Travelers plan and manage their own trips; admins handle monitoring, users, reports, appeals, feedback and notifications.

### 4. [General] Why is it a recommendation system?

It suggests and arranges options. The traveler still decides the destination, dates, budget, activities, accommodation and whether to save or follow a recommendation.

### 5. [General] What is outside the scope?

TravelMate does not guarantee live prices, opening hours, safety, accessibility, weather or availability, and it does not complete accommodation booking. PayMongo is test mode only.

### 6. [General] What is the main workflow?

Define → Generate → Understand → Refine → Save → Reopen. This matches the UI and persistence behavior.

### 7. [Features] Does TravelMate automatically save generated plans?

Yes, a validated successful generation is persisted. Manual changes require Update saved trip or Save changes.

### 8. [Features] Why can a day show fewer activities?

Verified place coverage, schedule feasibility, arrival/departure buffers, pace, distance or provider failure may prevent safe placement. The system should show an incomplete state rather than inventing stops.

### 9. [Features] Can users add their own activity?

Yes. They can add or edit an activity in the itinerary workspace, then explicitly save the updated trip.

### 10. [Features] Are accommodation results bookings?

No. They are suggestions or saved choices. The user confirms availability and books with the provider.

### 11. [Features] Why are some photos missing?

The photo pipeline requires exact place/location and reusable licensing evidence. When evidence is weak or providers fail, a placeholder is safer.

### 12. [Features] What is the difference between Mark as done and Record visited places?

Mark as done changes the whole Trip status. Record visited places adds only the specific places the traveler confirms they visited.

### 13. [Features] What does Budget Review show?

It shows category estimates, allowance assumptions, completeness, remaining budget or amount over budget. It does not show actual spending unless a user explicitly records an estimate/input supported by the workflow.

### 14. [Features] Can a user reopen a completed trip?

Yes. Mark as not done returns it to Active. Archived trips must be restored before completion changes.

### 15. [Features] What happens when a saved trip is opened?

The app loads the owned saved payload and opens its itinerary view/modal while retaining a route back to Saved trips.

### 16. [Architecture] What is the frontend?

The browser interface is built with Next.js and React. It renders routes/components, manages interaction state, validates early and calls `/api` endpoints.

### 17. [Architecture] What is the backend?

An Express TypeScript service that exposes API routes, enforces authorization and validation, calls providers, applies business rules and persists data.

### 18. [Architecture] What is an API endpoint?

It is a server URL and method for a specific operation. Example: `/api/plan` returns the authenticated traveler’s allowance.

### 19. [Architecture] What is middleware?

Code that runs around requests. TravelMate uses it for sessions, rate limits, HTTPS, CORS, security headers, same-origin writes, logs and errors.

### 20. [Architecture] Why use Prisma?

Prisma maps TypeScript operations to PostgreSQL tables, enforces schema relations/uniqueness and supports transactions and migrations.

### 21. [Architecture] What is a migration?

A versioned database-structure change. Deployment applies migrations so the database matches the code before serving the new release.

### 22. [Architecture] What is a session cookie?

An HttpOnly cookie containing a signed session token. The server verifies it and reloads the current user/role before protected work.

### 23. [Architecture] How does data flow when generating?

Form → frontend request → itinerary controller → plan reservation → place providers → AI schedule → validation/expense logic → database transaction → API response → itinerary UI.

### 24. [Database] How is ownership enforced?

Backend queries include the authenticated user ID for trips, visits, feedback and plan operations. Role checks protect admin data.

### 25. [Database] How are duplicate trips or visits reduced?

Trips have a per-user save key, generations have per-user idempotency keys, and visited places use stable keys and uniqueness rules.

### 26. [Database] Why store itinerary versions?

Versions preserve saved/regenerated/manual edit history and allow the system to identify how a plan changed.

### 27. [Database] How are days and nights calculated?

Trip days are inclusive from start through end; nights are based on stay dates, so a same-day trip has zero nights.

### 28. [Database] How are shared costs calculated?

Expense units decide whether the amount is per person, shared fare, room-night, group, day or transport leg. Shared/group costs are extended once; per-person costs multiply by participants.

### 29. [Database] What does missing price mean?

Unavailable or partial. It must not become zero or free. Currency mismatch is excluded unless an evidenced exchange quote exists.

### 30. [AI/APIs] What does Gemini receive?

A system instruction, traveler constraints/context and a verified catalog of allowed place IDs. The schedule prompt tells it to return JSON using only those IDs.

### 31. [AI/APIs] What comes from AI versus APIs?

AI arranges the schedule. Location/place facts, photos, weather, routes, accommodation/provider details and exchange evidence come from specialized services/APIs.

### 32. [AI/APIs] How is the AI response checked?

The backend parses strict JSON/schema, validates dates, currency, activities, totals and place IDs, and allows only a bounded repair attempt.

### 33. [AI/APIs] What if AI suggests an incorrect or inaccessible place?

Grounding rejects places outside the verified catalog. Remaining real-world changes must be confirmed by the traveler, who can edit/remove the activity.

### 34. [AI/APIs] What happens when an API fails?

Required generation failures return a retryable/error state and release or reconcile allowance. Optional weather/photo failures show unavailable/placeholder and do not fabricate data.

### 35. [AI/APIs] Does TravelMate train its own model?

No training pipeline was verified. It calls configured external AI providers and validates their output.

### 36. [AI/APIs] Can it work offline?

Only already-loaded browser content may remain visible. Login, generation, saving, maps, providers and database workflows require network access.

### 37. [Budget] Why support different currency precision?

Currencies do not all use two decimals. The ledger uses each currency’s fraction digits so JPY, PHP and three-decimal currencies are not rounded incorrectly.

### 38. [Budget] Does remaining budget prove affordability?

Only when estimate coverage is complete enough. A partial or unavailable category makes the result provisional.

### 39. [Budget] Does TravelMate convert every currency?

No. It accepts supported planning currencies, but it does not invent a rate when provider coverage is missing.

### 40. [Security] How are passwords protected?

The service enforces strong input rules and stores a derived password representation through the repository password helper. Raw passwords are not returned to clients.

### 41. [Security] How are API keys protected?

They are read from backend environment variables and are not sent to the browser. Error handling avoids echoing secrets.

### 42. [Security] How does Google sign-in resist request forgery?

It uses state, nonce, PKCE, a sealed HttpOnly flow cookie, redirect validation and verified Google identity tokens.

### 43. [Security] How is abuse limited?

Auth and provider endpoints use rate limits; generation uses monthly allowance, a rate window, one active reservation, lease reconciliation and idempotency.

### 44. [Security] What privacy data is stored?

Account/profile details, trip plans, visit history, feedback, notifications, plan/payment test metadata and audit events as required by features. Secrets are not part of public responses.

### 45. [Plan/Payment] What consumes one AI generation?

A successfully validated itinerary generation, AI regeneration or accepted day-replan generation operation. Manual edits and reads do not.

### 46. [Plan/Payment] What happens when the limit is reached?

The backend returns `MONTHLY_AI_LIMIT` with current plan data. The user can still open/edit saved trips and use non-AI features.

### 47. [Plan/Payment] What are the default limits?

Development defaults are Free 3 and Plus 30 per calendar month, but environment configuration can change them and they are provisional.

### 48. [Plan/Payment] What if the same webhook arrives twice?

Fulfillment is idempotent: a paid order stays paid, and database/provider IDs prevent a second entitlement from being created.

### 49. [Plan/Payment] Can a test payment replace verified paid access?

No. The service explicitly prevents `paymongo_test` or admin demo access from replacing a verified paid entitlement.

### 50. [Testing] What tests were executed for this reviewer?

On 2026-10-17, frontend unit tests passed 186/186 and backend TypeScript typecheck passed. Backend tests passed 605/606; the only failure was a Windows Git Bash timeout in a Docker deployment test.

### 51. [Testing] What was not runtime-verified?

Live Google OAuth, email delivery, AI/place/weather/photo/map/payment providers, real deployment health and production secrets were not exercised with credentials.

### 52. [Testing] What are practical future improvements?

More provider coverage, clearer incomplete-day recovery, production payment policy if approved, stronger end-to-end provider monitoring, accessibility/usability testing and documented operational runbooks.


## 9. Skill test and debugging practice

These are practice scenarios, not confirmed current defects. Use test accounts/data and never expose credentials or make real payments.

### 1. Activities are empty after generation

- **Possible causes:** Sparse/failed place discovery, invalid destination identity, AI schema rejection, schedule constraints, or quota/provider failure.
- **First file/log to inspect:** Browser Network for `/api/itinerary`; backend structured logs; `src/controllers/itinerary-controller.ts`; `src/services/itinerary/`; `src/services/ai/grounded-schedule.ts`.
- **Safe diagnosis:** If request never leaves browser, inspect form validation. HTTP 4xx suggests input/quota/auth. 5xx/provider event suggests backend/provider. A saved empty payload suggests persistence/data issue.
- **Verify the fix:** Use a known verified city, inspect response/error code, retry provider safely, and verify multiple grounded activities appear and save/reopen unchanged.

### 2. All activities show the same or wrong photo

- **Possible causes:** Reused cache key, loose place match, stale saved photo identity, missing coordinates, or fallback used as exact photo.
- **First file/log to inspect:** Activity photo credit/UI props, backend `activity-photo-fallback.ts`, photo request/rejection logs.
- **Safe diagnosis:** Compare each activity title, provider ID and coordinates. Check whether URL is stored, exact, or labeled illustrative. Provider outage should create placeholder, not a shared wrong image.
- **Verify the fix:** Test two known different landmarks; verify different matched IDs/credits or honest placeholders, then reopen saved trip.

### 3. Google sign-in says temporarily unavailable

- **Possible causes:** Missing/placeholder OAuth variables, redirect mismatch, database/rate-limit failure, provider failure, or invalid callback state.
- **First file/log to inspect:** Backend line `[TravelMate] Google OAuth start/callback failed`; `google-oauth-controller.ts`; configuration variable names only.
- **Safe diagnosis:** No backend start log means frontend/proxy issue. `oauth_not_configured` means config; `state_invalid` means cookie/state; DB event means persistence; Google response means provider/redirect.
- **Verify the fix:** Restart backend after config, open a fresh browser session, complete OAuth, verify correct role redirect and no credential in logs.

### 4. Budget total looks wrong

- **Possible causes:** Wrong unit/quantity/participants, duplicate allowance, stale accommodation, currency mismatch, nights calculation, or missing price treated as zero.
- **First file/log to inspect:** Budget Review breakdown and `src/lib/expense-ledger.ts`; saved itinerary expense evidence.
- **Safe diagnosis:** Recalculate one item in minor units. Separate per-person from group cost. Check same currency and completeness status. Compare browser review to saved/reopened payload.
- **Verify the fix:** Use a small known example and verify category sum, one-time shared costs, nights, rounding and partial/unavailable label.

### 5. Show day route is disabled or route fails

- **Possible causes:** Fewer than required mapped stops, invalid coordinates, text-only activity, routing provider timeout, mode error, or owner/auth issue.
- **First file/log to inspect:** SavedTripMapDialog route-availability message, Network navigation request, navigation controller/service logs.
- **Safe diagnosis:** Markers visible but no request means UI eligibility. 400 means bad selection/mode. 401/403 means auth/ownership. 5xx/timeout means backend/provider.
- **Verify the fix:** Use two verified stops, select mode, show route, check route geometry/duration, then test one unmapped stop shows an honest reason.

### 6. Login or verification fails

- **Possible causes:** Wrong password/code, unverified email, expired/exhausted token, rate limit, email provider failure, session version/revocation, or DB outage.
- **First file/log to inspect:** Auth response code/error, `auth-controller.ts`, safe auth/email diagnostic events.
- **Safe diagnosis:** 401 credentials/session; 403 unverified/suspended; 429 cooldown/limit; 502 email provider; 503 DB/config. Never print code/password.
- **Verify the fix:** Register a test user, verify once, login, logout, confirm old session is rejected and new login still works.

### 7. Generation limit is wrong or stuck reserved

- **Possible causes:** Expired lease not reconciled, duplicate idempotency key, unfinished request, wrong allowance period/subscription, or provider uncertainty.
- **First file/log to inspect:** My Plan recent operations, `/api/plan`, `plan-service.ts`, ItineraryGeneration rows in an isolated test DB.
- **Safe diagnosis:** Used means charged success; reserved/processing means active lease; failed/reconciled should not charge. Compare allowance period and user ownership.
- **Verify the fix:** Read plan to trigger reconciliation, recover operation by key, then verify failed request releases allowance and success charges once.

### 8. Saved changes disappear or modal does not return

- **Possible causes:** Only browser draft changed, save request failed, stale trip ID, unsaved-dialog navigation, refresh failure, or ownership conflict.
- **First file/log to inspect:** Network `update-trip-itinerary`, TravelerDashboard message, `platform-service.ts`, Trip/ItineraryVersion in test DB.
- **Safe diagnosis:** If no POST, UI save handler/navigation. 4xx validation/ownership. 5xx persistence. 200 but stale UI means frontend refresh/state.
- **Verify the fix:** Edit one activity, save, return to Saved trips, reopen and confirm exact edit/version; refresh browser and confirm persistence.

### 9. Record visited places fails or does not appear

- **Possible causes:** No named recordable activities, future date, duplicate stable key, non-owned trip, stale list, or database constraint.
- **First file/log to inspect:** RecordTripVisitsDialog error, platform request/response, `recordTripVisits`, VisitedPlace uniqueness.
- **Safe diagnosis:** Disabled/empty selection is frontend/data. 400 is date/place validation. 403/404 ownership. 409/duplicate should show already recorded. 5xx database.
- **Verify the fix:** Save one selected place with today/past date, navigate to Visited places, search it, retry and confirm no duplicate.

### 10. PayMongo test return says success but Plus is inactive

- **Possible causes:** Return URL arrived before verification, config disabled, session/payment mismatch, pending/failed payment, invalid webhook signature, or provider outage.
- **First file/log to inspect:** My Plan checkout status, backend checkout/webhook logs, test-checkout-service. Never use live keys or real payment.
- **Safe diagnosis:** Redirect is client evidence only. Query/verify the exact order. Compare `livemode=false`, amount, currency, order/user metadata and payment intent. 401 webhook means signature.
- **Verify the fix:** Use PayMongo test resource, verify backend marks one order paid and one demo subscription; repeat webhook/verify and confirm no duplicate activation.

### 11. Wrong destination with same city name

- **Possible causes:** Search lost country scope, ambiguous legacy name, bad coordinates, stale selected identity, or provider result outside boundary.
- **First file/log to inspect:** DestinationSelector selection object, `/api/locations` response, location catalogue/geocoder logs.
- **Safe diagnosis:** Check country code, parent, provider ID and coordinates together. A name-only record is suspect. Compare chosen identity after save/reopen.
- **Verify the fix:** Search a duplicate city name under two countries; verify selection and saved trip retain the intended country and coordinates.

### 12. Weather shows wrong date or timezone

- **Possible causes:** UTC used instead of destination timezone, DST conversion, unsupported forecast horizon, stale cache, or bad provider payload.
- **First file/log to inspect:** Weather response provenance/timezone, scheduled activity conversion, weather service logs.
- **Safe diagnosis:** Compare destination local date with provider timestamp. Unavailable future data should not become current weather.
- **Verify the fix:** Use a DST-boundary test destination/date and confirm local day mapping; provider failure must display unavailable.


## 10. Team study guide

### Suggested three-member division

- **Member 1:** frontend, traveler journey, itinerary UI, saved-trip navigation, usability/accessibility.
- **Member 2:** backend, database, authentication, ownership, lifecycle, visited places and budget rules.
- **Member 3:** AI/providers, maps, quotas, test payments, testing, deployment limits and future improvements.

This division is for study/demo only. Every member must still learn the shared overview, architecture, data flow, security, limitations and top Q&As.

### Seven-session study sequence

1. Run through the whole traveler journey together.
2. Draw frontend → API → backend → database/provider flows.
3. Each member studies their focus files and writes one truthful contribution story.
4. Practice budget, allowance, ownership and completion/visit rules with examples.
5. Perform ten debugging drills using safe local/test data.
6. Conduct a timed mock defense with interruptions and follow-up questions.
7. Rehearse the 2–3 minute demo and prepare fallback screenshots only for provider outages.

### Short mock defense

**Panel:** Why call TravelMate AI-assisted instead of fully automated?  
**Member 1:** Because the traveler supplies constraints and reviews/edits the result. The UI never treats the recommendation as a compulsory booking.

**Panel:** How do you protect one traveler’s trips?  
**Member 2:** The backend verifies the session and includes the authenticated user ID in trip queries and writes. UI visibility alone is not trusted.

**Panel:** What if Gemini returns an invented place?  
**Member 3:** The grounded scheduler allows only verified catalog IDs and validates the JSON response. Invalid output is repaired once or rejected.

**Panel:** What is your biggest limitation?  
**Any member:** Provider coverage and real-world freshness. We show unavailable/partial states, let the user edit, and recommend confirmation with official providers.

## 11. Group rubric reviewer

### A. Presentation Quality — 15 points

- Slides follow Problem → Solution → Users → Features → Architecture → Demo → Limits/next steps.
- Each member has a coordinated role and can answer outside that role.
- Use readable screenshots/diagrams; never show `.env`, personal records or tiny code.
- Answer the question first, then evidence and limitation.

### B. Functionality — 30 points

Demo one clean path: verified login → generate/reopen prepared trip → day activities/edit → save → map → Budget Review → Mark as done → Record visited place. Explain fallback behavior if a provider is down. Prepare a known saved trip so the demo still proves persistence without spending a new AI generation.

### C. Usability — 25 points

Point out consistent sidebar/navigation, clear labels, requirement cards, status/error messages, explicit unavailable states, responsive layout, help guide, confirmations and accessible modal behavior. Acknowledge dense itinerary screens and propose observed usability testing as an improvement.

## 12. One-page quick review

**Definition:** AI-assisted recommendation + itinerary management; traveler decides.  
**Roles:** traveler, admin.  
**Stack:** Next.js/React → Express/TypeScript → Prisma/PostgreSQL.  
**Flow:** Define → Generate → Validate/Ground → Estimate → Save → Edit/Reopen.  
**Inputs:** verified destination, currency, budget, 1–31 days, party/travelers, preferences, optional stay.  
**AI:** arranges verified place IDs; strict JSON/schema; timeout/retry/repair; no training claim.  
**Save:** generation auto-saves; manual edits need explicit save; versions/audit.  
**Budget:** estimate, ISO precision, unit-aware, missing ≠ zero, partial ≠ affordable proof.  
**Maps:** only verified mapped stops; route/provider may be unavailable.  
**Completion:** trip status. **Visited:** confirmed actual places. Separate.  
**Quota:** successful AI work charges; manual/read actions do not; defaults 3/30 provisional.  
**Payment:** PayMongo test only; redirect ≠ proof; server verifies; idempotent.  
**Security:** HttpOnly signed session, ownership/role, validation, rate limit, OAuth state/nonce/PKCE, webhook signature.  
**Honest limitations:** providers/internet, no booking/live-price guarantee, incomplete coverage, deployment/live credentials unverified.

## 13. Technical glossary

- **Grounding:** limiting AI recommendations to verified place evidence.
- **Schema:** required data shape and rules.
- **ORM:** tool mapping code objects to database queries; Prisma is the ORM.
- **Transaction:** a group of database changes that commits together or rolls back together.
- **Idempotency:** repeating the same request produces one logical result, not duplicates.
- **Authorization:** deciding what an authenticated user may access.
- **Authentication:** proving who the user is.
- **Rate limit:** maximum attempts in a time window.
- **Fallback:** a controlled alternative when the preferred provider is unavailable.
- **Webhook:** provider-to-server event callback.
- **HMAC:** keyed signature used to verify message authenticity.
- **CORS:** browser rule controlling which origins may call the backend.
- **Provenance:** where data came from and when it was retrieved.
- **Partial estimate:** some known costs exist but coverage is incomplete.

## 14. Key source files to study

### Frontend

- `components/features/traveler/TravelerDashboard.tsx`
- `components/features/traveler/ItineraryWorkspace.tsx`
- `components/features/traveler/SavedTripLifecycle.tsx`
- `components/features/traveler/SavedTripMapDialog.tsx`
- `components/features/traveler/RecordTripVisitsDialog.tsx`
- `components/features/traveler/BudgetReview.tsx`
- `components/features/traveler/MyPlan.tsx`
- `components/features/admin/AdminDashboard.tsx`
- `lib/help-guides.ts`, `services/api.service.ts`, `next.config.ts`, `proxy.ts`

### Backend

- `src/app.ts`, `src/routes/index.ts`
- `src/controllers/auth-controller.ts`, `google-oauth-controller.ts`, `itinerary-controller.ts`
- `src/middlewares/auth-middleware.ts`
- `src/services/platform/platform-service.ts`
- `src/services/ai/provider.ts`, `grounded-schedule.ts`, `itinerary-schema.ts`
- `src/services/plans/plan-service.ts`, `test-checkout-service.ts`
- `src/routes/paymongo-webhook-routes.ts`
- `src/lib/expense-ledger.ts`
- `prisma/schema.prisma`

## 15. Common defense mistakes

- Calling TravelMate a booking system or claiming accommodation reservation.
- Saying estimates are exact/live prices or treating missing cost as zero.
- Saying AI creates all place facts/photos/weather/routes.
- Saying feedback automatically trains the model.
- Claiming a redirect proves payment.
- Confusing Completed trips with Visited places.
- Claiming frontend checks alone provide security.
- Exposing credentials or personal records during demo.
- Inventing team contributions, test results or production status.
- Hiding limitations instead of explaining safe fallback and improvement.

## 16. Verification record and unverified details

### Static implementation inspected

Current frontend routes/components/services/config/tests and current backend routes/controllers/services/schemas/Prisma models/migrations/tests were inspected on 2026-10-17. README/baseline files were used only as cross-checks after code inspection.

### Tests actually executed on 2026-10-17

- Frontend unit suite: **186 passed, 0 failed**.
- Backend TypeScript `tsc --noEmit`: **passed**.
- Backend unit suite: **605 passed, 1 failed**. The failure was `Docker deployment applies migrations before replacing the application`; on Windows, spawning `C:/Program Files/Git/bin/bash.exe` timed out after about 30 seconds. It was an environment/process timeout, but it remains a failed test and must not be reported as green.

### Still needs runtime verification

- Live Google OAuth and email delivery with the deployed redirect/sender configuration.
- Live Gemini/OpenAI, place, accommodation, weather, photo, route and exchange-provider behavior/quotas.
- PayMongo test checkout/webhook with current test credentials; never use real payment.
- Production hosting, DNS, reverse proxy, migration execution, database health, secret rotation and observability.
- Actual member names, contributions, panel-approved project title/year/section and approved commercial plan terms.

Source references use paths relative to travelmate-frontend-new/ or travelmate-backend-api/.