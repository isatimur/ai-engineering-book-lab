# Chapter 5 — Context Is Infrastructure

Useful AI systems do not fail only because the model is weak. They fail because the system cannot assemble the right working set of information at the right moment, in the right shape, at a cost the product can bear.

For a while, context looked like a prompt-trick problem. You had a box, a token limit, and a growing collection of devices for stuffing more things into it. Add a few retrieved documents. Paste the spec. Prepend some examples. Tell the model to think harder. Each move felt like progress because each one was visible: more characters in, more confidence out.

But the framing was upside down.

Context is not the garnish around intelligence. It is the substrate that determines what the system can even notice. Two systems with identical model weights can differ enormously in usefulness based purely on what reaches the model and what shape that information arrives in. The chapter that follows is about treating that substrate the way engineering treats other substrates: as infrastructure, with versions, budgets, observability, and failure modes you have a plan for.

## Context is the substrate, not the garnish

The earliest framings of prompt engineering trained a generation of builders to think of context as text you assemble in a string. That worked when the system was a chatbot answering one question and the right context could fit in a single window. It stops working the moment the system has to act over real workflows, with real users, against real data, for more than a few turns.

Val Bercovici names the shift directly. Context platform engineering, he calls it, is "the set of skills and tools to design, size, and configure systems optimized for agent swarm context, at any scale." The phrase is dense, but the move is clear. The thing being engineered is no longer the prompt. It is the platform that decides what gets put into prompts.

Ofer Mendelevitch's enterprise deep-research framing pushes the argument to its limit. The hard problem of enterprise AI, he says, is not access to documents. It is access to the *relevant* documents — the ones the agent actually needs for the current step, ranked, deduplicated, and trustworthy. Once you accept that frame, prompt engineering becomes a small subset of a much larger discipline.

## Stuffing context is not memory

Jack Morris has one of the sharpest one-liners in the corpus: "Stuffing context is not memory."

The line is so quotable it can be mistaken for a slogan. It is actually a load-bearing claim about architecture.

A system that places relevant documents into a prompt has accomplished retrieval, not remembered anything. The model has no commitment to those documents after the response is generated. Nothing persists. Nothing accumulates. The next turn starts from the same blank slate, and any continuity the user experiences is illusion — manufactured by re-stuffing the window with carefully chosen artifacts.

Memory, by contrast, requires durable structure. It requires deciding what to retain, what to summarize, what to forget, what to refresh, and what to surface unprompted. It requires a model of the entities the system has encountered and the relationships between them. It requires a way to update old beliefs when new evidence arrives. None of those properties emerge from pushing more text into a window.

The reason this distinction matters is that the failures look identical from the outside. A system that retrieves badly and a system that forgets can both surface a wrong answer about a customer the agent talked to yesterday. The difference shows up in the fix. Better retrieval can patch the first; only better memory architecture can patch the second.

Daniel Chalef at Zep makes a related point with a more pointed framing: stop using RAG as memory. The error he sees in production systems is not RAG itself but RAG carrying weight it was never designed to carry — long-term user state, evolving entity facts, cross-session continuity. RAG is good at fetching documents. It is bad at maintaining a model of the user across months.

Read these two claims together as a selection rule. Reach for retrieval when the job is fetching the right documents for the current step; reach for a memory layer when the job is maintaining state that has to persist — long-term user facts, evolving entities, cross-session continuity. Chalef's warning marks the trap: the moment RAG starts carrying that durable state, you have collapsed two layers that need to be designed separately.

## RAG, memory, and GraphRAG are different jobs

Once the distinction between retrieval and memory is on the table, the next obvious question is whether all retrieval is the same. It is not.

Stephen Chin's GraphRAG work and the broader Neo4j framing argue that retrieving over a graph is a different operation than retrieving over a flat vector index. The vector index excels when the question is about semantic similarity to existing content. The graph excels when the question is about relationships — who depends on whom, which entities co-occur, what does this concept connect to. Mitesh Patel at NVIDIA pushes the framing further with hybrid RAG, which fuses graph and vector retrieval because most useful enterprise questions need both.

David Karam, from his Pi Labs work after Google Search, frames retrieval as a layered problem. You don't pick one technique; you layer them, one query at a time, with each layer handling a class of failure the others miss. Retrieval is not a black box. It is a system of techniques with known trade-offs, and the engineering job is knowing which technique to apply where.

The deeper claim is that the field's vocabulary has been lagging the architecture. Practitioners say "RAG" and mean four different things depending on context. Sometimes they mean a single embedding lookup before a single prompt. Sometimes they mean a retrieve-then-rerank pipeline. Sometimes they mean a graph traversal that surfaces entities. Sometimes they mean a long-term memory layer. The label has collapsed distinctions that the architecture depends on.

