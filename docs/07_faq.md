# Questions and answers

**Is this running on a company system?**
No. It runs on a free personal sandbox from ServiceNow, separate from every company system.

**Does it cost anything?**
No. The sandbox is free, and SAM Professional can be switched on there at no cost. The only cost is the team's time.

**Is any real data involved?**
No. Northstar Manufacturing, its people, computers and purchases are invented. Email addresses use the reserved `.example` domain.

**Why the Zurich release and not the newest one?**
The project was designed for Zurich, which is still supported. If Zurich is no longer offered when we request the sandbox, we wait at most 7 days and then use Australia. The decision is recorded in the tracker.

**What happens if the sandbox is deleted?**
Everything needed to rebuild it is in this repository: the guide, the scripts, the data and the exported configuration. The [recovery plan](10_recovery_plan.md) takes about one working day.

**Why are scripts used to load data?**
In a company, scanning tools deliver this data automatically. In the sandbox a script plays that role and creates the same records in two minutes instead of days of typing. The manual import method is shown once as an optional exercise.

**Why is SaaS License Management not part of it?**
It is a separate application that cannot be installed on a personal sandbox. We show the subscription side with the Acrobat subscription and its renewal date instead.

**Can we reuse this for the real company?**
The method, the stages and the checks carry over directly. In a real rollout the scanning tools, the purchase records and the online Content Service replace our scripts and manual cleaning.

**Who can look at the live system?**
From Stage 7, anyone we give the read-only visitor login to. It can look at everything SAM shows and change nothing.

**How do we know a result is real?**
Every result has a named screenshot in the evidence folder, and the case study links each claim to one.

**Why is so much of the work about cleaning names?**
Because license counting is only as good as the data under it. A product reported under five slightly different names would otherwise be counted five times or not at all.
