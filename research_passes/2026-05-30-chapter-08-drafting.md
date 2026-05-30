# Chapter 8 Drafting Pass — 2026-05-30

## Date
2026-05-30

## Target
Chapter 8 — Realtime, Voice, and the Cost of Being Interruptible. Move from Starter status to Drafting status per `programs/chapter_drafting_pass.md`. Second execution of the program, following Ch 5 on 2026-05-28.

## Pass type
Per-chapter bounded drafting.

## Inputs used
- `05_Book_Ideas/Chapter Packets v1/08_Realtime_and_Embodied_Edges.md` — packet v1 (15-source cluster — 3 primary voice + 12 supporting; 7 strongest claims, each with anchor tables already attached; 6 useful quotes; 3 open questions).
- `website/src/content/chapter-08.md` — Starter shell (chapter promise + ~250-word public-safe derivative paragraph).
- `public/drafting/Chapter 8 - Realtime, Voice, and the Cost of Being Interruptible.md` — pre-existing Starter scratchpad (overwritten).
- `claims/Claims Ledger.md` — to cross-reference against existing claims 20, 21, 22, 23 (already in Ch 8 territory) and pick next claim number (29).
- `website/src/content/chapter-01.md` · `chapter-03.md` — voice reference. Same baseline as Ch 5 pass.
- `website/src/data/bookChapters.ts` — Ch 8 entry for status flip + title standardization.

## Outputs changed
1. `public/drafting/Chapter 8 - Realtime, Voice, and the Cost of Being Interruptible.md` — full draft, ~4,800 words across 9 sections + draft note + status note.
2. `website/src/content/chapter-08.md` — public-safe mirror; prose only.
3. `claims/Claims Ledger.md` — appended claim 29 (latency masking as conversational scaffolding) with no anchors per program. Existing claims 20, 21, 22, 23 referenced in prose without re-registering.
4. `website/src/data/bookChapters.ts` — Ch 8 status flipped Starter → Drafting; title standardized "Realtime and Embodied Edges" → "Realtime, Voice, and the Cost of Being Interruptible" to match the shell H1 + on-disk `public/drafting/` filename + chapter packet's working title in prose.
5. This file.

## Claims registered
- **29)** Latency masking belongs in the same architectural category as evals, harnesses, and durable runtimes. Sources: #662 Zeghidour, #661 Harries, #85 Debnath/AWS, #142 Hultman Kramer/Daily.

Existing claims referenced in the chapter prose without re-registering:
- **20)** Realtime AI quality is primarily a coordination and latency-engineering problem, not a model-quality problem.
- **21)** Voice is best added as a realtime wrapper around a chat agent, not as a rebuild.
- **22)** Half-duplex is the silent architectural ceiling on natural voice conversation.
- **23)** TTS architecture is converging on LLM architecture.

The Ch 8 packet's seven strongest claims map to four already-registered ledger entries plus one new (latency masking) — a structurally different shape than Ch 5, where four of the six packet claims needed new ledger entries. Reflects that the voice cluster has already been through autoresearch passes and the strong claims were promoted earlier.

## Quality signals
- All 7 packet-pre-extracted quotes (Harries "I've already got my agent…", Zeghidour "main bottleneck", "listen or speak", "last mile", Humeau "auto-regressive decoder backbone", Singh "engineering minefield", DuBois/Kramer "ngmi") used verbatim with attribution.
- Section count 9 (1 lead + 7 packet-anchored sections + 1 robotics coda + handoff), within program's 6–10 range.
- Chapter promise from Starter shell preserved as opening line ("Text chat flatters AI systems. Voice does not.").
- Shell's existing public-safe derivative paragraphs reused as the skeleton for the early sections; each shell paragraph was expanded into a section with named speakers and integrated quotes, rather than being thrown away.
- Title standardization closes a drift between `bookChapters.ts` (rendered on the catalogue homepage) and the shell file + on-disk drafting file. The longer title is editorial-stronger and matches every other surface.
- Handoffs in place: from Ch 6 ("turn-taking, interruption, and full-duplex behavior are runtime concerns") referenced in the half-duplex section; into Ch 9 ("the team that ships dependable AI looks different from the team that ships a chatbot") in the closing paragraph.

## Unresolved questions
The packet listed 3 open questions; status of each after this pass:
- *Does this chapter belong in the main spine or as a shorter horizon chapter near the end?* → Resolved as main spine, per packet's leaning. The voice cluster carries a chapter on its own; the latency-budget + half-duplex + masking + TTS-as-LLM argument is substantial enough to justify a full chapter.
- *Should robotics (#165, #174, #175) be included or split off?* → Resolved as: short coda section inside the voice chapter, not split off. Voice carries the chapter; robotics confirms the frame from another substrate without claiming a chapter slot of its own until the corpus deepens.
- *The chapter currently has a strong frame and weaker robotics evidence. Worth a follow-up pass?* → Acknowledged honestly in the robotics section: "Robotics is the right *next* embodied edge to chapter, and its treatment in this manuscript will deepen as the corpus does." The chapter does not over-promise robotics evidence it does not have.

## Next pass
- `source_anchoring_pass.md` against claims 25–29 from the Ch 5 + Ch 8 drafting passes. The Ch 8 packet has anchor tables already attached to its strongest claims — for claim 29 specifically, the source-anchoring pass will be a paste-and-verify job. For claim 21's voice corroboration (Schaeff, Hopkins, Backman, Hultman Kramer) the pass may also surface incidental anchors worth promoting.
- `chapter_drafting_pass.md` against Chapter 7 (Security, Identity, and High-Stakes Trust) — next per the program's drafting order (5 → 8 → 7 → 9). Ch 7's packet has ~13 sources in the cluster; the chapter should now also reference Ch 5's claims 18 (capability-exposure) and 27 (working-set quality) plus Ch 8's claim 22 (half-duplex ceiling, indirectly relevant to MCP turn budgets).
