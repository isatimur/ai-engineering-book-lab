#!/usr/bin/env bash
# Build the three served files for one book cover from its master.
#
#   diagrams/covers/<slug>.png                     master, 1696x2528, committed
#   website/public/covers/<slug>.png               1024x1536, quantised
#   website/public/covers/<slug>.webp              1024x1536
#   website/public/covers/<slug>-600w.webp         600x900, what the pages load
#
# Book 1's set was built by hand across three commits in June, which is why
# scripts/check_diagram_sync.py excludes diagrams/covers/ from its byte check:
# the served PNG is a quantised derivative of the master, so its bytes
# legitimately differ and a hash gate would fail on a correct repo. This
# script is the derivation that comment says has to exist in code first.
#
# Usage:
#   scripts/build-cover-derivatives.sh the-shape-of-the-work
#   scripts/build-cover-derivatives.sh --all
#
# Requires: magick (ImageMagick 7), cwebp.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MASTERS="$REPO/diagrams/covers"
SERVED="$REPO/website/public/covers"

command -v magick >/dev/null || { echo "magick is required (brew install imagemagick)" >&2; exit 1; }
command -v cwebp >/dev/null || { echo "cwebp is required (brew install webp)" >&2; exit 1; }

build_one() {
  local slug="$1"
  local master="$MASTERS/$slug.png"
  [ -f "$master" ] || { echo "no master: $master" >&2; return 1; }

  mkdir -p "$SERVED"
  # 256 colours is plenty for cream paper, black line art and one gold accent,
  # and it is what took book 1's served PNG from 2.7 MB to under 1.1 MB.
  magick "$master" -resize 1024x1536 -colors 256 "$SERVED/$slug.png"
  magick "$master" -resize 1024x1536 "$SERVED/$slug.webp"
  magick "$master" -resize 600x900 "$SERVED/$slug-600w.webp"

  printf '%-36s ' "$slug"
  du -h "$SERVED/$slug.png" "$SERVED/$slug.webp" "$SERVED/$slug-600w.webp" \
    | awk '{printf "%s %s  ", $1, substr($2, match($2, /[^\/]*$/))}'
  echo
}

if [ "${1:-}" = "--all" ]; then
  found=0
  for master in "$MASTERS"/*.png; do
    [ -e "$master" ] || continue
    slug="$(basename "$master" .png)"
    # Rejected candidates are kept next to the chosen ones so a swap is one
    # rename, but they are not served.
    case "$slug" in *-alt-*) continue ;; esac
    build_one "$slug"
    found=$((found + 1))
  done
  [ "$found" -gt 0 ] || { echo "no masters in $MASTERS" >&2; exit 1; }
elif [ -n "${1:-}" ]; then
  build_one "$1"
else
  sed -n '2,20p' "$0"
  exit 2
fi
