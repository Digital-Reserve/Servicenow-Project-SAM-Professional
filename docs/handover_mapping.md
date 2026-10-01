# Where the original handover went

The project started from `servicenow_sam_pro_zurich_handover.zip` (1 October 2026), a 21 file package written for a ten week plan. On the same day the owner asked for one continuous guide sized for one or two sessions a week, so the package was consolidated. This table says where each original file's content lives now. Git history holds the full intermediate version.

| Original file | Now |
| --- | --- |
| `00_START_HERE.md`, `01_AI_HANDOVER.md` | `README.md`, `GUIDE.md` introduction, Appendix F |
| `02_IMPLEMENTATION_GUIDE.md` (21 phases) | `GUIDE.md` Sessions 1 to 7 |
| `03_PROJECT_PLAN.md` (10 weeks, risk register) | `GUIDE.md` session map; risks folded into each session's "If something goes wrong" |
| `04_WEEKLY_PROGRESS_SYSTEM.md` | `PROGRESS.md` session log template |
| `05_GITHUB_REPOSITORY_DESIGN.md` | `README.md` repository layout, decision G06 |
| `06_EXPORT_BACKUP_RECOVERY.md` | `GUIDE.md` Session 6 step 6 and Appendix D, `exports/README.md` |
| `07_VISITOR_ACCESS_SECURITY.md` | `GUIDE.md` Session 6 steps 4 and 5, Appendix C |
| `08_TEST_ACCEPTANCE.md` | Checks in every session, `GUIDE.md` Appendix E |
| `09_SOURCE_REFERENCE_CATALOG.md` | `docs/research/2026-10-01_platform_verification.md` section 9 |
| `10_DECISION_LOG.md` | `GUIDE.md` Appendix G |
| `11_EXECUTION_CHECKLIST.md` | Merged into the session steps |
| `12_DEMO_AND_INTERVIEW_GUIDE.md` | `CASE_STUDY.md` five minute demonstration |
| `13_NEXT_SESSION_PROMPT.txt` | `GUIDE.md` Appendix F |
| `project_state.json` | `docs/project_state.json` |
| `repository_template/` | Root files of this repository |

Changes of substance from the original package:

* Ten weeks became eight sessions of two to three hours.
* PDI limits are solved inside the sessions and presented as part of the work instead of being excluded.
* The release rule allows a time boxed fallback to Australia (decision G01) so the case study finishes; the original required an explicit owner change for any release switch. The owner can reverse this by editing G01.
* Synthetic data is loaded through Import Sets as the primary inventory; demo data is context, not a dependency.
