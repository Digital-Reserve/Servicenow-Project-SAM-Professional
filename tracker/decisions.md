# Decisions

Decisions that change the scope, the release or the approach. Add new ones at the bottom with the date.

| Id | Date | Decision | Reason |
| --- | --- | --- | --- |
| D01 | 2026-10-01 | Target release is Zurich. If Zurich is not offered, wait at most 7 days on its waitlist, then use Australia and record it here. Never call another release Zurich. | Zurich is still supported, Brazil general availability is expected in November 2026, and a finished case study matters more than the release name. |
| D02 | 2026-10-01 | Use a free Personal Developer Instance as the sandbox, never a company instance. | Safe, free and separate from company systems. |
| D03 | 2026-10-01 | Switch on SAM Professional with `com.sn_samp_master_ws` and use the Software Asset Workspace; the classic menus are the fallback. | The documented Zurich activation; the classic interface has limited support since Xanadu. |
| D04 | 2026-10-01 | Invented data only (Northstar Manufacturing). | The repository and the demo are shared with people outside the project. |
| D05 | 2026-10-01 | Solve sandbox limits inside the project instead of leaving them out. | The case study must read as a complete implementation. |
| D06 | 2026-10-15 | The offline guide app is the single guide; `docs/build_guide.md` is generated from it. | One source, no drift between documents. |
| D07 | 2026-10-15 | Load Northstar with background scripts that act as a scanning tool; the import set method stays as an optional exercise. | Minutes instead of hours, the same records, and no mapping mistakes. |
| D08 | 2026-10-15 | The tracker is written by the app through the end-of-session pack. | Accurate, dated progress with no manual bookkeeping. |
| D09 | 2026-10-15 | The visitor login is read-only (`sam_user` and `snc_read_only`) and its password is shared with reviewers on request, not published. | The repository lives on the company GitHub. |
| D10 | 2026-10-15 | Server data uses ServiceNow's meaning of CPU core count, which is cores per processor. | Verified against ServiceNow documentation; the license results stay the same. |
| D11 | 2026-10-15 | No open source license file until the owner decides. | Licensing the content is the owner's call. |
