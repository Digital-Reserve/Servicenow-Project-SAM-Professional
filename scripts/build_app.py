#!/usr/bin/env python3
"""Build the offline guide app and everything generated from the guide content.

Inputs (edit these):
    app/source/guide_content.json     every stage, step, check and glossary entry
    app/source/template.html          the app shell (HTML, CSS, JavaScript)
    app/source/servicenow/*.js        ServiceNow background script templates
    data/northstar/*.csv              synthetic data (from generate_synthetic_data.py)

Outputs (never edit by hand):
    app/SAM_Pro_Build_Guide.html      the offline app, one self contained file
    data/northstar/servicenow/*.js    the ServiceNow scripts with the data filled in
    docs/build_guide.md               every step of the guide as a readable page
    docs/06_glossary.md               the glossary as a readable page
    evidence/README.md                the list of screenshots the guide asks for

Usage:
    python3 scripts/build_app.py              # write the outputs
    python3 scripts/build_app.py --out DIR    # write the outputs below DIR (used by CI)
"""
from __future__ import annotations

import argparse
import csv
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / "app" / "source"
DATA_DIR = ROOT / "data" / "northstar"
APP_NAME = "SAM_Pro_Build_Guide.html"
RESELLER = "Synthetic Reseller BV"
COMPANY = "Northstar Manufacturing"


