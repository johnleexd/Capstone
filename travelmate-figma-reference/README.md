# TravelMate Figma Make reference

Status: source inspection and preparation only. No Figma Make project, editable Figma Design frames, or completed prototype has been created. Live page-by-page inspection and prototype validation remain pending because Figma is unconnected and the browser runtime is unavailable.

The original application was read only. This folder is a separate reference handoff, not a replacement application. Prior audit screenshots provide partial historical evidence, not a complete current visual baseline.

## Source authority

Use the supplied `source/app`, `source/components`, `source/hooks`, `source/services`, `source/lib`, and `source/styles` files for actual wording, rendering, interactions, and calculations. Follow reachable components from the route entry points. In particular, the current planner is implemented inline in `TravelerDashboard.tsx`; the older `TripPlannerForm.tsx` must not override the current screen.

Original routes: `/`, `/dashboard`, `/admin/dashboard`, `/account/appeal`. Most dashboard features currently use local tabs. The reproduction should expose them as distinct prototype routes while preserving their original navigation labels and shared trip state. Prototype routes in SCREEN_MAP.csv are proposed organization, not existing production URLs.

## Visual rules

Geist Sans is the active font (`app/layout.tsx` and `styles/globals.css`). Use Lucide React icons from the original imports. The legacy blue/coral theme file is not the authoritative current workspace palette.

- Workspace background: #0b1d1a. Header: #102824. Panels: #102622 and #14231f. Inputs also use slate-950/slate-700 where specified.
- Cream active navigation: #f1ead8; cream planner hero: #efe8d6; authentication panel: #f2efe6; amber accent: #ffcf70. Preserve the actual Tailwind amber/cyan/violet/slate values on individual components.
- Preserve square editorial shell panels and their fine borders. Some itinerary/travel-option components use rounded corners; do not flatten these differences into a new design system.
- Workspace header is fixed, inset by 16px (24px from sm), with a 64px inner height and max width 1380px. Admin shell max width is 1600px with a 248px desktop rail. Use source classes for the traveler shell.
- At widths below 1024px, the existing navigation becomes a horizontal, intentionally scrollable rail. Keep that controlled navigation scrolling without document overflow. At 768px, forms use the source sm two-column behavior; at 390px, forms and cards stack. Inspect every route at 1440, 768, and 390px.
- Authentication is a two-column composition on lg, compact dialog on sm, and a full-height scrollable screen on mobile. Dialog content must scroll independently while close controls remain accessible.

## Screen coverage

SCREEN_MAP.csv is an initial source-derived coverage checklist. Each row needs a named responsive screen, plus applicable state views. Name them `User / Feature / Desktop`, `User / Feature / Tablet`, `User / Feature / Mobile`; use Guest or Admin for those roles. State variants append `/ Loading`, `/ Empty`, `/ Error`, `/ Success`, or a specific interaction name. This checklist is not a certification of exhaustive runtime coverage.

Do not convert every feature to one giant dashboard. Preserve existing inline expansions and dialogs as working interactions, and add direct review routes/state views for those expansions and dialogs. Keep the original planner's complete form composition while exposing its important states separately.

## Interaction and permission rules

