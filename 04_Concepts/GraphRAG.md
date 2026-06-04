# GraphRAG

## Working definition
GraphRAG is the use of graph structures, entities, relationships, and traversals to improve retrieval and reasoning over connected knowledge.

## Core synthesis
The corpus does not present GraphRAG as a universal replacement for vector retrieval. Instead, it repeatedly frames it as a response to a particular class of problems: dense, interdependent knowledge where meaning depends on relationships, not just semantic similarity. In those environments, vectors find nearby text; graphs help preserve structure.

The deeper pattern is that GraphRAG becomes valuable when tasks require path finding, multi-hop synthesis, entity disambiguation, or context assembly across scattered evidence. Legal, enterprise, network, and scientific use cases show up repeatedly because they punish shallow retrieval.

## What this concept is really about
- Recovering relational structure that plain chunk retrieval loses.
- Making latent links explicit and queryable.
- Supporting multi-hop questions and traceable evidence assembly.
- Combining symbolic structure with probabilistic language models.

## Recurring patterns in the corpus
1. **Graphs matter when domains are structurally dense.** Enterprise knowledge, legal matters, and infrastructure maps fit this pattern.
2. **Hybrid systems win.** Graphs and vectors usually complement each other.
3. **Entity quality is foundational.** Weak extraction produces weak graphs.
4. **GraphRAG improves explainability.** Paths and nodes make retrieval logic easier to inspect.
5. **The cost is modeling discipline.** Graph systems demand schema, curation, and update policy.

## Important distinctions
### GraphRAG is not just putting documents in Neo4j
The useful part is not storage choice. It is designing a retrieval and reasoning flow that exploits relationships.

### Better retrieval is not free reasoning
Graphs improve evidence assembly, but application logic still has to decide what to compare, summarize, and act on.

## Design implications
- Use GraphRAG where relationship structure is central to correctness.
- Prefer hybrid retrieval when both semantic similarity and relational precision matter.
- Track provenance from graph nodes back to source evidence.
- Budget for ontology and extraction maintenance from day one.

## Why it matters for the book
GraphRAG is a concrete example of the book's broader thesis: dependable AI work often requires adding explicit structure around the model rather than hoping a larger model absorbs everything.

## Source cluster
- [[105-LLuKshphGOE-context-engineering-connecting-the-dots-with-graphs-stephen-chin-neo4j|#105 — Context Engineering: Connecting the Dots with Graphs — Stephen Chin, Neo4j]]
- [[193-hxFpUcvWPcU-how-to-build-enterprise-aware-agents-chau-tran-glean|#193 — How to build Enterprise Aware Agents - Chau Tran, Glean]]
- [[215-XNneh6-eyPg-practical-graphrag-making-llms-smarter-with-knowledge-graphs-michael-jesus-and-stephen-neo|#215 — Practical GraphRAG: Making LLMs smarter with Knowledge Graphs — Michael, Jesus, and Stephen, Neo4j]]
- [[216-yYxr6LdXNWM-knowledge-graphs-in-litigation-agents-tom-smoker-whyhow|#216 — Knowledge Graphs in Litigation Agents — Tom Smoker, WhyHow]]
- [[217-XlAIgmi_Vow-when-vectors-break-down-graph-based-rag-for-dense-enterprise-knowledge-sam-julien-writer|#217 — When Vectors Break Down: Graph-Based RAG for Dense Enterprise Knowledge - Sam Julien, Writer]]
- [[219--tgQa8Fzf80-hybridrag-a-fusion-of-graph-and-vector-retrieval-mitesh-patel-nvidia|#219 — HybridRAG: A Fusion of Graph and Vector Retrieval - Mitesh Patel, NVIDIA]]
- [[224-AvVoJBxgSQk-agentic-graphrag-ai-s-logical-edge-stephen-chin-neo4j|#224 — Agentic GraphRAG: AI’s Logical Edge — Stephen Chin, Neo4j]]

## Open questions
- When does graph construction cost outweigh the retrieval benefit?
- Which domains truly need graph traversal rather than better ranking?
- How should GraphRAG systems handle stale or conflicting relationships?
