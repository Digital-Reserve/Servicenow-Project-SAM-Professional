# Weekly Progress System

## Purpose

This file defines how progress must be documented throughout the implementation.

Detailed weekly records live in `docs/weekly/`. The public `PROGRESS.md` holds the condensed milestone view.

## Creating a weekly record

1. Copy `docs/weekly/WEEK_TEMPLATE.md` to `docs/weekly/W<nn>_<yyyy-mm-dd>_<short_title>.md`.
2. Fill every section. Write "none" rather than leaving a section empty.
3. Copy decisions into `10_DECISION_LOG.md`.
4. Update `docs/project_state.json`.
5. Update `PROGRESS.md` only when a milestone status changes.

## Weekly record sections

* Week number, date range, primary objective
* Planned activities
* Completed activities
* Configuration changed: area, record or setting, previous value, new value, reason, update set name
* Evidence captured: identifier, file name, what it proves, date, instance page, sensitive information removed
* Test results: identifier, expected, actual, pass or fail, defect reference
* Metrics: installation count, discovery model count, normalization rate, entitlement count, products reconciled, compliant, under licensed, over licensed, removal candidates, potential savings
* Decisions
* Blockers: blocker, impact, owner, next action, status
* Risks identified
* Next week
* Weekly status: Green, Amber or Red

Green means the phase is progressing and no major blocker threatens the objective. Amber means a significant issue exists but a path forward is known. Red means the current phase cannot complete without resolving a blocker.

## Evidence naming convention

Use `W01_001_PDI_Zurich_Release.png`, `W01_002_SAM_Workspace.png`, `W03_001_Normalization_Overview.png`, `W05_001_Reconciliation_Compliant.png`.

Use underscores rather than spaces. Store files in `evidence/`.

Do not place passwords, tokens, cookies, instance session values or private data in screenshots. Crop the browser address bar if it contains session parameters.

## Weekly Git discipline

At the end of every week:

1. Update the weekly record.
2. Update `IMPLEMENTATION.md` only if a meaningful milestone was reached.
3. Add selected evidence.
4. Export any completed update set into `exports/release_<nn>/` with a manifest and checksums.
5. Update `docs/project_state.json`.
6. Run `scripts/check_repo.sh` and `scripts/verify_exports.sh`.
7. Commit with a clear message, for example `Complete week 05 reconciliation milestone`.
8. Push.

## Final public progress summary

At final release, condense the project into milestone, outcome, evidence and status in `PROGRESS.md`:

1. Zurich environment
2. SAM Professional activation
3. Inventory and normalization
4. Models and entitlements
5. Reconciliation
6. Publisher scenario
7. Optimization
8. Visitor hardening
9. Export and recovery
10. Final acceptance
