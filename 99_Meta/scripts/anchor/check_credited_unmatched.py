#!/usr/bin/env python3
"""Quotes credited to a named person that appear in no transcript we hold.

verify_prose_quotes.py counts unmatched spans and a ceiling catches ADDITIONS.
It cannot catch a SWAP: replace one unmatched span with another and the count
is unchanged, so the ceiling passes. That matters because the unmatched set is
mostly harmless — the book's own rhetorical questions and illustrative dialogue
are unmatched by nature — while the dangerous case is narrow and specific:

    a quoted span the prose CREDITS TO A NAMED PERSON, which appears in no
    transcript in the corpus.

That is words in someone's mouth with nothing behind them. It is the shape of
every attribution defect this project has found: a framing credited to Samuel
Colvin that his talk disclaims (book 1 ch4, 2026-09-14), a cautionary thesis
put on Jeff Schomay whose talk is a success story, and a four-rung ladder
credited to Kyle Corbitt whose talk names none of it (book 2, 2026-09-17).

This composes the two existing checks rather than reimplementing either: it
runs verify_prose_quotes.py --json to get THAT script's span set, and applies
check_quote_speakers.py's attribution patterns to it. An earlier ad-hoc version
re-derived both and silently disagreed with the real gate in both directions —
it missed a credited span in book 1 and invented three in book 2.

    python3 99_Meta/scripts/anchor/check_credited_unmatched.py --strict
    python3 99_Meta/scripts/anchor/check_credited_unmatched.py \
        --glob 'public/drafting-2/*.md' --strict
"""
import argparse
import glob as _glob
import json
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_quote_speakers import credited_names  # noqa: E402

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]

# Spans that are credited and unmatched but have been read against the tape and
# cleared. Each entry records WHY, so it stays auditable and a future reader can
# re-check it. Keyed by a distinctive prefix of the quote.
#
# Both current entries are the same cause: the quote is correct in the book and
# WRONG IN THE TRANSCRIPT. The ASR rendered "GPT-4" as "gpd 4" and "big labs" as
# "big laps", so a verbatim match is impossible until the transcript is fixed.
CLEARED: dict[str, str] = {
    "the first open source model to catch up and surpass GPT-4":
        "wJwTlvb_TSo (Eugene Cheah) — in tape as 'surpass gpd 4'; ASR error, "
        "book is correct. Read 2026-09-18.",
    "you do not need a billion dollars to compete with the big labs":
        "wJwTlvb_TSo (Eugene Cheah) — in tape as 'compete with the big laps'; "
        "ASR error, book is correct. Read 2026-09-18.",
}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--glob", default="public/drafting/Chapter *.md")
    ap.add_argument("--strict", action="store_true",
                    help="exit 1 if any credited span is unmatched and not cleared")
    a = ap.parse_args()

    with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as tf:
        spans_path = tf.name
    proc = subprocess.run(
        [sys.executable, str(HERE / "verify_prose_quotes.py"),
         "--glob", a.glob, "--json", spans_path],
        cwd=REPO, capture_output=True, text=True,
    )
    if proc.returncode != 0:
        print(proc.stdout[-2000:])
        print(proc.stderr[-2000:])
        print("verify_prose_quotes.py failed; cannot judge attribution without "
              "its span set")
        return 1

    spans = json.loads(Path(spans_path).read_text())
    files = {Path(p).name: Path(p).read_text(encoding="utf-8")
             for p in _glob.glob(str(REPO / a.glob))}

    flagged, cleared, unlocatable = [], 0, 0
    for sp in spans:
        text = files.get(sp["file"], "")
        i = text.find(sp["quote"][:60])
        if i < 0:
            # A span the gate found but we cannot relocate is not evidence of
            # innocence. Say so rather than counting it as clean.
            unlocatable += 1
            continue
        lead = text[max(0, i - 220):i]
        tail = text[i + len(sp["quote"]):i + len(sp["quote"]) + 130]
        names = credited_names(lead, tail)
        if not names:
            continue
        reason = next((r for k, r in CLEARED.items() if sp["quote"].startswith(k)), None)
        if reason:
            cleared += 1
            continue
        flagged.append((sp["file"], names[-2:], sp["quote"]))

    for f, names, q in flagged:
        print(f"  {f}\n    credited to : {names}\n    quote       : {q[:150]}\n"
              f"    and appears in NO transcript\n")

    print(f"{len(spans)} unmatched span(s) · {len(flagged)} credited and uncleared "
          f"· {cleared} cleared by name · {unlocatable} unlocatable")
    if unlocatable:
        print("WARNING: some spans could not be relocated in their file, so their "
              "attribution was never checked.")
    return 1 if (flagged and a.strict) else 0


if __name__ == "__main__":
    sys.exit(main())
