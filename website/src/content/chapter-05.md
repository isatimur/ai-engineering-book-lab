# Chapter 5 — Context Is Infrastructure

## Chapter promise
Useful AI systems do not fail only because the model is weak. They fail because the system cannot assemble the right working set of information at the right moment, in the right shape, at a cost the product can bear.

## Public-safe derivative
As long as AI felt like a prompting game, context looked like an input-field problem. You had a box, a token limit, and a growing collection of tricks for stuffing more things into it. Add a few retrieved documents. Paste a spec. Prepend some examples. Tell the model to think harder. But that framing gets the problem backwards. Context is not the garnish around intelligence. It is the substrate that determines what the system can even notice.

The real challenge is not whether a model can access a large corpus in principle. It is whether the system can assemble the right active working set for the task at hand. That means context engineering is broader than retrieval. It includes selection, ranking, shaping, compression, timing, memory boundaries, and the disciplined exposure of tools and capabilities.

This becomes most obvious in enterprise and high-stakes workflows. A useful system does not merely retrieve something vaguely related. It separates authoritative sources from background material, current task state from archival knowledge, and critical evidence from irrelevant noise. It preserves provenance. It reduces overload. It helps the model see what matters without burying it under everything else.

The same logic now applies to tool use. As capability protocols such as MCP expand what agents can access, context stops being only a document problem and becomes a capability-management problem too. A system can fail because it lacked the right information, but it can also fail because it exposed too many possible actions at once.

The proof of good context architecture is never the elegance of the diagram. It is downstream performance: better task completion, better evidence use, lower review burden, lower token waste, and higher trust in real workflows.

## Why this chapter matters
This chapter turns context from a prompt trick into an infrastructure discipline. It also creates a strong manuscript sequence after the current Chapter 3 and Chapter 4 drafts: prepare the workplace, measure the output, then engineer what the system is allowed to see.
