# Execution Checklist

## Purpose

Use this file while working directly in the ServiceNow instance. Screen wording can vary by Zurich patch level, so verify each screen before committing a change. Do not skip a verification step merely because the previous action appeared successful.

# Stage 1: PDI

1. Sign in to the ServiceNow Developer Site.
2. Request Instance, select Zurich (shown as an earlier release). If absent, apply decision D014 and stop.
3. Record the instance URL.
4. Sign in as administrator.
5. Verify Zurich inside the instance.
6. Capture evidence.
7. Update project state.

Gate: do not continue until the release is verified.

# Stage 2: Change tracking

1. Open System Update Sets.
2. Create `SAM Portfolio Week 01 Foundation`.
3. Make it current.
4. Record its name in the weekly log.

Gate: every custom change must have a traceable home.

# Stage 3: SAM activation

1. Developer Site, Manage my instance, Plugins.
2. Search Software Asset Management; choose Software Asset Management Professional (may read Activate all Software Asset Management Professional plugins).
3. Activate with demo data.
4. Wait for completion; review activation history and progress workers.
5. On failure: retry once; then install base Software Asset Management from All Available Applications and retry; record label, error and timestamps.

Validation:

1. Plugin list: record which of `com.sn_samp_master_ws`, `com.sn_samp_master`, `com.snc.samp`, `com.snc.samp.content`, `com.snc.samp.microsoft`, `sn_sam_workspace` are present.
2. Verify `cmdb_sam_sw_install`, `cmdb_sam_sw_discovery_model`, `cmdb_software_product_model`, `alm_license`, `samp_reconciliation_result`.
3. Verify `sam_admin`, `sam_user`; record whether `sam_developer` exists.
4. Verify SAM scheduled jobs and record names.
5. Verify demo records exist.
6. Open Software Asset Workspace.
7. Record whether `sn_samp_content_service_setup` exists (expected absent).
8. Capture evidence.

Workspace missing:

1. All Available Applications: install Software Asset Management Guided Experiences (`com.sn_sam_playbook`, older name Software Asset Management Playbooks and Guided Setups `sn_sam_playbook`).
2. Else install Software Asset Workspace (`sn_sam_workspace`); if still hidden, Repair the application, clear cache, retry.
3. Else background script with `GlideMultiPluginManagerWorker` for `com.sn_sam_workspace`; record script and progress worker result.
4. Else invoke D013, continue in the classic interface, retry weekly.

Gate: do not create project data until activation validation passes.

# Stage 4: Baseline

Record Zurich patch level, SAM application versions, SAM related plugin list, demo data decision, software installation count, discovery model count, software model count, entitlement count, normalization overview by status, reconciliation overview. Capture screenshots before project specific data changes.

# Stage 5: Synthetic enterprise

Create Northstar Manufacturing records only where demo data does not cover a scenario. Use `synthetic_data/northstar/` files through Import Sets in this order: company and locations, departments, users, devices, software installations, entitlements, allocations. Record each transform map.

# Stage 6: Demonstration products

Confirm the five products in `synthetic_data/README.md`: publisher, product, version, edition, license metric, scenario purpose.

# Stage 7: Normalization

For each demonstration product: find the installation, open its discovery model, record discovered publisher, product, version, normalization status, normalized publisher, product, version, and whether a content rule or manual action was involved. Capture evidence. Record that Content Service updates are unavailable on the PDI.

# Stage 8: Software models

For each product: open the workspace, search software models, reuse a correct existing model where possible, create only if required, confirm publisher, product, version, edition, product type, discovery map, license metric. Capture evidence.

Gate: do not create an entitlement against an incorrect model.

# Stage 9: Entitlements

For each scenario: create the entitlement in the workspace, select the software model, enter synthetic purchase information, rights (packs where relevant), metric, cost, dates; save; Publish; verify it is eligible for reconciliation; capture evidence.

# Stage 10: Allocations

Allocate Adobe Acrobat Pro rights to the 40 synthetic users. Optionally allocate Project Professional to devices. Verify relationships. Capture one clear example.

# Stage 11: Reconciliation

Before running confirm inventory, normalized discovery models, correct software models, published entitlements, correct metrics, publisher prerequisites. Run reconciliation as `sam_admin` from the workspace or wait for SAM - Software License Reconciliation. For every product record rights owned, calculated consumption, compliance result, true up or surplus interpretation, financial result. Trace to source records. Capture evidence for compliant, shortage and surplus.

# Stage 12: Publisher scenario

Microsoft per core: identify the publisher view, confirm the metric, inventory inputs (core counts), entitlement inputs (packs), calculated result, any topology assumption. Capture evidence.

# Stage 13: Optimization

Select Project Professional. Review reclamation rules and the Flow Designer reclamation flows. Create or use a candidate. Review potential savings. Document approval and reclamation concept. Do not connect to a real endpoint removal process. Capture evidence.

# Stage 14: Reporting

Select views that answer: what software is present, how healthy is normalization, what rights are owned, where is compliance risk, where is cost optimization possible, which publisher scenario is demonstrated. Capture final management evidence.

# Stage 15: Visitor user

Create the visitor identity, assign only the intended read only role design, no privileged SAM roles, test in a private browser, run every negative test, correct unexpected access, retest from a fresh private session, enable public documentation only after the test passes.

# Stage 16: Export

Complete project update sets, Export to XML, export project owned scoped application if present, export curated synthetic data changes, create `MANIFEST.md` and `SHA256SUMS`, run `scripts/verify_exports.sh`, store only safe artifacts, record restore sequence.

# Stage 17: Repository

Verify live URL, visitor access, no admin credentials, no tokens, no customer data, no proprietary SAM source, evidence links, implementation accuracy. Run `scripts/check_repo.sh`.

# Stage 18: Final acceptance

Run every test group in `08_TEST_ACCEPTANCE.md`. Do not mark the project complete until critical tests pass, visitor access passes, exports are current, repository is clean, live demo works, and the five minute demonstration is rehearsed.
