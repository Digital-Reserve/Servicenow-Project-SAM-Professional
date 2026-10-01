# Week 00

Date range: 2026-10-01 to 2026-10-01

Primary objective: adopt the handover package into the project repository and verify every platform dependent claim online before any instance work.

## Planned activities

1. Analyse the handover ZIP.
2. Verify ServiceNow release calendar, PDI rules, SAM Professional activation on PDIs, Zurich SAM changes, data model, roles and jobs.
3. Create the repository structure and public summaries.
4. Design the synthetic enterprise and generate import files.
5. Add repository hygiene automation.

## Completed activities

1. Handover analysed; 21 files read in full.
2. Online verification completed against more than 50 sources; report in `docs/research/2026-10-01_platform_verification.md`.
3. Working package adopted as version 2 in `docs/` with corrections listed in `docs/HANDOVER_CHANGELOG.md`.
4. `README.md`, `IMPLEMENTATION.md`, `PROGRESS.md`, `evidence/README.md`, `exports/README.md` created.
5. Northstar Manufacturing design and generator created; files generated in `docs/synthetic_data/northstar/`.
6. `scripts/check_repo.sh`, `scripts/verify_exports.sh` and the CI workflow created; every workflow step was executed locally and passed.

## Configuration changed

| Area | Record or setting | Previous value | New value | Reason | Update set |
| --- | --- | --- | --- | --- | --- |
| none | no instance exists yet | | | | |

## Evidence captured

| Id | File | Proves | Date | Instance page | Sensitive data removed |
| --- | --- | --- | --- | --- | --- |
| W00_001 | `docs/research/2026-10-01_platform_verification.md` | Platform facts verified with sources | 2026-10-01 | not applicable | not applicable |

## Test results

| Test | Expected | Actual | Result | Defect |
| --- | --- | --- | --- | --- |
| J06 | No secrets in repository | `scripts/check_repo.sh` passed | Pass | |
| J07 | Repository checks pass | Local run passed | Pass | |
| K05 | Export verification runs | No release folders yet, script passes | Pass | |

## Metrics

| Metric | Value |
| --- | --- |
| Software installations | not applicable |
| Discovery models | not applicable |
| Normalization rate | not applicable |
| Entitlements | not applicable |

## Decisions

D009 to D017 recorded in `docs/10_DECISION_LOG.md`.

## Blockers

| Blocker | Impact | Owner | Next action | Status |
| --- | --- | --- | --- | --- |
| none | | | | |

## Risks identified

R9 workspace install on PDI, R10 Zurich withdrawal after Brazil GA, R11 Content Service unavailable, R12 demo data may not load. Recorded in `docs/03_PROJECT_PLAN.md`.

## Next week

1. Request the Zurich PDI on the Developer Site (Phase 1).
2. Verify the release and capture evidence.
3. Create the Week 01 update set (Phase 2).
4. Activate SAM Professional with demo data and validate (Phase 3).
5. Capture the baseline (Phase 4).

## Weekly status

Green
