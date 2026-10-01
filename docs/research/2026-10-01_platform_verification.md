# Platform verification report

Prepared: 1 October 2026
Scope: online verification of every platform dependent claim in the handover package before any instance work starts.
Method: official ServiceNow documentation and Developer Site pages first, ServiceNow employee blog posts second, community threads third, third party blogs only for release calendar corroboration.

Every claim below is marked with one of:

* `CONFIRMED` the handover statement holds as written.
* `CORRECTED` the handover statement needed a change; the change is recorded in `docs/handover_mapping.md`.
* `VERIFY IN INSTANCE` the statement cannot be settled online and must be checked on the PDI.

## 1. Release calendar

| Item | Finding | Status |
| --- | --- | --- |
| Zurich dates | Early availability 31 July 2025, general availability 10 September 2025. | CONFIRMED |
| Release after Zurich | ServiceNow switched from city names to country names. Australia: early availability 12 March 2026, general availability 5 May 2026. | NEW |
| Release after Australia | Brazil: early availability 24 September 2026. PDIs on Brazil became available the same day. General availability is expected in Q4 2026; third party sources cite early November 2026 and this is not yet confirmed by ServiceNow. | NEW |
| Support position of Zurich | ServiceNow supports the current family (N) and the previous one (N-1). Today Australia is N and Zurich is N-1. When Brazil reaches general availability Zurich becomes N-2. | NEW |

Impact: the Zurich requirement remains valid, but the window in which Zurich is a supported, selectable PDI release is closing. See GUIDE.md Appendix G, decision G01.

## 2. Personal Developer Instance rules

Source: Zurich PDI Guide and Zurich PDI FAQ on the Developer Site (links in section 9).

| Item | Finding | Status |
| --- | --- | --- |
| Request path | Developer Site, Request Instance, choose a release, Request. | CONFIRMED |
| Earlier releases | The FAQ advises requesting a PDI on an earlier release and upgrading, or joining the waitlist. Community reports from January to July 2026 show Zurich still selectable as an earlier release next to Australia. | CONFIRMED, availability at request time is VERIFY IN INSTANCE |
| Waitlist | A waitlist exists when no PDI is available. The guide states you lose your place if you leave and rejoin. Community reports in 2026 show waits of 2 to 7 days. | CONFIRMED |
| Hibernation | Idle PDIs hibernate. Data is preserved. Wake takes 3 to 5 minutes, up to 20. | CONFIRMED |
| Reclamation | After a 10 day period of inactivity on the Developer Site the instance is reclaimed, reset and reassigned. Sign in at least weekly. | CONFIRMED |
| Downgrade | Not possible. Release the instance and request a new one on the older release. | NEW |
| Reset | Actions, Reset and wipe instance removes all customizations. | NEW |
| Backup advice | The Developer Program is not responsible for lost work and recommends source control or update sets. | CONFIRMED |
| Plugin activation | Most plugins activate inside the PDI. Paid and premium plugins are not available from inside the PDI but can be activated from the Developer Site where possible. Plugins that require activation by ServiceNow personnel do not appear. Many Store applications cannot be installed on PDIs. | CONFIRMED |
| Outbound email | Restricted to the guerrillamail.com domain. Not relevant to this project but recorded. | NEW |
| July 2026 incident | Developer Site outage 22 to 27 July 2026. Provisioning resumed with little or no wait. No data loss expected. | NEW |

## 3. SAM Professional activation on a PDI

