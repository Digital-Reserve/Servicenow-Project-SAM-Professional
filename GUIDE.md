# Implementation Guide

One continuous guide, eight sessions, one case study at the end. Each session fits one sitting of two to three hours. At one or two sessions a week the whole project takes four to seven weeks.

## How to use this guide

* Do the sessions in order. Each one ends with checks, evidence and a log entry. Do not start the next session until the checks pass.
* Every session has the same rhythm: wake the instance, read the last entry in `PROGRESS.md`, work through the steps, capture evidence, write the log entry, run `scripts/check_repo.sh`, commit and push.
* Evidence files go in `evidence/` and are named `S<session>_<nn>_<what_it_shows>.png`, for example `S1_03_sam_workspace.png`. Crop out anything sensitive. Never screenshot a password or a session cookie.
* Menu labels come from Zurich documentation and 2026 community reports. If a label differs on your patch level, type the name into the search box of the All menu, or open the table directly by typing `<table>.list` into that box, for example `alm_license.list`.
* Everything in the instance is synthetic. Never type real names, keys, contracts or company data.
* If you work with an AI assistant, start the session with the prompt in Appendix F.

## Release

The target release is Zurich. If the Developer Site does not offer Zurich when you request the instance, join the Zurich waitlist and give it seven days. If no Zurich instance arrives in that time, request Australia, the current release, change the release name in `README.md` and `CASE_STUDY.md`, and continue. A finished case study on Australia is worth more than an unfinished one on Zurich.

## Session map

| Session | Goal | Time | Output |
| --- | --- | --- | --- |
| 0 | Get a Zurich Personal Developer Instance | 15 minutes plus waiting | Instance URL, release verified |
| 1 | Activate SAM Professional, verify, baseline | 2.5 to 3 hours | Working SAM Pro with workspace, baseline numbers |
| 2 | Build the Northstar estate | 2 to 3 hours | Users, devices and 248 installations with discovery models |
| 3 | Normalize and model the software | 2 to 3 hours | Normalized discovery models, 5 software models with discovery maps |
| 4 | Entitlements, allocations, reconciliation | 2 to 3 hours | 5 published entitlements, compliance positions A to E |
| 5 | Publisher logic and reclamation | 2 to 3 hours | Microsoft per core explanation, 12 reclamation candidates with savings |
| 6 | Management views, visitor access, exports | 2.5 to 3 hours | Dashboard, read only visitor, recovery bundle |
| 7 | Case study and acceptance | 1.5 to 2 hours | Finished case study, tag v1.0.0 |

## What the finished project shows

The data chain of SAM Professional, end to end, on real platform features: discovered installation, discovery model, normalization, software model, entitlement, reconciliation, publisher rules, reclamation, management reporting. Five products, five scenarios:

| Scenario | Product | Position | Money story |
| --- | --- | --- | --- |
| A | Adobe Acrobat 2024 Pro, per named user | Compliant | Subscription renewal tracked |
| B | Microsoft SQL Server 2022 Standard, per core | Shortage of 8 cores | EUR 15,780 true up exposure |
| C | Microsoft Visio 2021 Professional, per device | Surplus of 25 | EUR 14,475 of rights to reuse |
| D | Microsoft Project 2021 Professional, per device | Compliant, 12 unused | EUR 12,708 reclaimable |
| E | Microsoft Windows Server 2022 Standard, per core | Compliant | Microsoft core minimums applied |

---

## Session 0: Get the instance

Goal: a Zurich Personal Developer Instance you can sign in to.
Time: 15 minutes, plus a possible waitlist of several days. Do this a week before Session 1.

### Steps

1. Sign in at https://developer.servicenow.com with your own developer account. Create one if needed.
2. Click Request Instance. Select Zurich from the release list. Zurich appears as an earlier release because Australia is current and Brazil is in early availability.
3. If Zurich shows a waitlist, join it once. Leaving and rejoining the waitlist loses your place. If Zurich is not listed at all, apply the release rule above.
4. When the instance is assigned, open Manage my instance. Record the instance URL. Store the admin password in a password manager. It never goes into this repository.
5. Sign in to the instance as admin. Type `stats.do` into the browser address bar after the instance URL, for example `https://devXXXXXX.service-now.com/stats.do`, and read the Build name line. It must say Zurich.
6. Put a weekly reminder in your calendar: sign in to the Developer Site at least once a week. An instance unused for ten days is reclaimed and wiped.
7. Clone this repository and read `README.md`, this guide and `data/northstar/README.md`.

### Checks

| Check | Expected |
| --- | --- |
| Build name on `stats.do` | Zurich |
| Admin sign in | Works |
| Developer Site, Manage my instance | Shows the instance as available |

### Evidence

| File | Shows |
| --- | --- |
| `S0_01_developer_site_instance.png` | Manage my instance page with release |
| `S0_02_build_name_zurich.png` | `stats.do` Build name line |

### Log

Add a Session 0 entry to `PROGRESS.md` with the date, the instance URL and the release. Update `docs/project_state.json`.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| "We were unable to assign an instance to you" | Sign out, return to the Developer Site home page, sign in, retry. Capacity is tight right after a new release. Join the waitlist if offered. |
| Instance hibernating | Click Wake Instance. Waking takes three to five minutes, at most twenty. |
| Zurich not listed | Waitlist for seven days, then switch to Australia per the release rule and record the decision in Appendix G. |

---

## Session 1: Activate SAM Professional, verify, baseline

Goal: SAM Professional active with demo data, Software Asset Workspace open, tables, roles and jobs verified, baseline counts recorded.
Time: 2.5 to 3 hours. Activation itself runs for one to two hours; use the wait for the reading in step 2.

