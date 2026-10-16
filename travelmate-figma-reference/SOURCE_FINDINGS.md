# Source findings and precedence

Current reachable UI and backend behavior take precedence over older documentation, historical screenshots and unused components. This package includes unavailable legacy controls only where the current UI can expose them.

| Finding | Evidence | Reproduction instruction |
| --- | --- | --- |
| Most features are local tabs, not production routes. | TravelerDashboard and AdminDashboard | Prototype routes in SCREEN_MAP.csv are organizational additions. Preserve original labels, shell and shared state. |
| An older planner is not imported by current route roots. | TripPlannerForm.tsx; REACHABLE_SOURCE.json | Use the inline planner in TravelerDashboard: required panel #14302a, optional panel #19362f, origin panel #102822. |
| Blue/coral tokens are explicitly legacy. | constants/theme.ts | Current Geist/green/cream/amber JSX and global styles take precedence. |
| Profile page shows email verification and account status; it has no profile-approval wizard or Limited Mode UI. | TravelerAccountCenter and TravelerDashboard | Do not build older documentation's Limited Mode or approval flow. Email verification gates email/password login. |
| Current roles are traveler and admin. | Landing redirects; AdminPanels; backend auth/platform controllers | No owner dashboard, owner listing editor, promotions, disputes, payouts or trust-score screens. Backend fields do not imply UI features. |
| Admin roles are displayed/filterable but cannot be changed in the UI. | AdminPanels UsersView | Non-admin rows have Send warning and Suspend account/Restore access. Admin rows show Admin account. No promote/demote/delete-user controls. |
| A legacy local-accommodation booking button can render, but its action is disabled on the backend. | ItineraryWorkspace Book as lead traveler; TravelerDashboard action book; behavior-reference/services/platform/platform-service.ts executePlatformAction | Preserve conditional affordance if matching data exists. Response: This workflow is no longer available. Do not use the unused frontend success string as supported behavior. No current payment/checkout workflow. |
| Comparison activity action adds preferences, not an itinerary activity directly. | TravelComparisonWorkspace and TravelerDashboard onAddActivity | Preserve Add to preferences, Include N-traveler cost/Remove cost, optional Provider details. Manual activity creation is a separate dialog. |
| Historical Home has stale temporary-draft copy and missing/transient imagery. | traveler-home-historical-test.png | Current successful generation auto-saves; manual edits remain draft until saved. Do not reproduce broken image alt text, intermediate opacity or stale sample wording. |
| Historical exchange screenshot contains a test harness error. | exchange-rate-unavailable.png | Unmocked API request blocked by the read-only audit is test evidence, not production wording. Use source-supported error text. |
| Cordova photographs are landing illustrations; itinerary photos are place-linked Commons URLs. | Landing arrays; PlacePhoto; lib/place-image | Never attach Cordova imagery to unrelated destinations. Preserve attribution and missing-photo placeholders. Dynamic image coverage is not fully available locally. |
| Wide admin tables scroll in a bounded region. | AdminPanels min-w-[940px]; UserFeedbackView | Preserve contained horizontal table scrolling, without whole-document overflow. No invented mobile card redesign. |
| Historical image widths are 390, 1280 and 1440; no 768 capture exists. | SCREENSHOT_MANIFEST.json | All current 1440/768/390 layouts require build-time checking. |

Do not infer screens from backend-only actions, old interfaces, seeded data, dependencies or unreachable files. Identify unresolved runtime behavior explicitly.
