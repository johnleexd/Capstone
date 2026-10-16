# TravelMate feature inventory

Prepared 15 October 2026 from the inspected working files. Created before manuscript drafting. Complete means a reachable code path is present, not that live deployment or acceptance has passed. Partial means a coverage/UI/provider boundary remains. Verification is independent.

## TM-F-001 — Landing and navigation
Requirement: TM-FR-001 | Role: Guest / all | Implementation: complete

The public site shall present planning guidance, anchored information sections, FAQ, account entry and legal links.

Workflow: Open the home page. Use the top links or mobile menu to reach features, workflow, budget, product and questions. Use account entry to sign in or register.
Frontend: travelmate-frontend-new/components/features/home/TravelMateLanding.tsx:109 (TravelMateLanding)
Backend: No backend endpoint required.
Database: None; public presentation
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Landing samples are illustrative. Some marketing copy still mentions removed travel-style/comparison controls; see discrepancy D-01.
Related automated file: navigation.test.ts

## TM-F-002 — Interactive Earth controls
Requirement: TM-FR-002 | Role: Guest / all | Implementation: complete

The globe shall support rotation, drag, zoom, pause and reduced-motion handling, with a country selector fallback.

Workflow: Scroll to Discovery. Drag Earth to change the view; use + or − and Pause rotation. Select a country in the dropdown to focus it.
Frontend: travelmate-frontend-new/components/features/home/TravelDiscoverySection.tsx:32 (TravelDiscoverySection); travelmate-frontend-new/components/features/home/DiscoveryGlobeCanvas.tsx:17 (DiscoveryGlobeCanvas)
Backend: No backend endpoint required.
Database: Static geographic assets
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: WebGL or dataset failure shows fallback feedback. Selection focuses Earth; it does not create a trip or open a destination-details panel.
Related automated file: discovery-globe.test.ts

## TM-F-003 — Country hit detection and border identity
Requirement: TM-FR-003 | Role: Guest / all | Implementation: complete

Hover detection shall use actual country geometry and stable geographic codes, including small-area hit targets, and display that country’s border.

Workflow: Move the pointer onto a land area. Observe the border around that geographic record. Move to another area or leave Earth to change or clear it.
Frontend: travelmate-frontend-new/lib/discovery-countries.ts:54 (countryAt); travelmate-frontend-new/lib/discovery-globe.ts:18 (countryBoundaryPositions); travelmate-frontend-new/components/features/home/DiscoveryGlobeCanvas.tsx:81 (setOutline)
Backend: No backend endpoint required.
Database: 265 local geographic records
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Natural Earth geometry has finite resolution. Disputed/non-national areas are data records, not claims of sovereignty. Decorative arcs, dots and rings are absent.
Related automated file: discovery-hover-identity.test.ts

## TM-F-004 — Country destination photo and identity card
Requirement: TM-FR-004 | Role: Guest / all | Implementation: partial

A hover card shall use the same stable code for the destination photograph, English name, available flag and border, and hide on pointer exit.

Workflow: Hover a country; read its compact name-and-flag row below the photo. Hover another country to update all identity elements. Leave the globe to dismiss.
Frontend: travelmate-frontend-new/lib/discovery-country-photos.ts:22 (loadCountryPhoto); travelmate-frontend-new/lib/discovery-country-flags.ts:4 (discoveryCountryFlag); travelmate-frontend-new/components/features/home/DiscoveryGlobeCanvas.tsx:1
Backend: No backend endpoint required.
Database: Local country-photos.v2.json; 500 WebP assets
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: 264/265 geographic areas have verified photos; Bir Tawil is unresolved and receives no unrelated fallback. All 249 ISO entries plus Kosovo are covered. Antarctica and some non-national areas have no national flag.
Related automated file: discovery-photo-quality.test.ts

## TM-F-005 — Image and map credits
Requirement: TM-FR-005 | Role: Guest / all | Implementation: complete

The public footer shall expose image/map source, author, licensing and adaptation credits without a permanent caption under Earth.

Workflow: Scroll to the footer. Expand Image and map credits. Follow the relevant source or license link.
Frontend: travelmate-frontend-new/components/features/home/DiscoveryCredits.tsx:6 (DiscoveryCredits)
Backend: No backend endpoint required.
Database: Public attribution manifests
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Credits describe asset rights, not provider availability or travel recommendations.
Related automated file: discovery-countries.test.ts

## TM-F-006 — Privacy and terms pages
Requirement: TM-FR-006 | Role: Guest / all | Implementation: complete

Public privacy and terms pages shall describe the planning scope and applicable content handling.

Workflow: Open Privacy policy or Terms of use in the footer. Read the notices and follow the cross-link or TravelMate home link.
Frontend: travelmate-frontend-new/app/privacy/page.tsx:1; travelmate-frontend-new/app/terms/page.tsx:1
Backend: No backend endpoint required.
Database: None
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Current privacy text emphasizes Google photos although ordinary production enrichment uses reusable providers; notice reconciliation is recommended (D-02).
Related automated file: No directly named unit test located.

## TM-F-007 — Traveler registration
Requirement: TM-FR-007 | Role: Guest | Implementation: complete

Registration shall validate names, email, optional Philippine mobile number, strong password and confirmation, and create only a traveler account.

Workflow: Choose Create an account. Enter first and last names, email, optional mobile number, password and confirmation. Submit, then proceed to verification only after observing the outcome.
Frontend: travelmate-frontend-new/components/features/home/TravelMateLanding.tsx:46 (register)
Backend: travelmate-backend-api/src/controllers/auth-controller.ts:15 (register); travelmate-backend-api/src/services/auth/auth-service.ts:60 (registerUser); travelmate-backend-api/src/schemas/auth/registration-schema.ts:3 (registrationDetails)
Database: User, AccountToken; email unique; transaction
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Names 2–80 characters combined; password 8–64 with upper/lower/digit/special and no whitespace. Mobile is optional. Email configuration is required; accepted mail is not confirmed inbox delivery.
Related automated file: registration-details.test.ts

## TM-F-008 — Email verification
Requirement: TM-FR-008 | Role: Guest with pending account | Implementation: complete

Verification shall consume a valid account-bound, short-lived code once and permit subsequent password sign-in.

Workflow: Enter the registered email and received eight-character code in the verification view. Submit before expiry. Sign in after the confirmation.
Frontend: travelmate-frontend-new/components/features/home/TravelMateLanding.tsx:328 (verify-email)
Backend: travelmate-backend-api/src/controllers/auth-controller.ts:44 (verify-email); travelmate-backend-api/src/services/auth/auth-service.ts:104 (verifyEmail)
Database: AccountToken, User; single-use transaction
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Eight hexadecimal characters, 5-minute lifetime and 5 attempts. Verification is separate from legacy profileStatus.
Related automated file: account-token.test.ts

## TM-F-009 — Resend verification
Requirement: TM-FR-009 | Role: Guest with pending account | Implementation: complete

Resending shall replace only an eligible account’s verification code, enforce cooldown/limits and report mail failures honestly.

Workflow: Use Resend verification after waiting 60 seconds. Check the displayed result and inbox/spam. Use only the newest accepted code.
Frontend: travelmate-frontend-new/components/features/home/TravelMateLanding.tsx:367 (resend-verification)
Backend: travelmate-backend-api/src/controllers/auth-controller.ts:44 (resend-verification); travelmate-backend-api/src/services/auth/auth-service.ts:176 (reissueVerificationCode)
Database: AccountToken, RateLimitBucket
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Three eligible resends per hour; failed send invalidates that code while retaining cooldown. No automatic switch from Resend to Gmail.
Related automated file: auth-email-configuration.test.ts

## TM-F-010 — Password sign-in and role redirect
Requirement: TM-FR-010 | Role: Guest | Implementation: complete

Password sign-in shall validate credentials and email verification, issue a signed session and route traveler/admin/suspended accounts appropriately.

Workflow: Open Sign in. Enter the registered email and TravelMate password. Submit; proceed to the role-specific workspace or suspension appeal view.
Frontend: travelmate-frontend-new/components/features/home/TravelMateLanding.tsx:48 (login)
Backend: travelmate-backend-api/src/controllers/auth-controller.ts:44 (login); travelmate-backend-api/src/services/auth/auth-service.ts:54 (authenticateUser)
Database: User, AuditEvent, RateLimitBucket
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Wrong credentials return 401; unverified email returns 403. Suspended accounts can sign in for appeals, but ordinary protected APIs reject them.
Related automated file: account-roles.test.ts

## TM-F-011 — Google OAuth
Requirement: TM-FR-011 | Role: Guest / existing account | Implementation: complete

Google sign-in shall validate state, PKCE and verified provider identity before resolving the application account and role.

Workflow: Choose Continue with Google. Complete Google’s own authentication. Return to TravelMate and confirm the expected account/role.
Frontend: travelmate-frontend-new/app/api/auth/oauth/google/route.ts:1; travelmate-frontend-new/app/api/auth/oauth/google/callback/route.ts:1
Backend: travelmate-backend-api/src/controllers/google-oauth-controller.ts:55 (GOOGLE_CALLBACK); travelmate-backend-api/src/services/auth/google-oauth-service.ts:160 (findOrCreateGoogleUser)
Database: User, OAuthAccount; provider identity unique
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Requires provider configuration and authorized redirect origin. Existing verified local accounts require the documented linking-safe behavior; no admin role is granted from public input.
Related automated file: google-oauth-service.test.ts

## TM-F-012 — Authoritative sessions and access control
Requirement: TM-FR-012 | Role: Traveler / administrator | Implementation: complete

Protected API requests shall validate the signed session, expiry, current role, account state, session version and per-session revocation.

