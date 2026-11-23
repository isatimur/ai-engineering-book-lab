---
video_id: RGe6EjucbzI
playlist_index: 906
title: "\"The biggest challenge in your stack? Evals, Evals, Evals\" - 2026 State of AI Engineering results"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=RGe6EjucbzI"
duration: "19:47"
duration_seconds: 1187
view_count: 3700
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/RGe6EjucbzI.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:21:46+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Bar, an investment partner at Amplify, presents the 2026 State of AI Engineering survey (1,048 respondents, run for the first time with partners including Notion). Evals stay the top stack challenge for another year, but by a thinning margin, and vibe review is still the most common eval method. 95% of teams now use agents and 89% of those agents can write data, so write-enabled agents tripled, while control stays primitive (human approvals, gated permissions). Cost is a first-class constraint for three in four teams, open-weight models augment rather than replace closed ones, and 59% fear today's AI code creates long-term liabilities."
---

# "The biggest challenge in your stack? Evals, Evals, Evals" - 2026 State of AI Engineering results

## Summary
Bar, an investment partner at Amplify, runs a yearly survey on the state of AI engineering. This year, for the first time, it ran with partners including Notion, and it drew 1,048 respondents. Her framing: AI engineering is "more of a discipline than a job title." The sample skews senior in software but new to AI: over half of those with 10+ years of software experience have three years or less of AI experience.

**Modalities**
Text dominates. Audio has the strongest "intent to adopt ratio" (non-users who plan to adopt): 56%, up from 37% last year. The biggest real jump is image generation, which doubled from 18% to 36% of respondents using it and feeling good about it.

**Models and cost**
94% use closed models in production and 45% use open-weight models, but over 90% of open-weight users also use closed models. Open weights augment; they do not replace. Open versus closed is a top-three selection factor for only 5%. Quality dominates, then agentic capabilities such as tool calling, tied with cost. Only one in five named reliability; Bar reads it as a threshold requirement that current models already meet. 87% of teams use more than one model, mostly routed by task type, yet over half say their organizations are standardizing on fewer AI tools: standardization of platform and tools, not models. Cost now shapes ambition: 40% say it regularly limits how they use AI and 36% say sometimes. Cost and token usage is the second thing teams monitor in production, right under quality.

**Agents get write access**
95% of respondents use agents, roughly double last year. Among agent builders, write access rose from 52% to 89%, so write-enabled agents grew more than three times across the sample. Control stays blunt: human-in-the-loop approvals and gated permissions lead, "the same toolkit you'd use to manage an intern." Task decomposition, retrieval, memory and sandboxing scatter below. About two thirds name hallucination or losing context mid-task as the top frustration: the thinking, not the plumbing.

**The stack**
Evals are the number one stack challenge every year, but the lead margin is shrinking, and 96% report some stack problem. Vibe review is still the top evaluation method. On build versus buy across eight layers, inference and model serving is the most bought layer; prompt management is the most built (61% in-house), along with RAG and evals. Fine-tuning is mostly absent.

**Teams and bets**
97% report a net positive effect; the top effect is cheaper failure and more experimentation, not raw speed. Over nine in ten also feel downstream harm, led by erosion of deep technical skills and codebase understanding. 81% say AI blurs the line between engineering, product, design and marketing. Over a third of teams have non-developers shipping features, and 17% have them regularly shipping customer-facing features. 76% say AI raised job satisfaction, 59% fear today's AI code creates long-term liabilities, and only a third call software engineering solved. Five-year bets: 67% expect a lab to declare AGI, 9% expect transformers to stay state of the art, and compute in space split 36 to 38.

## Why it matters
- Hard numbers for an evals chapter: evals remain the top reported stack pain, and vibe review is still the most common method, so most teams lack a rigorous eval practice.
- The jump from 52% to 89% write access, with control limited to approvals and permission gates, quantifies the gap between agent capability and agent governance.
- Cost as a monitored, SLA-like metric for three in four teams supports a section on token economics as a design constraint.
- The build-versus-buy split (buy inference, build prompts, RAG and evals) shows where teams see their differentiation.
- The pairing of 97% net-positive impact with 59% fearing long-term liabilities frames the cheap-code maintenance debt argument.

## Metadata
- Video: https://www.youtube.com/watch?v=RGe6EjucbzI
- Duration: 19:47
- Playlist index: 906
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Now joining us on stage is the partner at Amplify Barren. Fantastic. You did a great job practicing. I feel very very loved. Um, let's get started. So, like you just heard, my name is Bar. I run a survey every year on the state of AI engineering. And the funny thing about running a survey on the state of AI engineering is that the field changes as you make the slides. Just in the past week, we've had Frontier releases treated like national security events. Meta reportedly exploring selling AI compute. By the time I get off stage, maybe something else will happen. So, if I miss a major announcement while I'm up here, please come find me after. But that's exactly why we run the survey...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/RGe6EjucbzI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
