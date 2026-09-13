#!/usr/bin/env python3
"""Find quotes the ledger dropped that the chapters still print.

An audit removes a source because the talk does not evidence the claim. The
ledger gets cleaner; the book does not. Nothing connected the two, so a quote
could be deleted from the evidence base on Tuesday and still be sitting in a
published chapter on Wednesday, doing the work the audit just decided it could
not do.

That is not hypothetical. The 2026-09-09 book 2 audit dropped six sources, and
twelve of the removed quotes were still in the chapters. Ten were fine — the
quote is verbatim and the prose frames it honestly, as a project self-description
or a stated goal. Two were not: chapter 3 attributed a code-first rationale to a
lab that never stated it, and chapter 4 used a conference pleasantry to carry a
composition thesis its talk never argues.

So a hit is a CANDIDATE, at roughly one-in-six precision. Read the prose around
it. The question is never "is this quote real" — verify_prose_quotes.py answers
that — but "is the prose still leaning on it for something the audit removed it
for."

A broader check was measured and rejected: 73% of book 2's prose quotes match no
ledger anchor at all, because chapters legitimately quote beyond the ledger.
That signal is too noisy to act on. This one is tied to an actual removal, which
is what makes it precise.

    python3 99_Meta/scripts/anchor/check_dropped_quotes_in_prose.py --since HEAD~20
    python3 99_Meta/scripts/anchor/check_dropped_quotes_in_prose.py --since <rev> --book 2
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]

BOOKS = {
    "1": ("claims/Claims Ledger.md", ["website/src/content/chapter-*.md"]),
    "2": ("claims-2/Claims Ledger.md", ["website/src/content-2/chapter-*.md"]),
}
QUOTE_LINE = re.compile(r'\*\*Quote:\*\*\s*"(.+?)"\s*$', re.M)
# Same span shape verify_prose_quotes.py uses, so the two agree on what a quote is.
PROSE_SPAN = re.compile(r'[“"]([^”"]{20,300})[”"]')
MIN_PROBE_WORDS = 6


def norm(text: str) -> str:
    t = text.replace("’", "'").replace("‘", "'")
    t = t.replace("“", '"').replace("”", '"').replace("—", "-")
    return re.sub(r"\s+", " ", t).strip().lower()


def ledger_at(rev: str, path: str) -> set[str] | None:
    """Quotes in a ledger at a revision, or None when the file is absent there."""
    try:
        text = subprocess.run(["git", "show", f"{rev}:{path}"], cwd=REPO,
                              capture_output=True, text=True, check=True).stdout
    except subprocess.CalledProcessError:
        return None
    return set(QUOTE_LINE.findall(text))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", required=True,
                    help="revision to compare against (the state before the audit)")
    ap.add_argument("--book", choices=sorted(BOOKS), help="default: both")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any hit")
    args = ap.parse_args()

    total = 0
    for book in ([args.book] if args.book else sorted(BOOKS)):
        ledger, globs = BOOKS[book]
        before = ledger_at(args.since, ledger)
        if before is None:
            print(f"book {book}: no ledger at {args.since} — skipped\n")
            continue
        now = ledger_at("HEAD", ledger) or set()
        dropped = sorted(before - now)

        chapters = [p for g in globs for p in sorted(REPO.glob(g))]
        bodies = {p: norm(p.read_text()) for p in chapters}

        hits = []
        for quote in dropped:
            words = norm(quote).split()
            if len(words) < MIN_PROBE_WORDS:
                continue
            # A leading slice survives light editing better than the whole span,
            # which chapters routinely trim at the tail.
            probe = " ".join(words[:9])
            for path, body in bodies.items():
                if probe in body:
                    hits.append((path.name, quote))
                    break

        print(f"book {book}: {len(dropped)} quote(s) removed from the ledger since "
              f"{args.since}; {len(hits)} still in prose")
        for name, quote in hits:
            print(f"  {name}\n    {quote[:150]}")
        print()
        total += len(hits)

    if total:
        print("Read the prose around each. The quote is probably still verbatim — the\n"
              "question is whether the passage still leans on it for the thing the audit\n"
              "removed it for.")
    return 1 if (total and args.strict) else 0


if __name__ == "__main__":
    sys.exit(main())
