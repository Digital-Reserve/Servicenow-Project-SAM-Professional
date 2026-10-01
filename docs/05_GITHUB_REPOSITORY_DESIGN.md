# GitHub Repository Design

## Goal

The repository should be small enough to understand immediately and complete enough to prove the project was implemented properly.

Repository: `Digital-Reserve/Servicenow-Project-SAM-Professional` (decision D009).

## Structure

Public facing (first screen):

* `README.md`
* `IMPLEMENTATION.md`
* `PROGRESS.md`
* `exports/`
* `evidence/`

Working record and automation (decision D010):

* `docs/` handover package, research, weekly records, synthetic data design, project state
* `scripts/` repository hygiene, export verification, synthetic data generator
* `.github/workflows/` automated checks on every push and pull request

## README purpose

The README is for a recruiter, interviewer, manager, or engineer who has not seen the project before. It answers:

1. What is being implemented?
2. Why?
3. Which ServiceNow release?
4. What SAM capabilities are demonstrated?
5. Where is the live instance?
6. How can a visitor access the demonstration?
7. What security limitations apply?
8. What evidence is available?
9. How can the project be recovered if the PDI disappears?

Every capability in the README carries a status. Nothing is listed as implemented before it is verified in the instance.

## IMPLEMENTATION purpose

The concise technical implementation record: architecture, activation, data flow, normalization, software models, entitlements, reconciliation, publisher scenario, optimization, roles, testing, export strategy. It explains what this project actually configured and does not reproduce ServiceNow documentation.

## PROGRESS purpose

The polished milestone record. One section per milestone with status and evidence links.

## exports folder

Store only project owned or safe artifacts: exported update set XML, scoped app source if a custom portfolio application was created, safe synthetic data exports, configuration manifests, `SHA256SUMS`.

Never store ServiceNow proprietary application source, full licensed SAM plugin content, real credentials, real customer data, authentication tokens, or browser cookies.

## evidence folder

Store selected screenshots only. Good evidence: Zurich release confirmation, SAM Workspace, normalization, entitlements, reconciliation, publisher view, optimization, visitor access, final dashboard.

## Live instance information

The README can contain the live instance URL, release, demo status, visitor username, and the visitor password only if the account was intentionally designed for public access and has passed the negative tests in `07_VISITOR_ACCESS_SECURITY.md`.

Never include the admin user, admin password, privileged tokens, personal access tokens, or integration credentials.

## Automated checks

`scripts/check_repo.sh` fails the build when it finds secret like strings, private keys, cookie values, forbidden file types, broken relative links or disallowed file types in `evidence/` and `exports/`. The workflow also validates `docs/project_state.json`, confirms the synthetic data files match the generator, verifies export checksums and runs a gitleaks history scan.

## Release strategy

At final completion:

1. Clean repository.
2. Run `scripts/check_repo.sh` and the CI workflow.
3. Verify all links.
4. Verify visitor access.
5. Verify live instance is healthy.
6. Create a Git tag such as `v1.0.0`.
7. Record the export bundle that corresponds to the release.
8. Capture the final README screenshot for evidence.

## Relationship between ServiceNow source control and this repository

ServiceNow source control is designed for scoped applications. Most SAM implementation work is configuration of an existing licensed application, not a new application.

1. Use update sets for project owned global customizations.
2. Use ServiceNow Studio source control only if a project owned scoped application is created, with its own repository or a clearly separated folder agreed with the owner.
3. Do not try to turn the licensed SAM Professional product itself into a Git repository.
4. Use this repository as the human readable project record and recovery package.
