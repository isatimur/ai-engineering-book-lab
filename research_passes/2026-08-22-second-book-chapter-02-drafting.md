# Second Book — Chapter 2 Drafting Pass — 2026-08-22

## Date
2026-08-22

## Target
Second book, Chapter 2 — Inference Economics. Phase 1 of
`programs/second_book_drafting_pass.md`, run for Chapter 2 only.

## Pass type
Per-chapter bounded drafting (second-book manuscript track). Draft prose into
`public/drafting-2/`, register strongest claims into `claims-2/Claims Ledger.md`.
Source anchoring is a separate future pass and was not done here.

## Split decision
The packet flagged this as the pass's central open question: at ~38 sources
(nearly double any other chapter), the two movements — Serving Performance and
The Compute Substrate — are coherent enough to become two chapters, which would
give Part I five chapters and the book ten.

**Decision: kept unified**, as one chapter in two explicitly titled movements
(`## Movement A — Serving Performance`, `## Movement B — The Compute Substrate`),
closing on a synthesis section that argues why the two are one discipline rather
than two topics. Reasoning: the two movements share one thesis — a model's
cost/speed profile is a system property, set partly by what you control (the
serving stack) and partly by what you don't (the substrate) — and the drafted
chapter argues that thesis in ~2,550 words without padding. Splitting would have
produced two thinner chapters arguing half a claim each, and would have pushed
Part I to 5 chapters against the spec's 3-4 guidance with no corpus pressure
forcing it (unlike Part I's real 4th chapter, "Beyond Text," which came from a
dense cluster the spec didn't anticipate — this split would have been structural,
not source-driven). This stays the single most likely place in the book to grow;
flagged again below for anchoring/revision.

## Inputs used
- `05_Book_Ideas/Second Book - Chapter Packets/02_Inference_Economics.md` —
  packet as committed at Phase 0 (`064b797`): 38-source cluster (28 Movement A,
  10 Movement B), 6 strongest observations, 7 useful quotes, 4 open questions.
- `01_Videos/*.md` notes read this pass (22 of the packet's 38 sources, used in
  the draft): #335, #141, #514, #548, #316, #173, #555, #388, #068, #097, #578,
  #007, #670, #582, #307, #147, #228, #402, #345, #547, #361, #211.
- `claims-2/Claims Ledger.md` (already had entries 1-6 from Chapter 1) and
  `claims-2/README.md` — ledger format; continued numbering from 7.
- `website/src/content/chapter-01.md`, `chapter-02.md`, `chapter-03.md` — book 1
  voice reference only.
- `public/drafting-2/README` — confirmed output location and filename
  convention.

## Outputs changed
1. `public/drafting-2/Chapter 2 — Inference Economics.md` — full draft, ~2,550
   words, opening + 11 titled sections across two movements + closing synthesis.
2. `claims-2/Claims Ledger.md` — appended claims 7-12.
3. This file.

## Claims registered
- **7)** Inference, not training, is the largest and most contested market in AI
  software. Sources: #335 Atallah, #316 Frye.
- **8)** A model's speed and cost are a system property, not a model property.
  Sources: #141 Kranen, #514 Moyou, #548 Dzhulgakov.
- **9)** On-device inference is crossing from demo to default. Sources: #670
  Canuma, #007 Grondin, #582 Hood/Tunney, #307 Ning.
- **10)** Compilers and generated kernels are automating the expert layer of
  inference optimization. Sources: #388 Fioti, #068 Serrino, #097 Olokoba, #578
  Lattner.
- **11)** The compute substrate is a hard constraint — and now a geopolitical
  variable. Sources: #228 Frye, #402 Gilbert, #345 Patel, #547 Madra.
- **12)** Trust and confidentiality are becoming first-class inference
  requirements. Sources: #361 Bursell, #211 Yadav/Ganesan.

