# Autoresearch Iteration — 2026-05-26

## Posture

The manuscript spine (10 chapter packets + v0 drafts) is complete and anchored to videos ≤632. The corpus, however, runs to **#708** — 76 videos (#633–#708) are ingested with reworked summaries but **not one** is cited in any Chapter Packet, and only eight of them (#653, #654, #655, #657, #680, #683, #686 [misattributed], #693) appear in the Claims Ledger. The biggest gap is therefore not absent material — it is a synthesis lag. Two delta memos (`Recent Batch 661-666`, `Batch 667-693`) already pre-digested most of the recent corpus and explicitly recommend chapter integration that has not happened. Batch 633–660 has no delta memo at all, and #694–#708 is freshly reworked but un-synthesized. Underneath the lag, the corpus has materially strengthened at least four chapters (3, 5, 6, 8, 9) and surfaced one genuine new tension (parallel-agent skepticism vs. software-factory enthusiasm).

## Corpus delta

- **Highest cited video in Chapter Packets v1 and Source-Backed Outline v2:** #632 (Codex & Subagents — OpenAI)
- **Latest ingested:** #708 (Inside Google's Agent Infrastructure — KP Sawhney & Ian Ballantyne)
- **Cited in Claims Ledger but not in any Chapter Packet:** #653, #654, #655, #657, #680, #683, #686 (misattributed — see weak claims section), #693
- **Ingested, reworked, but not cited anywhere in the book layer (sample of highest-leverage 12 from a population of 68):**
  - **#646** Ralph Loops: Build Dumb AI Loops That Ship — Chris Parsons (Cherrypick) — minimalist loop-shaped harness pattern, fits Chapter 3 or 6
  - **#653** Multi-Agent Architecture That Actually Ships — Luke Alvoeiro (Factory) — taxonomy of 5 patterns; **explicit anti-parallelism claim**; 16-day mission; validation contracts. Chapter 3/6/9
  - **#665** Hierarchical Memory in Agents — Sally-Ann Delucia — directly resolves Chapter 5's memory question; named in batch memo
  - **#666** Replay vs Snapshot — Eric Allam (Trigger.dev) — cleanest taxonomy of durable-agent architectures in the corpus; Firecracker micro-VM data point. Chapter 6
  - **#679** Event-Sourced Agent Harness — Jonas Templestein (Iterate) — durable inspectable harness pattern; Chapter 6
  - **#685** Context Graphs — Stephen Chin (Neo4j) — successor to his #105 talk; Gartner + $3T datapoints; financial loan-approval case study. Chapter 5
  - **#686** Oracle/Evaluator/Architect framework — Chris Lovejoy (Notius) — domain-expert org pattern; three case studies (Granola, Tandem, Anterior). Chapter 9
  - **#689** Fighting AI with AI — Lawrence Jones (incident.io) — CLI evals consumable by coding agents; "download your UI as a file system" pattern. Chapter 4
  - **#691** Build Agents That Run for Hours — Ash Prabaker & Andrew Wilson (Anthropic) — planner/generator/evaluator pattern, harness/model co-evolution. Chapter 3/6
  - **#702** Codex Spark: Fast Models Need Slow Developers — Sarah Chieng (Cerebras) — 1,200 tok/s changes pair-vs-async tradeoff; four-file external memory; **directly bears on Chapter 2's vibe-coding question**
  - **#704** Missing Primitive for Agent Swarms — Lou Bichard (Ona) — names "coordination" as the unsolved primitive; Stripe Minions / Ramp Inspect as real case studies. Chapter 6/9
  - **#706** Heterogeneous Intelligence — Adrian Bertagnoli (Callosum) — quantified case (7× cheaper, 18% better) for mixing small/cheap and frontier models per subproblem. Chapter 6/10
