# Chapter 5 — Context Is Infrastructure

## Role in the book
Expand beyond coding and show that retrieval, memory, and context assembly are architectural layers, not prompt tricks.

## Supporting source cluster
- [[047-xz0-brt56L8-building-intelligent-research-agents-with-manus-ivan-leo-manus-ai-now-meta-superintelligen|#47 — Building Intelligent Research Agents with Manus - Ivan Leo, Manus AI (now Meta Superintelligence)]]
- [[048-Jty4s9-Jb78-jack-morris-stuffing-context-is-not-memory-updating-weights-is|#48 — Jack Morris: Stuffing Context is not Memory, Updating Weights is]]
- [[100-fh9LgKXBGnQ-enterprise-deep-research-the-next-killer-app-for-enterprise-ai-ofer-mendelevitch-vectara|#100 — Enterprise Deep Research: The Next Killer App for Enterprise AI — Ofer Mendelevitch, Vectara]]
- [[104-NTBX-wxUhHs-context-platform-engineering-to-reduce-token-anxiety-val-bercovici-weka|#104 — Context Platform Engineering to Reduce Token Anxiety — Val Bercovici, WEKA]]
- [[105-LLuKshphGOE-context-engineering-connecting-the-dots-with-graphs-stephen-chin-neo4j|#105 — Context Engineering: Connecting the Dots with Graphs — Stephen Chin, Neo4j]]
- [[118-9AQOvT8LnMI-wisdom-driven-knowledge-augmented-generation-at-scale-chin-keong-lam-patho-ai|#118 — Wisdom-Driven Knowledge Augmented Generation at Scale - Chin Keong Lam, Patho AI]]
- [[154-W1MiZChnkfA-scaling-enterprise-grade-rag-lessons-from-legal-frontier-calvin-qi-harvey-chang-she-lance|#154 — Scaling Enterprise-Grade RAG: Lessons from Legal Frontier - Calvin Qi (Harvey), Chang She (Lance)]]
- [[156-w9u11ioHGA0-layering-every-technique-in-rag-one-query-at-a-time-david-karam-pi-labs-fmr-google-search|#156 — Layering every technique in RAG, one query at a time - David Karam, Pi Labs (fmr. Google Search)]]
- [[157-xnXqpUW_Kp8-building-a-smarter-ai-agent-with-neural-rag-will-bryk-exa-ai|#157 — Building a Smarter AI Agent with Neural RAG - Will Bryk, Exa.ai]]
- [[172-4Xe_iMYxBQc-information-retrieval-from-the-ground-up-philipp-krenn-elastic|#172 — Information Retrieval from the Ground Up - Philipp Krenn, Elastic]]
- [[193-hxFpUcvWPcU-how-to-build-enterprise-aware-agents-chau-tran-glean|#193 — How to build Enterprise Aware Agents - Chau Tran, Glean]]
- [[215-XNneh6-eyPg-practical-graphrag-making-llms-smarter-with-knowledge-graphs-michael-jesus-and-stephen-neo|#215 — Practical GraphRAG: Making LLMs smarter with Knowledge Graphs — Michael, Jesus, and Stephen, Neo4j]]
- [[218-T5IMo5ntyhA-stop-using-rag-as-memory-daniel-chalef-zep|#218 — Stop Using RAG as Memory — Daniel Chalef, Zep]]
- [[219--tgQa8Fzf80-hybridrag-a-fusion-of-graph-and-vector-retrieval-mitesh-patel-nvidia|#219 — HybridRAG: A Fusion of Graph and Vector Retrieval - Mitesh Patel, NVIDIA]]
- [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|#622 — MCP = Mega Context Problem - Matt Carey]]
- [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625 — Lessons from Scaling GitHub's Remote MCP Server — Sam Morrow, GitHub]]

## Strongest claims
1. Context selection is becoming a primary engineering problem.
2. RAG, memory, and GraphRAG solve different pieces of the context problem and should not be collapsed into one bucket.
3. Enterprise usefulness depends on access to relevant, structured, and trustworthy internal context.
4. The next failure frontier is not just hallucination but context misassembly.
5. MCP sharpens the context problem because naive tool exposure can flood the window with irrelevant capability descriptions.
6. Progressive discovery and context reduction deserve treatment as infrastructure patterns, not UX niceties.

## Useful quotes / excerpts
> "Context platform engineering is the set of skills and tools to design, size, and configure systems optimized for agent swarm context, at any scale." — [[104-NTBX-wxUhHs-context-platform-engineering-to-reduce-token-anxiety-val-bercovici-weka|Val Bercovici]]

> "Stuffing context is not memory." — [[048-Jty4s9-Jb78-jack-morris-stuffing-context-is-not-memory-updating-weights-is|Jack Morris]]

> "We shouldn't be dumping loads of tools into context." — [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|Matt Carey]]

> GitHub reduced initial MCP tool-load context and then kept reducing both input and output token usage through grouping, tailoring, and intent-aware tool design. — [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|Sam Morrow]]

## Open questions
- How much of the chapter should go into retrieval mechanics versus higher-level context principles?
- Should GraphRAG be a subsection here or a short boxed detour?
- Which enterprise case study best demonstrates context quality as the difference maker?
- Should MCP live here primarily as a context-selection story, with security/identity deferred to Chapter 7?
