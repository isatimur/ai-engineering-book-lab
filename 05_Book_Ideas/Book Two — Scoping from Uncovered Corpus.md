# Book Two — scoping from the uncovered corpus

**Question asked:** what is in the AI Engineer corpus that *From Copilot to
Colleague* does not use, and is any of it a book?

**Method:** every note in `01_Videos/` (1047) checked against the Claims Ledger's
wikilinks, then bucketed by domain keyword. Coverage = share of a bucket's talks
the ledger cites. Counts are measured, not estimated; regenerate with the query in
`research_passes/2026-08-20-book-two-coverage.md`.

## The measurement

| Body of work | Talks | Cited by book 1 | Coverage |
|---|---|---|---|
| **Training side** (post-training, RL, continual learning, fine-tuning, serving, inference) | 51 | 0 | **0%** |
| **Health / bio** | 22 | 0 | **0%** |
| Robotics / edge / embodied | 36 | 1 | 3% |
| Generative media (video, image, music, games) | 22 | 1 | 5% |
| Science / research automation | 21 | 2 | 10% |
| Finance | 19 | 2 | 11% |
| Legal | 15 | 3 | 20% |

Corpus-wide: **113 of 1047 talks are cited; 934 are not.** But most of that 934 is
*depth inside themes book 1 already covers* (472 uncited Coding Agents talks do not
imply a missing book). The signal is in the buckets above, where coverage is near
zero because book 1's thesis **structurally excludes them**, not because the author
ran out of room.

## Why the gaps exist (and why that is a feature)

Book 1 argues the dependability of an AI system comes from the scaffolding *around*
the model — harnesses, evals, context, runtimes, security — and is deliberately
model-agnostic: "every concrete technology in this book will be replaced." Two
consequences follow directly:

1. It cannot talk about **changing the model itself**. The 51-talk training-side
   body is not an oversight; it is the other side of the same coin.
2. It stays **domain-neutral**. Chapter 7 handles high-stakes trust in the
   abstract; it never asks what changes when the stakes are a patient, a trade, or
   a robot arm.

## Candidate theses

### B2-A — *The Model Learns Back* (training side)
The frontier moved from "prompt a fixed model" to "the model keeps learning."
Evidence body: 51 talks, 0% covered, and unusually fresh — continual learning
appears as a named track only in the newest wave (#1003, #1004, #1007, #1008 Sara
Hooker/Adaption Labs, #1010), alongside post-training as an engineering discipline
(#851, #967, #974, #975, #977) and RL environments (#970, #978).
- **Strength:** genuinely uncovered, currently forming, and it directly challenges
  book 1's own framing — if models learn on the job, does the scaffolding thesis
  weaken? A sequel that argues with its predecessor is a real book.
- **Risk:** different audience (ML/infra rather than product engineers), and the
  fastest-rotting subject matter in the corpus. Book 1's durability came from
  refusing to depend on model specifics; this book depends on them entirely.

### B2-B — *High Stakes, Real Domains* (applied vertical AI)
What changes when an agent enters a regulated or physical domain. Evidence body:
health/bio 22 + finance 19 + legal 15 + science 21 ≈ 77 talks, 0–11% covered, and
the newest wave contains a whole healthcare track (#1030–#1039) including
production scale (#1034 "200 million patient interactions later"), shipping without
A/B tests (#1032), and domain protocol as harness (#1035 "X12 as the harness").
- **Strength:** same audience as book 1, complements rather than competes, and one
  talk (#1036, "trading desks to clinical trials: parallels in applied vertical
  AI") already argues the cross-domain thesis for us. Verticals also age slower
  than model internals — regulation outlives frameworks.
- **Risk:** risks becoming a case-study anthology. Needs a spine as strong as book
  1's scaffolding stack, or it is a conference proceedings in hardback.

### B2-C — *The Delivery Problem* (FDE + org patterns)
The 9-talk forward-deployed-engineering cluster plus org material. **Not
recommended as a book:** it is one strong chapter, already contested (see
`claims/Candidate Claims — corpus 795-1013.md` C1), and it belongs in book 1's
Chapter 9 lineage rather than a volume of its own.

## Recommendation

**B2-B, with B2-A as its opening argument.** Verticals give the durable spine and
the shared audience; the training-side material earns a strong early chapter
("the model is no longer fixed") that explains why domain constraints now bind
harder, not softer. That ordering also keeps the fastest-rotting material where a
reader can skip it.

## Open questions for the operator

1. Is book 2 the same author voice and evidence machine (claims ledger, anchors,
   panel scoring), or a different format?
2. B2-B needs domain access, not just talks — practitioner interviews in at least
   health and finance. Is that in scope?
3. Book 1 is unfinished (10 chapters drafted, audiobook interim, launch partial).
   Does book 2 scoping wait, or run in parallel deliberately?

## Not claimed here

No thesis above is anchored yet. The counts are verifiable; the *arguments* are
mine and need the same source-anchor discipline as book 1 before any of it ships.
The uncited-934 figure must not be repeated as "934 talks of unused material" —
most of it is depth in covered themes.
