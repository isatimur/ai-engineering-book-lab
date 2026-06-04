# Context Engineering

## Working definition
Context engineering is the discipline of deciding what information an AI system should see, in what form, at what moment, and with what guarantees of relevance, freshness, and cost.

## Core synthesis
The corpus consistently treats context as infrastructure, not prompt ornament. As models improve, the bottleneck shifts toward selecting and shaping the working set: code, docs, memory, policies, state, examples, and tool outputs. Better models do not remove the need for context engineering; they often increase it by making more ambitious workflows possible.

The newer material sharpens the problem in two ways. First, context is increasingly an interface-design problem, not only a retrieval problem. Once tools, APIs, and remote servers become part of the agent environment, teams must decide what capabilities are visible, how they are grouped, and when they should even appear. Second, the failure frontier is moving from simple absence of information toward **context misassembly**: the system sees too much, sees the wrong layer, or pays attention to an overloaded surface.

The concept is broader than retrieval. It includes chunking, ranking, summarization, compression, state handoff, memory policy, progressive tool discovery, and environmental affordances. The recurring claim is that many agent failures are not failures of reasoning in the abstract but failures of seeing the right information in the right structure at the right time.

## What this concept is really about
- Turning "prompting" into systems design.
- Treating context windows as scarce operational budgets.
- Building repeatable policies for relevance, not just bigger payloads.
- Making tool use and memory cooperate rather than collide.

## Recurring patterns in the corpus
1. **Naive stuffing fails.** More tokens do not reliably produce more truth.
2. **Structure beats volume.** Ranked, typed, and compressed context routinely outperforms indiscriminate dumps.
3. **Context is temporal.** Systems need policies for freshness, carryover, and forgetting.
4. **Different tasks need different context shapes.** Coding, research, support, and planning each need different retrieval and handoff patterns.
5. **Context quality compounds with tool quality.** Good tools with bad context still produce brittle behavior.
6. **Progressive discovery beats universal exposure.** Agents often need a narrowed capability surface before they need a giant catalog.
7. **Context reduction is a product capability.** Tool grouping, intent-aware routing, and token-budget discipline matter as much as raw retrieval depth.

## Important distinctions
### Context is not memory
Memory is persistence across time. Context is the active working set presented for the current decision. Confusing the two leads to bloated prompts and weak recall.

### Retrieval is not understanding
Getting documents into the window does not guarantee the system can compose, compare, or reason across them.

## Design implications
- Treat context selection as a first-class product surface.
- Build typed context layers: instructions, state, evidence, examples, constraints.
- Prefer retrieval pipelines that can explain why a piece of context was included.
- Measure retrieval quality by downstream task success, not only relevance labels.
- Add progressive discovery and capability grouping instead of dumping every tool into the initial surface.
- Track token-budget efficiency as part of context quality, not only answer quality.

## Why it matters for the book
This concept supports the book's central claim that dependable AI depends on engineered surroundings. Context is one of the most important of those surroundings.

## Source cluster
- [[043-SbcQYbrvAfI-build-a-prompt-learning-loop-sallyann-delucia-fuad-ali-arize|#43 — Build a Prompt Learning Loop - SallyAnn DeLucia & Fuad Ali, Arize]]
- [[077-I8fs4omN1no-hard-won-lessons-from-building-effective-ai-coding-agents-nik-pash-cline|#77 — Hard Won Lessons from Building Effective AI Coding Agents – Nik Pash, Cline]]
- [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — No Vibes Allowed: Solving Hard Problems in Complex Codebases – Dex Horthy, HumanLayer]]
- [[093-zfvEMNmVlNY-the-unbearable-lightness-of-agent-optimization-alberto-romero-jointly|#93 — The Unbearable Lightness of Agent Optimization — Alberto Romero, Jointly]]
- [[104-NTBX-wxUhHs-context-platform-engineering-to-reduce-token-anxiety-val-bercovici-weka|#104 — Context Platform Engineering to Reduce Token Anxiety — Val Bercovici, WEKA]]
- [[105-LLuKshphGOE-context-engineering-connecting-the-dots-with-graphs-stephen-chin-neo4j|#105 — Context Engineering: Connecting the Dots with Graphs — Stephen Chin, Neo4j]]
- [[193-hxFpUcvWPcU-how-to-build-enterprise-aware-agents-chau-tran-glean|#193 — How to build Enterprise Aware Agents - Chau Tran, Glean]]
- [[218-T5IMo5ntyhA-stop-using-rag-as-memory-daniel-chalef-zep|#218 — Stop Using RAG as Memory — Daniel Chalef, Zep]]
- [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|#622 — MCP = Mega Context Problem - Matt Carey]]
- [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625 — Lessons from Scaling GitHub's Remote MCP Server — Sam Morrow, GitHub]]

## Open questions
- Which context decisions should be static policy versus runtime adaptation?
- How much summarization is too much before evidence loses fidelity?
- What observability is needed to debug context failures in production?
