# Demonstration and Interview Guide

## Objective

Present the implementation as evidence of practical SAM knowledge, platform discipline, and technical communication. The demonstration tells one coherent operational story, not a tour of random screens.

# Thirty second introduction

1. This is a Zurich ServiceNow PDI.
2. SAM Professional was implemented using Software Asset Workspace.
3. All demonstration data is synthetic (Northstar Manufacturing).
4. The project covers inventory, normalization, models, entitlements, reconciliation, publisher logic, optimization, security, and recovery.
5. GitHub contains the implementation record and recovery artifacts, not ServiceNow licensed source.

# Five minute management version

Minute 1, scope: show the README. Zurich, SAM Professional, synthetic enterprise, live environment, documented recovery.

Minute 2, data quality: open Software Asset Workspace, show software inventory and discovery model normalization. Explain why normalization matters before compliance calculations and that the PDI has no Content Service.

Minute 3, compliance: open one software model and entitlement, then reconciliation. Explain owned rights, calculated consumption, compliance result for SQL Server (shortage) and Visio (surplus).

Minute 4, value: show the Project Professional reclamation candidates and potential savings.

Minute 5, governance: visitor safe access, progress history, export strategy, evidence. End with the fact that the implementation can be rebuilt from project owned artifacts if the PDI is lost.

# Fifteen minute technical interview version

1. Architecture: discovered installation, discovery model, normalization, software model, entitlement, reconciliation, optimization.
2. Data quality: open one discovery model; discovered values, normalized values, why normalization quality affects reconciliation.
3. Entitlement modeling: metric, quantity, packs, model relationship, Draft to Published.
4. Compliance: compliant and noncompliant cases with source records.
5. Publisher capability: Windows Server and SQL Server per core with Microsoft minimums.
6. Optimization: the reclaim case, Flow Designer based reclamation, process and controls.
7. Engineering governance: update sets, weekly progress, exported artifacts, source control only for project owned applications, PDI recovery model, least privilege visitor access, automated repository checks.

# Questions an interviewer may ask

Why use a PDI? A safe learning environment for implementing and demonstrating the platform without a customer instance. Not production and not the sole copy of the project.

Why Zurich when Australia and Brazil exist? The project was designed for Zurich and the Zurich workspace activation model. Zurich is still a supported N-1 release at the time of the project. The repository records the release calendar and the decision rule if Zurich becomes unavailable.

Why is there no Content Service evidence? The Content Service is restricted to licensed customer environments and its setup table is absent on a PDI. The project uses the shipped content library, demo data and manual normalization, and says so.

Why is SaaS License Management not shown? It is a separate Store application that cannot be installed on a PDI. It is documented as excluded by platform limitation.

What is the difference between a software installation and a software model? An installation describes software detected on a device or for a user. A software model is the managed product definition that relates installed software to owned rights.

What is a discovery model? The standardized representation created from discovered publisher, product, and version patterns and used in normalization.

Why does normalization matter? License compliance depends on matching inconsistent discovered names and versions to a standard product identity.

What is an entitlement? Software rights the organization owns. It must be published to count.

What does reconciliation do? It compares software consumption with owned rights according to license metric and publisher rules to calculate a position.

How did you avoid making the PDI a single point of failure? Project owned changes are exported, evidence is versioned in GitHub, and a documented recovery procedure with checksums exists.

Why not store the entire SAM application in GitHub? It is licensed ServiceNow content. The repository stores only project owned configuration, synthetic data for rebuild, documentation, and evidence.

How is public access secured? A dedicated least privilege read only visitor experience, tested separately from the implementation administrator. No real data or privileged credentials are exposed.

# What to avoid during an interview

Do not claim the PDI is production, claim enterprise scale, claim every publisher was implemented, describe demo data as real discovery, show administrator credentials, show unfinished screens, open unrelated platform areas, or rely on memorized terminology without showing the data chain.

# Management language

Focus on license compliance visibility, audit readiness, cost optimization, data quality, process control, measurable progress, recoverability, governance. For a technical interviewer add table relationships, normalization, license metrics, publisher logic, ACL design, update sets, source control boundaries, testing.
