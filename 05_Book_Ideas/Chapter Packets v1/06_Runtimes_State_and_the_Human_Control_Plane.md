# Chapter 6 — Runtimes, State, and the Human Control Plane

## Role in the book
Show that once agents operate over time, architecture matters: state, workflows, approvals, and runtime semantics become central.

## Supporting source cluster
- [[028-2czYyrTzILg-from-chaos-to-choreography-multi-agent-orchestration-patterns-that-actually-work-sandipan-|#28 — From Chaos to Choreography: Multi-Agent Orchestration Patterns That Actually Work — Sandipan Bhaumik]]
- [[038-k8cnVCMYmNc-openai-temporalio-building-durable-production-ready-agents-cornelia-davis-temporal|#38 — OpenAI + @Temporalio : Building Durable, Production Ready Agents - Cornelia Davis, Temporal]]
- [[044-kmV-qg4uoNI-building-durable-agents-with-workflow-devkit-ai-sdk-peter-wielander-vercel|#44 — Building durable Agents with Workflow DevKit & AI SDK - Peter Wielander, Vercel]]
- [[083-CEvIs9y1uog-don-t-build-agents-build-skills-instead-barry-zhang-mahesh-murag-anthropic|#83 — Don't Build Agents, Build Skills Instead – Barry Zhang & Mahesh Murag, Anthropic]]
- [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|#99 — From Stateless Nightmares to Durable Agents — Samuel Colvin, Pydantic]]
- [[111-12v5S1n1eOY-building-an-agentic-platform-ben-kus-cto-box|#111 — Building an Agentic Platform — Ben Kus, CTO Box]]
- [[164-UG9IAdmi2Dg-building-the-platform-for-agent-coordination-tom-moor-linear|#164 — Building the platform for agent coordination — Tom Moor, Linear]]
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167 — Scaling AI Agents Without Breaking Reliability — Preeti Somal, Temporal]]
- [[176-wXVvfFMTyzY-a2a-mcp-workshop-automating-business-processes-with-llms-damien-murphy-bench|#176 — A2A & MCP Workshop: Automating Business Processes with LLMs — Damien Murphy, Bench]]
- [[198-kTnfJszFxCg-3-ingredients-for-building-reliable-enterprise-agents-harrison-chase-langchain-langgraph|#198 — 3 ingredients for building reliable enterprise agents - Harrison Chase, LangChain/LangGraph]]
- [[201-sl3icG-IjHo-how-to-build-planning-agents-without-losing-control-yogendra-miraje-factset|#201 — How to Build Planning Agents without losing control - Yogendra Miraje, Factset]]
- [[202-j_TKDweOsYE-building-agents-the-hard-parts-rita-kozlov-cloudflare|#202 — Building Agents (the hard parts!) - Rita Kozlov, Cloudflare]]
- [[208-5rMc-moNVx0-stateful-environments-for-vertical-agents-josh-purtell-synth-labs|#208 — Stateful environments for vertical agents — Josh Purtell, Synth Labs]]
- [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623 — Collaborative AI Engineering: One Dev, Two Dozen Agents, Zero Alignment — Maggie Appleton, GitHub]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Codex and Subagents — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]]
- [[653-ow1we5PzK-o-the-multi-agent-architecture-that-actually-ships-luke-alvoeiro-factory|#653 — The Multi-Agent Architecture That Actually Ships — Luke Alvoeiro, Factory]]
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours — Ash Prabaker & Andrew Wilson, Anthropic]]
- [[704-5Sui_OnSRlY-the-missing-primitive-for-agent-swarms-lou-bichard-ona|#704 — The Missing Primitive for Agent Swarms — Lou Bichard, Ona]]

## Strongest claims
1. Stateless chat loops break down under long-running delegated work.
2. Durable execution, explicit state, and orchestration are core runtime requirements.
3. Human control planes are architectural necessities, not UX garnish.
4. Reliable autonomy depends on workflow semantics more than on a single "agent model."
5. Subagents and parallel workers increase leverage only when the control plane makes their work inspectable and reviewable.
6. Team alignment before execution belongs in this runtime story because planning and implementation are now cyclical rather than separate.

## Named tension — coordination, not parallelism, is the unsolved primitive

The Chapter 3 framing of the harness as a "software factory" implies the runtime question is "how do we run many writers in parallel and ship faster." Lou Bichard (Ona, #704) makes a sharper claim about where the actual bottleneck sits: runtime, orchestration, and triggers are solved (containers, Kubernetes, webhooks); what is missing is **coordination** — the agent-native primitive that lets workers pick up tasks, signal completion, and hand off without a human in the loop. He points specifically at state machines and durable execution as the most promising building blocks, which lands directly on this chapter's existing claim that workflow semantics matter more than a single "agent model."

This recasts the parallelism question (named in Chapter 3) as a runtime question: parallel-writer agents fail not because parallelism is bad in principle, but because there is no coordination layer for them to share. Alvoeiro at Factory (#653) chose the alternative path — eliminate the coordination problem by running features serially with one active writer at a time. Anthropic's planner-generator-evaluator (#691) chose yet another path — one writer per role, each in its own context window, with a pre-build "contract" negotiated by files on disk before any code is written. Bichard's diagnosis explains why both of these architectures look like progress: they each substitute a known coordination mechanism (serial execution, file-based negotiated contracts) for the missing primitive.

The chapter's existing claim that "subagents and parallel workers increase leverage only when the control plane makes their work inspectable and reviewable" should be updated to include the upstream claim: workers also need a coordination layer to pick up and hand off work. GitHub is **not** that layer.

**Sources — coordination as the missing primitive:**
- [[704-5Sui_OnSRlY-the-missing-primitive-for-agent-swarms-lou-bichard-ona|#704 — Lou Bichard, Ona]]
  - **Anchor:** `5Sui_OnSRlY` 00:06:06.920 → 00:06:10.760 · confidence: high
  - **Quote:** "one of the biggest difficulties if you try and build this today is effectively agent coordination."
  - **Anchor:** `5Sui_OnSRlY` 00:14:08.440 → 00:14:11.760 · confidence: high
  - **Quote:** "the runtime. There are many options for this now, sandboxes and and containers"
  - **Anchor:** `5Sui_OnSRlY` 00:14:17.000 → 00:14:17.920 · confidence: high
  - **Quote:** "the thing that's missing for me is coordination."
  - **Anchor:** `5Sui_OnSRlY` 00:12:28.560 → 00:12:32.400 · confidence: high
  - **Quote:** "GitHub is not a coordination layer for agents. It gets incredibly overwhelming."
  - **Anchor:** `5Sui_OnSRlY` 00:13:05.640 → 00:13:10.360 · confidence: high
  - **Quote:** "through sort of state machines, you know, by building out workflows and effectively state machines"
  - **Anchor:** `5Sui_OnSRlY` 00:01:29.040 → 00:01:34.480 · confidence: high
  - **Quote:** "some people talk about software factory with these like parallel agents, like one individual IC running lots of coding agents"

**Sources — single-writer, role-separated durability path (long-running without parallel writers):**
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Ash Prabaker & Andrew Wilson, Anthropic]] — capability curve: one-hour run with a minimal scaffold a year ago, twelve-hour run today with the same scaffold; the long-run mechanism is **planner-generator-evaluator with separate context windows and a file-based contract**, not many parallel writers.
  - **Anchor:** `mR-WAvEPRwE` 00:04:35.000 → 00:04:39.240 · confidence: high
  - **Quote:** "from Opus 3.7, it's around 1 hour and up to Opus 4.6,"
  - **Anchor:** `mR-WAvEPRwE` 00:14:54.560 → 00:14:58.560 · confidence: high
  - **Quote:** "this was a jump from about 4 hours up to 12 hours with sort of that very simple harness."
  - **Anchor:** `mR-WAvEPRwE` 00:24:58.520 → 00:25:01.440 · confidence: high
  - **Quote:** "We just kind of gave each role its own kind of context window."
  - **Anchor:** `mR-WAvEPRwE` 00:25:18.240 → 00:25:23.320 · confidence: high
  - **Quote:** "we have the two agents basically negotiate what done actually means."
- [[653-ow1we5PzK-o-the-multi-agent-architecture-that-actually-ships-luke-alvoeiro-factory|#653 — Luke Alvoeiro, Factory]] — serial execution with bounded internal parallelism; longest mission 16 days; coordination problem eliminated by construction.
  - **Anchor:** `ow1we5PzK-o` 00:09:50.440 → 00:09:52.600 · confidence: high
  - **Quote:** "The difference with missions is that we run features serially."
  - **Anchor:** `ow1we5PzK-o` 00:10:15.240 → 00:10:18.320 · confidence: high
  - **Quote:** "This is serial execution with with targeted internal parallelization."

**Sources — counterpoint: parallel sub-agent fan-out as the runtime leverage point:**
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]] — Codex sub-agents as the way to fan out a master task into parallel independent units.
  - **Anchor:** `MhHEGMFCEB0` 00:32:50.559 → 00:32:56.960 · confidence: high
  - **Quote:** "you can spin off um a master task into decomposible parallel and independent tasks"

## Useful quotes / excerpts
> "Building production AI agents reveals a harsh truth: stateless architectures that work for simple demos become impossibly painful at scale." — [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|Samuel Colvin]]

> "None of our current tools give teams a shared space to discuss plans, gather the right context, and work with agents as a collective." — [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|Maggie Appleton]]

> "Mini models ... tie in quite well with sub agents which allow you to parallelize ... at a faster rate." — [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|OpenAI Codex talk]]

## Open questions
- How much runtime taxonomy does the reader need before the book turns too platform-heavy?
- Which visual metaphor best explains the human control plane?
- Should collaborative planning live mostly here or in Chapter 9?
- If coordination is the unsolved primitive, does the chapter recommend any concrete substitute (serial execution, file-based contracts, state machines + durable execution) or simply name the gap? The honest answer in this corpus is "name the gap and show the three substitutes teams have actually shipped" — there is no consensus building block yet.
