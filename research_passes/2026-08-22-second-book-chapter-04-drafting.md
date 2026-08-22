# Second Book — Chapter 4 Drafting Pass — 2026-08-22

## Date
2026-08-22

## Target
Second book, Chapter 4 — Beyond Text: Models for Speech, Media, Perception, and
Action. Phase 1 of `programs/second_book_drafting_pass.md`, run for Chapter 4
only. This completes Part I (Chapters 1-4 now all drafted).

## Pass type
Per-chapter bounded drafting (second-book manuscript track). Draft prose into
`public/drafting-2/`, register strongest claims into `claims-2/Claims Ledger.md`.
Source anchoring is a separate future pass and was not done here. No subagents
were spawned — all reading, drafting, and writing done directly in one agent
context (prior fan-out attempts in this series hit account spend limits).

## Inputs used
- `05_Book_Ideas/Second Book - Chapter Packets/04_Beyond_Text_Models_for_Speech_Media_Perception_and_Action.md`
  — packet as committed at Phase 0 (`064b797`): 11-source cluster, 6 strongest
  observations, 5 useful quotes, 4 open questions.
- `01_Videos/*.md` notes read this pass — all 11 cluster sources: #663, #662,
  #385, #247, #245, #248, #244, #692, #235, #174, #165. Most notes are
  auto-generated boilerplate (title + description cue + ~100-word transcript
  excerpt); only #692 carries a rich synthesized summary. Prose grounded strictly
  to what each note's summary + excerpt + description cue actually supports.
- `research_passes/2026-08-22-second-book-chapter-02-drafting.md` — read to see
  exactly how the Ch2/Ch4 voice-serving boundary was drawn, so Ch4 does not
  re-argue Ch2's latency-economics or on-device claims.
- `claims-2/Claims Ledger.md` (had entries 1-18 from Chapters 1-3) and
  `claims-2/README.md` — ledger format; continued numbering from 19.
- `website/src/content/chapter-01.md`, `chapter-03.md` — book 1 voice reference
  only (declarative, evidence-led, no hedging).
- `public/drafting-2/README` — confirmed output location and the deliberate
  no-`.md` README convention (do not add stray `*.md` here).
- `research_passes/2026-08-22-second-book-chapter-03-drafting.md` — structural
  template for this log.

## Outputs changed
1. `public/drafting-2/Chapter 4 — Beyond Text.md` — full draft, ~1,746 words,
   titled H1 + untitled opening + 5 titled modality sections + closing synthesis
   (6 `##` sections total).
2. `claims-2/Claims Ledger.md` — appended claims 19-24.
3. This file.

## Title decision
Filename and H1 both use the short form `Chapter 4 — Beyond Text` (matching Ch3's
precedent of filename = H1 = short form, and the commit message the brief pins:
`draft(second-book, ch4): Beyond Text`). The packet's long subtitle (Models for
Speech, Media, Perception, and Action) is preserved in the packet filename and in
this log, not in the draft H1. No other `*.md` was added to `public/drafting-2/`.

## Claims registered
- **19)** Non-text model architectures are converging on the LLM template by
  tokenization. Sources: #663 Humeau, #385 McGovern. Strong.
- **20)** Recommendation may be the largest LLM application of all — bigger than
  search. Source: #245 Tandon. Moderate (single-source, speaker's framing).
- **21)** The consolidation move is "one foundation model for all of it."
  Sources: #247 Feng, #245 Tandon, #248 LinkedIn. Strong.
- **22)** For live modalities, latency is a model-architecture constraint, not
  just a serving cost. Sources: #663 Humeau, #662 Zeghidour. Strong.
- **23)** Generative media is productized as an orchestration stack, not a single
  model. Sources: #244 Yurtseven, #692 Vernade. Moderate.
- **24)** Embodiment is the frontier's next modality, expressed as a foundation
  model. Sources: #174 Waymo EMMA, #165 GR00T N1. Strong.

