# Stage 5 — Initial Zoom Out Review

Target: `docs/superpowers/specs/2026-11-15-third-book-design.md` (lines 1–198, full file). Reviewers: `egm-zoom-out`, `egm-inventive-catalyst`. GoldfishContext: none.

## Inventive Catalyst (REVIEW mode — advisory severities only)

Context check passed: the objective (a third book on the SDD/PDLC lifecycle, built on the same Lab, corpus and pipeline) and the reason (the bottleneck has moved) are clear.

### IC-1 — Major — D3 dormant gates (L178; L162; Ch 7 L116)
**False compromise:** repo integrity vs drafting order. Either arm the gates before Ch 7 (drafting blocks on an author-only PAT) or keep them dormant as Ch 7's specimen (repo breaches the anti-goal).
**Resolution:** capture the dormant state now as dated evidence (GATES.md text, a run id showing eleven skipped steps reporting success, an artifact anchor per S1). Arming then becomes a publication gate, not a drafting gate: draft Ch 7 against the captured specimen, arm before ship, add a negative control proving the gates can fail. Ch 7 gains a before/after arc; the anti-goal holds at publication.
**Liabilities:** Ch 7 needs a revision pass after arming; the PAT moves onto the release critical path; the specimen must be labelled historical.

### IC-2 — Major — D1 tool-comparison evidence (L170–174; Q4 L39; Ch 12 L125)
**False compromise:** bake-off (strongest, over budget) vs third anchor class (schema change) vs narrower book, ranked as mutually exclusive.
**Resolution:** segment per change. Route the real changes book 3 already produces (drafting-3 wiring, claims-3, the S1 verifier, gate arming, sitemap work) through different systems — e.g. the verifier through Spec Kit, routes wiring through OpenSpec — and keep their artifacts in the tree. Ch 12's "per team and per change" framing becomes the method; the comparison is anchored in repo artifacts, which Q4 already accepts.
**Liabilities:** a field study, not a controlled experiment (Ch 12 must say so); several tool pipelines in one repo; author's daily superpowers use (S3 L188) biases assignment, so fix the routing rule in advance.

### IC-3 — Major — Pipeline reuse by copying (L144–154; Q5 L40)
**False compromise:** "mirror book 2 exactly" copies per-book files (content-3, bookChaptersThree.ts, sync-third-book.mjs, /third-book routes) and handles the known omissions (README extension, Candidate chapters, sitemap, llms.txt) as a list to remember — the same omissions already persisted for months (L153).
**Resolution:** at the rule-of-three point, make `book-mash-N.toml` (or one book registry) the single source for sitemap entries, routes, chapter data and llms.txt inclusion. Turn each known trap into a gate check with a negative control (fail on `public/drafting-N/README.md`, on empty Candidate chapters, on registered-book routes missing from the sitemap).
**Liabilities:** refactors wiring books 1 and 2 depend on (regression risk to live sites); a wrong abstraction hits all three books; the new checks need their own negative controls.

### IC-4 — Major — Evidence expiry and the "demonstrable" promise (S2 L186; L131–142; Q4 L39)
**False compromise:** log expiry handled as a one-off manual rescue while GitHub retention keeps running; and Q4 promises every claim is demonstrable on a clonable repo, though several incidents rest on platform state a clone does not carry (expired runner logs, GITHUB_TOKEN trigger behaviour, BSD vs GNU stat on hosted runners). "Reproducible from history" (L131) is quietly accepted as "demonstrable".
**Resolution:** (a) the S1 artifact verifier fails any `run`-kind anchor whose captured evidence file is missing; optionally a scheduled job archives logs for every run id in claims-3 before retention closes. (b) Where possible ship a small reproduction per worked example (e.g. old diagrams-check under BSD stat printing "0 stale"), and state per example what the reader can reproduce vs what is preserved evidence.
**Liabilities:** storage for archived logs; the scheduled job can fail silently and needs a negative control; reproductions need maintenance; some incidents (trigger semantics) may not be reproducible, narrowing Q4.

### IC-5 — Major — Two verifiers over one ledger family (S1 L184; claim 3 L99; L140)
**False compromise:** keeping `verify_ledger.py` untouched is bought with a second, separate verifier — two entry points, the very pattern of the L140 worked example ("tests written for both gates, run by nothing"). The gate authors and the book author are the same person, against claim 3 (independence), unaddressed for the new verifier.
**Resolution:** one verifier entry point dispatching on anchor kind; corpus resolver stays as the `corpus` handler; artifact kinds (commit, run, file, range) get handlers; unknown kind is a hard failure; a planted bad anchor per kind as negative control. Record in the S1 ADR.
**Liabilities:** the existing entry point is touched lightly (regression check for books 1–2); some indirection; hard failure on unknown kinds may block ledger work until handlers exist.

