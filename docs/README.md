# TravelMate system documentation

This folder contains supporting registers, diagrams, source comparison records and test execution guidance for the TravelMate frontend and backend. The standalone SPMP, SRS, SDD and STD Markdown files have been removed at the owner's request.

## Document control

| Field | Value |
| --- | --- |
| Version | 2.1 |
| Issued | 16 October 2026 |
| Status | For project review; approval pending |
| System boundary | `travelmate-frontend-new` and `travelmate-backend-api` together |
| Behavioral review | Source-reconciled package dated 15 October 2026 |
| Source comparison | 16 October 2026; recorded application files match the earlier review; listed fixture and documentation differences remain |
| Previous package | [15 October 2026 deliverables](../TravelMate-Documentation-2026-10-15/deliverables/README.md) |
| Prepared by and approvers | Project team to confirm names and responsibilities |

The supporting files preserve requirement, feature and test identifiers from the earlier review. The previous documentation package remains archived separately.

## Scope and evidence

TravelMate supports public destination discovery and the traveler workflow Define → Generate → Understand → Refine → Save → Reopen, with saved-trip maps, managed activities, actual visited-place records and administrator functions. Planning accepts 1–31 inclusive days. Budget totals are deterministic; unknown prices remain unpriced. Crowd context is an estimate. Accommodation suggestions, retained booking-related schema and simulated payment behavior do not establish a commercial booking or payment service.

The documents distinguish expected behavior, inspected code paths, historical regression results and acceptance results. The execution register records 152 frontend and 521 backend isolated passes on 15 October 2026, with exclusions. No tests were rerun to publish this revision. All 133 specified acceptance procedures remain **Not executed** until their own actual results and evidence are recorded. Names, approved dates, costs, service targets and signatures awaiting confirmation remain explicit open items.

The local source baseline is frontend `40422d45e53ea66637aab0acf8651d25a2b572b7` and backend `51c867207517c18e007952ea2c2eda8e4350e95f`. It does not include the newer remote-only commits. See [source comparison and revision policy](SOURCE_BASELINE.md).

## Supporting registers

| Register | Coverage |
| --- | --- |
| [Feature inventory](registers/feature-inventory.csv) | 93 feature entries, roles, source flows, scope limits and implementation classifications |
| [Requirements traceability](registers/requirements-traceability.csv) | 113 requirements mapped to features, design, implementation and test cases |
| [Quality requirements](registers/quality-requirements.csv) | 20 quality requirements with evidence limits |
| [Test cases](registers/test-cases.csv) | 93 feature, 20 boundary/failure and 20 quality procedures |
| [Database fields](registers/database-fields.csv) | Model fields, types and constraints |
| [API routes](registers/api-routes.csv) | 50 actual HTTP operations reconciled against documentation |
| [Pages](registers/pages.csv) | User pages, route handlers and framework boundaries |
| [Processes](registers/processes.csv) | User and technical process inventory |
| [Verification executions](registers/verification-executions.csv) | Dated historical results and explicit exclusions |
| [Source comparison](registers/source-comparison.json) | File hashes compared with the earlier review |

CSV files retain their original content and dates. Their `SDD` and `UM` section references refer to the design document and user manual in the archived package. Historical evidence paths in CSV files are relative to the previous package or workspace, not this folder. See [the source baseline](SOURCE_BASELINE.md) for their locations.

## Diagrams and execution records

All eleven diagrams remain as editable Mermaid sources and SVG companions in [diagrams](diagrams/).

Use [the test execution template](TEST_EXECUTION_TEMPLATE.md) to record a new run. Review [open administrative details and acceptance concerns](OPEN_ITEMS.md) before sign off. Changes to a requirement must update its design mapping, test case and traceability row together.