Workflow: Sign in before opening a protected workspace. If the session is rejected, return to sign-in. Do not rely on a visible menu to establish permission.
Frontend: travelmate-frontend-new/proxy.ts:4 (proxy); travelmate-frontend-new/services/session.service.ts:1
Backend: travelmate-backend-api/src/middlewares/auth-middleware.ts:53 (currentUser)
Database: User, RevokedSession
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Custom HMAC-SHA256 session format, not a standard JWT refresh-token system. Eight-hour cookie; proxy checks presence only.
Related automated file: security.test.ts

## TM-F-013 — Logout and local cleanup
Requirement: TM-FR-013 | Role: Traveler / administrator / suspended traveler | Implementation: complete

Logout shall clear application/OAuth cookies, attempt individual session revocation and disclose unconfirmed revocation.

Workflow: Use Logout or Sign out. Confirm return to the public site. On a shared device, close private views after local sign-out.
Frontend: travelmate-frontend-new/services/session.service.ts:4 (signOut)
Backend: travelmate-backend-api/src/controllers/auth-controller.ts:44 (logout); travelmate-backend-api/src/middlewares/auth-middleware.ts:70 (revokeRequestSession)
Database: RevokedSession, best-effort AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: If database revocation fails, local cookies clear but server revocation is explicitly unconfirmed. Other logins are not intentionally revoked.
Related automated file: session-service.test.ts

## TM-F-014 — Forgot/reset password
Requirement: TM-FR-014 | Role: Guest with verified active account | Implementation: complete

Recovery shall issue a short-lived reset code, validate the replacement password, consume the token once and invalidate old sessions.

Workflow: Choose Forgot password. Request a code for the verified email. Enter the code and a conforming new password; then sign in again.
Frontend: travelmate-frontend-new/components/features/home/TravelMateLanding.tsx:333 (forgot-password)
Backend: travelmate-backend-api/src/controllers/auth-controller.ts:44 (reset-password); travelmate-backend-api/src/services/auth/auth-service.ts:184 (resetPassword)
Database: AccountToken, User.sessionVersion
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Reset lifetime 15 minutes. Actual email delivery/provider authorization was not tested. Reset is not an in-profile password-change screen.
Related automated file: account-token.test.ts

## TM-F-015 — Suspension appeal access
Requirement: TM-FR-015 | Role: Suspended traveler | Implementation: complete

A suspended traveler shall read account notices/history and submit one pending appeal with a bounded message.

Workflow: Sign in to open Account appeal. Read the account notices. Enter a 10–2000-character appeal, submit once and check its status.
Frontend: travelmate-frontend-new/app/account/appeal/page.tsx:1
Backend: travelmate-backend-api/src/controllers/appeal-controller.ts:1; travelmate-backend-api/src/services/platform/appeal-service.ts:12 (submitAppeal)
Database: Moderation(kind=appeal), Notification, AuditEvent, User lock
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Three attempts/hour; a pending appeal blocks duplicates. Approval/restoration is an administrator decision.
Related automated file: appeal-service.test.ts

## TM-F-016 — Worldwide direct search
Requirement: TM-FR-016 | Role: Traveler | Implementation: complete

Destination search shall return source-backed place identity, country, hierarchy and coordinates without inventing missing source records.

Workflow: In Plan a trip, enter Where do you want to go? Read the parent/country/type of each result. Select the intended locality, or use verified manual resolution.
Frontend: travelmate-frontend-new/components/features/traveler/DestinationSelector.tsx:1
Backend: travelmate-backend-api/src/controllers/locations-controller.ts:12 (GET); travelmate-backend-api/src/services/destination/global-location-search.ts:1; travelmate-backend-api/src/services/destination/global-catalogue.ts:1
Database: Read-only public GeoNames SQLite + compressed index/PSGC files; no Trip until save
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Full imported catalogue records 5,721,309 records/250 source country entries; fallback compressed index is bounded. Coverage is not proof of complete geography.
Related automated file: worldwide-catalogue.test.ts

## TM-F-017 — Country and administrative browsing
Requirement: TM-FR-017 | Role: Traveler | Implementation: complete

The destination browser shall follow recorded parent IDs/types with pagination and preserve an existing confirmation on cancellation.

Workflow: Choose Browse by country. Select a country and available administrative level, use search or Load more, then choose a final city/town. Close or Back to abandon a browsing draft.
Frontend: travelmate-frontend-new/components/features/traveler/DestinationSelector.tsx:1; travelmate-frontend-new/components/features/traveler/DestinationAreaPicker.tsx:1
Backend: travelmate-backend-api/src/services/destination/global-catalogue.ts:84 (searchCatalogue); travelmate-backend-api/src/services/destination/philippine-catalogue.ts:1
Database: Read-only catalogue and PSGC administrative IDs
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Available levels/terminology vary. Philippine independent cities retain official parents; coordinates absent from official data require separate resolution.
Related automated file: philippine-catalogue.test.ts

## TM-F-018 — Manual resolution and clear
Requirement: TM-FR-018 | Role: Traveler | Implementation: complete

Manual destination input shall require verified disambiguation; clearing shall remove confirmation and dependent plan/stay state.

Workflow: Use the manual-resolution action for a missing direct result. Choose among candidates if ambiguous. Clear or delete the input to remove confirmation before selecting another place.
Frontend: travelmate-frontend-new/components/features/traveler/DestinationSelector.tsx:1
Backend: travelmate-backend-api/src/controllers/locations-controller.ts:57 (GET_RESOLVE); travelmate-backend-api/src/services/destination/location-resolution.ts:1
Database: No personal write; bounded source caches
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Country/region/island selections need narrowing before generation. Wrong-country or unresolved coordinates cannot be promoted to confirmed destinations.
Related automated file: manual-destination-resolution.test.ts

## TM-F-019 — Area suggestions and comparison
Requirement: TM-FR-019 | Role: Traveler | Implementation: complete

Area browsing shall expose verified child localities and a limited comparison without implying researched prices.

Workflow: Choose an area that needs a locality. Search its cities/towns and use Help me choose where available. Review up to six candidates, then select deliberately.
Frontend: travelmate-frontend-new/components/features/traveler/DestinationAreaPicker.tsx:1; travelmate-frontend-new/hooks/use-destination-areas.ts:1
Backend: travelmate-backend-api/src/controllers/locations-controller.ts:88 (GET_AREA_COMPARISON); travelmate-backend-api/src/services/destination/area-comparison.ts:1
Database: Public geography/cache only
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: One to six city identifiers; comparison uses entered spending allowance and mapped interest samples, not live tourism popularity or confirmed costs.
Related automated file: destination-areas.test.ts

## TM-F-020 — Starting location and optional geolocation
Requirement: TM-FR-020 | Role: Traveler | Implementation: complete

An origin shall be entered or explicitly obtained through browser location permission, with manual entry after denial/failure.

Workflow: Open the optional starting-location control. Type a place or choose Use my current location. Grant permission only if desired, review the resolved area, or enter it manually.
Frontend: travelmate-frontend-new/hooks/use-starting-location.ts:1; travelmate-frontend-new/components/features/traveler/StartingLocationField.tsx:1
Backend: travelmate-backend-api/src/controllers/locations-controller.ts:35 (GET_CURRENT); travelmate-backend-api/src/services/destination/location-search-service.ts:170 (reverseGeocodeLocation)
Database: User-scoped browser origin preference; no live-position database storage in this flow
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Geolocation requires secure context/permission. Origin selection clears when account changes; it is optional for current generation.
Related automated file: starting-location.test.ts

## TM-F-021 — Currency detection and fallback
Requirement: TM-FR-021 | Role: Traveler | Implementation: complete

Destination country codes shall map to supported planning currency or require an explicit supported fallback.

Workflow: Select a destination. Review the detected destination currency. If unsupported, select a supported planning currency; keep that code through the plan.
Frontend: travelmate-frontend-new/hooks/use-destination-planning.ts:1; travelmate-frontend-new/lib/domain.ts:1
Backend: travelmate-backend-api/src/controllers/destination-context-controller.ts:9 (GET); travelmate-backend-api/src/services/destination/destination-context-service.ts:58 (resolveDestinationContext)
Database: Trip.currency VARCHAR(3) after save
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: 20 supported codes; JPY/KRW/VND use whole units. Fallback is a planning choice, not currency conversion.
Related automated file: destination-context.test.ts

## TM-F-022 — Reference-currency equivalents
Requirement: TM-FR-022 | Role: Traveler | Implementation: complete

Reference conversion shall preserve the trip currency and label source/date/freshness, retry limits and unavailable rates.

Workflow: Choose Show equivalents in. Read the reference rate and its date beside relevant amounts. Keep the original currency as the budget authority.
Frontend: travelmate-frontend-new/hooks/use-exchange-rates.ts:1; travelmate-frontend-new/services/exchange-rate-client.ts:1; travelmate-frontend-new/components/common/ReferenceAmount.tsx:1
Backend: travelmate-backend-api/src/services/currency/exchange-rate-service.ts:49 (getExchangeRate)
Database: In-process bounded cache; browser display preference
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Frankfurter mid-market reference, not card/cash conversion. Same-code rate is 1; wrong pair/invalid rate is rejected; Retry-After is honored.
Related automated file: exchange-rate-service.test.ts

## TM-F-023 — Destination transport guidance
Requirement: TM-FR-023 | Role: Traveler | Implementation: complete

The planner shall label curated destination transport modes as guidance and allow progress when no guidance is available.

