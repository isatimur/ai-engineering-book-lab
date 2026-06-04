# Harness Engineering

## Working definition
Harness engineering is the design of the environment, constraints, interfaces, and feedback loops that let humans steer agents while agents execute useful work.

## Core synthesis
This is one of the clearest organizing concepts in the corpus. The key shift is away from treating AI coding as a raw model interaction and toward treating it as an engineered work cell. A harness is everything around the model that makes delegated execution safe and useful: repo structure, task framing, tests, permissions, observability, edit boundaries, validation steps, and recovery flows.

The recurring claim is that capability without harness leads to spectacle, not dependable output. Good agents are not only smart; they are well-situated. They have enough access to act, enough constraint to avoid damage, and enough feedback to improve step by step.

The newest batch sharpens this further by showing the harness expanding into a **software factory**: planning stages, specialized subagents, codified review steps, reusable skills/plugins, and environment-level safety boundaries. The harness is not just a wrapper around one agent call. It is becoming the production system in which many agents cooperate.

## What this concept is really about
- Converting open-ended generation into bounded execution.
- Designing the workspace in which agents operate.
- Making human oversight practical without forcing humans to micromanage every token.
- Shifting quality from prompt cleverness to system design.
- Turning one-off AI assistance into repeatable assembly lines for delegated work.

## Recurring patterns in the corpus
1. **Constraints are enabling.** Explicit limits make autonomy usable.
2. **Tests and specs are part of the harness.** They define what counts as success.
3. **Good harnesses externalize state.** Plans, diffs, logs, and checkpoints reduce hidden failure.
4. **Repository quality affects agent quality.** Messy codebases create noisy action spaces.
5. **Harnesses evolve with task scope.** What works for single edits fails for wide refactors.
6. **Review is a harness stage, not a cleanup chore.** Planning, production, and review increasingly form one codified pipeline.
7. **Specialization beats monolithic prompting.** Reusable skills, plugins, and subagents let teams package workflows instead of restating them.

## Important distinctions
### Harness vs agent
The agent is the decision-making component. The harness is the operating environment that determines how those decisions are constrained, checked, and observed.

### Oversight vs interruption
A harness should make oversight cheap. If humans must constantly rescue the system, the harness is underbuilt.

### Factory vs black box
A software factory can feel "dark" from the outside, but dependable ones still require visible stages, guardrails, and escalation points.

## Design implications
- Build task templates, edit boundaries, and validation steps into the workflow.
- Make plans and intermediate artifacts visible by default.
- Use tests, linters, and repo-specific rules as part of the execution environment.
- Treat harness quality as a product surface for internal platform teams.
- Package recurring workflows into skills, plugins, and reusable SOP-like rules.
- Deliberately separate plan, produce, review, and ship stages.

## Why it matters for the book
Harness engineering is arguably the technical center of the book. It is where the main thesis becomes operational: delegated machine work becomes dependable only when the surrounding environment is deliberately engineered. The late-corpus material makes the idea more concrete by showing how harnesses scale from pair-programming shells into multi-agent factories.

## Source cluster
- [[008-mYSRn6PC1mc-full-workshop-build-your-own-deep-research-agents-louis-fran-ois-bouchard-paul-iusztin-sam|#8 — Full Workshop: Build Your Own Deep Research Agents - Louis-François Bouchard, Paul Iusztin, Samridhi]]
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16 — Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI]]
- [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57 — Making Codebases Agent Ready – Eno Reyes, Factory AI]]
- [[077-I8fs4omN1no-hard-won-lessons-from-building-effective-ai-coding-agents-nik-pash-cline|#77 — Hard Won Lessons from Building Effective AI Coding Agents – Nik Pash, Cline]]
- [[180-o_hhkJtlbSs-software-development-agents-what-works-and-what-doesn-t-robert-brennan-openhands|#180 — Software Development Agents: What Works and What Doesn't - Robert Brennan, OpenHands]]
- [[190-Zniw5c9_jx8-mentoring-the-machine-eric-hou-augment-code|#190 — Mentoring the Machine — Eric Hou, Augment Code]]
- [[621--QFHIoCo-Ko-full-walkthrough-workflow-for-ai-coding-matt-pocock|#621 — Full Walkthrough: Workflow for AI Coding — Matt Pocock]]
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629 — Building your own software factory — Eric Zakariasson, Cursor]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Codex and Subagents — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]]
- [[682-4_VQBbs2iQA-how-building-with-ai-can-double-the-throughput-of-your-engineering-team-brian-scanlan-inte|#682 — How Building with AI Can Double the Throughput of Your Engineering Team — Brian Scanlan, Intercom]] *(strongest empirical case: 2x throughput via skills flywheel + auto-approval pipeline; harness at org scale)*
- [[690-C_GG5g38vLU-harnesses-in-ai-a-deep-dive-tejas-kumar-ibm|#690 — Harnesses in AI: A Deep Dive — Tejas Kumar, IBM]] *(clearest conceptual definition: 5 components; verify step; demo shows harness > prompt engineering for reliability)*
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours (Without Losing the Plot) — Ash Prabaker & Andrew Wilson, Anthropic]] *(Planner-Generator-Evaluator; pre-build contracts; harnesses co-evolve with model capability)*

## Open questions
- What should a minimal agent harness include before broad rollout?
- How much harness should be generic platform versus repo-specific policy?
- Which harness features most reduce review burden in practice?
- At what point does a harness become a team-wide software factory rather than an individual productivity tool?
