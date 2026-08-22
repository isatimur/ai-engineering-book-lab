---
video_id: "mYSRn6PC1mc"
playlist_index: 8
title: "Full Workshop: Build Your Own Deep Research Agents - Louis-François Bouchard, Paul Iusztin, Samridhi"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=mYSRn6PC1mc"
duration: "1:57:03"
duration_seconds: 7023
view_count: 13047
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/mYSRn6PC1mc.txt"
themes:
  - "RAG & Retrieval"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T09:58:36+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Towards AI workshop on building a deep-research plus writing agent for technical content, framed around a workflow-vs-agent autonomy tradeoff rather than any regulated domain."
---
# Full Workshop: Build Your Own Deep Research Agents - Louis-François Bouchard, Paul Iusztin, Samridhi

## Summary
Louis-François Bouchard, Samridhi, and Paul Iusztin (Towards AI) run a workshop on building a deep-research agent plus a separate writing agent, originally built to automate their own technical-content pipeline (LinkedIn posts, course articles) rather than any scientific or regulated use case. Most of the talk is a general framework for choosing between prompting, workflows, and full agents — an "autonomy slider" where added autonomy buys flexibility at the cost of control, cost, and predictability, illustrated with client examples like a fixed six-step ticket-routing workflow that didn't need agentic branching. Their deep-research agent is judged on generic precision/recall of sources and hallucination reduction, cites its sources via grounded search (Gemini/Perplexity), and is built as an MCP server exposing tools, prompts, and resources, with a separate, more constrained writing agent layered on top to keep the final output from reading as "AI slop." There is no domain-specific verification, escalation, or regulatory content in this talk — it is a general-purpose agent-engineering workshop, not a science-domain case study, despite the "science" theme tag.

## Why it matters
- Domain tag is mismatched to content: this is a generic build-your-own-research-agent workshop for marketing/educational writing, not scientific research in any regulated sense.
- The workflow-vs-agent "autonomy slider" and the fixed-six-step-ticket-routing counterexample are the most transferable generic engineering ideas here, applicable to any vertical.
- A clean negative case for the thesis: no domain-forced constraint, verification, or escalation logic exists to test it against.

## Metadata
- Video: https://www.youtube.com/watch?v=mYSRn6PC1mc
- Duration: 1:57:03
- Playlist index: 8
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Org Design & Leadership]]

## Transcript excerpt
> Hello everyone. Not too loud. I hope uh yeah, I hope it's fine. Perfect. Uh so yeah, we will start kick off the workshop and we will introduce ourselves shortly. But first we just wanted to present the slide because that's basically LinkedIn this year. It's the type of content that when you ask Chad GPT that's basically what you get a very generic response and there are a few things wrong with this actual response or that we don't really like seeing. The obvious ones are the the slop words, the AI slop, so the all the del intricacies that we all know about. But there are more uh and fortunately there there aren't even some m dashes in there. But there are some other problems like the all...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/mYSRn6PC1mc.txt]]
- Description cue: Deep research is one of the best ways to learn how to build real AI systems because it forces you to combine reasoning, planning, autonomy, tools, grounding, and feedback loops in a single...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Org Design & Leadership**.