### Before you start

* Instance awake, signed in as admin.
* `evidence/` folder ready, `PROGRESS.md` open.

### Steps

1. Create the first update set so every later customization has a home.
   1. All, System Update Sets, Local Update Sets, New.
   2. Name `SAM Portfolio S1 Foundation`, Submit, then Make This My Current Set (or open the record and click Make Current).
   3. The update set picker at the top of the page now shows the name.
2. Start the activation from the Developer Site. Premium plugins cannot be activated from inside a PDI.
   1. Developer Site, Manage my instance, Plugins (the profile menu entry Activate Plugin opens the same list).
   2. Search `Software Asset Management`. Select Software Asset Management Professional. The entry may be labelled Activate all Software Asset Management Professional plugins.
   3. Choose the option with demo data.
   4. Start. Do not change anything in the instance while it runs. Activation on PDIs takes 60 to 120 minutes.
   5. While waiting, read Appendix B and prepare the Session 2 import files from `data/northstar/`.
   6. If the Developer Site reports a failure, retry once. If it fails again: in the instance open All, System Applications, All Available Applications, All, search `Software Asset Management`, install the base Software Asset Management application, then repeat 2.2. Record the exact label, error and time of every attempt in the log. This sequence is reported to resolve repeated failures on PDIs.
3. Verify the plugins. All, System Definition, Plugins. Filter the name on `Software Asset`. Record, with versions, which of these are present: `com.snc.samp`, `com.sn_samp_master` or `com.sn_samp_master_ws`, `com.snc.samp.content`, `com.snc.samp.microsoft`, `sn_sam_workspace`.
4. Verify the tables. Type each of these into the All search box and press Enter. Each must open a list, and the demo data lists must not be empty:
   `cmdb_sam_sw_install.list`, `cmdb_sam_sw_discovery_model.list`, `cmdb_software_product_model.list`, `alm_license.list`, `samp_reconciliation_result.list`, `samp_sw_usage.list`, `samp_sw_reclamation_rule.list`.
5. Verify the roles. `sys_user_role.list`, filter Name starts with `sam`. Expect `sam_user` and `sam_admin`. Record whether `sam_developer` and `sam_integrator` exist.
6. Verify the scheduled jobs. `sysauto_script.list`, filter Name starts with `SAM`. Record the names of the normalization job (contains Normalize), the reconciliation job (contains Reconciliation), and the reclamation jobs (contain Reclamation Candidates).
7. Open the workspace. Type `Software Asset Workspace` into the All search box and open it. It should load the overview page.
8. If the workspace is not listed, work through these in order and record which one worked:
   1. All, System Applications, All Available Applications, All. Search `Software Asset Management Guided Experiences` (`com.sn_sam_playbook`; older listings call it Software Asset Management Playbooks and Guided Setups, `sn_sam_playbook`). Install it. It installs the workspace with it.
   2. If that is not listed, search `Software Asset Workspace` (`sn_sam_workspace`) on the same page and install it. If the workspace still does not appear, open the application record, click Repair, clear the browser cache and retry. This is the accepted fix on a Zurich PDI in August 2026.
   3. Last resort: All, System Definition, Scripts - Background, run
      ```
      var plugins = ['com.sn_sam_workspace'];
      var w = new GlideMultiPluginManagerWorker();
      w.setPluginIds(plugins);
      w.setProgressName('Plugin Installer');
      w.setBackground(true);
      w.start();
      ```
      and watch `sys_execution_tracker_list.do` until the Plugin Installer finishes.
   4. If none of these work after two attempts, continue the project in the classic interface (the Software Asset application menu) and retry step 8.1 at the start of every later session. Record the decision in Appendix G.
9. Record the Content Service limit as evidence. Type `sn_samp_content_service_setup.list` into the All search box. On a PDI the table does not exist. Screenshot the result. This proves the limit that Session 3 works around.
10. Baseline. Record these numbers in the log before any project data is loaded:
    1. Counts of the four core tables and of reconciliation results.
    2. Discovery models by normalization status: open `cmdb_sam_sw_discovery_model.list`, right click the Normalization status column header, Group By.
    3. Build name and patch from `stats.do`.
11. Close the session: evidence, log, `scripts/check_repo.sh`, commit, push.

### Checks

| Check | Expected |
| --- | --- |
| SAM plugins present | `com.snc.samp` and a master plugin recorded with versions |
| Core tables open with demo data | Yes |
| `sam_user` and `sam_admin` exist | Yes |
| SAM scheduled jobs exist | Names recorded |
| Software Asset Workspace opens | Yes, or the classic fallback is recorded |
| Content Service table | Absent, screenshot taken |
| Baseline counts recorded | Yes |

### Evidence

| File | Shows |
| --- | --- |
| `S1_01_plugins.png` | Plugin list filtered on Software Asset |
| `S1_02_tables.png` | One of the core table lists with demo data |
| `S1_03_sam_workspace.png` | Workspace overview |
| `S1_04_roles_jobs.png` | SAM roles or jobs list |
| `S1_05_content_service_absent.png` | The missing table |
| `S1_06_baseline_normalization.png` | Discovery models grouped by status |

### Log

Session 1 entry: activation attempts and outcome, plugin versions, workspace install path used, baseline table, status Green or Amber.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| Activation fails twice | Step 2.6 sequence, then wait a day and retry. Keep the exact error text. |
| Demo data missing after activation | All, System Definition, Plugins, open Software Asset Management Professional, use the demo data load option if shown, or Repair the plugin. The synthetic data in Session 2 covers every scenario regardless. |
| Workspace loads but is empty | Normal before data. Continue. |

