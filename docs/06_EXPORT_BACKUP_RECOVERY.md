# Export, Backup, and Recovery

## Objective

Protect the project from PDI hibernation, reclamation, corruption, or rebuild.

## Core principle

A PDI is not a durable environment. The Developer Program states it is not responsible for lost work and recommends source control or update sets. Back up project owned artifacts frequently.

## What should be exported

### Project owned customizations

Use System Update Sets. Examples: custom reports, custom list or form configuration, custom business rules created for the project, custom modules, custom ACLs, custom UI components.

Mark the update set Complete, then use Export to XML on the update set. An in progress update set cannot be exported with the supported action.

### Project owned scoped application

If a scoped portfolio showcase application is created, use ServiceNow Studio Source Control (available in Zurich; update the Studio plugin on the PDI if the option is missing) or an application export supported by the platform. Keep that application isolated from the licensed SAM product.

### Curated synthetic data

Export only safe synthetic data needed to recreate the demonstration, as XML (preserves identifiers) or CSV (readable, simple reimport). The generated import files in `docs/synthetic_data/northstar/` are the primary rebuild source; export instance records only where values were changed inside the instance.

### Documentation

Always preserve activation inventory, plugin inventory, implementation settings, role matrix, test results, decision log, weekly progress, screenshots.

## What must never be in the repository

Admin password, visitor password before hardening, secret tokens, API credentials, browser cookies, encrypted credential records, real organization data, real employee data, real contracts, real software keys, ServiceNow proprietary licensed source.

## Backup cadence

After every major phase and at least weekly:

1. Export completed update sets.
2. Export critical synthetic data changes if needed.
3. Commit documentation.
4. Add selected evidence.
5. Update project state.

## Recovery package structure

For each stable milestone create `exports/release_<nn>/` containing:

* update set XML files
* synthetic data exports
* `MANIFEST.md` (copy `exports/MANIFEST_TEMPLATE.md`)
* application source if project owned
* `SHA256SUMS` generated with `sha256sum * > SHA256SUMS` inside the folder

Run `scripts/verify_exports.sh` before committing. It checks that every XML parses, every CSV is readable, the manifest exists and the checksums match.

## Recovery procedure

If the PDI is lost:

1. Request another Zurich PDI if still available. If Zurich is not offered, apply decision D014.
2. Verify release.
3. Activate SAM Professional from the Developer Site with demo data (Phase 3), including the workspace fallback.
4. Verify the same base components and record versions.
5. Import project owned update sets through Retrieved Update Sets, Import Update Set from XML, then Preview and Commit.
6. Restore any project owned scoped application.
7. Reimport curated synthetic data in dependency aware order.
8. Reconfigure settings not captured automatically.
9. Run normalization.
10. Publish entitlements and run reconciliation.
11. Perform full acceptance testing.
12. Recreate visitor access.
13. Update the live URL in the README if the instance identifier changed.

## Data restore order

1. Synthetic company, locations, departments
2. Synthetic users
3. Synthetic devices and configuration items
4. Software models if project owned records are needed
5. Software installations
6. Entitlements (then publish)
7. Allocations
8. Project configuration
9. Reports
10. Visitor access

Do not import records blindly. Relationships and system identifiers must be checked.

## Export validation

An export is valid only when the file is readable, its contents are recorded in the manifest with creation date and source, the restore sequence is recorded, no secret is present, and the checksum verifies.

## PDI survival practice

Sign in to the Developer Site weekly, do not rely on hibernation as a backup, preserve current exports, preserve Git history, keep final evidence outside the PDI.

## Final recovery test

Before project completion, perform a paper recovery review. A second person or AI session should be able to read the repository and answer:

1. Which release is required?
2. Which SAM activation is required?
3. Which exports restore project customizations?
4. Which synthetic data is required?
5. In which order should records be restored?
6. Which tests confirm successful recovery?

If those answers are unclear, the backup is incomplete.
