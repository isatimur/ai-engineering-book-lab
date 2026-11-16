# Third Book — Design Spec (v0.1)

- **date:** 2026-11-15
- **status:** draft — awaiting author approval
- **working title:** *The Shape of the Work* (placeholder, as *Beyond the Harness* was for book 2)
- **subject:** spec-driven development (SDD) and the product/software development lifecycle when agents do most of the building
- **repo:** same repo, third manuscript track — `public/drafting-3/`, `book-mash-3.toml`
- **relationship to books 1 and 2:** same Lab, same corpus, same Method

## Purpose

Book 1 is about **delegating the work**: harnesses, specs, evals, control, org design, with the model taken as given. Book 2 is about **where that assumption breaks** — you are training the model, or the domain brings a standard general capability does not satisfy.

Book 3 is about **the process around the work**. When generating code stops being the constraint, the constraint moves to everything that surrounds it: deciding what to build, writing it down well enough for an agent to execute, reviewing output nobody typed, gating it, shipping it, and living with it afterwards.

The corpus states the thesis directly. Justin Reock of DX, presenting data from 400 organizations, argues for integrating across the SDLC and PDLC because "code generation was never the bottleneck in the first place." McKinsey's panels talk about "re-wiring the PDLC" and note that different engineering functions along the product lifecycle may need different operating models. That is the book: the bottleneck moved, and the lifecycle has not caught up.

### Why now

Spec-driven development acquired real tooling in the last eighteen months, and the tools disagree with each other. That disagreement is the book's spine, not a sidebar.

| System | Position on how much ceremony a change needs |
|---|---|
| **GitHub Spec Kit** (1.0.0, 2026-08-21) | Heavy and phase-gated. The specification is *executable* — it generates the implementation rather than guiding it. |
| **OpenSpec** (Thoughtworks Radar "Trial", 2026-11) | Light and delta-based. `propose → apply → archive` against a persistent source-of-truth spec. Brownfield-first: retrofits specs onto existing code. |
| **Google Elephant-Goldfish (EGM)** (2026-10/11, Apache 2.0) | The spec is not the problem — *review* is. The Elephant drafts with full context; Goldfish subagents review with none, so they cannot inherit the author's assumptions. |
| **superpowers** | A gated pipeline: brainstorm → design doc → plan → TDD, with a hard stop before any code. |
| **Matt Pocock's skills** | No pipeline at all. Sharp single-purpose tools (grilling, domain-modeling, codebase-design) you reach for when the situation calls for one. |

They are answering one question five ways: **how much has to be written down, and verified by whom, before an agent is allowed to touch code?** Thoughtworks' own caveat on OpenSpec — that maintaining the persistent spec still takes discipline — is the crack running through all of them, and the honest subject of several chapters.

## Anchoring decisions

| # | Question | Decision | Rationale |
|---|---|---|---|
| Q1 | Structure: tool-by-tool, lifecycle-by-stage, or Lab-artifact-driven | **Lifecycle spine, Lab artifacts as worked examples, tools argued at the stage where each is strongest** | Author picked this over a field guide. A chapter per tool is stale at print: Spec Kit hit 1.0 in August, Living Specs in October, EGM in November — three moves inside one research window. Stages outlive tools. |
| Q2 | Audience | **The practitioner and small-team lead**, with DX/McKinsey enterprise data used as *evidence*, not as the target reader | Author's own position, and books 1 and 2's reader. Enterprise rollout is a different book; serving both would dilute the practical half that was explicitly asked for. **This was the model's call, stated and not objected to — confirm on first read.** |
| Q3 | Evidence base | **Corpus anchors as in books 1 and 2, plus this repo's own artifacts as the worked example** | 62 corpus talks mention SDLC or PDLC. The Lab additionally holds 13 specs, 10 plans, 10 programs, 63 research passes, 2 ADRs and 8 CI gates accumulated over 18 months in public. |
| Q4 | What makes it different from every other SDD book | **Every claim is demonstrable on a repo the reader can clone** | The same bet book 1 made with the corpus, applied to process. Competing material is vendor documentation or opinion; none of it ships its own evidence. |
| Q5 | Repo location | **Third manuscript track in the same repo**, mirroring book 2's Q4 decision | book-mash is config-driven per book. A sibling repo would duplicate CI, claims and website infrastructure for the same Lab and method. |
| Q6 | Visual identity | **Distinct from both existing books** — proposed slate `#475569` → orange `#c2410c` | Book 1 is blue→green, book 2 teal→rose. Must also avoid the established semantic slots (red = naive, amber = transient, purple = AI control plane). Open to the diagram pass. |

