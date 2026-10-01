# Visitor Access and Security

## Objective

Allow a reviewer to explore the live demonstration without exposing administrative functions, confidential data, or destructive permissions.

## Security position

The portfolio environment contains synthetic data only. The visitor experience is read only. A public visitor must not be trusted merely because the instance is a PDI.

## Preferred design

Create a dedicated visitor experience rather than handing out a standard administrator or SAM administrator account.

Recommended visitor user name: `portfolio.visitor`

Recommended role design: a project specific read only role, for example `x_portfolio.sam_viewer`, created only if the standard `sam_user` role grants more than read access. The exact role and ACL design must be tested in the instance; `sam_user` can create and edit SAM records, so it is not a visitor role on its own.

## Never grant the visitor

`admin`, `sam_admin`, `sam_developer`, `sam_integrator`, integration administration, credential administration, user administration, update set administration, script execution privileges, write access to SAM configuration, write access to entitlements, write access to software models, delete access, impersonation, elevated platform roles.

## Visitor experience options

### Option A: Custom read only portfolio area (preferred)

A small project owned experience that exposes only selected dashboards, software model views, entitlement summaries, compliance results and optimization results. Narrow surface, easier to test, less risk, cleaner demonstration.

### Option B: Restricted native navigation

Only if native SAM views can be made genuinely read only for the visitor. Do not rely on visual hiding alone. Server side ACLs must enforce access.

## Public credentials

If credentials are placed in a public README the account must be intentionally public, contain only synthetic data access, be read only, have no administrative privilege, be tested from a private browser, be easy to disable, use a password not reused anywhere else, and expose no email or personal profile data.

## Operational pattern

Keep the visitor account disabled while the project is being built. Enable it only after acceptance testing. Revalidate it before interviews or management reviews.

## Mandatory negative tests

Log in as the visitor and prove the visitor cannot:

1. open System Properties
2. open User Administration
3. create users
4. edit roles
5. edit ACLs
6. open credentials
7. edit software entitlements
8. create or delete software models
9. execute scripts
10. change scheduled jobs
11. edit update sets
12. install plugins
13. modify integrations
14. delete demonstration data
15. elevate privilege
16. run reconciliation or create reclamation rules

## Positive tests

Verify the visitor can sign in, reach the intended landing experience, open the selected SAM demonstration views, view approved synthetic data, navigate back to the landing view, and understand the demonstration without privileged access.

## Session and abuse considerations

A public account can attract automated login attempts. Keep privilege extremely narrow, use only synthetic data, monitor the account before important demonstrations, rotate its password if misuse is suspected, disable it when not needed, never use it as an integration account.

## GitHub disclosure

The README states: PDI environment, synthetic data, visitor is read only, instance can hibernate, availability is not guaranteed.

## Incident procedure

If suspicious activity is observed: disable the visitor account, change its password, review recent changes, verify no privileged role was granted, restore affected synthetic records if necessary, rerun acceptance tests, only then republish access.