Workflow: After selecting a locality, review Transportation options. Choose a relevant mode if known or continue without one. Refresh options only when needed.
Frontend: travelmate-frontend-new/hooks/use-destination-planning.ts:1
Backend: travelmate-backend-api/src/services/destination/destination-context-service.ts:36 (transportFor)
Database: Saved itinerary.preferences.transportation
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Guidance exists for selected country/city patterns. It is not a live timetable, capacity or fare source.
Related automated file: destination-context.test.ts

## TM-F-024 — Destination inspiration carousel
Requirement: TM-FR-024 | Role: Traveler | Implementation: complete

An inspiration selection shall populate its source destination/preferred activity for review before generation.

Workflow: Browse destination spot cards. Choose the planning action for a spot. Review the selected destination, dates and budget before generating.
Frontend: travelmate-frontend-new/components/features/traveler/DestinationSpotCarousel.tsx:1; travelmate-frontend-new/lib/destination-spots.ts:1
Backend: No backend endpoint required.
Database: Static source-backed spot data; trip only on save
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Inspiration is not a booking or a guarantee the attraction fits the final schedule.
Related automated file: No directly named unit test located.

## TM-F-025 — Required trip brief and bounds
Requirement: TM-FR-025 | Role: Traveler | Implementation: complete

Generation shall require a confirmed locality, positive supported-currency group budget, valid party and 1–31 inclusive future/current dates.

Workflow: Open Plan a trip. Confirm destination, dates, Traveling as and whole-party budget. Resolve any field-specific generation message before submitting.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:886 (generationRequirements)
Backend: travelmate-backend-api/src/controllers/itinerary-controller.ts:450 (POST)
Database: Generation record then Trip only after save
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Maximum 20 travelers; solo=1, couple=2, family/friends=2–20. Budget ceiling 1,000,000,000. Server start-day check uses UTC while browser uses local date (D-03).
Related automated file: long-trip-duration.test.ts

## TM-F-026 — Preferences with Balanced generation policy
Requirement: TM-FR-026 | Role: Traveler | Implementation: complete

New/regenerated plans shall use Balanced style/pace while accepting interests, preferred activities, stay preference and transport.

Workflow: Set optional comma-separated interests/activities, stay preference and transportation. Generate after reviewing the brief. Historical style metadata may be displayed on reopened plans.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:139 (preferredActivities)
Backend: travelmate-backend-api/src/services/itinerary/travel-preferences.ts:5 (generationDefaults); travelmate-backend-api/src/controllers/itinerary-controller.ts:756 (preferenceResult)
Database: Trip itinerary.preferences JSON
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: No current travel-style or pace selector; old style values remain readable. Arrays max 20; bounded item lengths.
Related automated file: travel-preferences.test.ts

## TM-F-027 — Optional accommodation suggestions
Requirement: TM-FR-027 | Role: Traveler | Implementation: complete

The current planner shall browse relevant property suggestions without requesting room prices or requiring a stay selection.

Workflow: Browse accommodations after selecting a locality. Inspect name, actual location, photos and amenities where supplied. Select an unpriced stay or choose it later.
Frontend: travelmate-frontend-new/components/features/traveler/AccommodationPicker.tsx:1; travelmate-frontend-new/hooks/use-destination-planning.ts:1
Backend: travelmate-backend-api/src/controllers/accommodations-controller.ts:37 (suggestionsOnly); travelmate-backend-api/src/services/destination/accommodation-places.ts:1
Database: Trip itinerary.plannedAccommodation when saved
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Current UI passes suggestionsOnly. LiteAPI sandbox / Rapid / OSM sources vary; no room reservation. Empty/provider-error stays do not block generation.
Related automated file: accommodation-suggestions-only.test.ts

## TM-F-028 — Manual stay and retained property details
Requirement: TM-FR-028 | Role: Traveler | Implementation: complete

A manual/mapped stay shall persist as an unpriced planning preference and remain recognizable after reopen.

Workflow: Choose manual accommodation entry if the property is missing. Enter its name and location. Save the generated trip and inspect Saved accommodation after reopening.
Frontend: travelmate-frontend-new/components/features/traveler/AccommodationPicker.tsx:1; travelmate-frontend-new/components/features/traveler/SavedAccommodation.tsx:1
Backend: travelmate-backend-api/src/services/destination/planned-accommodation.ts:1
Database: Trip.itinerary plannedAccommodation JSON
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Provider identity/allowed photos can be retained. Selection does not establish availability, rate, star quality or a completed booking.
Related automated file: planned-accommodation.test.ts

## TM-F-029 — Expense assumptions
Requirement: TM-FR-029 | Role: Traveler | Implementation: complete

Explicit room, food, fare, fee and contingency assumptions shall be validated and calculated without invented prices.

Workflow: Expand Budget details. Enter known estimates and their shared/per-person basis. Review the resulting known/estimated/unpriced amounts after generation.
Frontend: travelmate-frontend-new/components/features/traveler/ExpenseAssumptions.tsx:1; travelmate-frontend-new/lib/expense-assumptions.ts:1
Backend: travelmate-backend-api/src/controllers/itinerary-controller.ts:753 (minimumEnteredCosts); travelmate-backend-api/src/services/itinerary/grounded-plan.ts:29 (calculateExpense)
Database: Trip.itinerary grounding/priceEvidence JSON
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Default contingency 10%; permitted 0–50%. Missing costs are excluded from known subtotal, not free. Currency precision applies.
Related automated file: grounded-itineraries.test.ts

## TM-F-030 — Optional pre-trip expenses
Requirement: TM-FR-030 | Role: Traveler | Implementation: complete

Pre-trip user estimates shall be included once as whole-party costs with matching starting location and currency.

Workflow: Choose Add pre-trip expenses. Enter applicable transfers, passport, visa/authorization, travel tax, insurance and other amounts. Review the committed-cost breakdown.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:179 (preTripCosts)
Backend: travelmate-backend-api/src/services/budget/pre-trip-cost-service.ts:45 (normalizePreTripCosts)
Database: Trip.itinerary selectedTravelCosts.preTrip JSON
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: No government fee advice is generated. Amounts are entered estimates; verify actual fees separately.
Related automated file: pre-trip-cost-service.test.ts

## TM-F-031 — Place grounding and geographic validation
Requirement: TM-FR-031 | Role: Traveler | Implementation: complete

The backend shall select physical attractions from supported records and reject invented, wrong-country or unsupported administrative/object entries.

Workflow: Submit a valid brief. Read the returned place sources and geographic context. Confirm any nearby/outside-city transfer and venue details before travel.
Frontend: travelmate-frontend-new/components/features/traveler/GroundingSummary.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/grounded-places.ts:374 (loadGroundedPlaces); travelmate-backend-api/src/services/itinerary/place-boundaries.ts:1; travelmate-backend-api/src/services/itinerary/place-search-policy.ts:1
Database: Source caches; signed evidence saved in Trip JSON
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Wikipedia/Wikidata/OSM references can be incomplete. Max 30 km straight-line is only one filter; membership evidence remains required. Coordinates alone do not prove a venue.
Related automated file: physical-attraction-policy.test.ts

## TM-F-032 — AI structured schedule and repair
Requirement: TM-FR-032 | Role: Traveler | Implementation: complete

AI shall arrange only supplied place IDs/times in batches of at most seven days and pass independent schema, identity, date and transfer checks.

Workflow: Generate the plan and wait for the request outcome. Review source/provider labels, day order and suggested times. Retry an explicitly retryable failure after it settles.
Frontend: travelmate-frontend-new/services/api.service.ts:129 (fetchTripData)
Backend: travelmate-backend-api/src/services/ai/provider.ts:1; travelmate-backend-api/src/services/ai/grounded-schedule.ts:46 (generateGroundedSchedule)
Database: ItineraryGeneration response/status; no AI-authored price fields
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: OpenAI default gpt-4o-mini / Gemini default gemini-3.1-flash-lite are code defaults and can be configured. One invalid-output repair per batch, sequential provider fallback; 45s per adapter call, 540s outer generation signal.
Related automated file: grounded-generation-http.test.ts

## TM-F-033 — Deterministic full-day scheduling
Requirement: TM-FR-033 | Role: Traveler | Implementation: complete

The scheduler shall reconcile catalog-backed visits, travel buffers, meal/free-time blocks and honest incomplete days within usable local-day windows.

Workflow: Review every generated day. Expand day notes for suggested, incomplete, rest or travel status. Check actual routes/hours rather than treating local clocks as reservations.
Frontend: travelmate-frontend-new/components/features/traveler/DayActivityTimeline.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/generated-day-scheduler.ts:43 (completeGroundedSchedule)
Database: Trip.itinerary day scheduleBlocks/planningStatus
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Normal current Balanced cap is three catalog visits/day; no place repetition to fill a long trip. Arrival/departure/rest constraints exist in API but current planner has no input controls (see the API-only constraint inventory entry).
Related automated file: generated-day-scheduler.test.ts

## TM-F-034 — Catalog fallback and incomplete results
Requirement: TM-FR-034 | Role: Traveler | Implementation: complete

When AI fails or references are sparse, the system shall retain catalog-backed suggestions/allowances with explicit incomplete or unavailable disclosures.

Workflow: Read a provider/fallback notice after generation. Inspect incomplete days and known costs. Revise the brief or manually refine rather than assuming missing attractions or prices.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:133 (providerMessage)
Backend: travelmate-backend-api/src/controllers/itinerary-controller.ts:843 (AI scheduling unavailable)
Database: ItineraryGeneration, saved Trip if accepted by save validation
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Catalog fallback is not a guest chatbot. Mock label is possible only with explicit non-production flag; production does not invent replacement venues.
Related automated file: grounded-generation-http.test.ts

## TM-F-035 — Generation idempotency and fencing
Requirement: TM-FR-035 | Role: Traveler | Implementation: complete

