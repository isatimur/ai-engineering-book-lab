# Second Book — Chapter 3 Drafting Pass — 2026-08-22

## Date
2026-08-22

## Target
Second book, Chapter 3 — Building Frontier Models. Phase 1 of
`programs/second_book_drafting_pass.md`, run for Chapter 3 only.

## Pass type
Per-chapter bounded drafting (second-book manuscript track). Draft prose into
`public/drafting-2/`, register strongest claims into `claims-2/Claims Ledger.md`.
Source anchoring is a separate future pass and was not done here. No subagents
were spawned — all reading, drafting, and writing done directly in one agent
context (prior fan-out attempts in this series hit account spend limits).

## Inputs used
- `05_Book_Ideas/Second Book - Chapter Packets/03_Building_Frontier_Models.md` —
  packet as committed at Phase 0 (`064b797`): 19-source cluster, 6 strongest
  observations, 6 useful quotes, 4 open questions.
- `01_Videos/*.md` notes read this pass (14 of the 19 cluster sources): #476,
  #439, #074, #400, #189, #267, #013, #067, #049, #253, #137, #528, #009, #480,
  plus #269, #268, #433 for inclusion decisions. Most notes are auto-generated
  boilerplate (title, description cue, ~100-word transcript excerpt); only #137
  carries a synthesized summary. Prose was grounded strictly to what each note's
  summary + excerpt actually supports.
- `claims-2/Claims Ledger.md` (had entries 1-12 from Chapters 1-2) and
  `claims-2/README.md` — ledger format; continued numbering from 13.
- `research_passes/2026-08-22-second-book-chapter-01-drafting.md` — read to see
  how the Ch1/Ch3 boundary was drawn (training *method* vs frontier *strategy*),
  so Ch3 does not re-argue Ch1's claims. Structural template from the Ch2 log.
- `website/src/content/chapter-01.md`, `chapter-03.md` — book 1 voice reference
  only (declarative, evidence-led, no hedging).
- `public/drafting-2/README` — confirmed output location and the deliberate
  no-`.md` README convention (do not add stray `*.md` here).

## Outputs changed
1. `public/drafting-2/Chapter 3 — Building Frontier Models.md` — full draft,
   ~2,050 words, titled opening + 7 titled sections (closing synthesis included).
2. `claims-2/Claims Ledger.md` — appended claims 13-18.
3. This file.

## Claims registered
- **13)** The open-model gap has largely closed. Sources: #439 Cheah, #189
  Haghighat, #74 Song. (#400 Qwen dropped from this claim — its note does not
  support a gap-closing statement; moved to claim 18.)
- **14)** Perceived "stagnation" is a training-budget story, not a ceiling.
  Source: #476 Patel. (Single-source; flagged in ledger caveats.)
- **15)** Frontier progress is bottleneck-hunting, not broad improvement.
  Sources: #13 Hadsell (spine), #267 Rae (worked example).
- **16)** Code is where labs learn to model computation, not just imitate it.
  Sources: #67 Kahn, #49 Poolside.
- **17)** Benchmarks are cultural artifacts that steer the whole field. Sources:
  #253 Duffy (spine), #137 Yaron (practitioner-side fact). Support: moderate.
- **18)** Open source is a strategy, not charity. Sources: #9 Sanseviero, #528
  Chaplot, #480 Kenealy, #400 Lin.

All six of the packet's strongest observations survived drafting and were
registered (continuing the ledger as 13-18). Claim 16 was reframed during
drafting: the packet's observation 4 ("code is a deliberate proving ground for
reasoning") risked duplicating Chapter 1's claim 3 (code as the RL-scaling
domain because its rewards are verifiable). Regrounding on #67's actual content —
world-modeling / predicting execution semantics, per Kahn's "sandbox" and the
note's "syntax rather than computation" cue — produced a genuinely distinct
claim (modeling computation vs. imitating it), not a near-duplicate of #3.