| Item | Finding | Status |
| --- | --- | --- |
| Activation label | On the Developer Site the premium activation is shown as Software Asset Management Professional or Activate all Software Asset Management Professional plugins, with an option to include demo data. Successful activations on PDIs are reported in 2022, 2024 and June 2026. | CONFIRMED |
| Failure pattern | First attempts fail for a noticeable share of users (2022, June 2025, July 2025, June 2026). Working remedies: retry from Manage my instance, activate the base Software Asset Management plugin from Application Manager first, then retry the full activation; install in sequence rather than all at once. | NEW |
| `com.sn_samp_master_ws` | Official Zurich documentation for the Guided Experiences application names it Software Asset Management Professional Master Workspace and states it internally activates `com.sn_samp_master` and the Software Asset Workspace Store application `sn_sam_workspace`. | CONFIRMED |
| Mapping of the PDI label to a plugin id | Not published. Confirm in the instance from the plugin list after activation. | VERIFY IN INSTANCE |
| Software Asset Workspace on a PDI | Repeatedly reported as missing after the Developer Site activation (2023, 2024, May 2025, February 2026 on Zurich). Remedies that worked: install Software Asset Management Playbooks and Guided Setups (`sn_sam_playbook`) or Software Asset Management Guided Experiences (`com.sn_sam_playbook`) from All Available Applications; install `sn_sam_workspace` and run a repair (accepted answer, August 2026, Zurich PDI); background script installing `com.sn_sam_workspace` (Xanadu era). One March 2026 report could not make it work on Zurich and reverted to Yokohama. | CORRECTED, see GUIDE.md Session 1 step 8 |
| Guided Experiences prerequisites | Official Zurich docs: valid entitlements for the application and its Store dependencies, role `sam_admin` or `sam_user`, activate `com.sn_samp_master_ws` first. It installs `com.snc.samp`, `com.glide.playbook_experience.config`, `sn_playbook_exp`, `now_playbook_exp` and `sn_sam_workspace`. | NEW |
| Classic interface | Beginning with Xanadu, limited support is provided for the classic SAM interface. It stays active after upgrade. Zurich therefore favours the workspace. | CONFIRMED |
| Content Service | The Content Service setup table `sn_samp_content_service_setup` is not installed on PDIs and content service features are restricted to licensed customer environments. Normalization on a PDI relies on the content library shipped with the plugin, demo data and manual normalization. | CORRECTED, see GUIDE.md Session 3 |
| SaaS License Management | Separate Store application (Software Asset Management - SaaS License Management, integration plugin `com.sn_sam_saas_int`). Reported as not available for PDIs in January 2024. Licensing statements conflict (a 2023 thread says separate subscription, the current product page says included with SAM Professional). | CORRECTED, see GUIDE.md Appendix A |
| Demo data | Activate Plugin with demo data is offered on the Developer Site. If demo data is missing after activation, reload it from the plugin record or retry activation. | CONFIRMED |

## 4. Zurich SAM changes

Source: ServiceNow community blog What's New in Zurich Release for Software Asset Management and the Zurich release notes.

| Item | Finding | Status |
| --- | --- | --- |
| New SAM features | Microsoft Hyper-V virtualization support, Adobe SaaS guided setup, Organizational license positions, SQL Server high availability compliance. | NEW |
| Now Assist for SAM | Help manage software asset requests, Create software reclamation rule, Evaluate software removal candidate. These need Now Assist entitlements and are out of scope on a PDI. | NEW |
| Other enhancements | Single sign-on application groups, enhanced M365 subscription optimization, biweekly content library updates, Flow Designer migration for reclamation workflows, cluster license assignment preferences, extended software lifecycle support, VMware licensing policy updates, group assignment license allocations. | NEW |
| Reclamation workflow deprecation | Zurich migrated legacy Workflow based automation, including SAM reclamation, to Flow Designer (Software Asset Reclamation Flow and Software Asset Reclamation line flow). After Zurich the legacy Workflow editor is hidden and Flow Designer is the supported path. | CONFIRMED and made specific |

## 5. Data model