Repeated identical generation keys shall replay completed results, reject conflicting input and fence stale concurrent attempts.

Workflow: Wait for a pending generation. Retry the same unchanged brief only after a visible failure settles. Change the brief deliberately when creating a distinct request.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:190 (generationRequestRef)
Backend: travelmate-backend-api/src/controllers/itinerary-controller.ts:537 (beginGeneration)
Database: ItineraryGeneration unique(userId,idempotencyKey), attemptId
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: 8–100-character keys. A pending record under 10 minutes conflicts; failed/stale attempts use compare-and-set fencing. This does not guarantee paid remote computation cancellation.
Related automated file: audit-security-regressions.test.ts

## TM-F-036 — Automatic save after generation
Requirement: TM-FR-036 | Role: Traveler | Implementation: complete

Successful generation shall attempt an owned atomic initial save or regeneration update and preserve a recoverable draft if saving fails.

Workflow: Generate the plan. Read whether it was saved automatically. Open Saved trips to confirm; if auto-save failed, keep the draft and use the available save action.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:521 (It was saved automatically)
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:183 (saveTrip); travelmate-backend-api/src/services/platform/save-idempotency.ts:1
Database: Trip, ItineraryVersion(saved/regenerated), AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Generation success and save success are separate. Save key is generated by saveIdentity; ordinary API calls without one may have different deduplication behavior.
Related automated file: planning-visited.test.ts

## TM-F-037 — Activity photographs and provenance
Requirement: TM-FR-037 | Role: Traveler | Implementation: complete

Activity photos shall retain exact place/source identity, reusable rights and credits, with separately labeled illustrative/destination fallbacks.

Workflow: Open a day or activity. Read photo/source credits. If a photo fails, allow recovery or retry without assuming a different image proves the exact venue.
Frontend: travelmate-frontend-new/components/common/ActivityPhoto.tsx:1; travelmate-frontend-new/components/common/ActivityPhotoCredit.tsx:1; travelmate-frontend-new/services/activity-photo.service.ts:1
Backend: travelmate-backend-api/src/services/itinerary/activity-photo-fallback.ts:1; travelmate-backend-api/src/services/itinerary/saved-activity-photos.ts:1; travelmate-backend-api/src/controllers/activity-photo-controller.ts:1
Database: Trip JSON imageUrl/imageAttribution; optimistic media-only merges
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: No photo upload endpoint. Stored selection → matched Wikimedia/Wikipedia → Unsplash illustration → trip destination → neutral placeholder. Ordinary production flow bypasses Google provider.
Related automated file: activity-photo-lifecycle.test.ts

## TM-F-038 — Date-matched weather
Requirement: TM-FR-038 | Role: Traveler | Implementation: complete

Weather shall distinguish current reference conditions from the dates actually covered by a forecast and disclose missing or stale coverage.

Workflow: Read weather beside a trip/day. Check forecast date and freshness. Treat future dates outside provider coverage as unavailable rather than repeated forecasts.
Frontend: travelmate-frontend-new/lib/conditions.ts:1; travelmate-frontend-new/services/provider-response.ts:1
Backend: travelmate-backend-api/src/controllers/weather-controller.ts:1; travelmate-backend-api/src/services/weather/providers.ts:1; travelmate-backend-api/src/services/weather/weather-domain.ts:51 (weatherForTripDates)
Database: Trip.weather advisory snapshot
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: OpenWeatherMap when configured, then Open-Meteo (14-day request). Thirty-one trip days do not imply 31 forecast days.
Related automated file: weather-service.test.ts

## TM-F-039 — Crowd estimates
Requirement: TM-FR-039 | Role: Traveler | Implementation: complete

Crowd context shall remain an explicitly low-confidence calendar heuristic rather than live congestion data.

Workflow: Read crowd level and its explanatory note. Consider suggested earlier visits, but review the actual venue before changing plans.
Frontend: travelmate-frontend-new/components/features/traveler/DayActivityTimeline.tsx:1
Backend: travelmate-backend-api/src/services/crowd/crowd-service.ts:13 (estimateCrowd)
Database: Saved day advisory metadata
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Weekend and broad Philippines/December heuristics only; no foot-traffic feed or automatic live rerouting.
Related automated file: weather-service.test.ts

## TM-F-040 — Advisory refresh without overwriting edits
Requirement: TM-FR-040 | Role: Traveler | Implementation: complete

Refreshing conditions shall update advisory metadata without regenerating or replacing manual activity content.

Workflow: Choose Refresh conditions. Wait for the result. Verify the activities, notes and edits remain while forecast/crowd metadata changes or reports failure.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:531 (refreshConditions); travelmate-frontend-new/lib/conditions.ts:4 (applyConditionSnapshot)
Backend: travelmate-backend-api/src/controllers/weather-controller.ts:1
Database: Browser draft; persisted snapshot only through supported save path
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: A refresh is not confirmation of unchanged future conditions or automatic rescheduling.
Related automated file: conditions.test.ts

## TM-F-041 — Saved-trip list and pagination
Requirement: TM-FR-041 | Role: Traveler | Implementation: complete

Saved trips shall show owned summary cards with status/source/cost context and load further pages without exposing other accounts.

Workflow: Open Saved trips. Use status filters and inspect a card. Load more when offered; open only the intended plan.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripLifecycle.tsx:1
Backend: travelmate-backend-api/src/controllers/platform-controller.ts:24 (GET); travelmate-backend-api/src/repositories/trip-workspace-repository.ts:25 (readTripPage)
Database: Trip; pages of 20 summary records
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Summary responses omit full itinerary/weather. Internal tab key bookings means Saved trips, not an active booking feature.
Related automated file: trip-workspace.test.ts

## TM-F-042 — Reopen, day navigation and return
Requirement: TM-FR-042 | Role: Traveler | Implementation: complete

Reopening and navigating days shall preserve the selected trip/draft and never silently regenerate missing saved content.

Workflow: Choose View itinerary. Open View day itinerary, then Back to itinerary. Use Back to saved trips from the overview; native Back/Forward should retain the same trip context.
Frontend: travelmate-frontend-new/hooks/use-itinerary-navigation.ts:1; travelmate-frontend-new/components/features/traveler/ItineraryWorkspace.tsx:1
Backend: travelmate-backend-api/src/repositories/trip-workspace-repository.ts:47 (readTripDetails)
Database: Read owned Trip and optional version metadata
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Opening a sparse day does not repair/populate it. Legacy URL/history normalization is separate from AI generation.
Related automated file: navigation.test.ts

## TM-F-043 — Activity editing
Requirement: TM-FR-043 | Role: Traveler | Implementation: complete

The editor shall permit bounded title, time, description, location, category and estimated-cost edits, recalculating totals as user estimates.

Workflow: Open an active itinerary’s Edit activity action. Enter the intended fields. Save the dialog, review changed totals and use Update/Save changes to persist the draft.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerItineraryDialogs.tsx:1; travelmate-frontend-new/lib/itinerary-editor.ts:1
Backend: travelmate-backend-api/src/services/itinerary/itinerary-edit-service.ts:92 (applyManualItineraryChanges)
Database: Trip JSON + manual_edit version on persisted save
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Venue identity changes clear stale place/photo evidence. Unsupported changed price claims become estimates; server-owned management history cannot be forged.
Related automated file: itinerary-edit-service.test.ts

## TM-F-044 — Add, remove and reorder activities
Requirement: TM-FR-044 | Role: Traveler | Implementation: complete

Draft activity changes shall preserve chronological day identity and existing evidence where appropriate, with explicit removal confirmation.

Workflow: Use Add activity or a day’s edit controls. Reorder with the available controls or confirm removal. Inspect all affected days and save the changes deliberately.
Frontend: travelmate-frontend-new/lib/itinerary-editor.ts:1; travelmate-frontend-new/components/features/traveler/ItineraryWorkspace.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/itinerary-edit-service.ts:1
Database: Trip JSON on save; versions preserve earlier snapshot
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: At most eight saved activities/day in relevant validation. Completed/skipped management records are protected against silent removal.
Related automated file: itinerary-editor.test.ts

## TM-F-045 — Save manual changes and recover drafts
Requirement: TM-FR-045 | Role: Traveler | Implementation: complete

Manual edits shall remain a browser draft until saved, with owner-scoped recovery and guards against unintended navigation loss.

Workflow: Use Update/Save changes after reviewing edits. If a leave/recovery dialog appears, choose deliberately to save, keep/discard or restore the draft. Retry a failed save without navigating away.
Frontend: travelmate-frontend-new/lib/itinerary-draft.ts:1; travelmate-frontend-new/components/features/traveler/RestoreDraftDialog.tsx:1; travelmate-frontend-new/components/features/traveler/UnsavedTripDialog.tsx:1
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:287 (updateTripItinerary)
Database: Trip, ItineraryVersion(manual_edit), AuditEvent; user-scoped localStorage
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Browser storage may be blocked/full. A browser draft is not a server backup; invalid/wrong-owner drafts are rejected.
Related automated file: saved-trip-consistency.test.ts

## TM-F-046 — Regenerate existing trip
Requirement: TM-FR-046 | Role: Traveler | Implementation: complete

Regeneration shall require deliberate input review and produce a version of the same active trip only after valid generation/save.

Workflow: Open an active trip’s regeneration/planning settings. Review its restored brief; move passed dates forward as prompted. Generate deliberately and confirm the saved result/version.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:159 (regenerationTargetId)
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:243 (updateTrip)
Database: Trip, ItineraryVersion(regenerated), AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Current Balanced defaults apply to regenerated plans. Failed generation/save must leave the saved plan available; no automatic regeneration on open.
Related automated file: date.test.ts

