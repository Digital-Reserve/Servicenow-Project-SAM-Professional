# Project history

| Date | Step |
| --- | --- |
| 1 October 2026 | A handover package of 21 files (`servicenow_sam_pro_zurich_handover.zip`) from an earlier session described a ten-week plan. Every platform claim in it was checked online ([research of 1 October](platform_research_2026-10-01.md)) and it was adopted into a repository. |
| 1 October 2026 | The owner asked for one continuous guide sized for one or two sessions a week, with sandbox limits solved instead of skipped. The package was merged into a single guide of eight sessions and a case study. |
| 15 October 2026 | First working session. The owner asked for a repository that management can read, a plain-language document library, a tracker, and an offline app that guides every step. The guide became the offline app; the tracker is produced by the app; the repository was packaged for the company GitHub. A short re-check of the platform ([research of 15 October](platform_research_2026-10-15.md)) corrected the server processor data and confirmed the Zurich workspace and reclamation labels. |

## Where the original handover content lives now

| Original file | Now |
| --- | --- |
| `00_START_HERE.md`, `01_AI_HANDOVER.md` | `README.md`, `docs/04_our_project.md` |
| `02_IMPLEMENTATION_GUIDE.md` (21 phases) | The guide app, stages 0 to 7 (`app/`), readable in `docs/build_guide.md` |
| `03_PROJECT_PLAN.md` (10 weeks, risks) | `docs/04_our_project.md`, `tracker/risks_and_issues.md` |
| `04_WEEKLY_PROGRESS_SYSTEM.md` | The session report and end-of-session pack in the app, `tracker/` |
| `05_GITHUB_REPOSITORY_DESIGN.md` | `README.md` and the folder layout |
| `06_EXPORT_BACKUP_RECOVERY.md` | Stage 6 in the app, `docs/10_recovery_plan.md`, `exports/README.md` |
| `07_VISITOR_ACCESS_SECURITY.md` | Stage 6 in the app, `docs/09_security_and_data_rules.md` |
| `08_TEST_ACCEPTANCE.md` | The checks at the end of every stage, and the acceptance checklist in Stage 7 |
| `09_SOURCE_REFERENCE_CATALOG.md` | `docs/reference/platform_research_2026-10-01.md` |
| `10_DECISION_LOG.md` | `tracker/decisions.md` |
| `11_EXECUTION_CHECKLIST.md` | The steps in the app |
| `12_DEMO_AND_INTERVIEW_GUIDE.md` | `docs/case_study.md` (five-minute demo) and Stage 7 |
| `13_NEXT_SESSION_PROMPT.txt` | Not needed: the app shows the next step |
| `project_state.json` | `tracker/progress.json`, written by the app |
| `repository_template/` | The root of this repository |

## Main changes against the original plan

- Ten weeks became eight short stages, about 12 to 15 hours of work.
- Sandbox limits are solved inside the stages and presented as part of the work.
- Data is loaded by scripts that act as a scanning tool; the manual import is an optional exercise.
- The release rule allows a time-boxed move to Australia so the case study finishes.
- The visitor password is shared with reviewers on request rather than published in the README.
