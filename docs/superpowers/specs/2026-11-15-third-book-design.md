# Third Book — Design Spec (v0.2)

- **date:** 2026-11-15 (v0.1), revised 2026-11-23 (v0.2)
- **status:** draft v0.2. It records the book as built and names the decisions still open. See "Decisions still open".
- **working title:** *The Shape of the Work* (placeholder, as *Beyond the Harness* was for book 2)
- **subject:** spec-driven development (SDD) and the product/software development lifecycle when agents do most of the building
- **repo:** same repo, third manuscript track: `public/drafting-3/`, `book-mash-3.toml`
- **relationship to books 1 and 2:** same Lab, same corpus, same Method (defined below)

**Revision log.** v0.1 (2026-11-15) proposed the book. v0.2 (2026-11-23) applies the EGM review in `docs/egm-review/third-book-design/consolidated_review_report.md`: one spine, a goal that matches the evidence, and a record of what was built after v0.1.

## Terms

- **The Lab** is this repository. It holds three books, their evidence and the CI that checks them, and it is public.
- **The corpus** is 1,482 AI Engineer conference talks (`01_Videos/`). A clone carries each talk's note: title, themes and summary. It does not carry the transcripts, which live only in the author's working tree (`git ls-files 99_Meta/transcripts` prints 0). Claims anchored to transcript quotes are checked in the author's tree. CI checks them only when it can fetch the private transcript mirror, which needs the `CORPUS_TOKEN` secret (see D3). A reader can check the note and the talk itself, not the transcript.
- **The Method** is the practice the three books share. Every claim cites a corpus talk or a captured repo artifact, and a gate verifies the citation.
- **Roles.** The **author** decides. The **builder** is the coding agent that drafted this spec and ran its reviews. "Settled by the builder" means a proposal the author has not overturned, not a decision the author made.

## Problem

Book 1 is about **delegating the work**: harnesses, specs, evals, control, org design, with the model taken as given. Book 2 is about **where that assumption breaks**: you are training the model, or the domain needs something general capability does not give.

Book 3 is about **the process around the work**. When generating code stops being the constraint, the constraint moves to everything around it: deciding what to build, writing it down well enough for an agent to execute, reviewing output nobody typed, gating it, shipping it, and living with it afterwards.

