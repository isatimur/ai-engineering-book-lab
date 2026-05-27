# Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use

## Role in the book
Move from principle to mechanism. Show how teams prepare the environment so agents can work without blowing up quality.

## Supporting source cluster
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16 — Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI]]
- [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40 — Spec-Driven Development: Agentic Coding at FAANG Scale and Quality — Al Harris, Amazon Kiro]]
- [[042-rcsliSIy_YU-automating-large-scale-refactors-with-parallel-agents-robert-brennan-openhands|#42 — Automating Large Scale Refactors with Parallel Agents - Robert Brennan, OpenHands]]
- [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57 — Making Codebases Agent Ready – Eno Reyes, Factory AI]]
- [[077-I8fs4omN1no-hard-won-lessons-from-building-effective-ai-coding-agents-nik-pash-cline|#77 — Hard Won Lessons from Building Effective AI Coding Agents – Nik Pash, Cline]]
- [[087-wVl6ZjELpBk-future-proof-coding-agents-bill-chen-brian-fioca-openai|#87 — Future-Proof Coding Agents – Bill Chen & Brian Fioca, OpenAI]]
- [[177-DdaAABdAqZY-piloting-agents-in-github-copilot-christopher-harrison-microsoft|#177 — Piloting agents in GitHub Copilot - Christopher Harrison, Microsoft]]
- [[179-x_1EumTaXeE-beyond-the-prototype-using-ai-to-write-high-quality-code-josh-albrecht-imbue|#179 — Beyond the Prototype: Using AI to Write High-Quality Code - Josh Albrecht, Imbue]]
- [[180-o_hhkJtlbSs-software-development-agents-what-works-and-what-doesn-t-robert-brennan-openhands|#180 — Software Development Agents: What Works and What Doesn't - Robert Brennan, OpenHands]]
- [[190-Zniw5c9_jx8-mentoring-the-machine-eric-hou-augment-code|#190 — Mentoring the Machine — Eric Hou, Augment Code]]
- [[621--QFHIoCo-Ko-full-walkthrough-workflow-for-ai-coding-matt-pocock|#621 — Full Walkthrough: Workflow for AI Coding — Matt Pocock]]
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629 — Building your own software factory — Eric Zakariasson, Cursor]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Codex and Subagents — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]]
- [[653-ow1we5PzK-o-the-multi-agent-architecture-that-actually-ships-luke-alvoeiro-factory|#653 — The Multi-Agent Architecture That Actually Ships — Luke Alvoeiro, Factory]]
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours — Ash Prabaker & Andrew Wilson, Anthropic]]

## Strongest claims
1. Agent quality depends heavily on harness quality.
2. Specs, tests, and repo hygiene are part of the execution environment, not optional extras.
3. The practical unit of AI coding is the codebase, not the snippet.
4. Human steering should be designed into the workflow instead of bolted on afterward.
5. The harness is evolving from a local coding loop into a staged software factory: plan, produce, review, and ship.
6. Reusable skills, plugins, and subagents are becoming part of the harness, not just convenience features.

## Named tension — the parallelism question

The "software factory" framing in #629 (Cursor) and #632 (OpenAI Codex) leans on **parallel** sub-agents as the source of leverage — fan a master task into "decomposible parallel and independent tasks," spawn many workers, scale to hundreds or thousands. The most interesting wrinkle in the corpus is that **another AI software-factory company disagrees**: Luke Alvoeiro (Factory, #653) explicitly says Factory tried parallel software-engineering agents and abandoned them. Their production system (Missions) runs features **serially** with one active worker or validator at a time; parallelism is confined to read-only operations like codebase search and code review. The 16-day mission run is the longest data point in the corpus, and it was produced by a serial architecture. Anthropic's planner-generator-evaluator pattern (#691) is a third independent data point on the single-agent durability path — a single generator working in fresh context windows, not a parallel fan-out.

The tension is not "parallel vs. serial" in the abstract. Both sides agree that read-only work parallelizes well (search, review, lint). They disagree about whether multiple **writers** working concurrently on the same codebase produce more output or more thrash. The book should hold the disagreement open: the factory metaphor is directionally correct about the staged plan-produce-review-ship loop, but its literal implication that more parallel workers means more throughput is contested by teams shipping the systems.

**Sources — PRO parallel workers as the throughput mechanism:**
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629 — Eric Zakariasson, Cursor]]
  - **Anchor:** `rnDm57Py54A` 00:20:19.840 → 00:20:23.039 · confidence: high
  - **Quote:** "spawn a shitload of agents and just like let them do the work"
  - **Anchor:** `rnDm57Py54A` 00:21:54.080 → 00:21:56.720 · confidence: high
  - **Quote:** "you can scale this to like 100 or a thousand agents."
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]]
  - **Anchor:** `MhHEGMFCEB0` 00:32:50.559 → 00:32:56.960 · confidence: high
  - **Quote:** "you can spin off um a master task into decomposible parallel and independent tasks"
  - **Anchor:** `MhHEGMFCEB0` 00:10:53.519 → 00:10:57.600 · confidence: high
  - **Quote:** "sub aents which allow you to parallelize uh a particular feature or bug request"

**Sources — ANTI parallel writers; serial with bounded internal parallelism:**
- [[653-ow1we5PzK-o-the-multi-agent-architecture-that-actually-ships-luke-alvoeiro-factory|#653 — Luke Alvoeiro, Factory]]
  - **Anchor:** `ow1we5PzK-o` 00:09:32.880 → 00:09:36.440 · confidence: high
  - **Quote:** "it doesn't really work for tasks in the like software dev domain because agents conflict."
  - **Anchor:** `ow1we5PzK-o` 00:09:37.400 → 00:09:42.000 · confidence: high
  - **Quote:** "They step on each other's changes. They duplicate work. They make inconsistent architectural decisions."
  - **Anchor:** `ow1we5PzK-o` 00:09:50.440 → 00:09:52.600 · confidence: high
  - **Quote:** "The difference with missions is that we run features serially."
  - **Anchor:** `ow1we5PzK-o` 00:10:15.240 → 00:10:18.320 · confidence: high
  - **Quote:** "This is serial execution with with targeted internal parallelization."
  - **Anchor:** `ow1we5PzK-o` 00:09:06.200 → 00:09:08.440 · confidence: high
  - **Quote:** "Our longest mission ran for 16 days"
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Ash Prabaker & Andrew Wilson, Anthropic]] — single-generator durability path; a fresh-context evaluator pushes back, but only one writer at a time.
  - **Anchor:** `mR-WAvEPRwE` 00:14:54.560 → 00:14:58.560 · confidence: high
  - **Quote:** "this was a jump from about 4 hours up to 12 hours with sort of that very simple harness."
  - **Anchor:** `mR-WAvEPRwE` 00:24:58.520 → 00:25:01.440 · confidence: high
  - **Quote:** "We just kind of gave each role its own kind of context window."

**Caveat anchor — narrow, low-conflict scopes where parallel writers do work:**
- [[042-rcsliSIy_YU-automating-large-scale-refactors-with-parallel-agents-robert-brennan-openhands|#42 — Robert Brennan, OpenHands]] — parallel refactor agents succeed where each agent's blast radius is tightly scoped by batching and narrow instructions.

## Useful quotes / excerpts
> "Humans steer and agents execute." — [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|Ryan Lopopolo]]

> "Using spec-driven development to sharpen your AI toolbox." — [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|Al Harris]]

> "The software factory ... agents going around doing their thing ... and you as a manager just provides the intent and the instructions." — [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|Eric Zakariasson]]

> "A unified agent harness ... wrapper for tool execution, for environment setup ... with safety embedded in that harness." — [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|OpenAI Codex talk]]

## Open questions
- Should harness engineering and spec-driven development stay in one chapter or split into two shorter chapters?
- What is the cleanest minimal checklist for an "agent-ready codebase"?
- Which concrete case study best shows the payoff of improving the harness?
- Should the chapter explicitly introduce the "software factory" metaphor, or save it for later runtime/org chapters?
- How should the chapter resolve the parallelism question without flattening it? The minimum honest move is to introduce the factory metaphor as a description of staged work, not as a license for unbounded parallel writers, and to cite Alvoeiro's serial-with-bounded-parallelism position alongside Zakariasson's spawn-a-thousand-agents position so the reader sees the disagreement.
