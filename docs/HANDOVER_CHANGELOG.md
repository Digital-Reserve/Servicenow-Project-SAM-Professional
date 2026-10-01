# Handover changelog

This repository started from the handover package `servicenow_sam_pro_zurich_handover.zip` (prepared 1 October 2026, package version 1). The package was adopted into `docs/` as version 2 on 1 October 2026 after an online verification pass. The verification evidence is in `docs/research/2026-10-01_platform_verification.md`.

## Version 2, 1 October 2026

### Structural changes

* The working package now lives in `docs/` of the project repository instead of a detached ZIP. Decision D010.
* The repository name is `Servicenow-Project-SAM-Professional` under the Digital-Reserve organisation, not `servicenow_sam_pro_zurich`. Decision D009.
* `project_state.json` moved to `docs/project_state.json`.
* Weekly records live in `docs/weekly/` using `WEEK_TEMPLATE.md`.
* A synthetic data design and a deterministic generator were added under `docs/synthetic_data/` and `scripts/`. Decision D015.
* Repository hygiene automation was added: `scripts/check_repo.sh`, `scripts/verify_exports.sh` and the GitHub Actions workflow `.github/workflows/repo-checks.yml`. Decision D016.

### Content corrections driven by research

| File | Change | Reason |
| --- | --- | --- |
| 00, 01, 02, 11 | Phase 3 now documents the Developer Site activation label, the known failure and retry pattern, and a three option fallback for a missing Software Asset Workspace. | Workspace is repeatedly reported missing on PDIs, including a Zurich PDI in 2026. |
| 02, 11 | Phase 6 rescoped from "Configure Content Service" to "Normalization on a PDI". | Content Service setup is not installed on PDIs; content service features are restricted to licensed customer environments. |
| 02 | Phase 15 SaaS License Management is excluded for the PDI with a stated reason instead of optional. | Store application reported unavailable on PDIs. |
| 01, 03, 10 | Release calendar updated: Australia (GA 5 May 2026) and Brazil (early availability 24 September 2026) exist; Zurich is N-1 today and becomes N-2 at Brazil GA. Decision D014 sets what to do if Zurich is no longer selectable. | Verified release calendar. |
| 02, 09 | Data model expanded with allocation, reconciliation result, reclamation and content tables; entitlement Draft to Published rule added; scheduled job names added. | Verified from ServiceNow staff blogs and community references. |
| 02, 12 | Zurich specific notes: reclamation automation migrated to Flow Designer, Microsoft Hyper-V support, SQL Server availability group compliance, Organizational license positions. | Zurich What's New. |
| 06 | Update set export requires the Complete state; ServiceNow Studio Source Control exists in Zurich and the Studio plugin may need an update on a PDI. | Verified. |
| 08 | New tests B06 (workspace install path recorded), C05 (Content Service limitation documented), J07 (automated repository checks), K05 (export checksums). | Align tests with the corrected plan. |
| 09 | Source reference catalog rewritten with URLs and verification dates. | Previous catalog had titles only. |

### Unchanged

The project goals, the Zurich requirement, the synthetic data policy, the minimal public structure, the security posture for visitor access and the acceptance principle (nothing is complete until tested) are unchanged.
