#!/usr/bin/env bash
# Re-render any .excalidraw whose source is newer than its rendered PNG,
# then sync the result to website/public/diagrams/ using the manifest's
# renamed format (e.g. ch04-fig2-unit-of-evaluation.png -> ch04-fig2.png).
#
# Usage:
#   scripts/sync-diagrams.sh             # render+sync stale only
#   scripts/sync-diagrams.sh --force     # re-render and sync everything
#   scripts/sync-diagrams.sh --check     # report what would change, no writes
#
# Requires: jq, uv (used by the excalidraw renderer)

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$REPO/website/src/data/diagram-manifest.json"

MODE="sync"
case "${1:-}" in
  --force) MODE="force" ;;
  --check) MODE="check" ;;
  -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
  "") ;;
  *) echo "unknown flag: $1" >&2; exit 2 ;;
esac

[ -f "$MANIFEST" ] || { echo "manifest not found: $MANIFEST" >&2; exit 1; }
[ "$MODE" = "check" ] || command -v npx >/dev/null || { echo "npx is required (install Node.js)" >&2; exit 1; }
command -v jq >/dev/null || { echo "jq is required (brew install jq)" >&2; exit 1; }

src_dir_for_section() {
  case "$1" in
    overview|openers) echo "diagrams" ;;
    concepts)         echo "diagrams/concepts" ;;
    inline)           echo "diagrams/inline" ;;
    maps)             echo "diagrams/maps" ;;
    dividers)         echo "diagrams/dividers" ;;
    *) echo "" ;;
  esac
}

rendered=0; synced=0; up_to_date=0; missing=0

is_newer() {
  # is_newer A B  -> exit 0 if A's mtime > B's mtime
  local a_t b_t
  a_t=$(stat -f %m "$1")
  b_t=$(stat -f %m "$2")
  [ "$a_t" -gt "$b_t" ]
}

process_section() {
  local section="$1"
  local src_dir
  src_dir="$REPO/$(src_dir_for_section "$section")"
  local entries
  entries=$(jq -r --arg s "$section" '.[$s][] | "\(.sourceFile)\t\(.src)"' "$MANIFEST")
  [ -z "$entries" ] && return 0

  while IFS=$'\t' read -r source_file web_src; do
    [ -z "$source_file" ] && continue
    local src_excalidraw="$src_dir/$source_file"
    local src_png="${src_excalidraw%.excalidraw}.png"
    local web_png="$REPO/website/public${web_src}"

    if [ ! -f "$src_excalidraw" ]; then
      echo "  missing-source  $source_file"
      missing=$((missing + 1))
      continue
    fi

    local need_render=0
    if [ "$MODE" = "force" ]; then
      need_render=1
    elif [ ! -f "$src_png" ]; then
      need_render=1
    elif is_newer "$src_excalidraw" "$src_png"; then
      need_render=1
    fi

    if [ "$need_render" -eq 1 ]; then
      if [ "$MODE" = "check" ]; then
        echo "  STALE  $source_file"
        rendered=$((rendered + 1))
      else
        echo "  render  $source_file"
        npx @excalidraw-skill-pack/render "$src_excalidraw" >/dev/null
        rendered=$((rendered + 1))
      fi
    fi

    if [ "$MODE" = "check" ] || [ ! -f "$src_png" ]; then
      continue
    fi

    local need_copy=0
    if [ ! -f "$web_png" ] || [ "$MODE" = "force" ]; then
      need_copy=1
    elif is_newer "$src_png" "$web_png"; then
      need_copy=1
    fi

    if [ "$need_copy" -eq 1 ]; then
      mkdir -p "$(dirname "$web_png")"
      cp "$src_png" "$web_png"
      synced=$((synced + 1))
      echo "  sync    $(basename "$web_png")"
    else
      up_to_date=$((up_to_date + 1))
    fi
  done < <(printf '%s\n' "$entries")
}

for section in overview openers concepts inline maps dividers; do
  echo "==> $section"
  process_section "$section"
done

echo
if [ "$MODE" = "check" ]; then
  echo "check complete: $rendered stale, $missing missing-source"
else
  echo "rendered: $rendered  ·  synced: $synced  ·  up-to-date: $up_to_date  ·  missing-source: $missing"
fi
