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

# Demonstration products. Scenario letters match data/northstar/README.md and GUIDE.md.
PRODUCTS = {
    "acrobat": dict(scenario="A", publisher="Adobe", product="Acrobat", version="2024", edition="Pro",
                    platform="Windows", product_type="Application", license_metric="Per Named User",
                    discovered_name="Adobe Acrobat (64-bit)", discovered_version="24.2.20857", unit_cost="192.00"),
    "sqlserver": dict(scenario="B", publisher="Microsoft", product="SQL Server", version="2022", edition="Standard",
                      platform="Windows", product_type="Database", license_metric="Per Core",
                      discovered_name="Microsoft SQL Server 2022 Standard Edition", discovered_version="16.0.4135.4",
                      unit_cost="3945.00"),
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
                      unit_cost="248.00"),
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
            assigned_to=u["user_name"], location=u["location"], company=COMPANY, install_status="Installed",
        ))
    # Servers: 4 Windows application hosts and 3 SQL servers (physical, 2 processors), 5 Linux servers.
    windows_servers = [(f"NSM-WIN-{n:02d}", "2", "16", "Application host") for n in range(1, 5)]
    windows_servers += [(f"NSM-SQL-{n:02d}", "2", "8", "Database server") for n in range(1, 4)]
    linux_servers = [("NSM-APP-01", "Red Hat Enterprise Linux 9.4"), ("NSM-APP-02", "Red Hat Enterprise Linux 9.4"),
                     ("NSM-APP-03", "Ubuntu 24.04 LTS"), ("NSM-FS-01", "Ubuntu 24.04 LTS"), ("NSM-WEB-01", "Ubuntu 24.04 LTS")]
    servers = []
    for name, cpus, cores, role in windows_servers:
        servers.append(dict(
            name=name, os="Windows Server", os_version="2022 Standard", manufacturer="Hewlett Packard Enterprise",
            model_id="ProLiant DL380 Gen11", serial_number=f"{name.replace('-', '')}SN", cpu_count=cpus,
            cpu_core_count=cores, assigned_to="", location=LOCATIONS[0][0], company=COMPANY,
            install_status="Installed", short_description=role,
        ))
    for name, osv in linux_servers:
        servers.append(dict(
            name=name, os="Linux", os_version=osv, manufacturer="Hewlett Packard Enterprise",
            model_id="ProLiant DL360 Gen11", serial_number=f"{name.replace('-', '')}SN", cpu_count="2",
            cpu_core_count="8", assigned_to="", location=LOCATIONS[1][0], company=COMPANY,
            install_status="Installed", short_description="Linux application server",
        ))

    models = []
    for key, p in PRODUCTS.items():
        models.append(dict(
            scenario=p["scenario"], display_name=f"{p['publisher']} {p['product']} {p['version']} {p['edition']}",
            publisher=p["publisher"], product=p["product"], version=p["version"], edition=p["edition"],
            platform=p["platform"], product_type=p["product_type"], license_metric=p["license_metric"],
            maps_to_discovered_name=p["discovered_name"],
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
                ci=device, user=user_of[device], publisher=p["publisher"], product=p["product"], version=p["version"],
                last_used=days_ago(last_used_days), total_usage_minutes=str(used_minutes), scenario=p["scenario"],
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

    def ent(name, model, scenario, metric, rights, per_pack, packs, cost, ltype, purchase, start, end, po, expected):
        return dict(display_name=name, software_model=model, scenario=scenario, license_metric=metric,
                    purchased_rights=str(rights), rights_per_pack=str(per_pack), packs=str(packs), unit_cost=cost,
                    currency="EUR", license_type=ltype, purchase_date=purchase, start_date=start, end_date=end,
                    vendor=VENDOR, po_number=po, expected_position=expected)

    entitlements = [
        ent("Adobe Acrobat Pro named user subscription", models[0]["display_name"], "A", "Per Named User", 40, 1, 40,
            acrobat["unit_cost"], "Subscription", "2026-01-15", "2026-02-01", "2027-01-31", "NSM-PO-2026-0101",
            "Compliant: 40 rights, 40 installations, 40 allocations"),
        ent("Microsoft SQL Server 2022 Standard per core", models[1]["display_name"], "B", "Per Core", 16, 2, 8,
            sql["unit_cost"], "Perpetual", "2025-11-20", "2025-11-20", "", "NSM-PO-2025-0877",
            "Shortage: 24 cores required, 16 owned, true up 4 packs of 2 cores"),
        ent("Microsoft Visio Professional 2021 per device", models[2]["display_name"], "C", "Per Device", 60, 1, 60,
            visio["unit_cost"], "Perpetual", "2025-06-10", "2025-06-10", "", "NSM-PO-2025-0412",
            "Surplus: 35 installations, 60 owned, 25 unused rights"),
        ent("Microsoft Project Professional 2021 per device", models[3]["display_name"], "D", "Per Device", 30, 1, 30,
            project["unit_cost"], "Perpetual", "2025-06-10", "2025-06-10", "", "NSM-PO-2025-0413",
            "Compliant: 28 installations, 30 owned, 12 installations unused over 90 days"),
        ent("Microsoft Windows Server 2022 Standard per core", models[4]["display_name"], "E", "Per Core", 112, 2, 56,
            winsrv["unit_cost"], "Perpetual", "2025-03-05", "2025-03-05", "", "NSM-PO-2025-0150",
            "Compliant: 7 physical servers at the 16 core minimum = 112 cores, 112 owned"),
    ]

    allocations = [dict(entitlement=entitlements[0]["display_name"], allocated_to_type="user",
                        allocated_to=users[n - 1]["user_name"], quantity="1", scenario="A") for n in range(1, 41)]

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
        f"| Entitlements | {len(entitlements)} |", f"| Allocations | {len(allocations)} |", "",
        "| Scenario | Product | Metric | Owned | Consumed | Expected position | Money story |",
        "| --- | --- | --- | --- | --- | --- | --- |",
        "| A | Adobe Acrobat 2024 Pro | Per Named User | 40 | 40 users | Compliant | Subscription renews 31 Jan 2027 |",
        "| B | Microsoft SQL Server 2022 Standard | Per Core | 16 cores (8 packs) | 24 cores on 3 servers | Shortage of 8 cores | True up 4 packs x EUR 3,945 = EUR 15,780 exposure |",
        "| C | Microsoft Visio 2021 Professional | Per Device | 60 | 35 workstations | Surplus of 25 | 25 x EUR 579 = EUR 14,475 of rights to reuse before buying |",
        "| D | Microsoft Project 2021 Professional | Per Device | 30 | 28 workstations, 12 unused over 90 days | Compliant, 12 reclamation candidates | 12 x EUR 1,059 = EUR 12,708 reclaimable value |",
        "| E | Microsoft Windows Server 2022 Standard | Per Core | 112 cores (56 packs) | 7 physical servers at the 16 core minimum | Compliant | Publisher rule demonstration |",
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
