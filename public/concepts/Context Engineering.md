# Context Engineering

## Working definition
Context engineering is the discipline of deciding what information an AI system should see, in what form, at what moment, and with what guarantees of relevance, freshness, and cost.

## Core synthesis
The corpus consistently treats context as infrastructure, not prompt ornament. As models improve, the bottleneck shifts toward selecting and shaping the working set: code, docs, memory, policies, state, examples, and tool outputs. Better models do not remove the need for context engineering; they often increase it by making more ambitious workflows possible.

The newer material sharpens the problem in two ways. First, context is increasingly an interface-design problem, not only a retrieval problem. Once tools, APIs, and remote servers become part of the agent environment, teams must decide what capabilities are visible, how they are grouped, and when they should even appear. Second, the failure frontier is moving from simple absence of information toward **context misassembly**: the system sees too much, sees the wrong layer, or pays attention to an overloaded surface.

The concept is broader than retrieval. It includes chunking, ranking, summarization, compression, state handoff, memory policy, progressive tool discovery, and environmental affordances. The recurring claim is that many agent failures are not failures of reasoning in the abstract but failures of seeing the right information in the right structure at the right time.

## Recurring patterns
1. Naive stuffing fails.
2. Structure beats volume.
3. Context is temporal.
4. Different tasks need different context shapes.
5. Context quality compounds with tool quality.
6. Progressive discovery beats universal exposure.
7. Context reduction is a product capability.

## Design implications
- Treat context selection as a first-class product surface.
- Build typed context layers: instructions, state, evidence, examples, constraints.
- Prefer retrieval pipelines that can explain why a piece of context was included.
- Measure retrieval quality by downstream task success, not only relevance labels.
- Add progressive discovery and capability grouping instead of dumping every tool into the initial surface.
- Track token-budget efficiency as part of context quality, not only answer quality.

## Why it matters for the book
This concept supports the book's central claim that dependable AI depends on engineered surroundings. Context is one of the most important of those surroundings.

## Representative source anchors
- Chau Tran (Glean)
- Matt Carey (MCP = Mega Context Problem)
- Sam Morrow (GitHub MCP scaling)
- Daniel Chalef (Zep)
- Val Bercovici (WEKA)