## Evidence reality check (measured 2026-11-15, after the builder review)

The builder check found a hole in the section above, and the measurement confirms it. **The corpus cannot carry the five-way tool comparison.** Counted across the 1,458-talk transcript mirror:

| term | talks |
|---|---|
| `SDLC` / `PDLC` family | **62** |
| `spec-driven` / `spec driven` | 13 |
| `superpowers` | 20 |
| `OpenSpec` | **2** (both passing mentions) |
| `Spec Kit` / `speckit` / `spec-kit` | **0** |
| Elephant-Goldfish | **0** |

And the Lab has never run three of the five: no `.specify/`, no `openspec/`, no EGM artifacts anywhere in the tree. It holds 24 superpowers specs and plans, and Pocock's skills are installed.

So the lifecycle spine is well anchored (62 talks) and **the tool comparison is not anchored at all**. Chapters 3, 6 and 10 as drafted have neither a corpus anchor nor a repo artifact for Spec Kit, OpenSpec or EGM. This is the first thing the author has to resolve; see "Decisions the author must make".

The builder check reported 84 talks for the SDLC/PDLC family. That count could not be reproduced; the measured figure is 62, and 62 is what this spec uses.

### The software factory (added 2026-11-15, author's steer)

The author named "SDLC factories" as belonging here. Measured, this is the **best-anchored seam in the whole book** — better than the tool comparison by an order of magnitude:

| term | talks |
|---|---|
| `software factory` / `factories` | **35** |
| `agent factory` | 6 |
| `assembly line` | 6 |
| `platform engineering` | 9 |
| `internal developer platform` | 9 |

More importantly, the corpus does not merely mention the idea — **it argues about it, by name, in public**:

| | talk |
|---|---|
| the how-to | #1256 *Harness Engineering: How to Build a Software Factory* — Dru Knox, Tessl |
| the how-to | #1205 *What It Actually Takes to Build a Software Factory* — Factory |
| **the rebuttal** | #1206 *No, That's Not a Software Factory* — Ryan Cooke, WorkOS |
| **the post-mortem** | #923 *Harness Engineering Is Not Enough: Why Software Factories Fail* — Dex Horthy |
| **the staged debate** | #855 *The Great Loops Debate* — Horthy, Huntley, Livingstone and others |
| at scale | #1428 *How Anthropic Merges 30,000 Code Changes a Day* — Kapur, Sonar |
| at scale | #1048 *Agentic SDLC at Uber* — Medisetty & Huda, Uber |
| the economics | #924 *Notion's Token Town* — Sarah Sachs, Notion |
| the review wall | #1432 *Why Humans Can't Keep Up With AI-Written Code* — Shaukat, Sonar |
| the bottleneck | #1195 *Fixing the PR Bottleneck* — Matt Pocock, AIHero |

A definition the book can anchor on, from #704 (Lou Bichard, Ona): a software factory is "the commitment to incrementally moving the human out of the loop within the SDLC." And the honest caveat, from #1377 (Jediah Katz, SpaceX/xAI): multiple agents coordinating to solve the full lifecycle is "far from a solved vision."

This reframes the book's destination. The lifecycle stages are the argument; **the factory is where the argument is heading**, and whether it arrives is contested by named practitioners who disagree on stage. That is a far stronger spine than comparing five vendor tools the corpus has never heard of.

## The argument

Three claims the book has to earn, in order:

1. **The bottleneck moved, and the lifecycle did not.** Cheap generation relocates the constraint to specification, review, and release. Most teams added an agent to a process designed for the old constraint.
2. **Writing it down is not the hard part; agreeing is.** Every tool in the table above can produce a specification. None of them can tell you whether the thing specified is the right thing, and the ones that feel most rigorous are the easiest to satisfy without thinking.
3. **Verification has to be independent of the author, and usually isn't.** This is EGM's insight generalized: a reviewer who shares the author's context shares the author's blind spots — whether that reviewer is a subagent, a colleague, or a CI gate the author also wrote.

Claim 3 is where the Lab's own scars do the most work, and where this book diverges hardest from the vendor literature.

## Structure (draft — titles are placeholders)

**Framing**
- Ch 1 — The bottleneck moved. Why "code generation was never the bottleneck" reframes the whole lifecycle.

**Part I — Deciding and writing it down**
- Ch 2 — Intent before specification. What has to be settled before any document helps; grilling and brainstorming as instruments.
- Ch 3 — What a specification is for. Executable (Spec Kit) vs reference (OpenSpec); the honest cost of keeping one current.
- Ch 4 — Decomposition and the plan. Interfaces, task sizing, and what a plan must carry that a spec cannot.