| Table | Purpose | Status |
| --- | --- | --- |
| `cmdb_sam_sw_install` | Software installation: discovery model installed on a device. | CONFIRMED |
| `cmdb_sam_sw_discovery_model` | Software discovery model: unique discovered publisher, product, version pattern with normalized fields. | CONFIRMED |
| `cmdb_software_product_model` | Software model. | CONFIRMED |
| `alm_license` | Software entitlement. | CONFIRMED |
| `alm_entitlement_user` | Entitlement allocation to a user. | NEW |
| `alm_entitlement_asset` | Entitlement allocation to a device. | NEW |
| `samp_sw_entitlement_definition` | Discovery map linking software models to discovery content. | NEW |
| `samp_sw_license_metric` | License metric definitions. | NEW |
| `samp_sw_product`, `samp_sw_publisher` | Content library product and publisher lists. | NEW |
| `samp_reconciliation_result` | Top level result for a reconciliation run. | NEW |
| `samp_software_model_result` | Result at software model level. | NEW |
| `samp_license_metric_result` | Result per software model and license metric. | NEW |
| `samp_sw_reclamation_rule` | Reclamation rules. | NEW |
| `samp_sw_reclamation_candidate` | Removal or reclamation candidates. | NEW |
| `sn_samp_content_service_setup` | Content Service setup, absent on PDIs. | NEW |

Normalization status values documented by ServiceNow staff: Normalized, Partially Normalized, Publisher Normalized, Match Not Found, plus Manually Normalized when a suggestion is accepted.

Entitlement states: new entitlements are created as Draft and must be Published; draft entitlements are not considered for licensing or reconciliation.

Publisher part numbers can auto create software models with enrichment. For Microsoft products sold in packs, record rights per pack and number of packs. Unit cost is needed for true up and savings figures.

## 6. Roles and scheduled jobs

| Item | Finding | Status |
| --- | --- | --- |
| `sam_user` | Access to all SAM features except administration. | CONFIRMED |
| `sam_admin` | Inherits `sam_user`; runs reconciliation and manages reclamation rules. | CONFIRMED |
| `sam_developer` | Community reported: contains `sam_admin` and permits scripting. Confirm on the instance. | VERIFY IN INSTANCE |
| `sam_integrator`, `sam_spend_import` | Community reported supporting roles. | VERIFY IN INSTANCE |
| Normalization jobs | SAM - Normalize discovery models using content library rules (daily), SAM - Find Normalization Suggestions (weekly). | VERIFY IN INSTANCE |
| Reconciliation job | SAM - Software License Reconciliation, weekly on Monday evening out of the box. Reconciliation can also be started from the workspace by `sam_admin`. | VERIFY IN INSTANCE |
| Reclamation jobs | SAM - Identify New Reclamation Candidates (monthly), SAM - Update Existing Reclamation Candidates (weekly). | VERIFY IN INSTANCE |

## 7. Publisher packs

| Item | Finding | Status |
| --- | --- | --- |
| Master plugin | `com.sn_samp_master` installs the SAM Professional plugins and publisher packs together. `com.sn_samp_master_ws` adds the workspace. | CONFIRMED |
| Core plugin | `com.snc.samp`. Content: `com.snc.samp.content`. | NEW |
| Microsoft pack | `com.snc.samp.microsoft`. Needed for Windows Server and SQL Server per core logic, virtualization coverage and Zurich additions (Hyper-V, SQL Server availability groups). | NEW |
| Other packs | Oracle `com.snc.sam.oracle.pp`, Adobe `com.sn_samp_adobe`, Citrix `com.sn_samp_citrix`, plus IBM, SAP and VMware packs. | NEW |

## 8. Change management and recovery mechanisms

| Item | Finding | Status |
| --- | --- | --- |
| Update sets | Export to XML is available once the update set is Complete. In progress sets can be exported as a record XML but should not be used for recovery. Import through Retrieved Update Sets, Import Update Set from XML. | CONFIRMED |
| Source control | Zurich added Source Control to ServiceNow Studio. On a PDI the Studio plugin may need updating to the latest version before the option appears. Only project owned scoped applications belong in source control. | CONFIRMED and made specific |
| XML record export | Supported for selected records. Relationships and sys_ids need care on import. | CONFIRMED |

