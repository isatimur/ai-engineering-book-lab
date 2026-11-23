# Stage 6 — Comprehension Test

Target: `docs/superpowers/specs/2026-11-15-third-book-design.md`. FeatureRange 1–198 (file has 199 lines), DetailedRange N/A. Reviewer: `egm-comprehension`, document alone, no other repo files.

**What this proposes**

A third book in the same repo as books 1 and 2. Its subject is spec-driven development and the product/software lifecycle once agents do most of the building. Its thesis is that the bottleneck has moved from generating code to specifying, reviewing, gating and shipping it, and that the lifecycle has not caught up. The structure follows lifecycle stages in 12 chapters across a framing chapter and four parts. The repo's own incidents serve as worked examples, and five SDD systems (Spec Kit, OpenSpec, EGM, superpowers, Pocock's skills) are discussed at the stage where each fits. After an evidence count showed the corpus cannot support a five-way tool comparison, the document recommends making the "software factory" debate the spine (35 talks) instead. It leaves three decisions to the author (D1 evidence for the tool comparison, D2 audience, D3 dormant CI gates) and records four as settled by the "builder", including a new artifact-anchor type for the claims ledger and a 3,500–4,500-word chapter target.

**How the existing system works, per this document**

One repo holds books 1 and 2, each a manuscript track (`public/drafting-N/`, `book-mash-N.toml`) built by a config-driven engine (book-mash/mash-core) into a website. Claims are recorded in a claims ledger that anchors each claim to a video id, timestamp, verbatim quote and confidence. `verify_ledger.py` checks quotes against a mirror of 1,458 talk transcripts (the "corpus"). The repo, called "the Lab", has been built in public over 18 months using the superpowers workflow, and has accumulated specs, plans, research passes, ADRs and CI gates. Several of those gates are vacuous or dormant: they pass while checking nothing, for example because `CORPUS_TOKEN` is missing.

## Findings

No Blockers: every section could be paraphrased. 6 Majors, 6 Nits.

### CO-1 — Major — The spine contradicts itself (L20, L30, L91, L158, L170; Structure L103–127)
"Why now" says the tool disagreement "is the book's spine, not a sidebar" (L20); Goals (L158) still promise "the five systems are compared on evidence". L91 says the factory "reframes the book's destination" as if decided, but D1 (L170) calls it a recommendation awaiting the author. A new reader cannot tell which sections are current. Mark superseded sections or rewrite them.

### CO-2 — Major — Stale chapter numbers (L58, L176, L188)
L58: "Chapters 3, 6 and 10" lack anchors, but Ch 10 (L121) is the review wall, anchored to #1428, #1432, #1195; the tool comparison is Ch 12. D2 (L176) quotes "Ch 10's 'per team and per change'" — that is Ch 12 (L125). S3 (L188) "reads very differently in Ch 10" also means Ch 12. Numbering likely changed when Part IV was added.

### CO-3 — Major — Chapter count and an unclear referent (S4 L190)
"Eleven chapters at book-2 length" contradicts the 12 in Structure. "This spec already calls that a defect needing a depth pass" — this spec never says so; it probably means book 2's spec (cf. L198).

### CO-4 — Major — Undefined project terms (L8 and throughout)
"the Lab", "the corpus" and "the Method" are never defined. The corpus can be partly inferred (L45); the Lab only by inference; the Method not at all. They carry the core claim (Q4, "a repo the reader can clone"). It is unclear whether the corpus is part of what the reader can clone, which decides whether Q4 holds for corpus-anchored claims.

### CO-5 — Major — Roles undefined: builder, model, author (L37, L43, L45, L60, L166, L180, L184)
"Builder review", "builder check" (a builder figure of 84 that could not be reproduced), "model's call" (Q2, S1), "Settled by the builder". A reader cannot tell whether builder and model are the same agent, what a builder review is, or what authority "settled by the builder" carries when S1 still needs an ADR. One sentence on who drafts, reviews and approves would fix it.

### CO-6 — Major — Pipeline vocabulary undefined (L141, L146–154, L178, L186, L194, L198)
book-mash, mash-core, corpus-sync, claims ledger / `claims-3`, anchor verification gates, "evidence panel", "Candidate chapters", "depth pass", "classification pass", "research passes", `gen-sitemap.mjs`, `sync-third-book.mjs`, `docs/GATES.md`. The evidence panel matters to two traps and a worked example (L141, L152) and is never explained. Add a short glossary or links.

### CO-7 — Nit — "Living Specs in October" (L36)
Not in the five-system table, never defined: a sixth system or a feature of one of the five?

### CO-8 — Nit — Worked examples assume the incident (L135–142)
"behind that green tick" (L136) presumably the diagrams-check gate, unstated; "Tests written for both gates" (L140) — which two?; "1458-note corpus" (L137) says notes where elsewhere it says talks.

### CO-9 — Nit — Counts (L38 vs L56)
"13 specs, 10 plans" = 23, but L56 says 24. "10 programs" (L38) undefined.

### CO-10 — Nit — External context without links (L5, L40, L41)
"book 2's Q4 decision", the diagram "semantic slots" (red/amber/purple), book 2's spec. Link them.

### CO-11 — Nit — Dates and citations (L16, L26, L36, L196)
EGM dated "2026-10/11" (table) and "November" (Q1); open item 3 flags the inconsistency but earlier lines state it as fact. DX and McKinsey (L16) carry no talk numbers, unlike every other corpus citation.

### CO-12 — Nit — "Narrow it" premise (D1 L174)
The two systems the Lab "actually runs" are presumably superpowers and Pocock's skills, but L56 says Pocock's skills are only "installed", not run.