---

## Session 2: Build the Northstar estate

Goal: the synthetic company, users and devices exist, 248 software installations are loaded through Import Sets, every installation has a discovery model, and the normalization job has run once.
Time: 2 to 3 hours.

### Before you start

* Session 1 checks passed.
* `data/northstar/` files at hand. Read `data/northstar/README.md` once.
* Create and make current the update set `SAM Portfolio S2 Data`. Transform maps are captured in it.

### How every import works

1. All, System Import Sets, Load Data.
2. Import set table: Create table, label as given in the table below. Source: file, choose the CSV. Submit.
3. On the result page click Create transform map. Name it as given, set the target table, Submit.
4. Click Auto Map Matching Fields. Then open Mapping Assist for the fields that did not map and set them by hand.
5. For reference fields, open the field map and set Referenced value field name to the lookup column named in the table. Set Choice action to create where the table says create so that missing manufacturers and models are created.
6. Tick Coalesce on the key field named in the table so re-running the import updates instead of duplicating.
7. Click Transform. Check the import set rows show Inserted or Updated, not Error.

### Import order and mappings

| Step | File | Staging label | Target table | Coalesce | Reference and choice settings |
| --- | --- | --- | --- | --- | --- |
| 1 | `01_companies.csv` | NSM Companies | `core_company` | name | none |
| 2 | `02_locations.csv` | NSM Locations | `cmn_location` | name | company by name |
| 3 | `03_departments.csv` | NSM Departments | `cmn_department` | name | company by name |
| 4 | `04_users.csv` | NSM Users | `sys_user` | user_name | department by name, location by name, company by name |
| 5 | `05_workstations.csv` | NSM Workstations | `cmdb_ci_computer` | name | manufacturer by name (create), model_id by name (create), assigned_to by user_name, location by name, company by name, install_status choice Installed |
| 6 | `06_servers.csv` | NSM Servers | `cmdb_ci_server` | name | same as workstations |
| 7 | `07_software_installations.csv` | NSM Software Installations | `cmdb_sam_sw_install` | installed_on and display_name and version | installed_on by name on `cmdb_ci` |

Do not import `08_software_models.csv`, `09_entitlements.csv`, `10_allocations.csv` or `11_software_usage.csv` yet. Models and entitlements are created in the workspace in Sessions 3 and 4 so the forms set every required field; usage is loaded in Session 5.

### Steps

1. Run imports 1 to 6 in order. After each, open the target table and confirm the count: 2 companies (plus whatever existed), 3 locations, 6 departments, 60 users, 45 computers, 12 servers.
2. Open one server, for example `NSM-SQL-01`, and confirm CPU count 2 and CPU core count 8. Per core licensing in Session 4 depends on these fields.
3. Run import 7. The business rule Create a Software Normalization links each installation to an existing discovery model or creates one. Confirm 248 installations and that the Discovery model field is filled on a sample of them.
4. Open `cmdb_sam_sw_discovery_model.list` and filter Publisher is one of Adobe, Microsoft, Google, Igor Pavlov, Notepad++ Team. Expect one discovery model per distinct publisher, display name and version: 5 licensable products and 3 free ones.
5. Run normalization now rather than waiting for the nightly job. `sysauto_script.list`, open the job whose name contains Normalize discovery models, click Execute Now. Wait two minutes, reload the discovery model list and note the Normalization status of the eight Northstar models.
6. Capture the chain for one product: open `NSM-WS-001`, Software Installed related list, open the Acrobat installation, open its Discovery model. Screenshot each.
7. Close the session: evidence, log with counts, `scripts/check_repo.sh`, commit, push.

### Checks

| Check | Expected |
| --- | --- |
| Users, computers, servers | 60, 45, 12 |
| Server core counts populated | Yes |
| Installations | 248, each with a discovery model |
| Northstar discovery models | 8 |
| Normalization job executed | Yes, statuses recorded |

### Evidence

| File | Shows |
| --- | --- |
| `S2_01_import_transform_map.png` | A transform map with field mappings |
| `S2_02_devices.png` | Server list with core counts |
| `S2_03_installations.png` | Installation list, 248 rows |
| `S2_04_install_to_discovery_model.png` | Installation form with Discovery model |
| `S2_05_discovery_models_status.png` | Northstar discovery models with status |

### Log

Session 2 entry: import results per file, counts, normalization statuses after the first run, any mapping decisions.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| Reference field empty after transform | The field map needs Referenced value field name set to the lookup column, for example `user_name` for assigned_to. |
| Manufacturer or model not created | Set Choice action to create on that field map. |
| Date fields empty | Dates in the files are `yyyy-mm-dd`, which the platform accepts. Check the field map type is not text. |
| Duplicate installations after a re-run | Coalesce was not set on all three fields. Delete the Northstar rows (filter installed_on starts with NSM) and re-run. |
| Discovery model not created | Confirm the business rule Create a Software Normalization is active on `cmdb_sam_sw_install`. |

---

## Session 3: Normalize and model the software

Goal: the eight Northstar discovery models are normalized, the five licensable products have software models with discovery maps, and the normalization rate is measured before and after.
Time: 2 to 3 hours.

### Why this session matters on a PDI

The SAM Content Service, which normally delivers normalization content, is not available on a Personal Developer Instance. This session shows the normalization engine working with the content library shipped in the plugin, normalization suggestions and manual normalization. Say so in the case study. It demonstrates that you understand the engine instead of trusting a black box.

### Before you start

* Update set `SAM Portfolio S3 Normalization` created and current.

### Steps