All six of the packet's strongest observations survived drafting and were
registered (continuing the ledger as 19-24). Two structural refinements during
drafting:
- Packet observation 1 ("architectures are converging on the LLM template") was
  split into two distinct convergence *mechanisms* — **tokenization** (claim 19:
  speech becomes token sequences, #663/#385) and **consolidation** (claim 21: a
  zoo of task-specific models collapses into one, #247/#245/#248). This turns the
  chapter from a survey into an argument and gives a real answer to the packet's
  "one chapter or two?" question (see below).
- Packet observation 4 ("latency is the product") was re-sourced. The packet
  paired it with #235 (Luma); #235's note is about under-provisioning GPUs for a
  launch surge — serving *economics*, which is Ch2's lane (#147). Sourcing claim
  22 on #235 would have re-opened the Ch2/Ch4 seam. Claim 22 is instead sourced
  on #663 + #662, both of which support latency-as-architecture directly, and
  #235 was relocated to the generative-media section as demand/scale evidence
  (1M users in 4 days), where its quote actually fits.

## Ch2 / Ch4 voice-serving boundary — how it was kept clean
The Ch2 pass placed voice-serving *economics* (#147, $1/hr; #280/#293 considered
and left uncited) in Ch2, and its "tightest budget is real time" section
explicitly seamed voice-model *architecture* to Ch4. This pass honored that seam:
- **Latency (claim 22, section "For live modalities…").** The section opens by
  naming Ch2's ownership of latency-as-*cost* in one sentence, then argues only
  the architecture side — streaming generation, first-audio latency, turn-taking,
  interruption handling — sourced on #663/#662, not on any economics talk. The
  claim's caveat states the split verbatim so a future editor cannot merge them.
- **On-device (Ch2 claim 9).** Not touched at all in Ch4 — no on-device economics
  argument appears in the draft.
- **#147, #280, #293** are Ch2's cluster and were not cited here; Ch4 draws only
  on its own 11-source cluster.

## Packet open questions — resolutions
The packet listed 4 open questions; status after this pass:
- *Book-1 overlap: #662 and #663 also appear in book 1's `08_Realtime_and_Embodied_Edges`.*
  → No action needed, as the packet advised. Ch4 draws a different argument (TTS
  *architecture* converging on LLMs) than book 1 (realtime conversation as a
  control problem). Flagged again here so a future editor does not "deduplicate"
  the shared corpus note away.
- *Are #174/#165 the closer of Part I or the opener of Part II?* → Resolved as
  the packet leaned: they close Part I here (as *models* for the physical world)
  and are explicitly queued to reprise in Ch5 (as a *domain*). The draft's
  embodiment section and closing both state this handoff in-text; claim 24 lists
  candidate chapters 4, 5.
- *One chapter or two (generative modalities vs "LLMs eat classical ML")?* →
  Resolved: **one chapter, two mechanisms.** Rather than split by theme
  (speech+media vs recommendation), the chapter is unified by the two convergence
  mechanisms (tokenization, consolidation), which cut across all five modalities.
  The closing synthesis argues this explicitly.
- *Keep the recommendation talks arguing convergence, not surveying three ranking
  systems.* → Resolved: the three recommendation talks (#247/#245/#248) are
  compressed into a single section that argues the consolidation mechanism, with
  each cited once for its distinct contribution (one-model goal, bigger-than-
  search scale, production path), not walked through as three case studies.

## Open questions left unresolved
- Claim 20 (recommendation "bigger than search") rests single-source on #245 and
  is the speaker's own framing, not independently sized — marked moderate, same
  posture as ledger claims 14 and 17. A corroborating or sizing source would
  harden it before it carries public weight.
- Claim 23 (generative media as orchestration) is marked moderate: #244 is a
  platform vendor whose product *is* multi-model orchestration, and DeepMind's
  own stated north star (#692) is a single world model across all modalities — so
  "compose, don't consolidate" may be a stage rather than an endpoint. Worth a
  non-vendor source, and worth revisiting whether the media exception holds as
  world models mature.
- #174 (Waymo EMMA) is end-to-end *multimodal*, not tokenized-autoregressive; it
  supports claim 21's consolidation mechanism, not claim 19's tokenization one.
  Recorded so a later pass does not overstate it as "LLM-shaped."
- **Chapter length: four for four.** ~1,746 words, the shortest chapter yet,
  below Ch1 (~2,900), Ch2 (~2,550), and Ch3 (~2,050). Expected and acceptable per
  the brief: this is the smallest cluster (11 sources) and 10 of its 11 notes are
  boilerplate (only #692 has a synthesized summary). The binding constraint
  remains note quality — cite only what a note supports — not section count or
  drafting effort. All four Part I chapters now land under the 3,000-5,000 aim; a
  consistent corpus finding, not a per-chapter shortfall. Full-transcript reads
  would be the lever if a later pass wants these chapters longer.

## Anchoring queued for a future pass
- `source_anchoring_pass.md` equivalent for book 2 against claims 19-24 —
  backfill Source Anchors (video id + start/end timestamp + verbatim quote +
  confidence). The verbatim quotes already in this draft/ledger are the natural
  next anchors: #245 (bigger-than-search), #247 (one-foundation-model), #244
  (generative-media definition), #235 (500 H100s), #165 (building-a-robotics-
  foundation-model).
- Full-transcript reads for the single-source claim 20 (#245) and for #663/#662
  (whose transcript excerpts are thin intros; the architecture arguments were
  drawn from the notes' synthesized summaries) before any revision that wants to
  deepen the speech-architecture section.

## Next pass
- Part I is complete. Phase 1 drafting moves to Part II — Chapter 5 (Robotics and
  the Physical World, 7 sources), into which #174 and #165 reprise as a domain.
- After all chapters exist: re-run `99_Meta/scripts/build_stats.py` and check
  whether it scopes only to `public/drafting/` (book 1); if so, extend it to
  cover `public/drafting-2/` as a follow-up.
