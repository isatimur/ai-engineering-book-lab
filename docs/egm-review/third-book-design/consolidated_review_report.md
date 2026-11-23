# Consolidated Review — Third Book Design Spec (v0.1)

Target: `docs/superpowers/specs/2026-11-15-third-book-design.md` (198 lines).
Mode: consolidated report, uninterrupted. Stages 5–8 ran. **Stage 9 (implementation readiness) was skipped**: the spec has no implementation plan section, so DetailedRange is N/A.
GoldfishContext: none (the spec has no markdown links).
Reviewers, each in a fresh context: zoom-out, inventive-catalyst, comprehension, design, structural, style, zoom-out (intermediate).

Stage reports: `zoom_out_report.md`, `comprehension_report.md`, `critic_report.md`, `intermediate_zoom_out_report.md`.

## Bottom line

Do not approve v0.1. Its main defect is not any single line: **the repo has moved past it.** ADR-0003 is accepted, the artifact verifier and `check_claims_integrity.py` exist, 133 talks are classified across 12 chapters, the worked-example evidence is captured, and two bake-off rounds have run — yet the spec lists all of these as open. Most of the 70-odd raw findings are symptoms of that one gap. The cheapest fix is a v0.2 rewrite, not line edits.

A second, quieter problem: the book-3 infrastructure was built while the spec still said "awaiting author approval". A book whose anti-goal is "a repo that does not follow the practice it recommends" should say whether that is a worked example or a defect.

## Action items

### 🔴 Blocker

**A1. Rewrite as v0.2 with one spine.**
Pick the spine (lifecycle, with the factory debate as the destination in Part IV, is what Structure already shows). Rewrite Purpose / Why now and Q1 to match; fold "The software factory" into Purpose and The argument; drop the dated add-on headings into a short revision log. Record what is already decided: ADR-0003 accepted (replace S1 with a pointer), the classification pass done (open item 1), the capture pass done (S2, with its ~2027-02-13 expiry), the bake-off results (D1).
*Covers:* DE-1, ST-3, CO-1, ZO-1, ZO-2, Z8-1, ST-6, ST-N5, DE-6, ST-5, ZO-5, ZO-7, most of ST-7.

**A2. Make the goal match the evidence.**
"The five systems are compared on evidence" (L158) cannot hold: three have no anchor. Round-2 bake-off evidence supports "Narrow it". Restate: "the systems the Lab ran are compared on bake-off evidence; the others are reported positions." D1 shrinks to one author yes/no. Re-ground Claim 3 in the Lab's gate incidents (L135–140), with EGM as one example once open item 3 verifies it.
*Covers:* DE-2, SY-9, ZO-3, DE-10, Z8-3, IC-2 (dropped), CO-12.

### 🟡 Major

**A3. Fix the stale chapter references and counts.** L58, L176, L188 mean Ch 12, not Ch 10; L190 "Eleven" → twelve; recompute S4's arithmetic. *Covers:* ZO-4, CO-2, ST-4, SY-1, DE-3, ZO-8, CO-3.

**A4. Fix the Pipeline reuse section.** L146: the ledger format is extended (ADR-0003), not unchanged; list the verifier as new. Replace "mirror book 2 exactly" with "mirrored; consolidation deferred". *Covers:* ZO-5, ST-5, DE-6, ZO-6/IC-3 (shrunk).

**A5. Say whether the approval bypass is an example or a defect.** One sentence in v0.2. *Covers:* Z8-2.

**A6. Calibrate claims to the measured numbers.**
- L64 "best-anchored seam", "order of magnitude"; L91 "never heard of" → state the counts (35 factory vs 62 lifecycle vs 0–20 per tool).
- L131 "reproducible from the repo's history" and S2's "is done" heading → add a "reproducible vs preserved" note per worked-example row.
- L22–28 vendor facts and L36 "EGM in November" → label "as of 2026-11, secondary sources (open item 3)"; align dates.
- L39 "none of it ships its own evidence" → narrow to the material reviewed.
- Cite the corpus-classification pass for the counts; if it does not cover factory terms, add the search command.
*Covers:* SY-2, SY-3, SY-4, SY-7, DE-9 (shrunk), IC-4(b) (shrunk), CO-11, DE-N1, DE-N9 (shrunk), Z8-6.

**A7. Add one context paragraph.** Define Lab, corpus (and whether the reader can clone it), Method, and who builder / model / author are and what "settled by the builder" authorises. Link the README and ADRs for pipeline terms; one clause for "evidence panel". *Covers:* CO-4, CO-5, CO-6, SY-8 (partly).

**A8. Add rejected options and a short risk list.** A "rejected" clause in each Q row (L36–41), with a real trade-off instead of "Author picked this". A five-bullet risk list: tool churn, book-2 depth pass competing for time, dormant gates (D3), overlap with book 1, author bias (S3). No matrices or owner columns. *Covers:* ST-1, DE-4, ST-2, DE-5 (both shrunk), DE-N4.