1. Measure before. `cmdb_sam_sw_discovery_model.list`, filter Publisher is one of the five Northstar publishers, group by Normalization status. Record the counts. This is the before number.
2. Review each of the eight discovery models in Software Asset Workspace, License operations, Discovery models (classic: Software Asset, Discovery Models). For each, record discovered publisher, product and version, and the normalized values.
3. For models not fully Normalized, use suggestions first. Classic: Software Asset, Normalization, Normalization Suggestions (the Zurich documentation page is View normalization suggestions). Accept a suggestion when it matches the expected product in `07_software_installations.csv` (columns expected_product, expected_version, expected_edition).
4. For models with no suggestion, normalize manually: open the discovery model, set Publisher, Product and Version (and Edition where the form offers it) to the expected values, save. The status becomes Manually Normalized and the normalization job will no longer touch that record.
5. Measure after. Repeat step 1. Normalization rate for Northstar models should now be 100 percent; also record the rate across all discovery models in the instance, demo data included.
6. Create the five software models. Software Asset Workspace, License operations, Software models, New (classic: Software Asset, Software Models, New). Use `data/northstar/08_software_models.csv`:

   | Scenario | Display name | Publisher | Product | Version | Edition | Platform |
   | --- | --- | --- | --- | --- | --- | --- |
   | A | Adobe Acrobat 2024 Pro | Adobe | Acrobat | 2024 | Pro | Windows |
   | B | Microsoft SQL Server 2022 Standard | Microsoft | SQL Server | 2022 | Standard | Windows |
   | C | Microsoft Visio 2021 Professional | Microsoft | Visio | 2021 | Professional | Windows |
   | D | Microsoft Project 2021 Professional | Microsoft | Project | 2021 | Professional | Windows |
   | E | Microsoft Windows Server 2022 Standard | Microsoft | Windows Server | 2022 | Standard | Windows |

   Reuse an existing model if demo data already has an identical one; record which. In production the model would be created from a publisher part number so enrichment such as downgrade rights is applied automatically; the synthetic dataset has no real part numbers, so the models are created by hand and this is stated.
7. Discovery maps. On each software model open the Discovery map related list (Software Asset Workspace shows it on the model; classic shows the related list on the form). Confirm the matching Northstar discovery model is mapped. Add the mapping if the engine did not create it. A software model without a discovery map cannot consume installations.
8. Close the session: evidence, log, `scripts/check_repo.sh`, commit, push.

### Checks

| Check | Expected |
| --- | --- |
| Northstar discovery models normalized | 8 of 8 (Normalized or Manually Normalized) |
| Normalization rate before and after recorded | Yes |
| Software models | 5, each with publisher, product, version, edition |
| Discovery maps | Each model maps to its discovery model |

### Evidence

| File | Shows |
| --- | --- |
| `S3_01_normalization_before.png` | Group by status before |
| `S3_02_normalization_suggestion.png` | A suggestion being accepted, or a manual normalization form |
| `S3_03_normalization_after.png` | Group by status after |
| `S3_04_software_model.png` | One software model form |
| `S3_05_discovery_map.png` | Discovery map related list on a model |

### Log

Session 3 entry: before and after rates, which models needed suggestions or manual normalization, software model ids, any reuse of demo models.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| No suggestions appear | Expected without the Content Service. Normalize manually. |
| Discovery map missing on a model | Add it from the related list, picking the Northstar discovery model. |
| Microsoft products normalized to a different edition | Edit the discovery model manually to the expected edition and record it. |

---

## Session 4: Entitlements, allocations, reconciliation

Goal: five published entitlements, Acrobat rights allocated to forty users, reconciliation run, positions A to E explained from source records.
Time: 2 to 3 hours.

### Before you start

* Session 3 checks passed.
* Update set `SAM Portfolio S4 Entitlements` created and current.
* The reseller company Synthetic Reseller BV exists from the Session 2 company import.

### Steps

1. Create the five entitlements in Software Asset Workspace, License operations, Entitlements, New (classic: Software Asset, Entitlements, New). Values from `data/northstar/09_entitlements.csv`:

   | Scenario | Display name | Software model | Metric | Rights | Packs | Unit cost EUR | Type | Purchased | Start | End |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | A | Adobe Acrobat Pro named user subscription | Adobe Acrobat 2024 Pro | Per Named User | 40 | 40 x 1 | 192.00 | Subscription | 2026-01-15 | 2026-02-01 | 2027-01-31 |
   | B | Microsoft SQL Server 2022 Standard per core | Microsoft SQL Server 2022 Standard | Per Core | 16 | 8 x 2 | 3,945.00 | Perpetual | 2025-11-20 | 2025-11-20 | |
   | C | Microsoft Visio Professional 2021 per device | Microsoft Visio 2021 Professional | Per Device | 60 | 60 x 1 | 579.00 | Perpetual | 2025-06-10 | 2025-06-10 | |
   | D | Microsoft Project Professional 2021 per device | Microsoft Project 2021 Professional | Per Device | 30 | 30 x 1 | 1,059.00 | Perpetual | 2025-06-10 | 2025-06-10 | |
   | E | Microsoft Windows Server 2022 Standard per core | Microsoft Windows Server 2022 Standard | Per Core | 112 | 56 x 2 | 248.00 | Perpetual | 2025-03-05 | 2025-03-05 | |

   Set Vendor to Synthetic Reseller BV and the PO number from the file. For the Microsoft per core entitlements enter rights per pack 2 and the number of packs where the form offers pack fields; otherwise enter the total rights. Unit cost is per right so that true up and savings figures appear.