## 9. Sources

Official ServiceNow

* Zurich PDI Guide: https://developer.servicenow.com/print_page.do?release=zurich&category=developer-program&identifier=getting-instance-assistance&module=guide
* Zurich PDI FAQ: https://developer.servicenow.com/print_page.do?release=zurich&category=now-platform&identifier=pdi_faq&module=guide
* Install Software Asset Management Guided Experiences, Zurich: https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2383809
* Zurich release notes: https://www.servicenow.com/docs/r/zurich/release-notes/family-release-notes.html
* New features and products in Zurich: https://www.servicenow.com/docs/r/zurich/release-notes/rn-summary-new-features.html
* Zurich IT Asset Management documentation root: https://www.servicenow.com/docs/r/zurich/it-asset-management
* View normalization suggestions, Zurich: https://www.servicenow.com/docs/bundle/zurich-it-asset-management/page/product/software-asset-management2/task/view-norm-suggestions-sam.html
* Link an application to source control: https://www.servicenow.com/docs/bundle/washingtondc-application-development/page/build/applications/task/t_LinkAnApplicationToSourceControl.html
* Software Normalization Deep Dive, KB0859819: https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0859819
* SAM Reclamation Candidates Not Created, KB2593329: https://support.servicenow.com/kb/kb/kb/kb?id=kb_article_view&sysparm_article=KB2593329
* SaaS import plugin reference, KB0964305: https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0964305
* Store, Software Asset Management Guided Experiences: https://store.servicenow.com/store/app/8609e36e1be06a50a85b16db234bcb83
* Store, Software Asset Management - SaaS License Management: https://store.servicenow.com/store/app/49d8632e1be06a50a85b16db234bcbee
* SaaS License Management product page: https://www.servicenow.com/products/saas-license-management.html

ServiceNow employee and community blogs

* What's New in Zurich Release for Software Asset Management: https://www.servicenow.com/community/sam-blog/what-s-new-in-zurich-release-for-software-asset-management/ba-p/3322015
* Review Software Entitlements (30 June 2025): https://www.servicenow.com/community/sam-blog/review-software-entitlements/ba-p/3304445
* Review Software Installs Normalization (30 June 2025): https://www.servicenow.com/community/sam-blog/review-software-installs-normalization/ba-p/3304296
* ServiceNow SAM Pro Data Model: https://www.servicenow.com/community/sam-blog/servicenow-sam-pro-data-model/ba-p/3300153
* List of ServiceNow SAM Tables: https://www.servicenow.com/community/sam-blog/list-of-servicenow-sam-tables/ba-p/2283573
* How to Request and Install SAM Professional Plugins: https://www.servicenow.com/community/sam-blog/how-to-request-and-install-software-asset-management-sam/ba-p/3033283
* Software Asset Management FAQ Guide: https://www.servicenow.com/community/sam-articles/software-asset-management-faq-guide/ta-p/3032394
* Understanding Reclamation Rules: https://www.servicenow.com/community/sam-blog/understanding-reclamation-rules-optimizing-software-usage-and/ba-p/3030310
* Incident: Developer Site Restored and PDI Availability Issues (July 2026): https://www.servicenow.com/community/developer-blog/incident-developer-site-restored-and-pdi-availability-issues/ba-p/3578120
* So, You're Getting Yourself a Brazil PDI (September 2026): https://www.servicenow.com/community/developer-passport-blog/so-you-re-getting-yourself-a-brazil-pdi-what-s-different/ba-p/3592342
* Source Control in ServiceNow Studio walkthrough: https://www.servicenow.com/community/developer-advocate-blog/source-control-in-servicenow-studio-complete-walkthrough/ba-p/3356303
* New ServiceNow release cycle: https://www.servicenow.com/community/upgrades-and-patching-articles/new-servicenow-release-cycle/ta-p/3365778

Community threads

