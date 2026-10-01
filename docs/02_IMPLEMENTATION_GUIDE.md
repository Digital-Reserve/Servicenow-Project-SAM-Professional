# Detailed Implementation Guide

Package version 2. Phases marked "updated" were changed after the 1 October 2026 verification. See `HANDOVER_CHANGELOG.md`.

## Phase 0: Project foundation (complete)

### Objective

Establish a controlled implementation project before changing the instance.

### Result

* Repository: `Digital-Reserve/Servicenow-Project-SAM-Professional`.
* Scope frozen as listed below.
* Project identifier used everywhere: `SAM Portfolio`.
* Evidence rules defined in `04_WEEKLY_PROGRESS_SYSTEM.md`.

Core scope:

* Zurich PDI
* SAM Professional
* Software Asset Workspace (classic interface as documented fallback)
* Software inventory
* Discovery model normalization within PDI limits
* Software models
* Entitlements
* Allocations where relevant
* Reconciliation
* Compliance interpretation
* Optimization and reclamation demonstration
* Publisher focused demonstration (Microsoft)
* Dashboards and management story
* Weekly progress documentation
* Export and recovery
* Visitor demonstration access

Optional scope:

* Additional publisher scenarios
* Service Graph connectors
* Discovery with a MID Server
* Custom scoped showcase application
* Custom reporting beyond standard workspace views

Excluded by platform limitation on a PDI (document, do not attempt):

* SAM Content Service sharing and content downloads
* SaaS License Management
* Now Assist for SAM

### Exit criteria

Met on 1 October 2026.


## Phase 1: Request the Zurich PDI

### Objective

Obtain the correct instance family before any implementation begins.

### Procedure

1. Sign in to the ServiceNow Developer Site.
2. Click Request Instance.
3. Select Zurich. The current release is Australia and Brazil is in early availability, so Zurich appears as an earlier release if it is offered at all.
4. Request the instance.
5. If no Zurich instance is available, join the Zurich waitlist. Do not leave and rejoin the waitlist because the queue position is lost.
6. If Zurich is not offered, apply decision D014 and stop.
7. When assigned, record:
   * Instance URL
   * Release family and patch (System Diagnostics, Stats, or Help, About)
   * Instance identifier
   * Provision date
8. Store the administrator password in a password manager.
9. Never write the administrator password into GitHub or the handover files.
10. Sign in to the PDI.
11. Verify the system reports Zurich before continuing.

### Verification

Capture evidence of:

* Developer Site instance page
* Instance URL
* Zurich release identification
* Successful administrator sign in

### PDI operating rule

The PDI hibernates when idle and is reclaimed after 10 days without a Developer Site sign in.

Therefore:

1. Sign in to the Developer Site at least weekly.
2. Keep all important project owned work backed up.
3. Treat GitHub and exported artifacts as recovery material.
4. Never rely on the PDI as the only copy of project work.

### Exit criteria

A healthy Zurich PDI is available and release family verification is captured.


## Phase 2: Establish implementation governance inside the PDI

### Objective

Create traceability before activation and customization.

### Actions

1. Create a dedicated local project administrator user for implementation work if desired.
2. Do not use the eventual visitor account for implementation.
3. Create an update set naming convention for any project owned global customizations.

Recommended pattern:

`SAM Portfolio Week 01 Foundation`

Then Week 02, Week 03, and so on.

4. Before any customization, select the correct current update set.
5. Do not mix unrelated changes into one update set.
6. Record all configuration changes in the weekly log.

### Important distinction

Activating ServiceNow plugins is not the same as creating project owned customizations.

The licensed SAM application remains a ServiceNow product.

Your update sets should capture your own configuration changes where the platform supports capture.

### Exit criteria

Change traceability is established before project customization.


## Phase 3: Activate SAM Professional for Zurich (updated)

### Objective

Install the required Zurich SAM Professional capability and workspace.

### Documented activation

`com.sn_samp_master_ws` (Software Asset Management Professional Master Workspace). It internally activates `com.sn_samp_master` and the Store application `sn_sam_workspace`.