Will Bryk's neural-RAG work at Exa comes at it from the opposite direction. Instead of treating retrieval as something that happens before reasoning, it integrates retrieval into the reasoning loop. The model decides what to search for, what to follow up on, and when to stop. That is also RAG by current usage, but it has almost nothing in common with the embedding-lookup pattern that the term originally described.

The practical consequence is that "we'll just add RAG" is no longer a useful sentence in a design discussion. The question worth asking is which retrieval pattern, against which data shape, with what ranking, with what freshness guarantees, feeding into what reasoning surface. Once those questions are explicit, the architecture becomes engineerable. Until they are, the system relies on luck.

## Enterprise usefulness is a working-set problem

The argument so far has been mostly about technique. The harder argument is about value.

Joel Hron's framing — that AI is shifting from helpfulness to producing judgments — looks different inside an enterprise than it does inside a consumer chatbot. Inside the enterprise, the agent's value depends almost entirely on its ability to assemble a small, accurate, current, trustworthy working set out of a much larger, messier corpus. Without that working set, the model is doing impressive cognition over the wrong material, and the answer is wrong in a way that is hard to catch.

Mendelevitch's enterprise deep-research framing is built around this exact failure mode. The corpus is huge, the user query is broad, and the system has to converge on the few hundred passages that actually matter for the question at hand. The work that produces value is the convergence, not the cognition that happens after.

Calvin Qi at Harvey and Chang She at Lance describe the same pattern from inside legal work. Lawyers do not need an agent that can read everything. They need an agent that can find the specific clause, the specific precedent, the specific exception that bears on the matter at hand. The retrieval has to separate authoritative sources from background material, and it has to surface provenance so the lawyer can verify what the system found before relying on it.

Chau Tran's Glean work generalizes this across enterprises. The enterprise-aware agent, in his framing, is not one that has access to the company's documents. It is one that knows which documents matter for the current user, the current role, the current task — and which to ignore. The boundary work is the engineering work.

The unifying claim across these talks is that enterprise usefulness scales with working-set quality, not with corpus size. A larger corpus without better assembly produces worse outcomes, not better ones. A smaller corpus that is well-ranked, well-scoped, and provenance-tagged often outperforms a larger one that is dumped in raw.

This is also where Chapter 4's argument should still be echoing. Evals can measure whether an answer is right. Context architecture determines whether the right answer was even available to the model in the first place. Without the substrate, the eval is measuring guesses.

## The next failure frontier is context misassembly

For most of the public conversation about AI quality, hallucination has been the boogeyman. The model invented a citation. The model fabricated a fact. The model imagined a precedent that does not exist. Hallucination is real and worth measuring, but it is becoming the wrong primary failure mode to worry about.

The newer, more expensive failure mode is context misassembly.

Context misassembly is what happens when the system retrieves real documents, in the wrong combination, with the wrong weighting, at the wrong moment, and produces an answer that is technically grounded but practically misleading. Nothing is hallucinated. Every cited source exists. Every quote can be verified. But the assembled context misrepresents the underlying state of the world because the assembly missed something, ranked something poorly, or surfaced an outdated version of a document the system also has the current version of.

Morris's distinction between stuffing and memory points at one form of this. The system surfaces three documents about the customer, two of them stale, one of them current. The model averages them and produces an answer that is half-current. Nothing is invented; nothing is correct either.

Ivan Leo's Manus AI research-agent work — now under Meta Superintelligence — surfaces the same problem at a different scale. A deep-research agent that pulls hundreds of sources can produce a summary that is internally consistent and externally wrong because the assembly drifted as the agent worked. Each individual retrieval was fine. The composition was off.

Karam's layered-RAG approach is partly a response to this. By treating retrieval as a multi-pass operation with distinct failure modes per layer, the system gives misassembly multiple chances to be caught by a downstream layer. That works, partially, but it does not change the underlying architectural fact: context misassembly is a structural failure mode, and the systems that are starting to dominate production are the ones that designed for it explicitly.

The reason this matters for the book's overall argument is that misassembly does not get fixed by a better model. A better model produces a more confident wrong answer faster. The fix lives in the substrate — in how the system assembles, ranks, deduplicates, and freshens the context before the model is asked to reason over it. That is what makes context engineering an infrastructure problem instead of a prompt problem.

## MCP makes context a capability problem too

The rise of the Model Context Protocol has expanded what context includes. An MCP-connected agent has access not only to documents but to tools — APIs, search endpoints, file operations, internal services, and increasingly, other agents. Each of those tools shows up in the context window as a capability description: a name, a schema, an example. The window now contains both the information the system might consult and the actions the system might take.

That expansion brings a new failure mode.

