# Software Factory

## Working definition
A software factory is an AI-native production system in which specialized agents handle distinct stages of the software delivery pipeline — planning, implementation, review, testing, and deployment — with humans supervising the pipeline rather than executing within it.

## Core synthesis
The software factory concept is the logical endpoint of the harness engineering trajectory. Where early AI coding tools augmented individual engineers, the software factory treats the pipeline itself as the product: multiple agents with differentiated roles, shared state, and codified handoffs between stages.

The corpus's clearest articulations:

**Brian Scanlan / Intercom (#682):** Intercom's "Project 2x" is operationally a software factory. The skills catalog encodes institutional knowledge that any agent can invoke. The automated review pipeline (17.6% auto-approved PRs) is a factory production stage. The maturity ladder — use Claude → automate → skill → optimize environment for agents — is a roadmap for building a factory incrementally.

**Ash Prabaker & Andrew Wilson / Anthropic (#691):** The Planner-Generator-Evaluator harness is a three-stage factory: a planner that decomposes work, a generator (implementation stage), and an evaluator (QA stage) that uses a live app rather than reading diffs. Each role gets its own context window — "we didn't invent this, we just gave each role its own context window." The pre-build contract is the factory's work order.

**Eric Zakariasson / Cursor (#629):** Describes the practical implementation of a software factory at Cursor: tasks parallelized across many agent instances, a review stage built into the workflow, and a shared repository structure that agents can navigate without human orientation.

## Factory stages (from corpus)
1. **Decomposition / planning** — taking a vague goal and producing a structured work order. The Planner in the Anthropic harness; the product spec in spec-driven development.
2. **Implementation** — the Generator. Multiple parallel agents working on different features or aspects.
3. **Quality assurance** — the Evaluator. Not diff-reading but actual app usage; adversarial rather than self-evaluating.
4. **Review and approval** — human-in-the-loop or automated (with audit trail). Intercom's 17.6% auto-approval is the most mature example.
5. **Skill / knowledge capture** — turning one-off solutions into reusable factory components. Intercom's skills catalog; Cursor's agent templates.

## Why it matters for the book
Chapter 6 (software factory) is organized around this concept. The factory framing explains the throughput multipliers visible in the corpus (2x at Intercom) and provides the organizational structure for thinking about AI engineering teams: not "every engineer uses AI tools" but "the team runs a software factory and humans design and supervise the pipeline."

## Source cluster
- [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629 — Building your own software factory — Eric Zakariasson, Cursor]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Codex and Subagents — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]]
- [[682-4_VQBbs2iQA-how-building-with-ai-can-double-the-throughput-of-your-engineering-team-brian-scanlan-inte|#682 — How Building with AI Can Double the Throughput of Your Engineering Team — Brian Scanlan, Intercom]] *(primary empirical case: 2x throughput; skills flywheel; automated review pipeline)*
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours — Ash Prabaker & Andrew Wilson, Anthropic]] *(Planner-Generator-Evaluator as three-stage factory; pre-build contracts as work orders)*

## Open questions
- What is the right team-to-factory ratio? How many humans does a functioning software factory require?
- Which factory stages benefit most from specialization vs. generalist agents?
- How does factory design change as model capability continues to improve?
