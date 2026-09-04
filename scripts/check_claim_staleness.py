#!/usr/bin/env python3
"""Which ledger claims rest only on older evidence while newer talks cover the topic?

The book is a living document: the corpus keeps growing, and a claim anchored to
April-era talks may since have been strengthened, complicated, narrowed - or
outdated - by material the ledger has never seen. Nothing checked that.

Method, all local and deterministic:
  * read each ledger entry's cited source indices (`#206 — Joel Hron, ...`);
  * treat playlist index as a recency proxy. Notes up to #599 carry an April
    `ingested_at`; #600+ arrived later and mostly lack the field, so the index -
    not the frontmatter - is the usable signal;
  * for entries citing NOTHING newer than the threshold, score every newer talk
    against the claim by IDF-weighted overlap on title + summary;
  * report the closest newer talks, so a human can classify the delta with
    docs/ONGOING_SYNC_AND_JUDGING.md's own rubric:
    strengthens | complicates | narrows | no meaningful impact.

This ranks CANDIDATES for review. A high score means "same vocabulary", which is
where an update would live - not that the claim is wrong. Topic overlap is not
contradiction, and only reading the talk can tell them apart.

    python3 scripts/check_claim_staleness.py
    python3 scripts/check_claim_staleness.py --since 800 --top 3
"""
from __future__ import annotations

import argparse
import math
import re
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO / "scripts"))
from mash_agent.cli import _corpus_config, _ensure_deps_on_path  # noqa: E402

_ensure_deps_on_path()
from book_mash.corpus.claims_index import load_claims_index  # noqa: E402

_TOKEN = re.compile(r"[a-z0-9]+")
_STOP = frozenset("""a an the and or but if then else of to in on at by for with without from
into over under again further is are was were be been being do does did doing have has had
having this that these those it its they them their there here what which who whom how when
where why all any both each few more most other some such no nor not only own same so than
too very can will just as we you your our i me my he she his her him about up down out off
above below between through ai llm llms model models using use used talk""".split())


def toks(t: str) -> list[str]:
    return [x for x in _TOKEN.findall(t.lower()) if x not in _STOP and len(x) > 2]


ap = argparse.ArgumentParser()
ap.add_argument("--since", type=int, default=600,
                help="playlist index at which 'newer' begins (default 600)")
ap.add_argument("--top", type=int, default=3, help="newer talks to show per claim")
ap.add_argument("--min-score", type=float, default=6.0)
a = ap.parse_args()

# newer talks: index, title, summary
newer = []
for p in (REPO / "01_Videos").glob("*.md"):
    m = re.match(r"^(\d+)-", p.name)
    if not m or int(m.group(1)) < a.since:
        continue
    head = p.read_text(errors="ignore")[:1400]
    title = re.search(r'title: "(.*?)"', head)
    summ = re.search(r'summary: "(.*?)"', head, re.S)
    newer.append((int(m.group(1)),
                  title.group(1) if title else p.stem,
                  (summ.group(1) if summ else "")))
if not newer:
    sys.exit(f"no notes at or above #{a.since}")

docs = [toks(t + " " + s) for _, t, s in newer]
df = Counter()
for d in docs:
    df.update(set(d))
idf = {w: math.log((len(docs) + 1) / (c + 1)) + 1.0 for w, c in df.items()}

claims = load_claims_index(_corpus_config()["claims_dir"])
raw = (REPO / "claims" / "Claims Ledger.md").read_text()
cited: dict[str, list[int]] = {}
for i, blk in enumerate(re.split(r"\n## (\d+)\) ", raw)):
    pass
parts = re.split(r"\n## (\d+)\) ", raw)
for i in range(1, len(parts), 2):
    cited[f"claims#{parts[i]}"] = sorted({int(x) for x in re.findall(r"#(\d+) —", parts[i + 1])})

stale = [c for c in claims if cited.get(c.id) and max(cited[c.id]) < a.since]
print(f"{len(claims)} claims · {len(newer)} talks at #{a.since}+ · "
      f"{len(stale)} claims cite nothing newer\n")

out = []
for c in stale:
    q = set(toks(c.retrieval_text()))
    scored = sorted(
        ((sum(idf.get(w, 1.0) for w in q & set(d)), n, t)
         for d, (n, t, _) in zip(docs, newer)),
        key=lambda x: -x[0])
    hits = [h for h in scored[: a.top] if h[0] >= a.min_score]
    if hits:
        out.append((hits[0][0], c, cited[c.id], hits))

for _, c, src, hits in sorted(out, key=lambda x: -x[0]):
    print(f"{c.id}  (cites {src})")
    print(f"  {c.retrieval_text().splitlines()[0][:96]}")
    for sc, n, t in hits:
        print(f"    [{sc:5.1f}] #{n} {t[:88]}")
    print()
print(f"{len(out)} claim(s) with newer same-topic material — review, not verdicts")
