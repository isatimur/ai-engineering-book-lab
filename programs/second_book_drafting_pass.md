# Second Book — Chapter Drafting Pass

## Objective
Turn the Second Book's two curated candidate shortlists (`05_Book_Ideas/Second Book - Part I Candidates.md`, `Second Book - Part II Candidates.md`) into chapter-sized packets, then into source-anchored prose in `public/drafting-2/`, with strongest claims registered in `claims-2/Claims Ledger.md`. Two bounded phases: **Phase 0** (chapter packet assembly, run once) and **Phase 1** (per-chapter drafting, run once per chapter). Anchoring the registered claims is a later, separate pass — same division of labor as book 1's `source_anchoring_pass.md`.

## Why
Book 1 had a synthesis pass no `programs/` file documents (its output survives as `05_Book_Ideas/Chapter Packets v1/`), so `chapter_drafting_pass.md` could assume a packet already existed. Book 2 has no packets yet — only two flat candidate lists (129 Part I, 31 Part II) from the classification pass. Drafting straight from a 129-video list with no chapter boundary is how a chapter ends up as a survey instead of an argument. Phase 0 exists to draw those boundaries once, honestly, from what the corpus actually supports — not from the design spec's placeholder chapter titles, which were explicitly marked provisional pending this exact step.

## Never do (both phases)
- Never invent a claim, quote, statistic, or example not present in a cited source's note (`01_Videos/<id>-<slug>.md`) or its transcript.
- Never cite a whole video when the grounding moment is known — use a Source Anchor once anchoring runs (out of scope for this pass, but don't block the eventual anchor by citing loosely now).
- Never paraphrase a quote; attribute exactly what the source says.
- Never route a Part I/Part II candidate into a chapter it doesn't actually support just to hit a target chapter count.
- Never touch `public/drafting/`, `claims/Claims Ledger.md`, `website/src/data/bookChapters.ts`, or any book-1 file — book 2 is a fully separate manuscript track (design spec Q4).
- Never wire a website route or touch `book-mash-2.toml`'s `voice_baseline_chapters` in this pass — both are deferred until real chapters exist (see the foundations plan's "Deliberately not in this plan").

---

## Phase 0 — Chapter packet assembly (run once, before any drafting)