* Install SAM Pro on PDI (March 2024): https://www.servicenow.com/community/sam-forum/install-sam-pro-on-pdi/m-p/2849504
* Software asset workspace is not available in PDI for Zurich release (February to August 2026): https://www.servicenow.com/community/sam-forum/software-asset-workspace-is-not-available-in-pdi-for-zurich/td-p/3483029
* PDI issue, SAMPro not activated (June 2026): https://www.servicenow.com/community/community-central-forum/pdi-issue-sampro-not-activated/m-p/3565069
* Issue Activating SAM Professional Plugins on PDI (July 2025): https://www.servicenow.com/community/sam-forum/issue-activating-sam-professional-plugins-on-pdi/m-p/3330812
* PDI instance not loading SAM and demo data (June 2025): https://www.servicenow.com/community/developer-forum/pdi-instance-not-loading-sam-and-demo-data/td-p/3293168
* Software asset workspace unavailable on PDI (May 2025): https://www.servicenow.com/community/sam-forum/software-asset-workspace-unavailable-on-pdi/td-p/3254593
* Missing SAM Workspace Plugin in PDI, Xanadu (September 2024): https://www.servicenow.com/community/sam-forum/missing-sam-workspace-plugin-in-pdi-xanadu-release-of-servicenow/m-p/3044060
* How to enable Software asset workspace in PDI (August 2023): https://www.servicenow.com/community/sam-forum/how-to-enable-software-asset-workspace-in-pdi/m-p/2657928
* Installation of SAM Master Plugin com.sn_samp_master_ws: https://www.servicenow.com/community/sam-forum/installation-of-sam-master-plugin-com-sn-samp-master-ws-plugin/td-p/3385248
* Enabling SaaS License Management on developer instance (January 2024): https://www.servicenow.com/community/sam-forum/enabling-quot-saas-license-management-quot-on-developer-instance/m-p/2781361
* Is SaaS License Management part of SAM Pro license (June 2023): https://www.servicenow.com/community/sam-forum/is-saas-license-management-plugin-is-part-of-sam-pro-license-or/m-p/2582444
* PDI Waitlist (January to June 2026): https://www.servicenow.com/community/community-central-forum/pdi-waitlist/m-p/3558972
* Unable to provision PDI, Australia release (July 2026): https://www.servicenow.com/community/community-central-forum/unable-to-provision-personal-developer-instance-australia/m-p/3572051
* GitHub access source control for Zurich PDI (December 2025 to January 2026): https://www.servicenow.com/community/servicenow-ide-sdk-and-fluent/github-access-source-control-for-zurich-pdi-instance/td-p/3453918
* SAM roles and responsibilities: https://www.servicenow.com/community/sam-forum/sam-roles-and-responsibilities-cis-sam-exam-question/m-p/2510180
* How to enable Microsoft publisher pack: https://www.servicenow.com/community/sam-forum/how-to-enable-microsoft-publisher-pack/m-p/3068502
* How to use a workflow after the Zurich release: https://www.servicenow.com/community/servicenow-studio-forum/how-to-use-a-workflow-after-the-zurich-release/m-p/3365705
* What is Yokohama's official end of life date: https://www.servicenow.com/community/upgrades-and-patching-forum/what-is-yokohama-s-official-end-of-life-date/m-p/3294165
* Brazil release thread: https://www.servicenow.com/community/servicenow-impact-forum/brazil-release/m-p/3518630

Third party, used only to corroborate calendar dates

* ServiceNow Release Cycle 2026: https://snowcoder.ai/blog/servicenow-release-cycle-2026
* ServiceNow Brazil Release key dates: https://nowben.com/servicenow-brazil-release-key-dates-and-preview-information/
* ServiceNow Zurich Release key features: https://www.perspectium.com/blog/servicenow-zurich-release-key-features/

## 10. Re-verification rule

Before Session 0 starts, re-check items marked VERIFY IN INSTANCE and re-check the Developer Site release list. Record the result in `PROGRESS.md` and in `docs/project_state.json`.