- Register -> email verification -> login. Verification code is eight characters and single-use. Verify/recovery/resend responses and expirations must be simulated without sending real emails. Google sign-in uses the saved role; new Google accounts are travelers. Do not add a role selector to the production login form.
- Traveler and admin navigation are separate. Suspended accounts use the appeal flow; they cannot plan trips. Profile verification/Limited Mode and email verification are distinct. Mirror source guards and error messages.
- Planner: confirmed geographic suggestion or backend-resolved manual destination -> area narrowing where applicable -> destination currency and relevant transport -> stays -> trip origin -> generate. Ambiguous names require a selection. Area comparison does not silently select a city. Selecting a city searches accommodation automatically.
- Trip range: 1–31 inclusive days. Currency: PHP, USD, EUR, JPY. Party: solo, couple, family, friends. Solo/couple counts are constrained; comparison flights support at most nine travelers. Preserve source validation rather than guessing all limits from this summary.
- Successful generation automatically saves the trip. Manual activity edits remain a dirty browser draft until Save changes succeeds. Save failure keeps the plan and edits for retry. Regeneration updates the selected trip and creates history; do not create unrelated saved trips on every retry.
- Review: day details and previous/next activity carousel, exact place evidence and photo attribution, add/edit/remove/reorder activity, refresh photos, refresh conditions without overwriting edited content, budget review, comparison selections, and rating feedback.
- Saved plans: active/archived filters, view, edit/regenerate, duplicate, archive/restore, permanently delete archived plans, paged loading, version-history loading/pagination and restoration. Legacy restoration limitations must match source.
- Notifications: list, unread counts, full message dialog, mark one/all read, failed read action.
- Admin: user search/filter, warning form, suspension/restoration and available role actions as implemented; full reports and appeals, decisions communicated to simulated traveler notifications; provider configuration/health and audit activity; feedback filtering/pagination and read-only related itinerary; own profile settings.
- Navigation must preserve one shared trip across planner, budget and travel options. User data must stay owned by the simulated session. Admin feedback itinerary views are read-only.

## Simulated integrations

Use a separate deterministic adapter and local sample state. Do not call the original backend, production database, OAuth callback, email provider, or payment service from the prototype. Label integrations `Simulated in prototype` in an unobtrusive persistent prototype indicator and provider result metadata. Preserve the original live/test/estimate/unavailable distinctions in result content.

Simulate authentication/session, email verification/recovery, Google OAuth, destination search/geocoding/area lookup, transport context, OpenAI/Gemini planning, saved-trip persistence and versions, mapped accommodation discovery, Amadeus flights/hotels/activities, exchange-rate references, weather, calendar crowd estimates, feedback, notifications, moderation and account appeals. Payments/bookings remain explicitly simulated and only expose behavior present in source. Admin health reports simulated configuration; sentiment remains Not analyzed unless the source-supported state is explicitly represented.

Support controlled loading, no-results, provider-unavailable, validation failure, save failure with retained draft, retry success, stale freshness, expired-code, suspended-account, missing-photo and legacy-history states. Do not claim a provider response is live.

## Assets

Reuse public files byte-for-byte. Landing workflow image relationships are explicit in `TravelMateLanding.tsx`: Set the brief -> cordova-cclex.png; Shape the pace -> cordova-mangrove.png; Compare options -> cordova-resort.png; Build the days -> cordova-nalusuan.png; Refine and save -> cordova-10000-roses.png.

These are illustrative landing workflow images, not universal destination photos. Current itinerary images use trusted Commons photos attached to actual places with attribution; missing photos show the existing placeholder. Saved-trip covers use a trusted itinerary photo and then the saved country's flag. Never apply Cordova imagery to Tokyo, Paris, or other unrelated locations. All available public assets and their hashes are in ASSET_MANIFEST.json. Source-referenced assets must take precedence over unused files.

## Remaining verification

1. Enable Figma access and confirm a usable Figma Make editing capability or browser session.
2. Inspect the current running application under guest, traveler, admin and suspended-session states. Record a fresh page/state screenshot baseline at all three widths without changing production data.
3. Build the separate Figma Make project from this reference; confirm every row and any additional runtime functionality.
4. Compare each responsive route and state to fresh screenshots. Verify copy, colors, font metrics, spacing, images, control states and navigation. Audit scrolling, long text, tables, modal focus/escape/return focus, empty results and errors.
5. Exercise registration/verification/recovery, planning and save-retry, manual edit/reopen/version restoration, comparison, feedback, account/report/notification and admin moderation flows end to end using simulated data.
6. Deliver the actual Make project link with honest validation results. Editable Figma Design frames require separate supported creation tools and must not be claimed unless created and checked.