## TM-F-047 — Version history and whole-version restoration
Requirement: TM-FR-047 | Role: Traveler | Implementation: complete

Version restoration shall atomically recover the selected owned snapshot and its matching original trip context as a new version.

Workflow: Expand a saved trip’s History. Load more metadata if necessary and choose a version. Review and confirm Restore only for an active/reopened trip.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripLifecycle.tsx:41 (versionLabels)
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:348 (restoreItineraryVersion); travelmate-backend-api/src/services/itinerary/version-snapshot.ts:1
Database: ItineraryVersion unique(tripId,version), row lock, Trip update
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: 50 metadata records/page. Legacy versions can lack party/context and fail safely; unrecorded context is not guessed.
Related automated file: stored-photo-preservation.test.ts

## TM-F-048 — Archive and restore trip
Requirement: TM-FR-048 | Role: Traveler | Implementation: complete

Archiving shall retain the trip and its prior completion state; restoring shall return it to active/completed accordingly.

Workflow: Use a card’s More options → Archive. Inspect Archived trips. Restore when needed before editing or recording a batch of visits.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripLifecycle.tsx:1
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:327 (setTripLifecycleStatus)
Database: Trip.status, archivedAt, completedAt; AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Archived trips cannot be directly completed/reopened; restore first. Archiving is distinct from permanent deletion.
Related automated file: trip-completion.test.ts

## TM-F-049 — Complete and reopen trip
Requirement: TM-FR-049 | Role: Traveler | Implementation: complete

Trip completion/reopening shall update lifecycle state only and shall not automatically create/remove visit history.

Workflow: Choose Mark completed for a finished plan. Use Reopen to make changes again. Record actual visited places separately.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripLifecycle.tsx:1
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:327 (setTripLifecycleStatus)
Database: Trip.status/completedAt; AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Completion does not prove attendance. Completed itineraries remain readable but editing/management requires reopen.
Related automated file: trip-completion.test.ts

## TM-F-050 — Delete owned trip
Requirement: TM-FR-050 | Role: Traveler | Implementation: complete

Deletion shall require deliberate confirmation, delete the owned trip/version records and preserve detached visit/feedback history according to foreign keys.

Workflow: Open More options → Delete. Read the confirmation. Confirm only when permanent removal is intended; cancel to retain the trip.
Frontend: travelmate-frontend-new/components/features/traveler/DeleteTripDialog.tsx:1
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:309 (deleteTrip)
Database: Trip delete; ItineraryVersion cascade; VisitedPlace.tripId and Feedback.itineraryId SetNull; AuditEvent retained
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: No normal UI undelete is implemented. Documentation task did not execute deletion.
Related automated file: trip-workspace.test.ts

## TM-F-051 — Saved cover photos and stay details
Requirement: TM-FR-051 | Role: Traveler | Implementation: complete

Saved cards shall preserve relevant destination cover/photo attribution and any selected unpriced stay without altering itinerary content.

Workflow: Inspect the Saved trip card cover and selected accommodation. Open its source credits or details. If media is unavailable, retain the plan and its identity.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripCoverPhoto.tsx:1; travelmate-frontend-new/lib/saved-trip-photo-selection.ts:1; travelmate-frontend-new/components/features/traveler/SavedAccommodation.tsx:1
Backend: travelmate-backend-api/src/services/destination/destination-cover-photo.ts:1; travelmate-backend-api/src/controllers/destination-context-controller.ts:45 (GET_PHOTO)
Database: Stored Trip media and destination lookup cache
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Cover selection is not attraction verification. Unsplash selection tracking is separate and must not run on every render.
Related automated file: destination-cover-photo.test.ts

## TM-F-052 — Manual visited-place recording
Requirement: TM-FR-052 | Role: Traveler | Implementation: complete

A traveler shall explicitly record a named place and past/present actual visit date under their own account.

Workflow: Open Visited places. Add a place name, destination and actual visit date. Save and inspect the personal history.
Frontend: travelmate-frontend-new/components/features/traveler/VisitedPlaces.tsx:1
Backend: travelmate-backend-api/src/services/platform/visited-place-service.ts:89 (recordVisit)
Database: VisitedPlace unique(userId,placeKey,visitDate)
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Future visit dates are rejected using the supplied valid timezone. Manual records are not automatically geographically verified.
Related automated file: planning-visited.test.ts

## TM-F-053 — Record places from a saved trip
Requirement: TM-FR-053 | Role: Traveler | Implementation: complete

The batch visit modal shall list actual saved place candidates across days, prevent stale/duplicate selections and save selected actual visits atomically.

Workflow: On an active/completed trip choose Record visited places. Select actual places and an actual visit date, then confirm. Reopen to inspect Already recorded states.
Frontend: travelmate-frontend-new/components/features/traveler/RecordTripVisitsDialog.tsx:1
Backend: travelmate-backend-api/src/services/platform/trip-visit-candidates.ts:23 (buildTripVisitCandidates); travelmate-backend-api/src/services/platform/visited-place-service.ts:66 (recordTripVisits)
Database: VisitedPlace, owned Trip; advisory lock and transaction
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Allowances/rest/placeholders excluded. Archived trip requires restore. Batch duplicate prevention is stronger than the date-specific database unique key.
Related automated file: trip-visit-candidates.test.ts

## TM-F-054 — Visited history search and removal
Requirement: TM-FR-054 | Role: Traveler | Implementation: complete

Visit history shall be owner-scoped, searchable, date-ordered and paginated, with explicit individual removal.

Workflow: Open Visited places. Search a place/destination, load more if offered, inspect retained media and remove a record only if intended.
Frontend: travelmate-frontend-new/components/features/traveler/VisitedPlaces.tsx:1
Backend: travelmate-backend-api/src/services/platform/visited-place-service.ts:141 (readVisitedPlaces); travelmate-backend-api/src/services/platform/visited-place-service.ts:135 (removeVisit)
Database: VisitedPlace; 20 records/page
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Deleting a trip leaves its visited records detached. Removing a visit does not remove the saved itinerary.
Related automated file: trip-visit-candidates.test.ts

## TM-F-055 — Itinerary feedback and updates
Requirement: TM-FR-055 | Role: Traveler | Implementation: complete

Feedback shall bind one 1–5 rating, supported category and 10–2000-character comment to an owned saved trip, updating the same record on resubmission.

Workflow: Choose Rate trip or Feedback and support. Select the intended saved itinerary, rating/category and comment. Submit; reopen to edit existing feedback.
Frontend: travelmate-frontend-new/components/features/traveler/TripFeedbackForm.tsx:1
Backend: travelmate-backend-api/src/controllers/feedback-controller.ts:22 (POST); travelmate-backend-api/src/services/platform/feedback-service.ts:60 (submitFeedback)
Database: Feedback unique(userId,itineraryId), Notification, AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Category budget_accuracy/weather_info/ai_cohesion/route_efficiency. Sentiment remains not_analyzed; no sentiment AI is implemented.
Related automated file: feedback.test.ts

## TM-F-056 — Traveler problem reports
Requirement: TM-FR-056 | Role: Traveler | Implementation: complete

Travelers shall submit bounded problem reports for administrator review and receive resolution notices.

Workflow: Open Feedback and support or the account report form. Enter a 5–120-character subject and 10–2000-character details. Submit and monitor notifications.
Frontend: travelmate-frontend-new/components/features/traveler/ReportProblem.tsx:1
Backend: travelmate-backend-api/src/services/platform/report-service.ts:15 (submitReport)
Database: Moderation(kind=report), Notification, AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Reports are not an itinerary chat command or a guarantee of support response time.
Related automated file: report-service.test.ts

## TM-F-057 — Traveler notifications
Requirement: TM-FR-057 | Role: Traveler | Implementation: complete

The traveler notification view shall display owned notices and permit marking one/all read without changing another recipient’s data.

Workflow: Open the bell or Notifications. Read a notice and follow its available destination. Mark a notice or all notices read as intended.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerNotifications.tsx:1
Backend: travelmate-backend-api/src/controllers/platform-controller.ts:83 (GET_NOTIFICATIONS); travelmate-backend-api/src/services/platform/platform-service.ts:386 (readNotification)
Database: Notification.userId/readAt; latest 50
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Traveler updates use request/polling behavior; administrator live SSE is a distinct feature. Notices are not push/email delivery guarantees.
Related automated file: admin-notifications.test.ts

## TM-F-058 — Traveler profile and contact settings
Requirement: TM-FR-058 | Role: Traveler | Implementation: complete

Profile editing shall persist only allowed name/contact/avatar/bio fields and preserve account role/email/security state.

Workflow: Open Your account. Edit name, contact number, HTTPS photo URL or Travel profile. Choose Save profile and inspect the result.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerAccountCenter.tsx:1
Backend: travelmate-backend-api/src/controllers/profile-controller.ts:27 (PATCH); travelmate-backend-api/src/services/profile/profile-service.ts:17 (validateProfileUpdate)
Database: User, AuditEvent transaction
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Name 2–80, phone ≤30, bio ≤500, avatar HTTPS ≤2048. Email is read-only; unknown protected keys do not become writable.
Related automated file: profile-service.test.ts

## TM-F-059 — Owned saved-trip map and timeline
Requirement: TM-FR-059 | Role: Traveler | Implementation: complete

The saved-trip map shall derive days/stops from the selected owned itinerary and separate daily allowances from visit stops.

Workflow: Choose View map / Navigate on a saved trip. Select the saved day and timeline activity. Read exact/ambiguous/unavailable location states.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripMapDialog.tsx:1; travelmate-frontend-new/components/features/traveler/TripDayMapCanvas.tsx:1
Backend: travelmate-backend-api/src/controllers/trip-navigation-controller.ts:26 (GET_TRIP_MAP); travelmate-backend-api/src/services/navigation/trip-map-service.ts:153 (loadTripMapManifest)
Database: Owned Trip read; client per-trip caches
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Opening a map does not complete an activity or record a visit. Skipped activities remain visible but are excluded from relevant routing.
Related automated file: trip-navigation.test.ts

