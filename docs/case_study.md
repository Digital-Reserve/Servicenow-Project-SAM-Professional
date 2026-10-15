# Case study: Software Asset Management Professional on ServiceNow Zurich

Status: in progress since 15 October 2026. Sections marked "filled in Stage N" are completed when that stage is done. No result is claimed before its screenshot exists in the evidence folder.

## Summary

Northstar Manufacturing, an invented mid-sized manufacturer with 60 staff, 45 laptops and 12 servers, had no view of what software was installed, what it owned, or where it was exposed. This project implemented ServiceNow Software Asset Management Professional on the Zurich release in a personal sandbox. It took the company from raw installation data to published license positions, a quantified audit exposure, quantified reusable licenses and a reclamation pipeline, in eight short working stages.

## Headline results (filled in Stage 7)

Replace this table with the one from the guide app: Session report, Copy results table.

| Measure | Planned result |
| --- | --- |
| Software installations under management | 248 |
| Northstar software names clean after normalization | 8 of 8 |
| License positions published | 5 |
| Audit exposure found (SQL Server) | EUR 15,780 |
| Licenses available for reuse (Visio) | EUR 14,475 |
| Value that can be reclaimed (Project) | EUR 12,708 |

## Context and objective

Management asked three questions: are we compliant, where are we overspending, and can we prove it in an audit? The objective was a working SAM operating model that answers all three from one system, with evidence, and that can be rebuilt from documentation if the environment is lost.

## Environment and constraints

| Item | Choice |
| --- | --- |
| Platform | ServiceNow Zurich, Personal Developer Instance |
| Product | Software Asset Management Professional (`com.sn_samp_master_ws`) with the Software Asset Workspace |
| Vendor rules used | Microsoft publisher pack |
| Data | Invented, created by scripts kept in the repository |
| Pace | Eight stages in sessions of 2 to 3 hours, one or two a week |

A personal sandbox lacks the Content Service, scanning and usage feeds, SaaS License Management and outbound email. Each gap was solved instead of skipped; see [Sandbox limits and our solutions](08_sandbox_limits_and_solutions.md).

## Approach

The work follows the SAM data chain: installation, discovery model, normalization, software model, entitlement, reconciliation, vendor rules, reclamation, management view. Five products were chosen so that every kind of result appears once:

| Story | Product | Counted | Result | Money |
| --- | --- | --- | --- | --- |
| A | Adobe Acrobat 2024 Pro | Per named user | Compliant | Renewal on 31 Jan 2027 tracked |
| B | Microsoft SQL Server 2022 Standard | Per core | Under-licensed by 8 cores | EUR 15,780 exposure |
| C | Microsoft Visio 2021 Professional | Per device | Over-licensed by 25 | EUR 14,475 to reuse |
| D | Microsoft Project 2021 Professional | Per device | Compliant, 12 unused | EUR 12,708 reclaimable |
| E | Microsoft Windows Server 2022 Standard | Per core | Compliant at Microsoft's 16-core minimum | 112 cores, where a raw count says 88 |

## Implementation

### Environment and activation (filled in Stage 1)

To be written: how SAM Professional was switched on, the plugin versions, how the workspace was installed, and the starting counts.

### Inventory (filled in Stage 2)

To be written: the loader script as a stand-in for a discovery feed, the 248 installations and the 8 discovery models it produced.

### Normalization (filled in Stage 3)

To be written: the rate before and after, which products the built-in library recognised, which needed suggestions or manual cleaning, and why the missing Content Service does not change the method.

### Software models and entitlements (filled in Stages 3 and 4)

To be written: the five models and their matching discovery models, the five entitlements (asset tags NSM-ENT-A to NSM-ENT-E, State In use) with metric, rights, packs and cost, and the 68 allocations.

### Reconciliation (filled in Stage 4)

To be written: the system's numbers for all five products and the trace of the SQL Server result back to its three servers.

### Vendor rules (filled in Stage 5)

To be written: the Microsoft per-core rules for Windows Server and SQL Server compared with what the system showed.

### Reclamation (filled in Stage 5)

To be written: the usage data, the rule, the removal candidates, the savings and the approval flow.

### Management view and access (filled in Stage 6)

To be written: the dashboard and the read-only visitor design with its test results.

### Recovery (filled in Stage 6)

To be written: the backup pack with checksums and the result of the recovery test.

## What this looks like in production

- Installations come from ServiceNow Discovery, SCCM, Intune or the Agent Client Collector instead of a script. The same tables and discovery models apply.
- The Content Service keeps the content library current and raises automatic normalization; manual cleaning becomes the exception.
- Usage comes from agents or SCCM and feeds the same reclamation rules.
- SaaS License Management adds subscription usage for Microsoft 365, Adobe and others.
- Entitlements are created from publisher part numbers and purchase orders, which adds details such as downgrade rights automatically.
- Approved reclamations send the uninstall task to the endpoint management tool.
- Now Assist for SAM adds AI help for software requests, reclamation rules and removal candidates.

## Lessons learned (filled in Stage 7)

To be written.

## Evidence

Every claim above links to a screenshot in the [evidence](../evidence/README.md) folder. The full list of screenshots, with the step that produces each one, is in that folder's README.

## See it live

From Stage 7: the sandbox address and the read-only visitor login are listed in the repository README. The sandbox sleeps when idle and wakes in a few minutes.

## Five-minute demo

| Minute | Show | Say |
| --- | --- | --- |
| 1 | README on GitHub | Northstar, the sandbox, invented data, five stories, rebuildable from this repository |
| 2 | Workspace, installations, one discovery model | Raw names arrive messy; we cleaned 8 of 8, so the license check can trust the data |
| 3 | SQL Server result and its servers | 16 cores owned, 24 needed: EUR 15,780 exposure, traced to three servers. Visio next to it: 25 licenses unused |
| 4 | Reclamation rule and removal candidates | 12 Project installations unused for 90 days: EUR 12,708 to reuse instead of buy |
| 5 | Dashboard, visitor login, tracker, backup | One screen for managers, a read-only login for reviewers, a tracked history and a tested backup |
