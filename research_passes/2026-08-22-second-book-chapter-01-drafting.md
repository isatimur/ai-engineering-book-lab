# Second Book — Chapter 1 Drafting Pass — 2026-08-22

## Date
2026-08-22

## Target
Second book, Chapter 1 — Training and the Turn to RL. First execution of Phase 1
of `programs/second_book_drafting_pass.md`, run for Chapter 1 only.

## Pass type
Per-chapter bounded drafting (second-book manuscript track). Draft prose into
`public/drafting-2/`, register strongest claims into `claims-2/Claims Ledger.md`.
Source anchoring is a separate future pass and was not done here.

## Inputs used
- `05_Book_Ideas/Second Book - Chapter Packets/01_Training_and_the_Turn_to_RL.md`
  — packet as committed at Phase 0 (`064b797`): 22-source cluster, 6 strongest
  observations, 6 useful quotes, 4 open questions.
- `01_Videos/*.md` notes read this pass: #80, #251, #271, #231, #674, #397, #233,
  #482, #598, #543, #337, #267, #183, #230, #475, #506, #558. (Most cluster notes
  are auto-generated boilerplate — title, description cue, ~100-word excerpt; only
  #251 and #674 carry synthesized summaries. Prose was grounded strictly to what
  each note actually supports.)
- `claims-2/Claims Ledger.md` (was empty) and `claims-2/README.md` — ledger format.
- `website/src/content/chapter-01.md`, `chapter-02.md`, `chapter-03.md` — book 1
  voice reference only (declarative, evidence-led, no hedging).
- `public/drafting-2/README` — confirmed output location and the deliberate
  no-`.md` README convention (do not add stray `*.md` here).

## Outputs changed
1. `public/drafting-2/Chapter 1 — Training and the Turn to RL.md` — full draft,
   ~2,900 words, untitled opening + 9 titled sections.
2. `claims-2/Claims Ledger.md` — replaced the placeholder body; registered claims
   1–6 (no anchors, per program; anchoring is the next pass). Added a header note
   that Source Anchors are deferred.
3. This file.

## Claims registered
- **1)** Reasoning and agency are the same training problem, not two. Sources: #271 Brown, #80 Hang/Zhou, #251 Chowdhery.
- **2)** RL is the post-training method that carries a model into production. Sources: #674 Cappelli, #397 Arunagiri.
- **3)** Code is the best domain to scale RL, because its rewards are automatically verifiable. Source: #251 Chowdhery.
- **4)** "You probably don't need fine-tuning" is a legitimate default — until you do. Sources: #482 Corbitt, #598 Aryan.
- **5)** For reasoning quality, the data recipe beats model size. Sources: #233 Marten, #543 She/Shpak, #397 Arunagiri.
- **6)** RL's real cost is operational, not conceptual. Sources: #674 Cappelli, #251 Chowdhery, #475 Crusoe, #230 Han.

All six of the packet's strongest observations survived drafting and were registered.

## Sections drafted
1. Untitled opening — the model is no longer given; post-training is the new center of gravity (#674 "myth of the last mile", #231 post-DeepSeek reasoning moment, #267 bottleneck framing).
2. Behavior is trained in, not prompted in — the post-training menu (#337, #80).
3. Reasoning and agency are the same training problem (#271, #251).
4. Thinking is a training signal that scales (#231, #267).
5. Reinforcement learning is what carries a model into production (#674, #397).
6. Code is the domain where RL scales first (#251).
7. The data recipe beats model size (#233, #543, #397).
8. You probably don't need fine-tuning — until you do (#482, #598).
9. The hard part is operations, not the algorithm (#674, #251, #475, #230).
10. How you know training worked (#506, #558).

All six packet-pre-extracted quotes (#271, #231, #674, #397, #233, #482) used
verbatim with attribution. No other statement is quoted; all other sources are
paraphrased from their notes.

## Packet open questions — resolutions
The packet listed 4 open questions; status after this pass:
- *Ch 1 vs Ch 3 boundary (reasoning-model construction).* → Resolved: training
  *method* lives here (#267, #231 cited for how thinking is trained and why it
  scales); frontier *strategy and rivalry* deferred to Ch 3. #267 cited narrowly
  for the bottleneck framing only — its note does not support an RL-specific claim.
- *Where do model-eval talks (#506, #558) go?* → Resolved: they land here as the
  closing "how you know training worked" section. They may still seed a short evals
  beat in Ch 3; not blocked.
- *How much RL-ops detail (#475, #230) belongs here vs Ch 2?* → Resolved: the
  operational-cost *argument* lives here (section 9), carried mainly by #674 and
  #251; #475 cited narrowly for "distributed training needs a specialized network
  fabric" and #230 for its framing question only. The deep serving/inference
  economics are handed off to Ch 2 explicitly in the section's closing line.
- *Open on DeepSeek R1 (#183) or OpenAI agent-RFT (#080)?* → Resolved: neither as
  the literal hook. #183's note is about the Paper Club format, not DeepSeek, so it
  could not carry an opening and was left out of the prose entirely. Opened instead
  on #674's "myth of the last mile" plus #231's grounded post-DeepSeek beat; #080
  anchors the "behavior is trained in" section.

## Open questions left unresolved
- Claim 3 (code as the RL-scaling domain) rests on a single source (#251). A
  corroborating verifiable-rewards source from the wider corpus would strengthen it
  before it carries weight in a public chapter.
- Five cluster sources were left out of the prose because their notes are pure
  boilerplate and were not read closely this pass: #081 (RL environments at scale),
  #484 (LLM quality optimization bootcamp), #510 (no-code fine-tuning), #481
  (fine-tune 20 Llama models), #678 (self-training agents). They remain in the
  packet cluster. #081 in particular likely supports an "environments are the
  bottleneck" beat and should be read before the next revision.

## Next pass
- `source_anchoring_pass.md` equivalent for book 2 against claims 1–6 — backfill
  Source Anchors (verbatim quote + timestamp + confidence). The six verbatim
  quotes already in the draft/ledger are the natural first anchors.
- Phase 1 drafting for the remaining second-book chapters (Ch 2 onward).
- After all chapters exist: re-run `99_Meta/scripts/build_stats.py` and check
  whether it scopes only to `public/drafting/` (book 1); if so, extend it to
  cover `public/drafting-2/` as a follow-up.