2. Publish every entitlement. A new entitlement is in Draft and draft entitlements are ignored by reconciliation. Use the Publish action on each record and confirm the status shows Published.
3. Allocate Acrobat rights. Open entitlement A, Allocations, Allocate to users (classic: User allocations related list). Select the forty users listed in `data/northstar/10_allocations.csv`; they are the users of `NSM-WS-001` to `NSM-WS-040`. Confirm 40 allocations and 0 unallocated rights.
4. Run reconciliation. Software Asset Workspace, License operations, Reconciliation, Run reconciliation (classic: Software Asset, Reconciliation, Run Reconciliation). You must have `sam_admin`; admin has it. Alternatively execute the scheduled job whose name contains Software License Reconciliation. Wait for the run to finish; the result record in `samp_reconciliation_result.list` shows the state.
5. Read the positions. Software Asset Workspace, License usage or License operations, Reconciliation results, or open `samp_license_metric_result.list` filtered on the Northstar software models. Record rights owned, rights consumed and the position for each of the five models. Expected:

   | Scenario | Owned | Consumed | Position |
   | --- | --- | --- | --- |
   | A | 40 | 40 | Compliant |
   | B | 16 cores | 24 cores | Shortage of 8 cores, true up 4 packs, EUR 15,780 |
   | C | 60 | 35 | Surplus of 25, EUR 14,475 of unused rights |
   | D | 30 | 28 | Compliant, 2 spare |
   | E | 112 cores | 112 cores with Microsoft minimums, or 88 actual cores if the engine reports raw cores | Compliant |

6. Trace one position end to end: software model result, license metric result, the entitlement, the discovery map, the installations counted. Screenshot each step for scenario B.
7. Close the session: evidence, log, `scripts/check_repo.sh`, commit, push.

### Checks

| Check | Expected |
| --- | --- |
| Entitlements | 5, all Published |
| Acrobat allocations | 40 |
| Reconciliation run | Completed without error |
| Positions | A compliant, B shortage, C surplus, D compliant, E compliant |
| Trace | Scenario B traced to installations |

### Evidence

| File | Shows |
| --- | --- |
| `S4_01_entitlements_published.png` | Entitlement list with Published status |
| `S4_02_entitlement_sql.png` | Entitlement B form |
| `S4_03_allocations.png` | Acrobat allocations |
| `S4_04_reconciliation_results.png` | Positions overview |
| `S4_05_position_shortage.png` | Scenario B detail |
| `S4_06_position_surplus.png` | Scenario C detail |

### Log

Session 4 entry: entitlement ids, published confirmation, reconciliation run id and duration, the positions table with the engine's numbers, differences from expected and why.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| Entitlement cannot be published | A required field is missing, usually software model, metric or rights. The form names it. |
| A model shows no consumption | Discovery map missing (Session 3 step 7) or the installations are not licensable. Open the discovery model and confirm it is mapped. |
| Per core numbers differ from the table | Check CPU count and CPU core count on the servers and that `com.snc.samp.microsoft` is installed. Record what the engine computed; both the raw core and minimum core readings are explainable. |
| Reconciliation runs for a long time | On a PDI expect minutes, not hours. Check `samp_reconciliation_result.list` for the state before re-running. |

---

## Session 5: Publisher logic and reclamation

Goal: the Microsoft per core calculation explained from the publisher view, synthetic usage loaded, a reclamation rule that produces twelve removal candidates for Project Professional, savings visible.
Time: 2 to 3 hours.

### Before you start

* Session 4 checks passed.
* Update set `SAM Portfolio S5 Optimization` created and current.

### Steps

1. Publisher view. Open the Microsoft area of Software Asset Workspace (Publisher packs or the Microsoft tab under License usage; classic: Software Asset, Microsoft). Find Windows Server and SQL Server. Record how the pack counted cores for `NSM-WIN-01` (2 processors, 16 cores) and `NSM-SQL-01` (2 processors, 8 cores).
2. Write the explanation in your own words for the case study. The expected logic: Windows Server Standard is licensed per core with a minimum of 8 cores per processor and 16 per physical server, sold in 2 core packs, so seven physical servers need 112 cores whatever their actual counts; SQL Server Standard is licensed per core with a minimum of 4 cores per processor, so three servers with 2 processors of 4 cores need 24 cores against 16 owned. Compare with what the engine shows and note any difference.
3. Load synthetic usage so reclamation has something to evaluate. On a PDI there is no SCCM or Agent Client Collector feed; the usage file simulates one.
   1. Open `samp_sw_usage.list`, right click a column header, Configure, List Layout, and note the exact field names available (user, CI, publisher, product, last used, usage time or similar).
   2. Import `11_software_usage.csv` as staging table NSM Software Usage into `samp_sw_usage`. Map ci by name on `cmdb_ci`, user by user_name, publisher, product, version, last_used, and total_usage_minutes to the usage time field the table offers. Coalesce on ci and product.
   3. Confirm 103 usage records and that `NSM-WS-030` shows Project last used more than 90 days ago.
4. Create the reclamation rule. Software Asset Workspace, License operations, Reclamation rules, New (classic: Software Asset, Administration, Reclamation Rules, New). Name `Northstar Project unused 90 days`. Software model: Microsoft Project 2021 Professional. Condition: not used in the last 3 months (or 90 days, as the form offers). Keep the action at creating removal candidates with review, not automatic uninstall. Activate the rule.
5. Run the candidate job. `sysauto_script.list`, open the job whose name contains Identify New Reclamation Candidates, Execute Now. Then open Software Asset Workspace, License operations, Removal candidates (table `samp_sw_reclamation_candidate`). Expect 12 candidates, one per workstation `NSM-WS-026` to `NSM-WS-037`.
6. Savings. Record the potential savings the workspace shows for the candidates. With unit cost 1,059 the twelve candidates represent EUR 12,708 of rights that can be reharvested instead of buying new ones. If the workspace does not compute a figure, state the calculation in the log.
7. Walk the lifecycle without touching any endpoint. Open one candidate and move it through the review states the form offers, for example Reviewed and Approved, and stop before any uninstall action. Open Flow Designer and find Software Asset Reclamation Flow, read only, to describe how a production instance would continue to the uninstall task. Zurich runs this automation in Flow Designer; do not create legacy Workflow versions.
8. Close the session: evidence, log, `scripts/check_repo.sh`, commit, push.

