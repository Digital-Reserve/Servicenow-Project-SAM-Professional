#!/usr/bin/env python3
"""Generate the Northstar Manufacturing synthetic dataset used by GUIDE.md.

Deterministic: running it twice produces byte identical files. The dataset is
small on purpose; the licensing logic matters more than volume. Column names
match the ServiceNow target fields so transform maps can be auto mapped.

Usage:
    python3 scripts/generate_synthetic_data.py            # writes data/northstar
    python3 scripts/generate_synthetic_data.py --out DIR  # writes to DIR
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import pathlib
import random

SEED = 20261001
COMPANY = "Northstar Manufacturing"
DOMAIN = "northstar-mfg.example"
REFERENCE_DATE = dt.date(2026, 10, 1)
VENDOR = "Synthetic Reseller BV"

LOCATIONS = [
    ("Northstar HQ", "Rotterdam", "Netherlands"),
    ("Northstar Plant North", "Groningen", "Netherlands"),
    ("Northstar Plant South", "Eindhoven", "Netherlands"),
]
DEPARTMENTS = ["Engineering", "Finance", "Operations", "Sales", "IT", "Human Resources"]

FIRST_NAMES = [
    "Anna", "Bram", "Carla", "Daan", "Eva", "Finn", "Greta", "Hugo", "Iris", "Jonas",
    "Kira", "Lars", "Mila", "Noah", "Olga", "Pieter", "Quinn", "Rosa", "Sven", "Tess",
    "Umar", "Vera", "Wout", "Xena", "Yara", "Zoe", "Aiden", "Bente", "Cas", "Dilan",
]
LAST_NAMES = [
    "Bakker", "Jansen", "Visser", "Smit", "Meijer", "de Boer", "Mulder", "Bos", "Vos",
    "Peters", "Hendriks", "van Dijk", "Dekker", "Brouwer", "de Wit", "Dijkstra", "Smits",
    "de Graaf", "van der Meer", "van der Linden", "Kok", "Jacobs", "de Haan", "Vermeulen",
    "van den Berg", "van Leeuwen", "Willems", "Koster", "Prins", "Blom",
]

# Demonstration products. Scenario letters match data/northstar/README.md and the guide.
# unit_cost is the price of ONE right (one user, one device or one core): ServiceNow
# multiplies it by the number of rights. Per core products are sold in packs of 2 cores,
# so their pack_price is twice the unit cost.
PRODUCTS = {
    "acrobat": dict(scenario="A", publisher="Adobe", product="Acrobat", version="2024", edition="Pro",
                    platform="Windows", product_type="Application", license_metric="Per Named User",
                    discovered_name="Adobe Acrobat (64-bit)", discovered_version="24.2.20857", unit_cost="192.00"),
    "sqlserver": dict(scenario="B", publisher="Microsoft", product="SQL Server", version="2022", edition="Standard",
                      platform="Windows", product_type="Database", license_metric="Per Core",
                      discovered_name="Microsoft SQL Server 2022 Standard Edition", discovered_version="16.0.4135.4",
                      unit_cost="1972.50", pack_price="3945.00"),
    "visio": dict(scenario="C", publisher="Microsoft", product="Visio", version="2021", edition="Professional",
                  platform="Windows", product_type="Application", license_metric="Per Device",
                  discovered_name="Microsoft Visio Professional 2021", discovered_version="16.0.14332.20637",
                  unit_cost="579.00"),
    "project": dict(scenario="D", publisher="Microsoft", product="Project", version="2021", edition="Professional",
                    platform="Windows", product_type="Application", license_metric="Per Device",
                    discovered_name="Microsoft Project Professional 2021", discovered_version="16.0.14332.20637",
                    unit_cost="1059.00"),
    "winserver": dict(scenario="E", publisher="Microsoft", product="Windows Server", version="2022", edition="Standard",
                      platform="Windows", product_type="Operating System", license_metric="Per Core",
                      discovered_name="Microsoft Windows Server 2022 Standard", discovered_version="10.0.20348",
                      unit_cost="124.00", pack_price="248.00"),
}

# Free software used to show normalization of non licensable products.
NOISE_PRODUCTS = [
    ("Google", "Chrome", "130.0.6723.117", "Google Chrome"),
    ("Igor Pavlov", "7-Zip", "24.08", "7-Zip 24.08 (x64)"),
    ("Notepad++ Team", "Notepad++", "8.7.1", "Notepad++ (64-bit x64)"),
]


def days_ago(n: int) -> str:
    return (REFERENCE_DATE - dt.timedelta(days=n)).isoformat()


def build(out_dir: pathlib.Path) -> None:
    rng = random.Random(SEED)
    out_dir.mkdir(parents=True, exist_ok=True)

    companies = [dict(name=COMPANY, street="Maasboulevard 100", city="Rotterdam", country="Netherlands",
                      website=f"https://www.{DOMAIN}", notes="Synthetic company for the SAM portfolio"),
                 dict(name=VENDOR, street="Keizersgracht 1", city="Amsterdam", country="Netherlands",
                      website=f"https://www.synthetic-reseller.example", notes="Synthetic software reseller")]
    locations = [dict(name=n, city=c, country=co, company=COMPANY) for n, c, co in LOCATIONS]
    departments = [dict(name=d, company=COMPANY) for d in DEPARTMENTS]

    # Users: 60 unique synthetic names.
    users = []
    used = set()
    i = 0
    while len(users) < 60:
        if i > 10 * 60:
            raise RuntimeError("could not generate enough unique names")
        fn = FIRST_NAMES[i % len(FIRST_NAMES)]
        ln = LAST_NAMES[(i * 7 + i // len(FIRST_NAMES)) % len(LAST_NAMES)]
        i += 1
        if (fn, ln) in used:
            continue
        used.add((fn, ln))
        n = len(users) + 1
        user_name = f"{fn}.{ln}".lower().replace(" ", "")
        users.append(dict(
            user_name=user_name, first_name=fn, last_name=ln, email=f"{user_name}@{DOMAIN}",
            title=rng.choice(["Analyst", "Engineer", "Specialist", "Team Lead", "Planner", "Coordinator"]),
            department=DEPARTMENTS[n % len(DEPARTMENTS)], location=LOCATIONS[n % len(LOCATIONS)][0],
            company=COMPANY, active="true", employee_number=f"NSM{n:04d}",
        ))

    # Workstations: 45, assigned to users 1..45.
    workstations = []
    for n in range(1, 46):
        u = users[n - 1]
        workstations.append(dict(
            name=f"NSM-WS-{n:03d}", os="Windows", os_version="11 Enterprise 23H2", manufacturer="Dell Inc.",
            model_id="Latitude 5550", serial_number=f"NSMWS{n:05d}X", cpu_count="1", cpu_core_count="8",
            assigned_to=u["user_name"], location=u["location"], company=COMPANY,
        ))
    # Servers. ServiceNow stores CPU count (processors) and CPU core count (cores PER processor).
    # 4 Windows application hosts: 2 processors x 8 cores = 16 cores each.
    # 3 SQL servers: 2 processors x 4 cores = 8 cores each.
    # 5 Linux servers: 2 processors x 8 cores.
    windows_servers = [(f"NSM-WIN-{n:02d}", "2", "8", "Application host") for n in range(1, 5)]
    windows_servers += [(f"NSM-SQL-{n:02d}", "2", "4", "Database server") for n in range(1, 4)]
    linux_servers = [("NSM-APP-01", "Red Hat Enterprise Linux 9.4"), ("NSM-APP-02", "Red Hat Enterprise Linux 9.4"),
                     ("NSM-APP-03", "Ubuntu 24.04 LTS"), ("NSM-FS-01", "Ubuntu 24.04 LTS"), ("NSM-WEB-01", "Ubuntu 24.04 LTS")]
    servers = []
    for name, cpus, cores, role in windows_servers:
        servers.append(dict(
            name=name, server_class="Windows Server", os="Windows Server", os_version="2022 Standard",
            manufacturer="Hewlett Packard Enterprise", model_id="ProLiant DL380 Gen11",
            serial_number=f"{name.replace('-', '')}SN", cpu_count=cpus, cpu_core_count=cores, virtual="false",
            location=LOCATIONS[0][0], company=COMPANY, short_description=role,
        ))
    for name, osv in linux_servers:
        servers.append(dict(
            name=name, server_class="Linux Server", os="Linux", os_version=osv,
            manufacturer="Hewlett Packard Enterprise", model_id="ProLiant DL360 Gen11",
            serial_number=f"{name.replace('-', '')}SN", cpu_count="2", cpu_core_count="8", virtual="false",
            location=LOCATIONS[1][0], company=COMPANY, short_description="Linux application server",
        ))

    # Software models match every version ("is anything") and one edition: discovered versions such as
    # 24.2.20857 never equal the licensed version 2024, and Northstar has one version per product.
    models = []
    for key, p in PRODUCTS.items():
        models.append(dict(
            scenario=p["scenario"], display_name=f"{p['publisher']} {p['product']} {p['edition']}",
            publisher=p["publisher"], product=p["product"], version_condition="is anything", version="",
            edition_condition="is", edition=p["edition"], product_type="Licensable",
            short_description=f"Northstar story {p['scenario']}", license_metric=p["license_metric"],
            installed_version=p["version"], maps_to_discovered_name=p["discovered_name"],
        ))

    installs, usage = [], []
    user_of = {w["name"]: w["assigned_to"] for w in workstations}

    def add_install(device: str, p: dict, installed_days: int, last_used_days: int, used_minutes: int) -> None:
        installs.append(dict(
            installed_on=device, display_name=p["discovered_name"], publisher=p["publisher"],
            version=p["discovered_version"], install_date=days_ago(installed_days), scenario=p["scenario"],
            expected_product=p["product"], expected_version=p["version"], expected_edition=p["edition"],
        ))
        if device.startswith("NSM-WS"):
            usage.append(dict(
                ci=device, user=user_of[device], display_name=p["discovered_name"], discovered_version=p["discovered_version"],
                publisher=p["publisher"], product=p["product"], last_used=days_ago(last_used_days),
                minutes_used=str(used_minutes), scenario=p["scenario"],
            ))

    acrobat, sql, visio, project, winsrv = (PRODUCTS[k] for k in ("acrobat", "sqlserver", "visio", "project", "winserver"))
    for n in range(1, 41):   # A: 40 Acrobat installs, 40 rights
        add_install(f"NSM-WS-{n:03d}", acrobat, rng.randint(60, 400), rng.randint(0, 20), rng.randint(300, 4000))
    for n in range(1, 36):   # C: 35 Visio installs, 60 rights
        add_install(f"NSM-WS-{n:03d}", visio, rng.randint(60, 400), rng.randint(0, 30), rng.randint(100, 2500))
    for n in range(10, 38):  # D: 28 Project installs, 30 rights, 12 unused for more than 90 days
        unused = n >= 26
        add_install(f"NSM-WS-{n:03d}", project, rng.randint(120, 400),
                    rng.randint(95, 300) if unused else rng.randint(0, 25),
                    rng.randint(0, 15) if unused else rng.randint(200, 3000))
    for n in range(1, 4):    # B: SQL Server on 3 servers, 2 processors x 4 cores each
        add_install(f"NSM-SQL-{n:02d}", sql, rng.randint(200, 600), 0, 0)
    for name, *_ in windows_servers:  # E: Windows Server on all 7 Windows servers
        add_install(name, winsrv, rng.randint(200, 600), 0, 0)
    for n in range(1, 46):   # Free software for normalization demonstration
        for pub, prod, ver, disc in NOISE_PRODUCTS:
            installs.append(dict(
                installed_on=f"NSM-WS-{n:03d}", display_name=disc, publisher=pub, version=ver,
                install_date=days_ago(rng.randint(30, 300)), scenario="free",
                expected_product=prod, expected_version=ver, expected_edition="",
            ))

    def ent(tag, name, model, scenario, metric, rights, per_pack, packs, p, ltype, purchase, start, end, invoice, expected):
        return dict(asset_tag=tag, display_name=name, software_model=model, scenario=scenario, license_metric=metric,
                    license_type=ltype, purchased_rights=str(rights), rights_per_pack=str(per_pack), packs=str(packs),
                    unit_cost=p["unit_cost"], pack_price=p.get("pack_price", ""), currency="EUR",
                    purchase_date=purchase, start_date=start, end_date=end, vendor=VENDOR, invoice_number=invoice,
                    expected_position=expected)

    # The asset tag is how the guide and the scripts find each purchase in ServiceNow.
    entitlements = [
        ent("NSM-ENT-A", "Adobe Acrobat Pro named user subscription", models[0]["display_name"], "A", "Per Named User",
            40, 1, 40, acrobat, "Subscription", "2026-01-15", "2026-02-01", "2027-01-31", "NSM-INV-2026-0101",
            "Compliant: 40 rights, 40 installations, 40 allocations"),
        ent("NSM-ENT-B", "Microsoft SQL Server 2022 Standard per core", models[1]["display_name"], "B", "Per Core",
            16, 2, 8, sql, "Perpetual", "2025-11-20", "", "", "NSM-INV-2025-0877",
            "Shortage: 24 cores required, 16 owned, true up 8 cores (4 packs of 2 cores)"),
        ent("NSM-ENT-C", "Microsoft Visio Professional 2021 per device", models[2]["display_name"], "C", "Per Device",
            60, 1, 60, visio, "Perpetual", "2025-06-10", "", "", "NSM-INV-2025-0412",
            "Surplus: 35 installations, 60 owned, 25 unused rights"),
        ent("NSM-ENT-D", "Microsoft Project Professional 2021 per device", models[3]["display_name"], "D", "Per Device",
            30, 1, 30, project, "Perpetual", "2025-06-10", "", "", "NSM-INV-2025-0413",
            "Compliant: 28 installations, 30 owned, 12 installations unused over 90 days"),
        ent("NSM-ENT-E", "Microsoft Windows Server 2022 Standard per core", models[4]["display_name"], "E", "Per Core",
            112, 2, 56, winsrv, "Perpetual", "2025-03-05", "", "", "NSM-INV-2025-0150",
            "Compliant: 7 physical servers at the 16 core minimum = 112 cores, 112 owned"),
    ]

    allocations = [dict(entitlement_tag=entitlements[0]["asset_tag"], entitlement=entitlements[0]["display_name"],
                        allocated_to_type="user", allocated_to=users[n - 1]["user_name"], quantity="1", scenario="A")
                   for n in range(1, 41)]
    allocations += [dict(entitlement_tag=entitlements[3]["asset_tag"], entitlement=entitlements[3]["display_name"],
                         allocated_to_type="device", allocated_to=f"NSM-WS-{n:03d}", quantity="1", scenario="D")
                    for n in range(10, 38)]

    def write(name: str, rows: list[dict]) -> None:
        with (out_dir / name).open("w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()), lineterminator="\n")
            w.writeheader()
            w.writerows(rows)

    write("01_companies.csv", companies)
    write("02_locations.csv", locations)
    write("03_departments.csv", departments)
    write("04_users.csv", users)
    write("05_workstations.csv", workstations)
    write("06_servers.csv", servers)
    write("07_software_installations.csv", installs)
    write("08_software_models.csv", models)
    write("09_entitlements.csv", entitlements)
    write("10_allocations.csv", allocations)
    write("11_software_usage.csv", usage)

    licensable = sum(1 for r in installs if r["scenario"] != "free")
    lines = [
        "# Northstar dataset summary", "", f"Reference date: {REFERENCE_DATE.isoformat()}", "",
        "| Object | Count |", "| --- | --- |",
        f"| Companies | {len(companies)} |", f"| Locations | {len(locations)} |", f"| Departments | {len(departments)} |",
        f"| Users | {len(users)} |", f"| Workstations | {len(workstations)} |", f"| Servers | {len(servers)} |",
        f"| Software installations | {len(installs)} ({licensable} licensable, {len(installs) - licensable} free software) |",
        f"| Software usage records | {len(usage)} |", f"| Software models | {len(models)} |",
        f"| Entitlements | {len(entitlements)} |", f"| Allocations | {len(allocations)} (40 Acrobat users, 28 Project devices) |", "",
        "| Scenario | Product | Metric | Owned | Consumed | Expected position | Money story |",
        "| --- | --- | --- | --- | --- | --- | --- |",
        "| A | Adobe Acrobat 2024 Pro | Per Named User | 40 | 40 users | Compliant | Subscription renews 31 Jan 2027 |",
        "| B | Microsoft SQL Server 2022 Standard | Per Core | 16 cores (8 packs) | 3 servers x 2 processors x 4 cores = 24 cores | Shortage of 8 cores | True up 8 cores x EUR 1,972.50 = EUR 15,780 exposure (4 packs of 2 cores at EUR 3,945) |",
        "| C | Microsoft Visio 2021 Professional | Per Device | 60 | 35 workstations | Surplus of 25 | 25 x EUR 579 = EUR 14,475 of rights to reuse before buying |",
        "| D | Microsoft Project 2021 Professional | Per Device | 30 | 28 workstations, 12 unused over 90 days | Compliant, 12 reclamation candidates | 12 x EUR 1,059 = EUR 12,708 reclaimable value |",
        "| E | Microsoft Windows Server 2022 Standard | Per Core | 112 cores (56 packs) | 7 servers at the 16 core minimum = 112 (actual cores 4 x 16 + 3 x 8 = 88) | Compliant | Publisher rule demonstration |",
        "",
    ]
    (out_dir / "SUMMARY.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", default=str(pathlib.Path(__file__).resolve().parents[1] / "data" / "northstar"))
    args = parser.parse_args()
    build(pathlib.Path(args.out))
    print(f"Synthetic dataset written to {args.out}")


if __name__ == "__main__":
    main()