- **~56 additional 633–708 videos** are ingested but rated peripheral by the two batch memos (or, for #633–660, simply un-triaged). Honest assessment: at least 12–15 of these are publication-quality talks; the rest are confirmatory.

## Enrichment targets (ranked by leverage)

### Target 1: Promote the existing Chapter 8 voice update from the batch memo into the chapter packet

- **Why now:** The `Recent Batch 661-666` memo (already on disk) explicitly recommends a Chapter 8 rewrite using #661/#662/#663 as the new primary cluster. The current Chapter 8 anchor sources (#26, #145, #146, #174) are the oldest cluster on the spine and #174 (Waymo) is the only post-2026 source. The memo's last action item — "Update the Chapter 8 starter with #661-#663 as the primary source cluster" — has not been executed. This is the lowest-friction, highest-defensibility update available because the analytical work is already done; the pass is mechanical promotion + anchor capture.
- **Source cluster:** #661 Luke Harries (ElevenLabs) — voice as a realtime wrapper over chat agents; #662 Neil Zeghidour (Gradium) — interruption/overlap/backchanneling as system problems; #663 Samuel Humeau (Mistral) — TTS architecturally converging on LLMs.
- **What to extract:** Observation that voice/realtime is no longer a model-quality problem but a tool-latency/interruption/state-coordination problem. Implication: the book's general "scaffolding determines reliability" thesis generalizes cleanly to realtime — strengthens Chapter 10's "what endures" close.
- **Proposed claim (promotable):** *Realtime AI quality is primarily a coordination and latency-engineering problem, not a model-quality problem.* Anchors required from #662 (interruption/overlap/tool-latency framing) + #661 (wrap-don't-rebuild pattern) + supporting from #663 (TTS architecture convergence).
- **Risk:** Voice talks tend to be vendor-coded. Need to anchor on operating constraints (interruption, latency) rather than product demos. Use the existing memo's framing — it already disciplines this.

### Target 2: Add the parallel-agent counter-claim to Chapters 3 and 6 — current spine is one-sided

- **Why now:** Existing Chapter 3 cites #629 ("software factory") and #632 ("subagents") and Claim #14 in the ledger frames the harness as "evolving into a software factory." The corpus now contains a strongly-argued opposing voice: **Luke Alvoeiro (#653)** runs Factory's Missions product *serially* with *targeted internal parallelism* and explicitly claims parallel software-engineering agents "almost always" perform worse because they conflict, duplicate work, and make inconsistent architectural decisions. Their longest mission was 16 days. **#704 (Lou Bichard, Ona)** independently arrives at the same gap from a different angle: coordination is the unsolved primitive that prevents fleets from working. **#691 (Anthropic, 5–6 hour single-agent runs)** is a third independent data point on the single-agent durability path. The autoresearch program explicitly forbids flattening disagreement — and the current manuscript is doing exactly that.
- **Source cluster:** #653 Luke Alvoeiro (Factory), #704 Lou Bichard (Ona), #691 Ash Prabaker & Andrew Wilson (Anthropic), with #042 Robert Brennan (OpenHands, already-cited parallel-refactor advocate) as the dialectical foil.
- **What to extract:** A **named tension** — "the parallelism question" — sitting between the software-factory metaphor and the lived experience of teams shipping multi-agent systems. Both sides are public, dated, and well-sourced.
- **Proposed claim:** *Parallel software-engineering agents underperform serial ones on most tasks; productive multi-agent setups are typically serial with bounded internal parallelism.* Anchor from #653 (explicit claim + 16-day mission data), supporting from #704 (coordination as missing primitive), with caveat anchor from #042 (parallel refactors do work in narrow, low-conflict scopes).
- **Risk:** This contradicts the existing "software factory" framing of Claim #14 and the closing energy of Chapter 9. The right move is to keep the metaphor but qualify it — the factory metaphor describes orchestration of work-units, not literal worker-parallelism. Without this nuance, a careful reader will flag the book as one-sided.

### Target 3: Extract a Chapter 4 update on coding-agent-consumable evals (Lawrence Jones, #689)

- **Why now:** Chapter 4's open question asks "Should the chapter include a dedicated section on eval platforms as organizational infrastructure?" Lawrence Jones (incident.io, #689) makes the strongest operational case in the corpus that **evals must be coding-agent-readable**, not just human-readable: CLI tool, YAML eval files, "download your UI as a file system" pattern so Claude Code can grep through traces. This is a new kind of claim — not "evals matter" (well supported) and not "trace-linked evals" (already in Claim #19) but "evals must be machine-modifiable by the *next* layer of agents." It closes the loop the book has been opening since Chapter 1.
- **Source cluster:** #689 Lawrence Jones (incident.io), with #680 Amy Boyd & Nitya Narasimhan (Microsoft, already in ledger) as supporting "trace-linked" anchor and #655 Danny Gollapalli & Ben Hylak (Raindrop, already in ledger) on observability-as-eval.
- **What to extract:** Implication that the eval system itself becomes an agent-actionable artifact. This is a promotable extension of Claim #8 ("evals are a control system") and Claim #19 ("trace-linked evals").
- **Proposed claim:** *In agent-heavy organizations, eval suites must be readable and modifiable by coding agents — not only by humans — so that the same agents being evaluated can participate in improving their own measurement.* Anchor from #689 (CLI-eval-tool pattern, parallelized "scrapbook" analysis, 25 concurrent agents).
- **Risk:** The claim is at the edge of what one talk supports. Keep promotion conservative — strengthens an existing claim rather than seeding a new one. If a second, independent source can be added (consider scanning #695 Marc Klingen's Langfuse skill talk for crossover), promote with more weight.

## Weak claims that could now be strengthened

- **Claim #14 (harness evolving into software factory, support: moderate)** → currently leans on #629 + #632 + #042. The dialectical strengthening from Target 2 (#653 + #704 + #691) would turn this from a moderate one-sided directional claim into a strong nuanced claim with named tension. **This is the single highest-leverage strengthening available** because the new evidence both confirms the trajectory (factories exist) and disciplines the metaphor (they don't work the way the metaphor suggests).
- **Claim #10 (context failure is a system-assembly problem, support: moderate)** → can be reinforced by #685 (Stephen Chin / Neo4j context graphs, the successor to his #105 talk already in the cluster) + #665 (hierarchical memory). Concrete enterprise case study from #685 (financial loan approval with auditable trail) would replace the currently-thin context-platform anchor on #104.
- **Claim #7 (agent-ready codebases are designed, support: moderate)** → would be strengthened by #646 (Ralph Loops, Chris Parsons) on minimal harness shape + #644 (Peter Werry, Unblocked) on "mergeable by default." Both summaries are currently thin — need a deeper read before promoting.

## Open tensions worth a deeper pass

- **Parallelism (Chapter 3/6/9):** The factory metaphor (#629 Eric Zakariasson, #632 OpenAI Codex) vs. the parallel-skeptic position (#653 Luke Alvoeiro Factory, #704 Lou Bichard Ona). The most interesting wrinkle: **Eric Zakariasson at Cursor** and **Luke Alvoeiro at Factory** both work at "AI software factory" companies and disagree about whether the parallelism is the point. This is the cleanest named tension in the corpus.
- **Vibe coding (Chapter 2):** The chapter's open question asks "How polemical should the book be about vibe coding?" #702 (Sarah Chieng, Cerebras: "fast models need slow developers") delivers a sharper version of the anti-vibe argument than anything currently in Chapter 2's anchor cluster — and frames it as a *function of inference speed*, not a function of taste. Worth a focused pass.
- **Voice as the rest of the book's stress test (Chapter 8/10):** The voice cluster (#661/#662/#663) keeps pointing back to general scaffolding problems (state, latency, tool-call timing, interruption-as-supervision). A short Chapter 10 callback could promote Chapter 8 from a stress test into a confirmation chapter.

## What you did NOT recommend (and why)

- **A pass on #685 Stephen Chin (Context Graphs) as a standalone Chapter 5 anchor swap.** It's clearly publication-quality material and the Neo4j/Gartner data is concrete. But Chapter 5 already cites Chin's #105 talk; #685 is incremental on the same author's framing and the existing #105 + #218 (Zep) + #193 (Glean) cluster is the strongest section in the manuscript. Better used inside Target 2 as supporting reinforcement than as its own pass.
- **A pass on #706 Heterogeneous Intelligence (Adrian Bertagnoli, Callosum).** The benchmark data (7× cheaper, 18× cheaper, 18% better than GPT 5.2 alone on WebVoyager) is genuinely interesting and would strengthen Chapter 6 and possibly Chapter 10's "what endures." Held back because it's a single vendor-coded talk with self-reported numbers and no second independent source in the corpus yet. Worth flagging as a watch-item: if a non-Callosum talk corroborates the "match model to subtask" pattern with independent data, promote immediately.
- **A full pass on the 633–660 batch.** No delta memo exists for this range, so the work begins with reading 28 videos to triage. The expected yield is low — most batch-666 memo signals suggest videos are confirmatory rather than chapter-shaping. The three targets above can be executed without this batch; do it later if the calendar allows.

## Bug found while surveying (flag, do not fix in this pass)

- **Claims Ledger #15, #17, #18 cite `[[686-0n3MKk7r60w-scaling-github-s-official-remote-mcp-server-sam-morrow-github|#686 — Sam Morrow, GitHub]]`.** The video_id `0n3MKk7r60w` actually corresponds to **#625** in the corpus (`625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github.md`). Video #686 is "How to Leverage Domain Expertise — Chris Lovejoy, Notius Labs." The anchors themselves are valid (the video_id and timestamps are correct); only the display number and wikilink are wrong. Three claims affected. Trivial fix; should be batched into the next anchor-pass.
