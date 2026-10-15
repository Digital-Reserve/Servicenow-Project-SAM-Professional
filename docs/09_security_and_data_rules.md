# Security and data rules

## The rules

1. **Invented data only.** Never type real names, license keys, contracts, purchase orders or company data into the sandbox or this repository.
2. **No passwords anywhere in writing.** The admin password lives in a password manager. Never in the guide app, a chat, a screenshot or this repository.
3. **Screenshots are checked before upload.** Crop anything sensitive, including a browser address bar that shows session details.
4. **Only our own work is exported.** The repository holds our configuration, scripts, invented data and screenshots. It never holds ServiceNow product code.

## The visitor login

Reviewers get a separate read-only login, `portfolio.visitor`, created in Stage 6.

| It has | It never has |
| --- | --- |
| `sam_user`, to see the SAM screens | `admin`, `sam_admin`, `sam_developer`, `sam_integrator` |
| `snc_read_only`, which blocks every create, change and delete | Any user, security, script or integration rights |

Before it is switched on, ten tests in Stage 6 prove that it can look and cannot change anything. It stays switched off until Stage 7. Its password is not published in the README; it is shared only with the people who review the project.

## Automatic checks

Every upload to GitHub runs a check (`scripts/check_repo.sh` and a full secret scan of the history). It fails when it finds passwords, keys, tokens, browser cookies, forbidden file types or broken links, and when the guide or its generated files are out of date.

## If something looks wrong

1. Switch off the visitor login.
2. Change its password.
3. Look at what changed recently in the sandbox.
4. Restore invented records if needed with the scripts.
5. Repeat the visitor tests, and only then switch it on again.
