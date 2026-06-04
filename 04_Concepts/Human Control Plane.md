# Human Control Plane

## Working definition
The human control plane is the set of interfaces, approvals, observability layers, and intervention mechanisms through which people supervise, redirect, and bound AI work.

## Core synthesis
A recurring mistake in agent discourse is to treat human involvement as a temporary crutch on the path to full autonomy. The corpus suggests the opposite. In high-value systems, human control is not a bug to remove but an architectural layer to design well. The better the agent gets, the more important it becomes to decide when humans must approve, inspect, override, or teach.

This concept connects product UX, workflow architecture, and governance. Humans need more than a chat transcript. They need queue views, uncertainty signals, evidence trails, reversible actions, escalation paths, and interfaces for correcting the system without rewriting it from scratch.

The new batch adds two useful refinements. First, control planes increasingly supervise **many parallel workers**, not just one chat session. Second, control does not only mean approval at the end; it also means creating shared planning and review stages before and during execution.

## What this concept is really about
- Making oversight operationally cheap.
- Deciding where humans stay in, on, or above the loop.
- Translating trust into explicit checkpoints and affordances.
- Giving operators leverage over many AI workers, not only one conversation at a time.
- Turning team alignment into part of the control surface.

## Recurring patterns in the corpus
1. **Approval boundaries matter more as action power rises.**
2. **Observability is part of trust.** People need to see state, evidence, and planned actions.
3. **Intervention should be structured.** Free-form rescue via chat does not scale.
4. **Teaching loops need interfaces.** Operators must be able to correct policy, not just outputs.
5. **Control planes are domain-specific.** Legal, coding, support, and ops require different intervention surfaces.
6. **Parallelism raises control complexity.** Many subagents can create more leverage, but only if review and escalation remain tractable.
7. **Early alignment is a control mechanism.** Shared plans and context discussion reduce downstream review chaos.

## Important distinctions
### Human control is not human micromanagement
A good control plane reduces the need for constant intervention by putting humans at high-leverage checkpoints.

### Conversation is not governance
Chat alone is a poor supervisory mechanism for systems that can act across tools and time.

### Review is not enough
If the first real checkpoint is the final PR or action output, the control plane is arriving too late.

## Design implications
- Expose plans, evidence, and next actions before irreversible steps.
- Add structured approvals for high-risk transitions.
- Capture corrections in reusable policy or skill layers.
- Design dashboards and queues for supervising many tasks, not only individual sessions.
- Add explicit planning and review stages when teams are running many agents in parallel.

## Why it matters for the book
This concept provides one of the book's most memorable abstractions. It ties together harnesses, evals, security, and org design under a single control-oriented lens. The newer talks strengthen the argument that control planes must scale from single-agent oversight to team-level orchestration and review.

## Source cluster
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16 — Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI]]
- [[019-h403btjldDQ-paperclip-open-source-human-control-plane-for-ai-labor-dotta-bippa|#19 — Paperclip: Open Source Human Control Plane for AI Labor — Dotta Bippa]]
- [[176-wXVvfFMTyzY-a2a-mcp-workshop-automating-business-processes-with-llms-damien-murphy-bench|#176 — A2A & MCP Workshop: Automating Business Processes with LLMs — Damien Murphy, Bench]]
- [[198-kTnfJszFxCg-3-ingredients-for-building-reliable-enterprise-agents-harrison-chase-langchain-langgraph|#198 — 3 ingredients for building reliable enterprise agents - Harrison Chase, LangChain/LangGraph]]
- [[201-sl3icG-IjHo-how-to-build-planning-agents-without-losing-control-yogendra-miraje-factset|#201 — How to Build Planning Agents without losing control - Yogendra Miraje, Factset]]
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206 — From Copilot to Colleague: Trustworthy Agents for High-Stakes - Joel Hron, CTO Thomson Reuters]]
- [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623 — Collaborative AI Engineering: One Dev, Two Dozen Agents, Zero Alignment — Maggie Appleton, GitHub]]
- [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632 — Codex and Subagents — Vaibhav Srivastav & Katia Gil Guzman, OpenAI]]
- [[682-4_VQBbs2iQA-how-building-with-ai-can-double-the-throughput-of-your-engineering-team-brian-scanlan-inte|#682 — How Building with AI Can Double the Throughput of Your Engineering Team — Brian Scanlan, Intercom]] *(17.6% auto-approved PRs with compliance audit trail; human oversight preserved via SOC2/ISO27001/HIPAA)*
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours (Without Losing the Plot) — Ash Prabaker & Andrew Wilson, Anthropic]] *(adversarial evaluator as control plane: separate context window, negotiated contract, grades against spec not vibes)*

## Open questions
- What is the right default human checkpoint frequency by risk level?
- Which interventions should become productized controls versus expert-only overrides?
- How should teams measure the cost of supervision alongside the value of autonomy?
- What are the best interfaces for reviewing work produced by many parallel subagents?
