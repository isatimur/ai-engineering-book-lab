# Removal on request — 2026-09-19 — Daniel Chalef

Daniel Chalef asked, via the author, to be removed from the book. This records what was done, what
was deliberately not done, and why — so the next evidence pass does not helpfully re-add him.

## What was removed

| surface | files | note |
|---|---|---|
| Book 1 prose, Chapter 5 | 1 source + 3 generated | paraphrase only, never a direct quotation |
| Claims ledger | 1 | two source blocks, from claims #10 and #26 |
| Published figure and concept page | 2 | he was a second credit on a shared caption |
| Frozen web version snapshots | 13 | see the caveat below |
| Corpus talk notes | 2 | his own two talks |
| Themes, concepts, outlines, packets, research pass | 14 | one wikilink each |
| Inventory and descriptions | 2 | ingest-generated |

Nothing needed re-sourcing. He was paraphrased, never quoted, so no sentence lost its evidence,
and both ledger claims stay **strong** with 4 and 6 remaining sources.

## Two things deliberately not done

**Another speaker's words stand.** `01_Videos/322-…-mark-bain-aius.md` contains "Daniel Chalef
from Graffiti and Zepai" inside Mark Bain's own transcript, where he introduces his guest speakers
from the stage. The author can redact their own text; they cannot edit a record of what a
different person said in public. That one mention remains, and it is the reason a removal can
never be claimed as total.

**Git history retains the name.** The repository is public. `git log -S Chalef` and GitHub's
blame still surface every earlier version of the manuscript and the ledger. Rewriting that means a
force-push that breaks every clone and invalidates every published commit link, so it is a
separate decision for the operator, not part of honouring a removal.

## The caveat on the 13 snapshots

`website/src/data/versions/05/` serves a version-history feature: frozen copies of Chapter 5 as it
was at 14 past commits. Thirteen of the fourteen named him. Deleting them would have destroyed the
feature for this chapter rather than trimmed it, so the sentences were rewritten instead — the
same redaction applied to the live chapter, applied backwards.

That is worth naming plainly: **those snapshots no longer reproduce exactly what those commits
contained.** It is the author's own prose being revised, not anyone else's, which is why it was
acceptable at all. If the version-history feature is meant to be a faithful archive rather than a
reading aid, delete the thirteen instead — one command, and the note stays true either way.

## Durability, which was the part that could have failed silently

`ingest-channel.yml` runs daily, compares the live channel against the notes in `01_Videos/`, and
refills any gap. Deleting his two talk notes would therefore have undone itself within a day, and
the removal would have looked complete for about sixteen hours.

`99_Meta/withdrawn-videos.md` now lists withdrawn ids with a reason and a date, and
`update_ai_engineer_channel.py` treats them as already known. Tested both directions against a
simulated channel response: the two withdrawn talks are not re-detected, and a genuinely new video
still is. A suppression list that also blinded the ingest to new talks would have been worse than
the problem.

## Verification

All ten attribution gates pass, website tests 97/97, and a sweep of every tracked file for
`Chalef`, `T5IMo5ntyhA` and `H7puB0RwJMM` returns exactly one hit — the Bain transcript above.

The ledger change alters the evidence-density context key, so Chapter 5's sections will re-judge
on the next panel run rather than replay. Expected, not a defect.
