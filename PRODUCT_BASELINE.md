# TravelMate implementation baseline

This records the current application behavior and repository constraints. The
original `MASTERPROMPT.md` is missing; this document does not reconstruct unknown
requirements or claim to be that original specification. Explicit owner
instructions take precedence.

TravelMate is an AI-assisted travel planner. Its traveler workflow is Define →
Generate → Understand → Refine → Save → Reopen, supporting 1–31 inclusive days,
PHP/USD/EUR/JPY, and solo/couple/family/friends parties. Budget calculations are
deterministic; itinerary generation may use configured OpenAI or Gemini, and a
clearly labeled local demo fallback only when explicitly enabled. Weather and
calendar-based crowd estimates retain source and freshness labels. Payments and
bookings are not real payment processing.

Successful generation automatically saves a trip. Regeneration updates the
selected trip and records a version. Manual edits remain an unsaved browser draft
until Save changes succeeds. Save failures preserve the generated plan for retry.
Reopening fetches one owned trip. Restoration recovers the version's original
destination, dates, budget, currency, travelers, party, and recorded interests/
geographic context. Legacy versions recover recorded core details and clear
unrecorded geographic details/interests; the UI reports that limitation.
Legacy versions without recorded party details cannot be restored safely and
leave the current trip unchanged.

Email verification gates login. Profile verification and account status are
separate: suspended users may access the appeal flow, and protected operations
validate signed sessions, ownership, roles, and status on the backend.

Before release, run unit tests, backend type checking, frontend lint, API contract
comparison, both production builds, dependency audits, and the production proxy
regressions. In isolated CI, run migrations and the database/browser suites against
the immutable paired backend revision. Verify registration/verification/recovery,
login/logout/Google OAuth, generation/retry, canonical budgets, manual edits,
version recovery, paged saved trips, notifications, and responsive navigation.
Real providers, deployed TLS/CDN, load, and manual accessibility checks require
their corresponding environment; passing mocked tests does not certify them.

New and regenerated itineraries use Balanced behavior and pacing. The Plan a trip
form has no Travel style control; budget, interests, preferred activities, stay
preference, transportation, dates and traveler details remain available. Historical
saved style/pace metadata remains readable without changing existing itinerary
content. Regeneration uses the current Balanced policy. Budgets are spending
limits, and missing prices remain unpriced rather than consuming fixed budget
shares. Hotels remain optional suggestions with no booking action.

Navigation is available through Saved trips → View map / Navigate, including
itinerary markers, day routes, Walking/Cycling/Driving and activity management.
The standalone GPS workspace/sidebar entry is removed. Its old URLs redirect to
Saved trips with guidance, retaining a supplied saved-trip ID/day when valid.
Shared routing services, Leaflet maps and opt-in location utilities remain active.

Active and Completed saved-trip cards provide Record visited places beside map
navigation. The modal reads named places from every saved itinerary day; allowances,
breaks and placeholders are excluded. Users choose unchecked new places and enter
their actual visit date. Atomic owned-trip saves retain available IDs, coordinates,
photos/credits and the source trip, and prevent duplicates against existing visits.
Trip completion and reopening never add or remove visited-place records.

The shared itinerary overview shows actual trip dates, budget, cost confidence,
and all scheduled activities in chronological day cards with responsive grids.
Photos remain fully visible in centered sage frames with source/license credits.
Unknown prices never turn into a claimed zero-cost trip. Recorded day themes,
weather, local-time references, allowances, and source details remain available;
no forecast or theme is invented to match a mockup. Day details return to the same
overview, while the Saved trips back action leaves the trip using existing guards.
Saving/updating, editing, map/navigation, and recording visits retain their handlers.

New place discovery distinguishes physical attractions from whole administrative
areas, portable objects, software/websites, and virtual marketplaces. A verified
coordinate alone is not evidence of a visitable venue. Catalog and generation
policy versions invalidate older cached eligibility results. Saved itineraries
are never regenerated or supplemented merely because their overview is opened.
