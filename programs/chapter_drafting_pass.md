# Chapter Drafting Pass

## Objective
Bring a Starter-status chapter to Drafting-status by producing source-anchored prose for the public-safe surface (~6–10 sections of 200–500 words each), promoting it through `public/drafting/Chapter X.md` to `website/src/content/chapter-0X.md`, and registering its strongest claims in `claims/Claims Ledger.md`. The pass is per-chapter and bounded: in scope is one chapter's prose + ledger entries; out of scope is anchoring those claims (that's the source-anchoring pass).

## Why
A chapter at Starter status has a chapter promise + a derivative paragraph. That's enough to render the chapter shell on the website but not enough to argue. A drafting pass turns the Chapter Packet's source cluster + strongest claims + useful quotes into actual prose. Without prose, the EvidenceRail has nothing to rail against and the reader sees the same six-sentence stub three different ways. With prose, the chapter joins the through-line.

## Inputs (per chapter)
- `website/src/content/chapter-0X.md` — current Starter shell (chapter promise + derivative paragraph).
- `05_Book_Ideas/Chapter Packets v1/0X_<Title>.md` — source cluster (12–17 videos), strongest claims (~6), useful quotes (4–6), open questions.
- `public/drafting/Chapter X — <Title>.md` — current draft scratchpad. For Starter chapters this is usually a near-duplicate of the shell.
- `claims/Claims Ledger.md` — to avoid duplicating existing claim entries.
- `website/src/content/chapter-01.md` · `chapter-02.md` · `chapter-03.md` — voice reference (declarative, evidence-led, no AI-slop hedging).
- `website/src/data/bookChapters.ts` — chapter status to flip.

## Outputs (per chapter)
1. `public/drafting/Chapter X — <Title>.md` — full draft prose (6–10 sections, ~3,000–5,000 words). May include outline-internal notes.
2. `website/src/content/chapter-0X.md` — public-safe mirror. Prose only, no cluster headers or editorial notes.
3. New entries in `claims/Claims Ledger.md` — at least 6 strongest-claim entries, each with `[[wikilink|label]]` supporting sources from the packet's cluster. No anchors yet.
4. `website/src/data/bookChapters.ts` — chapter's `status` flipped from `'Starter'` to `'Drafting'`.
5. `research_passes/2026-05-28-chapter-0X-drafting.md` — pass log: packet consumed, claims registered, open questions left unresolved, voice/structure choices made.

## Procedure (per chapter)
1. Read the packet's role-in-the-book + strongest claims + useful quotes. Internalize the chapter's job.
2. Skim the source cluster wikilinks. For any source that hasn't already been used in chapters 1–3, read its `01_Videos/<id>-<slug>.md` note before drafting.
3. Read the existing chapter shell in `website/src/content/chapter-0X.md`. Preserve its chapter promise. The shell's derivative paragraph may become the lead, may be discarded, or may inspire the close — keep what carries.
4. Read chapter 1, 2, and 3 in `website/src/content/` and one paragraph each. Match their voice.
5. Draft 6–10 sections that argue the strongest claims in sequence. Each section: a short declarative thesis, one or two sources cited inline as `[[wikilink|short-label]]`, one or two paragraphs of prose. **Every named claim must cite at least one source from the packet's source cluster.** Every quoted statement must use a quote the packet already extracted — not a hand-typed approximation.
6. Promote: write `public/drafting/Chapter X — <Title>.md` (full draft, may include outline-internal notes) and `website/src/content/chapter-0X.md` (public-safe prose only).
7. Register the 6+ strongest claims in `claims/Claims Ledger.md` using the existing ADR-0001 format. Each entry: claim text + supporting `[[wikilink]]` bullets. Do **not** anchor them in this pass — anchoring is `source_anchoring_pass.md`'s job.
8. Flip the chapter's `status` in `website/src/data/bookChapters.ts` from `'Starter'` to `'Drafting'`.
9. Run `python3 99_Meta/scripts/build_stats.py` to refresh `STATS.md` (chapter status counts change).
10. Commit all five outputs in one atomic commit: `draft(chN): <chapter title> Starter → Drafting`.

## Order
Drafts run in this order: **5 → 8 → 7 → 9**.
- **5 (Context Is Infrastructure)** first: largest source cluster (16 videos) ready; central to the scaffolding stack; chapters 7 and 8 cite its frame.
- **8 (Realtime, Voice, and the Cost of Being Interruptible)** second: stress-test chapter; tight thesis; high reader interest makes it a good Drafting demo.
- **7 (Security, Identity, and High-Stakes Trust)** third: depends on positions taken in Ch 5 (MCP-as-context vs MCP-as-attack-surface) and Ch 8 (boundary collapse under realtime).
- **9 (The AI-Native Organization)** last: sweeps across the whole stack; benefits from 1–8 being Drafting-status when 9 draws from them.

## Never do
- Never write a strongest-claim that has no source from the packet's cluster. If the packet doesn't support it, the claim is out of scope for this pass.
- Never paraphrase a quote. If you use a quote from the packet, attribute it to the wikilink the packet uses.
- Never use generative AI to invent statistics, examples, or speakers. Every named example must come from a source in the cluster.
- Never flip the chapter status to `'Drafting'` if step 5 or step 7 was cut short. Status is a contract with the reader.
- Never commit the website mirror without committing the drafting source. They travel together.
- Never anchor in this pass. Anchoring has its own program (`source_anchoring_pass.md`) and its own commit.

## Leave a record
After each chapter pass, append a dated log to `research_passes/` per `research_passes/README.md`: date, chapter, packet version consumed, claims registered (with ledger numbers), sections drafted, open questions still unresolved, anchoring queued for next pass.

After all four chapters reach Drafting status, update `ROADMAP.md` to move the "Chapter drafting passes — chapters 5, 7, 8, 9 still Starter/Outlined" In-flight row to Shipped with the date, and add the next milestone (chapters 4, 6, 10 Outlined → Drafting) to In flight.
