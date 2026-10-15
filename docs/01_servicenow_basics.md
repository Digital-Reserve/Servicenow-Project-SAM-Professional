# ServiceNow in plain words

## What ServiceNow is

ServiceNow is a cloud platform that companies use to run work that crosses teams: IT requests and incidents, hardware and software assets, HR cases, customer service. Everything lives in one system, so a request, the laptop it concerns and the software on that laptop are connected.

## Instance

Each company gets its own copy of ServiceNow, called an instance, reached at its own web address such as `company.service-now.com`. Companies usually have several: one for daily work (production) and others for building and testing.

## Releases

ServiceNow publishes two releases a year, named in alphabetical order. City names ran out at Zurich (2025). The next ones use country names: Australia (May 2026) and Brazil (expected late 2026). Our project uses Zurich.

## Personal Developer Instance (our sandbox)

Anyone can get a free Personal Developer Instance (PDI) at developer.servicenow.com. It is a complete ServiceNow instance for learning and building, with a few limits:

- Each developer account gets one.
- It goes to sleep when nobody uses it, and wakes up in a few minutes.
- It is deleted after 10 days without a sign-in on the Developer Site, so the owner signs in every week.
- Some paid features are missing. [Sandbox limits and our solutions](08_sandbox_limits_and_solutions.md) covers how we handle each one.

Nothing done in a PDI can touch company systems.

## Plugins and applications

Features are switched on as plugins or applications. Software Asset Management Professional is a paid set of plugins. On a PDI it can be switched on for free from the Developer Site.

## Workspaces

A workspace is a modern screen built for one job. SAM work happens in the Software Asset Workspace. Older screens, called the classic interface, still exist behind the **All** menu.

## Tables and records

ServiceNow stores everything in tables, a bit like spreadsheet tabs, and each row is a record. Tables have technical names, for example `alm_license` for software purchases. Typing a table name followed by `.list` into the search box of the **All** menu opens that table, which is handy when a menu is hard to find.

## Roles

A role is a set of permissions. `sam_admin` may run the license check, `sam_user` may use the SAM screens, and `snc_read_only` blocks all changes. Our visitor login gets the last two.

## Update sets

An update set is a change log for configuration. It records what we change so we can export it as a backup and load it into another instance.

## Scripts - Background

An administrator page where a script can be pasted and run once. We use it to load our invented company in seconds instead of typing hundreds of records by hand.
