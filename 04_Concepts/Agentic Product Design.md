# Agentic Product Design

## Working definition
Agentic product design is the practice of designing user-facing products in which AI agents take sequences of autonomous actions on behalf of users — requiring new interaction patterns, trust models, and feedback mechanisms that differ fundamentally from traditional UI design or conversational AI interfaces.

## Core synthesis
Most AI product design thinking inherited from chatbot UX: a text input, a response, a conversation thread. Agentic products break this model. When an agent runs for minutes or hours, takes dozens of actions, calls external services, and produces durable artifacts, the user's relationship with the system is fundamentally different. They are not conversing — they are delegating.

This surfaces design problems the corpus addresses from multiple angles:

**The trust initialization problem.** Users need to calibrate how much to delegate before they've seen the agent act. Products need onboarding that builds trust through low-stakes successful delegation, not just feature explanation.

**The observability problem.** Unlike chat, agent progress is not visible by default. Users need status surfaces that show what the agent has done, is doing, and plans to do — without requiring them to read logs. The Temporal workflow UI (Cornelia Davis, #38) is an infrastructure solution; the product design challenge is making this legible for non-engineers.

**The intervention problem.** Users need to interrupt, redirect, or approve at meaningful moments — not just at the end. Designing effective interrupt points requires knowing which agent decisions are high-stakes and which should proceed autonomously. This is the UX expression of constrained delegation.

**The accountability surface.** When agents act on a user's behalf, users need evidence that the action was appropriate. Receipts, audit logs, before/after states. This is both a trust mechanism and a practical necessity for regulated domains.

**The error recovery model.** When the agent gets it wrong, the user needs a path back that doesn't require starting over. Undo, partial redo, branch-from-checkpoint. The durability infrastructure (Temporal, Firecracker snapshots) enables this technically; the product must surface it.

## Design principles from the corpus

1. **Show work, not just results.** Agents that narrate their progress ("I found 3 candidate files, reviewing each...") produce more trust than agents that disappear and return with output.

2. **Make intervention cheap.** If the cost of interrupting is high (losing context, starting over), users will under-intervene and over-trust. Intervention should be a first-class affordance.

3. **Match autonomy to demonstrated reliability.** New users should see narrow delegation options. Experienced users who have calibrated trust should unlock broader autonomy. This is progressive trust.

4. **Escalation is a feature.** Agents should surface uncertainty and ask for guidance rather than guess. The product should make escalation easy and unremarkable — not a failure mode.

5. **Scope the blast radius visibly.** Users should know what the agent can and cannot touch before delegation begins. This reduces anxiety and enables appropriate delegation.

## Why it matters for the book
This concept connects the technical architecture (harnesses, constrained delegation, human control planes) to the user experience layer. It's the argument that the shift from chatbots to agents is a design problem, not just an engineering problem — and that the teams who solve the design problem will define the product category.

## Source cluster
- [[019-h403btjldDQ-paperclip-open-source-human-control-plane-for-ai-labor-dotta-bippa|#19 — Paperclip: Open Source Human Control Plane for AI Labor — Dotta Bippa]] *(queue-based oversight UI for delegated AI work)*
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206 — From Copilot to Colleague: Trustworthy Agents for High-Stakes — Joel Hron, Thomson Reuters]] *(trust calibration in regulated products)*
- [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623 — Collaborative AI Engineering — Maggie Appleton, GitHub]] *(agent coordination UX; many-agent visibility problem)*
- [[679-vi-2nasppAg-make-your-own-event-sourced-agent-harness-using-stream-processors-jonas-templestein-iterat|#679 — Event-Sourced Agent Harness — Jonas Templestein, Iterate]] *(real-time stream subscription as observability primitive)*
- [[691-mR-WAvEPRwE-build-agents-that-run-for-hours-without-losing-the-plot-ash-prabaker-andrew-wilson-anthrop|#691 — Build Agents That Run for Hours — Ash Prabaker & Andrew Wilson, Anthropic]] *(long-running agent UX: feature list as progress surface; sprint decomposition as user-legible checkpoints)*

## Open questions
- What are the right defaults for autonomy level at product launch? How should they evolve?
- How do you design effective intervention UX for non-technical users delegating to agents?
- When should agents escalate vs. attempt and report? What signals should drive this?
- How does agentic UX differ by domain (coding, legal, operations, personal productivity)?
