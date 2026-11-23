# Stage 7 — Critic Review

Target: `docs/superpowers/specs/2026-11-15-third-book-design.md`, FeatureRange 1–198. Reviewers: `egm-design`, `egm-structural`, `egm-style` (direct dispatch, uninterrupted mode). Standard for design and structural: `feature-spec-standard.md`.

## Structural (REVIEW mode)

Verdict: does not pass the standard as written. 0 Blockers, 7 Majors, 9 Nits. Most Majors share one cause: builder-review changes were added without updating the sections they replace.

Heading map: H1 (L1); Purpose (L10) › Why now (L18); Anchoring decisions (L32); Evidence reality check (L43) › The software factory (L62); The argument (L93); Structure (L103, parts are bold pseudo-headings); Worked examples (L129); Pipeline reuse (L144); Goals/non-goals/anti-goals (L156); Decisions the author must make (L164); Settled by the builder (L180); Open items (L192). No skipped levels.

### ST-1 — Major — No "Alternatives Considered" section (whole doc; pieces at L36, L37, L41, L170–174)
The standard's Alternatives Rule makes this mandatory. Rejected options are scattered (Q1 tool-by-tool / field guide; Q2 enterprise audience; Q5 sibling repo; D1 still open). "Lab-artifact-driven" (L36) is absorbed into the hybrid with no rejection rationale; Q1 partly rests on "Author picked this over a field guide" rather than a trade-off; Q6 (L41) gives no alternatives. Add one section listing each rejected design with a concrete trade-off.

### ST-2 — Major — No "Risks & Mitigations" section (risks at L43–60, L168–178, L186, L194–198)
Real risks are identified — missing tool evidence, dormant gates, Actions log expiry, overlap with book 1, author bias (S3), unverified primary sources — but none is paired with a mitigation in one place. Some have none (overlap with book 1 is only deferred to an open item).

### ST-3 — Major — Superseded spine not updated (L20, L30 vs L91, L170)
Purpose/Why now still states the old thesis; the correction arrives 70+ lines later. Revise L18–30 or mark superseded.

### ST-4 — Major — Wrong chapter cross-references (L58, L176, L188, L190)
L58 "Chapters 3, 6 and 10" — Ch 10 is the review wall; Ch 12 is the comparison and is left out. L176 and L188 mean Ch 12. L190 "Eleven chapters" vs twelve listed (L106–125).

### ST-5 — Major — Pipeline reuse contradicts S1 (L146 vs L182–184)
"claims-ledger format" listed as "Shared, unchanged"; S1 extends it. The new verifier and the required ADR are missing from "New" (L148).

### ST-6 — Major — "The software factory" under the wrong parent (L62)
Nested under the evidence audit, but it reframes the book's destination (L91) and introduces Part IV. Make it an H2 or fold it into Purpose / The argument.

### ST-7 — Major — Open items omit work the spec sends to the plan (L192–198 vs L178, L184, L186)
Missing: S2's remaining evidence capture ("at the front of the implementation plan"), the S1 ADR (a prerequisite for `claims-3`), and D3's CORPUS_TOKEN PAT dependency.

### ST-N1 — Nit — Section order (L156): Goals/Non-goals should follow the problem, before Structure.
### ST-N2 — Nit — "Purpose" (L10) is the problem statement but not labelled as one.
### ST-N3 — Nit — Counts (L38, L56, L142): 13 + 10 = 23 vs "24".
### ST-N4 — Nit — Ambiguous back-references: L45 "the section above" (the comparison is in Why now, L22); L98 "the table above" (five tables precede it); L190 "this spec" (means book 2's).
### ST-N5 — Nit — Revision notes inside headings (L43, L62); header still says v0.1 after revision. Use a revision log.
### ST-N6 — Nit — Empty header cell (L76) `| | talk |`; add e.g. "role".
### ST-N7 — Nit — Uneven tool-table rows (L22–28): version/date and licence only for three of five.
### ST-N8 — Nit — Two decision registers in different formats (Q table L34–41 vs D/S paragraphs L166–190); "the model's call" appears in Q2 and S1. One format with an owner/status column.
### ST-N9 — Nit — Part labels in Structure are bold text, not H3s (L105, L108, L113, L118, L123).

(EGM launch-date inconsistency L26/L36/L196 already flagged by the spec at L196; not raised separately.)

## Style (REVIEW mode)

Verdict: 0 Blockers, 9 Majors, 9 Nits. The Majors are mostly claims that contradict the document's own numbers or chapter list.

### SY-1 — Major — Stale chapter references and count (L58, L176, L188, L190)
Same as ST-4 / ZO-4 / CO-2.

