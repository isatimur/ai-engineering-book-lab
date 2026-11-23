---
video_id: "R30col3UPUg"
playlist_index: 191
title: "Building Applications with AI Agents — Michael Albada, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=R30col3UPUg"
duration: "15:50"
duration_seconds: 950
view_count: 15941
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/R30col3UPUg.txt"
themes:
  - "Coding Agents"
  - "Models & Inference"
ingested_at: "2026-04-24T11:43:14+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Michael Albada, a principal applied scientist on Microsoft Security Copilot, distills his O'Reilly book on agents into design rules. Agency is a means, not a goal: add it only while effectiveness stays high. Do not map 300 APIs to 300 tools, because more tools per call means lower accuracy. Prefer simple chains and trees, and move to agentic loops only when the trees become unmaintainable. Keep business logic and state outside the model behind validated tools. Split into multiple agents mainly to group tools. Above all, invest in evaluation sets you own, prompt optimizers, tracing, and safety tripwires that fall back to human review."
---
# Building Applications with AI Agents — Michael Albada, Microsoft

## Summary
Michael Albada is a principal applied scientist at Microsoft, a key contributor to Security Copilot and its agents in the cybersecurity division. He previously spent four years on geospatial machine learning at Uber. This 16-minute talk distills a 300-page O'Reilly book with full code examples. His thesis: getting an agent to 70% accuracy is easy, the long tail is hard, and the discipline that closes the gap is evaluation.

**The promise and the gap**
Y Combinator companies that describe themselves as agentic rose 254% over three years. Academic agent benchmarks have climbed from single digits to the 50s, 60s and 70s. But Albada warns builders not to "expect perfection by any measure."

**Agency is a spectrum, and so is effectiveness**
He defines an agent as an entity that can reason, act, communicate and adapt. Agency is a continuum, and he adds a second axis: effectiveness. Robotic process automation is low agency but high value, though brittle. Bad chatbots are low on both. The danger zone is high agency with low effectiveness, the "future news stories" everyone wants to avoid. Add agency only while effectiveness stays high.

**Tools**
Tool use is simple: the model outputs a function call, a parser invokes it, and the observation goes back into the loop. The common fallacy is one tool per API. With 300 APIs, do not register 300 tools. Albada says that, empirically, more tools per completion call means lower accuracy because of semantic collision. Group tools logically, give them clear names and descriptions, and make each one feel like a single human-facing action.

**Orchestration**
Keep it simple. A single chain is easier to measure, cheaper and more reliable. Trees with LLM-chosen branches work well in security for severity triage and multi-hop enrichment. Move to a fully agentic loop when the chains and trees become too convoluted to maintain, and consider fine-tuning then. A pattern he expects to grow: keep fixed business logic deterministic, expose tools that update each condition with validation, and hold state outside the model. The action then fires only when all conditions are met. The best reason for multi-agent systems is to split a large tool set into semantically similar groups behind a coordinator. Cross-team agent-to-agent protocols are promising but early.

**Evaluation and observability**
Invest more in evals than you think. Model choice, tool count, memory type and agent count are hyperparameters you cannot set without a rigorous eval set. This moves teams toward test-driven development with agents. Labeling is no longer something to outsource: AI engineers must own the expected inputs and outputs. The loop is to run inputs, review outputs, add them to the set, cluster failures and suggest fixes. He names tools for synthetic inputs, red teaming, building eval sets and automatic prompt optimization that uses a model as judge. He compares batch evaluation to larger batches in neural network training: more accurate steps, less "development by anecdote." In production, use OpenTelemetry tracing plus clustering and summarization of failures.

**Pitfalls and safety**
The pitfalls are insufficient evals (by far the biggest), weak or overlapping tool descriptions, excess complexity and a slow learning loop. Agents are a new class of vulnerability, so build tripwires and detectors at each layer that fall back to human review.

## Why it matters
- The two-axis view (agency against effectiveness) gives a clear test for when adding autonomy is justified.
- The claim that accuracy falls as tool count rises gives a concrete design rule, and a principled reason to split into multiple agents.
- Keeping business logic and state outside the model behind validated tools is a reusable reliability pattern for regulated or security-sensitive actions.
- The framing of evaluation as test-driven development with agents, owned by engineers and not outsourced labelers, is a strong argument for a book's evals chapter.
- The chain to tree to agent progression gives a practical rule for choosing an orchestration pattern.

## Metadata
- Video: https://www.youtube.com/watch?v=R30col3UPUg
- Duration: 15:50
- Playlist index: 191
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] It's a pleasure to be with you today. My name is Michael Alba and I'm a principal applied scientist at Microsoft and today I'm going to be presenting on building applications with AI agents. So just as a brief bio, I've been at Microsoft for about two years. So why I've been one of the key contributors to security copilot and the recently announced security copilot agents specifically working in the cyber security division. Before that I spent four years working on machine learning at Uber lots of big geospatial problems and I was in startups before that and this talk is really a distillation of a 300page book that I have coming out with O'Reilly. Uh the first seven chapters are...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/R30col3UPUg.txt]]
- Description cue: Generative AI has dramatically shortened the distance between ideas and implementation, enabling faster prototyping and deployment than ever before. But while language models can streamline...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Models & Inference**.
