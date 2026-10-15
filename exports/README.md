# Exports

Backups of our own work from the sandbox, one folder per milestone: `release_01/`, `release_02/` and so on.

The guide app builds each folder for you in Stage 6 (Backup pack): drop the exported XML files on it and it adds `MANIFEST.md` and `SHA256SUMS`. Unzip the pack here and upload it.

Each folder contains:

- the update sets exported as XML, after they were set to Complete
- record exports in XML, such as software models, entitlements and the reclamation rule
- `MANIFEST.md`: what is in the folder and how to restore it
- `SHA256SUMS`: a checksum for every file, checked automatically on every upload

Never store ServiceNow product code, passwords, tokens, cookies or real data here. `MANIFEST_TEMPLATE.md` shows the manifest format if you ever build a folder by hand.