### SY-2 — Major — CALIBRATE: rankings contradict the document's counts (L64, L91)
L64 calls the factory "the best-anchored seam in the whole book", but L58 gives the lifecycle spine 62 talks vs the factory's 35. "Better than the tool comparison by an order of magnitude": 35 is ~1.75× superpowers (20) and ~2.7× spec-driven (13); only OpenSpec (2) and Spec Kit/EGM (0) are an order lower. L91 says the corpus "has never heard of" the five tools, but L51–52 count 20 and 2. Replace ranking words with the measured numbers ("35 talks, against 0–2 for three of the five tools").

### SY-3 — Major — CALIBRATE: reproducibility over-claimed (L131, L186)
L131: incidents are "real, dated, and reproducible from the repo's history". L186: Actions logs expire after 90 days, only `diagrams-check` is captured, the rest is outstanding — yet its heading says "Evidence capture was urgent and is done". Narrow L131 ("dated; evidence captured for diagrams-check, pending for the rest") and retitle S2 ("Evidence capture started; one incident done").

### SY-4 — Major — CALIBRATE: unverified vendor facts stated as fact (L24–26, L36)
L196 says Spec Kit/OpenSpec/EGM claims rest on secondary coverage, but the table states versions, dates and descriptions unqualified ("1.0.0, 2026-08-21", "Radar 'Trial', 2026-11", "2026-10/11", "generates the implementation rather than guiding it"); L36 says "EGM in November" vs L26 "2026-10/11". Mark "(secondary; unverified, see Open item 3)" and align L36 with L26.

### SY-5 — Major — Artifact counts disagree (L38, L56, L142)
Same as ZO-9 / CO-9 / ST-N3.

### SY-6 — Major — Points to a claim not in this document (L190)
"This spec already calls that a defect" — the judgment is in book 2's spec (cf. L198). Name the source.

### SY-7 — Major — CALIBRATE: universal claim without a survey (L39)
"Competing material is vendor documentation or opinion; none of it ships its own evidence." Narrow to the material reviewed, or drop "none of it".

### SY-8 — Major — Terms without definition (L36, L37, L41, L45, L140, L166)
"Living Specs" (L36); "the practical half that was explicitly asked for" (L37 — which half, asked by whom); "Open to the diagram pass" (L41); "builder check/review" (L45, L60, L166, L180) and who the builder is; "Tests written for both gates" (L140 — which two). Define on first use.

### SY-9 — Major — Goal conflicts with the recommendation (L158 vs L170, L174)
"The five systems are compared on evidence" will be wrong whichever D1 option is chosen. Mark it dependent on D1.

### SY-N1 — Nit — "honest" as intensifier (L30, L89, L110, L125, L174); on L174 it implies the other D1 options are dishonest.
### SY-N2 — Nit — "actually" as filler (L116, L121, L142, L174, L191); keep verbatim titles (L79).
### SY-N3 — Nit — Other filler (L20 "real", L74 "More importantly … not merely", L148 "exactly", L178 "Both defensible;").
### SY-N4 — Nit — Metaphors (L30 "the crack", L64 "seam" in three senses, L101 "scars", L176/L195 "the author's word"). Use literal terms.
### SY-N5 — Nit — CALIBRATE "for months" (L135, L153): give the date range or run count (L136 has 57 days; S2 has run data).
### SY-N6 — Nit — Aphorisms in "What it demonstrates" (L135, L139): state what each incident shows.
### SY-N7 — Nit — Unsourced quantities (L97 "Most teams", L99 "usually isn't"): name expected supporting talks or keep visibly hypothetical.
### SY-N8 — Nit — Citation format (L16): Reock/DX and McKinsey lack talk ids.
### SY-N9 — Nit — "All eight worked examples are repo incidents" (L182): the eighth row (L142) is a count comparison.

KEEP (evidence-backed, not reported): L60 correction 84 → 62; measured figures at L186; L37's bold disclosure that Q2 was the model's call.

## Design (REVIEW mode)

Verdict: not ready to approve. 2 Blockers, 8 Majors, 9 Nits. Standard coverage: Problem present (L10–16); Goals present but see DE-2; Architecture present but inconsistent; Alternatives missing; Risks missing.

### DE-1 — Blocker — Three spines, none settled (L20, L36, L91, L103–125, L170)
L20: tool disagreement is the spine. Q1 (L36): "Lifecycle spine" recorded as decided. L91 and D1 (L170): factory as spine, calling the tool spine what the spec "originally" had. Structure (L103–125) still follows the lifecycle with the factory in Part IV. Q1, Structure and D1 contradict each other.
**Fix:** pick one spine; rewrite Why now and Q1 to match (or mark superseded); make Structure reflect it; keep D1 only for how Ch 12's comparison is anchored.