Matt Carey's MCP mega-context-problem talk identifies the failure cleanly: "We shouldn't be dumping loads of tools into context." When an agent has access to fifty tools, the capability descriptions for those tools can flood the window before the user's question is even processed. The model spends its attention budget reading tool definitions and has less budget for the actual reasoning the user wanted. Worse, the abundance of tools tempts the model into calling the wrong one because it now has to disambiguate between options that all look superficially relevant.

Sam Morrow's GitHub MCP-scaling work tells the production-grade version of this story. GitHub reduced the initial MCP tool-load context and then kept reducing both input and output token usage through grouping, tailoring, and intent-aware tool design. The number of tools the agent could in principle call did not go down. The number of tools the agent had to read at any given moment did. That difference is the engineering.

Karan Sampath at Anthropic, working on enterprise MCP rollouts, points at the same dynamic from the governance side. The enterprise version of this problem is not just performance. It is trust. A capability surface that the security team cannot inspect and reason about is one the security team will not approve. The capability problem is also a context-design problem because the window is the place where capability is exposed.

The unifying claim here is that the moment tools entered the context window, context engineering became broader than retrieval; it also became capability management. The directive the production cases point to: expose tools by intent rather than all at once, describe them tightly, and retract them when they stop being relevant — so you shrink the number of tools the agent must read at any moment, not the number it can call.

## Progressive discovery is infrastructure, not UX

The natural reaction to the tool-flood problem is to surface fewer things up front and let the agent discover more as it needs them. That instinct is right. The harder claim is that progressive discovery deserves to be treated as infrastructure rather than a UX nicety.

Bercovici's context-platform framing makes this argument structurally. The right amount of context to expose at any given step is a function of the step, the agent, the user, and the task — not a static property of the system. That is exactly the shape of an infrastructure problem. It needs a layer that owns the decision, observes the outcome, and updates over time.

Sam Morrow's GitHub work is the closest thing the corpus has to a production case study for this. The team did not just trim the tool list. They built grouping, tailoring, and intent-aware exposure into the MCP server itself. The agent does not see every tool; it sees the tools the server has decided are relevant given the agent's intent. The decision lives in the server, not the prompt.

The deeper point is that progressive discovery does work the model cannot do for itself. The model can reason about the tools it is shown. It cannot reason about tools that are absent from the window. Whatever decides which tools to show is doing structural work, and that work is part of the system's architecture whether or not anyone calls it that.

This is also where the book's earlier claims about harness engineering — Chapter 3 — start cross-loading. A harness without context-platform thinking is a harness without a context strategy. Once you accept that, "agent-ready codebase" stops meaning "a repository with good tests" and starts meaning "a repository whose tools, documents, and state are exposed at the right moments, in the right shapes, to the right consumers." That is a discipline. It is not a feature flag.

## Why context is infrastructure

Context is the substrate, not the garnish.

If context is a substrate, then context engineering is the discipline of building, maintaining, and observing that substrate. That discipline includes retrieval architecture, memory architecture, capability management, progressive disclosure, freshness handling, provenance, and the cost and latency budgets that govern when each of those mechanisms fires. It is not a thing one component does. It is a layer of the system that has its own state and its own failure modes.

A team that treats context as a one-off prompt-assembly problem will keep finding the same failures and keep fixing them with one-off measures. Add a reranker here. Patch a deduplication bug there. Re-tune a chunk size when retrieval starts missing the relevant clause. None of those are wrong, but none of them add up to an architecture.

A team that treats context as infrastructure builds for the failure modes the chapter has named: misassembly, capability flood, memory drift, provenance loss. They version the context layer. They observe what it surfaces. They measure how the model's outputs change when the context layer changes. They treat the context platform the way a database team treats the storage engine — as a piece of working infrastructure whose properties shape everything built on top of it.

That is the move this chapter has been arguing for. It is also the move that prepares the reader for the next chapter. Once you take context seriously as infrastructure, you immediately notice that the substrate cannot live entirely in a single agent run. It has to persist across sessions, recover from interruptions, and survive partial failure. That is the runtime problem, and it is where the book goes next.

## What to do with this

- Treat context as a versioned, observable layer with its own budgets and failure modes, not a string you assemble per request.
- Don't use RAG as your memory layer: retrieve to fetch the right documents for a step, and design a separate memory architecture for durable user and entity state across sessions.
- Match the retrieval pattern to the question — vector search for semantic similarity, graph traversal for relationship questions, hybrid when the query needs both — and make ranking, data shape, and freshness explicit before you build.
- Optimize for working-set quality, not corpus size: a smaller, well-ranked, provenance-tagged set beats a larger raw dump.
- Design for context misassembly, not just hallucination — dedupe, freshen, and weight retrieved documents so stale-and-current sources can't average into a half-right answer. A stronger model will not fix this.
- Don't flood the window with tools: expose them by intent and retract them when irrelevant, shrinking the number of tools the agent must read at any moment rather than the number it can call.
