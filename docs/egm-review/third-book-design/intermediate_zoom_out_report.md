# Stage 8 — Intermediate Zoom Out

Target: `docs/superpowers/specs/2026-11-15-third-book-design.md`, full file. Reviewer: `egm-zoom-out`, with the Stage 5–7 reports as input. The document was not edited between stages (uninterrupted mode).

Verdict: does not pass. 0 Blockers, 4 Majors, 2 Nits. Most work proposed in Stages 5–7 should shrink or be dropped: much of it re-solves what the repo has already decided or built.

The reviewer checked these repo files read-only; the orchestrator confirmed they exist:
`docs/adr/0003-artifact-anchors.md`, `scripts/verify_artifact_anchors.py`, `scripts/check_claims_integrity.py`, `research_passes/2026-11-16-book3-worked-example-capture.md` (log expiry ~2027-02-13), `research_passes/2026-11-16-sdd-bakeoff-round2-results.md`, `research_passes/2026-11-16-book3-corpus-classification.md`.

## (a) Altitude issues the earlier stages missed

### Z8-1 — Major — Supersede v0.1; do not patch it (header L2–4; whole doc)
Stages 6–7 raised ~60 findings against v0.1 as if it were live. One v0.2 rewrite recording what is decided (ADR-0003 accepted; sibling verifier and `check_claims_integrity.py` exist; 133 talks classified across 12 chapters; worked-example capture pass exists; two bake-off rounds ran) removes the three-spine problem (DE-1, ST-3, CO-1), the stale chapter numbers (ZO-4, CO-2, ST-4, SY-1), S1's status (DE-6, ST-5, ZO-5) and most of ST-7 without separate fixes.

### Z8-2 — Major — The approval gate was bypassed (L2 "awaiting author approval"; L27; L162)
ADR-0003, `claims-3`, `book-mash-3.toml`, `sync-third-book.mjs`, the book-3 reader components and two bake-off rounds were built while the spec still awaited approval. The spec credits superpowers with "a hard stop before any code" (L27) and its anti-goal forbids "a book whose own repo does not follow the practice it recommends" (L162). v0.2 should say in one sentence whether this is a Ch 2/Ch 4 worked example or a process defect.

### Z8-3 — Major — D1 already has its evidence (L168–174; Goals L158; Ch 12 L125)
The round-2 bake-off compares the control arm, Pocock's skills and superpowers on measured cost and outcome (+30% tokens, +50% wall time for identical scorecards) and recommends narrowing. "Narrow it" is the evidence-backed option. Goal restatable today: "the systems the Lab ran are compared on bake-off evidence; the rest are reported positions." D1 shrinks to one author yes/no.

### Z8-4 — Major — S4's length target expands scope unchallenged (L190; L198)
12 × 3,500–4,500 words = 42–54k, while book 2's depth pass is unstarted, D1 narrows the comparison, and Ch 3 and Ch 6 rest on systems with zero corpus anchors. Set length per chapter after classification; consider folding Ch 12 into Ch 11 if D1 narrows.

### Z8-5 — Nit — This review is itself an EGM artifact in the Lab (L54, L56, L174)
Once `docs/egm-review/` exists, "the two systems the Lab actually runs" becomes three, reopening Ch 6 and Ch 12. Decide explicitly whether these artifacts count as Ch 6 evidence.

### Z8-6 — Nit — Q4's literal wording drives several fixes (L39)
DE-9, IC-4 and DE-7 follow from reading "every claim is demonstrable on a repo the reader can clone" literally. Restating Q4 as "every claim cites a corpus talk or a captured repo artifact" matches ADR-0003's capture model and makes those fixes unnecessary.

## (b) Proposed mitigations: keep, shrink, drop

**Drop**
- IC-5 (one dispatching verifier): ADR-0003 already chose two verifiers run by `check_claims_integrity.py` with a shared `parse_anchors`.
- DE-7 (content hashes, durable tags, fail-vs-warn): ADR-0003 has pass/fail/unverifiable, validates `ref`, treats environment errors as failures; `excerpt` is the integrity check; a hash written by the same author does not stop author edits. Point to ADR-0003.
- DE-8 (per-incident expiry table in the spec): the capture pass already has it. Cite in one line.
- IC-4(a) (scheduled log-archive job): ADR-0003 requires capture at anchor-writing time; the job would need its own negative control. YAGNI.
- IC-2 (route book-3 changes through different tools): two bake-off rounds ran; D1 is narrowing.
- IC-3 / ZO-6 (book registry + per-trap gates): the traps are already avoided (`public/drafting-3/README` has no extension; `gen-sitemap.mjs` includes book 3). A refactor of two live books belongs in a separate engineering ADR. In v0.2: "mirrored; consolidation deferred."
- DE-6 (move S1 to author decisions): ADR-0003 is accepted. Replace S1 with a pointer.
- ST-N8 and DE-5's owner columns: one author; ceremony without information.

**Shrink**
- ST-1 / DE-4 Alternatives section → a "rejected" clause in each Q row (L36–41); S1's alternatives are in ADR-0003.
- ST-2 / DE-5 Risks section → a five-bullet list: tool churn, book-2 depth pass competing for time, dormant gates (D3), overlap with book 1, author bias (S3).
- CO-4/5/6 glossary → one context paragraph defining Lab, corpus, Method and the builder/model/author roles, linking README and ADRs; one clause for "evidence panel".
- DE-9 → cite the corpus-classification pass; if it does not cover the factory terms, one command note. Keep SY-2's softening.
- IC-4(b) reproductions → a "reproducible vs preserved" note per worked-example row (also covers SY-3).
- DE-N9 → keep the tool table in place, labelled "as of 2026-11, secondary sources (open item 3)" (also covers SY-4).

**Keep**
- IC-1: capture the dormant-gate state now; arming becomes a publication gate. Settles D3.
- ZO-3 / DE-10: ground Claim 3 in the Lab's gate incidents; EGM as one example.
- ZO-2: fold the factory section into Purpose and the Argument (part of Z8-1).
- IC-6: one classification pass for book 2 and book 3.
- Consistency fixes: counts (ZO-9), "Living Specs", "Eleven chapters", EGM date, "both gates", llms.txt in open items (DE-N6).
- SY-N style nits as editing during the rewrite, not tracked items.
