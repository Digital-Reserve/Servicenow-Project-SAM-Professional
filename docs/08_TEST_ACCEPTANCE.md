# Test and Acceptance Plan

## Test principle

Every major project claim requires a test. Record results in the weekly record with the test identifier.

## Test group A: Environment

| Id | Expected |
| --- | --- |
| A01 | The instance reports Zurich. |
| A02 | Project administrator can sign in and perform implementation tasks. |
| A03 | Developer Site shows the intended PDI. |

## Test group B: SAM activation

| Id | Expected |
| --- | --- |
| B01 | SAM Professional activation completed and the plugin list records which master plugin ids are present. |
| B02 | Software Asset Workspace opens, or decision D013 is recorded with the classic interface fallback. |
| B03 | Tables `cmdb_sam_sw_install`, `cmdb_sam_sw_discovery_model`, `cmdb_software_product_model`, `alm_license`, `samp_reconciliation_result` exist. |
| B04 | Roles `sam_user` and `sam_admin` exist. |
| B05 | SAM scheduled jobs exist and their names are recorded. |
| B06 | The workspace install path that worked is recorded in the weekly record. |

## Test group C: Inventory and normalization

| Id | Expected |
| --- | --- |
| C01 | A selected software installation is visible. |
| C02 | The installation maps to the expected discovery model. |
| C03 | Selected discovery models show understandable normalization results. |
| C04 | No accidental duplicate data undermines the demonstration. |
| C05 | The Content Service limitation on the PDI is documented with evidence. |

## Test group D: Software models

| Id | Expected |
| --- | --- |
| D01 | Selected model has correct publisher and product. |
| D02 | Model relationship to discovery content is understandable. |
| D03 | Metric assumptions are documented. |

## Test group E: Entitlements

| Id | Expected |
| --- | --- |
| E01 | Synthetic entitlement exists. |
| E02 | Quantity matches scenario design. |
| E03 | Entitlement maps to the correct software model. |
| E04 | Entitlement is Published and eligible for reconciliation. |

## Test group F: Reconciliation

| Id | Expected |
| --- | --- |
| F01 | Compliant scenario produces the intended result. |
| F02 | Shortage scenario: consumption exceeds rights. |
| F03 | Surplus scenario: rights exceed consumption. |
| F04 | Each result can be traced to its inventory and entitlement records. |

## Test group G: Publisher scenario

| Id | Expected |
| --- | --- |
| G01 | Selected publisher specific view is accessible. |
| G02 | The per core result can be explained without vague assumptions. |

## Test group H: Optimization

| Id | Expected |
| --- | --- |
| H01 | A synthetic reclamation candidate can be demonstrated. |
| H02 | Potential savings or equivalent benefit is visible or documented. |
| H03 | No real endpoint is affected. |

## Test group I: Visitor access

| Id | Expected |
| --- | --- |
| I01 | Visitor can sign in. |
| I02 | Visitor can view approved demonstration content. |
| I03 | Visitor cannot change demonstration data. |
| I04 | Visitor cannot access privileged platform administration. |
| I05 | Visitor cannot access credential records or secrets. |
| I06 | All sixteen negative tests in `07_VISITOR_ACCESS_SECURITY.md` pass. |

## Test group J: GitHub

| Id | Expected |
| --- | --- |
| J01 | README states project purpose and live demo clearly. |
| J02 | IMPLEMENTATION is accurate. |
| J03 | PROGRESS milestones match actual evidence. |
| J04 | Export folder contains only safe project owned artifacts. |
| J05 | Screenshots contain no secrets or personal data. |
| J06 | No credential or token is present in repository history or current files. |
| J07 | `scripts/check_repo.sh` and the CI workflow pass on the release commit. |

## Test group K: Recovery

| Id | Expected |
| --- | --- |
| K01 | Project owned update set export can be opened. |
| K02 | Required synthetic data export is documented. |
| K03 | Restore order is documented. |
| K04 | A new session can explain the rebuild without the original PDI. |
| K05 | `scripts/verify_exports.sh` passes for every release folder. |

## Final acceptance criteria

The project is accepted only when all critical tests pass, failed tests have been corrected or explicitly accepted as a documented limitation, visitor access passes all negative tests, GitHub contains no sensitive content, recovery artifacts are current, the live demonstration sequence has been rehearsed, and every major README claim is supported by evidence.