### Procedure on a PDI

1. On the Developer Site open Manage my instance, then Plugins (the profile menu Activate Plugin path leads to the same list).
2. Search for Software Asset Management. Select Software Asset Management Professional. The entry may read Activate all Software Asset Management Professional plugins.
3. Choose the option that loads demo data.
4. Start activation. Do not make unrelated changes while activation is running. Activation can take an hour or more.
5. If activation reports failure:
   1. Retry once from Manage my instance.
   2. If it fails again, inside the instance open All, System Applications, All Available Applications, All, install the base Software Asset Management application, then retry step 2.
   3. Record the exact label, the exact error and the time of each attempt in the weekly record.
6. Verify rather than assume success.

### Post activation verification

Verify all of the following and record the result:

1. Plugin list shows the SAM Professional plugins. Record which of `com.sn_samp_master_ws`, `com.sn_samp_master`, `com.snc.samp`, `com.snc.samp.content`, `com.snc.samp.microsoft` are present with versions.
2. `cmdb_sam_sw_install` exists.
3. `cmdb_sam_sw_discovery_model` exists.
4. `cmdb_software_product_model` exists.
5. `alm_license` exists.
6. `samp_reconciliation_result` exists.
7. Roles `sam_user` and `sam_admin` exist. Record whether `sam_developer` exists.
8. Scheduled jobs whose names begin with SAM exist. Record the reconciliation, normalization and reclamation job names found.
9. Demo records exist in the four core tables.
10. Software Asset Workspace opens.
11. `sn_samp_content_service_setup` is expected to be absent. Record its presence or absence as evidence of the Content Service limitation.

### If Software Asset Workspace is missing

Work through the options in order and record which one worked:

1. In the instance open All, System Applications, All Available Applications, All. Search for Software Asset Management Guided Experiences (`com.sn_sam_playbook`). Older listings name it Software Asset Management Playbooks and Guided Setups (`sn_sam_playbook`). Install it. It installs `sn_sam_workspace` with it.
2. If that application is not listed, search the same page for Software Asset Workspace (`sn_sam_workspace`) and install it. If it is installed but the workspace still does not appear, open the application record and run Repair, then clear the browser cache and retry.
3. Last resort used on Xanadu PDIs: run a background script that calls `GlideMultiPluginManagerWorker` for `com.sn_sam_workspace` and monitor the Plugin Installer progress worker. Record the script text in the weekly record.
4. If none of the above works after two attempts, continue with the classic SAM interface (SAM Professional application menu), record decision D013 as invoked, and keep retrying the workspace at the start of every later week.

### Roles to understand

At minimum, document:

* `sam_admin`
* `sam_user`
* `sam_developer` if present

Do not grant roles broadly.

### Optional applications

Do not install every optional application merely because it exists.

SaaS License Management is excluded by platform limitation. Install optional components only when they directly support a documented scenario.

### Exit criteria

SAM Professional is operational, the workspace status is recorded, and evidence has been captured.


## Phase 4: Baseline the environment

### Objective

Create a known starting point after SAM activation.

### Actions

Record:

1. Release family and patch level.
2. Installed SAM related plugins and applications with versions.
3. Whether demo data was loaded.
4. SAM roles present.
5. Key scheduled jobs.
6. Key workspace modules.
7. Initial record counts for:
   * software installations
   * software discovery models
   * software models
   * entitlements
8. Initial normalization state (count by normalization status).
9. Initial reconciliation state.
10. Any visible publisher data.

### Why this matters

The baseline allows you to prove what changed during the project and helps recovery if a PDI must be recreated.

### Exit criteria

A baseline evidence set and baseline progress entry exist.


## Phase 5: Configure the implementation operating model

### Objective

Define how this portfolio implementation will represent a realistic SAM program.

### Demonstration model

The synthetic enterprise is Northstar Manufacturing. Its design, scenarios and generated import files are in `synthetic_data/README.md`. Summary:

* 1 company, 3 locations, 6 departments
* 60 users
* 45 workstations
* 12 servers
* Five demonstration products with one scenario each

Scenario A, fully compliant: Adobe Acrobat Pro, per user.

Scenario B, under licensed: Microsoft SQL Server 2022 Standard, per core, true up exposure.

Scenario C, over licensed: Microsoft Visio Professional 2021, per device, optimization opportunity.

Scenario D, reclamation candidate: Microsoft Project Professional 2021, per device, installed but unused.

Scenario E, publisher specific calculation: Microsoft Windows Server 2022 Standard, per core with Microsoft minimums.

The numbers may be reduced inside the PDI if manual effort requires it. The logic matters more than volume.

### Exit criteria

The synthetic enterprise model and scenarios are documented before data creation. Met in this repository; confirm against demo data once the instance exists.


## Phase 6: Normalization on a PDI (updated)

### Objective

Demonstrate one of the core differentiators of SAM Professional, normalized software data, within the limits of a PDI.

### Platform limitation

The SAM Content Service is not available on a PDI. Do not try to enable content sharing or content downloads. Normalization relies on:

1. The content library rules shipped with the plugin.
2. Demo data discovery models that are already normalized.
3. Normalization suggestions and manual normalization.

### Concepts to demonstrate

1. Software installations represent discovered installed software.
2. Discovery models group discovered publisher, product, and version patterns.
3. Normalization standardizes these patterns.
4. Normalized data is then used to connect installations to software models and support reconciliation.

### Actions

1. Open the normalization views in Software Asset Workspace (or SAM Professional, Normalization in the classic interface).
2. Confirm the normalization scheduled jobs exist and record their names and schedules.
3. Run or wait for SAM - Normalize discovery models using content library rules.
4. Count discovery models by status: Normalized, Partially Normalized, Publisher Normalized, Match Not Found, Manually Normalized.
5. For the five demonstration products, record discovered values, normalized values and status.
6. Use normalization suggestions or manual normalization for demonstration products that are not normalized, and record every manual action.
7. Capture examples of each status.

### Normalization quality target

For the curated demonstration dataset, aim for a high normalization percentage.

Do not manipulate statuses only to improve a dashboard.

The evidence should show a legitimate path from discovered software to normalized software and must state that automated content updates were unavailable.

### Exit criteria

Normalization behavior is demonstrated and measured, and the limitation is documented.


## Phase 7: Build the software inventory demonstration

### Objective

Create or use an inventory of installed software that supports later reconciliation.

### Preferred data order

1. Use ServiceNow demo data first.
2. Add synthetic data only where needed to create specific scenarios. Use the generated files in `synthetic_data/northstar/` through Import Sets with a documented transform map.
3. Document the import source and mapping.
4. Avoid direct table manipulation unless the platform workflow requires it and the method is understood.

### Key records

Software Installation: `cmdb_sam_sw_install`

Software Discovery Model: `cmdb_sam_sw_discovery_model`

Software Model: `cmdb_software_product_model`

### Inventory quality checks

For selected demonstration products verify:

1. Publisher is present.
2. Product name is present.
3. Version information is present where applicable.
4. Installation points to a device or user context as expected.
5. Discovery model relationship exists.
6. Normalized publisher and product are populated when supported.
7. Duplicates are understood and not accidental.

### Evidence

Capture one end to end example showing device or user context, then software installation, then discovery model, then normalized software identity, then software model relationship.

### Exit criteria

At least three coherent software product scenarios have reliable inventory data.


## Phase 8: Create and validate software models

### Objective

Represent the software products whose license position will be managed.

### Procedure

1. Open Software Asset Workspace.
2. Locate software models.
3. Review models provided by demo data and content.
4. For each selected demonstration product, confirm publisher, product, version, edition, product type, discovery map, and license metric.
5. Where a publisher part number is known, prefer creating the model from the part number so enrichment is applied automatically.
6. Create or adjust only the models needed for the portfolio scenarios.
7. Avoid unnecessary duplicate models.

### Demonstration target

Maintain the five models defined in `synthetic_data/README.md`.