### Checks

| Check | Expected |
| --- | --- |
| Publisher view opened and core logic recorded | Yes |
| Usage records | 103 |
| Reclamation rule active | Yes |
| Removal candidates for Project | 12 |
| Savings figure | Shown or calculated and logged |
| No real endpoint touched | Confirmed |

### Evidence

| File | Shows |
| --- | --- |
| `S5_01_microsoft_publisher_view.png` | Microsoft view with Windows Server and SQL Server |
| `S5_02_per_core_detail.png` | One server's core based consumption |
| `S5_03_usage_records.png` | Usage list for Project |
| `S5_04_reclamation_rule.png` | The rule |
| `S5_05_removal_candidates.png` | 12 candidates |
| `S5_06_savings.png` | Savings figure or the candidate summary |

### Log

Session 5 entry: engine core counts versus Microsoft rule, usage import result, rule settings, candidate count, savings, lifecycle states exercised.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| No candidates created | The rule evaluates the usage table. Confirm usage rows exist for the Project installations with last used older than the threshold, the rule is active and the software model matches. KB2593329 lists the prerequisites. |
| Usage import rejects rows | Field names differ by version. Map only the fields the table shows and leave the rest unmapped. |
| Microsoft view empty | The publisher pack needs reconciliation results. Re-run reconciliation after confirming `com.snc.samp.microsoft` is installed. |

---

## Session 6: Management views, visitor access, exports

Goal: a management dashboard that answers the six questions, a read only visitor account that passes negative tests, and a recovery bundle with checksums.
Time: 2.5 to 3 hours.

### Before you start

* Session 5 checks passed.
* Update set `SAM Portfolio S6 Presentation` created and current.

### Steps

1. Management views. Open the workspace Overview and Analytics pages. They should answer: what software exists, how much is normalized, what rights are owned, where the compliance risk is, where money can be saved, which publisher needs attention.
2. If the Analytics page is empty, the Performance Analytics collectors have not run. All, Performance Analytics, Data Collector, Jobs, filter Name contains `SAM` or `Software`, Execute Now, wait ten minutes, reload.
3. If analytics stays empty or Performance Analytics is not available, build the dashboard with standard reporting, which is always available. All, Reports, Create New, one report each, then All, Dashboards, New, name `Northstar Software Asset Overview`, add the six reports:

   | Report | Table | Type |
   | --- | --- | --- |
   | Installations by publisher | `cmdb_sam_sw_install` | Bar, group by Publisher |
   | Discovery models by normalization status | `cmdb_sam_sw_discovery_model` | Pie, group by Normalization status |
   | Rights owned by product | `alm_license` | Bar, sum of rights, group by Software model |
   | License positions | `samp_license_metric_result` | Bar, group by position or compliance status |
   | Removal candidates and savings | `samp_sw_reclamation_candidate` | List or single score |
   | Entitlement renewals | `alm_license` | List, end date not empty |

   Share the dashboard with the visitor role created below.
4. Visitor account. All, User Administration, Users, New: User ID `portfolio.visitor`, first name Portfolio, last name Visitor, no email, strong unique password, Active unticked for now. Roles: `sam_user` and `snc_read_only`. The read only role blocks create, update and delete across the instance; `sam_user` grants read access to the SAM tables and the workspace.
5. Negative and positive tests. Tick Active, open a private browser window, sign in as the visitor and confirm each line. Untick Active afterwards until Session 7.

   | Test | Expected |
   | --- | --- |
   | Open Software Asset Workspace | Opens, read only |
   | Open the dashboard | Opens |
   | Open an entitlement, try to edit | Save refused |
   | Try to create a software model | Refused |
   | Open System Properties, Users, Roles, ACLs, Update Sets, Plugins, Scheduled Jobs | Not accessible |
   | Open Scripts - Background | Not accessible |
   | Run reconciliation, create a reclamation rule | Refused |
   | Delete any record | Refused |
   | Impersonate | Not available |

   If the workspace refuses the visitor, use the dashboard as the landing page and record it. If any negative test fails, remove the extra role or add an ACL and retest before continuing.
6. Exports. Mark update sets S1 to S6 Complete (open each, State, Complete), then Export to XML from each record. Create `exports/release_01/` and copy the six XML files in. From the lists, export the five entitlements, the five software models and the reclamation rule as XML (list context menu, Export, XML). Copy `exports/MANIFEST_TEMPLATE.md` to `exports/release_01/MANIFEST.md` and fill it. Inside the folder run `sha256sum $(ls | grep -v SHA256SUMS) > SHA256SUMS`. Run `scripts/verify_exports.sh`.
7. Close the session: evidence, log, `scripts/check_repo.sh`, commit, push.

### Checks

| Check | Expected |
| --- | --- |
| Dashboard answers the six questions | Yes |
| Visitor positive tests | Pass |
| Visitor negative tests | All refused |
| Visitor inactive at end of session | Yes |
| `scripts/verify_exports.sh` | Passes for `release_01` |

### Evidence

