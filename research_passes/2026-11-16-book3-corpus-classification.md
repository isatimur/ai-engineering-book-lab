# Book 3 corpus classification pass (2026-11-16)

Task 6 of the book 3 foundations plan. It turns the 1,458-talk corpus into
per-chapter shortlists for *The Shape of the Work* (placeholder title).

The pass is a script, not a one-off grep. It follows the book 2 precedent,
`99_Meta/scripts/classify_second_book.py`. Seed keywords find candidates. A
curated layer drops passing mentions and assigns survivors to chapters.
The book's premise is that claims are demonstrable on a repo the reader can
clone, so the pass has to be reproducible.

## The constraint: two kinds of count

**Transcripts are not available to this pass.** `git ls-files
99_Meta/transcripts` returns 0. Transcripts exist only in the author's main
working tree. A clone or CI run sees 1,458 note files with title, themes and
summary, and nothing else.

The design spec
(`docs/superpowers/specs/2026-11-15-third-book-design.md`) quotes counts
measured against transcript **full text**. This pass counts matches in note
**title plus summary**. These are different measurements. The note-derived
count is smaller by construction, and that is not a defect. Neither number
stands in for the other.

| Seed family | Spec figure (transcript full text) | This pass: title or summary | This pass: title only |
|---|---|---|---|
| SDLC / PDLC | 62 | 7 | 4 |
| software factory / dark factory | 35 | 10 | 9 |
| spec-driven | 13 | 5 | 3 |
| platform engineering | 9 | 2 | 2 |
| internal developer platform | 9 | 2 | 0 |
| agent factory | 6 | 0 | 0 |
| assembly line | 6 | 0 | 0 |
| OpenSpec | 2 | 0 | 0 |
| Spec Kit | 0 | 0 | 0 |
| Elephant-Goldfish | 0 | 0 | 0 |

How to read it:

- Use the spec figure for claims about how often the corpus talks about a
  topic. A drafting claim that cites "62 talks mention SDLC" must cite the
  spec's transcript measurement and say where it was taken.
- Use the note-derived figure for claims about which talks are *about* a
  topic, because a title or summary mention is a stronger signal than a
  mention somewhere in an hour of speech.
- The software-factory family loses least (35 to 10) because factory talks
  put the word in the title. The SDLC family loses most (62 to 7) because
  most talks mention it in passing, in the body.
