# Platform research, 15 October 2026

A short re-check before the first working session, adding to the [full verification of 1 October 2026](platform_research_2026-10-01.md). Each finding lists what changed in the project because of it.

## Release calendar and sandbox availability

| Finding | Effect on the project |
| --- | --- |
| Brazil is in early availability since 24 September 2026. General availability is expected in early November 2026 according to third-party and community sources; ServiceNow has not confirmed a date. | Request the Zurich sandbox now. The 7-day release rule stays in place (decision D01 in `tracker/decisions.md`). |
| Community reports from mid-2026 describe sandbox waitlists of 6 to 7 days and sometimes longer, and Developer Site provisioning problems in September 2026. Leaving a waitlist loses the place. | Stage 0 says to stay on the waitlist and use the time for reading. The tracker can mark a stage as blocked with a reason. |

## Software Asset Workspace labels in Zurich

The Zurich documentation page "License operations view" lists the lists the guide relies on: Software entitlements, Software models, Software installs, Reclamation rules, Removal candidates, Reclamation summary, Discovery models, Software usage, Normalization suggestions and Part number suggestions. The guide now uses these exact labels.

## Reclamation rules in Zurich

The Zurich documentation page "Add a reclamation rule" (All, Software Asset, Administration, Reclamation Rules, role `sam_admin`) lists the fields: Name, Applies to, Reclamation type (Total Usage Time by default, or Last Used Date), Create reclamation candidate, Include no activity, Assignment group, Notify user, Days before auto-reclamation, Software install condition, Aggregate usage by, Total hours used and Last used before (one month to one year). Products are added afterwards in the Software Products related list.

"Include no activity" also catches software with installations but no usage records, as long as the product has at least one usage record in the period.

Effect: Stage 5 uses Last Used Date, 3 months, Include no activity ticked and Notify user off, with a documented fallback to Total Usage Time.

## Software usage and removal candidates

A ServiceNow employee answer of March 2026 describes the usage table `samp_sw_usage` with User, Publisher, Product, CI, Reclamation Type, Usage Type, `last_used` and `minutes_used`, and lists why candidates may not appear: usage not linked to the installation, last use too recent, installation not normalized to the model, no active allocation, extra rule filters, or an installation not in the Installed state.

Effect: the usage script links each usage row to its installation, CI and user and fills the last-used date and minutes; the allocation script gives each Project laptop an allocation before the rule runs.

## Processor fields

ServiceNow knowledge article KB0696858 and community answers define `cpu_count` as the number of physical processors and `cpu_core_count` as the number of cores per processor; total cores are the two multiplied.

Effect: the Northstar data was corrected. SQL servers are now 2 processors x 4 cores and Windows application servers 2 processors x 8 cores. The licensing results stay the same: SQL Server needs 24 cores (16 owned) and Windows Server needs 112 under Microsoft's 16-core minimum per server (88 actual cores).

## Sources

- Zurich, License operations view: https://www.servicenow.com/docs/r/zurich/it-asset-management/software-asset-management/operations-workspace.html
- Zurich, Add a reclamation rule: https://www.servicenow.com/docs/bundle/zurich-it-asset-management/page/product/software-asset-management2/task/t_AddAReclamationRule.html
- How does Discovery calculate CPU count and CPU core count (KB0696858): https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0696858
- Reclamation rule in SAM (March 2026): https://www.servicenow.com/community/sam-forum/reclamation-rule-in-sam/td-p/3512252
- Reclamation job executed but no removal candidates created (March 2026): https://www.servicenow.com/community/sam-forum/reclamation-job-executed-but-no-removal-candidates-created/td-p/3512690
- Reclamation rules with no metering data (September 2025): https://www.servicenow.com/community/sam-forum/reclamation-rules-with-no-metering-data/td-p/3377449
- Understanding Software Usage: https://www.servicenow.com/community/sam-blog/understanding-software-usage-key-insights-and-benefits/ba-p/3030325
- Software Installations Table Attribute Review: https://www.servicenow.com/community/sam-articles/software-installations-table-attribute-review/ta-p/2318570
- PDI waitlist reports (2026): https://www.servicenow.com/community/developer-forum/i-requested-a-personal-developer-instance-pdi-seven-days-ago/td-p/3567239
- Brazil release dates (third party): https://nowben.com/servicenow-brazil-release-key-dates-and-preview-information/
- Brazil release (community): https://www.servicenow.com/community/servicenow-impact-forum/brazil-release/m-p/3518630