All six of the packet's strongest observations survived drafting and were
registered (continuing the ledger's numbering as 7-12).

## Sections drafted
1. Untitled opening — inference as the recurring cost that follows training;
   Atallah's "largest market" framing sets the stakes (#335).
2. Movement A intro / **Speed and cost are a system property, not a model
   property** (#141, #514, #548).
3. **The serving stack is the lever** (#316, #173, #555, #548).
4. **Compilers and generated kernels are automating the expert layer** (#388,
   #068, #097, #578).
5. **Inference is moving onto the device** (#007, #670, #582, #307).
6. **The tightest budget is real time** (#147) — explicitly seamed to Ch 4
   rather than treated in depth here.
7. Movement B intro / **Underneath the stack is a substrate that sets the
   ceiling** (#228, #402).
8. **The substrate is contested — in silicon and in geopolitics** (#547, #345).
9. **Trust is becoming a first-class inference requirement** (#361, #211).
10. Closing synthesis — **Inference is the discipline, not the afterthought** —
    argues why Movements A and B are one chapter's claim, not two, and hands off
    to Chapter 3 (who can afford to build at the frontier).

All seven packet-extracted quotes are used verbatim with attribution (#335,
#141, #670, #097, #361, #547, #402). No other source is quoted; all others are
paraphrased strictly from their notes.

## Packet open questions — resolutions
The packet listed 4 open questions; status after this pass:
- *Split or not?* → Resolved: kept unified (see Split decision above).
- *Voice-serving talks (#147, #280, #293) sit at the seam with Ch 4.* →
  Resolved as instructed: only #147 (Gabber, $1/hr voice serving) is cited, and
  narrowly, for the *economics* point (tightest latency budget), with an
  explicit sentence handing voice-model architecture to Ch 4. #280 and #293 were
  left uncited here — the packet's cluster is enough without them, and Ch 4
  owns the architecture side.
- *Vendor-shaped talks (#470, #548, #488, #494) — use for numbers, not spine.*
  → Resolved: #548 is cited once, for its concrete "~10x faster" figure, inside
  a paragraph whose spine is Kranen (#141) and Moyou (#514), not Dzhulgakov.
  #470, #488, #494 were not cited — no claim in the draft needed their numbers.
- *How much low-level GPU detail (#228, #575, #213) does the audience need?*
  → Resolved: set a shallow ceiling. #228 is cited once for the "engineers now
  need to understand the GPU underneath" claim, at the level of the claim, not
  implementation detail. #575 and #213 (both genuinely low-level: kernel bug
  fixes, GPU profiling internals) were left out entirely as past the depth
  ceiling for this book.

## Open questions left unresolved
- 16 of the packet's 38 sources were not cited: #470, #575, #576, #298, #544,
  #494, #530, #257, #280, #293, #593, #025 (Movement A) and #213, #139, #466,
  #488 (Movement B). Most are vendor-numbers or architecture-adjacent talks
  the chapter didn't need; #139 ("Why We Don't Need More Data Centers") is a
  genuine counter-argument to claim 11's "substrate is a hard constraint" and
  should be read closely before the anchoring pass — it may deserve a caveat
  or a dissenting voice in a revision.
- Claim 9 (on-device: "demo to default") leans on vendor/framework advocates
  for on-device computing (Canuma, Hood/Tunney, Ning are all building the thing
  they're promoting). Flagged as a caveat in the ledger; worth a corroborating,
  non-vendor source if this claim needs to carry more weight later.
- The chapter came in at ~2,550 words, similar to Chapter 1's ~2,900 — both
  chapters are landing under the 3,000-5,000 aim because sourcing discipline
  (only cite what a note actually supports) is the binding constraint, not
  section count. Worth watching whether every chapter in this manuscript lands
  short, which would say something about the corpus rather than about drafting
  effort.

## Next pass
- `source_anchoring_pass.md` equivalent for book 2 against claims 1-12 —
  backfill Source Anchors. The seven verbatim quotes already in this draft/
  ledger are the natural next anchors after Chapter 1's six.
- Phase 1 drafting for Chapter 3 (Building Frontier Models, 19 sources) onward.
- Re-read #139 before any revision pass touches claim 11 — it is a direct
  counter-argument the current draft does not engage with.
