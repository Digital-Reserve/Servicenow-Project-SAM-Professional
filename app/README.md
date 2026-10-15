# SAM Pro Build Guide (offline app)

`SAM_Pro_Build_Guide.html` is the guide we follow in every working session. It walks through all eight stages in plain language: where to click, what to type, what you should see, and what to write down.

## Open it

1. Download `SAM_Pro_Build_Guide.html` (on GitHub: open the file, then **Download raw file**).
2. Double-click it. It opens in your web browser: Chrome, Edge, Firefox or Safari.
3. It works offline. Nothing you type is sent anywhere.

## What it does for you

- Shows the next step and marks each finished step with the date and time.
- Opens the right ServiceNow page with one click, once you have entered your sandbox address in step 0.5.
- Copies names, values and ServiceNow scripts with one click.
- Keeps the notes each step asks for, such as plugin versions and license results.
- Builds the end-of-session pack: one zip with the updated tracker files for the repository.
- Builds the backup pack: your exported XML files with a manifest and checksums.
- Explains every technical word when you click it.

## Your progress

Ticks and notes are saved in the browser you use. To continue on another computer or browser, open **Save or load progress** in the app and load `tracker/progress.json` from this repository. Every end-of-session pack contains an updated copy of that file.

Never type a password into the app.

## If something does not work

| Problem | What to do |
| --- | --- |
| Copy buttons do nothing | The app opens a box with the text selected. Press Ctrl+C, or Cmd+C on a Mac. |
| Downloads are blocked on a company laptop | Use the Copy buttons, or open the app on another browser. Scripts are also in `data/northstar/servicenow/`. |
| Ticks disappeared | You are in a different browser or a private window. Load `tracker/progress.json`. |

## For maintainers

The app is built from `source/`:

| File | Holds |
| --- | --- |
| `source/guide_content.json` | Every stage, step, check and glossary entry |
| `source/template.html` | The app itself: layout, styles and code |
| `source/servicenow/*.js` | The ServiceNow scripts, before the data is filled in |

After a change run `python3 scripts/build_app.py`. It rebuilds the app, `docs/build_guide.md`, `docs/06_glossary.md`, `evidence/README.md` and the scripts in `data/northstar/servicenow/`. The repository check on GitHub fails if these are out of date.
