# Glossary

Every term used in the project, in one sentence. The same explanations appear when you click an underlined word in the guide app.

Generated from the guide content by `scripts/build_app.py`. Do not edit by hand.

| Term | In plain words |
| --- | --- |
| Allocation | Assigning a license to a specific person or computer. |
| Asset tag | A short label that identifies one record. Our five purchases are tagged NSM-ENT-A to NSM-ENT-E, so scripts, reports and backups can find them. |
| Background script | A page (Scripts - Background) where an admin pastes a script and runs it once. |
| Case study | The final document that tells the project story to managers and interviewers. |
| Content library | ServiceNow's catalogue of known software products, used to recognise and clean names. |
| Content Service | An online service that keeps the content library current on paid instances. A PDI does not have it. |
| Demo data | Sample records ServiceNow can add when you switch on a product. |
| Developer Site | developer.servicenow.com, the website where you get and manage your PDI and switch on paid products for it. |
| Discovery map | The rule that connects found installations to a software model. On the model it shows as the tab Matching Discovery Models. A model without a match counts nothing. |
| Discovery model | One record for each unique combination of publisher, program name and version found on computers. |
| Elevate role | Switching on an extra admin permission, security_admin, for the current session. Some pages, such as Scripts - Background, need it. |
| Entitlement | A record of what was bought: product, how many, license metric, price and dates. |
| Evidence | Screenshots that prove a result. They go in the repository's evidence folder. |
| Import set | ServiceNow's standard way to load a spreadsheet into a table, using a transform map. |
| Installation | A record saying that a program is installed on a computer. Also called a software installation or install. |
| Instance | One company's own copy of ServiceNow, reached at its own web address. |
| License metric | What you count to know how many licenses you need: per user, per device or per processor core. |
| License position | The result of the license check for one product: compliant, under-licensed or over-licensed. |
| Normalization | Cleaning messy software names into one standard name, for example turning 'Microsoft Visio Professional 2021 x64' into Microsoft Visio 2021 Professional. |
| Normalization status | How well a discovery model was cleaned: Normalized, Partially Normalized, Publisher Normalized, Match Not Found, Manually Normalized or New. Normalized and Manually Normalized count as clean. |
| Northstar Manufacturing | Our invented company with 60 employees, 45 laptops and 12 servers. |
| PDI | Personal Developer Instance. A free ServiceNow instance for learning. It is our sandbox. |
| Per core licensing | Paying for each processor core of a server. Microsoft sets minimums per processor and per server. |
| Plugin | A package of features that you switch on in an instance. SAM Professional is a set of plugins. |
| Product type | Says whether software needs a license. Only software with product type Licensable is counted in the license check. |
| Publish | The button that switches on an entitlement. It changes the State from Build to In use; the license check ignores entitlements in Build. |
| Publisher pack | Extra licensing rules for one vendor, such as Microsoft or Oracle, included in SAM Professional. |
| Reclamation | Taking back licenses that are not used so they can be reused. |
| Reclamation rule | The condition that decides when installed software counts as unused, for example not used for three months. |
| Reconciliation | The license check. It compares what is installed and allocated with what was bought. |
| Release | A ServiceNow version. There are two a year: Zurich (2025), Australia (May 2026) and Brazil (late 2026). |
| Remediation | The options to fix a license problem, such as buying more licenses or removing installations. |
| Removal candidate | An installation the system suggests removing because the reclamation rule found it unused. |
| Role | A set of permissions given to a user, such as sam_admin or sam_user. |
| SAM | Software Asset Management: knowing what software you have and what you may use, and keeping the two in balance at the lowest cost. |
| SAM Professional | ServiceNow's paid SAM product. It cleans software names, calculates license positions and knows the rules of big vendors. |
| Scheduled job | A task the system runs automatically at set times. You can also start one at once with Execute Now. |
| ServiceNow | A cloud platform many companies use to run IT and business processes, such as requests, incidents and assets, in one system. |
| snc_read_only | A platform role that stops a user from creating, changing or deleting anything. |
| Software Asset Workspace | The modern screen in ServiceNow where SAM work is done. |
| Software model | The product as we manage it for licensing, for example Microsoft Visio Professional. It collects the matching installations. |
| Software usage | Records of when a program was last used and for how long, normally collected by an agent on each computer. |
| Synthetic data | Invented data that looks realistic but describes no real person or company. |
| True-up | Paying the vendor for use above what you bought, often after an audit. |
| Unit cost | The price of one right: one user, one device or one processor core. ServiceNow multiplies it by the number of rights to show money. |
| Update set | A container that records configuration changes so they can be exported as a backup or moved to another instance. |
