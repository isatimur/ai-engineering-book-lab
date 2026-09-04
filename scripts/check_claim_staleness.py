#!/usr/bin/env python3
"""Which ledger claims rest only on older evidence while newer talks cover the topic?

The book is a living document: the corpus keeps growing, and a claim anchored to
April-era talks may since have been strengthened, complicated, narrowed - or
outdated - by material the ledger has never seen. Nothing checked that.

Method, all local and deterministic:
  * read each ledger entry's cited source indices (`#206 — Joel Hron, ...`);
  * date every note by when it was ADDED TO GIT, in one `git log --diff-filter=A`
    pass. The corpus carries no publication date, and playlist index is NOT a
    recency proxy: #621 (Matt Pocock workshop) says on tape "this is what my
    keynote is on tomorrow", and that keynote is #1 - so a 621 precedes a 1. Git
    dates get this right (#621 2026-05-25, #1 2026-06-04) and disagree with index
    order on 32 of 1073 adjacent pairs;
  * compare each claim against its OWN newest cited source, not a global cutoff,
    so "newer" means newer than that claim's evidence rather than newer than an
    arbitrary line;
  * for entries citing NOTHING newer than the threshold, score every newer talk
    against the claim by IDF-weighted overlap on title + summary;
  * report the closest newer talks, so a human can classify the delta with
    docs/ONGOING_SYNC_AND_JUDGING.md's own rubric:
    strengthens | complicates | narrows | no meaningful impact.

This ranks CANDIDATES for review. A high score means "same vocabulary", which is
where an update would live - not that the claim is wrong. Topic overlap is not
contradiction, and only reading the talk can tell them apart.

    python3 scripts/check_claim_staleness.py
    python3 scripts/check_claim_staleness.py --top 3 --min-score 10
"""
from __future__ import annotations

import argparse
import math
import subprocess
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
ap.add_argument("--after", default=None,
                help="only consider talks added after this ISO date "
                     "(default: per-claim, its own newest cited source)")
ap.add_argument("--top", type=int, default=3, help="newer talks to show per claim")
ap.add_argument("--min-score", type=float, default=6.0)
a = ap.parse_args()

def git_added() -> dict[int, str]:
    """Playlist index -> date the note first appeared in git.

    The only recency signal this corpus actually has. No note carries a
    publication date, and index order is wrong often enough to matter.
    """
    out = subprocess.run(
        ["git", "log", "--diff-filter=A", "--date=short", "--format=@%ad",
         "--name-only", "--", "01_Videos/"],
        capture_output=True, text=True, cwd=REPO).stdout
    date, m = None, {}
    for ln in out.split("\n"):
        if ln.startswith("@"):
            date = ln[1:]
        elif ln.startswith("01_Videos/"):
            k = re.match(r"01_Videos/(\d+)-", ln)
            if k and date:
                m.setdefault(int(k.group(1)), date)   # first add wins
    return m


ADDED = git_added()

# every talk, with the date it entered the corpus
newer = []
for p in (REPO / "01_Videos").glob("*.md"):
    m = re.match(r"^(\d+)-", p.name)
    if not m:
        continue
    head = p.read_text(errors="ignore")[:1400]
    title = re.search(r'title: "(.*?)"', head)
    summ = re.search(r'summary: "(.*?)"', head, re.S)
    newer.append((int(m.group(1)),
                  title.group(1) if title else p.stem,
                  (summ.group(1) if summ else "")))
newer.sort()
if not newer:
    sys.exit("no notes found")

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

def evidence_date(claim_id: str) -> str | None:
    """When this claim's NEWEST cited source entered the corpus."""
    ds = [ADDED[i] for i in cited.get(claim_id, []) if i in ADDED]
    return max(ds) if ds else None


print(f"{len(claims)} claims · {len(newer)} talks · "
      f"corpus spans {min(ADDED.values())} … {max(ADDED.values())}\n")

out = []
for c in claims:
    cutoff = a.after or evidence_date(c.id)
    if not cutoff:
        continue
    q = set(toks(c.retrieval_text()))
    scored = sorted(
        ((sum(idf.get(w, 1.0) for w in q & set(d)), n, t)
         for d, (n, t, _) in zip(docs, newer)
         if ADDED.get(n, "0000-00-00") > cutoff),
        key=lambda x: -x[0])
    hits = [h for h in scored[: a.top] if h[0] >= a.min_score]
    if hits:
        out.append((hits[0][0], c, cutoff, hits))

for _, c, cutoff, hits in sorted(out, key=lambda x: -x[0]):
    print(f"{c.id}  (newest cited evidence added {cutoff})")
    print(f"  {c.retrieval_text().splitlines()[0][:96]}")
    for sc, n, t in hits:
        print(f"    [{sc:5.1f}] {ADDED.get(n, '?')}  #{n} {t[:76]}")
    print()
print(f"{len(out)} claim(s) with later same-topic material — review, not verdicts")
