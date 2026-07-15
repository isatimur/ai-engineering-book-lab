## 2026-07-15 — Usefulness + cumulative-case pass (Editorial Review v2 Tier 1 #5–6, Tier 2 #7–9)

### What changed
- **Cumulative case arcs.** Meridian and Hargrove now accumulate named scars instead of re-introducing as fresh labels. Canonical incident handles (see plan in batch): Meridian — the slop era (Ch 3, new rendered scene) → the admin-override regression (Ch 4, named handle on existing scene) → cited in Ch 6, Ch 7, Ch 9, Ch 10; Hargrove — the misranked matter note (Ch 5, new rendered scene) → validation engines (Ch 6) → gateway/scoped-token/audit (Ch 7, new rendered scene) → the support call (Ch 8, threaded inheritance). Directionality verified: no chapter references a later scar.
- **Usefulness sharpening (Monday test).** ~30 landscape paragraphs across Ch 1–9 rewritten in prose so their latent decision rule / threshold / named trap is the operative claim — every rule traces to material already in the same chapter (per the 2026-06-03 usefulness pilot spec: per-paragraph sharpening, not takeaway blocks). Ch 10 left as deliberate synthesis.
- **Three rendered scenes** (Tier 2 #7): Ch 3 slop-era Tuesday migration, Ch 5 misranked matter note, Ch 7 disputed-filing audit reconstruction. All built from in-chapter material only; no new statistics or named people.
- **Ch 7 scope paragraph** (Tier 2 #9): acknowledges model-alignment work as complementary but out of the book's scope.
- **Paraphrase-as-quote fixes** (Tier 2 #8): 8 colon-framed pseudo-quotes converted to indirect speech (Ch 1 ×2, Ch 2 ×4, Ch 6 ×1, Ch 7 ×1 softened); all real quotation-marked quotes untouched.
- Fixed pre-existing `foreman’s` escape artifact in Ch 6.
- Word count 26,078 → 27,422 (+5.2%). Synced to `public/drafting/` and `website/src/content/`; regenerated read/llms/sitemap.

### Known follow-ups
- Audiobook + judge scores now two passes stale.
- Remaining from Editorial Review v2: Ch 10 weight/length (Tier 2 #10), GraphRAG maintenance-cost sentence, forward-claim hedging (§1.4), quote spot-check vs transcripts (§1.3).

## 2026-07-15 — Redundancy-thinning pass (all chapters) + Reader Version removal

### What changed
- Full-manuscript redundancy pass on `AI Engineering Book - Manuscript Draft.md`, per Editorial Review v2 Tier 1 (#3–#4). One editor per chapter, all ten chapters:
  - `That is why ...` openers: 32 → 8 (target ≤15)
  - `In other words ...` clinchers: 11 → 2 (target ≤5; both survivors carry content beyond restatement)
  - `X is not Y. It is Z.` two-sentence constructions reduced by roughly half per chapter; survivors varied so they no longer share one cadence
  - Stand-alone single-sentence paragraphs: 157 → ~59 measured loosely, with 1–2 deliberate keeps per chapter; the rest merged into the paragraphs they belonged to
  - Empty forward-reference previews ("That is the subject of the next chapter") cut; content-bearing bridges kept
  - Word count 26,909 → 26,078 (−3.1%). Every edit was a deletion, merge, or cadence collapse — no claims, quotes, attributions, or scenes added or removed. Meridian/Hargrove references, the Ch 4 rate-limiting-regression scene, the Ch 8 support-call scene, the Ch 9 Monday-morning scene, and Ch 10's final line all preserved verbatim.
- Ran `scripts/sync_manuscript_to_public.py`: `public/drafting/*` and `website/src/content/chapter-*.md` now match the working draft (closes Editorial Review v2 Tier 0 #1 drift for this pass). Regenerated `read/*.md`, `llms.txt`, `llms-full.txt`, `sitemap.xml`.
- Deleted stale `AI Engineering Book - Reader Version.md/.html` (Tier 0 #2): 20 leftover draft-note hits, superseded by `website/public/read/*` and `llms-full.txt`. No scripts referenced them.

### Known follow-ups
- Audiobook mp3s and judge scores are now stale relative to the edited chapters (`check_book_consistency.py` flags all ten) — regenerate when the next batch is worth the cost.
- Remaining from Editorial Review v2: usefulness work (per-chapter metrics/decision rules, Tier 1 #5), cumulative Meridian/Hargrove arcs (#6), rendered scenes for Ch 3/5/7 (Tier 2).

## 2026-05-19 — Post-693 integration pass (Chapters 4, 5, 6, 9 + claims system)

### What changed
- Revised `Chapter 4 Draft v0 - Evals Are the Control System.md`
  - strengthened the chapter from “real tasks beat toy benchmarks” to a more operational claim about **trace-linked evals fed by production observability**
  - integrated the Microsoft / Raindrop / Pydantic cluster so observability, judging, and optimization read as one loop instead of adjacent practices
- Revised `Chapter 5 Draft v0 - Context Is Infrastructure.md`
  - made the **MCP + skills + progressive disclosure** material central to the chapter’s current thesis
  - sharpened the idea that the context gap is increasingly a **capability-packaging** problem, not only a retrieval problem
- Revised `Chapter 6 Draft v0 - Runtimes State and the Human Control Plane.md`
  - tightened the runtime argument around **durable, evented execution semantics** rather than generic persistence
  - added clearer continuity between multi-agent shared state, milestone checkpoints, and human recomposition
- Revised `Chapter 9 Draft v0 - The AI-Native Organization.md`
  - strengthened the organizational claim from generic review bottlenecks toward **coherence bottlenecks under delegated abundance**
  - broadened support with the 10 Downing Street / public-sector material so the chapter reads less startup-local
- Updated public-safe derivatives:
  - `public/drafting/Chapter 4 - Evals Are the Control System.md`
  - `public/drafting/Chapter 5 - Context Is Infrastructure.md`
  - `public/drafting/Chapter 6 - Runtimes, State, and the Human Control Plane.md`
  - `public/drafting/Chapter 9 - The AI-Native Organization.md`
- Strengthened reusable quality artifacts:
  - `claims/Claims Ledger - Chapters 3-6.md`
  - `claims/Claims Ledger - Core Argument Chapters 1-6.md`
  - `evidence/Evidence Pack - Chapters 4 5 6 9 - Batch 667-693.md`
  - `public/concepts/Context Engineering.md`
  - `public/concepts/Agent Observability.md`
  - `docs/ONGOING_SYNC_AND_JUDGING.md`

### Editorial verdict
This pass materially improved the book’s honesty about where current systems actually break and how strong teams compensate.

Biggest gains from the pass:
1. **Chapter 4 is less generic about evals** because it now names the trace/observability/eval loop explicitly.
2. **Chapter 5 is more current** because MCP and skills now strengthen the chapter’s main point instead of sitting off to the side as tooling trivia.
3. **Chapter 6 now sounds more like runtime architecture and less like an abstract trust sermon** because evented durability and shared state are clearer.
4. **Chapter 9 now lands on coherence as the managerial bottleneck** rather than only “review load.”
5. **The claims layer is more reusable** because the new deltas are now explicit claims with support and caveats, not just prose absorbed into chapters.

### What still seems worth watching
- Whether future MCP material pushes the book toward a stronger view on gateways / capability governance rather than only skill packaging.
- Whether later observability talks add stronger counterarguments on privacy, retention, and over-instrumentation.
- Whether the organization chapter eventually wants one more concrete non-software operating scene alongside the Monday-morning company picture.

### Current manuscript feel
The middle and late-book spine now reads more convincingly as one argument: prepare the environment, measure real work, assemble the right evidence and capabilities, preserve state through time, and redesign the institution so delegated abundance stays coherent enough to trust.

# Manuscript Pass Log

## 2026-05-16 — Editorial polish and continuity pass (Chapters 3, 8, 9, 10)

### What changed
- Revised `Chapter 3 Draft v0 - Harnesses Specs and Codebases Agents Can Actually Use.md`
  - reduced the note-like, quote-forward density so the chapter reads more like continuous prose
  - strengthened the Chapter 2 -> Chapter 3 bridge by making harnesses feel like externalized judgment
  - smoothed the Chapter 3 -> Chapter 4 handoff so the chapter lands more naturally on evaluation as the next problem
- Revised `Chapter 8 Draft v0 - Realtime and Voice.md`
  - clarified the chapter’s role as a **public stress test** for the manuscript’s trust architecture rather than a side chapter on modality
  - tightened the opening and closing so the same support-call scenario carries more of the chapter’s weight
  - made the Chapter 7 -> 8 transition more explicit: bounded authority now has to hold under interruption and latency pressure
- Revised `Chapter 9 Draft v0 - The AI-Native Organization.md`
  - added a memorable Monday-morning operating scene so the chapter has one concrete managerial image
  - sharpened the chapter’s macro argument around coherence, review load, and alignment debt
  - made the “company as harness” ending feel more like consequence than management summary
- Revised `Chapter 10 Draft v0 - What Endures.md`
  - kept the chapter’s structure but improved the landing
  - made **trusted throughput** the most quotable final idea alongside constrained delegation
  - tightened the final paragraph so it sounds more like a book ending and less like an organized recap
- Updated public-safe derivatives:
  - `public/drafting/Chapter 8 - Realtime, Voice, and the Cost of Being Interruptible.md`
  - `public/drafting/Chapter 9 - The AI-Native Organization.md`
  - `public/drafting/Chapter 10 - What Endures.md`

### Editorial verdict
This pass made the manuscript feel less stitched at several weak seams.

Biggest gains from the pass:
1. **Chapter 3 is more readable** because it now feels less like a beautifully integrated memo and more like inevitable chapter prose.
2. **Chapter 8 now knows exactly why it is in the book**: it is where the architecture has to perform while the human is still there.
3. **Chapter 9 now has one memorable org-level picture** instead of living entirely at the level of theory.
4. **Chapter 10 lands harder** because “trusted throughput” now gives the ending a cleaner final phrase.
5. **The late-manuscript transitions are smoother**: authority -> realtime exposure -> organizational redesign -> enduring principles.

### What still feels roughest
- **Chapter 1 and Chapter 2 may still want one later rhythm pass together** so the opening runway matches the smoother cadence of the newer middle and ending chapters.
- **Chapter 4 remains conceptually strong but still slightly more thesis-forward than scene-forward** compared with the best current chapters.
- **Chapter 8 is now better justified, but it is still structurally a pressure-test chapter more than a spine chapter**. That is probably right, though its vividness has to keep doing real work.
- **Chapter 10 now lands well, but a final full-manuscript pass may still find one or two repeated phrases across Chapters 8–10 worth deduplicating.**

### Current manuscript feel
The book now reads more convincingly as one argument with a landing:
cheap generation raises the value of judgment; judgment gets encoded into environments; environments need evals, context, runtime design, and bounded authority; realtime exposes whether those systems are honest; organizations have to redesign around delegated work; and the durable prize is trusted throughput.


## 2026-05-14 — Integration and ending pass (Chapters 8–10)

### What changed
- Revised `Chapter 8 Draft v0 - Realtime and Voice.md`
  - re-centered the chapter on one recurring scenario: a high-stakes realtime support colleague on a live call
  - made a clearer editorial decision that voice is the main subject and embodiment stays only as a short confirming edge
  - strengthened the Chapter 7 -> Chapter 8 -> Chapter 9 flow so the manuscript keeps narrowing toward organizational consequences instead of widening into a modality detour
- Created `Chapter 10 Draft v0 - What Endures.md`
  - turned the closing packet into a real prose ending
  - named the book’s most durable final pattern as **constrained delegation**
  - closed on responsibility, systems design, and trust rather than hype or tool taxonomy
- Added/updated public-safe derivatives:
  - `public/drafting/Chapter 8 - Realtime, Voice, and the Cost of Being Interruptible.md`
  - `public/drafting/Chapter 10 - What Endures.md`

### Editorial verdict
This pass made the manuscript feel more like a complete book rather than a strong run of chapters followed by an open-ended horizon.

Biggest gains from the pass:
1. **Chapter 8 now has a clearer right to exist** because it is anchored to one vivid scenario instead of “voice” as a broad modality topic.
2. **The closing logic is now explicit**: the book ends by separating temporary tool churn from durable principles.
3. **The Chapter 7 -> 8 -> 9 -> 10 run now feels directional**: bounded authority -> realtime exposure -> organizational redesign -> enduring principles.

### What still feels uneven
- **Chapter 3** is still structurally strong but stylistically a bit more source-forward and quote-driven than the best later chapters. It may want one smoothing pass so it feels less like a beautifully integrated synthesis memo and more like inevitable prose.
- **Chapter 8** is stronger now, but still intentionally functions as a pressure-test chapter more than a central spine chapter. That is probably correct, though it means its energy must come from vividness and compression rather than breadth.
- **Chapter 9** has the right argument but could still use one especially memorable managerial or operational scene to match the concreteness of the Software Factory failure slice in Chapter 4.
- **Chapter 10** lands coherently, but on a later pass it may benefit from one even more quotable final paragraph if the goal becomes a more public-facing or keynote-like ending.

### Current manuscript feel
Chapters 1–10 now read much more like one continuous systems argument with an actual landing: delegated work becomes abundant, judgment becomes scarcer, infrastructure becomes decisive, institutions must adapt, and the enduring pattern is constrained delegation.

## 2026-05-14 — Outer-ring strengthening pass (Chapters 7–9)

### What changed
- Created `Chapter 7 Draft v0 - Security Identity and High-Stakes Trust.md`
  - turned Chapter 7 from a starter into a full prose draft continuous with Chapter 6
  - made security an extension of the runtime/control-plane argument rather than a detached compliance chapter
  - centered the chapter on delegated authority: workflow-level risk, sandboxing, least privilege, MCP governance, gateways, delegated identity, and inspectability
  - reused the High-Stakes Colleague as the main recurring case while pulling the Software Factory back in for code-execution risk
- Created `Chapter 8 Draft v0 - Realtime and Voice.md`
  - turned Chapter 8 from a modality starter into a manuscript-quality stress-test chapter
  - framed voice as the place where the book’s systems claims become audible: latency budgets, interruption handling, state, orchestration, and live human supervision
  - connected realtime behavior back to context, runtimes, security, and the human control plane so the chapter feels like part of the same book
- Created `Chapter 9 Draft v0 - The AI-Native Organization.md`
  - replaced the skeletal organizational note with a real prose chapter
  - treated the chapter as the institutional consequence of Chapters 1–8 rather than a management appendix
  - centered it on shifted scarcity, constrained paths to ship, review bottlenecks, alignment debt, and the company as a harness for delegated work
- Added/updated public-safe derivatives:
  - `public/drafting/Chapter 7 - Security, Identity, and High-Stakes Trust.md`
  - `public/drafting/Chapter 8 - Realtime, Voice, and the Cost of Being Interruptible.md`
  - `public/drafting/Chapter 9 - The AI-Native Organization.md`

### Editorial verdict
The outer ring now feels substantially more manuscript-like rather than packet-like.

Current strength ranking across the outer-ring run:
1. **Chapter 7 — Security, Identity, and High-Stakes Trust**
2. **Chapter 9 — The AI-Native Organization**
3. **Chapter 8 — Realtime, Voice, and the Cost of Being Interruptible**

### Why this ranking
- **Chapter 7** is currently the strongest because it most naturally continues Chapter 6’s argument. The transition from runtime/control plane to bounded authority feels clean, and the High-Stakes Colleague gives it a strong narrative spine.
- **Chapter 9** is now much stronger because it reads like the macro-scale consequence of the earlier technical chapters, especially Chapters 3, 4, 6, and 7. The “alignment debt” and “company as harness” framing gives it a distinct identity.
- **Chapter 8** is significantly improved and now belongs in the same manuscript, but it still feels slightly more like a revealing edge chapter than a core structural chapter. That is not necessarily bad; it just means its chapter-role question is less settled than 7 and 9.

### What still feels weakest
- **Chapter 8** remains the weakest of the three, not because the prose is weak, but because its scope edge is still the most debatable. On a future pass, it may benefit from either:
  - one especially vivid recurring scenario that carries the chapter the way the Software Factory and High-Stakes Colleague carry other chapters, or
  - a slightly sharper decision on whether robotics/embodiment stays lightly gestured at or becomes a firmer secondary thread.

### Current manuscript feel
With Chapters 7–9 strengthened, the book now has a more convincing shape beyond the 1–6 spine. The outer-ring chapters feel less like appendices and more like consequences and stress tests of the core argument.

## 2026-05-13 — Opening runway completion pass

### What changed
- Created `Chapter 2 Draft v0 - Taste Still Matters When Code Gets Cheap.md`
  - turned the Chapter 2 packet into a real prose chapter rather than a thematic placeholder
  - made Chapter 2 the explicit human counterpart to Chapter 1’s delegated-execution argument
  - centered the chapter on taste, judgment, constraints, review, framing, and anti-slop discipline
  - kept a balanced stance on vibe coding: useful for exploration, dangerous as a default production philosophy
  - closed with a direct bridge into Chapter 3 by treating harnesses and specs as externalized judgment
- Created `public/drafting/Chapter 2 - Taste Still Matters When Code Gets Cheap.md`
  - added a concise public-safe derivative so the opening runway now has Chapters 1 and 2 mirrored publicly

### Editorial verdict
The strongest connected manuscript run now feels like:
1. **Chapter 1 — The Shift: From Assistant to Delegate**
2. **Chapter 2 — Taste Still Matters When Code Gets Cheap**
3. **Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use**
4. **Chapter 4 — Evals Are the Control System**
5. **Chapter 5 — Context Is Infrastructure**
6. **Chapter 6 — Runtimes, State, and the Human Control Plane**

### Why this sequence now works
- Chapter 1 establishes the shift from helpfulness to delegated work.
- Chapter 2 establishes what stays scarce when output gets cheap: judgment.
- Chapter 3 shows how that judgment becomes encoded into environments agents can actually use.
- Chapter 4 establishes the quality loop.
- Chapter 5 establishes the information architecture.
- Chapter 6 establishes the runtime and supervisory architecture.

### Current manuscript feel
This 1→6 run now reads much more like one continuous systems argument rather than an editorial opening followed by a separate technical book.

## 2026-05-12 — Middle-book continuity pass

### What changed
- Revised `Chapter 4 Draft v0 - Evals Are the Control System.md`
  - added a concrete software-factory failure slice around a production regression that looked locally fine but failed globally
  - tightened chapter cadence and made the control-system metaphor feel more operational
  - strengthened the bridge from Chapter 4 into Chapter 5
- Created `Chapter 5 Draft v0 - Context Is Infrastructure.md`
  - advanced the middle of the book with a true prose draft rather than another starter
  - used the High-Stakes Colleague as the main recurring case while keeping light continuity with the Software Factory
  - integrated active working sets, context topology, GraphRAG, hierarchical memory, and MCP into one argument
- Updated `public/drafting/Chapter 5 - Context Is Infrastructure.md`
  - replaced the skeleton with a public-safe derivative of the stronger chapter result

### Editorial verdict
The strongest connected manuscript run now feels like:
1. **Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use**
2. **Chapter 4 — Evals Are the Control System**
3. **Chapter 5 — Context Is Infrastructure**

### Why this sequence now works best
- Chapter 3 answers: how do you make delegated work possible?
- Chapter 4 answers: how do you know whether that delegated work is actually good?
- Chapter 5 answers: what must the system see, remember, and ignore for that work to succeed reliably?

### Current manuscript feel
This 3→4→5 stretch now reads less like a set of isolated infrastructure essays and more like a coherent middle spine of the book.
