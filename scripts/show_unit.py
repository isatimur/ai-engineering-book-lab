#!/usr/bin/env python3
"""Resolve a judged unit_id back to its paragraph text and ranked ledger claims.

Used to hand-check every paragraph a judge flags as unsupported or overstated.
A flag is only a defect if the ledger really lacks backing, so each one gets
read against the ledger before it goes in a research pass.

Asserts the run's snapshot matches the corpus on disk. Resolving a unit ID
against a different snapshot than the run that produced it reads unrelated
text and manufactures findings - that mistake has been made here before.

    python3 scripts/show_unit.py --run agent-54c7-... --unit 'paragraph:chapter-4-...#L40-L40'
"""
import argparse, json, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from mash_agent.cli import _ensure_deps_on_path, _corpus_config  # noqa: E402
_ensure_deps_on_path()
from book_mash.corpus.claims_index import load_claims_index  # noqa: E402
from book_mash.corpus.claim_retrieval import score_claims  # noqa: E402
from book_mash.corpus.loader import load_chapters, compute_snapshot_hash  # noqa: E402

REPO = Path(__file__).resolve().parents[1]

ap = argparse.ArgumentParser()
ap.add_argument("--run", required=True)
ap.add_argument("--unit", required=True, action="append")
ap.add_argument("--claims", type=int, default=5)
a = ap.parse_args()

# Must go through _corpus_config(), which absolutises chapters_glob the same way
# book_mash.config does. compute_snapshot_hash folds file_path into the digest, so
# a relative glob over the SAME text yields a different snapshot hash than an
# absolute one - and every unit id would then resolve against nothing.
c = _corpus_config()
chapters = load_chapters(c["chapters_glob"], c.get("skip_sections", []))
snap = compute_snapshot_hash(chapters)

manifest = json.loads((REPO / ".mash-agent-runs" / a.run / "manifest.json").read_text())
if manifest["corpus_snapshot_hash"] != snap:
    sys.exit(f"REFUSING: run snapshot {manifest['corpus_snapshot_hash'][:16]} "
             f"!= corpus on disk {snap[:16]}. The text has changed since the run; "
             f"resolving unit ids against it would read the wrong paragraphs.")

paras = {p.id: p for ch in chapters for sec in ch.sections for p in sec.paragraphs}
claims = load_claims_index(c["claims_dir"])

for uid in a.unit:
    p = paras.get(uid)
    if p is None:
        print(f"\n=== {uid}\n  NOT FOUND in this snapshot")
        continue
    print(f"\n=== {uid}\n")
    print(p.text)
    print("\n--- top ledger claims by lexical overlap ---")
    for score, cl in score_claims(p.text, claims)[: a.claims]:
        print(f"  [{score:6.1f}] {cl.id}: {cl.retrieval_text().splitlines()[0][:150]}")
