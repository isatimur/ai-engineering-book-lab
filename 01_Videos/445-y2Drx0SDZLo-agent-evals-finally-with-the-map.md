---
video_id: "y2Drx0SDZLo"
playlist_index: 445
title: "Agent Evals: Finally, With The Map"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=y2Drx0SDZLo"
duration: "13:31"
duration_seconds: 811
view_count: 3124
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/y2Drx0SDZLo.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:18:40+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A speaker from Root Signals presents a map of agent evaluation instead of a laundry list of metrics. The map splits evals into semantic quality (how the agent's representations relate to reality, grounded by truthfulness, often through RAG) and behavioral quality (how tools and actions serve its goals, grounded by goal achievement). Each side has a single-turn part (universal virtues, policy alignment, RAG metrics; tool selection, tool output, error handling) and a multi-turn part (conversation consistency and reasoning traces; plan quality and convergence on the goal). He argues the LLM judge itself needs optimizing too, which he calls EvalOps."
---
# Agent Evals: Finally, With The Map

## Summary
A speaker from Root Signals gives a short, structured talk that places agent evaluation on one map. He calls agent evaluation "rather Art and Science", but says it is required to make sure agents do what you expect in production. His thesis: the many agent metrics fit a symmetric map, and every metric on it is a proxy for two grounding targets, truthfulness and goal achievement.

**Two halves: semantic and behavioral**
- *Semantic* evals ask how the agent's representations of reality relate to reality.
- *Behavioral* evals ask how the agent's actions and tools contribute to its goals, and what effects they have on its environment.
Truthfulness comes from grounding representations in your data, often with RAG. Goal achievement comes from grounding behavior in the tools available. He says this symmetry is not accidental: representing the world is itself a kind of activity, so representations are a special case of behaviors.

**Semantic, single turn**
Universal virtues such as coherence, consistency and safety. These are not agentic, and he includes them for completeness and contrast. Alignment with stakeholder values and adherence to policy matter more. RAG, which he generalizes as attention management, needs its own evaluators: context correctness, recall, faithfulness, answer relevance, and factfulness against reality beyond the reference data.

**Semantic, multi-turn**
Conversation histories: consistency, and topic adherence when it is needed, though sometimes a user should be allowed to change topic. Reasoning traces can also be evaluated, as the sequential activity the agent performs before it acts.

**Behavioral, single step**
Instruction following, correct extraction of tool characteristics, right tool selection, tool output quality, error handling, and correct structure and format of tool calls.

**Behavioral, multi-step**
Whether the agent's actions converge on its goal, and whether its plan is consistent and of high quality. Goal achievement and utility are the ultimate metric; the rest are proxies.

**Outside the map**
Cost and latency, including the number of steps. Tracing and debugging to see where the agent went wrong. Error management for tool-use errors, separate from semantic mistakes. Offline versus online testing, which he says could be a separate dimension of the map. Tool-specific metrics, often testable with traditional software testing because tools are often plain API calls.

**Double tier and EvalOps**
Many of these metrics use LLM-as-judge. A single-tier approach optimizes only the agent's operative LLM flow and ignores the cost, latency and uncertainty of the judge. A double-tier approach optimizes both. He calls this EvalOps, a special case of LLMOps that works on different entities and needs different software and resourcing.

## Why it matters
- Gives a two-by-two structure (semantic or behavioral, single or multi-turn) that a chapter can use to organize agent eval metrics instead of listing them.
- Names truthfulness and goal achievement as the two grounding targets and treats every other metric as a proxy, which helps prioritize what to measure.
- Separates tool-use error management from semantic errors, and offline from online testing, two distinctions teams often blur.
- The double-tier argument, optimizing the LLM judge as well as the agent, is a specific warning for teams that rely on LLM-as-judge evals.

## Metadata
- Video: https://www.youtube.com/watch?v=y2Drx0SDZLo
- Duration: 13:31
- Playlist index: 445
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> hi this is Ari heluk from root signals uh presenting agent evaluations finally with the map so the agent evaluation is rather Art and Science and ultimately it is nonetheless required to actually ensure that your agents do what you expect them to do especially when you're launching them in production so without further Ado let's just uh Dive Right There into the map and start to get an understanding of what are all the things involved if you want to evaluate all the aspects of your agents uh so the agent evaluation can be actually neatly divided to the semantic and behavioral parts of what the agents do the semantic part is all about how do the representations uh of the reality that the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/y2Drx0SDZLo.txt]]
- Description cue: A systematic and principled map of the key aspects of AI Agent Evaluation is presented. Agent Evals are often approached as a laundry list of ad hoc metrics, making it hard to plan ahead towards...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://rootsignals.ai/agentevals>
