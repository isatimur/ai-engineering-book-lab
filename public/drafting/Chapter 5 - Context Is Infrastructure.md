# Chapter 5 — Context Is Infrastructure

## Chapter promise
Useful AI systems do not fail only because the model is weak. They fail because the system cannot assemble the right working set of information at the right moment, in the right shape, at a cost the product can bear.

## Opening move
As long as AI felt like a prompting game, context looked like an input-field problem. You had a box, a token limit, and a growing collection of tricks for stuffing more things into it. Add a few retrieved documents. Paste a spec. Prepend some examples. Tell the model to think harder. But that framing gets the problem backwards. Context is not the garnish around intelligence. It is the substrate that determines what the system can even notice.

That becomes obvious the moment you leave toy tasks. A coding agent needs the right files, the right rules, and the right execution history. A research agent needs the right sources, not just more sources. A legal or enterprise assistant needs proprietary context, structured evidence, and a way to separate active working memory from archival knowledge. And once tools enter the picture, the problem gets harder still. Suddenly the system is not only choosing which documents to retrieve. It is choosing which capabilities to expose, how to describe them, and how to avoid drowning the model in a giant catalog of possible actions.

## Throughline
Move from “prompt stuffing is a dead end” to “context assembly is one of the core infrastructure disciplines of reliable AI.”

## Section skeleton
1. The active working set matters more than the raw knowledge base.
2. Retrieval is necessary, but context engineering is broader than retrieval.
3. Enterprise usefulness depends on context topology, not just model quality.
4. Graphs and layered retrieval matter when evidence must be assembled, not merely fetched.
5. MCP exposes context as a capability-management problem.
6. Context quality is measured downstream, in task success and trust.

## Why this chapter matters
This chapter is one of the clearest places where the book can show that reliable AI systems are built, not merely prompted.
