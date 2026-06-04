# Constrained Delegation

## Working definition
Constrained delegation is the practice of assigning AI agents meaningful, open-ended work while enforcing explicit boundaries on what they can observe, decide, and act upon. The constraints are not temporary training wheels on the path to full autonomy — they are the architecture that makes delegation trustworthy at scale.

## Core synthesis
The central thesis of the book, and the organizing concept that connects harnesses, human control planes, durable agents, evals, and org design into a coherent argument. The corpus's recurring message is that the difference between a demo agent and a production agent is not intelligence — it is constraint design.

Constrained delegation has three dimensions:

**1. Scope constraints** — what the agent is allowed to see and do. File system access, database permissions, tool registries, network boundaries. Scoping is not just security; it reduces the agent's action space and makes its decisions more predictable. The Intercom skills model is a scope constraint at the organizational level: agents can only invoke well-tested, institutionally-approved skills.

**2. Delegation contracts** — explicit specification of what "done" means before work begins. The most concrete example: Ash Prabaker's Planner-Generator-Evaluator harness (#691) requires the generator and evaluator to negotiate a written contract (27+ criteria) before a single line of code is written. The evaluator then grades against the contract, not the original vague spec. This is delegation with a specification, not delegation with a prayer.

**3. Accountability mechanisms** — how humans verify the work and intervene when needed. Temporal workflow UIs (Cornelia Davis, #38), auto-approval audit trails (Brian Scanlan, #682), adversarial evaluators (Ash Prabaker, #691), and event stream observability (Jonas Templestein, #679) are all accountability mechanisms. They give humans visibility into agent decisions at the moment of delegation, not only at the end.

## The central argument
The book argues that constrained delegation is not a compromise — it is the correct model for AI work. Unconstrained delegation (give the agent the goal and get out of the way) produces spectacular demos and unreliable production systems. Constrained delegation produces colleagues: agents that can take on substantial work, make real decisions, and deliver consistent results because the boundaries are clear, the contracts are explicit, and the accountability is built in.

## Why constraints enable rather than limit
A seemingly paradoxical finding from the corpus: more constrained agents complete more work reliably. The mechanism is straightforward. An agent with a well-scoped action space makes fewer irreversible mistakes, is easier to recover from failure, and can be trusted with larger tasks. Guardrails are not cages — they are the definition of the job.

Tejas Kumar's demo makes this visible in miniature (#690): the same GPT-3.5 Turbo model, with a harness (constraints + verify step), goes from lying constantly to producing correct results. Zero prompt changes.

## Connection to organizational design
Constrained delegation scales from agents to teams. At Intercom (#682), the constraint architecture is organizational: platform consolidation (all-in on one tool), skills infrastructure (encoded institutional knowledge), and executive mandate (clear expectations). These are org-level constraints that make team-wide delegation reliable. The 2x throughput result is not from removing constraints — it is from designing better ones.

The maturity ladder Intercom tracks maps directly onto delegation depth: use Claude for everything → automate your work → move that to a skill → write and approve skills → optimize the environment for agents. Each step is a delegation contract becoming more explicit and more durable.

## The reliability triad
The corpus converges on three components required for constrained delegation to work in practice:

1. **Explicit scope** (what the agent can touch)
2. **Negotiated contract** (what done means)
3. **Adversarial evaluation** (a checker that is not the agent itself)

All three are required. Any two without the third produces a partial solution: scope without contract = agent that stays in bounds but doesn't know what it's building; contract without adversarial eval = specification that the agent grades its own work against (sycophancy); evaluation without scope = evaluator that can't distinguish bounded success from partial completion.

## Why it matters for the book
This is the concept that makes the book's argument coherent rather than anecdotal. Every other concept in the corpus — durable agents, harness engineering, human control planes, evals, MCP design, org design — is a specific instantiation of constrained delegation. The book's contribution is to name the pattern, show it operating across different scales (individual agents, teams, organizations), and argue that it is the architectural primitive for the transition from AI assistance to AI work.

## Source cluster
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16 — Harness Engineering — Ryan Lopopolo, OpenAI]] *(original harness framing; scope + oversight as first principles)*
- [[038-k8cnVCMYmNc-openai-temporalio-building-durable-production-ready-agents-cornelia-davis-temporal|#38 — Building Durable, Production Ready Agents — Cornelia Davis, Temporal]] *(accountability mechanism: workflow UI shows every agent decision)*
- [[039-96G7FLab8xc-your-mcp-server-is-bad-and-you-should-feel-bad-jeremiah-lowin-prefect|#39 — Your MCP Server is Bad and You Should Feel Bad — Jeremiah Lowin, Prefect]] *(scope constraints at MCP layer: flat args, curated token budget)*
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206 — From Copilot to Colleague: Trustworthy Agents for High-Stakes — Joel Hron, Thomson Reuters]] *(delegation with accountability in regulated environments)*
- [[666-svCnShDvgQg-two-roads-to-durable-agents-replay-vs-snapshot-eric-allam-trigger-dev|#666 — Two Roads to Durable Agents — Eric Allam, Trigger.dev]] *(VM isolation as compute-level scope constraint)*
- [[679-vi-2nasppAg-make-your-own-event-sourced-agent-harness-using-stream-processors-jonas-templestein-iterat|#679 — Event-Sourced Agent Harness — Jonas Templestein, Iterate]] *(event stream as accountability mechanism: every action is in the log)*
- [[682-4_VQBbs2iQA-how-building-with-ai-can-double-the-throughput-of-your-engineering-team-brian-scanlan-inte|#682 — How Building with AI Can Double the Throughput of Your Engineering Team — Brian Scanlan, Intercom]] *(org-scale constrained delegation: skills flywheel + auto-approval with SOC2 audit trail)*
- [[690-C_GG5g38vLU-harnesses-in-ai-a-deep-dive-tejas-kumar-ibm|#690 — Harnesses in AI: A Deep Dive — Tejas Kumar, IBM]] *(five-component taxonomy; verify step as adversarial eval lite; "model is commodity, harness is product")*
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours — Ash Prabaker & Andrew Wilson, Anthropic]] *(clearest example: delegation contracts negotiated before work begins; adversarial evaluator grades against spec)*

## Open questions
- What is the minimum viable constraint set for a given delegation level? Is there a principled way to calibrate scope, contract depth, and evaluation frequency by task risk?
- How should delegation contracts be versioned and maintained as the task domain evolves?
- At what point does constraint design itself become a bottleneck — and how do you know when you've over-constrained?
- Can harnesses that generate their own constraints (Tejas Kumar's 2027 prediction) maintain the accountability properties of human-designed constraint sets?
