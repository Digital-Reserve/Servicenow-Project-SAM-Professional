# ServiceNow SAM Professional on Zurich

A portfolio implementation of ServiceNow Software Asset Management Professional on the Zurich release, built in a Personal Developer Instance with synthetic data only.

Project status: repository and research baseline complete, instance work not started (1 October 2026).

## Live demonstration

| Item | Value |
| --- | --- |
| Instance | not yet provisioned |
| Release | Zurich (required) |
| Visitor account | not yet created |
| Demo status | not available |

The live environment will be a Personal Developer Instance. It hibernates when idle, can be reclaimed after ten days of inactivity, and availability is not guaranteed.

## What this project demonstrates

| Capability | Status | Evidence |
| --- | --- | --- |
| Zurich PDI provisioned and verified | Not started | |
| SAM Professional activated (`com.sn_samp_master_ws`) | Not started | |
| Software Asset Workspace | Not started | |
| Software inventory | Not started | |
| Discovery model normalization (within PDI limits) | Not started | |
| Software models | Not started | |
| Published software entitlements | Not started | |
| Reconciliation with compliant, shortage and surplus positions | Not started | |
| Microsoft per core publisher scenario | Not started | |
| Reclamation and optimization scenario | Not started | |
| Management views | Not started | |
| Least privilege visitor access | Not started | |
| Export and recovery bundle | Not started | |
| Platform verification research | Done | [report](docs/research/2026-10-01_platform_verification.md) |
| Synthetic enterprise design and data | Done | [design](docs/synthetic_data/README.md) |

No capability is marked done until it has been verified in the instance.

## Architecture

Discovered software installation, to discovery model, to normalization, to software model, to entitlement, to reconciliation, to optimization. The technical record is in [IMPLEMENTATION.md](IMPLEMENTATION.md).

## Demonstration scenarios

The synthetic enterprise is Northstar Manufacturing: 60 users, 45 workstations, 12 servers and five demonstration products.

1. Compliant position: Adobe Acrobat Pro, per user.
2. License shortage: Microsoft SQL Server 2022 Standard, per core.
3. License surplus: Microsoft Visio Professional 2021, per device.
4. Reclamation opportunity: Microsoft Project Professional 2021, installed but unused.
5. Publisher specific calculation: Microsoft Windows Server 2022 Standard, per core with Microsoft minimums.

## Known platform limits on a PDI

* The SAM Content Service is not available, so normalization uses the shipped content library, demo data and manual normalization.
* SaaS License Management cannot be installed and is out of scope.
* The Software Asset Workspace may need a manual install after activation; the fallback is documented.

## Documentation

* [IMPLEMENTATION.md](IMPLEMENTATION.md) technical implementation record
* [PROGRESS.md](PROGRESS.md) milestone record
* [docs/00_START_HERE.md](docs/00_START_HERE.md) working package for the implementer

## Exports and evidence

`exports/` contains project owned recovery artifacts only. It never contains ServiceNow proprietary SAM Professional source.

`evidence/` contains selected implementation screenshots.

## Security and data

No real client data, personal data, software keys, administrative credentials, or integration secrets are used. All data is ServiceNow demo data or synthetic. Every push runs an automated secret and content check.

## Recovery

If the instance is lost, the project can be rebuilt from this repository: request a Zurich PDI, activate SAM Professional with demo data, import the project owned update sets and synthetic data in the documented order, publish entitlements and run reconciliation. See [docs/06_EXPORT_BACKUP_RECOVERY.md](docs/06_EXPORT_BACKUP_RECOVERY.md).
