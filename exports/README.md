# Exports

Project owned and safe recovery artifacts only, one folder per stable milestone: `release_01/`, `release_02/` and so on.

Each release folder contains:

* exported update set XML (update set must be Complete before export)
* project owned scoped application source, if any
* synthetic data exports (XML or CSV)
* `MANIFEST.md` copied from `MANIFEST_TEMPLATE.md`
* `SHA256SUMS` created with `sha256sum * > SHA256SUMS` inside the folder (exclude the sums file itself)

Run `scripts/verify_exports.sh` before committing.

Never store ServiceNow proprietary licensed product source, credentials, tokens, cookies or real data here.