## TM-F-060 — Exact map-place resolution and photos
Requirement: TM-FR-060 | Role: Traveler | Implementation: complete

An uncertain activity shall require an exact source-matched candidate before navigation, without silently promoting a vague name.

Workflow: Select an unresolved stop. Search/choose an exact place candidate and inspect its location and photo/source details. Continue only after confirming the intended venue.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripMapDialog.tsx:1; travelmate-frontend-new/services/trip-navigation.service.ts:1
Backend: travelmate-backend-api/src/controllers/trip-navigation-controller.ts:32 (POST_TRIP_ACTIVITY); travelmate-backend-api/src/services/navigation/trip-map-service.ts:120 (resolveTripMapActivity)
Database: Trip read; provider/cache result, not automatic itinerary identity write
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Vague allowances/activities cannot become precise stops by guess. Location-provider failure leaves unresolved feedback.
Related automated file: trip-navigation.test.ts

## TM-F-061 — Selected-day ordered route
Requirement: TM-FR-061 | Role: Traveler | Implementation: complete

Day routing shall follow recorded verified-stop order for the selected walking/cycling/driving mode and disclose omitted unresolved stops.

Workflow: Choose a saved day with at least two exact places. Choose the travel mode and request its day route. Review the stop order and any omitted-stop notice.
Frontend: travelmate-frontend-new/components/features/traveler/SavedTripMapDialog.tsx:1
Backend: travelmate-backend-api/src/controllers/trip-navigation-controller.ts:41 (POST_TRIP_DAY_ROUTE); travelmate-backend-api/src/services/navigation/navigation-service.ts:75 (fetchNavigationRoute)
Database: Read Trip; 5-minute route cache
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: OSRM road/path estimates, no live traffic. Public provider quota, no-route, excessive snap distance and unavailable routes are explicit.
Related automated file: trip-navigation.test.ts

## TM-F-062 — Location sharing and route guidance
Requirement: TM-FR-062 | Role: Traveler | Implementation: complete

Live route guidance shall begin only after an explicit location-sharing action and permit stopping, manual fallback and mode changes.

Workflow: Choose Navigate/Use current location where offered. Review permission and selected destination/mode. Follow displayed estimated guidance; Stop sharing when finished.
Frontend: travelmate-frontend-new/hooks/use-trip-location.ts:1; travelmate-frontend-new/hooks/use-route-guidance.ts:1; travelmate-frontend-new/components/features/traveler/TripLocationMap.tsx:1
Backend: travelmate-backend-api/src/controllers/navigation-controller.ts:16 (POST_ROUTE); travelmate-backend-api/src/services/navigation/navigation-service.ts:1
Database: Live browser position in memory; no location-trace table
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: HTTPS/permission required. Denial, inaccurate/stale position and route failure retain recovery paths. No safety-critical navigation guarantee.
Related automated file: navigation.test.ts

## TM-F-063 — Activity-specific weather
Requirement: TM-FR-063 | Role: Traveler | Implementation: complete

Activity weather shall keep current and forecast requests distinct and use the exact resolved stop/date/time within provider coverage.

Workflow: Select a mapped activity. Open its weather view and review Current versus scheduled-date weather. Read unavailable/hour-reference messages when applicable.
Frontend: travelmate-frontend-new/services/trip-navigation.service.ts:1
Backend: travelmate-backend-api/src/controllers/trip-navigation-controller.ts:66 (POST_TRIP_ACTIVITY_WEATHER); travelmate-backend-api/src/services/navigation/activity-weather.ts:1
Database: Read Trip; bounded request/cache data
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Exact location needed; scheduled weather outside actual coverage remains unavailable. Global provider request budgets apply.
Related automated file: activity-weather.test.ts

## TM-F-064 — Retired GPS URL compatibility
Requirement: TM-FR-064 | Role: Traveler / guest | Implementation: complete

Legacy GPS URLs shall redirect into Saved trips navigation while retaining only valid trip/day identifiers.

Workflow: Open an old GPS bookmark. Read the moved-navigation message. Open the selected saved-trip map, signing in if required.
Frontend: travelmate-frontend-new/app/gps/page.tsx:1; travelmate-frontend-new/app/dashboard/gps/page.tsx:1; travelmate-frontend-new/lib/retired-navigation.ts:1
Backend: No backend endpoint required.
Database: No standalone GPS records
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: The standalone GPS workspace is removed; compatibility redirect does not restore removed navigation tabs.
Related automated file: retired-navigation.test.ts

## TM-F-065 — Confirm completion, skip or restore activity
Requirement: TM-FR-065 | Role: Traveler | Implementation: complete

Managed activity status changes shall require owner, active trip, current revision, saved activity identity and explicit confirmation.

Workflow: In the saved-trip map select an activity. Choose Mark as Completed, Skip Activity or restore/undo. Review and confirm; inspect the retained activity/history.
Frontend: travelmate-frontend-new/components/features/traveler/SmartDayManager.tsx:1
Backend: travelmate-backend-api/src/controllers/smart-itinerary-controller.ts:21 (PATCH_ACTIVITY); travelmate-backend-api/src/services/itinerary/smart-itinerary-service.ts:53 (applyActivityMutation)
Database: Trip JSON status/history, manual_edit version, AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Completed details are protected until undo. Skip retains cost/history and excludes remaining-day routing/replanning. Status change does not record a VisitedPlace.
Related automated file: smart-itinerary.test.ts

## TM-F-066 — Confirmed activity edit/reschedule
Requirement: TM-FR-066 | Role: Traveler | Implementation: complete

Managed edit/reschedule shall reject stale revisions, new duplicate places, time overlaps and changes to completed details until undone.

Workflow: Select Edit Activity or Reschedule Activity. Enter valid fields/day/local time and duration. Confirm; reload if a conflict reports a changed saved trip.
Frontend: travelmate-frontend-new/components/features/traveler/SmartDayManager.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/smart-itinerary-service.ts:79 (saveConfirmed); travelmate-backend-api/src/services/itinerary/smart-day-planner.ts:68 (validateChangedSchedule)
Database: Locked Trip update, version snapshot, AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Duration 15–720 minutes. Moving to another day requires Reschedule; target max 8 activities. Changed venue/photo evidence is revalidated.
Related automated file: smart-itinerary.test.ts

## TM-F-067 — AI remaining-day preview
Requirement: TM-FR-067 | Role: Traveler | Implementation: complete

Replan My Day shall propose times for every remaining saved activity exactly once without writing the itinerary or changing costs/completed history.

Workflow: Choose Replan My Day for an active saved day. Enter an available destination-local time window. Preview and compare proposed times, Flexible deferrals and warnings.
Frontend: travelmate-frontend-new/components/features/traveler/SmartDayManager.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/smart-itinerary-service.ts:126 (previewManagedDay); travelmate-backend-api/src/services/itinerary/smart-day-planner.ts:84 (generateDayProposal)
Database: Read Trip/catalogue; 30-second identical preview cache
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Three previews per owner/5 minutes. Existing Gemini/OpenAI required; no mock fallback. Missing saved durations must be entered first. Preview can consume provider quota.
Related automated file: smart-itinerary.test.ts

## TM-F-068 — Accept or cancel revised day
Requirement: TM-FR-068 | Role: Traveler | Implementation: complete

Acceptance shall validate a signed owner/trip/revision-bound preview and persist one reviewed change; cancellation shall leave itinerary/version data unchanged.

Workflow: Inspect the full preview. Choose Accept revised day to persist, or Cancel replanning to retain the original. Reload and preview again after expiry/conflict.
Frontend: travelmate-frontend-new/components/features/traveler/SmartDayManager.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/smart-itinerary-service.ts:158 (acceptManagedDay); travelmate-backend-api/src/services/itinerary/smart-itinerary-service.ts:103 (openDayProposal)
Database: Trip row lock, ItineraryVersion(manual_edit), AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Preview token expires after 15 minutes. Browser abort does not prove remote model billing stopped. Completed/skipped records and saved costs remain.
Related automated file: smart-itinerary.test.ts

## TM-F-069 — Activity history and legacy compatibility
Requirement: TM-FR-069 | Role: Traveler | Implementation: complete

Management shall preserve stable activity identity/history and default legacy records to Planned without writing on open.

Workflow: Expand Activity history after a confirmed management change. Review recorded action/date/time. Use version restore when a whole prior plan is needed.
Frontend: travelmate-frontend-new/components/features/traveler/SmartDayManager.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/activity-management.ts:16 (managedItinerary)
Database: Optional Trip.itinerary activity id/status/statusChangedAt/managementHistory
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Legacy IDs are derived read-only until confirmed persistence. Management metadata is server-owned, separate from a free-form manual edit.
Related automated file: smart-itinerary.test.ts

## TM-F-070 — Administrator overview
Requirement: TM-FR-070 | Role: Administrator | Implementation: complete

The overview shall show stored aggregate account/generation/feedback counts and seven calendar days without invented activity.

Workflow: Sign in as an authorized administrator. Open Overview. Read all-time totals, recent generation chart and absent/available average rating.
Frontend: travelmate-frontend-new/components/features/admin/AdminOverview.tsx:1
Backend: travelmate-backend-api/src/repositories/admin-overview-repository.ts:11 (readAdminOverview)
Database: User, ItineraryGeneration, Feedback aggregate reads
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Calendar uses UTC+8/Asia/Shanghai. Counts describe stored records, not active concurrent users or measured satisfaction.
Related automated file: admin-overview.test.ts

