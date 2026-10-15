# Our project

## Goal

Build a working ServiceNow Software Asset Management Professional solution in a free sandbox, prove each result with screenshots, and present it as a case study to managers and interviewers.

## What we deliver

| Deliverable | Where |
| --- | --- |
| A working SAM Professional sandbox with the invented company Northstar Manufacturing | The sandbox, with a read-only visitor login from Stage 7 |
| The case study | [case_study.md](case_study.md) |
| Screenshots proving every result | [evidence](../evidence/README.md) |
| A tracked history of every session | [tracker](../tracker/TRACKER.md) |
| A tested backup that rebuilds the work if the sandbox is lost | `exports/`, and the [recovery plan](10_recovery_plan.md) |

## How we work

- **One guide.** The offline app in [app](../app/README.md) holds every step. Nobody needs to remember anything between sessions.
- **Short sessions.** One or two sessions of 2 to 3 hours a week.
- **Invented data.** A script creates Northstar Manufacturing: 60 people, 57 computers and 248 software installations. Nothing real is used.
- **Proof at every step.** Each stage ends with checks and named screenshots.
- **Tracker updated by the app.** At the end of a session the app produces one zip that updates the tracker folder.

## The eight stages

| Stage | What happens | Time |
| --- | --- | --- |
| 0 | Get the free Zurich sandbox | 15 minutes, plus waiting |
| 1 | Switch on SAM Professional and check every part | 2 to 3 hours, mostly waiting |
| 2 | Load the invented company with one script | 45 to 60 minutes |
| 3 | Clean the software names and define the five products | 1.5 to 2 hours |
| 4 | Enter the purchases and run the license check | About 2 hours |
| 5 | Apply Microsoft's rules and find unused software | About 2 hours |
| 6 | Build the dashboard, the visitor login and the backup | 2 to 3 hours |
| 7 | Finish the case study and rehearse the demo | 1.5 to 2 hours |

About 12 to 15 hours in total, which is 4 to 7 weeks at our pace.

## Roles

| Role | Responsibility |
| --- | --- |
| Sandbox owner | Holds the developer account and signs in to developer.servicenow.com every week so the sandbox is not deleted |
| Builder | Follows the guide during sessions; can be more than one person |
| Reviewer | Reads the case study and runs the recovery test in Stage 7 |

## Release

The target is Zurich. If the Developer Site no longer offers Zurich, we wait at most 7 days on its waitlist and then use Australia, the current release, and record the decision in [tracker/decisions.md](../tracker/decisions.md).

## When the project is done

Stage 7 contains a 19-point acceptance checklist. The project is done when every point passes: all five results recorded with screenshots, the visitor login tested, the backup verified, the recovery test answered, and the demo rehearsed in five minutes.
