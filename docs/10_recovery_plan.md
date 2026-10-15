# Recovery plan

If the sandbox is deleted or broken, this plan rebuilds the project from the repository alone in about one working day.

## Six questions a reader must be able to answer

| Question | Answer |
| --- | --- |
| Which release? | Zurich, or the release recorded in `tracker/decisions.md` |
| Which activation? | Software Asset Management Professional with demo data, from the Developer Site (documented plugin: `com.sn_samp_master_ws`) |
| Which files restore our configuration? | The update set XML files in `exports/release_01/` |
| Which data? | The Northstar scripts in `data/northstar/servicenow/`, plus the record exports in `exports/release_01/` |
| In which order? | The steps below |
| How do we know it worked? | The checks at the end of each stage in the guide app |

## Steps

| Step | What to do | Guide stage | Time |
| --- | --- | --- | --- |
| 1 | Request a new sandbox and confirm the release | 0 | 15 minutes, plus waiting |
| 2 | Switch on SAM Professional with demo data and check every part | 1 | 2 hours |
| 3 | Import the update sets: All, Retrieved Update Sets, Import Update Set from XML; then Preview and Commit, S1 to S6 in order | 6, in reverse | 30 minutes |
| 4 | Run the Northstar loader script | 2 | 10 minutes |
| 5 | Import the record exports for software models, entitlements and the reclamation rule: open each list, right-click a column heading, Import XML. Or recreate them from the tables in the guide | 3, 4, 5 | 30 minutes |
| 6 | Publish the entitlements, run the allocation script, run the license check | 4 | 30 minutes |
| 7 | Run the usage script and the reclamation job | 5 | 15 minutes |
| 8 | Recreate the visitor and repeat the visitor tests | 6 | 30 minutes |
| 9 | Update the sandbox address in the README and the guide (step 0.5) | 7 | 5 minutes |

## Checking the backup

`exports/release_01/` contains a `MANIFEST.md` and a `SHA256SUMS` file. The repository check on GitHub verifies every checksum, so a damaged or incomplete backup is noticed straight away. The guide app builds this folder for you in Stage 6.
