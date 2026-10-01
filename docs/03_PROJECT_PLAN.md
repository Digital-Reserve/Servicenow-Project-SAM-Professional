# Project Plan

## Project name

ServiceNow Software Asset Management Professional Zurich Portfolio Implementation

## Primary objective

Implement and document an end to end SAM Professional demonstration in a Zurich PDI that can be reviewed by technical interviewers and management.

## Suggested duration

Ten implementation weeks after Week 0. The work can be compressed or extended, but the phase order should remain stable.

## Calendar constraint

Zurich is the N-1 release today. Brazil is expected to reach general availability in Q4 2026, after which Zurich becomes N-2 and may disappear from the Developer Site request list. Request the Zurich PDI as early as possible and keep it alive by signing in weekly.

## Week 0: Repository and research baseline (complete, 1 October 2026)

Delivered:

* Handover analysed and adopted into `docs/`
* Platform verification report with sources
* Repository structure, public summaries, synthetic data design and generator
* Hygiene scripts and CI checks

## Week 1: Environment and activation

Objectives:

* Obtain Zurich PDI
* Verify release
* Establish project governance
* Activate SAM Professional with demo data
* Validate Software Asset Workspace or record the fallback
* Capture baseline

Deliverables: PDI evidence, plugin evidence, workspace evidence, baseline record counts, first progress report.

Exit condition: SAM Professional is healthy enough to continue.

## Week 2: SAM foundation and data model

Objectives:

* Understand key SAM tables
* Confirm the synthetic enterprise against demo data
* Confirm demonstration publishers
* Confirm scenarios
* Review roles
* Review scheduled jobs
* Document the Content Service limitation

Deliverables: scenario catalog, data design, role design, initial normalization evidence.

Exit condition: The target implementation model is clear.

## Week 3: Software inventory and normalization

Objectives:

* Build or refine software inventory
* Validate discovery models
* Validate normalization
* Resolve obvious data quality issues
* Measure normalization

Deliverables: inventory evidence, normalized examples, unresolved normalization list, quality notes.

Exit condition: Selected products have reliable normalized inventory.

## Week 4: Software models and entitlements

Objectives:

* Select software models
* Create and publish synthetic entitlements
* Document metrics
* Create allocation example where useful

Deliverables: software model evidence, entitlement evidence, synthetic purchase assumptions, allocation evidence.

Exit condition: Rights owned are represented cleanly.

## Week 5: Reconciliation and compliance

Objectives:

* Run reconciliation
* Validate compliant position
* Validate shortage
* Validate surplus
* Trace results to source records

Deliverables: reconciliation evidence, compliance explanation, issue log for incorrect results.

Exit condition: At least three positions are explainable.

## Week 6: Publisher scenario

Objectives:

* Implement the Microsoft per core scenario
* Document metric behavior
* Capture publisher workspace evidence

Deliverables: publisher scenario, calculation explanation, screenshots.

Exit condition: The project demonstrates depth beyond basic inventory.

## Week 7: Optimization and reclamation

Objectives:

* Configure or demonstrate reclamation
* Identify a synthetic savings opportunity
* Explain process controls
* Avoid any real endpoint action

Deliverables: optimization scenario, potential savings evidence, flow explanation.

Exit condition: The project demonstrates optimization value.

## Week 8: Reporting and portfolio presentation

Objectives:

* Refine management views
* Create minimal custom reporting only if necessary
* Build the demonstration narrative
* Start visitor access design

Deliverables: management view set, demo sequence, visitor design.

Exit condition: The story is understandable without raw table navigation.

## Week 9: Security, visitor access, and recovery

Objectives:

* Implement least privilege visitor access
* Perform negative access testing
* Export customizations
* Export safe demonstration data
* Test recovery instructions

Deliverables: visitor account test, permission matrix, update set exports, source control exports if applicable, safe data export bundle with checksums.

Exit condition: Public demonstration risk is acceptable and recovery artifacts exist.

## Week 10: GitHub release and final acceptance

Objectives:

* Clean GitHub structure
* Finalize README
* Finalize progress summary
* Add final evidence
* Run complete acceptance test
* Tag project release

Deliverables: public repository, live demo details, final acceptance report, final export bundle, project retrospective.

Exit condition: The project is presentation ready.

## Phase gate rule

A week number is not the same as completion. If a phase fails its exit condition, keep the project in that phase until it is corrected. The progress file must record the actual state rather than the intended schedule.

## Risk register

| Id | Risk | Impact | Response |
| --- | --- | --- | --- |
| R1 | PDI unavailable | No live environment | Join the Zurich waitlist and record the blocker. Do not silently change release. |
| R2 | PDI reclaimed | Loss of live instance and local data | Sign in weekly. Maintain exports and repository evidence throughout. |
| R3 | SAM plugin activation fails | Core scope blocked | Retry pattern in Phase 3. Capture exact error. No unrelated plugins. |
| R4 | Data quality prevents reconciliation | Incorrect compliance results | Trace install to discovery model to normalized product to software model to entitlement. |
| R5 | Public visitor has excessive access | Security and integrity risk | Least privilege, synthetic data, negative testing, no privileged public credentials. |
| R6 | GitHub exposes sensitive data | Credential or data disclosure | `scripts/check_repo.sh` and CI secret scan before every push. |
| R7 | Repository becomes cluttered | Poor reviewer experience | Keep the top level minimal; working notes stay in `docs/`. |
| R8 | Portfolio claims exceed what was implemented | Credibility risk | Every README claim must map to evidence. |
| R9 | Software Asset Workspace cannot be installed on the PDI | Primary experience unavailable | Phase 3 fallback options, then classic interface with decision D013 recorded. Retry weekly. |
| R10 | Zurich no longer selectable on the Developer Site after Brazil general availability | Release requirement cannot be met | Request early. If unavailable, apply decision D014 and escalate to the owner. |
| R11 | Content Service unavailable on PDI limits normalization | Lower normalization rate, no content updates | Phase 6 rescope, manual normalization, limitation stated in evidence. |
| R12 | Demo data does not load with activation | Fewer baseline records | Reload demo data from the plugin record or retry activation; synthetic import files cover the scenarios. |