| File | Shows |
| --- | --- |
| `S6_01_dashboard.png` | The dashboard |
| `S6_02_visitor_workspace.png` | Visitor view of the workspace or dashboard |
| `S6_03_visitor_refused.png` | A refused write or an inaccessible admin page |
| `S6_04_exports.png` | `exports/release_01` listing with checksums |

### Log

Session 6 entry: dashboard contents, analytics route used, visitor roles, test results table, export manifest summary.

### If something goes wrong

| Problem | What to do |
| --- | --- |
| Visitor can edit something | Confirm `snc_read_only` is on the user, sign out and in again, retest. Record the table and add a read only ACL if needed. |
| Visitor cannot open the workspace | Use the dashboard landing page. Record it; it is still a complete read only demonstration. |
| Update set cannot be exported | It must be in state Complete first. |

---

## Session 7: Case study and acceptance

Goal: the case study is complete, the acceptance checklist passes, the visitor is enabled, the release is tagged.
Time: 1.5 to 2 hours.

### Steps

1. Fill `CASE_STUDY.md`: results table with the engine's numbers, the normalization rates, the savings, the limits and solutions, the lessons learned, the evidence index. Every claim links to an evidence file.
2. Update `README.md`: status strip, live demonstration block, capability table with evidence links.
3. Run Appendix E, the acceptance checklist. Fix anything that fails before continuing.
4. Enable the visitor: tick Active on `portfolio.visitor`, repeat the four most important negative tests in a private window, then put the user name and password in the README live demonstration block. The password is intentionally public, unique, and easy to change.
5. Paper recovery test: hand Appendix D to someone else, or to a fresh AI session, and ask the six questions. Fix the runbook until all six are answered from the repository alone.
6. Run `scripts/check_repo.sh` and `scripts/verify_exports.sh`. Commit. Tag: `git tag -a v1.0.0 -m "SAM Professional Zurich case study"` and `git push --tags`.
7. Rehearse the five minute demonstration in `CASE_STUDY.md`. Time it.
8. Last log entry in `PROGRESS.md`: project complete, with the date.

### Checks

| Check | Expected |
| --- | --- |
| Acceptance checklist | All pass |
| Visitor enabled and retested | Yes |
| Tag v1.0.0 pushed | Yes |
| Demonstration rehearsed | Under five minutes |

---

## Appendix A: PDI limits and the solution used

A Personal Developer Instance lacks some things a licensed customer instance has. Each one is solved in the project and presented as part of the work, not as a gap.

| Limit on a PDI | Solution in this project | What it demonstrates |
| --- | --- | --- |
| SAM Content Service not available, no content updates | Normalization with the content library shipped in the plugin, normalization suggestions and manual normalization; rate measured before and after (Session 3) | Understanding of the normalization engine and data quality control |
| No Discovery, SCCM or agent feed | A reproducible synthetic inventory loaded through Import Sets and transform maps, simulating a discovery feed (Session 2) | Import design, CMDB hygiene, repeatability |
| No usage feed | Synthetic usage records loaded into the Software Usage table that reclamation rules evaluate (Session 5) | Reclamation design and the usage data dependency |
| SaaS License Management cannot be installed | Subscription lifecycle shown with a subscription entitlement, end date and the renewals view; SaaS integrations described as the production step (Session 4, case study) | Scope control and honesty about what was shown |
| Software Asset Workspace may not install with the activation | Install through Guided Experiences or the workspace application plus repair (Session 1) | Platform troubleshooting |
| Performance Analytics may be empty | Run the collectors, or build the dashboard with standard reporting (Session 6) | Reporting without dependence on one feature |
| Outbound email restricted | Approvals and candidate states exercised inside the instance (Session 5) | Process awareness |
| Instance reclaimed after ten idle days | Weekly sign in, exports with checksums, recovery runbook, repository as the system of record (Session 6, Appendix D) | Resilience and recoverability |
| Now Assist for SAM not available | Not needed for the case study; listed as a production enhancement | Awareness of the roadmap |

## Appendix B: Navigation and table cheat sheet

| Need | How |
| --- | --- |
| Open any table as a list | Type `<table>.list` into the All search box |
| Open a form for a new record | Type `<table>.do` |
| Build name and patch | `/stats.do` |
| Software Asset Workspace | Type Software Asset Workspace into the All search box |
| Classic SAM menu | All, Software Asset |
| Update sets | All, System Update Sets, Local Update Sets |
| Import sets | All, System Import Sets, Load Data; transform maps under System Import Sets, Transform Maps |
| Scheduled jobs | `sysauto_script.list` |
| Run a job now | Open the job, Execute Now |
| Group a list | Right click a column header, Group By |
| Export records as XML | List context menu (right click the header row), Export, XML |
| Background script | All, System Definition, Scripts - Background |
| Flow Designer | All, Process Automation, Flow Designer |
| Performance Analytics collectors | All, Performance Analytics, Data Collector, Jobs |

| Table | Holds |
| --- | --- |
| `cmdb_sam_sw_install` | Software installations |
| `cmdb_sam_sw_discovery_model` | Discovery models with normalization status |
| `cmdb_software_product_model` | Software models |
| `samp_sw_entitlement_definition` | Discovery maps |
| `alm_license` | Entitlements |
| `alm_entitlement_user`, `alm_entitlement_asset` | User and device allocations |
| `samp_reconciliation_result`, `samp_software_model_result`, `samp_license_metric_result` | Reconciliation results |
| `samp_sw_usage` | Software usage |
| `samp_sw_reclamation_rule`, `samp_sw_reclamation_candidate` | Reclamation rules and removal candidates |
| `samp_sw_product`, `samp_sw_publisher` | Content library products and publishers |

