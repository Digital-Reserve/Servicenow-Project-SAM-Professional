# AI Handover

## Mission

Continue the ServiceNow Software Asset Management Professional Zurich portfolio implementation from the current state until it is fully implemented, documented, tested, exportable, and presentation ready.

The next session is expected to execute the project methodically rather than redesigning the goal.

## Non negotiable project goals

1. Use a Zurich Personal Developer Instance as the live learning and portfolio environment.
2. Implement Software Asset Management Professional as realistically as possible within PDI limitations.
3. Prefer Software Asset Workspace for Zurich.
4. Use only synthetic, demo, or intentionally public demonstration data.
5. Keep GitHub small, clean, professional, and understandable to an interviewer or manager.
6. Preserve enough project artifacts to recover from PDI loss.
7. Do not store administrator credentials, tokens, cookies, session values, private keys, client data, or personal data in GitHub.
8. Provide a visitor experience only after least privilege testing.
9. Keep a weekly implementation record with evidence.
10. Do not claim a capability is implemented until it has been verified in the instance.

## Current state at handover (1 October 2026, package version 2)

Completed in this repository session:

* Handover package analysed and adopted into `docs/`.
* Online verification of all platform dependent claims completed. See `research/2026-10-01_platform_verification.md`.
* Repository structure, public summaries, synthetic data design, hygiene scripts and CI checks created.
* Week 00 record written in `weekly/W00_2026-10-01_repository_baseline.md`.

Not yet started:

* PDI: not yet requested
* Release: Zurich required
* SAM Professional: not yet activated
* Workspace: not yet validated
* Project data in the instance: not yet created
* Visitor user: not yet created
* Export package: not yet created

Read `project_state.json` before starting because a later session may already have updated these values.

## Verified ServiceNow facts to preserve

Verified online on 1 October 2026. Sources are listed in the research report.

1. ServiceNow documentation for Zurich supports requesting a PDI through the Developer Site, selecting a release when offered, and joining a waitlist when none is available. Leaving and rejoining the waitlist loses the queue position.
2. Zurich reached general availability on 10 September 2025. Australia reached general availability on 5 May 2026. Brazil entered early availability on 24 September 2026 and Brazil PDIs are available. Zurich is the N-1 release today and becomes N-2 when Brazil reaches general availability.
3. PDI availability is not guaranteed and waits of several days occurred throughout 2026.
4. PDIs are for learning, exploration, and experimentation, not production use.
5. PDIs hibernate when idle with data preserved, and are reclaimed after a 10 day period of inactivity on the Developer Site. Sign in at least weekly.
6. A PDI cannot be downgraded. To use an older release, release the instance and request a new one.
7. Paid and premium plugins cannot be activated from inside a PDI, but can be activated from the Developer Site where ServiceNow allows it. Many Store applications cannot be installed on PDIs.
8. On the Developer Site the SAM Professional activation appears as Software Asset Management Professional (also seen as Activate all Software Asset Management Professional plugins), with an option to load demo data. Activations have succeeded on PDIs as recently as June 2026, and first attempts often fail; see Phase 3 for the retry pattern.
9. `com.sn_samp_master_ws` is the Zurich master workspace activation. It internally activates `com.sn_samp_master` and the Store application `sn_sam_workspace`.
10. The Software Asset Workspace frequently does not install with the Developer Site activation on a PDI. Verified remedies are installing `com.sn_sam_playbook` (Software Asset Management Guided Experiences, earlier named Software Asset Management Playbooks and Guided Setups, `sn_sam_playbook`) or installing `sn_sam_workspace` and running a repair.
11. The SAM Content Service is not available on a PDI. The `sn_samp_content_service_setup` table is absent and content service features are restricted to licensed customer environments. Normalization on a PDI uses the shipped content library, demo data, normalization suggestions and manual normalization.
12. SaaS License Management is a separate Store application and is reported as not available for PDIs.
13. Beginning with Xanadu, the classic SAM interface has limited support; Zurich favors Software Asset Workspace. The classic interface remains active and is the documented fallback.
14. Software installations are stored in `cmdb_sam_sw_install`, discovery models in `cmdb_sam_sw_discovery_model`, software models in `cmdb_software_product_model`, entitlements in `alm_license`, user and device allocations in `alm_entitlement_user` and `alm_entitlement_asset`, reconciliation results in `samp_reconciliation_result`, `samp_software_model_result` and `samp_license_metric_result`, reclamation rules and candidates in `samp_sw_reclamation_rule` and `samp_sw_reclamation_candidate`.
15. New entitlements are created in Draft and must be Published; draft entitlements are not considered by reconciliation.
16. SAM Professional installs `sam_user` and `sam_admin`. `sam_admin` runs reconciliation and manages reclamation rules. `sam_developer`, `sam_integrator` and `sam_spend_import` are reported by the community and must be confirmed in the instance.
17. Zurich migrated SAM reclamation automation from legacy Workflow to Flow Designer. After Zurich the legacy Workflow editor is hidden.
18. Zurich SAM additions include Microsoft Hyper-V virtualization support, SQL Server availability group compliance, Organizational license positions and Adobe SaaS guided setup. Now Assist for SAM features need Now Assist entitlements and are out of scope.
19. Update sets are appropriate for moving platform customizations. Export to XML requires the Complete state.
20. ServiceNow Studio in Zurich supports Source Control for scoped applications. On a PDI the Studio plugin may need updating before the option appears. Only project owned scoped applications belong in source control; the licensed SAM product must not be copied to GitHub.
21. XML export can be used for selected records.

