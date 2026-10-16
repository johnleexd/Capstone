# TravelMate unresolved details and verification limits

This list separates missing administrative evidence from implementation concerns. No item is implicitly approved.

## Team and academic details

- Final full names: confirm the separate people represented by the old combined name string; do not infer a roster.
- Approved academic year, submission/defense dates and document publication date.
- Adviser, panel chair/members, authorized academic approver, signatures and dates.
- Confirmed roles, credentials, supported contributions and any authorized team biographies.

## Project management evidence

- Actual/approved schedule, milestone completion evidence, effort, assignments and meeting records.
- Approved budget, actual provider/hosting/domain/equipment invoices and contingency. The old PHP 2000 figure is an archived proposal only.
- Approved maintenance operator, incident contacts, retention periods, privacy/controller contact, service targets and recovery RPO/RTO.

## Source findings

### D-01 Content discrepancy

Landing copy still mentions removed travel style and comparison controls.

Action: Current dashboard uses Balanced defaults; reconcile marketing with accessible UI.

Evidence class: Static inspection; no application change.

### D-02 Privacy notice discrepancy

Privacy text emphasizes Google photo handling although ordinary production enrichment also uses reusable Wikimedia/other sources.

Action: Review the actual provider/data-flow disclosures and retention/contact details before publication.

Evidence class: Static inspection; legal/compliance approval not established.

### D-03 Potential date boundary defect

Browser uses local today; server start-date eligibility uses UTC today.

Action: Adopt a documented date policy and run TM-XT-001 at offset boundaries.

Evidence class: Static concern; not reproduced as a live system failure.

### D-04 Potential administrative validation defect

Unknown status input can normalize to active in the user-management path.

Action: Reject unknown/missing commands; test TM-XT-006 before acceptance.

Evidence class: Static concern; no live account mutation.

### D-05 Confirmed contract documentation gap

Ten actual method/path operations lack exact OpenAPI entries; exchange rate is documented at the wrong path.

Action: Document actual /api/destination-context/exchange-rate and reconcile the route register.

Evidence class: Static route/spec comparison; not an executed API failure.

### D-06 Potential storage length defect

Generation accepts destination labels up to 2000 characters at the controller boundary; ItineraryGeneration.destination is varchar(120).

Action: Align accepted lengths and run TM-XT-005 using disposable data.

Evidence class: Static concern; no live database reproduction.

### D-07 Potential save precision defect

Platform positiveMoney rounds to two decimals before precision validation.

Action: Validate raw currency precision first and run TM-XT-004; silent rounding is not intended acceptance.

Evidence class: Static concern; not a passing business rule.

### D-08 Historical code quality failure

15 October itinerary-overview report records seven no-explicit-any ESLint errors in e2e/travel-preferences.spec.ts.

Action: Correct and rerun whole-repository lint separately.

Evidence class: Historical report only; lint not rerun this task.

### D-09 Explicit non-national media gap

264 of 265 geographic area records have photos; Bir Tawil has no verified suitable photo.

Action: Keep an honest missing photo state; curate only a verified exact-area image.

Evidence class: Manifest/static evidence and related current isolated tests; all 249 ISO entries plus Kosovo are covered.

## Not executed or not established

- All 133 specified TM-TC/TM-XT/TM-QT system/quality procedures remain Not executed. The 152/521 isolated regression passes do not change those statuses.
- Live PostgreSQL persistence, transaction/ownership race, applied migration state and restore/recovery.
- Real mail delivery, OAuth linking in the configured deployment, external provider availability/rights/billing and paid AI behavior.
- Production build, complete CI/deployment, current whole-repository lint/typecheck, production performance/load/uptime and physical-device coverage.
- Full keyboard, screen-reader, contrast and accessibility acceptance; UAT, survey or effectiveness outcomes.
- Current authenticated traveler/admin/map/activity screenshots were not captured; manuals label them missing. Anonymous captures were made without submissions.

## Document tooling limitation

The packaged render_docx.py failed because LibreOffice soffice.exe was unavailable; no Word-compatible render engine was detected. DOCX files are editable and structurally checked. The companion PDF is independently typeset from the same content and visually reviewed; it is not a verified Word export. Refresh TOC/PAGE/list fields and review every Word page with a compatible engine before submission. No cached reference page numbers are reused.

## Inspection boundary

The inventory reconciles all discovered entry points and module flows; not every utility or test line is represented as a separate feature. Commit IDs plus dirty-file/status hashes identify the inspected working state. Static implementation completeness is not end-to-end verification. Provider catalogues and finite-resolution geometry do not guarantee exhaustive current real-world coverage.