def read_csv(name: str) -> list[dict]:
    with (DATA_DIR / name).open(newline="", encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def compact(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


def script_data() -> dict[str, object]:
    companies = read_csv("01_companies.csv")
    workstations = read_csv("05_workstations.csv")
    servers = read_csv("06_servers.csv")
    installs = read_csv("07_software_installations.csv")
    products: list[list[str]] = []
    product_index: dict[tuple, int] = {}
    for i in installs:
        key = (i["display_name"], i["publisher"], i["version"])
        if key not in product_index:
            product_index[key] = len(products)
            products.append(list(key))
    loader = {
        "company": COMPANY,
        "companies": [dict(c, vendor=c["name"] == RESELLER) for c in companies],
        "manufacturers": sorted({r["manufacturer"] for r in workstations + servers}),
        "locations": read_csv("02_locations.csv"),
        "departments": read_csv("03_departments.csv"),
        "users": read_csv("04_users.csv"),
        "workstations": [{k: v for k, v in w.items() if k != "model_id"} for w in workstations],
        "servers": [{k: v for k, v in s.items() if k != "model_id"} for s in servers],
        # Installations are stored compactly: a product list plus [computer, product index, install date].
        "products": products,
        "installs": [[i["installed_on"], product_index[(i["display_name"], i["publisher"], i["version"])], i["install_date"]]
                     for i in installs],
    }
    allocations = [{k: a[k] for k in ("entitlement_po", "entitlement", "allocated_to_type", "allocated_to", "quantity")}
                   for a in read_csv("10_allocations.csv")]
    usage = [{k: u[k] for k in ("ci", "user", "display_name", "publisher", "product", "last_used", "minutes_used")}
             for u in read_csv("11_software_usage.csv")]
    return {
        "00_install_workspace.js": None,
        "01_load_northstar.js": loader,
        "02_allocate_licenses.js": allocations,
        "03_load_usage.js": usage,
    }


def build_scripts() -> dict[str, str]:
    scripts = {}
    for name, data in script_data().items():
        text = (SOURCE / "servicenow" / name).read_text(encoding="utf-8")
        if data is not None:
            if "/*__DATA__*/null" not in text:
                raise SystemExit(f"{name}: placeholder /*__DATA__*/null missing")
            text = text.replace("/*__DATA__*/null", compact(data))
        scripts[name] = text
    return scripts


def embed(obj) -> str:
    """JSON that is safe inside a <script type="application/json"> element."""
    text = json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
    return text.replace("</", "<\\/").replace("<!--", "<\\!--")


# ---------------------------------------------------------------- markdown export

INLINE_TERM = re.compile(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]")


def md_inline(text: str) -> str:
    return INLINE_TERM.sub(lambda m: m.group(2) or m.group(1), text)


def md_table(columns: list[dict], rows: list[dict]) -> list[str]:
    head = "| " + " | ".join(c["label"] for c in columns) + " |"
    sep = "| " + " | ".join("---" for _ in columns) + " |"
    body = ["| " + " | ".join(md_inline(str(r.get(c["key"], ""))).replace("|", "\\|") for c in columns) + " |"
            for r in rows]
    return [head, sep, *body]


def build_markdown(content: dict) -> str:
    meta = content["meta"]
    lines = [
        f"# {meta['title']}: every step",
        "",
        f"This page is generated from the offline guide app (`app/{APP_NAME}`), content version {meta['version']} "
        f"of {meta['updated']}. Use the app during a session: it saves your ticks, opens the right ServiceNow "
        "pages for you and produces the tracker files. Use this page to read ahead, review or print.",
        "",
        "Do not edit this file. Edit `app/source/guide_content.json` and run `python3 scripts/build_app.py`.",
        "",
        "## Stages",
        "",
        "| Stage | Title | Time |",
        "| --- | --- | --- |",
    ]
    for st in content["stages"]:
        lines.append(f"| {st['number']} | {st['title']} | {st['time']} |")
    for st in content["stages"]:
        lines += ["", f"## Stage {st['number']}: {st['title']}", "", f"**Time:** {st['time']}", "",
                  f"**Goal:** {md_inline(st['goal'])}", "", f"**Why it matters:** {md_inline(st['why'])}", ""]
        if st.get("before"):
            lines += ["**Before you start**", ""] + [f"- {md_inline(b)}" for b in st["before"]] + [""]
        for step in st["steps"]:
            tag = " (optional)" if step.get("optional") else ""
            lines += [f"### Step {step['num']}: {md_inline(step['title'])}{tag}", ""]
            if step.get("where"):
                lines += [f"*Where:* {step['where']}", ""]
            for i, line in enumerate(step.get("do", []), 1):
                lines.append(f"{i}. {md_inline(line)}")
            if step.get("do"):
                lines.append("")
            if step.get("path"):
                lines += ["Menu path: **" + " › ".join(step["path"]) + "**", ""]
            for c in step.get("copy", []):
                lines.append(f"- {c['label']}: `{c['value']}`")
            if step.get("copy"):
                lines.append("")
            for link in step.get("links", []):
                if link.get("url"):
                    lines.append(f"- {link['label']}: <{link['url']}>")
                else:
                    lines.append(f"- {link['label']}: open `{link['path']}` on your instance")
            if step.get("links"):
                lines.append("")
            if step.get("script"):
                lines += [f"Script: `data/northstar/servicenow/{step['script']}` (copy it from the app or open the file).", ""]
            if step.get("table"):
                lines += md_table(step["table"]["columns"], step["table"]["rows"]) + [""]
            if step.get("grid"):
                g = step["grid"]
                cols = [{"key": "label", "label": g.get("rowLabel", "Item")}] + [
                    {"key": c["key"], "label": c["label"]} for c in g["columns"]]
                rows = []
                for r in g["rows"]:
                    row = {"label": r["label"]}
                    for c in g["columns"]:
                        row[c["key"]] = r.get(c["key"], "") if c.get("fixed") else "(record in app)"
                    rows.append(row)
                lines += md_table(cols, rows) + [""]
            if step.get("note"):
                lines += [f"> {md_inline(step['note'])}", ""]
            if step.get("see"):
                lines += [f"**You should see:** {md_inline(step['see'])}", ""]
            if step.get("help"):
                lines += ["**If not:**", ""] + [f"- {md_inline(h)}" for h in step["help"]] + [""]
            if step.get("record"):
                lines += ["**Write down:** " + ", ".join(r["label"] for r in step["record"]), ""]
            if step.get("shot"):
                lines += [f"**Screenshot:** `evidence/{step['shot']}`", ""]
            if step.get("wait"):
                lines += [f"**Waiting time:** {step['wait']}", ""]
        if st.get("checks"):
            lines += ["### Checks before you finish the stage", ""] + [f"- [ ] {md_inline(c['text'])}" for c in st["checks"]] + [""]
        if st.get("problems"):
            lines += ["### If something goes wrong", ""]
            lines += md_table([{"key": "problem", "label": "Problem"}, {"key": "fix", "label": "What to do"}], st["problems"]) + [""]
    lines += ["", "## Glossary", ""]
    lines += md_table([{"key": "term", "label": "Term"}, {"key": "plain", "label": "In plain words"}], content["glossary"])
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------- main

def build_glossary(content: dict) -> str:
    lines = [
        "# Glossary", "",
        "Every term used in the project, in one sentence. The same explanations appear when you click an underlined word in the guide app.", "",
        "Generated from the guide content by `scripts/build_app.py`. Do not edit by hand.", "",
        "| Term | In plain words |", "| --- | --- |",
    ]
    lines += [f"| {g['term']} | {md_inline(g['plain'])} |" for g in content["glossary"]]
    lines.append("")
    return "\n".join(lines)


def build_evidence_readme(content: dict) -> str:
    lines = [
        "# Evidence", "",
        "Screenshots that prove each result. The guide app names every screenshot in the step that produces it.", "",
        "Rules:", "",
        "- Save each screenshot with exactly the name below and upload it to this folder.",
        "- Crop anything sensitive first, including a browser address bar that shows session details. Never capture a password.",
        "- Allowed types: png, jpg, jpeg, gif, webp, pdf. The repository check rejects other files here.", "",
        "Generated from the guide content by `scripts/build_app.py`. Do not edit by hand.", "",
        "| File | Stage | Step | Shows |", "| --- | --- | --- | --- |",
    ]
    for st in content["stages"]:
        for step in st["steps"]:
            if step.get("shot"):
                lines.append(f"| `{step['shot']}` | {st['number']} | {step['num']} | {md_inline(step['title'])} |")
    lines.append("")
    return "\n".join(lines)


def validate(content: dict) -> None:
    seen = set()
    for st in content["stages"]:
        for step in st["steps"]:
            for key in ("id", "num", "title"):
                if key not in step:
                    raise SystemExit(f"stage {st['id']}: a step has no {key}")
            if step["id"] in seen:
                raise SystemExit(f"duplicate step id {step['id']}")
            seen.add(step["id"])
            if step.get("script") and not (SOURCE / "servicenow" / step["script"]).exists():
                raise SystemExit(f"step {step['id']}: script {step['script']} not found")
        for chk in st.get("checks", []):
            if chk["id"] in seen:
                raise SystemExit(f"duplicate check id {chk['id']}")
            seen.add(chk["id"])
    terms = {g["term"].lower() for g in content["glossary"]}
    blob = json.dumps(content["stages"]) + json.dumps(content.get("basics", {}))
    for m in INLINE_TERM.finditer(blob):
        if m.group(1).lower() not in terms:
            raise SystemExit(f"glossary term missing: {m.group(1)}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--out", default=str(ROOT))
    args = parser.parse_args()
    out = pathlib.Path(args.out)

    scripts = build_scripts()
    (out / "data" / "northstar" / "servicenow").mkdir(parents=True, exist_ok=True)
    for name, text in scripts.items():
        (out / "data" / "northstar" / "servicenow" / name).write_text(text, encoding="utf-8")

    content_path = SOURCE / "guide_content.json"
    template_path = SOURCE / "template.html"
    if not content_path.exists() or not template_path.exists():
        print("ServiceNow scripts written; guide content or template missing, app not built")
        return
    content = json.loads(content_path.read_text(encoding="utf-8"))
    validate(content)

    files = {}
    for path in sorted(DATA_DIR.glob("*.csv")) + [DATA_DIR / "SUMMARY.md"]:
        files[path.name] = path.read_text(encoding="utf-8")
    template = template_path.read_text(encoding="utf-8")
    replacements = {
        "__GUIDE_CONTENT__": embed(content),
        "__NORTHSTAR_FILES__": embed(files),
        "__SERVICENOW_SCRIPTS__": embed(scripts),
    }
    for marker, value in replacements.items():
        if template.count(marker) != 1:
            raise SystemExit(f"template must contain {marker} exactly once")
        template = template.replace(marker, value)
    (out / "app").mkdir(parents=True, exist_ok=True)
    (out / "app" / APP_NAME).write_text(template, encoding="utf-8")
    (out / "docs").mkdir(parents=True, exist_ok=True)
    (out / "docs" / "build_guide.md").write_text(build_markdown(content), encoding="utf-8")
    (out / "docs" / "06_glossary.md").write_text(build_glossary(content), encoding="utf-8")
    (out / "evidence").mkdir(parents=True, exist_ok=True)
    (out / "evidence" / "README.md").write_text(build_evidence_readme(content), encoding="utf-8")
    print(f"Built app/{APP_NAME}, docs/build_guide.md, docs/06_glossary.md, evidence/README.md and {len(scripts)} ServiceNow scripts")


if __name__ == "__main__":
    main()
