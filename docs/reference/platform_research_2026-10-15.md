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

## Forms and buttons the guide names (second check, 15 October 2026)

A second pass through the Zurich documentation, so that every step can name the exact field and button.

| Finding | Effect on the project |
| --- | --- |
| Entitlements in the workspace: Software asset overview, **Create entitlement**, **Fill out the details in a standard form**, **Next**, fill in, **Save** (the Allocations, General, Financial and Contracts tabs appear), then **Publish**. A new entitlement is in state Build; Publish moves it to In use, which makes it count in reconciliation. | Stage 4 has one step per purchase with these clicks. Decision D15. |
| The entitlement form has **Asset tag**, Software model, License type, License metric, Rights per license pack, Number of packs, Purchased rights (packs x rights per pack for Microsoft per core), Unit cost, and on the tabs Company, Vendor, Invoice number and Purchased. It has no PO number field. | Purchases are tagged `NSM-ENT-A` to `NSM-ENT-E`; the allocation script, list links, reports and exports use the tag. Decision D12. |
| Unit cost is multiplied by the number of rights, so a pack price must be divided by the rights per pack (community answer). | SQL Server is entered at EUR 1,972.50 per core (EUR 3,945 per pack of 2). Decision D14. |
| The software model form has Publisher, Product, **Version condition** (starts with, is, is anything; default is anything), Version, **Edition condition**, Edition, **Product type**, License under management and Short description, and a tab **Matching Discovery Models**. The workspace locks version and edition after saving (community answer). | Models are created in the classic form, match every version and one edition, and carry the short description `Northstar story A` to `E`. Decision D13. |
| The discovery model form has Normalization status, Publisher, Product, Version, Edition, Product type and the discovered values. Only Licensable models count in reconciliation. Manual normalization: fill in the fields and Save; the status becomes Manually Normalized. In the workspace: License operations, Discovery models, the ellipsis menu, Normalize. | Step 3.4 sets Product type as well as the names, and the read-only status script `04_show_normalization.js` shows all 8 values at once. |
| A user interface policy makes Publisher read-only when the status is Normalized, Publisher Normalized or Partially Normalized (knowledge article KB0852551). | Step 3.4 says to leave a grey Publisher field as it is. |
| Job names: SAM - Normalize discovery models using content library rules (daily), SAM - Software License Reconciliation (weekly), SAM - Identify new reclamation candidates (monthly; it needs a successful reconciliation first). | The steps name these jobs and run a fresh license check before the candidates job. |
| Zurich dashboards: Platform Analytics, Dashboards, Create New Dashboard, Add New Element, Data Visualization (community guides). Classic reports remain available. | Step 6.3 creates the dashboard and step 6.4 adds six charts, with classic reports as the fallback. |

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
- Zurich, Create entitlements in workspace: https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/O~JVsyQdaW99Fe~XMND4nA
- Zurich, Create entitlements using the guided walk-through: https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/wJ~MxrbMj7k2PMSUNbBcaQ
- Zurich, Create entitlements in Software Asset Management classic: https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/fSB_J0XtiCVH9Yb3z0nl5Q
- Software entitlement fields: https://www.servicenow.com/docs/r/it-asset-management/software-asset-management/software-entitlement-fields.html
- Zurich, Software model fields: https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/~W3T7ze0NV958wBRZ5iw3Q
- Zurich, Discovery models fields: https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/Ht4DWOQhpdO_GYV9yqU7Bg
- Zurich, Manually normalize a software discovery model (classic): https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/WeO4A2hUBRPE0PIrfcAN8A
- Zurich, Manually normalize in the workspace: https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/ZqZ6~iILd4Kf6VMsqsNajw
- Edit the Publisher of a normalized discovery model (KB0852551): https://support.servicenow.com/kb/kb/kb?id=kb_article_view&sysparm_article=KB0852551
- Software normalization and its scheduled job: https://www.servicenow.com/docs/r/it-asset-management/software-asset-management/sam-normalization.html
- Software installation optimization and removal (reclamation jobs): https://www.servicenow.com/docs/r/1zMxrAxr2iK81FYv03BwFA/5IomUwdHuahRQ0OEkm_QXA
- SAM Pro packs and unit cost (community): https://www.servicenow.com/community/sam-forum/itam-sam-pro-packs-related-query/td-p/2426630
- SAM Pro reconciliation job name (community): https://www.servicenow.com/community/sam-forum/sam-pro-reconciliation-not-bringing-in-new-entitlement/td-p/3461578
- Dashboards and reports in Zurich (community): https://www.servicenow.com/community/servicenow-ai-platform-articles/how-to-create-servicenow-dashboards-and-reports-zurich-version/ta-p/3430404
- Creating dashboards step by step (community): https://www.servicenow.com/community/servicenow-ai-platform-forum/article-how-to-create-dashboards-in-servicenow-step-by-step-for/m-p/3357342
- Version and edition locked in the workspace (community): https://www.servicenow.com/community/sam-forum/need-guidance-on-organizing-software-model-information-in/td-p/2674849
