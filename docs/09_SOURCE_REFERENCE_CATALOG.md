# Source Reference Catalog

## Purpose

Primary references that inform the handover, with the date they were last verified. The full verification narrative and the complete URL list are in `research/2026-10-01_platform_verification.md`.

Because ServiceNow documentation changes, verify current versions before executing a step that depends on availability or licensing.

## Official ServiceNow documentation and Developer Site

| Reference | Used for | Verified |
| --- | --- | --- |
| Zurich PDI Guide, developer.servicenow.com | Request, waitlist, hibernation, 10 day reclamation, plugin activation paths, reset, release | 2026-10-01 |
| Zurich PDI FAQ, developer.servicenow.com | Earlier release and upgrade advice, premium plugin rule, Store limitation, backup advice | 2026-10-01 |
| Install Software Asset Management Guided Experiences, Zurich (KB2383809) | `com.sn_samp_master_ws` definition, `com.sn_sam_playbook` dependencies, roles | 2026-10-01 |
| Zurich release notes and New features summary | Zurich SAM features | 2026-10-01 |
| Zurich IT Asset Management documentation root | SAM documentation set for Zurich | 2026-10-01 |
| View normalization suggestions, Zurich | Normalization suggestion workflow | 2026-10-01 |
| Link an application to source control | Source control scope and limits | 2026-10-01 |
| Software Normalization Deep Dive (KB0859819) | Normalization statuses | 2026-10-01 |
| SAM Reclamation Candidates Not Created (KB2593329) | Reclamation prerequisites | 2026-10-01 |
| ServiceNow Store listings for Guided Experiences and SaaS License Management | Application identity | 2026-10-01 |

## ServiceNow employee blogs and community articles

| Reference | Used for | Verified |
| --- | --- | --- |
| What's New in Zurich Release for Software Asset Management | Zurich features, Flow Designer migration, biweekly content updates | 2026-10-01 |
| Review Software Entitlements (June 2025) | Draft to Published rule, required fields, packs | 2026-10-01 |
| Review Software Installs Normalization (June 2025) | Normalization statuses, manual normalization | 2026-10-01 |
| ServiceNow SAM Pro Data Model | Data flow from installation to reclamation | 2026-10-01 |
| List of ServiceNow SAM Tables | Table names | 2026-10-01 |
| How to Request and Install SAM Professional Plugins | Plugin ids and order | 2026-10-01 |
| Software Asset Management FAQ Guide | Classic interface limited support, Content Service, publisher packs | 2026-10-01 |
| Developer Site incident, July 2026 | PDI availability history | 2026-10-01 |
| Brazil PDI announcement, September 2026 | Brazil PDI availability from 24 September 2026 | 2026-10-01 |

## Community threads

Used only as supporting evidence of real PDI behaviour. They must not override official documentation.

| Theme | Threads | Verified |
| --- | --- | --- |
| SAM Pro activation on a PDI succeeds, often after retries | Install SAM Pro on PDI (2024), PDI issue SAMPro not activated (June 2026), Issue Activating SAM Professional Plugins on PDI (2025), PDI instance not loading SAM and demo data (2025) | 2026-10-01 |
| Software Asset Workspace missing on PDIs and remedies | Zurich thread (2026), Xanadu thread (2024), May 2025 thread, August 2023 thread | 2026-10-01 |
| Content Service not on PDIs | Install SAM Pro on PDI replies (December 2024) | 2026-10-01 |
| SaaS License Management not on PDIs | Enabling SaaS License Management on developer instance (2024) | 2026-10-01 |
| Zurich and Australia both selectable, waitlists of days | PDI Waitlist (2026), Unable to provision Australia PDI (July 2026) | 2026-10-01 |
| Studio Source Control on a Zurich PDI | GitHub access source control for Zurich PDI (2025 to 2026) | 2026-10-01 |
| Roles | SAM roles and responsibilities | 2026-10-01 |

## Third party calendars

Used only to corroborate release dates: snowcoder.ai release cycle 2026, nowben.com Brazil dates, perspectium.com Zurich dates. Verified 2026-10-01.

## Verification rule for future sessions

For any claim involving current PDI availability, plugin availability, licensing, Store application availability, or release support, perform a fresh web verification before implementation and add a dated report to `research/`.
