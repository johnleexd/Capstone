# TravelMate manual Figma Make handoff

Prepared from the existing codebase on 2026-10-07. This is a reference package for you to submit manually. No prototype or editable Figma Design frames were created. No Figma connection or project URL is needed for this handoff. The original frontend and backend were not modified.

## What to submit

1. Paste all of `FIGMA_MAKE_PROMPT.md` into Figma Make.
2. Attach `FIGMA_MAKE_REFERENCE.txt`. It combines the detailed design, forms, responsive rules, source discrepancies, screen list and workflows in one text file.
3. Attach the five PNG files in `historical-screenshots/` and `SCREENSHOT_STATUS.md` together. They are partial historical evidence, not a fresh complete screenshot baseline. The manifest records their origin and limitations.
4. Supply original image assets from `source/public/`, preserving their filenames. `ASSET_USAGE.md` explains which are used and where. Keep vectors unchanged. If the interface does not accept an archive, unzip locally and attach supported individual files; do not assume a ZIP will be read automatically.
5. For exact JSX wording and classes, also attach `UI_IMPLEMENTATION_SOURCE.txt` (current reachable frontend TSX/CSS) and, when supported, the `source/` folder. `source/` contains reusable components, hooks, services, types and deterministic calculations. It is reference code, not a self-contained application to start without dependencies.

Use `TravelMate-Figma-Reference-complete.zip` to transfer/archive the entire handoff. `TravelMate-Figma-Assets.zip` contains only original public assets. Copies in `source/` match the originals byte-for-byte.

## Files

- `FIGMA_MAKE_PROMPT.md`: complete ready-to-copy build prompt.
- `FIGMA_MAKE_REFERENCE.txt`: combined readable attachment.
- `DESIGN_AND_FUNCTIONALITY.md`: code-derived page layouts, design details and form fields.
- `RESPONSIVE_REQUIREMENTS.md`: source breakpoints and 1440/768/390 acceptance checks.
- `SCREEN_MAP.csv`: distinct feature/state pages, original components, proposed prototype routes.
- `WORKFLOWS.md`: ordered source-derived interactions and permission boundaries.
- `STATE_SCREEN_MAP.csv`: separate labeled review screens for each documented state at all three widths.
- `SCREENSHOT_STATUS.md`, `SCREENSHOT_MANIFEST.json`, `CAPTURE_CHECKLIST.csv`: visual evidence and every uncaptured screen/state listed explicitly.
- `historical-screenshots/`: five original PNG audit captures. No new screenshots were generated.
- `ASSET_USAGE.md`, `ASSET_MANIFEST.json`: asset use, dimensions and checksums.
- `SOURCE_FINDINGS.md`: conflicting/stale source evidence, including disabled booking behavior.
- `SOURCE_MANIFEST.json`, `REACHABLE_SOURCE.json`, `CONTROL_INDEX.json`, `UI_SOURCE_INDEX.json`: provenance and source-derived indexes. These support the handoff; they are not working screens.
- `UI_IMPLEMENTATION_SOURCE.txt`: concatenated reachable TSX and CSS for easy submission.
- `source/`: original frontend reference copies. `behavior-reference/`: selected original backend files clarifying implemented functionality, not a deployable backend.
- `baseline/`: supplied older documentation, lower priority than current reachable code.

## Capture limitations

At preparation time, no service was listening on local ports 3000, 3001 or 5000. The computer/browser runtime exposed no apps or browsers, and opening Chrome returned `Browser is not available: chrome`. A frontend process alone would not provide a supported capture browser here. We did not start the original app, migrate/seed its database, sign in, or change any application records.

Consequently all current pages and interactions remain **not live captured and not runtime verified**. The five existing audit PNGs cover only partial traveler Home, planner/loading, area comparison, exchange-rate-unavailable, and application-error appearances. There are no current guest, admin, tablet, itinerary, saved-trip, account, or moderation screenshots in this package. Admin-looking test identity in one historical traveler screenshot does not prove admin navigation or permissions. Use current code over conflicting historical text or transient animation states.

## Verification performed

Source references are checked for existence. Reachable UI imports, form/control attributes, image usage and responsive classes were extracted. Original copied files and assets were checked with SHA-256. Archives are checked against actual file content. No screenshot, navigation, role permission or responsive-runtime pass is claimed. The builder should report remaining checks honestly.