## Execution discipline

For every phase:

1. Read the phase objective.
2. Verify prerequisites.
3. Perform only the listed changes.
4. Capture screenshots or other evidence.
5. Record exact settings that changed.
6. Record any deviation and why.
7. Execute the phase tests.
8. Update `project_state.json`.
9. Update the weekly progress document.
10. Run `scripts/check_repo.sh`, commit and push.
11. Only then move to the next phase.

## If Zurich is unavailable

Do not silently switch release families.

Use this decision order:

1. Join the Zurich waitlist if Zurich is shown but unavailable.
2. If Zurich is not offered at all, record that blocker in the weekly record and in `project_state.json`.
3. Recheck current ServiceNow Developer documentation and availability.
4. Only use another release if the project owner explicitly changes the Zurich requirement. Decision D014 records the recommendation to put to the owner.
5. Do not create the implementation on a newer release and label it Zurich.

## If SAM Professional activation fails

1. Confirm the PDI is healthy and awake.
2. Confirm the release is Zurich.
3. Retry once from the Developer Site Manage my instance page.
4. If it fails again, install the base Software Asset Management application from All Available Applications inside the instance, then retry the Developer Site activation. This sequence is reported to resolve repeated failures.
5. Record the exact activation name and exact error.
6. Check activation history and the progress worker list.
7. Use Instance Help only if the Developer Site directs PDI users there. Support is not provided for PDIs.
8. Do not install unrelated plugins as a workaround.
9. Do not claim SAM Professional is active merely because one dependency exists.

## Data policy

Use only:

* ServiceNow supplied demo data
* Synthetic users
* Synthetic devices
* Synthetic companies
* Synthetic purchase data
* Synthetic license entitlements
* Synthetic software installations
* Publicly known software product names used only for learning

Never use:

* Employer data
* Customer data
* Real employee lists
* Real license keys
* Real contracts
* Real purchase orders
* Real discovery exports from a client environment
* Secrets or authentication data

## Deliverable philosophy

The live PDI demonstrates the implementation.

GitHub demonstrates engineering discipline, documentation quality, repeatability, governance, and evidence.

The project should look credible because it is coherent and verifiable, not because the repository contains a large number of files.
