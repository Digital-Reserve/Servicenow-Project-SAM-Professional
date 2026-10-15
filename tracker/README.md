# Tracker

Where the project stands, session by session. Open [TRACKER.md](TRACKER.md) for the current status.

## What is in this folder

| File | What it is | Who updates it |
| --- | --- | --- |
| [TRACKER.md](TRACKER.md) | Status board: progress, stages, blockers, key facts, results, sessions | The guide app, through the end-of-session pack |
| [tasks.csv](tasks.csv) | Every step and check with its status and date; opens in Excel | The guide app |
| `progress.json` | The app's saved progress; load it to continue on another computer | The guide app |
| [sessions/](sessions/README.md) | One report per working session | The guide app |
| [decisions.md](decisions.md) | Decisions that change scope, release or approach | People, by hand |
| [risks_and_issues.md](risks_and_issues.md) | Risks, and issues that came up | People, by hand |

Do not edit the files the app writes. Change things in the app and download a new pack instead.

## At the end of every session (5 minutes)

1. In the guide app open **Session report**, fill in who took part, notes and blockers, and click **Download end-of-session pack**.
2. Unzip the pack into the repository folder on your computer. It replaces `tracker/TRACKER.md`, `tracker/tasks.csv` and `tracker/progress.json`, and adds a report in `tracker/sessions/`.
3. Upload the changed files to GitHub, together with the new screenshots for `evidence/`.

## Uploading with the GitHub website

1. Open the repository on GitHub and go to the folder you want to update, for example `tracker`.
2. Click **Add file**, then **Upload files**, and drag in the files. Files with the same name are replaced.
3. Write a short message such as "Session 3: Stage 2 done" and click **Commit changes**.

Uploading the `tracker` folder at the repository root keeps the folder structure.

## At the start of a session on another computer

Open the guide app, go to **Save or load progress** and load `tracker/progress.json` from the repository. The app continues where the last session stopped.