- The "software factory" seed also matches "dark factory" (two talks,
  #673 and #743, one talk indexed twice). The script drops #673 as a
  duplicate.
- Two seed families match words that are not what they seem. #627 "IDP"
  is an identity provider. #104 "context platform engineering" is KV-cache
  economics. The script excludes both. #521 is excluded as a passing
  mention (an AI platform team, not the delivery lifecycle).

The shortlists below are therefore judged from title, themes and summary.
Many summaries in this corpus are templated ("shares a practical take on
...") and carry no signal beyond the title. Treat every assignment as a
title-level judgment. The drafting pass for a chapter must read the full
transcript in the author's tree before it cites a talk as an anchor.

## Reproduce every number

Run from the repo root (or this worktree).

```bash
# Transcripts are not in git: confirms the constraint above (prints 0).
git ls-files 99_Meta/transcripts | wc -l

# Corpus size and the note-derived seed counts (all numbers in the table).
python3 99_Meta/scripts/classify_third_book.py --dry-run

# Per-chapter shortlist as Markdown (the section below).
python3 99_Meta/scripts/classify_third_book.py --markdown

# Regenerate the machine-readable result.
python3 99_Meta/scripts/classify_third_book.py

# Line-length check on the script.
ruff check --select E501 --line-length 100 99_Meta/scripts/classify_third_book.py
```

The spec's transcript-derived figures are quoted from the spec, not
recomputed. They need the author's main tree and are not reproducible from a
clone. That is the honest limit of this pass.

The seed patterns live in `SEED_FAMILIES` in the script. The curated layer
is `ASSIGN` and `EXCLUDE_PLAYLIST_INDEXES`. Output is
`99_Meta/third-book-classification.json`.

Totals: **133 talks shortlisted** across 12 chapters (core plus support).
Four seed hits are excluded. **Three chapters fall below the 6 core-talk
threshold: Ch 2, Ch 3 and Ch 4.**

## Tiers

- **core**: the title or summary is about the chapter's subject.
- **support**: adjacent evidence a drafting pass may borrow.

Each talk has one primary chapter. A talk that fits two chapters sits in the
one where it is strongest. The threshold counts core talks only.

## Per-chapter shortlists

### Ch 1 - The bottleneck moved (core 10, support 8)

- core: #60 The Infinite Software Crisis, Jake Nations, Netflix
- core: #62 Leadership in AI Assisted Engineering, Justin Reock, DX
- core: #682 How Building with AI Can Double the Throughput of Your Engineering Team, Brian Scanlan, Intercom
- core: #831 Understanding is the new bottleneck, Geoffrey Litt, Notion
- core: #872 "Software engineering is not about writing code", Benoit Schillings, Google DeepMind
- core: #994 Velocity Sickness, Matt Dailey, Ref.
- core: #1204 We're the bottleneck, but we don't have to be, Ido Salomon
- core: #1216 The State of AI in Software Development: Data from 400+ Orgs, Justin Reock, DX
- core: #1222 Why AI Didn't Actually Make You Ship Faster, Gabriel Spencer-Harper, Meticulous
- core: #1392 Better AI Models Won't Fix Your Engineering Team, Nicholas Arcolano, Jellyfish
- support: #5 Gergely Orosz conversation; #36 METR long tasks; #79 and #195 Stanford developer-productivity studies; #101 Jellyfish 20m pull requests; #424 Booking.com and Sourcegraph, SDLC ROI; #684 Agents Don't Do Standups (PFF); #949 Forward Deployed Engineering at Cognition (SDLC bottlenecks)

### Ch 2 - Intent before specification (core 4, support 3)

- core: #160 Shipping Products When You Don't Know What they Can Do, Ben Stein, Teammates
- core: #162 Why your product needs an AI product manager, James Lowe, i.AI
- core: #1244 Build the Right Thing: Product Engineering (Part 1), Kent C. Dodds
- core: #1245 Build the Right Thing: Product Engineering (Part 2), Kent C. Dodds
- support: #161 Shipping something to someone always wins; #758 Self Driving Products (PostHog); #1042 Prototyping as Leadership (The Browser Company)

### Ch 3 - What a specification is for (core 5, support 1)

- core: #40 Spec-Driven Development: Agentic Coding at FAANG Scale and Quality, Al Harris, Amazon Kiro
- core: #106 The Cure for the Vibe Coding Hangover, Corey J. Gallon, Rexmore
- core: #265 The New Code, Sean Grove, OpenAI
- core: #738 BDD, ADR, PRD, WTF: Capturing Decisions for Humans and AI Alike, Michal Cichra
- core: #782 Using Spec-Driven Development for Production Workflows, Erik Hanchett, AWS
- support: #729 Spec-Driven Testing for Agents, Steven Willmott (about testing agents, not the spec as artifact)

### Ch 4 - Decomposition and the plan (core 5, support 2)

- core: #89 No Vibes Allowed: Solving Hard Problems in Complex Codebases, Dex Horthy, HumanLayer
- core: #179 Beyond the Prototype: Using AI to Write High-Quality Code, Josh Albrecht, Imbue (forced plan-before-code)
- core: #621 Full Walkthrough: Workflow for AI Coding, Matt Pocock
- core: #691 Build Agents That Run for Hours (Without Losing the Plot), Anthropic
- core: #1044 The Era of Compound Engineering, Kieran Klaassen (brainstorm, plan, work, review)
- support: #646 Ralph Loops workshop, Chris Parsons; #653 The Multi-Agent Architecture That Actually Ships, Factory

### Ch 5 - Execution under a spec (core 6, support 3)

- core: #42 Automating Large Scale Refactors with Parallel Agents, Robert Brennan, OpenHands
- core: #182 Your Coding Agent Just Got Cloned And Your Brain Isn't Ready, Rustin Banks, Google Jules
- core: #438 AI Agents, Meet Test Driven Development
- core: #633 Cursor Worktrees: Deleting 12K LoC Code with 200 LoC Skills, David Gomes
- core: #996 Multiplayer agentic engineering, Arjun Singh, Superconductor
- core: #1330 Sandboxes Aren't Optional: 4 Ways to Isolate Coding Agents, Robert Brennan
- support: #77 Cline lessons; #180 Software Development Agents: What Works and What Doesn't; #761 Keep Shipping When You Walk Away (WorkOS)

### Ch 6 - The independence problem (core 7, support 3)

- core: #210 Lessons from millions of AI code reviews, Tomas Reimers, Graphite
- core: #864 In the Land of AI Agents, the Verifiers Are King, Tariq Shaukat, Sonar
- core: #995 Guide, Verify, Solve, Anirban Chatterjee, Sonar
- core: #1091 Building uReview, Uber's Multi-Agent Code Review Engine
- core: #1250 Your LLM Judge Is a Confident Liar: Building Better Verifiers, Browserbase
- core: #1347 I Believe Everything My Agents Tell Me: Three Levels of Review, Corey Gallon
- core: #1415 How to Build an AI Code Review Agent, Daksh Gupta, Greptile
- support: #305 Don't get one-shotted (Graphite); #1433 Catch the Bugs Your Code Review Misses (Sonar); #1517 I Made a Fruit Fly Review My Code (WorkOS)

### Ch 7 - Gates that can actually fail (core 7, support 4)

- core: #334 CI in the Era of AI: From Unit Tests to Stochastic Evals, Nathan Sobo, Zed
- core: #526 Enhancing Quality and Security in CI, Gunjan Patel
- core: #687 Beyond Code Coverage: Functionality Testing with Playwright, Marlene Mhangami
- core: #731 Can LLMs generate Enterprise Quality Code?, Prasenjit Sarkar, Sonar
- core: #837 Every Solo Agent Builder Eventually Reinvents a Worse Version of CI/CD
- core: #1310 How to Build Quality Gates into Agentic Coding Workflows, Nnenna Ndukwe, Qodo
- core: #1356 Rebuilding CI for AI-Scale Commit Volume, Gautam Korlam, Sonar
- support: #78 State of AI Code Quality; #127 Vibe Coding with Confidence (SDLC); #823 Your coding agent doesn't always follow your rules; #1098 Formal Verification for Engineers (Lean4)

### Ch 8 - Shipping, and the gap between merged and live (core 8, support 4)

- core: #689 Fighting AI with AI, Lawrence Jones, incident.io
- core: #874 Agents Need Feature Flags, Sachin Gupta
- core: #899 We Gave an Agent Production Code Access and Then Tried to Sleep at Night, Form3
- core: #993 Always-on agents run production without the on-call tax, Resolve AI
- core: #1094 How to avoid disaster when vibe-coding a billing engine, Andrew Garvin, Stripe
- core: #1224 The 5 Levels of Self-Driving Production, Eric Schwartz, Traversal
- core: #1227 How VS Code Went from Monthly to Weekly Releases with AI, Harald Kirschner
- core: #1514 A Valid Key Let an AI Agent Delete Production, Sagar Batchu, Speakeasy
- support: #103 Infra that fixes itself (Railway); #168 Ship Agents that Ship (Dagger); #178 Ship Production Software in Minutes (Factory); #266 Production software keeps breaking (Traversal)

### Ch 9 - Brownfield and spec rot (core 6, support 3)

- core: #57 Making Codebases Agent Ready, Eno Reyes, Factory
- core: #292 Navigating deep context in legacy code with Augment Agent
- core: #991 Benchmarking Coding Agents on New vs Legacy Codebases, Denys Linkov
- core: #1237 AI Coding Agents Are Breaking Big Codebases, Dan Adler, Sourcegraph
- core: #1276 We Mapped 115 Microservices for Our Coding Agents, Postman
- core: #1386 One Day, $1,000 in Tokens: An AI War Room for Legacy Code, GEICO
- support: #999 Agents, codebases, and teams (Amazon AGI Lab); #1387 Does Code Quality Still Matter?; #1445 Most of Your Docs Readers Are Now AI Agents

### Ch 10 - The review wall (core 10, support 3)

- core: #845 ReviewDebt: a practical framework for scoring every pull request, eBay
- core: #1021 How to Kill the Code Review, Ankit Jain, Aviator
- core: #1041 The Last Human Code Review: Building Trust in AI-Generated Code, Qodo
- core: #1195 Fixing the PR Bottleneck, Matt Pocock, AIHero
- core: #1214 The Death of the Code Review: What the Data Actually Says, Laurie Voss
- core: #1280 AI Writes More PRs. Who Validates Them?, Sonar
- core: #1285 Generation Is Cheap, Review Is Expensive, Gabriel Martinez, G2i
- core: #1428 How Anthropic Merges 30,000 Code Changes a Day, Manish Kapur and Addy Osmani
- core: #1432 Why Humans Can't Keep Up With AI-Written Code, Tariq Shaukat, Sonar
- core: #1450 AI Writes Code Faster Than Your Team Can Review It, Sourcegraph
- support: #14 The Friction is Your Judgment (Ronacher); #644 and #1074 Mergeable by default (Unblocked)

### Ch 11 - The factory and its discontents (core 13, support 5)

- core: #629 Building your own software factory, Eric Zakariasson, Cursor
- core: #704 The Missing Primitive for Agent Swarms, Lou Bichard, Ona (the definition)
- core: #743 Dark Factory: OpenClaw Ships Faster Than You Can Read the Diff, Vincent Koc
- core: #855 The Great Loops Debate (the staged debate)
- core: #923 Harness Engineering is not Enough: Why Software Factories Fail, Dex Horthy (the post-mortem)
- core: #924 Notion's Token Town, Sarah Sachs (the economics)
- core: #1048 Agentic SDLC at Uber (at scale)
- core: #1203 Building Self-Improving Agent Software Factories, Suraj Gupta, Warp
- core: #1205 What It Actually Takes to Build a Software Factory, Factory (the how-to)
- core: #1206 No, That's Not a Software Factory, Ryan Cooke, WorkOS (the rebuttal)
- core: #1210 Software Engineering Is Becoming Factory Engineering, Zach Lloyd, Warp
- core: #1256 Harness Engineering: How to Build a Software Factory, Dru Knox, Tessl (the how-to)
- core: #1268 The Software Factory: From Bug Report to Production Code, Factory
- support: #676 Continuous Compute (the future of the SDLC); #785 Building an Autonomous Engineering Org; #840 The Factory That Dreams; #937 Loop Engineering from First Principles; #1361 The Highest Loop

### Ch 12 - How much process, and how far out of the loop (core 6, support 7)

- core: #35 Agentic Engineering: Working With AI, Not Just Using It, Brendan O'Leary
- core: #357 The 4 Patterns of AI Native Development, Patrick Debois
- core: #711 Bounded Autonomy: Between Free Will and Determinism
- core: #1095 From AI-Assisted to AI-Native: Building a Frontier Development Team, AWS
- core: #1306 The SDLC You Build Yourself, Atlassian
- core: #1377 Is the Agent Harness Dead?, Jediah Katz, SpaceXAI ("far from a solved vision")
- support: #1 It Ain't Broke (Pocock, the skills position); #30 Platforms for Humans and Machines (the one internal-developer-platform talk); #58 3 Pillars of Autonomy; #73 From Vibe Coding To Vibe Engineering; #669 4 Levels of AI Agent Maturity; #1055 Coding Agents Don't Scale Themselves; #1235 The Human Is an Async API

Excluded seed hits (four): #673 (duplicate of #743), #104 (inference
platform), #521 (AI platform team), #627 (IDP means identity provider).

## Overlap audit with book 1

Book 1 chapters (from `public/drafting/`): 2 *Taste Still Matters When Code
Gets Cheap*; 3 *Harnesses, Specs, and Codebases Agents Can Actually Use*;
4 *Evals Are the Control System*; 9 *The AI-Native Organization*. Chapters
5 to 8 and 10 are context, runtimes, security, realtime and closing. Book 1
takes the model as given and asks how to delegate. Book 3 asks what the
process around the work becomes.

| Book 3 chapter | Seam against book 1 |
|---|---|
| 1 The bottleneck moved | Book 1 ch 9 uses productivity data to describe the organization; book 3 uses the same data only to argue the constraint moved, then leaves. Overlap: Reock (DX) is already cited in book 1 ch 9. |
| 2 Intent before specification | Book 1 ch 2 is taste in the output; book 3 is deciding what to build before any output exists. Book 1 ch 2 already cites Pocock; his grilling is reprised, not re-argued. |
| 3 What a specification is for | Book 1 ch 3 says specs help agents; book 3 asks what a spec is for, executable or reference, and what keeping it current costs. Book 1 already cites #265 (in ch 2) and #40 (in ch 3), so book 3 must reprise, not re-argue. |
| 4 Decomposition and the plan | Book 1 ch 3 covers harnesses and context files; book 3 covers task sizing and interfaces in a plan. Closest to book 1 ch 3, and the thinnest chapter, so merge pressure is real. |
| 5 Execution under a spec | Book 1 ch 6 owns runtimes and sandboxes; book 3 owns what goes wrong in TDD, worktrees and parallel runs under a spec. #1330 sits on the line. |
| 6 The independence problem | Book 1 ch 4 evals judge the *agent*; book 3 asks whether the *reviewer* shares the author's context. Judge talks (#1250) overlap with book 1 ch 4. |
| 7 Gates that can actually fail | Book 1 ch 4 is evals as a control system; book 3 is CI as the last independent reviewer and vacuous passes. Seam: eval versus gate. Lab incidents carry this chapter, not the corpus. |
| 8 Shipping, merged versus live | No book 1 counterpart. Book 1 ch 7 (security and trust) touches production access (#899, #1514), so cite it, not repeat it. |
| 9 Brownfield and spec rot | Book 1 ch 3 covers codebases agents can use (#57); book 3 asks what happens to specs over time. #57 (Reyes) is cited in book 1 ch 3. |
| 10 The review wall | No direct book 1 counterpart; book 1 ch 2 touches judgment but not volume. The cleanest seam in the book. |
| 11 The factory and its discontents | Book 1 ch 9 describes the AI-native organization; book 3 argues about removing the human from the SDLC loop. #16 (Lopopolo, harness engineering) is left out of the shortlist because book 1 ch 3 already cites it. |
| 12 How much process, how far out | Book 1 ch 9 and ch 10 close on what endures; book 3 closes on how much ceremony per change. Distinct, but the closing tone must not repeat book 1 ch 10. |

## The gaps, stated plainly

The threshold is 6 core talks. Three chapters fall below it, and three more
sit exactly on it.

**Below threshold (merge candidates).**

- **Ch 2, Intent before specification: 4 core.** The corpus has product
  engineering talks (#1244, #1245) and AI product management (#162, #160).
  It has almost nothing on grilling or brainstorming as instruments. The
  Lab's own artifacts (superpowers brainstorming, Pocock's grilling) carry
  the chapter, not the corpus. **Merge candidate: fold into Ch 3.**
- **Ch 3, What a specification is for: 5 core.** Only three talks are about
  spec-driven development as such (#40, #782, #265). Executable versus
  reference specs has no corpus voice, because Spec Kit and OpenSpec are
  absent. **Merge candidate: Ch 2 plus Ch 3 becomes one chapter.**
- **Ch 4, Decomposition and the plan: 5 core.** The talks are about
  workflow, not plan structure. **Merge candidate: fold into the merged
  Ch 2 and 3 chapter, or into Ch 5.** This also removes the book 1 ch 3
  overlap.

**At the threshold (6 core, thin).** Ch 5, Ch 9 and Ch 12. Ch 9 has no talk
about spec rot specifically; its six are about legacy code and agent-ready
codebases. Ch 12's six are about autonomy levels, not about the five-tool
comparison.

**Well supported.** Ch 1 (10), Ch 6 (7), Ch 7 (7), Ch 8 (8), Ch 10 (10),
Ch 11 (13). The factory seam is the best anchored, as the spec says.

**Ch 12's five-tool comparison is short by construction.** The corpus has 0
talks on Spec Kit and 0 on Elephant-Goldfish in notes. OpenSpec has 0 note
hits; the spec reports 2 passing mentions in transcript full text, which
this pass cannot see. Spec-driven development itself has 5 note hits.
The tools that do appear are Kiro (#40, #782) and Pocock's skills (#1,
#621). This is the known open decision D1, not a classification failure.

**Caveat on every number above.** Assignments are title-level judgments.
Corpus summaries are often templated, so some core talks may turn out to be
passing treatments once the transcript is read. Drafting should verify each
anchor against the full transcript before it relies on it.
