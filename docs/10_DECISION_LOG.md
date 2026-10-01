# Decision Log

| Id | Date | Decision | Reason | Status |
| --- | --- | --- | --- | --- |
| D001 | 2026-10-01 | Use Zurich as the required ServiceNow release family. | The project is explicitly intended to demonstrate SAM Professional on Zurich. | Approved |
| D002 | 2026-10-01 | Use a ServiceNow PDI as the live portfolio and learning environment, not as a production system. | Suitable for experimentation; not durable. | Approved |
| D003 | 2026-10-01 | Prefer `com.sn_samp_master_ws` for Zurich SAM Professional activation. | Zurich master workspace activation combining SAM Professional master components and Software Asset Workspace. Verified 2026-10-01. | Approved |
| D004 | 2026-10-01 | Use Software Asset Workspace as the primary user experience. | Classic interface has limited support since Xanadu. | Approved |
| D005 | 2026-10-01 | Use only synthetic and ServiceNow supplied demo data. | Public portfolio work must not contain employer, client, or personal data. | Approved |
| D006 | 2026-10-01 | Keep the public facing repository surface minimal: README, IMPLEMENTATION, PROGRESS, exports, evidence. | Immediately understandable to interviewers and management. | Approved |
| D007 | 2026-10-01 | Do not export or redistribute the licensed SAM Professional product. | GitHub holds only project owned customizations, safe exports, documentation, evidence. | Approved |
| D008 | 2026-10-01 | Use a dedicated least privilege visitor experience for public demonstration. | A public visitor must not receive administrative or destructive access. | Approved |
| D009 | 2026-10-01 | Repository is `Digital-Reserve/Servicenow-Project-SAM-Professional`, replacing the suggested name `servicenow_sam_pro_zurich`. | The organisation repository already existed and was supplied by the owner. | Approved |
| D010 | 2026-10-01 | Keep the handover working package, research and weekly records inside the repository under `docs/`, and automation under `scripts/` and `.github/`. | The repository is the durable project record; a detached ZIP would be lost with a session. The top level stays minimal. | Approved |
| D011 | 2026-10-01 | Phase 6 is rescoped to normalization without the Content Service. | Content Service setup is not installed on PDIs and content features are restricted to licensed customers. | Approved |
| D012 | 2026-10-01 | SaaS License Management is excluded from scope. | Separate Store application reported unavailable on PDIs. Re-evaluate only if a fresh verification shows otherwise. | Approved |
| D013 | 2026-10-01 | If Software Asset Workspace cannot be installed on the PDI after the Phase 3 fallback options, continue on the classic SAM interface and retry the workspace weekly. | Workspace installation on PDIs is unreliable; the classic interface remains active in Zurich. | Approved, invoke only if needed |
| D014 | 2026-10-01 | Request the Zurich PDI immediately. If Zurich is not selectable on the Developer Site, record the blocker and ask the project owner to choose between waiting, or re-baselining the project on Australia (the current N release) with all documentation relabelled. Never label a non Zurich instance as Zurich. | Australia reached general availability in May 2026 and Brazil general availability is expected in Q4 2026, after which Zurich is N-2 and may be withdrawn from the PDI list. | Approved, owner decision pending only if triggered |
| D015 | 2026-10-01 | Synthetic data is generated deterministically by `scripts/generate_synthetic_data.py` and loaded only through Import Sets where demo data does not already cover a scenario. | Reproducible, reviewable, dependency aware, avoids direct table manipulation. | Approved |
| D016 | 2026-10-01 | Automated repository checks run on every push: secret and forbidden content scan, link check, project state validation, synthetic data drift check, export checksum verification. | Risk R6 and the weekly secret review requirement. | Approved |
| D017 | 2026-10-01 | No open source license file is added until the owner chooses one. | Licensing the documentation and synthetic data is an owner decision. | Open |

## Decision template

| Id | Date | Decision | Reason | Alternatives considered | Impact | Status |
| --- | --- | --- | --- | --- | --- | --- |
