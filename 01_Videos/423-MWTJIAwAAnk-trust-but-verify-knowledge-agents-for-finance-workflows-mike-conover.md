---
video_id: "MWTJIAwAAnk"
playlist_index: 423
title: "Trust, but Verify: Knowledge Agents for Finance Workflows - Mike Conover"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MWTJIAwAAnk"
duration: "21:10"
duration_seconds: 1270
view_count: 30755
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/MWTJIAwAAnk.txt"
themes:
  - "RAG & Retrieval"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:17:42+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Bright Wave's finance research agent re-verifies findings with a separate fact-check call and gives every claim a citation and audit trail, deliberately avoiding anthropomorphized agent roles."
---
# Trust, but Verify: Knowledge Agents for Finance Workflows - Mike Conover

## Summary
Mike Conover (Bright Wave) builds a research agent for financial due diligence and equity research that digests thousands of pages of filings, transcripts, and vendor contracts. Two design choices are domain-specific: findings are re-verified with a separate secondary model call that checks factual entailment against the source document — a single-pass self-check is unreliable because the model is "primed to be credulous" about its own output — and every finding carries a citation and an inspectable audit trail, since analysts in finance need to see "the receipts" behind any claim. Conover deliberately avoids anthropomorphized agent roles (a "portfolio manager agent," a "fact-checker agent") because that framing locks in a compute-graph structure that can't flex as requirements change. He also flags temporality as a distinct failure mode — post-merger financial statements aren't comparable to pre-merger ones — so evidentiary passages need contextual metadata explaining why a document matters and how it relates to other evidence. Human oversight stays central because the human analyst holds tacit knowledge (a conversation with management, a portfolio manager's read on a sector) that never gets digitized into the corpus.

## Why it matters
- Verification is architected as a separate model call, not a chain-of-thought self-check, because a single-pass model is biased toward confirming its own prior output.
- Citations plus an inspectable "what was the model thinking" audit trail are treated as a core product requirement, not a nice-to-have, because financial decisions need a traceable evidentiary chain.
- The system deliberately withholds full autonomy on judgment calls (thematic weighting, investment taste) because tacit, non-digitized information stays with the human analyst.

## Metadata
- Video: https://www.youtube.com/watch?v=MWTJIAwAAnk
- Duration: 21:10
- Playlist index: 423
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] I'm Mike con I am founder and CEO of bright wfe uh we build a research agent that digests very large corpuses of content in the financial domain so you can think of due diligence in a competitive of deal process you are pre-term sheet you step into a data room with thousands of pages of content uh you need to get to conviction quickly ahead of uh other teams you need to spot uh critical risk factors that would would diminish asset performance um it's a fairly non-trivial task um you think about mutual fund analysts its earning season you've got a universal coverage of 80 120 names there are calls transcripts filings it's um a fairly non-trivial problem to understand uh at a sector...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MWTJIAwAAnk.txt]]
- Description cue: Join us for a deep dive into the engineering and interaction design patterns that power the automated creation of high-signal, information-dense investment research reports. Distilling accurate,...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Org Design & Leadership**.
