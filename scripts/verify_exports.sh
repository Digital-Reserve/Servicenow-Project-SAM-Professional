#!/usr/bin/env bash
# Verifies every exports/release_* folder: XML parses, CSV is readable,
# MANIFEST.md exists, SHA256SUMS exists and matches.
# Usage: bash scripts/verify_exports.sh
set -u
cd "$(dirname "$0")/.." || exit 2
status=0
fail() { echo "FAIL: $*"; status=1; }
shopt -s nullglob
releases=(exports/release_*/)
if (( ${#releases[@]} == 0 )); then
  echo "verify_exports: no release folders yet, nothing to verify"
  exit 0
fi
for rel in "${releases[@]}"; do
  rel=${rel%/}
  echo "== $rel"
  [[ -f "$rel/MANIFEST.md" ]] || fail "$rel has no MANIFEST.md"
  if [[ -f "$rel/SHA256SUMS" ]]; then
    (cd "$rel" && sha256sum --quiet -c SHA256SUMS) || fail "$rel checksum mismatch"
    # every file except the sums file must be listed
    for f in "$rel"/*; do
      base=$(basename "$f")
      [[ "$base" == "SHA256SUMS" ]] && continue
      grep -qE "[[:space:]]\*?$base$" "$rel/SHA256SUMS" || fail "$rel/$base is not listed in SHA256SUMS"
    done
  else
    fail "$rel has no SHA256SUMS (create with: cd $rel && sha256sum * > SHA256SUMS)"
  fi
  for x in "$rel"/*.xml; do
    python3 - "$x" <<'PY' || fail "XML does not parse: $x"
import sys, xml.etree.ElementTree as ET
ET.parse(sys.argv[1])
PY
  done
  for c in "$rel"/*.csv; do
    python3 - "$c" <<'PY' || fail "CSV does not parse: $c"
import csv, sys
with open(sys.argv[1], newline="", encoding="utf-8") as fh:
    rows = list(csv.reader(fh))
assert rows, "empty csv"
PY
  done
done
if (( status == 0 )); then echo "verify_exports: all release folders verified"; fi
exit $status
