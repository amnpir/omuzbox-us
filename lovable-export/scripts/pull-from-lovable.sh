#!/usr/bin/env bash
# Pull latest files from Lovable API (requires BEARER_TOKEN from browser DevTools)
set -euo pipefail

PROJECT_ID="f554ea18-025d-440a-84a2-bdd90eead593"
REF="${LOVABLE_REF:-5339282965e8eac014fd21e0b37537a73a16e77f}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -z "${BEARER_TOKEN:-}" ]]; then
  echo "Set BEARER_TOKEN (from DevTools → Network → api.lovable.dev → Authorization header)"
  exit 1
fi

TOKEN="${BEARER_TOKEN#Bearer }"
AUTH="Authorization: Bearer ${TOKEN}"
ORIGIN="Origin: https://lovable.dev"

mkdir -p "$ROOT"
cd "$ROOT"

echo "Fetching file list..."
FILES_JSON=$(curl -sf \
  -H "$AUTH" -H "$ORIGIN" \
  "https://api.lovable.dev/projects/${PROJECT_ID}/git/files?ref=${REF}")

echo "$FILES_JSON" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for f in data.get('files', []):
    print(f['path'])
" | while read -r path; do
  [[ -z "$path" ]] && continue
  dir=$(dirname "$path")
  mkdir -p "$dir"
  echo "  $path"
  curl -sf \
    -H "$AUTH" -H "$ORIGIN" \
    "https://api.lovable.dev/projects/${PROJECT_ID}/git/file?path=${path}&ref=${REF}" \
    -o "$path"
done

echo "Done. Files saved to $ROOT"