### Objective
Split the two candidate shortlists into chapter-sized clusters (aim for the design spec's rough shape — Part I: training/RL, quantization & inference economics, frontier-model-building, possibly a 4th on model-level evals; Part II: robotics/physical agents, regulated-domain agents (finance/legal/medicine/insurance/tax), creative & education domains, possibly a 4th synthesis chapter) and write one packet file per chapter, mirroring book 1's packet structure.

Treat the design spec's chapter sketch as a *starting hypothesis*, not a fixed target: if the real candidate list clusters differently (e.g. finance and insurance talks are dense enough to split, or "creative & education" turns out thin), adjust the chapter boundaries to match what the corpus actually supports and note the deviation in the packet.

### Inputs
- `05_Book_Ideas/Second Book - Part I Candidates.md` (129 candidates)
- `05_Book_Ideas/Second Book - Part II Candidates.md` (31 candidates)
- `99_Meta/second-book-classification.json` — same data, machine-readable, plus `part1_part2_keyword_overlap` (6 videos tagged for both parts — read each one's note and assign it to whichever chapter it actually argues for; don't let it silently default to Part I just because the classifier saw the theme tag first)
- `01_Videos/<id>-<slug>.md` — per-candidate notes (summary, themes, transcript excerpt) for every video you're considering routing
- `docs/superpowers/specs/2026-07-27-second-book-design.md` — the thesis and rough structure
- `CONTEXT.md` — vocabulary (Claim, Source Anchor, Support level, Candidate chapters)

### Outputs
1. `05_Book_Ideas/Second Book - Chapter Packets/00_README.md` — packet structure note (adapt book 1's `Chapter Packets v1/00_README.md` wording to book 2)
2. One packet per chapter: `05_Book_Ideas/Second Book - Chapter Packets/0X_<Title>.md`, each containing:
   - chapter role in the book (one paragraph — what this chapter argues, how it connects to the shared thesis)
   - supporting source cluster (wikilinks to the `01_Videos/` notes this chapter draws on — pull these from the two candidate shortlists, not from outside them)
   - strongest source-backed observations worth promoting to claims (a working list — actual promotion to `claims-2/Claims Ledger.md` happens in Phase 1)
   - useful quotes/excerpts to revisit when drafting (verbatim, with video id — not final Source Anchors yet, just drafting notes)
   - open questions requiring editorial judgment
3. An updated chapter list in the design spec or a short note in the packets README if the real breakdown diverged from the spec's placeholder structure.

### Procedure
1. Read both candidate shortlists in full. For each candidate, skim its note's summary + themes (not necessarily the full transcript yet).
2. Cluster Part I's 129 candidates into 3-4 groups by actual topic density — don't force an even split.
3. Cluster Part II's 31 candidates into 3-4 groups the same way.
4. For each of the 6 `part1_part2_keyword_overlap` videos, read the note and decide which single chapter it actually belongs to (a video can support one chapter's argument even if it was theme-tagged into both buckets).
5. For each resulting chapter cluster, write its packet: role, source cluster, strongest observations, useful quotes, open questions.
6. Commit: `second-book: assemble chapter packets (Phase 0)`.

---

## Phase 1 — Per-chapter drafting pass (run once per chapter, after Phase 0)

### Objective
Turn one chapter's packet into full draft prose in `public/drafting-2/`, and register that chapter's strongest claims in `claims-2/Claims Ledger.md`.

### Inputs (per chapter)
- `05_Book_Ideas/Second Book - Chapter Packets/0X_<Title>.md` — this chapter's packet (Phase 0 output)
- `claims-2/Claims Ledger.md` — to avoid duplicating existing claim entries
- `claims-2/README.md` — the ledger entry format to follow
- Book 1's `website/src/content/chapter-01.md`, `chapter-02.md`, `chapter-03.md` — voice reference only (declarative, evidence-led, no hedging) — book 2 is a separate manuscript, not required to match book 1's specific arguments, just its register
- `public/drafting-2/README` — confirms this is the correct output location (note its filename has no `.md` extension deliberately — see the file's own note before "fixing" that)

### Outputs (per chapter)
1. `public/drafting-2/Chapter X — <Title>.md` — full draft prose (aim for book 1's rough shape, 6-10 sections, ~3,000-5,000 words, adjusted to what the chapter's actual source cluster supports — a chapter with a thin cluster should be shorter, not padded)
2. New entries in `claims-2/Claims Ledger.md`, following the format in `claims-2/README.md` — at least the packet's strongest observations that survive drafting, each with `[[wikilink|label]]` supporting sources from the packet's cluster. No anchors yet.
3. `research_passes/2026-0X-XX-second-book-chapter-0X-drafting.md` — pass log: packet consumed, claims registered, open questions left unresolved.

### Procedure
1. Read the chapter's packet in full — role, cluster, observations, quotes, open questions.
2. For any cluster video you haven't already read closely, read its `01_Videos/<id>-<slug>.md` note before drafting from it.
3. Read one paragraph each from book 1's chapters 1-3 for voice, not content.
4. Draft sections that argue the packet's strongest observations in sequence. Each section: a short declarative thesis, one or two sources cited inline as `[[wikilink|short-label]]`, one or two paragraphs of prose. Every named claim must cite at least one source from the packet's cluster. Every quoted statement must use a quote the packet already extracted — not a hand-typed approximation.
5. Write `public/drafting-2/Chapter X — <Title>.md`.
6. Register the surviving strongest claims in `claims-2/Claims Ledger.md`.
7. Commit: `draft(second-book, chN): <chapter title>`.

### Leave a record
After each chapter pass, log to `research_passes/` per `research_passes/README.md`: date, "second book" + chapter, packet version consumed, claims registered (with ledger numbers), sections drafted, open questions still unresolved, anchoring queued for a future pass.

## After all chapters are drafted
- Run `python3 99_Meta/scripts/build_stats.py` to confirm it correctly reports book 2's chapter/claim counts (it may need a small extension — check whether it currently scopes to `public/drafting/` only; if so, that's a follow-up fix, not something to force through this pass).
- Website wiring (a second route reusing the Reader/EvidenceRail components) becomes viable once at least one chapter exists — see the foundations plan for why it wasn't done earlier.
- Run the book-mash six-dim judge panel against `book-mash-2.toml` once a full draft exists (design spec Q6 — deferred, not skipped).
