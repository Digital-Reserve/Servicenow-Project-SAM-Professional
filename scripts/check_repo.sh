#!/usr/bin/env bash
# Repository hygiene check for the SAM Portfolio project.
# Fails when it finds secret like content, forbidden file types, disallowed
# files in evidence/ or exports/, or broken relative Markdown links.
# Usage: bash scripts/check_repo.sh
set -u
cd "$(dirname "$0")/.." || exit 2
status=0
fail() { echo "FAIL: $*"; status=1; }
note() { echo "NOTE: $*"; }

# Files tracked by git plus untracked files that are not ignored.
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  mapfile -t files < <(git ls-files --cached --others --exclude-standard)
else
  mapfile -t files < <(find . -type f -not -path './.git/*' | sed 's#^\./##')
fi

# 1. Forbidden file names and extensions.
forbidden_re='(^|/)(\.env(\..*)?|id_rsa.*|id_ed25519.*|.*\.(pem|key|p12|pfx|jks|keystore|cookie|cookies|cer|crt|der|ovpn|kdbx)|credentials\.json|service_account.*\.json)$'
for f in "${files[@]}"; do
  if [[ "$f" =~ $forbidden_re ]]; then fail "forbidden file type committed: $f"; fi
done

# 2. Secret like content in text files.
secret_patterns=(
  '-----BEGIN [A-Z ]*PRIVATE KEY-----'
  'AKIA[0-9A-Z]{16}'
  'gh[pousr]_[A-Za-z0-9]{36}'
  'github_pat_[A-Za-z0-9_]{22,}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
  'eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}'
  'https?://[^/[:space:]:]+:[^@[:space:]]+@'
  'glide_user_session=|glide_session_store=|BIGipServer[A-Za-z0-9_]*=|JSESSIONID=|glide_user_activity='
  '(api[_-]?key|secret|token|passwd|password)[[:space:]]*[:=][[:space:]]*["'"'"'][^"'"'"'[:space:]]{8,}["'"'"']'
)
for f in "${files[@]}"; do
  [[ -f "$f" ]] || continue
  case "$f" in
    *.png|*.jpg|*.jpeg|*.gif|*.webp|*.pdf|*.zip) continue ;;
    scripts/check_repo.sh) continue ;;
  esac
  for p in "${secret_patterns[@]}"; do
    if grep -nEi -- "$p" "$f" >/dev/null 2>&1; then
      fail "secret like content in $f (pattern: $p)"
      grep -nEi -- "$p" "$f" | head -3 | sed 's/^/      /'
    fi
  done
done

# 3. Allowed file types in evidence/ and exports/.
for f in "${files[@]}"; do
  case "$f" in
    evidence/*)
      [[ "$f" =~ \.(png|jpg|jpeg|gif|webp|pdf|md)$ ]] || fail "disallowed file type in evidence/: $f" ;;
    exports/*)
      [[ "$f" =~ (\.(xml|csv|json|md|txt|js)|SHA256SUMS)$ ]] || fail "disallowed file type in exports/: $f" ;;
  esac
done

# 4. Large files (over 10 MB) are almost certainly wrong here.
for f in "${files[@]}"; do
  [[ -f "$f" ]] || continue
  size=$(stat -c %s "$f" 2>/dev/null || stat -f %z "$f")
  if (( size > 10485760 )); then fail "file larger than 10 MB: $f"; fi
done

# 5. Relative Markdown links must resolve.
for f in "${files[@]}"; do
  [[ "$f" == *.md ]] || continue
  dir=$(dirname "$f")
  while IFS= read -r link; do
    target=${link%%#*}
    [[ -z "$target" ]] && continue
    case "$target" in http://*|https://*|mailto:*) continue ;; esac
    if [[ ! -e "$dir/$target" && ! -e "$target" ]]; then fail "broken link in $f: $link"; fi
  done < <(grep -oE '\]\(([^)]+)\)' "$f" | sed -E 's/^\]\((.*)\)$/\1/' | sed -E 's/ .*$//')
done

# 6. Placeholders still present in the README are reported, not failed.
if grep -nE 'not yet provisioned|not yet created' README.md >/dev/null 2>&1; then
  note "README still carries placeholders for the live instance or visitor account."
fi

if (( status == 0 )); then echo "check_repo: all checks passed (${#files[@]} files)"; fi
exit $status