### DE-2 — Blocker — A goal the spec's own evidence cannot meet (L158 vs L45–58, L168–174)
"The five systems are compared on evidence rather than on preference" — the reality check finds no corpus anchor and no repo artifact for three of five. "Narrow it" drops the goal; "third anchor class" weakens it.
**Fix:** make the goal conditional on D1 or restate it (e.g. "the systems the Lab runs are compared on evidence; the others are reported positions"). Do not approve Goals until D1 is decided.

### DE-3 — Major — Stale chapter numbering (L58, L176, L188, L190)
Same as ST-4 / SY-1. Also recompute S4's length arithmetic.

### DE-4 — Major — No Alternatives section
Same as ST-1, plus: no alternatives for S1's anchor schema (e.g. mirror artifacts into transcript-like evidence notes so `verify_ledger.py` works unchanged), the palette, or a separate repo/branch for book 3. S1 is "settled, not asked" with nothing weighed.

### DE-5 — Major — No Risks section; several risks unmitigated
Same as ST-2, plus: tool churn during drafting (three releases in one research window, L36); book 2's unstarted depth pass competing for author time (L198); the 3,500–4,500 word target inviting padding if classification is thin (L190); no effort/schedule estimate (12 chapters ≈ 42–54k words; bake-off unbudgeted, L172). Add trigger, impact, mitigation, owner per risk.

### DE-6 — Major — S1 is a schema decision labelled "settled, not asked" (L146 vs L182–184; D1 L173)
L146 says the ledger format is unchanged; S1 extends it with an ADR — the same kind of decision D1's second option escalates to the author. Fix L146; move S1 to author decisions or justify why it needs no author.

### DE-7 — Major — Artifact-anchor failure modes (S1 L184)
`run` refs stop resolving after 90-day log expiry, so the verifier falls back to captured files written by the author and checked by the author's verifier — the self-review failure Claim 3 (L99) warns against. `commit` refs can be orphaned by rebase/squash/force-push. `excerpt` has no integrity check. No negative control for the new verifier, though Ch 7 argues gates must be able to fail.
**Fix:** specify fail-vs-warn on unresolvable anchors; content-hash captured evidence; make SHAs durable (tags/refs); require a negative-control test.

### DE-8 — Major — Evidence loss still happening (S2 L186; L135–142)
Only `diagrams-check` is captured. 0-of-30 bot deploys, the `stats-regen` race, the skip-CI marker, "tests run by nothing", the 57-day exposure all depend on runs that may be expiring. No per-incident list of run IDs and expiry dates.
**Fix:** a table per incident (source runs, earliest expiry, capture status); any capture due within 90 days is work now, not a plan item.

### DE-9 — Major — The counts behind the spine change are not reproducible (L45–60, L64–72, L89)
No query, file set, case rule or command for the spec's own figures, against Q4's "every claim is demonstrable". "factories" alone likely over-counts. Comparative claims at L64 conflict with 62 (SDLC/PDLC) and with superpowers (20) / spec-driven (13). Open item 1 hand-curates SDLC hits, but the factory count drives a structural decision without curation.
**Fix:** record the exact search commands (e.g. in a research pass); hand-classify the 35 factory hits; soften the comparisons.

### DE-10 — Major — Claim 3 credited to an unverified vendor system (L26, L99, L115)
"This is EGM's insight generalized" — EGM has zero corpus talks, no Lab artifacts as measured, an unconfirmed date (L196), and a Google attribution without a primary source (L26). Ch 6 rests on it and is flagged unanchored (L58).
**Fix:** ground Claim 3 in the Lab's incidents (L135–140); cite EGM as one instance only after open item 3; mark the table facts (L22–28) unverified until then.

### DE-N1 — Nit — "Living Specs" undefined; "EGM in November" vs L26 and L196 (L36).
### DE-N2 — Nit — 13 + 10 ≠ 24 (L38, L56, L142); "18 months in public" (L38) has no artifact.
### DE-N3 — Nit — Reock (DX) and McKinsey quoted without talk ids (L16).
### DE-N4 — Nit — "Author picked this", "model's call" are not technical rationale (L37, Q1).
### DE-N5 — Nit — Orange `#c2410c` sits close to the reserved amber and red slots (L41); state the contrast check or flag for the diagram pass.
### DE-N6 — Nit — `llms.txt` / `llms-full.txt` decision (L154) missing from open items.
### DE-N7 — Nit — "Tests written for both gates" — which two (L140).
### DE-N8 — Nit — D3's `CORPUS_TOKEN` PAT: scope, rotation, owner not covered (L178); L146 lists the dormant gates as shared infrastructure.
### DE-N9 — Nit — The version-pinned "Why now" table (L22–28) is the dated detail the anti-goal (L162) warns against; move to an appendix or research pass. L54 "Elephant-Goldfish: 0" and L56 "no EGM artifacts" will need re-measuring once this review's artifacts exist in the repo.
