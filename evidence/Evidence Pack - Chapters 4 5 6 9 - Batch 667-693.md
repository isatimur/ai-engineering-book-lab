# Evidence Pack — Chapters 4, 5, 6, and 9 (Batch 667–693)

## Purpose
Capture the strongest new deltas from the 667–693 ingest so the manuscript, claims layer, and public-safe derivatives stay cumulative instead of drifting into generic “agent trends.”

## Most important source cluster
- [[683-JT3OzDKrucU-combine-skills-and-mcp-to-close-the-context-gap-pedro-rodrigues-supabase|#683 — Pedro Rodrigues, Supabase]]
- [[654-pFsfax19yOM-skills-at-scale-nick-nisi-and-zack-proser-workos|#654 — Nick Nisi & Zack Proser, WorkOS]]
- [[686-0n3MKk7r60w-scaling-github-s-official-remote-mcp-server-sam-morrow-github|#686 — Sam Morrow, GitHub]]
- [[680-iOXM3zE-2dk-mind-the-gap-in-your-agent-observability-amy-boyd-nitya-narasimhan-microsoft|#680 — Amy Boyd & Nitya Narasimhan, Microsoft]]
- [[655--aM2EDTiaMs-everything-you-need-to-know-about-agent-observability-danny-gollapalli-and-ben-hylak-raind|#655 — Danny Gollapalli & Ben Hylak, Raindrop]]
- [[657-A48uhxfxbsM-playground-in-prod-optimising-agents-in-production-environments-samuel-colvin-pydantic|#657 — Samuel Colvin, Pydantic]]
- [[653-ow1we5PzK-o-the-multi-agent-architecture-that-actually-ships-luke-alvoeiro-factory|#653 — Luke Alvoeiro, Factory]]
- [[693-ObNKGf9YR0g-rewiring-the-state-eoin-mulgrew-10-downing-street|#693 — Eoin Mulgrew, 10 Downing Street]]

## Strongest new claims

### 1) MCP does not erase the context problem; it changes its shape
- Tools widen possible action.
- Skills, grouping, and progressive disclosure decide whether that wider action surface is usable.
- Best fit chapters: 5, 6.

### 2) Observability, evals, and production optimization now form one loop
- Trace-linked evals are more operationally credible than abstract offline scoring alone.
- Production failures become candidate regression slices.
- Best fit chapters: 4, 6.

### 3) Durable agents increasingly look evented, not merely conversational
- Histories, checkpoints, replay/snapshot tradeoffs, and human pause/resume points keep recurring across serious runtime talks.
- Best fit chapters: 6, 7.

### 4) Multi-agent leverage creates an organizational coherence problem
- More workers increase throughput only if plans, state, and review can be recomposed.
- Best fit chapters: 6, 9.

### 5) AI-native institutions need explicit operating coherence, not just enthusiastic local adoption
- The public-sector material broadens the book’s organization claim beyond startups and coding teams.
- Best fit chapters: 9, 10.

## Chapter-specific deltas

### Chapter 4 — Evals Are the Control System
- strengthen from “real tasks beat toy benchmarks” to “trace-linked evals + production observability form the real control loop”
- support the idea that evals should run against trajectories, not only final outputs
- keep caveat: richer observability increases privacy/governance load

### Chapter 5 — Context Is Infrastructure
- add explicit MCP + skills framing as a capability-surface problem
- distinguish document retrieval from capability packaging
- emphasize progressive disclosure, grouping, and context reduction as product work

### Chapter 6 — Runtimes, State, and the Human Control Plane
- sharpen “workflow over chat” into “durable/evented execution semantics are trust infrastructure”
- reinforce that history supports execution, observability, and later evals simultaneously
- connect subagent recomposition to shared mission state / explicit checkpoints

### Chapter 9 — The AI-Native Organization
- move from generic “review bottlenecks” to “coherence bottlenecks”
- show that institutions need shared state, visible workflow, and stronger organizational judgment surfaces
- use government/public-sector example as evidence that AI-native redesign is not just a startup phenomenon

## Useful caveats to preserve
- Skills are not a magic substitute for better tools or better models.
- Trace-linked evals can tempt over-instrumentation and retention mistakes.
- Durable workflows are not required for every assistant; the threshold is time, tool use, and review complexity.
- More agent parallelism can reduce total throughput if recomposition and review stay manual.

## Reusable phrases
- “The context gap is increasingly a capability-packaging problem.”
- “Observability is where tomorrow’s eval set comes from.”
- “A production agent is a workflow with memory, not a chat with ambition.”
- “AI-native advantage is coherence under delegated abundance.”
