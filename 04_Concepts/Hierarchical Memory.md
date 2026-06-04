# Hierarchical Memory

## Working definition
Hierarchical memory is a context-management pattern where an AI system separates memory into layers with different lifetimes, abstraction levels, retrieval policies, and update rules.

## Core synthesis
The important move is not simply "give the agent more memory." The useful move is to decide what kind of memory the system is dealing with: immediate working context, session state, project knowledge, long-term user preferences, external documents, or durable task history.

The concept strengthens the broader [[Context Engineering]] theme because it treats memory as an information architecture problem. A serious agent needs to know what should be carried forward, what should be compressed, what should be retrieved on demand, and what should be forgotten.

## Why it matters
- Prevents context windows from becoming unstructured dumps.
- Helps agents preserve continuity without carrying irrelevant history.
- Makes memory policy inspectable and debuggable.
- Connects retrieval, summarization, state, and long-running task design.

## Design questions
- Which memories are active working context versus background knowledge?
- Which memories should be updated automatically, and which need human confirmation?
- What should expire?
- What should be summarized?
- What should remain source-linked rather than rewritten?

## Source cluster
- [[665-esY99nYXxR4-hierarchical-memory-context-management-in-agents-sally-ann-delucia|#665 - Hierarchical Memory: Context Management in Agents]]
- [[043-SbcQYbrvAfI-build-a-prompt-learning-loop-sallyann-delucia-fuad-ali-arize|#43 - Build a Prompt Learning Loop]]
- [[048-Jty4s9-Jb78-jack-morris-stuffing-context-is-not-memory-updating-weights-is|#48 - Stuffing Context is not Memory]]
- [[218-T5IMo5ntyhA-stop-using-rag-as-memory-daniel-chalef-zep|#218 - Stop Using RAG as Memory]]
- [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|#622 - MCP = Mega Context Problem]]

## Output uses
- Chapter 5 update: [[../05_Book_Ideas/Drafting Layer/Chapter Starters - Chapters 5 and 9]]
- YouTube episode: "Hierarchical Memory Is Context Engineering Growing Up"
- Research pack on memory policies for production agents
