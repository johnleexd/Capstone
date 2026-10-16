# TravelMate documentation source baseline

This record identifies the local frontend and backend source inspected in the 15 October 2026 documentation review and compared with the committed local source on 16 October 2026. The standalone SPMP, SRS, SDD and STD Markdown editions were subsequently removed at the owner's request. The historical comparison does not claim that newer remote branches, a deployed environment or every provider were reviewed.

## Revision history

| Version | Date | Change | Approval |
| --- | --- | --- | --- |
| 2.0 | 15 October 2026 | Reconciled system requirements, design, test cases, registers and diagrams in the archived documentation package | Pending |
| 2.1 | 16 October 2026 | Published the four Markdown repository editions with navigation, preserved registers, diagrams, source comparison and test execution guidance | Pending |

## Source revisions

| Repository | Review snapshot HEAD on 15 October | Local committed HEAD on 16 October |
| --- | --- | --- |
| [Frontend](../travelmate-frontend-new/) | `1d55ba3c2eb2a9387cb34c0cb6ca5edef8bfbc96` plus recorded working files | `40422d45e53ea66637aab0acf8651d25a2b572b7` |
| [Backend](../travelmate-backend-api/) | `234e08d2317526f772854296bfaf6a33ca5dd0fa` plus recorded working files | `51c867207517c18e007952ea2c2eda8e4350e95f` |

The historical HEAD values alone do not identify the reviewed implementation because that review included working changes. A SHA-256 comparison against its source manifest found 351 identical frontend files and 349 identical backend files among recorded files tracked in the current repositories. There were no missing recorded tracked files. The comparison excludes ignored build output, private environment files, dependencies and files not recorded in the earlier manifest; it is not a whole-directory equivalence claim.

The recorded tracked differences are:

- Frontend `.gitignore`.
- Frontend `e2e/fixtures/generated-daily-schedules.json`.
- Frontend `e2e/fixtures/gimcheon-reopened-trip.json`.
- Frontend `e2e/fixtures/grounded-plans.json`.
- Frontend `e2e/fixtures/shared-destination-schedules.json`.
- Backend `.gitignore`.
- Backend `README.md`.

These differences do not change the matching runtime files used for the behavioral description. They do prevent treating the historical test runs as a new test run of the current checkout. The [comparison record](registers/source-comparison.json) lists every matching and changed recorded path. The [original snapshot](../TravelMate-Documentation-2026-10-15/evidence/source-snapshot.json) contains the historical hashes.

The preceding GitHub check found the local frontend five commits behind `origin/main` and the local backend eight commits behind `upstream/main`. Those remote-only changes were not merged or included in this documentation baseline. Reconcile the documents again when adopting that newer source.

## Evidence locations

The [archived package](../TravelMate-Documentation-2026-10-15/deliverables/README.md) contains the earlier Word documents, manuscript and supporting material. The [historical execution register](registers/verification-executions.csv) records what was run, its date and its limitations. Its `evidence/` entries resolve under `TravelMate-Documentation-2026-10-15/`; its `audit/` entries resolve under the workspace root. Both locations are local archive evidence and may not be included in an individual application repository checkout.

The original frontend and backend isolated logs remain in the [archive evidence folder](../TravelMate-Documentation-2026-10-15/evidence/). They report 152 and 521 passes respectively on 15 October 2026. Integration, production-like providers, live persistence, complete accessibility, UAT, load and disaster recovery are not certified by those counts. The 133 specified acceptance procedures have no execution results.

## Maintaining the baseline

Review the four documents together when changing authentication, permissions, accepted trip inputs, currencies, budget calculations, providers, persistence, trip lifecycle, navigation or moderation. Preserve existing requirement IDs; allocate new IDs for new behavior. Update the related design section, test procedure, API or schema register and traceability row in the same change.

Record the frontend and immutable compatible backend revisions for each verification run. Do not overwrite historical execution evidence with a later result. Record a new dated execution and link its actual evidence. Move an open concern to resolved only after its required reproduction or retest supports that conclusion.
