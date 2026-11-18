#!/usr/bin/env python3
"""Report corpus backfill debt: notes missing transcripts or descriptions.

Per-video YouTube fetches (transcripts, descriptions) fail on CI runners —
YouTube blocks datacenter IPs, so notes created by the nightly ingest land
with `transcript_status: unavailable` and no description. That debt is
invisible unless something counts it, so this does.

Run locally (residential IP) to see what needs a backfill pass:
    python3 99_Meta/scripts/corpus_health.py

Exit 0 always (a report, not a gate); use --strict to exit 1 on any debt.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# A note is a stub if its summary matches the ingest's template phrasing, or
# if it still carries the generator's untouched "Why it matters" bullets. The
# second is the structural test and catches 40 notes the phrasing misses.
BOILER_MARKERS = (
    "...", "Key angle:", "shares a practical take",
    "A practical talk on", "Speaker info:",
)
BOILER_BODY = "Useful as raw material for theme synthesis"


def is_stub(text: str) -> bool:
    """True when the ingest's template still shows through a note."""
    m = re.search(r'^summary: "(.*)"$', text, re.M)
    if m and any(p in m.group(1) for p in BOILER_MARKERS):
        return True
    return BOILER_BODY in text


def enrichment_verdict(enriched: int, floor: int) -> tuple[bool, str]:
    """Judge the enriched count against the recorded floor.

    The ratchet only ever looks at the count, never the share: the ingest
    adds stub notes most nights, so a share gate would fail on every corpus
    pull request until somebody silenced it. An enriched note becoming
    un-enriched is the thing that never happens by itself.
    """
    if enriched < floor:
        return False, f"enriched notes fell from {floor} to {enriched}"
    if enriched > floor:
        return True, f"enriched notes rose {floor} -> {enriched}; raise the floor"
    return True, f"enriched notes holding at {floor}"


