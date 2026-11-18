#!/usr/bin/env bash
# Build every book cover from its committed text-free plate.
#
# The pipeline has three stages, and each one is reproducible from the stage
# before it:
#
#   diagrams/covers/plates/<slug>.png   the artwork, with no lettering on it
#          |  scripts/compose-cover.sh  + the titles in website/src/data/
#          v
#   diagrams/covers/<slug>.png          the master, type set in Didot
#          |  scripts/build-cover-derivatives.sh
#          v
#   website/public/covers/<slug>.*      what the pages actually load
#
# The split exists because a generative model draws well and spells badly.
# Every text defect these covers have had came from asking one to typeset: a
# title that printed "and" where the data says "&", a subtitle set in a weight
# the other two books do not use. So the model never sees the words now. This
# script reads them out of the same files the website renders from, which
# means the cover and the page cannot disagree, and a retitle is a rerun
# rather than another image to pay for and proofread.
#
# Usage:
#   scripts/build-covers.sh              # all three books
#   scripts/build-covers.sh the-shape-of-the-work
#
# Requires: magick (ImageMagick 7).

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLATES="$REPO/diagrams/covers/plates"
MASTERS="$REPO/diagrams/covers"
DATA="$REPO/website/src/data"

die() { echo "build-covers: $*" >&2; exit 1; }

# Pull a quoted string out of a TypeScript source file. The data files are the
# single source of truth for what is printed; grepping them is what keeps this
# script from holding a second, staler copy of the titles.
# The trailing quote in the pattern is load-bearing. Without it, `title:
# string;` in the Book type declaration matches before the real value does,
# and the cover prints the word "string".
ts_value() {
  local file="$1" key="$2" value
  value="$(grep -m1 -E "^[[:space:]]*(export const )?${key}[[:space:]]*[:=][[:space:]]*'" "$file" 2>/dev/null \
    | sed -E "s/^[^']*'//; s/'.*$//")"
  [ -n "$value" ] || die "could not read $key from $(basename "$file")"
  printf '%s' "$value"
}

BOOK_ONE_TITLE="$(ts_value "$DATA/book.ts" 'title')"
BOOK_ONE_SUBTITLE="$(ts_value "$DATA/book.ts" 'subtitle')"
BOOK_TWO_TITLE="$(ts_value "$DATA/bookChaptersTwo.ts" 'BOOK_TWO_TITLE')"
BOOK_TWO_SUBTITLE="$(ts_value "$DATA/bookChaptersTwo.ts" 'BOOK_TWO_SUBTITLE')"
BOOK_THREE_TITLE="$(ts_value "$DATA/bookChaptersThree.ts" 'BOOK_THREE_TITLE')"
BOOK_THREE_SUBTITLE="$(ts_value "$DATA/bookChaptersThree.ts" 'BOOK_THREE_SUBTITLE')"

# slug | title | subtitle | ink | subtitle ink | rule
# The three palettes differ only as much as the plates demand. The type grid
# behind them is identical, which is what holds the series together.
book_row() {
  case "$1" in
    from-copilot-to-colleague)
      printf '%s\t%s\t%s\t%s\t%s' \
        "$BOOK_ONE_TITLE" "$BOOK_ONE_SUBTITLE" "$COVER_INK" "$COVER_SUB_INK" "$COVER_RULE" ;;
    the-model-layer-and-the-long-tail)
      printf '%s\t%s\t%s\t%s\t%s' \
        "$BOOK_TWO_TITLE" "$BOOK_TWO_SUBTITLE" "$COVER_INK" "$COVER_SUB_INK" "$COVER_RULE" ;;
    the-shape-of-the-work)
      printf '%s\t%s\t%s\t%s\t%s' \
        "$BOOK_THREE_TITLE" "$BOOK_THREE_SUBTITLE" "$COVER_INK" "$COVER_SUB_INK" "$COVER_RULE" ;;
    *) die "unknown cover slug: $1" ;;
  esac
}

# One palette for the whole series, pitched to the aged paper the specimens
# are mounted on. Override per run with the environment if a plate ever needs
# it; the default is what the shipped covers use.
COVER_INK="${COVER_INK:-#241c12}"
COVER_SUB_INK="${COVER_SUB_INK:-#6b5c45}"
COVER_RULE="${COVER_RULE:-#8a6a3a}"

SLUGS=(from-copilot-to-colleague the-model-layer-and-the-long-tail the-shape-of-the-work)
[ $# -gt 0 ] && SLUGS=("$@")

[ -d "$PLATES" ] || die "no plates directory at $PLATES"

for slug in "${SLUGS[@]}"; do
  plate="$PLATES/$slug.png"
  [ -f "$plate" ] || die "no plate for $slug at $plate"
  IFS=$'\t' read -r title subtitle ink sub_ink rule <<<"$(book_row "$slug")"
  "$REPO/scripts/compose-cover.sh" \
    --art "$plate" --out "$MASTERS/$slug.png" \
    --title "$title" --subtitle "$subtitle" \
    --ink "$ink" --sub-ink "$sub_ink" --rule "$rule"
done

echo
echo "masters written. deriving what the site serves:"
# build-cover-derivatives.sh takes one slug per run, so name them one at a
# time rather than handing it a list it would silently ignore all but the
# first of.
for slug in "${SLUGS[@]}"; do
  "$REPO/scripts/build-cover-derivatives.sh" "$slug"
done
