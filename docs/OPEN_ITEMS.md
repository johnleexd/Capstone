# TravelMate documentation review items

These items require project decisions or verification before final acceptance. They preserve the distinctions recorded in the 15 October 2026 review. Publishing this document does not establish that a potential defect has been reproduced or corrected.

## Project and operational decisions

| Item | Required record |
| --- | --- |
| Team and reviewers | Confirm full names, responsibilities, adviser, panel and authorized approvers |
| Academic submission | Confirm academic year, submission and defense dates, signatures and document approval |
| Schedule | Approve milestone dates, owners, dependencies and completion evidence |
| Budget | Approve actual hosting, database, mail, AI, maps, media, domain, equipment and contingency costs; the historical PHP 2,000 proposal is not an approved current budget |
| Operations | Assign maintenance and incident contacts; approve service targets, backup ownership, retention, recovery point and recovery time objectives |
| Privacy and providers | Confirm data handling notices, responsible contact, retention, provider permissions and attribution |
| Acceptance | Execute the STD, resolve or formally disposition defects, record UAT and complete the approval record |

## Recorded discrepancies and concerns

| ID | Classification | Review finding | Required follow up |
| --- | --- | --- | --- |
| D-01 | Content discrepancy | Landing copy refers to removed travel-style and comparison controls | Align copy with current Balanced generation and available controls |
| D-02 | Privacy notice discrepancy | Notice text emphasizes Google photos while ordinary enrichment uses additional reusable sources | Review actual provider and data flows and update approved disclosures |
| D-03 | Potential date boundary defect | Browser eligibility uses local today while the server uses UTC today | Define the date policy and execute `TM-XT-001` across timezone boundaries |
| D-04 | Potential administrative validation defect | Unknown user-status input may normalize to active | Reproduce in a disposable environment, reject invalid commands and execute `TM-XT-006` |
| D-05 | Contract documentation gap | Ten actual method/path operations lack exact OpenAPI entries; the exchange-rate path differs | Reconcile the [API register](registers/api-routes.csv), generated contracts and actual `/api/destination-context/exchange-rate` route |
| D-06 | Potential storage length defect | A destination may pass a 2000-character boundary while the generation record uses `varchar(120)` | Align storage and accepted length; execute `TM-XT-005` |
| D-07 | Potential save precision defect | Money normalization may round before validating raw precision | Verify intended currency rules and execute `TM-XT-004` |
| D-08 | Historical lint failure | The earlier itinerary-overview report records seven `no-explicit-any` errors in `e2e/travel-preferences.spec.ts` | Rerun current whole-repository lint and record the actual result |
| D-09 | Explicit media gap | The recorded catalogue has no verified suitable photo for Bir Tawil | Preserve the missing-image state until a verified exact-area asset is curated |

The archived test documentation supplies the related acceptance context. Classifications above remain historical review findings, with no new retest asserted.

## Verification still required

- Execute all applicable feature, boundary, permission and quality procedures using disposable fixtures and record actual results.
- Verify PostgreSQL constraints, transaction behavior, ownership races, migration state and recovery.
- Verify real email delivery, Google OAuth, provider failure behavior and configured deployment controls in the intended environment.
- Run current lint, type checks, contract checks, production builds, dependency audits, integration, browser and proxy regressions.
- Complete keyboard, screen-reader, contrast, responsive and physical-device checks.
- Approve workloads and measure performance, error rates and recovery rather than inferring them from unit tests.
- Complete authorized UAT and review the final documents and approval record.
