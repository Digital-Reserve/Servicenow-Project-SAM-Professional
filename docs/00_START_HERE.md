# ServiceNow SAM Professional Zurich Implementation Handover

Package version: 2
Prepared: 1 October 2026 (version 1 as a ZIP, version 2 adopted into this repository the same day)

## Purpose

This folder is the complete working package for a portfolio grade ServiceNow Software Asset Management Professional implementation on a Zurich Personal Developer Instance.

It is written so that a new AI session or a human implementer can continue the project without the history of the previous conversation.

The intended outcome is:

1. Request and prepare a Zurich Personal Developer Instance.
2. Activate and validate Software Asset Management Professional.
3. Implement a realistic SAM operating model using synthetic and demo data.
4. Configure software inventory, normalization, models, entitlements, reconciliation, optimization, reporting, and selected publisher scenarios.
5. Record implementation progress every week.
6. Produce evidence suitable for interviews and management demonstrations.
7. Maintain a small and professional GitHub repository.
8. Maintain a live demonstration instance when possible.
9. Provide tightly restricted visitor access using only synthetic data.
10. Export all project owned configuration and evidence required to rebuild the portfolio implementation if the PDI is lost.

## Where things are in this repository

| Path | Purpose |
| --- | --- |
| `README.md`, `IMPLEMENTATION.md`, `PROGRESS.md` | Public facing summary, technical record, milestone record. |
| `docs/` | This working package. |
| `docs/research/` | Online verification reports. Read the latest one before touching the instance. |
| `docs/weekly/` | Weekly progress records. |
| `docs/synthetic_data/` | Synthetic enterprise design and generated import files. |
| `docs/project_state.json` | Machine readable project state. Update after every phase. |
| `evidence/` | Selected screenshots. |
| `exports/` | Project owned recovery artifacts. |
| `scripts/` | Repository hygiene, export verification, synthetic data generator. |

## Important platform boundary

A ServiceNow Personal Developer Instance is a learning and experimentation environment. It must not be treated as a production system or as the only copy of the project.

The durable project record is this repository plus exported project artifacts.

The PDI is the live portfolio demonstration environment.

## Critical Zurich activation

The documented Zurich activation is:

`com.sn_samp_master_ws`

It activates the SAM Professional master components (`com.sn_samp_master`) and the Software Asset Workspace Store application (`sn_sam_workspace`).

On a PDI the activation is started from the Developer Site, where it is labelled Software Asset Management Professional (also seen as Activate all Software Asset Management Professional plugins). The workspace frequently does not install with it on a PDI; Phase 3 of `02_IMPLEMENTATION_GUIDE.md` contains the verified fallback sequence.

The base SAM Professional capability is licensed ServiceNow software. Do not attempt to redistribute ServiceNow product source, publisher pack source, or proprietary platform content through GitHub.

Store only project owned configuration, exported update sets, selected safe data exports, documentation, evidence, and any custom scoped application created specifically for the portfolio.

## Read these files in this order

1. `01_AI_HANDOVER.md`
2. `research/2026-10-01_platform_verification.md`
3. `02_IMPLEMENTATION_GUIDE.md`
4. `03_PROJECT_PLAN.md`
5. `04_WEEKLY_PROGRESS_SYSTEM.md`
6. `05_GITHUB_REPOSITORY_DESIGN.md`
7. `06_EXPORT_BACKUP_RECOVERY.md`
8. `07_VISITOR_ACCESS_SECURITY.md`
9. `08_TEST_ACCEPTANCE.md`
10. `09_SOURCE_REFERENCE_CATALOG.md`
11. `10_DECISION_LOG.md`
12. `11_EXECUTION_CHECKLIST.md`
13. `12_DEMO_AND_INTERVIEW_GUIDE.md`
14. `13_NEXT_SESSION_PROMPT.txt`
15. `project_state.json`
16. `HANDOVER_CHANGELOG.md`

## Definition of project completion

The project is complete only when all of the following are true:

1. Zurich PDI is available and accessible.
2. SAM Professional and Software Asset Workspace are active (or the documented classic interface fallback is in force with decision D013 recorded).
3. Core SAM roles are validated.
4. Normalization is validated as far as a PDI permits, with the Content Service limitation documented.
5. A documented software inventory exists.
6. Software discovery models are visible and normalization behavior is demonstrated.
7. Software models and software entitlements exist and entitlements are published.
8. At least one complete reconciliation scenario is demonstrable.
9. At least one compliance or optimization scenario is demonstrable.
10. At least one publisher focused scenario is documented.
11. Dashboards or workspace views tell a coherent management story.
12. Visitor access has been hardened and verified.
13. No client data, personal data, secrets, or privileged credentials are in the public repository.
14. A complete export bundle exists and `scripts/verify_exports.sh` passes.
15. GitHub contains a concise README, implementation summary, progress record, exports area, and evidence area.
16. Final acceptance testing has passed.
17. The repository and instance can be demonstrated by following only the published instructions.

## What the next session must do first

1. Read all handover files.
2. Read `project_state.json`.
3. Read the latest report in `research/`. If it is older than 30 days, or if a release event has happened since (for example Brazil general availability), run a fresh verification of the Developer Site release list and SAM Professional activation availability and add a new dated report.
4. Verify that Zurich is still selectable on the Developer Site. If it is not, apply decision D014.
5. Do not assume a plugin activation succeeded until the application, roles, scheduled jobs, tables, and workspace are verified.
6. Record every completed action in the weekly progress file and project state.
7. Capture evidence after every major milestone.
8. Run `scripts/check_repo.sh` before every commit.
