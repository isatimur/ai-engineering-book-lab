#!/usr/bin/env bash
# Set the series type onto a text-free cover plate.
#
# Why this exists: every text defect in the covers so far came from asking an
# image model to spell. One cover printed "and" where the title has "&";
# another set the subtitle in a weight the other two books do not use. A model
# draws; it does not typeset. So the model now draws a plate with no lettering
# on it, and this script prints the words — from the repo's own title and
# subtitle constants, in one grid, for all three books.
#
# Two things fall out of that split:
#   * a retitle is a rerun of this script, not a regenerated image;
#   * the three covers cannot drift apart typographically, because they are
#     set by the same code with the same measurements.
#
# Usage:
#   scripts/compose-cover.sh --art plate.png --out cover.png \
#     --title "The Shape of the Work" \
#     --subtitle "When Writing the Code Stops Being the Constraint"
#
# Optional: --author, --ink, --sub-ink, --rule, --title-size, --sub-size.
#
# Requires: magick (ImageMagick 7).

set -euo pipefail

MASTER_W=1696
MASTER_H=2528

DIDOT="/System/Library/Fonts/Supplemental/Didot.ttc"
SANS="Avenir-Light"

# The type grid, in master pixels. Every cover in the series uses these, which
# is the whole point: consistency by construction rather than by eye.
TITLE_TOP=230       # top of the title block
TITLE_WIDTH=1380    # wrap width; caption: breaks lines inside it
SUB_GAP=70          # space between title block and subtitle
SUB_WIDTH=1180
SUB_KERNING=11      # letterspacing for the small caps line
RULE_Y=2214         # the hairline above the byline
RULE_WIDTH=460
BYLINE_BASE=2330    # top of the byline block

ART="" OUT="" TITLE="" SUBTITLE=""
AUTHOR="Timur Isachenko"
INK="#15100b"
SUB_INK="#5c5143"
RULE="#b08d4f"
TITLE_SIZE=150
SUB_SIZE=40

die() { echo "compose-cover: $*" >&2; exit 1; }

while [ $# -gt 0 ]; do
  case "$1" in
    --art)        ART="$2"; shift 2 ;;
    --out)        OUT="$2"; shift 2 ;;
    --title)      TITLE="$2"; shift 2 ;;
    --subtitle)   SUBTITLE="$2"; shift 2 ;;
    --author)     AUTHOR="$2"; shift 2 ;;
    --ink)        INK="$2"; shift 2 ;;
    --sub-ink)    SUB_INK="$2"; shift 2 ;;
    --rule)       RULE="$2"; shift 2 ;;
    --title-size) TITLE_SIZE="$2"; shift 2 ;;
    --sub-size)   SUB_SIZE="$2"; shift 2 ;;
    -h|--help)    sed -n '2,24p' "$0"; exit 0 ;;
    *)            die "unknown option: $1" ;;
  esac
done

[ -n "$ART" ] && [ -f "$ART" ] || die "--art must name an existing plate"
[ -n "$OUT" ] || die "--out is required"
[ -n "$TITLE" ] || die "--title is required"
[ -n "$SUBTITLE" ] || die "--subtitle is required"
command -v magick >/dev/null || die "magick is required (brew install imagemagick)"
[ -f "$DIDOT" ] || die "Didot is missing at $DIDOT"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# The subtitle is set in caps. Doing the uppercasing here rather than in the
# data file keeps the constants readable as prose on the website.
SUBTITLE_CAPS="$(printf '%s' "$SUBTITLE" | tr '[:lower:]' '[:upper:]')"

# 1. The plate, normalised to the master size. -resize ^ then -extent covers
#    the frame whatever aspect the model returned, rather than squashing it.
magick "$ART" -resize "${MASTER_W}x${MASTER_H}^" -gravity center \
  -extent "${MASTER_W}x${MASTER_H}" "$TMP/base.png"

# 2. Title and subtitle as transparent layers. caption: wraps to the width,
#    so a long title becomes two lines without the caller measuring anything.
magick -background none -fill "$INK" -font "$DIDOT" -pointsize "$TITLE_SIZE" \
  -size "${TITLE_WIDTH}x" -gravity center caption:"$TITLE" "$TMP/title.png"

magick -background none -fill "$SUB_INK" -font "$SANS" -pointsize "$SUB_SIZE" \
  -kerning "$SUB_KERNING" -interline-spacing 18 \
  -size "${SUB_WIDTH}x" -gravity center caption:"$SUBTITLE_CAPS" "$TMP/sub.png"

magick -background none -fill "$INK" -font "$DIDOT" -pointsize 64 \
  -gravity center label:"$AUTHOR" "$TMP/byline.png"

TITLE_H="$(magick identify -format '%h' "$TMP/title.png")"
SUB_Y=$((TITLE_TOP + TITLE_H + SUB_GAP))

# 3. Stack them onto the plate, then draw the hairline between art and byline.
RULE_X1=$(( (MASTER_W - RULE_WIDTH) / 2 ))
RULE_X2=$(( RULE_X1 + RULE_WIDTH ))

magick "$TMP/base.png" \
  "$TMP/title.png"  -gravity north -geometry "+0+${TITLE_TOP}" -composite \
  "$TMP/sub.png"    -gravity north -geometry "+0+${SUB_Y}"     -composite \
  -stroke "$RULE" -strokewidth 2 \
  -draw "line $RULE_X1,$RULE_Y $RULE_X2,$RULE_Y" -stroke none \
  "$TMP/byline.png" -gravity north -geometry "+0+${BYLINE_BASE}" -composite \
  -strip -define png:exclude-chunk=time,date "$OUT"

# 4. Say what was produced, so a caller that batches covers can see each one
#    land without opening it.
printf '%-46s %s  title %spt, subtitle %spt\n' \
  "$(basename "$OUT")" "$(magick identify -format '%wx%h' "$OUT")" \
  "$TITLE_SIZE" "$SUB_SIZE"
