# Chapter 5 Drafting Pass — 2026-05-28

## Date
2026-05-28

## Target
Chapter 5 — Context Is Infrastructure. Move from Starter status to Drafting status per `programs/chapter_drafting_pass.md`.

## Pass type
Per-chapter bounded drafting. First execution of the new `chapter_drafting_pass.md` program.

## Inputs used
- `05_Book_Ideas/Chapter Packets v1/05_Context_Is_Infrastructure.md` — packet v1 (16 source cluster, 6 strongest claims, 4 useful quotes, 4 open questions).
- `website/src/content/chapter-05.md` — Starter shell (chapter promise + derivative paragraph).
- `public/drafting/Chapter 5 - Context Is Infrastructure.md` — pre-existing Starter scratchpad (overwritten).
- `claims/Claims Ledger.md` — to cross-reference against existing claims 10, 15, 18 (already in Ch5 territory) and pick next claim number (25).
- `website/src/content/chapter-01.md` · `chapter-03.md` — voice reference (Lopopolo-style declarative cadence; speaker + integrated quote + interpretation pattern).
- `website/src/data/bookChapters.ts` — Ch5 entry for status flip.

## Outputs changed
1. `public/drafting/Chapter 5 - Context Is Infrastructure.md` — full draft, ~4,500 words across 8 sections + draft note + status note.
2. `website/src/content/chapter-05.md` — public-safe mirror; prose only, no scratch notes.
3. `claims/Claims Ledger.md` — appended claims 25, 26, 27, 28 (no anchors per program; anchoring is the next pass).
4. `website/src/data/bookChapters.ts` — Ch5 status flipped Starter → Drafting.
5. This file.

## Claims registered
- **25)** Context engineering is a primary engineering discipline, not a prompt trick. Sources: #100 Mendelevitch, #104 Bercovici, #105 Chin, #157 Bryk.
- **26)** RAG, memory, and GraphRAG solve different jobs; collapsing them into one bucket misses the architecture. Sources: #48 Morris, #218 Chalef, #105 Chin, #215 Neo4j practical, #219 Patel hybrid, #156 Karam.
- **27)** Enterprise usefulness scales with working-set quality, not corpus size. Sources: #100 Mendelevitch, #154 Harvey/Lance, #193 Tran.
- **28)** The next failure frontier is context misassembly, not just hallucination. Sources: #48 Morris, #47 Leo (Manus/Meta), #156 Karam, #172 Krenn.

Existing claims referenced in the chapter prose without re-registering: **10** (context failure is often a system-assembly problem), **15** (capability packaging and progressive disclosure), **18** (context failure is often a capability-exposure problem).

## Quality signals
- All 4 packet-pre-extracted quotes (Bercovici "set of skills and tools…", Morris "Stuffing context is not memory", Carey "We shouldn't be dumping loads of tools…", Sam Morrow GitHub MCP tool-load reduction) used verbatim with attribution.
- Section count 8, within program's 6–10 range.
- Chapter promise from Starter shell preserved as lead paragraph.
- Handoffs in place: from Ch 4 ("Evals can measure whether an answer is right. Context architecture determines whether the right answer was even available to the model in the first place. Without the substrate, the eval is measuring guesses.") and into Ch 6 ("the substrate cannot live entirely in a single agent run. It has to persist across sessions, recover from interruptions, and survive partial failure. That is the runtime problem.").

## Unresolved questions
The packet listed 4 open questions; status of each after this pass:
- *How much of the chapter should go into retrieval mechanics versus higher-level context principles?* → Resolved by leaning into principles; mechanics stay one section among several (the "RAG, memory, and GraphRAG are different jobs" section).
- *Should GraphRAG be a subsection here or a short boxed detour?* → Resolved as: one section among others, no boxed detour. Detours add friction in a chapter making an infrastructure argument.
- *Which enterprise case study best demonstrates context quality as the difference maker?* → Resolved as: legal (Harvey/Lance) and Glean's enterprise-aware agent together; legal carries the precision argument, Glean carries the boundary argument.
- *Should MCP live here primarily as a context-selection story, with security/identity deferred to Chapter 7?* → Resolved as: yes. Chapter 5 frames MCP as a context-and-capability problem; Chapter 7 will reframe it as identity/sandbox/trust.

## Next pass
- `source_anchoring_pass.md` against claims 25, 26, 27, 28 — backfill Source Anchors with verbatim quote + timestamp + confidence using `99_Meta/scripts/anchor/cli.py`. Each claim has 3–6 supporting sources, so this is roughly a 15–25 anchor batch.
- `chapter_drafting_pass.md` against Chapter 8 — next per the program's drafting order (5 → 8 → 7 → 9).