The corpus states the thesis directly. Justin Reock of DX, presenting data from 400 organizations, argues for integrating across the SDLC and PDLC because "code generation was never the bottleneck in the first place" (#1216). McKinsey speakers talk about rewiring the PDLC and say that different functions along the product lifecycle may need different operating models (#076, #1265). That is the book: the bottleneck moved, and the lifecycle has not caught up.

## Goals, non-goals, anti-goals

**Goals:** a practitioner can run the lifecycle described; every claim cites a corpus talk or a captured repo artifact; the systems the Lab ran are compared on its own bake-off evidence, and the other systems are reported as positions, not compared.

**Non-goals:** tool documentation; enterprise transformation and change management; a methodology to adopt wholesale; a prediction about which tool wins.

**Anti-goals** (a failure even if finished): a field guide that dates in a quarter; ceremony for its own sake; a book whose own repo does not follow the practice it recommends.

## The spine

The book follows the **lifecycle stages**, from deciding what to build to living with it afterwards. The stages lead to one destination: the **software factory**, the idea of moving the human out of the SDLC loop step by step. Whether the factory arrives is the question Part IV argues.

The factory is the best-argued topic the corpus has for this book. Speakers argue about it by name, in public:

| role in the argument | talk |
|---|---|
| the how-to | #1256 *Harness Engineering: How to Build a Software Factory* — Dru Knox, Tessl |
| the how-to | #1205 *What It Actually Takes to Build a Software Factory* — Factory |
| the rebuttal | #1206 *No, That's Not a Software Factory* — Ryan Cooke, WorkOS |
| the post-mortem | #923 *Harness Engineering Is Not Enough: Why Software Factories Fail* — Dex Horthy |
| the staged debate | #855 *The Great Loops Debate* — Horthy, Huntley, Livingstone and others |
| at scale | #1428 *How Anthropic Merges 30,000 Code Changes a Day* — Kapur, Sonar |
| at scale | #1048 *Agentic SDLC at Uber* — Medisetty & Huda, Uber |
| the economics | #924 *Notion's Token Town* — Sarah Sachs, Notion |
| the review wall | #1432 *Why Humans Can't Keep Up With AI-Written Code* — Shaukat, Sonar |
| the bottleneck | #1195 *Fixing the PR Bottleneck* — Matt Pocock, AIHero |

The definition the book anchors on is from #704 (Lou Bichard, Ona): a software factory is "the commitment to incrementally moving the human out of the loop within the SDLC." The limit is from #1377 (Jediah Katz, SpaceX/xAI): many agents coordinating across the full lifecycle is "far from a solved vision."

SDD tools appear as instruments, at the stage where each fits. They are not the spine.

## Evidence

Two kinds of count exist, and neither stands in for the other.

| term | talks, transcript full text (author's tree, 2026-11-15) | talks, note title or summary (classification pass) |
|---|---|---|
| `SDLC` / `PDLC` family | 62 | 7 |
| `software factory` / `dark factory` | 35 | 10 |
| `spec-driven` | 13 | 5 |
| `superpowers` | 20 | — |
| `OpenSpec` | 2 (both passing mentions) | — |
| `Spec Kit` / `speckit` / `spec-kit` | 0 | — |
| Elephant-Goldfish | 0 | — |

The note-derived counts, the per-chapter shortlists and the commands that reproduce them are in `research_passes/2026-11-16-book3-corpus-classification.md`. It assigns 133 talks across the 12 chapters (`99_Meta/third-book-classification.json`).

So the lifecycle and the factory are anchored, and a five-way tool comparison is not. Three of the five systems have no corpus talk with more than a passing mention. The Lab has never run Spec Kit, OpenSpec or Elephant-Goldfish as a method for building the book. This review's own reports in `docs/egm-review/` are EGM output about this spec, not evidence for the book. Chapter 6 does not cite them.

The Lab has measured two systems against a control. The bake-off (`research_passes/2026-11-16-sdd-bakeoff-results.md`, `research_passes/2026-11-16-sdd-bakeoff-round2-results.md`) ran each of two changes under a control arm, Pocock's skills and superpowers. On the larger change, superpowers wrote a design doc and a plan and cost +30% tokens and +50% wall time over the Pocock arm for an identical scorecard. Limits: n = 2, both changes were repairs with a known right answer, and the three unrun systems are not judged.

Tool positions, **as of 2026-11, from secondary sources; verify before prose (open item 2):**

| System | Position on how much ceremony a change needs |
|---|---|
| **GitHub Spec Kit** (reported 1.0.0, 2026-08-21) | Heavy and phase-gated. The specification is treated as executable. |
| **OpenSpec** (reported Thoughtworks Radar "Trial", 2026-11) | Light and delta-based: `propose → apply → archive` against a persistent spec. Brownfield-first. |
| **Elephant-Goldfish (EGM)** (reported Google, Apache 2.0; launch date given as 2026-10-22 and 2026-11-08) | The spec is not the problem; review is. One agent drafts with full context; reviewers with no context check it. |
| **superpowers** (installed plugin; run in the Lab) | A gated pipeline: brainstorm → design doc → plan → TDD, with a stop before any code. |
| **Matt Pocock's skills** (installed; run in the Lab bake-off) | No pipeline. Single-purpose tools (grilling, domain-modeling, codebase-design) used when a situation needs one. |

## Anchoring decisions

| # | Question | Decision | Rejected, and why |
|---|---|---|---|
| Q1 | Structure | **Lifecycle stages, Lab incidents as worked examples, tools discussed at the stage where each fits** | A chapter per tool: the tools changed three times inside one research window, so per-tool chapters date first. A field guide: the anti-goal. |
| Q2 | Audience | **The practitioner and small-team lead.** DX and McKinsey enterprise data are evidence, not the target reader. | An enterprise reader: enterprise rollout is a non-goal and a different book. Proposed by the builder; see D2. |
| Q3 | Evidence base | **Corpus anchors, plus captured repo artifacts** (ADR-0003) | Corpus only: the Lab's incidents are the book's strongest evidence for Claim 3 and fit no talk. |
| Q4 | What makes it different | **Every claim cites a corpus talk or a captured repo artifact, and a gate checks the citation** | Vendor documentation and opinion pieces as the base: the material reviewed for this spec carries no evidence of its own. |
| Q5 | Repo location | **Third manuscript track in the same repo**, as book 2 did | A sibling repo: it would copy CI, claims and website infrastructure for the same Lab. |
| Q6 | Visual identity | **Slate `#475569` → orange `#c2410c`** | Book 1 is blue→green, book 2 teal→rose. The diagram pass must check orange against the reserved amber (transient) and red (naive) slots. |

## The argument

Three claims the book has to earn, in order:

1. **The bottleneck moved, and the lifecycle did not.** Cheap generation moves the constraint to specification, review and release. The corpus talks in Ch 1 have to show that teams added agents to a process built for the old constraint.
2. **Writing it down is not the hard part; agreeing is.** Every system above can produce a specification. None can tell you whether the thing specified is the right thing.
3. **Verification has to be independent of the author.** A reviewer who shares the author's context shares the author's blind spots, whether that reviewer is a subagent, a colleague or a CI gate the author also wrote. The Lab's own gate incidents (Worked examples) carry this claim. EGM's fresh-context reviewers are one example of the idea, cited once open item 2 verifies them.

## Structure

All twelve chapters are drafted in `public/drafting-3/` (1,083–2,098 words each, 2026-11-23).

### Framing
- Ch 1 — The bottleneck moved. Why "code generation was never the bottleneck" reframes the whole lifecycle.

### Part I — Deciding and writing it down
- Ch 2 — Intent before specification. What has to be settled before any document helps; grilling and brainstorming as instruments.
- Ch 3 — What a specification is for. Executable vs reference specs, and the cost of keeping one current.
- Ch 4 — Decomposition and the plan. Interfaces, task sizing, and what a plan must carry that a spec cannot.

### Part II — Building and checking
- Ch 5 — Execution under a spec. TDD, worktrees, parallel agents, and what goes wrong at each.
- Ch 6 — The independence problem. Fresh-context review, and why self-review fails without anyone noticing.
- Ch 7 — Gates that can actually fail. CI as the last independent reviewer; negative controls; vacuous passes.

### Part III — Living with it
- Ch 8 — Shipping, and the gap between merged and live.
- Ch 9 — Brownfield and spec rot. Retrofitting specs; what to delete; when the spec stops being true.
- Ch 10 — The review wall. Why humans cannot keep up with AI-written code, and what merging 30,000 changes a day requires (#1428, #1432, #1195).

### Part IV — The factory
- Ch 11 — The factory and its discontents. The how-to talks, the rebuttal (#1206), the post-mortem (#923) and the staged debate (#855), argued against each other.
- Ch 12 — How much process, and how far out of the loop. The Lab's bake-off evidence on what added process costs and buys; how to choose per change; the state of the factory vision (#1377). Ch 12 is the closer.

## Worked examples

Each incident is dated and belongs to a named chapter. "Reproducible" means a reader can see it from git history. "Preserved" means it rests on GitHub Actions logs, which expire after 90 days, so the decisive log lines are quoted in a capture file.

| Incident | Chapter | Shows | Evidence |
|---|---|---|---|
| `diagrams-check` printed "0 stale" on 190 of 190 runs while `stat` failed 256 times per run (BSD `stat` on a GNU runner) | 7 | A gate that cannot fail reports success | Preserved: `research_passes/2026-11-15-diagrams-gate-vacuous-pass-evidence.md` |
| A withdrawn speaker's name stayed on a published figure for 57 days while that gate passed | 7 | What a vacuous gate costs | Reproducible: git only |
| `stats-regen` published 1455 over a 1458-note corpus by rebasing a stale computation | 7, 8 | Two jobs raced, and the run with the right answer went red | Preserved: `research_passes/2026-11-16-book3-worked-example-capture.md` |
| `GITHUB_TOKEN` pushes triggered no workflow: 0 of 30 bot commits deployed | 8 | Merged is not shipped | Preserved: same capture file |
| A commit message that mentioned the skip-CI marker disabled every workflow on PR #86 | 8 | The skip match is a substring match, not a parse of intent | Preserved: same capture file |
| Eight anchor checks that no workflow invokes, among them `check_truncated_negation.py` and `check_support_levels.py` (`docs/GATES.md`) | 6, 7 | A control no trigger fires checks nothing | Reproducible: workflow files |
| Book 2's closing chapter rendered with no evidence panel (the per-chapter list of anchored claims) because the mapping lives in the ledger, not the prose | 9 | Spec and artifact drift apart without notice | Reproducible: git |

Capture-file log lines expire about 2027-02-13; the quotes in the capture files do not depend on that date. The Lab also keeps 13 specs and 10 plans against 63 research passes (2026-11-15). Ch 3 and Ch 9 use that count, which is a count, not an incident.

## Pipeline, as built

**Shared with books 1 and 2:** the corpus and corpus sync, the book-mash/mash-core engine, Source Anchors and `verify_ledger.py`, the website reading components.

**New for book 3:**
- `public/drafting-3/` (source of truth; its `README` has no extension, so book-mash does not count it as a chapter)
- `book-mash-3.toml`, `website/scripts/sync-third-book.mjs`, `website/src/data/bookChaptersThree.ts`, the `/third-book` routes and the book 3 reader pages, with book 3 in `gen-sitemap.mjs`
- `claims-3/Claims Ledger.md`, holding Source Anchors and **Artifact anchors**. ADR-0003 (accepted) defines the artifact anchor and its rejected alternatives. `scripts/verify_artifact_anchors.py` checks artifact anchors, and `scripts/check_claims_integrity.py --book 3` runs both verifiers.

The per-book wiring copies book 2's pattern a third time. Consolidating the three copies is deferred to its own engineering ADR, because it would touch two live books.

**The ledger.** Until 2026-11-23, `claims-3/Claims Ledger.md` recorded no claims, and `check_claims_integrity.py --book 3` printed "All anchors resolve" over zero anchors, the vacuous pass Ch 7 argues against. It now holds 42 claims across all twelve chapters: 86 Source Anchors, one for every quote in the drafts, and 5 Artifact anchors. The integrity check fails when any book's ledger records no claims. See open item 1.

## Risks

- **Tool churn.** The SDD tools changed three times inside one research window. Mitigation: the book names tools only where a stage needs an instrument, and dates every tool fact.
- **Book 2 competes for the same time.** Book 2's depth pass (seven chapters under 3,000 words) has not started. Mitigation: open item 4.
- **The repo's gates are inactive.** `docs/GATES.md` reports eleven anchor-gate steps that skip because `CORPUS_TOKEN` does not exist, while the job reports success. That is the failure Ch 7 argues against. See D3.
- **Overlap with book 1.** The classification pass states a boundary per chapter against book 1. Ch 4 is closest (book 1 ch 3) and the thinnest chapter; Ch 6 overlaps book 1 ch 4; Ch 1 reuses Reock (#1216), already cited in book 1 ch 9.
- **Author position.** The author uses superpowers daily, and this spec lives in `docs/superpowers/specs/`. Ch 1 discloses it, because Ch 12 reports the Lab's bake-off, in which superpowers is one arm.

## Decisions still open

**D1 — Narrow the tool comparison (author yes/no).** The drafts already do this: Ch 12 argues from the Lab's two bake-off runs and names no vendor tool. Recorded here as the builder's proposal. If the author says no, the alternatives are a bake-off of the three unrun systems or a third anchor class (vendor docs and repositories), which needs a ledger schema change and an ADR.

**D2 — Confirm the audience.** Q2 is the builder's proposal. The answer decides whether DX's and McKinsey's enterprise data are evidence or the frame for Ch 1, and whether Ch 12's "per change" means a two-person team or a division.

**D3 — The inactive gates.** Proposal: capture the inactive-gate state now as dated evidence, the way the diagrams-check capture did. Then Ch 7 can use it as its specimen. Arming the gates becomes a condition for publication, not for drafting: before book 3 ships, the author creates the `CORPUS_TOKEN` PAT, the gates run, and a negative control shows they can fail. Ch 7 then gets a before-and-after.

**D4 — The approval step.** The book 3 infrastructure and all twelve drafts were built while v0.1 said "awaiting author approval". The anti-goals forbid a repo that does not follow its own practice. The author decides whether Ch 2 or Ch 4 uses this as a worked example, or whether it is a defect to fix in the process.

## Open items

1. **Keep `claims-3` in step with the drafts.** Done once on 2026-11-23 (42 claims; the check now fails on an empty ledger). Open: new prose quotes need ledger entries, and the 7 time-bound quotes `check_time_bound_evidence.py` flags need a currency review.
2. **Primary sources.** Claims about Spec Kit, OpenSpec and EGM rest on secondary coverage, and EGM's launch date is reported two ways (2026-10-22, 2026-11-08). Verify against the repositories before any of it reaches prose.
3. **Chapter length.** Drafts run 1,083–2,098 words. Set a target per chapter from its classification shortlist, not one target for all. Folding Ch 12's comparison into Ch 11 is an option if D1 stands.
4. **Sequencing against book 2.** Decide whether book 2's depth pass comes before book 3's depth pass. One classification pass can tag talks for both books' gaps.
5. **`llms.txt` / `llms-full.txt`.** They cover book 1 only. Decide whether books 2 and 3 join them.
6. **`CORPUS_TOKEN`.** The PAT D3 needs. The author owns it; decide its scope and rotation when creating it.
7. **Title.** Placeholder only.
