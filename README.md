# ServiceNow SAM Professional on Zurich: a case study

An end to end implementation of ServiceNow Software Asset Management Professional on the Zurich release, built in a Personal Developer Instance with synthetic data, in eight short sessions. The outcome is a case study for interviewers and management: from raw installations to published license positions, a quantified true up exposure, reusable rights and a reclamation pipeline.

| | |
| --- | --- |
| Status | Session 0 of 7 next. Repository, research and data are ready. |
| Release | Zurich |
| Live instance | pending |
| Visitor access | pending, read only, synthetic data only |
| Case study | [CASE_STUDY.md](CASE_STUDY.md) |
| How it was built | [GUIDE.md](GUIDE.md), one continuous guide |
| Session log | [PROGRESS.md](PROGRESS.md) |

## The story in one table

Northstar Manufacturing, a synthetic company with 60 staff, 45 workstations and 12 servers, runs five products that together show every kind of license position.

| Scenario | Product | Position | Money story |
| --- | --- | --- | --- |
| A | Adobe Acrobat 2024 Pro, per named user | Compliant | Subscription renewal tracked |
| B | Microsoft SQL Server 2022 Standard, per core | Shortage of 8 cores | EUR 15,780 true up exposure |
| C | Microsoft Visio 2021 Professional, per device | Surplus of 25 | EUR 14,475 of rights to reuse |
| D | Microsoft Project 2021 Professional, per device | Compliant, 12 unused | EUR 12,708 reclaimable |
| E | Microsoft Windows Server 2022 Standard, per core | Compliant | Microsoft core minimums applied |

## What is demonstrated

| Capability | Status | Evidence |
| --- | --- | --- |
| Zurich instance, SAM Professional, Software Asset Workspace | Session 1 | |
| Inventory of 248 installations through Import Sets, automatic discovery models | Session 2 | |
| Normalization measured before and after, without the Content Service | Session 3 | |
| Software models with discovery maps | Session 3 | |
| Published entitlements with cost, metric and allocations | Session 4 | |
| Reconciliation: compliant, shortage and surplus positions traced to source records | Session 4 | |
| Microsoft per core publisher logic | Session 5 | |
| Reclamation rule, removal candidates and savings on synthetic usage | Session 5 | |
| Management dashboard | Session 6 | |
| Read only visitor access, negative tested | Session 6 | |
| Export bundle with checksums and a recovery runbook | Session 6 | |
| Platform verification research | Done | [report](docs/research/2026-10-01_platform_verification.md) |
| Synthetic estate and data generator | Done | [data](data/northstar/README.md) |

Nothing is marked done until its evidence file exists in `evidence/`.

## Personal Developer Instance limits, and how each one is solved

| Limit | Solution |
| --- | --- |
| No Content Service | Shipped content library, normalization suggestions, manual normalization, rate measured |
| No discovery or usage feeds | Reproducible synthetic feeds loaded through Import Sets |
| SaaS License Management not installable | Subscription lifecycle shown with a subscription entitlement and renewals |
| Workspace may not install with activation | Documented install through Guided Experiences or the workspace application |

The full table is in `GUIDE.md`, Appendix A.

## Repository layout

| Path | Purpose |
| --- | --- |
| `GUIDE.md` | The implementation guide, sessions 0 to 7 and appendices |
| `CASE_STUDY.md` | The narrative for interviewers and management |
| `PROGRESS.md` | Session log and current status |
| `data/northstar/` | Synthetic dataset and its design |
| `evidence/` | Screenshots named by session |
| `exports/` | Recovery bundles with manifests and checksums |
| `scripts/` | Repository check, export verification, data generator |
| `docs/` | Platform verification research, project state, handover mapping |

## Security and data

All data is synthetic. No real client, employee, contract or key data is used. No administrator credentials, tokens or cookies are stored; every push runs a secret scan. The visitor account is read only and limited to synthetic data.