### Exit criteria

Selected software models are clean, understandable, and linked to the intended inventory.


## Phase 9: Create software entitlements

### Objective

Represent the rights owned by the synthetic organization.

### Key table

`alm_license`

### Entitlement design principles

For each demonstration product document what was purchased, quantity, license metric, software model, purchase date, effective dates, unit cost, contract relationship if used, allocation behavior, and upgrade or downgrade rights if relevant.

For Microsoft products sold in packs record rights per pack and number of packs.

### Suggested synthetic entitlement set

Use `synthetic_data/northstar/entitlements.csv`. It intentionally produces one compliant position, one shortage, one surplus and one reclaim opportunity.

### Publishing entitlements

New entitlements are created in Draft. Publish each entitlement. Draft entitlements are ignored by reconciliation.

### Quality checks

1. No real license keys.
2. No real company contracts.
3. No copied customer purchase data.
4. Quantities and costs are internally consistent.
5. The entitlement maps to the correct software model.
6. The entitlement is Published.

### Exit criteria

Entitlements are valid, published and eligible for reconciliation.


## Phase 10: Configure allocations where the scenario requires them

### Objective

Demonstrate the distinction between purchased rights and rights allocated to a user or device.

### Actions

1. Allocate the Adobe Acrobat Pro entitlement to the 40 synthetic users (`alm_entitlement_user`).
2. Optionally allocate Project Professional to devices (`alm_entitlement_asset`).
3. Verify quantity and relationship behavior.
4. Record how allocation affects the scenario.

### Exit criteria

At least one allocation scenario is demonstrated where it adds educational value.


## Phase 11: Reconciliation (updated)

### Objective

Calculate compliance positions from owned rights and software consumption.

### Before reconciliation

Verify:

1. Inventory exists.
2. Discovery models are normalized sufficiently.
3. Software models are correct.
4. Entitlements are Published.
5. License metrics are correct.
6. Publisher specific prerequisites are present for the selected scenario (Microsoft pack, device core counts populated).

### Procedure

1. Open the reconciliation capability in Software Asset Workspace (License Operations) as `sam_admin`, or wait for the scheduled job SAM - Software License Reconciliation.
2. Run reconciliation.
3. Review results in `samp_reconciliation_result`, `samp_software_model_result` and `samp_license_metric_result`.
4. Trace at least one result back to entitlement, software model, discovered installations or consumption, and calculated position.

### Required results

Demonstrate compliant, under licensed and over licensed positions.

### Evidence

For every result capture product, owned rights, calculated consumption, result, financial interpretation if cost was configured, and root records supporting the result.

### Exit criteria

A viewer can understand why each selected product has its calculated position.


## Phase 12: Publisher focused implementation (updated)

### Objective

Show that SAM Professional goes beyond simple license counting.

### Primary publisher

Microsoft. The Microsoft publisher pack (`com.snc.samp.microsoft`) is installed with the master plugin and provides the per core logic for Windows Server and SQL Server.

### Scope

Scenario E, Windows Server 2022 Standard per core on physical servers: Microsoft minimums of 8 cores per processor and 16 cores per server, sold in 2 core packs. Scenario B, SQL Server 2022 Standard per core: 4 core minimum per server, 2 core packs. Verify the pack's calculation in the instance rather than assuming the rule text.

Zurich additions that can be mentioned but are not required: Hyper-V virtualization support and SQL Server availability group passive failover handling.

### Do not overextend

A portfolio project does not need to reproduce an enterprise IBM, Oracle, SAP, Adobe, Citrix, and VMware deployment simultaneously.

### Evidence

Capture publisher overview, selected product position, relevant metric, and an explanatory note written in your own words.

### Exit criteria

At least one publisher specific capability is understandable in a five minute demonstration.


## Phase 13: Optimization and reclamation (updated)

### Objective

Demonstrate how SAM moves from compliance reporting to cost optimization.

### Scenario

Scenario D, Project Professional 2021: 28 installations, 12 not used for more than 90 days.

### Actions