**A9. Settle D3 by capturing the dormant-gate state now.** Record the dormant gates as dated evidence (as S2 did for diagrams-check); make arming a publication gate, not a drafting gate; add the `CORPUS_TOKEN` PAT to open items. *Covers:* IC-1, ST-7 (part), DE-N8.

**A10. Defer the length target.** Set chapter length per chapter after classification instead of 12 × 3,500–4,500 now; consider folding Ch 12 into Ch 11 if D1 narrows. *Covers:* Z8-4, DE-5 (padding risk).

### 🟢 Nit (edit during the rewrite; not tracked)

- Counts: 13 + 10 = 23 vs "24" (L38, L56, L142); define "10 programs". *ZO-9, CO-9, ST-N3, SY-5, DE-N2*
- Define or drop "Living Specs" (L36). *ZO-10, CO-7*
- Name the two gates in L140; "1458-note" → talks (L137); "behind that green tick" (L136). *CO-8, DE-N7*
- "This spec already calls that a defect" (L190) → name book 2's spec. *SY-6, ST-N4*
- Ambiguous "above" references (L45, L98). *ST-N4*
- Talk ids for Reock/DX and McKinsey (L16). *CO-11, SY-N8, DE-N3*
- Links for book 2's spec, Q4 decision and diagram slots (L5, L40, L41). *CO-10*
- `llms.txt` decision into open items (L154). *DE-N6*
- Orange `#c2410c` vs reserved amber/red (L41). *DE-N5*
- Table hygiene: empty header (L76), uneven tool rows (L22–28), Part labels as H3s, Goals before Structure, label Purpose as the problem. *ST-N1, N2, N6, N7, N9*
- "All eight worked examples are repo incidents" — the eighth is a count (L182). *SY-N9*
- Style: "honest", "actually", other filler, metaphors, aphorisms, "for months", unsourced "most teams". *SY-N1–N7*
- One shared classification pass for book 2 and book 3. *IC-6*
- Decide whether this review's own artifacts count as Ch 6 evidence. *Z8-5, DE-N9*

## Dropped proposals (with reason)

| Proposal | Why dropped |
|---|---|
| IC-5 one dispatching verifier | ADR-0003 already chose two verifiers run by `check_claims_integrity.py` with a shared parser. |
| DE-7 content hashes, durable tags, fail-vs-warn | ADR-0003 already defines pass/fail/unverifiable and validates `ref`; a hash by the same author adds no protection. |
| DE-8 per-incident expiry table in the spec | Already in `research_passes/2026-11-16-book3-worked-example-capture.md`; cite it. |
| IC-4(a) scheduled log-archive job | ADR-0003 requires capture at write time; the job would need its own negative control. |
| IC-2 route book-3 changes through different tools | Two bake-off rounds already ran; D1 is narrowing. |
| IC-3 / ZO-6 book registry + per-trap gates | The traps are already avoided in the repo; a live-books refactor belongs in its own ADR. |
| ST-N8, DE-5 owner/status columns | One author; adds ceremony, not information. |

## Traceability matrix

| Raw finding | Action |
|---|---|
| ZO-1 | A1 |
| ZO-2 | A1 |
| ZO-3 | A2 |
| ZO-4 | A3 |
| ZO-5 | A1, A4 |
| ZO-6 | A4 (shrunk) |
| ZO-7 | A1 |
| ZO-8 | A3 |
| ZO-9, ZO-10 | Nits |
| IC-1 | A9 |
| IC-2 | Dropped |
| IC-3 | Dropped / A4 |
| IC-4 | (a) dropped; (b) A6 |
| IC-5 | Dropped |
| IC-6 | Nits |
| CO-1 | A1 |
| CO-2, CO-3 | A3 |
| CO-4, CO-5, CO-6 | A7 |
| CO-7 … CO-11 | Nits / A6 |
| CO-12 | A2 |
| ST-1, ST-2 | A8 |
| ST-3, ST-6 | A1 |
| ST-4 | A3 |
| ST-5 | A1, A4 |
| ST-7 | A1, A9 |
| ST-N1 … ST-N9 | Nits (ST-N5 → A1; ST-N8 dropped) |
| SY-1 | A3 |
| SY-2, SY-3, SY-4, SY-7 | A6 |
| SY-5, SY-6 | Nits |
| SY-8 | A7 |
| SY-9 | A2 |
| SY-N1 … SY-N9 | Nits |
| DE-1 | A1 |
| DE-2, DE-10 | A2 |
| DE-3 | A3 |
| DE-4, DE-5 | A8 (DE-5 padding → A10) |
| DE-6 | A1, A4 |
| DE-7, DE-8 | Dropped |
| DE-9 | A6 |
| DE-N1 … DE-N9 | Nits / A6 / A9 |
| Z8-1 | A1 |
| Z8-2 | A5 |
| Z8-3 | A2 |
| Z8-4 | A10 |
| Z8-5 | Nits |
| Z8-6 | A6 |