**Part II — Building and checking**
- Ch 5 — Execution under a spec. TDD, worktrees, parallel agents, and what goes wrong at each.
- Ch 6 — The independence problem. EGM's Goldfish, fresh-context review, and why self-review fails quietly.
- Ch 7 — Gates that can actually fail. CI as the last independent reviewer; negative controls; vacuous passes.

**Part III — Living with it**
- Ch 8 — Shipping, and the gap between merged and live.
- Ch 9 — Brownfield and spec rot. Retrofitting specs; what to delete; when the spec becomes a lie.
- Ch 10 — The review wall. Why humans cannot keep up with AI-written code, and what merging 30,000 changes a day actually requires. (#1428, #1432, #1195)

**Part IV — The factory**
- Ch 11 — The factory and its discontents. The destination the whole lifecycle implies: "incrementally moving the human out of the loop within the SDLC" (#704). The how-to talks, the rebuttal (#1206), the failure post-mortem (#923), and the staged debate (#855) argued against each other rather than summarised.
- Ch 12 — How much process, and how far out of the loop. Where the five systems disagree, how to choose per team and per change, and the honest state of the factory vision — "far from a solved vision" (#1377).

Ch 12 doubles as the closer. Book 2's closing chapter was nearly left out by being deferred; this one is named from the start.

## Worked examples already in hand

These are real, dated, and reproducible from the repo's history. Each belongs to a named chapter.

| Incident | Chapter | What it demonstrates |
|---|---|---|
| `diagrams-check` reporting "0 stale" for months while erroring on every file (BSD `stat` on a GNU runner) | 7 | A gate that cannot fail is worse than no gate |
| A withdrawn speaker's name live on a published figure for 57 days behind that green tick | 7 | What a vacuous gate costs in the real world |
| `stats-regen` publishing 1455 against a 1458-note corpus by rebasing a stale computation | 7, 8 | Two jobs racing; the run holding the right answer went red |
| `GITHUB_TOKEN` pushes triggering no workflow — 0 of 30 bot commits ever deployed | 8 | Merged is not shipped |
| A commit message *mentioning* the skip-CI marker disabling every workflow on the PR | 8 | The tooling does not read for tone |
| Tests written for both gates, run by nothing | 6, 7 | A control no trigger fires is a comment |
| Book 2's closing chapter rendering with no evidence panel because the mapping lives in the ledger, not the prose | 9 | Spec and artifact drift apart silently |
| 13 specs vs 10 plans vs 63 research passes | 3, 9 | What the Lab actually keeps current, versus what it writes once |

## Pipeline reuse

**Shared, unchanged:** corpus, corpus-sync, book-mash/mash-core engine, claims-ledger format, anchor verification gates, website reading components.

**New, mirroring book 2's pattern exactly:** `public/drafting-3/` (source of truth), `website/src/content-3/`, `website/src/data/bookChaptersThree.ts`, `claims-3/Claims Ledger.md`, `book-mash-3.toml`, `/third-book` routes, `sync-third-book.mjs`.

**Known traps from book 2, to avoid rather than rediscover:**
- `public/drafting-3/README` must have **no extension**; book-mash globs `*.md` and will measure a `README.md` as a phantom chapter.
- Ledger entries need `**Candidate chapters:**` populated or the chapter renders with no evidence panel.
- Add book-3 routes to `gen-sitemap.mjs` at wiring time; book 2 shipped invisible to crawlers for months.
- `llms.txt` / `llms-full.txt` cover book 1 only. Decide deliberately whether book 3 joins them.

## Goals, non-goals, anti-goals

**Goals:** a practitioner can run the lifecycle described; every claim anchors to a corpus talk or a reproducible repo artifact; the five systems are compared on evidence rather than on preference.

**Non-goals:** tool documentation; enterprise transformation and change management; a methodology to adopt wholesale; prediction about which tool wins.

**Anti-goals** (would make it a failure even if finished): becoming a field guide that dates in a quarter; advocating ceremony for its own sake; a book whose own repo does not follow the practice it recommends.

## Decisions the author must make

These came out of the builder review. Each changes what gets written, and none can be settled by the builder.

**D1 — What counts as evidence for the tool comparison?** The spec originally made the five-way disagreement the spine, and the corpus cannot support it (see the reality check above).

*The factory finding changes the recommendation.* The spine should be the **factory question**, which 35 corpus talks argue about by name — including a rebuttal, a failure post-mortem and a staged debate — with the five tools demoted to instruments discussed where each fits a stage. That makes D1 a smaller decision, because the book no longer rests on it. It still has to be answered for Ch 12, which does compare the five. Three ways out, in descending cost:

- *Run a bake-off.* Put one real change through all five systems in the Lab and measure. Strongest version of the Q4 bet, hardest to fake, and a build-and-measure workstream this spec does not budget for.
- *Admit a third anchor class* — vendor repositories, docs, Thoughtworks Radar — as citable alongside corpus talks and repo artifacts. Needs a ledger schema change and probably an ADR.
- *Narrow it.* Argue only the two systems the Lab actually runs, and treat the other three as reported positions rather than compared ones. Smaller, more honest book.

**D2 — Confirm the audience.** Q2 records the practitioner/small-team reading as the model's call, not the author's. It decides whether DX's 400-organization data and McKinsey's panels are evidence or spine, Ch 1's voice, and whether Ch 10's "per team and per change" means two people or a division. The two headline sources are enterprise-research sources while enterprise rollout is a stated non-goal — that seam needs the author's word.

**D3 — Are the dormant gates a precondition or the specimen?** `docs/GATES.md` opens with "CI is green and checks nothing": eleven anchor-gate steps skip because `CORPUS_TOKEN` does not exist, and the job still reports success. Ch 7 is "Gates that can actually fail", and the anti-goals forbid a book whose own repo does not follow the practice it recommends. Either the gates get armed before Ch 7 drafts — which makes a PAT only the author can create a blocking dependency — or the dormant gates become Ch 7's live specimen and the book accepts its own repo as the cautionary example. Both defensible; they order the work differently and change what Ch 7 argues.

## Settled by the builder (recorded, not asked)

**S1 — Repo artifacts need an anchor type that does not exist yet.** The spec listed the claims-ledger format as "shared, unchanged", but that format anchors a claim to a video id, a timestamp, a verbatim quote and a confidence level, and `verify_ledger.py` resolves quotes against transcripts. All eight worked examples are repo incidents — a commit SHA, a workflow run id, a file path, a date range. None fits.

*Decision:* `claims-3` extends the format with an **artifact anchor** — `{kind, ref, date, excerpt}` where `kind` is one of `commit`, `run`, `file`, `range`, and `ref` is a SHA, a run id, or a path. Corpus anchors keep the existing shape unchanged, so `verify_ledger.py` continues to work on them untouched; a sibling verifier resolves artifact anchors against git and the captured evidence files. This is the model's call and is recorded here so the ledger is not built twice. It needs an ADR before `claims-3` is created.

**S2 — Evidence capture was urgent and is done.** GitHub expires Actions logs after 90 days. Measured on 2026-11-15: **93 of the 190 `diagrams-check` runs had already lost their logs**, and the survivors expire daily. The evidence behind Ch 7's headline example is captured in `research_passes/2026-11-15-diagrams-gate-vacuous-pass-evidence.md` — 190 runs, 190 successes, 256 `stat` errors per run against `check complete: 0 stale, 0 missing-source`. Remaining capture for the other incidents belongs at the front of the implementation plan, not the middle.

**S3 — Disclose the author's position.** The author uses superpowers daily; this spec sits in `docs/superpowers/specs/`. A declared-user stance and a neutral-comparator stance read very differently in Ch 10. Ch 1 discloses it.

**S4 — Chapter length target.** Book 2's chapters run 1,540–2,912 words and this spec already calls that a defect needing a depth pass. Eleven chapters at book-2 length would be a short book. Target **3,500–4,500 words** per chapter; the classification pass tests whether the material supports it.

## Open items for the implementation plan

1. **Corpus classification pass.** 62 keyword hits on SDLC/PDLC is a seed, not a shortlist. Needs the hand-curation book 2's spec also required, producing per-chapter talk lists.
2. **Overlap audit against book 1.** Chapters 2, 3, 4 and 9 of book 1 already cover taste, harnesses and specs, evals, and the AI-native organization. Each book-3 chapter needs a stated seam, as book 2's ledger does for its reprises.
3. **Primary sources.** Claims about Spec Kit, OpenSpec and EGM currently rest on secondary coverage; EGM's launch date is reported inconsistently (2026-10-22 vs 2026-11-08). Verify against the repositories before any of it reaches prose.
4. **Title.** Placeholder only.
5. **Sequencing against book 2.** Book 2's depth pass (seven chapters under 3,000 words) is unstarted. Decide whether it precedes book 3's drafting.