## TM-F-071 — User search and access state
Requirement: TM-FR-071 | Role: Administrator | Implementation: complete

User management shall search/filter permitted directory fields and suspend/restore non-admin accounts with confirmation and notifications.

Workflow: Open Users. Search name/email/status and select filters. Choose a traveler’s suspend/restore action, inspect the confirmation and submit deliberately.
Frontend: travelmate-frontend-new/components/features/admin/AdminPanels.tsx:19 (UsersView); travelmate-frontend-new/components/features/admin/AccountAccessDialog.tsx:1
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:399 (adminUserStatus)
Database: User, Notification, AuditEvent; pending appeals may resolve on restore
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Admin accounts cannot be changed through this action. No public admin creation/role reassignment is exposed. Unknown status currently normalizes to active (D-04).
Related automated file: account-roles.test.ts

## TM-F-072 — Send traveler warning
Requirement: TM-FR-072 | Role: Administrator | Implementation: complete

A warning shall target an existing traveler with a 10–2000-character message and persist a recipient-scoped notice/audit event.

Workflow: Open Users and the selected traveler’s warning action. Enter a factual bounded warning. Confirm and inspect the outcome.
Frontend: travelmate-frontend-new/components/features/admin/AdminPanels.tsx:19 (UsersView)
Backend: travelmate-backend-api/src/services/platform/user-warning-service.ts:13 (sendUserWarning)
Database: Notification, AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: In-app notice only; not automatic email/SMS. The documentation task sent no warning.
Related automated file: user-warning.test.ts

## TM-F-073 — Review/resolve problem reports
Requirement: TM-FR-073 | Role: Administrator | Implementation: complete

Administrators shall inspect full traveler reports and resolve only pending problem reports with an audited recipient notification.

Workflow: Open Reports. Read the selected report’s full content and reporter context. Choose Mark resolved after review; observe the resulting status.
Frontend: travelmate-frontend-new/components/features/admin/AdminPanels.tsx:74 (ReportsView)
Backend: travelmate-backend-api/src/services/platform/report-service.ts:28 (resolveReport)
Database: Moderation, Notification, AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Resolution is a recorded decision, not technical proof the underlying defect is fixed. Already resolved/wrong-kind requests are rejected.
Related automated file: report-service.test.ts

## TM-F-074 — Review suspension appeals
Requirement: TM-FR-074 | Role: Administrator | Implementation: complete

Appeal review shall validate a pending appeal and current suspended traveler state before approved/rejected decision and bounded explanation.

Workflow: Open Reports and the appeal category. Read the appeal. Enter a 10–2000-character decision message, select the decision and confirm.
Frontend: travelmate-frontend-new/components/features/admin/AdminPanels.tsx:74 (ReportsView)
Backend: travelmate-backend-api/src/services/platform/appeal-service.ts:32 (reviewAppeal)
Database: User + Moderation + Notification + AuditEvent transaction
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Approve restores account access; reject retains suspension. Stale/double review and already-restored account are refused.
Related automated file: appeal-service.test.ts

## TM-F-075 — Live reports and reconnect snapshots
Requirement: TM-FR-075 | Role: Administrator | Implementation: complete

The live report stream shall authenticate repeatedly, send scoped snapshots, reconcile cross-instance changes and clean up closed/stalled connections.

Workflow: Open the admin workspace. Read Live reports connected or reconnect feedback. On a connection failure, retain the view and allow reconnection/refresh.
Frontend: travelmate-frontend-new/components/features/admin/AdminDashboard.tsx:79 (EventSource)
Backend: travelmate-backend-api/src/controllers/admin-reports-stream.ts:9 (streamAdminReports); travelmate-backend-api/src/services/platform/report-events.ts:1
Database: Read Moderation, reporter User fields and recipient Notification
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: SSE (not Socket.IO): 5-second reconciliation, 5-minute connection rotation, event-triggered local refresh and bounded write buffer.
Related automated file: admin-reports-stream.test.ts

## TM-F-076 — System Health and selected audit activity
Requirement: TM-FR-076 | Role: Administrator | Implementation: complete

System Health shall distinguish service configuration from verified availability and show recent generation failures and selected account/audit activity.

Workflow: Open System Health. Inspect configuration indicators, failed generations and available audit search. Report a provider outage using its actual evidence.
Frontend: travelmate-frontend-new/components/features/admin/AdminPanels.tsx:118 (HealthView)
Backend: travelmate-backend-api/src/controllers/platform-controller.ts:48 (integrations)
Database: ItineraryGeneration summaries, latest 100 AuditEvent; config presence booleans
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: No live uptime/latency dashboard, AI prompt editor or automated model curation. Configured means key presence, not a successful provider call.
Related automated file: admin-overview.test.ts

## TM-F-077 — Feedback filters and exact details
Requirement: TM-FR-077 | Role: Administrator | Implementation: complete

Feedback review shall paginate/search/filter stored feedback and open exact linked feedback/related itinerary without inferring sentiment.

Workflow: Open User Feedback. Search or filter rating/sentiment/date, page through results and select a record. Open its related itinerary if retained.
Frontend: travelmate-frontend-new/components/features/admin/UserFeedbackView.tsx:1
Backend: travelmate-backend-api/src/services/platform/feedback-service.ts:32 (feedbackQuery); travelmate-backend-api/src/controllers/feedback-controller.ts:50 (DETAIL)
Database: Feedback with optional User/Trip joins; RepeatableRead; 10/page
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Deleted trip/user links can be null. Sentiment defaults not_analyzed; filters do not prove automated analysis.
Related automated file: feedback-notification-link.test.ts

## TM-F-078 — Administrator notifications
Requirement: TM-FR-078 | Role: Administrator | Implementation: complete

Admin notifications shall retain recipient isolation, meaningful category/deep link and accurate unread count while allowing one/all read.

Workflow: Open Notifications or a bell notice. Follow its report/feedback/system destination. Mark read and inspect the unread badge.
Frontend: travelmate-frontend-new/components/features/admin/AdminNotificationsView.tsx:1; travelmate-frontend-new/lib/admin-notifications.ts:1
Backend: travelmate-backend-api/src/repositories/trip-workspace-repository.ts:71 (readNotificationSnapshot); travelmate-backend-api/src/services/platform/admin-notification-service.ts:1
Database: Notification; exact unread count and latest 50 entries
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Category is encoded in link metadata for current notices; compatibility handles older notices. Only that admin’s read state changes.
Related automated file: admin-notifications.test.ts

## TM-F-079 — Administrator own profile
Requirement: TM-FR-079 | Role: Administrator | Implementation: complete

Account Settings shall update the administrator’s own permitted contact/profile fields without exposing password/role mutation.

Workflow: Open Account Settings. Edit allowed name/contact/profile fields and save. Verify the returned profile before leaving.
Frontend: travelmate-frontend-new/components/features/admin/AdminPanels.tsx:135 (AccountSettingsView)
Backend: travelmate-backend-api/src/controllers/profile-controller.ts:27 (PATCH); travelmate-backend-api/src/services/profile/profile-service.ts:1
Database: User, AuditEvent
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Same allowed-field and length constraints as the traveler profile; no email/role/security-field editing.
Related automated file: profile-service.test.ts

## TM-F-080 — API error contracts and safe recovery
Requirement: TM-FR-080 | Role: All callers | Implementation: complete

The API shall return stable safe error/code/retryability metadata, sanitized malformed-JSON feedback and distinct dependency failures.

Workflow: If a request fails, read the visible message. Retry only after a retryable failure/cooldown; retain unsaved work. Provide time and non-sensitive context to support.
Frontend: travelmate-frontend-new/services/api-response.ts:1; travelmate-frontend-new/components/common/DashboardLoadState.tsx:1
Backend: travelmate-backend-api/src/middlewares/http-middleware.ts:1; travelmate-backend-api/src/middlewares/web-handler-middleware.ts:1; travelmate-backend-api/src/contracts/api-error.ts:1
Database: No new business entity
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Database outages can return retryable 503 rather than false logout. No exhaustive penetration/security certification is asserted.
Related automated file: api-error-contract.test.ts

## TM-F-081 — Database retries and pooled access
Requirement: TM-FR-081 | Role: API process | Implementation: complete

The API shall use PostgreSQL/Prisma pooled TCP access with bounded retries only for recognized connection failures.

Workflow: Operators configure the backend database URL securely. On an outage, inspect safe health/error feedback and restore connectivity before retrying affected operations.
Frontend: No active frontend.
Backend: travelmate-backend-api/src/lib/prisma.ts:1; travelmate-backend-api/src/lib/database-retry.ts:33 (retryDatabaseOperation)
Database: PostgreSQL driver adapter; existing constraints/transactions
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: An ambiguous limiter retry may count twice (fail-closed). Not a blanket retry of every business write or a proven backup/restore service.
Related automated file: oauth-database-retry.test.ts

## TM-F-082 — Shared rate limits and request-driven cleanup
Requirement: TM-FR-082 | Role: API process | Implementation: complete

Rate limits shall use shared fixed-window PostgreSQL buckets and opportunistically prune old buckets/revocations.

Workflow: Operators monitor 429 outcomes and database health. Respect Retry-After and avoid rapid repeat submissions. Review provider quotas before scaling.
Frontend: travelmate-frontend-new/services/api-response.ts:1
Backend: travelmate-backend-api/src/middlewares/rate-limit-middleware.ts:7 (allowRequest)
Database: RateLimitBucket; RevokedSession expiry cleanup
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Cleanup is a 1% request-triggered chance, not a scheduled worker. Authentication itself depends on database availability for rate limiting.
Related automated file: security.test.ts

