# TravelMate test execution record

Copy this template for each execution. Replace bracketed fields with observed facts, link sanitized evidence and retain the original record when rerunning a failed case. A missing prerequisite means Blocked or Not executed, not Pass.

## Run details

| Field | Record |
| --- | --- |
| Execution ID | [Unique run ID] |
| Tester | [Name] |
| Start and end | [Date, time and timezone] |
| Environment | [Local disposable, CI, staging or other approved environment] |
| Frontend commit | [Full SHA] |
| Compatible backend commit | [Full SHA] |
| Document baseline | [Version and requirements revision] |
| Browser and device | [Browser version, OS, viewport and device] |
| Database and providers | [Disposable database identifier, migration state and mock or actual providers; no credentials] |
| Setup | [Fixtures, account roles, test mail sink and prerequisite checks] |

## Case result

| Field | Record |
| --- | --- |
| Case ID | [TM-TC, TM-XT or TM-QT identifier] |
| Requirements | [TM-FR or TM-NFR identifiers] |
| Preconditions | [Observed state and fixture IDs] |
| Steps executed | [Exact steps, including deviations from the STD] |
| Expected result | [Expected outcome and acceptance bounds] |
| Actual result | [Observed UI, HTTP and persisted state, where applicable] |
| Status | [Pass, Fail, Blocked or Not executed] |
| Evidence | [Sanitized screenshots, request or response, logs and database assertion references] |
| Defect | [Issue ID, severity and reproduction, or none observed] |
| Cleanup | [Disposable records and resources removed or reset; observed outcome] |
| Retest | [New execution ID and related fix commit, where applicable] |

## Run summary and decision

| Measure | Record |
| --- | --- |
| Planned cases | [Count and IDs] |
| Passed | [Count and IDs] |
| Failed | [Count and IDs] |
| Blocked | [Count, IDs and missing prerequisites] |
| Not executed | [Count and IDs] |
| Open defects | [IDs and disposition] |
| Reviewer | [Name and review date] |
| Decision | [Accepted scope, rejected scope or further work required] |

Check that planned cases equal passed plus failed plus blocked plus not executed. Link this record from the execution register. Update test-case statuses only for procedures actually executed, and keep unit-suite counts separate from acceptance-case counts. Exclude passwords, cookies, session tokens, provider keys, real GPS traces and personal traveler data from evidence.