1. Review reclamation rules (`samp_sw_reclamation_rule`) and the Zurich Flow Designer flows Software Asset Reclamation Flow and Software Asset Reclamation line flow.
2. Confirm which usage field the reclamation rule evaluates and whether synthetic last used values on installations satisfy it. Record the answer.
3. Create one reclamation rule for the scenario or use an existing one.
4. Run SAM - Identify New Reclamation Candidates or the workspace action.
5. Review candidates (`samp_sw_reclamation_candidate`) and potential savings.
6. Do not connect the PDI to real device removal tooling.
7. Document the lifecycle concept from identification to review to reclaim action.

### Zurich note

Reclamation automation is Flow Designer based in Zurich. Do not create legacy Workflow versions.

### Exit criteria

The project contains one understandable optimization story.


## Phase 14: Reporting and management story

### Objective

Turn configuration into a management ready demonstration.

### Required story

The live instance should answer:

1. What software do we have?
2. How much of it is normalized?
3. What rights do we own?
4. Where are we noncompliant?
5. Where can we save money?
6. What publisher requires attention?
7. What implementation progress has been completed?

### Dashboard selection

Prefer standard workspace analytics where possible. Add custom reports only if a standard view does not tell the required story.

### Suggested evidence set

Workspace landing view, normalization view, entitlement view, compliance result, optimization view, publisher view.

### Exit criteria

A manager can understand the project without navigating raw tables.


## Phase 15: SaaS License Management (updated, excluded)

SaaS License Management is a separate Store application that is reported as not installable on PDIs. It is excluded from scope by platform limitation. Document the exclusion in the README and IMPLEMENTATION. Do not present a partial integration.

If a later verification shows the application is installable on the PDI, open a decision and keep the scope to one concise scenario.


## Phase 16: Project owned enhancements

### Objective

Add only those customizations that improve the portfolio without obscuring the standard product.

### Good examples

* concise custom report
* project landing module
* read only visitor landing page
* custom scoped portfolio showcase application
* implementation status view

### Poor examples

* changing core SAM behavior without a clear requirement
* editing numerous out of box forms only for appearance
* replacing standard workspace functions with custom code
* storing demonstration logic in untracked global scripts

### Exit criteria

Any customization has a documented business reason and can be exported.


## Phase 17: Testing

Use `08_TEST_ACCEPTANCE.md`.

Do not proceed to public visitor access until tests pass.


## Phase 18: Visitor demonstration access

Use `07_VISITOR_ACCESS_SECURITY.md`.

The public portfolio user must never have admin, `sam_admin`, `sam_developer`, elevated write access, configuration rights, integration administration, access to credentials, or access to non synthetic sensitive data.

### Exit criteria

Visitor access is verified using a private browser session and negative tests.


## Phase 19: Export and recovery (updated)

Use `06_EXPORT_BACKUP_RECOVERY.md`.

Minimum final export:

1. Completed update sets for project owned global customizations.
2. Source control export for any project owned scoped application.
3. Safe XML or CSV data exports required to rebuild curated demonstration data.
4. Configuration inventory.
5. Screenshots.
6. Test results.
7. Plugin and application inventory.
8. Recovery instructions.
9. `SHA256SUMS` per release folder, verified by `scripts/verify_exports.sh`.

### Exit criteria

The project can be rebuilt without relying on the current PDI remaining available.


## Phase 20: GitHub finalization

The public facing files are `README.md`, `IMPLEMENTATION.md`, `PROGRESS.md`, `exports/` and `evidence/`. The `docs/` and `scripts/` folders stay because they are the working record and the automation; keep them tidy.

### Exit criteria

A reviewer can understand the project in less than two minutes from the README and can then choose to explore the live instance or detailed implementation record.


## Phase 21: Final demonstration

Use `12_DEMO_AND_INTERVIEW_GUIDE.md`.

### Final completion statement

The project should be presented as a controlled portfolio implementation of SAM Professional in a ServiceNow Zurich PDI using synthetic data. Do not present the PDI as a production deployment.