def main() -> None:
    strict = "--strict" in sys.argv

    have_desc: set[str] = set()
    desc_file = ROOT / "99_Meta" / "video-descriptions.jsonl"
    if desc_file.exists():
        for line in desc_file.read_text().splitlines():
            try:
                have_desc.add(json.loads(line)["id"])
            except (json.JSONDecodeError, KeyError):
                continue

    tdir = ROOT / "99_Meta" / "transcripts"
    have_tx: set[str] = set()
    for sub in ("plain", "raw"):
        d = tdir / sub
        if d.is_dir():
            for p in d.iterdir():
                m = re.search(r"([A-Za-z0-9_-]{11})", p.stem)
                if m:
                    have_tx.add(m.group(1))

    notes = sorted((ROOT / "01_Videos").glob("*.md"))
    no_tx, no_desc, flagged = [], [], []
    by_id: dict[str, list[str]] = {}
    for n in notes:
        m = re.match(r"(\d+)-([A-Za-z0-9_-]{11})-", n.name)
        if not m:
            continue
        vid = m.group(2)
        by_id.setdefault(vid, []).append(n.name)
        if vid not in have_tx:
            no_tx.append(n.name)
        if vid not in have_desc:
            no_desc.append(n.name)
        head = n.read_text()[:800]
        if 'transcript_status: "unavailable"' in head:
            flagged.append(n.name)

    # Summary-quality debt. The ingest script emits a template note; a note is
    # "enriched" only once nothing of that template survives. Detecting on
    # just one or two markers undercounts — an earlier pass used only "..."
    # and "Key angle:" and reported three notes as done that were not.
    #
    # The summary markers below made the same mistake one level up. They
    # matched 1,186 notes and missed 40 more whose summaries use a second
    # template ("X argues that <title> is really about …") that trips none of
    # them. Those notes still carry the generator's untouched "Why it matters"
    # bullets, so the body marker catches them: it is the structural signal,
    # where the summary markers are a phrasebook that a new template escapes.
    # Measured 2026-11-18: 1,186 by summary alone, 1,226 by either.
    boilerplate = [n.name for n in notes if is_stub(n.read_text())]
    enriched = len(notes) - len(boilerplate)

    dupes = {vid: names for vid, names in by_id.items() if len(names) > 1}

    print(f"corpus notes:            {len(notes)}")
    print(f"duplicate video ids:     {len(dupes)}")
    print(f"missing transcript file: {len(no_tx)}")
    print(f"status=unavailable:      {len(flagged)}")
    print(f"missing description:     {len(no_desc)}")
    share = enriched / len(notes) if notes else 0.0
    print(f"boilerplate summaries:   {len(boilerplate)}")
    print(f"enriched notes:          {enriched}  ({share:.1%} of the corpus)")
    for label, items in (("transcript", no_tx), ("description", no_desc)):
        for name in items[:10]:
            print(f"  no {label}: {name[:70]}")
        if len(items) > 10:
            print(f"  … and {len(items) - 10} more")

    if not (no_tx or no_desc):
        print("\nPASS — no backfill debt.")
    else:
        print("\nBackfill locally:\n"
              "  python3 99_Meta/scripts/fetch_video_descriptions.py\n"
              "  python3 99_Meta/scripts/build_shared_artifacts.py\n"
              "  # transcripts: re-run the ingest script, or Whisper for caption-less videos")

    # Duplicates fail the run whether or not --strict was passed, unlike the
    # backfill debt above. Debt is an expected CI condition: YouTube blocks the
    # runners, so a nightly ingest lands notes with no transcript and the report
    # just has to state it. Two notes for one talk is never expected and never
    # self-heals — it means two ingests numbered the same video differently, so
    # the corpus now double-counts it in every theme tally and the synthesis
    # pack. A warning would scroll past.
    #
    # On 2026-11-14 the retry loop produced three such pairs (1543/1538,
    # 1547/1542, 1558/1543) because it globs 01_Videos on whatever is checked
    # out: with a corpus PR's notes absent from disk, those talks looked
    # missing and were fetched again. update_ai_engineer_channel.py numbers a
    # new note `max(playlist_index on disk) + offset`, so the second copy drew
    # a LOWER number than the first. It cost ten caption fetches against a rate
    # limit that takes days to recover, and nothing caught it — it surfaced as
    # a merge conflict, by luck.
    if dupes:
        print(f"\nFAIL — {len(dupes)} video id(s) have more than one note:")
        for vid, names in sorted(dupes.items()):
            print(f"  {vid}")
            for name in sorted(names):
                print(f"    {name}")
        print("\nKeep whichever note the rest of the corpus already references, and delete the\n"
              "other. Check what points where before deciding:\n"
              "  grep -rl '<video id>' 02_Themes 05_Book_Ideas claims claims-2 evidence\n"
              "In the 2026-11-14 race the stale copy was the LOWER-numbered one, but that\n"
              "follows from how it arose, not from a rule. Read, do not infer.")
        raise SystemExit(1)

    # The enrichment ratchet.
    #
    # 243 of 1,469 notes carry real analysis; the rest are the ingest's
    # template. That ratio is a scope decision nobody has taken yet (#114),
    # and it is not what this gate is for.
    #
    # Gating the SHARE would be useless: the ingest adds stub notes most
    # nights, so the share falls on its own and the gate would fail on every
    # corpus PR until someone silenced it. Gating the COUNT is the real
    # invariant — an enriched note must never quietly become un-enriched. A
    # reformat, a bad merge or a re-run of the generator over existing notes
    # would do exactly that, and nothing would otherwise notice.
    #
    # So: new stubs are free, lost analysis is not.
    floor_file = ROOT / "99_Meta" / "corpus-quality.json"
    if floor_file.exists():
        recorded = int(json.loads(floor_file.read_text()).get("enriched_floor", 0))
        ok, reason = enrichment_verdict(enriched, recorded)
        if not ok:
            print(
                f"\nFAIL — {reason}.\n"
                "Analysis that existed has been lost, which no ingest does on its own.\n"
                "Find what dropped before touching the floor:\n"
                "  git diff --stat HEAD~1 -- 01_Videos/\n"
                f"If the loss is intended, lower enriched_floor in {floor_file.name}\n"
                "in the same commit, so the decision is on the record."
            )
            raise SystemExit(1)
        if enriched > recorded:
            print(f"\nNOTE — {reason} in {floor_file.name}.")

    if strict and (no_tx or no_desc):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
