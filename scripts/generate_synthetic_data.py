#!/usr/bin/env python3
"""Generate the Northstar Manufacturing synthetic dataset.

Deterministic: running it twice produces byte identical files. The dataset is
small on purpose; the licensing logic matters more than volume.

Usage:
    python3 scripts/generate_synthetic_data.py            # writes docs/synthetic_data/northstar
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

# Demonstration products. Scenario letters match docs/synthetic_data/README.md.
PRODUCTS = {
    "acrobat": dict(scenario="A", publisher="Adobe", product="Acrobat", version="2024",
                    edition="Pro", platform="Windows", product_type="Application",
                    license_metric="Per Named User", discovered_name="Adobe Acrobat (64-bit)",
                    discovered_version="24.2.20857"),
    "sqlserver": dict(scenario="B", publisher="Microsoft", product="SQL Server", version="2022",
                      edition="Standard", platform="Windows", product_type="Database",
                      license_metric="Per Core", discovered_name="Microsoft SQL Server 2022 Standard Edition",
                      discovered_version="16.0.4135.4"),
    "visio": dict(scenario="C", publisher="Microsoft", product="Visio", version="2021",
                  edition="Professional", platform="Windows", product_type="Application",
                  license_metric="Per Device", discovered_name="Microsoft Visio Professional 2021",
                  discovered_version="16.0.14332.20637"),
    "project": dict(scenario="D", publisher="Microsoft", product="Project", version="2021",
                    edition="Professional", platform="Windows", product_type="Application",
                    license_metric="Per Device", discovered_name="Microsoft Project Professional 2021",
                    discovered_version="16.0.14332.20637"),
    "winserver": dict(scenario="E", publisher="Microsoft", product="Windows Server", version="2022",
                      edition="Standard", platform="Windows", product_type="Operating System",
                      license_metric="Per Core", discovered_name="Microsoft Windows Server 2022 Standard",
                      discovered_version="10.0.20348"),
}

# Free software used to show normalization of non licensable products.
NOISE_PRODUCTS = [
    ("Google", "Chrome", "130.0.6723.117", "Google Chrome"),
    ("Igor Pavlov", "7-Zip", "24.08", "7-Zip 24.08 (x64)"),
    ("Notepad++ Team", "Notepad++", "8.7.1", "Notepad++ (64-bit x64)"),
]


def date_str(d: dt.date) -> str:
    return d.isoformat()


def build(out_dir: pathlib.Path) -> None:
    rng = random.Random(SEED)
    out_dir.mkdir(parents=True, exist_ok=True)

    # Company and locations
    companies = [dict(name=COMPANY, street="Maasboulevard 100", city="Rotterdam",
                      country="Netherlands", website=f"https://www.{DOMAIN}", notes="Synthetic company")]
    locations = [dict(name=n, city=c, country=co, company=COMPANY) for n, c, co in LOCATIONS]
    departments = [dict(name=d, company=COMPANY) for d in DEPARTMENTS]

    # Users: 60, deterministic names
    users = []
    used = set()
    i = 0
    while len(users) < 60:
        if i > 10 * 60:
            raise RuntimeError("could not generate enough unique names")
        fn = FIRST_NAMES[i % len(FIRST_NAMES)]
        # The offset i // len(FIRST_NAMES) shifts the pairing on every cycle so pairs stay unique.
        ln = LAST_NAMES[(i * 7 + i // len(FIRST_NAMES)) % len(LAST_NAMES)]
        i += 1
        key = (fn, ln)
        if key in used:
            continue
        used.add(key)
        n = len(users) + 1
        user_name = f"{fn}.{ln}".lower().replace(" ", "")
        users.append(dict(
            user_name=user_name,
            first_name=fn,
            last_name=ln,
            email=f"{user_name}@{DOMAIN}",
            title=rng.choice(["Analyst", "Engineer", "Specialist", "Team Lead", "Planner", "Coordinator"]),
            department=DEPARTMENTS[n % len(DEPARTMENTS)],
            location=LOCATIONS[n % len(LOCATIONS)][0],
            company=COMPANY,
            active="true",
            employee_number=f"NSM{n:04d}",
        ))

    # Workstations: 45, assigned to users 1..45
    devices = []
    for n in range(1, 46):
        u = users[n - 1]
        devices.append(dict(
            name=f"NSM-WS-{n:03d}", device_class="Computer", os="Windows", os_version="11 Enterprise 23H2",
            manufacturer="Dell Inc.", model="Latitude 5550", serial_number=f"NSMWS{n:05d}X",
            cpu_count="1", cpu_core_count="8", assigned_to=u["user_name"], location=u["location"],
            company=COMPANY, install_status="Installed", virtual="false",
        ))
    # Servers: 4 Windows application hosts (16 cores), 3 SQL servers (8 cores), 5 Linux
    server_specs = []
    for n in range(1, 5):
        server_specs.append((f"NSM-WIN-{n:02d}", "Windows Server", "2022 Standard", 2, 16, "Application host"))
    for n in range(1, 4):
        server_specs.append((f"NSM-SQL-{n:02d}", "Windows Server", "2022 Standard", 2, 8, "Database server"))
    linux = [("NSM-APP-01", "Linux", "Red Hat Enterprise Linux 9.4"), ("NSM-APP-02", "Linux", "Red Hat Enterprise Linux 9.4"),
             ("NSM-APP-03", "Linux", "Ubuntu 24.04 LTS"), ("NSM-FS-01", "Linux", "Ubuntu 24.04 LTS"),
             ("NSM-WEB-01", "Linux", "Ubuntu 24.04 LTS")]
    for name, osn, osv, cpus, cores, role in server_specs:
        devices.append(dict(
            name=name, device_class="Server", os=osn, os_version=osv, manufacturer="Hewlett Packard Enterprise",
            model="ProLiant DL380 Gen11", serial_number=f"{name.replace('-', '')}SN", cpu_count=str(cpus),
            cpu_core_count=str(cores), assigned_to="", location=LOCATIONS[0][0], company=COMPANY,
            install_status="Installed", virtual="false",
        ))
    for name, osn, osv in linux:
        devices.append(dict(
            name=name, device_class="Server", os=osn, os_version=osv, manufacturer="Hewlett Packard Enterprise",
            model="ProLiant DL360 Gen11", serial_number=f"{name.replace('-', '')}SN", cpu_count="2",
            cpu_core_count="8", assigned_to="", location=LOCATIONS[1][0], company=COMPANY,
            install_status="Installed", virtual="false",
        ))

    # Software models
    models = []
    for key, p in PRODUCTS.items():
        models.append(dict(
            key=key, scenario=p["scenario"], publisher=p["publisher"], product=p["product"], version=p["version"],
            edition=p["edition"], platform=p["platform"], product_type=p["product_type"],
            license_metric=p["license_metric"],
            display_name=f"{p['publisher']} {p['product']} {p['version']} {p['edition']}".strip(),
        ))

    # Installations
    installs = []

    def add_install(device: str, p: dict, installed_days_ago: int, last_used_days_ago: int | None) -> None:
        installs.append(dict(
            device_name=device,
            discovered_publisher=p["publisher"],
            discovered_product=p["discovered_name"],
            discovered_version=p["discovered_version"],
            publisher=p["publisher"], product=p["product"], version=p["version"], edition=p["edition"],
            install_date=date_str(REFERENCE_DATE - dt.timedelta(days=installed_days_ago)),
            last_used=date_str(REFERENCE_DATE - dt.timedelta(days=last_used_days_ago)) if last_used_days_ago is not None else "",
            scenario=p["scenario"],
        ))

    acrobat, sql, visio, project, winsrv = (PRODUCTS[k] for k in ("acrobat", "sqlserver", "visio", "project", "winserver"))
    # A: Acrobat on workstations of users 1..40 (40 installs, 40 rights)
    for n in range(1, 41):
        add_install(f"NSM-WS-{n:03d}", acrobat, rng.randint(60, 400), rng.randint(0, 20))
    # C: Visio on workstations 1..35 (35 installs, 60 rights -> surplus 25)
    for n in range(1, 36):
        add_install(f"NSM-WS-{n:03d}", visio, rng.randint(60, 400), rng.randint(0, 30))
    # D: Project on workstations 10..37 (28 installs, 30 rights); 26..37 unused > 90 days (12 candidates)
    for n in range(10, 38):
        unused = n >= 26
        add_install(f"NSM-WS-{n:03d}", project, rng.randint(120, 400), rng.randint(95, 300) if unused else rng.randint(0, 25))
    # B: SQL Server on the three SQL servers (3 x 8 cores = 24 cores, 16 owned -> shortage 8)
    for n in range(1, 4):
        add_install(f"NSM-SQL-{n:02d}", sql, rng.randint(200, 600), rng.randint(0, 3))
    # E: Windows Server on 7 Windows servers (4x16 + 3x8 = 88 cores = 44 packs, 44 owned -> compliant)
    for name, *_ in server_specs:
        add_install(name, winsrv, rng.randint(200, 600), 0)
    # Noise: free software on every workstation
    for n in range(1, 46):
        for pub, prod, ver, disc in NOISE_PRODUCTS:
            installs.append(dict(
                device_name=f"NSM-WS-{n:03d}", discovered_publisher=pub, discovered_product=disc,
                discovered_version=ver, publisher=pub, product=prod, version=ver, edition="",
                install_date=date_str(REFERENCE_DATE - dt.timedelta(days=rng.randint(30, 300))),
                last_used=date_str(REFERENCE_DATE - dt.timedelta(days=rng.randint(0, 10))), scenario="noise",
            ))

    # Entitlements (quantities chosen to produce the scenario outcomes)
    entitlements = [
        dict(display_name="Adobe Acrobat Pro named user subscription", software_model=models[0]["display_name"],
             scenario="A", license_metric="Per Named User", purchased_rights="40", rights_per_pack="1", packs="40",
             unit_cost="192.00", currency="EUR", license_type="Subscription", purchase_date="2026-01-15",
             start_date="2026-02-01", end_date="2027-01-31", vendor="Synthetic Reseller BV",
             po_number="NSM-PO-2026-0101", expected_position="Compliant: 40 rights, 40 installs"),
        dict(display_name="Microsoft SQL Server 2022 Standard per core", software_model=models[1]["display_name"],
             scenario="B", license_metric="Per Core", purchased_rights="16", rights_per_pack="2", packs="8",
             unit_cost="3945.00", currency="EUR", license_type="Perpetual", purchase_date="2025-11-20",
             start_date="2025-11-20", end_date="", vendor="Synthetic Reseller BV",
             po_number="NSM-PO-2025-0877", expected_position="Shortage: 24 cores consumed, 16 owned, true up 4 packs"),
        dict(display_name="Microsoft Visio Professional 2021 per device", software_model=models[2]["display_name"],
             scenario="C", license_metric="Per Device", purchased_rights="60", rights_per_pack="1", packs="60",
             unit_cost="579.00", currency="EUR", license_type="Perpetual", purchase_date="2025-06-10",
             start_date="2025-06-10", end_date="", vendor="Synthetic Reseller BV",
             po_number="NSM-PO-2025-0412", expected_position="Surplus: 35 installs, 60 owned, 25 unused rights"),
        dict(display_name="Microsoft Project Professional 2021 per device", software_model=models[3]["display_name"],
             scenario="D", license_metric="Per Device", purchased_rights="30", rights_per_pack="1", packs="30",
             unit_cost="1059.00", currency="EUR", license_type="Perpetual", purchase_date="2025-06-10",
             start_date="2025-06-10", end_date="", vendor="Synthetic Reseller BV",
             po_number="NSM-PO-2025-0413", expected_position="Compliant with 12 reclamation candidates unused over 90 days"),
        dict(display_name="Microsoft Windows Server 2022 Standard per core", software_model=models[4]["display_name"],
             scenario="E", license_metric="Per Core", purchased_rights="88", rights_per_pack="2", packs="44",
             unit_cost="248.00", currency="EUR", license_type="Perpetual", purchase_date="2025-03-05",
             start_date="2025-03-05", end_date="", vendor="Synthetic Reseller BV",
             po_number="NSM-PO-2025-0150", expected_position="Compliant: 88 cores with Microsoft minimums, 88 owned"),
    ]

    # Allocations: Acrobat to users 1..40
    allocations = [dict(entitlement=entitlements[0]["display_name"], allocated_to_type="user",
                        allocated_to=users[n - 1]["user_name"], quantity="1", scenario="A") for n in range(1, 41)]

    def write(name: str, rows: list[dict]) -> None:
        path = out_dir / name
        with path.open("w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=list(rows[0].keys()), lineterminator="\n")
            writer.writeheader()
            writer.writerows(rows)

    write("companies.csv", companies)
    write("locations.csv", locations)
    write("departments.csv", departments)
    write("users.csv", users)
    write("devices.csv", devices)
    write("software_models.csv", models)
    write("software_installations.csv", installs)
    write("entitlements.csv", entitlements)
    write("allocations.csv", allocations)

    summary = out_dir / "SUMMARY.md"
    counts = {
        "companies": len(companies), "locations": len(locations), "departments": len(departments),
        "users": len(users), "devices": len(devices), "software models": len(models),
        "software installations": len(installs), "entitlements": len(entitlements), "allocations": len(allocations),
    }
    lines = ["# Northstar synthetic dataset summary", "", f"Reference date: {REFERENCE_DATE.isoformat()}", "",
             "| Object | Count |", "| --- | --- |"]
    lines += [f"| {k} | {v} |" for k, v in counts.items()]
    lines += ["", "| Scenario | Product | Metric | Owned | Consumed | Expected position |", "| --- | --- | --- | --- | --- | --- |",
              "| A | Adobe Acrobat 2024 Pro | Per Named User | 40 | 40 users | Compliant |",
              "| B | Microsoft SQL Server 2022 Standard | Per Core | 16 cores (8 packs) | 24 cores on 3 servers | Shortage of 8 cores (4 packs) |",
              "| C | Microsoft Visio 2021 Professional | Per Device | 60 | 35 devices | Surplus of 25 |",
              "| D | Microsoft Project 2021 Professional | Per Device | 30 | 28 devices, 12 unused over 90 days | Compliant, 12 reclamation candidates |",
              "| E | Microsoft Windows Server 2022 Standard | Per Core | 88 cores (44 packs) | 4 servers x 16 cores + 3 servers x 8 cores = 88 | Compliant |",
              ""]
    summary.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", default=str(pathlib.Path(__file__).resolve().parents[1] / "docs" / "synthetic_data" / "northstar"))
    args = parser.parse_args()
    build(pathlib.Path(args.out))
    print(f"Synthetic dataset written to {args.out}")


if __name__ == "__main__":
    main()