### IC-6 — Nit — Sequencing against book 2 (open item 5 L198; S4 L190)
**False compromise:** book 2's depth pass and book 3's drafting framed as strictly ordered though both need hand-curated per-chapter talk lists (L194).
**Resolution:** one classification pass tagging talks for book 2 depth gaps and book 3 chapters at once.
**Liabilities:** a larger single pass; shared criteria can blur chapter boundaries, so the overlap audit (L195) matters more.

### Passed on by the catalyst (outside its lens)
- L20 and L30 still call the five-tool disagreement the book's "spine"; L91 and D1 (L170) replace it with the factory question.
- L176 attributes "per team and per change" to Ch 10; the phrase is in Ch 12 (L125). L188 places the declared-user stance in Ch 10, likely meant Ch 12.
- L190 says "Eleven chapters"; the structure lists twelve (L106–125).
- L36 dates EGM to November; L196 reports the date as unverified (2026-10-22 vs 2026-11-08).

## Zoom Out (REVIEW mode)

Verdict: does not pass yet. 0 Blockers, 6 Majors, 4 Nits. Context check passes. Main problems: three different spines; stale chapter references; the repo has moved past what the spec records.

### ZO-1 — Major — The spec is behind the repo (header L2–4; D/S/open items L164–198)
The spec says "draft, awaiting author approval" and lists D1, S1 and the classification pass as open. The repo has already done most of it:
- `docs/adr/0003-artifact-anchors.md` is accepted.
- `scripts/verify_artifact_anchors.py` exists (S1's sibling verifier).
- `claims-3/Claims Ledger.md`, `book-mash-3.toml`, `website/scripts/sync-third-book.mjs` exist.
- `99_Meta/third-book-classification.json` assigns 133 talks across 12 chapters (open item 1).
- D1's bake-off ran twice; `research_passes/2026-11-16-sdd-bakeoff-round2-results.md` recommends narrowing the book because Spec Kit, OpenSpec and EGM were still not run.
**Fix:** issue a v0.2 recording these outcomes, or mark superseded sections, before anyone approves this version.

### ZO-2 — Major — Three spines (L20 vs Q1 L36 vs L91, L170; claims L95–101)
L20: the tool disagreement is the spine. Q1 (L36): a lifecycle spine. L91 and L170: the factory question. The three claims (L97–99) never mention the factory, yet Part IV and the closer are built on it. Dated add-on sections ("added 2026-11-15, author's steer"; L60) make the spec read like a change log.
**Fix:** fold the reality check and the factory finding into Purpose and the Argument; delete the old "spine" sentence at L20.

### ZO-3 — Major — Commitments to content with no evidence (Goals L158; Ch 3 L111; Ch 6 L115; Ch 12 L125; Claim 3 L99)
The spec measures the three-tool evidence base at zero corpus anchors and zero repo artifacts (L52–58), yet the Goals promise "the five systems are compared on evidence", Ch 3 and Ch 6 are framed around Spec Kit, OpenSpec and EGM, and Claim 3 is framed as "EGM's insight generalized".
**Fix:** the Lab's gate incidents (L133–140) prove Claim 3 alone — restate it as the book's own claim, cite EGM as one example. Make the Goal and Ch 12 conditional on D1's outcome.

### ZO-4 — Major — Stale chapter references (L58, L176, L188)
- L58 says Chapters 3, 6 and 10 lack anchors; Ch 10 (the review wall) is anchored to #1428, #1432, #1195 (L121). The unanchored comparison is Ch 12.
- D2 (L176) quotes "Ch 10's 'per team and per change'"; the phrase is in Ch 12 (L125).
- S3 (L188) says the stance matters "in Ch 10"; it means Ch 12.
These are decision records, so the wrong chapter sends the decision to the wrong place.

### ZO-5 — Major — Reuse section understates new infrastructure (L146 vs S1 L182–184)
L146 lists "claims-ledger format" as shared and unchanged; S1 and ADR-0003 add a second anchor kind and a second verifier.
**Fix:** move the ledger format and verifier to the "New" list.

### ZO-6 — Major — Third copy of per-book wiring (L148; `ThirdBookReader.tsx`, `ThirdBookChapterDetail.tsx` now exist)
"Mirror book 2 exactly" makes the third copy of a per-book sync script, chapter manifest and route set. The traps at L151–154 are exactly the per-copy wiring that gets forgotten.
**Fix:** one parameter-driven sync script, manifest and route set (like the config-driven book-mash, L40); or keep the copy and say why.

### ZO-7 — Nit — Field-level detail in a book spec (S1 L184)
`{kind, ref, date, excerpt}` and the kind enum belong in ADR-0003, which now holds them. Replace with "artifact anchors; see ADR-0003".

### ZO-8 — Nit — Chapter count (S4 L190)
"Eleven chapters at book-2 length" — the structure has 12. "This spec already calls that a defect" seems to mean book 2's spec.

### ZO-9 — Nit — Artifact counts disagree (L38, L56, L142)
"13 specs, 10 plans" in one place, "24 superpowers specs and plans" in another. Use one measured figure.

### ZO-10 — Nit — Undefined term (L36)
"Living Specs in October" is never introduced. Define or drop.