## Sections drafted
1. Titled opening — building a frontier model is now its own discipline, and the
   frontier is a crowded, open field, not a two-lab race (#269 "30 significant
   model releases in the past six months"; #439 "more than one AI model a
   minute").
2. **"Stagnation" is a training-budget story, not a ceiling** (#476 quote).
3. **Frontier progress is bottleneck-hunting** (#13 spine, #267 example).
4. **Code is where labs learn to model computation** (#67 quote, #49 quote).
5. **The open-model gap has largely closed** (#439 quotes, #189, #74).
6. **Open source is a strategy, not charity** (#528, #480, #9 quote, #400).
7. **Benchmarks are how the field steers itself** (#253, #137).
8. **The frontier is a discipline, not a club** — closing synthesis; hands off
   to Chapter 4 (which modality the frontier moves into next).

All packet-pre-extracted quotes used verbatim with attribution: #476, #269, #049,
#067, #009 (from the packet's quote list), plus two additional verbatim lines
lifted from the notes' own transcript excerpts and description cues — #439's
"first open source model to catch up and surpass GPT-4 / you do not need a
billion dollars" and #480's "empower and accelerate… the open source community."
No statement is quoted that is not present verbatim in a note. All other sources
are paraphrased strictly from their notes' summary + excerpt.

## Ch1 / Ch3 boundary — how it was kept clean
- **Code (#67, #49).** Ch1 owns the training *mechanics*: code as the RL-scaling
  domain because its rewards are automatically verifiable (claim 3). Ch3 owns the
  *world-modeling rationale*: code as the first world simple enough to simulate
  honestly, chosen to model computation itself. Claim 16's caveat states the
  split explicitly, and the draft hands the reward-verifiability argument back to
  Ch1 in-text ("Why code's rewards are so cheap to verify… is Chapter 1's
  argument; the strategic choice to start there is this chapter's").
- **Bottleneck framing (#267).** Ch1's log cited #267 narrowly for the bottleneck
  framing on thinking-as-training-signal. Ch3 inverts the emphasis: #13 (Hadsell)
  carries the spine of the research-culture claim, and #267 is demoted to a
  worked example inside Gemini. The draft says in-text that the training method
  behind Gemini's thinking is Ch1's subject and "the point here is the research
  culture around it."
- **Data recipe (claim 5, candidate chapters 1,3).** Left entirely in Ch1. This
  chapter's open-model argument (claim 13) is about *strategy and cadence* —
  who can build and how fast — not about the data-recipe mechanics that let open
  reasoning models compete, which Ch1 already registered.

## Packet open questions — resolutions
The packet listed 4 open questions; status after this pass:
- *Gemini talks (#013, #071, #267, #268) risk reading as a Google promo.* →
  Resolved as instructed. Used #13 and #267 only for the research-culture
  (bottleneck-hunting) argument, balanced against Mistral/Qwen/MiniMax/Gemma in
  the open-model and open-source sections so the chapter is about the frontier,
  not one lab. #268 (Kilpatrick, year-of-Gemini) and #071 (building-in-the-Gemini-
  era) left uncited — both notes are announcement-shaped with nothing extractable
  beyond "Gemini progressed," and citing them would have been the promo the
  packet warned against.
- *#253 and #137 — one home for a "how the field measures itself" section?* →
  Resolved: both land here as section 7. #253 carries the steering claim; #137
  supplies the adjacent practitioner fact (evaluation is the top pain point). The
  ledger caveat is explicit that #137 documents difficulty measuring, not the
  benchmark-steering mechanism, so its survey numbers are not read as a
  benchmark-politics finding they do not contain.
- *Field-state commentary (#269, #581, #433) may serve the intro better.* →
  Resolved: only #269 cited, for the "30 significant model releases" cadence line
  in the opening (packet-extracted, cleanest cadence evidence). #581 and #433
  left uncited and flagged below for the eventual intro pass.
- *#560 (Hyperspace) — keep only if the decentralized-compute angle earns a
  sentence.* → Resolved: dropped. Logged as considered, not routed; its
  decentralized-compute angle did not earn a place in the strategy argument.

## Open questions left unresolved
- 5 of the 19 cluster sources were not cited: #268 and #071 (Gemini
  announcement talks, nothing extractable past "Gemini progressed"); #581 and
  #433 (field-state commentary the packet flags as intro-framing material —
  #433 is a VC's ten hot takes with no extractable specific); #560 (Hyperspace,
  dropped as thin). #581 and #433 should be claimed by the book's intro pass, not
  lost — recorded here so the intro pass can find them.
- Claim 14 (stagnation is a budget story) rests single-source on #476 (Patel).
  Claim 17's steering half rests single-source on #253 (Duffy's rhetorical
  thesis). Both flagged in ledger caveats; corroborating sources from the wider
  corpus would strengthen them before they carry public weight.
- Claim 13's strength language ("catch up and surpass GPT-4," "#1 open model") is
  the speakers' own framing, not independently benchmarked. Fine as attributed
  claims; a neutral benchmark citation would harden the parity claim.
- **Chapter length: three for three.** This draft landed ~2,050 words, shorter
  than Ch1 (~2,900) and Ch2 (~2,550). All three chapters now come in under the
  3,000-5,000 aim. This chapter is shortest because its cluster's notes are the
  thinnest in the corpus so far — only #137 has a synthesized summary; the rest
  are boilerplate title + description cue + ~100-word excerpt. The binding
  constraint is note quality (cite only what a note actually supports), not
  drafting effort or section count. Recording this as a corpus finding, per the
  Ch2 log's flag to watch it: the pattern reflects how much each note carries,
  and re-reading full transcripts (not just notes) would be the lever if a later
  pass wants these chapters longer.

## Anchoring queued for a future pass
- `source_anchoring_pass.md` equivalent for book 2 against claims 13-18 —
  backfill Source Anchors (video id + start/end timestamp + verbatim quote +
  confidence). The verbatim quotes already in this draft/ledger (#476, #269,
  #049, #067, #009, #439, #480) are the natural next anchors after Chapters 1-2.
- Full-transcript reads for the single-source claims (14, 17) and for the
  uncited Gemini talks (#268, #071) before any revision that wants to deepen the
  research-culture section beyond the two DeepMind sources.

## Next pass
- Phase 1 drafting for the remaining second-book chapters (Ch 4 onward).
- After all chapters exist: re-run `99_Meta/scripts/build_stats.py` and check
  whether it scopes only to `public/drafting/` (book 1); if so, extend it to
  cover `public/drafting-2/` as a follow-up.