Plugin ids: `com.sn_samp_master_ws` (master with workspace), `com.sn_samp_master`, `com.snc.samp` (core), `com.snc.samp.content`, `com.snc.samp.microsoft`, `sn_sam_workspace` (workspace), `com.sn_sam_playbook` (guided experiences).

Roles: `sam_user` (use SAM), `sam_admin` (run reconciliation, manage reclamation rules), `snc_read_only` (platform wide read only).

## Appendix C: Security rules

* Only synthetic data. No employer, customer, personal or contract data, no real keys or purchase orders.
* The admin password lives in a password manager, never in the repository, a screenshot or a log.
* The visitor has `sam_user` and `snc_read_only` only. Never admin, `sam_admin`, `sam_developer`, `sam_integrator`, user or security administration, or script rights.
* The visitor stays inactive until Session 7 and is disabled again when not needed. Rotate its password if misuse is suspected.
* `scripts/check_repo.sh` runs before every commit and the CI workflow runs a full history secret scan on every push.
* `exports/` holds project owned artifacts only. ServiceNow product source is never copied into the repository.

## Appendix D: Recovery runbook

If the instance is reclaimed or wiped:

1. Session 0: request a Zurich instance; apply the release rule if Zurich is gone.
2. Session 1 steps 1 to 9: activate SAM Professional with demo data, install the workspace if needed.
3. Import `exports/release_01/*.xml` update sets: All, System Update Sets, Retrieved Update Sets, Import Update Set from XML, then Preview and Commit each in S1 to S6 order. This restores transform maps, reports, the dashboard and other configuration.
4. Session 2: re-run the seven imports from `data/northstar/`.
5. Session 3 steps 3 to 7: normalize the eight discovery models, recreate or import the software models (`exports/release_01` holds their XML), confirm discovery maps.
6. Session 4: recreate or import the entitlements, publish them, allocate Acrobat, run reconciliation.
7. Session 5: import usage, recreate or import the reclamation rule, run the candidate job.
8. Session 6 steps 4 and 5: recreate the visitor and retest.
9. Update the instance URL in `README.md`.

Six questions a reader must be able to answer from this repository alone: Which release? Which activation? Which exports restore configuration? Which data files are needed? In which order? Which checks prove the rebuild worked? The answers are: Zurich (or the recorded fallback); Software Asset Management Professional from the Developer Site, documented as `com.sn_samp_master_ws`; `exports/release_01`; `data/northstar/01` to `11`; the order above; the session checks.

## Appendix E: Acceptance checklist

| Id | Check | Session |
| --- | --- | --- |
| E01 | Instance reports the recorded release | 0 |
| E02 | SAM Professional plugins recorded with versions | 1 |
| E03 | Software Asset Workspace opens, or the classic fallback is documented | 1 |
| E04 | Content Service limit documented with evidence | 1 |
| E05 | 60 users, 57 devices, 248 installations, each with a discovery model | 2 |
| E06 | Normalization rate before and after recorded; Northstar models normalized | 3 |
| E07 | Five software models with discovery maps | 3 |
| E08 | Five published entitlements with cost and metric | 4 |
| E09 | Reconciliation positions: compliant, shortage, surplus recorded with evidence | 4 |
| E10 | Scenario B traced to installations | 4 |
| E11 | Microsoft per core logic explained from the publisher view | 5 |
| E12 | Twelve removal candidates with a savings figure | 5 |
| E13 | Dashboard answers the six management questions | 6 |
| E14 | Visitor negative tests all refused, positive tests pass | 6 |
| E15 | `exports/release_01` with manifest and verified checksums | 6 |
| E16 | `scripts/check_repo.sh` and the CI workflow pass | 7 |
| E17 | Every README and case study claim links to evidence | 7 |
| E18 | Recovery runbook answers the six questions | 7 |
| E19 | Five minute demonstration rehearsed | 7 |

## Appendix F: Prompt for an AI assisted session

Paste this at the start of a session with an AI assistant:

```
You are helping with the ServiceNow SAM Professional case study in the repository
Digital-Reserve/Servicenow-Project-SAM-Professional. Read README.md, GUIDE.md,
PROGRESS.md and docs/project_state.json. Tell me which session is next and list its
steps. As I work, help me verify each check, name the evidence files, and at the end
write the PROGRESS.md entry and update docs/project_state.json. Never ask me for the
admin password and never put credentials, cookies or real data into the repository.
Everything in the instance is synthetic. If a menu label differs from the guide, tell
me how to find it with the All search box or the table name.
```

## Appendix G: Decisions

| Id | Decision | Reason |
| --- | --- | --- |
| G01 | Zurich is the target release, with a seven day waitlist limit and Australia as the fallback | Zurich is N-1 behind Australia and Brazil general availability is expected in Q4 2026; a finished case study matters more than the release name |
| G02 | One guide, eight sessions, two to three hours each | The project runs at one or two sessions a week and must finish in weeks, not months |
| G03 | Synthetic Northstar estate loaded through Import Sets instead of relying on demo data | Reproducible, covers every scenario, and demonstrates import design; demo data stays as context |
| G04 | PDI limits are solved and shown, not excluded | The case study must read as a complete implementation |
| G05 | Visitor uses `sam_user` plus `snc_read_only` | Platform wide read only enforcement with SAM read access and no custom ACL work |
| G06 | Public repository surface: README, CASE_STUDY, GUIDE, PROGRESS, data, evidence, exports, scripts, docs for reference | Simple to understand in two minutes |
| G07 | No open source license file until the owner chooses one | Licensing is an owner decision |
| G08 | Record here any deviation taken during a session, with the date | Traceability |
