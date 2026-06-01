# Chapter 6 — Runtimes, State, and the Human Control Plane

## Chapter promise
Once agents act over time, architecture becomes destiny.

## Public-safe derivative
A chatbot can get away with amnesia. A production agent cannot.

Short-lived assistance can live inside a conversational loop. Delegated work cannot. The moment a system has to persist across retries, timeouts, approvals, multiple tools, or many parallel workers, the main problem stops being next-token cleverness and becomes execution semantics. The system has to preserve state, survive interruption, expose progress, and resume without confusion.

This is why so many impressive agent demos fail when teams try to operationalize them. The model may be capable. The prompts may be decent. The context may be strong. But the system was still built like a chat session when it needed to be built like a workflow.

Durable agents solve this by treating long-running work as structured execution rather than a growing transcript. They add checkpoints, resumability, retries, histories, and explicit state. That lets teams distinguish between what was said and what has actually happened.

But durability alone is not enough. Valuable systems also need a human control plane: the approvals, roll-up views, inspection surfaces, and intervention points through which people supervise machine work. Human control is not a temporary crutch on the path to full autonomy. In high-value systems, it is an architectural layer.

This becomes even more important as subagents and parallel workers arrive. More workers can create more leverage, but only if their outputs can be recomposed, summarized, inspected, and routed back to the right human at the right moment. Otherwise parallelism just produces chaos faster.

The practical lesson is simple. A machine colleague is not merely a model with tools. It is a model inside an operating environment. Durable runtimes, observability, approvals, and structured review are what turn bursts of intelligence into dependable delegated work.

## Why this chapter matters
This chapter completes the current middle-book spine. Chapter 3 prepares the workplace, Chapter 4 measures the output, Chapter 5 engineers what the system sees, and Chapter 6 explains how the work itself persists and stays under human control.