## TM-F-083 — Provider cache and unavailable disclosures
Requirement: TM-FR-083 | Role: API process / traveler | Implementation: complete

Provider caching shall coalesce identical in-flight requests, bound entries, honor freshness/stale cutoffs and expose unavailable results honestly.

Workflow: Read source/freshness labels. Refresh only when needed. Treat stale data as a fallback and confirm current prices/availability with the original provider.
Frontend: travelmate-frontend-new/components/common/ProviderFreshness.tsx:1; travelmate-frontend-new/services/provider-response.ts:1
Backend: travelmate-backend-api/src/services/cache/provider-cache.ts:46 (withProviderCache); travelmate-backend-api/src/services/cache/policies.ts:1
Database: Bounded in-process cache, not distributed durable data
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: General cache max 300 entries. Flights/hotels 5m fresh/15m cutoff; activities 30m/2h; weather 15m/1h; FX 6h/24h.
Related automated file: provider-cache.test.ts

## TM-F-084 — Security headers, HTTPS and same-origin writes
Requirement: TM-FR-084 | Role: All callers / operator | Implementation: complete

Production shall enforce HTTPS/security headers and reject untrusted cross-site browser writes with server-side authorization.

Workflow: Operators configure trusted frontend HTTPS origins and independent secrets. Clients access the normal frontend; an origin or access denial is not solved by bypassing security controls.
Frontend: travelmate-frontend-new/next.config.ts:1; travelmate-frontend-new/proxy.ts:1
Backend: travelmate-backend-api/src/middlewares/security-middleware.ts:1; travelmate-backend-api/src/config/env.ts:3 (validateRuntimeEnvironment)
Database: Current User/session checks; no separate authorization table
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: No full encryption-at-rest/legal compliance or exhaustive XSS/CSRF proof. Frontend CSP includes unsafe-inline and is an explicit review item.
Related automated file: security.test.ts

## TM-F-085 — Operational health and graceful shutdown
Requirement: TM-FR-085 | Role: Operator | Implementation: complete

Operational endpoints shall expose basic API identity/database readiness and the process shall close HTTP/database resources on termination.

Workflow: Inspect GET / and /health in an authorized environment. Check dependency state as well as HTTP status; use the documented healthcheck on a release candidate.
Frontend: No active frontend.
Backend: travelmate-backend-api/src/controllers/system-controller.ts:1; travelmate-backend-api/src/server.ts:1
Database: Read-only database readiness query
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Health is a point observation, not measured uptime or a restore drill. The healthcheck script forwards HTTPS scheme for container checks.
Related automated file: container-healthcheck.test.ts

## TM-F-086 — Contracts and paired-revision validation
Requirement: TM-FR-086 | Role: Maintainer | Implementation: complete

API contracts shall remain aligned with generated frontend snapshots and be checked against a pinned compatible backend revision.

Workflow: Use contracts:check in an isolated candidate. Compare schema differences before authorizing contracts:sync or a release. Record both repository revisions.
Frontend: travelmate-frontend-new/scripts/sync-api-contracts.mjs:1; travelmate-frontend-new/lib/contracts.ts:1
Backend: travelmate-backend-api/openapi/travelmate-api.json:1; travelmate-backend-api/src/contracts/api-error.ts:1
Database: No runtime business write
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: contracts:sync writes files; documentation task uses copies/check mode only. CI definitions are configuration evidence, not proof a run passed.
Related automated file: api-error-contract.test.ts

## TM-F-087 — Container deployment and rollback configuration
Requirement: TM-FR-087 | Role: Maintainer | Implementation: complete

A proposed release shall build a non-root image, apply reviewed migrations explicitly and require health before retaining the new app image.

Workflow: Prepare an isolated release and required configuration. Review backup/migration/rollback plans. Only after separate release authorization run the documented deployment procedure and verify health.
Frontend: No active frontend.
Backend: travelmate-backend-api/Dockerfile:1; travelmate-backend-api/docker/docker-compose.yaml:1; travelmate-backend-api/scripts/deploy.sh:1; travelmate-backend-api/.github/workflows/deploy.yaml:1
Database: Migrations are deployment mutations; database supplied externally
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Configured pipeline, not executed here. Image rollback does not undo applied database migrations. Domain/hosting/backup acceptance needs actual operational evidence.
Related automated file: docker-deployment.test.ts

## TM-F-088 — Flight and activity comparison API
Requirement: TM-FR-088 | Role: Traveler API consumer; UI removed | Implementation: partial

Existing authenticated comparison endpoints shall normalize source-backed flight/activity results and unavailable states, without claiming a current traveler comparison screen.

Workflow: There is no current Travel options tab. Maintainers can inspect the API contract in an isolated integration environment; ordinary travelers use the retained planner.
Frontend: travelmate-frontend-new/components/features/traveler/TravelComparisonWorkspace.tsx:1
Backend: travelmate-backend-api/src/controllers/travel-options-controller.ts:1; travelmate-backend-api/src/services/travel/amadeus-provider.ts:1
Database: Legacy approved Listing reads; provider caches
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Unreferenced comparison component retained in source. Amadeus 1–9 travelers; configured production/test distinction. Mark partial because API exists but UI is retired.
Related automated file: amadeus-travel-provider.test.ts

## TM-F-089 — Hotel quote/revalidation API
Requirement: TM-FR-089 | Role: Traveler API consumer; current UI suggestions only | Implementation: partial

Existing quote APIs shall bind owner/context/occupancy/expiry and reject changed/sold-out/invalid quotes without asserting current UI booking.

Workflow: The main planner shows suggestions only. In an isolated API test, request a supported quote, revalidate it and inspect changed/expired/provider-error outcomes.
Frontend: travelmate-frontend-new/components/features/traveler/AccommodationGuests.tsx:1
Backend: travelmate-backend-api/src/controllers/accommodation-check-controller.ts:1; travelmate-backend-api/src/services/travel/hotel-quote.ts:1; travelmate-backend-api/src/services/travel/hotel-recommendations.ts:1
Database: HMAC quote tickets; no booking created
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: API occupancy 1–8 rooms, adults/child ages 0–17 and total ≤20. LiteAPI remains sandbox; Rapid rights gated. No current price/occupancy controls in main planner.
Related automated file: accommodation-check.test.ts

## TM-F-090 — Generation arrival/departure/rest API constraints
Requirement: TM-FR-090 | Role: Traveler API consumer; no current form controls | Implementation: partial

The generation API shall validate optional destination-local arrival/departure clocks and in-range rest dates without implying an exposed UI.

Workflow: No current planner controls set these fields. Maintainers may specify them in an isolated API case and inspect rest/travel/incomplete day output.
Frontend: travelmate-frontend-new/components/features/traveler/TravelerDashboard.tsx:1
Backend: travelmate-backend-api/src/services/itinerary/generated-day-scheduler.ts:10 (generationConstraintsSchema); travelmate-backend-api/src/controllers/itinerary-controller.ts:629 (constraintsResult)
Database: Trip JSON planningStatus/scheduleBlocks
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: HH:MM clocks; ≤31 in-range rest dates. Arrival adds 90 minutes; departure reserves 120. API-only capability is partial for normal users.
Related automated file: generated-day-scheduler.test.ts

## TM-F-091 — Removed owner/marketplace/payment workflows
Requirement: TM-FR-091 | Role: No active user role | Implementation: unavailable

Removed owner registration, booking, payment, promotion and trust/profile-moderation actions shall remain unavailable rather than be documented as working product features.

Workflow: Do not look for an Owner workspace, checkout or payment action. Use the retained trip planner and obtain actual reservations from external providers.
Frontend: travelmate-frontend-new/docs/Routes.md:1
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:419 (This workflow is no longer available)
Database: Legacy Listing/Booking/Promotion/Review/PaymentTransaction/OwnerDocument tables retained
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Schema presence is not feature availability. PayMongo is not integrated; owner role no longer exists. Legacy data is not deleted by this documentation work.
Related automated file: account-roles.test.ts

## TM-F-092 — Retired preferences/comparison tabs and duplication
Requirement: TM-FR-092 | Role: Traveler | Implementation: unavailable

Retired Preferences/Travel options tab URLs shall normalize safely, and the removed duplicate-trip action shall reject requests.

Workflow: Use current sidebar entries. An old preferences/compare bookmark returns to the supported workspace; use new trip planning when a distinct plan is needed.
Frontend: travelmate-frontend-new/hooks/use-itinerary-navigation.ts:1
Backend: travelmate-backend-api/src/services/platform/platform-service.ts:417 (duplicate-trip)
Database: Legacy duplicated enum retained only for reading historical versions
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Unreferenced TripPlannerForm still contains a travel-style prop; current dashboard does not render it. Do not infer a current style selector from that file.
Related automated file: retired-navigation.test.ts

## TM-F-093 — Guest chatbot, live crowd feed and automatic backups
Requirement: TM-FR-093 | Role: Unavailable / proposed | Implementation: unavailable

Unimplemented historical requirements shall be identified explicitly and must not be presented as observed system capabilities.

Workflow: Guests can explore the public site and account dialogs. Use authenticated structured planning; do not expect a guest chat, live crowd telemetry or an application-managed daily backup interface.
Frontend: No active frontend.
Backend: No backend endpoint required.
Database: No Chat/conversation table, live crowd integration or backup job found
Verification: Static code inspection; related unit evidence is recorded separately. End-to-end acceptance not executed in this documentation task.
Limitations: Future work requires separate requirements, provider/security design and execution evidence. Old 99.9% uptime, 500-user capacity and automatic daily backup statements remain unverified targets.
Related automated file: No directly named unit test located.
