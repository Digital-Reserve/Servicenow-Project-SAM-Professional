# Synthetic enterprise: Northstar Manufacturing

All data in this folder is invented for the portfolio. The company, people, devices, purchases and part numbers are fictional. Email addresses use the reserved `.example` domain. Publicly known product names are used only for learning.

Generated files live in `northstar/` and are produced by `scripts/generate_synthetic_data.py`. Do not edit the CSV files by hand; change the generator and re-run it. The CI workflow fails if the files drift from the generator.

## Estate

| Object | Count | Notes |
| --- | --- | --- |
| Company | 1 | Northstar Manufacturing, Netherlands |
| Locations | 3 | HQ Rotterdam, Plant North Groningen, Plant South Eindhoven |
| Departments | 6 | |
| Users | 60 | 45 have a workstation |
| Workstations | 45 | Windows 11, 8 cores, `NSM-WS-001` to `NSM-WS-045` |
| Servers | 12 | 4 Windows application hosts (2 processors, 16 cores), 3 SQL servers (2 processors, 8 cores), 5 Linux |
| Software installations | 248 | 113 licensable, 135 free software for normalization demonstration |
| Software models | 5 | one per scenario |
| Entitlements | 5 | one per scenario |
| Allocations | 40 | Adobe Acrobat Pro to users |

## Scenarios

| Scenario | Product | Metric | Owned | Consumed | Expected position |
| --- | --- | --- | --- | --- | --- |
| A, compliant | Adobe Acrobat 2024 Pro | Per Named User | 40 | 40 users with an installation and an allocation | Compliant |
| B, shortage | Microsoft SQL Server 2022 Standard | Per Core, 2 core packs, 4 core minimum per server | 16 cores (8 packs) | 3 servers x 8 cores = 24 cores | Shortage of 8 cores, true up 4 packs |
| C, surplus | Microsoft Visio 2021 Professional | Per Device | 60 | 35 workstations | Surplus of 25 rights |
| D, reclamation | Microsoft Project 2021 Professional | Per Device | 30 | 28 workstations, 12 not used for more than 90 days | Compliant, 12 reclamation candidates |
| E, publisher logic | Microsoft Windows Server 2022 Standard | Per Core, 2 core packs, 8 per processor and 16 per server minimums | 88 cores (44 packs) | 4 x 16 + 3 x 8 = 88 cores | Compliant |

Costs are synthetic list prices in EUR and exist only so that true up and savings figures can be shown.

## Files

| File | Target | Key columns |
| --- | --- | --- |
| `companies.csv` | `core_company` | name, city, country |
| `locations.csv` | `cmn_location` | name, city, country, company |
| `departments.csv` | `cmn_department` | name, company |
| `users.csv` | `sys_user` | user_name, first_name, last_name, email, department, location, company |
| `devices.csv` | `cmdb_ci_computer` (Computer) and `cmdb_ci_server` (Server) | name, device_class, os, cpu_count, cpu_core_count, assigned_to |
| `software_models.csv` | `cmdb_software_product_model` | publisher, product, version, edition, license_metric |
| `software_installations.csv` | `cmdb_sam_sw_install` | device_name, discovered_publisher, discovered_product, discovered_version, install_date, last_used |
| `entitlements.csv` | `alm_license` | software_model, license_metric, purchased_rights, rights_per_pack, packs, unit_cost |
| `allocations.csv` | `alm_entitlement_user` | entitlement, allocated_to, quantity |

## Loading rules

1. Use ServiceNow demo data first. Load these files only for scenarios that demo data does not cover.
2. Load through Import Sets with a transform map per file, in the order listed above. Record each transform map in the weekly record and export it in the update set.
3. Core counts on servers must be populated before reconciliation, otherwise per core results are wrong.
4. The `last_used` column exists to drive the reclamation scenario. Confirm in the instance which usage field the reclamation rule evaluates before relying on it.
5. Create entitlements in Software Asset Workspace rather than importing them if the import path does not set the required fields; then publish them.
6. Never add real people, real serial numbers, real license keys or real purchase orders.
