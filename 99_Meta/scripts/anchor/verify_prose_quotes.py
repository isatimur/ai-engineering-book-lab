#!/usr/bin/env python3
"""Check that quoted spans in chapter prose appear verbatim in some transcript.

The ledger's anchors are verified by verify_ledger.py. Chapter prose is the
other surface that makes the same promise: text inside quote marks claims a
speaker said exactly that. Nothing checked it. This is the failure mode the
project's own launch copy describes — "a paraphrase that had drifted into quote
marks during editing".

Method: pull quoted spans of >=4 words from each chapter, then search every
local plain transcript for a normalised match. A span that matches nowhere is
either drifted, a quote from outside the corpus (a book, a paper), or the
book quoting itself — all of which need a human look, which is why misses are
reported rather than failed on.

LIMITS — read before treating output as a defect list. This flags CANDIDATES,
never verdicts, because a chapter may legitimately differ from a transcript:

  * The transcript is ASR output, not ground truth. Ch8 quotes "voice-to-voice
    response chain" where the transcript reads "voicetooice uh response chain".
    The book is *more* accurate than the source it is checked against.
  * Books rightly drop disfluencies and ASR stutters ("running type type
    checking to get get basically") — handled by subsequence matching.
  * Not every quoted span is a speaker quote. Chapters use quote marks for the
    author's own rhetorical questions and for invented illustrative dialogue.

MUST RUN LOCALLY (transcripts are gitignored).

    python3 99_Meta/scripts/anchor/verify_prose_quotes.py
    python3 99_Meta/scripts/anchor/verify_prose_quotes.py --glob 'public/drafting-2/*.md'
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

_REPO = Path(__file__).resolve().parents[3]
_PLAIN = _REPO / "99_Meta" / "transcripts" / "plain"


def subseq_match(quote_tokens: list[str], body_tokens: list[str], max_gap: int = 3) -> bool:
    """True if the quote's words appear in order, tolerating small insertions.

    Books legitimately clean ASR artefacts from quotes: the transcript may read
    "running type type checking to get get basically mark its own homework"
    while the chapter prints it once. Exact substring matching calls that a
    mismatch; it is not one. Requiring the words in order with a bounded gap
    still catches genuine drift (reordered, substituted or invented wording)
    while allowing stutters and filler to be dropped.
    """
    if not quote_tokens:
        return False
    first = quote_tokens[0]
    starts = [i for i, w in enumerate(body_tokens) if w == first]
    for st in starts:
        qi, bi, ok = 0, st, True
        while qi < len(quote_tokens):
            gap = 0
            while bi < len(body_tokens) and body_tokens[bi] != quote_tokens[qi]:
                bi += 1
                gap += 1
                if gap > max_gap:
                    ok = False
                    break
            if not ok or bi >= len(body_tokens):
                ok = False
                break
            qi += 1
            bi += 1
        if ok:
            return True
    return False


def norm(t: str) -> str:
    t = (t.replace("’", "'").replace("‘", "'")
          .replace("“", '"').replace("”", '"')
          .replace("—", " ").replace("–", " ").replace("-", " "))
    return re.sub(r"[^a-z0-9' ]+", " ", re.sub(r"\s+", " ", t).lower()).strip()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--glob", default="public/drafting/Chapter *.md")
    ap.add_argument("--min-words", type=int, default=4)
    args = ap.parse_args()

    print("[prose] loading transcripts…", flush=True)
    corpus = {p.stem: norm(p.read_text(errors="ignore")) for p in _PLAIN.iterdir() if p.is_file()}
    corpus_tokens = {k: v.split() for k, v in corpus.items()}
    print(f"[prose] {len(corpus)} transcripts loaded")

    hits = misses = 0
    unmatched: list[tuple[str, str]] = []
    skipped: list[tuple[str, str]] = []
    for f in sorted(_REPO.glob(args.glob)):
        text = f.read_text()
        spans = [q for q in re.findall(r'[“"]([^”"]{20,300})[”"]', text)
                 if len(q.split()) >= args.min_words]
        for q in spans:
            # Elided quotes ("A ... B") can never match verbatim as one span.
            # Split on the ellipsis and require every fragment of >=4 words to
            # appear in the SAME transcript — that is what the elision claims.
            frags = [x.strip() for x in re.split(r"\s*(?:\.\.\.|…)\s*", q)]
            frags = [x for x in frags if len(x.split()) >= 4]
            if not frags:
                skipped.append((f.name, q))   # too short / all elision
                continue
            nfr = [norm(x) for x in frags]
            matched = any(all(fr in body for fr in nfr) for body in corpus.values())
            if not matched:
                toks = [fr.split() for fr in nfr]
                matched = any(
                    all(subseq_match(t, btoks) for t in toks)
                    for btoks in corpus_tokens.values()
                )
            if matched:
                hits += 1
            else:
                misses += 1
                unmatched.append((f.name, q))

    print(f"[prose] verbatim in a transcript: {hits}/{hits+misses}")
    if skipped:
        print(f"[prose] {len(skipped)} span(s) too short after elision to check")
    if unmatched:
        print(f"\nUNMATCHED ({len(unmatched)}) — drifted, external, or self-quotation:")
        for name, q in unmatched:
            print(f"  {name[:34]:36} {q[:90]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
