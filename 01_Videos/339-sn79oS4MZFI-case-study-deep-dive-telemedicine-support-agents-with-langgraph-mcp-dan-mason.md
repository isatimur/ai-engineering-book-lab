---
video_id: "sn79oS4MZFI"
playlist_index: 339
title: "Case Study + Deep Dive: Telemedicine Support Agents with LangGraph/MCP - Dan Mason"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=sn79oS4MZFI"
duration: "1:56:13"
duration_seconds: 6973
view_count: 7746
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/sn79oS4MZFI.txt"
themes:
  - "Org Design & Leadership"
  - "Agent Architecture"
ingested_at: "2026-04-24T12:14:21+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A telemedicine agent scores its own confidence, escalates low-confidence or off-script replies to a physician's assistant, and stays inside physician-approved scripted language."
---
# Case Study + Deep Dive: Telemedicine Support Agents with LangGraph/MCP - Dan Mason

## Summary
Dan Mason's team built a post-treatment support agent ("Ava") for a telemedicine client on LangGraph plus MCP, and the architecture centers on a strict human-authored boundary: the agent's language comes only from "blueprints" — medically-approved scripted content co-owned and maintained by a physician's assistant, converted from the flowcharts that used to train human operators — and the system repeatedly states it is not replacing the doctor. A separate self-evaluation step scores every outgoing message on a confidence metric across several dimensions and deliberately deducts confidence for complex or unusual situations (not because the answer is wrong, but because a human should look at it); anything below a set threshold (75%) is held for human approval before it reaches the patient, and a human's review never raises the score back up. When a patient's situation falls outside the blueprint, the system escalates through a Slack channel to the physician's assistant, who can give real medical advice, and any answer requiring genuine medical judgment routes to "call 911, go to your doctor" rather than being handled by the model. The team explicitly rejected a rigid deterministic flowchart for the treatment path, since real patient messages ("I took the pills and my stomach hurts and I'm confused") don't map cleanly onto branches, and instead let the LLM navigate flexibly between predefined "anchors" in the blueprint; the confidence score itself is deliberately kept out of the prompt so the model can't game its own review. A concrete failure mode they observed: malformed tool calls could make the model hallucinate a fabricated version of the blueprint and then act on that hallucination as if it were real, which they manage by resetting state and context on each patient reconnection rather than persisting one long-running thread.

## Why it matters
- The verification layer is a second, separate evaluator call that produces a confidence score with domain-specific deductions, gating human approval below a threshold — and a human review never overwrites the score, keeping the audit trail honest.
- Escalation is a named, staffed path (a physician's assistant on Slack, a hard stop to "call 911/your doctor") rather than a generic error message, and the system explicitly disclaims replacing the doctor.
- A rigid deterministic flowchart broke on real patient language, so the domain forced a flexible LLM-navigated "blueprint plus anchors" design instead of a classic finite-state machine — a case where the generic agent approach had to give way to something more permissive but still human-authored and human-owned.

## Metadata
- Video: https://www.youtube.com/watch?v=sn79oS4MZFI
- Duration: 1:56:13
- Playlist index: 339
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Agent Architecture]]

## Transcript excerpt
> [Music] Okay. Um, hey everybody. Thank you so much for coming. Uh, really appreciate you being here. Um, this this is a great show. I love this show. Um, I was here last year as an attendee. Um, spoke in New York uh at the the New York Summit in February and I'm I'm really thrilled to be back. Um, so this is very much a showand tell. I I I said this in the Slack channel, so anybody's not in the Slack channel, feel free to join it. There's a couple links in there that might be helpful to you. Um, it is workshop Langraph MCP agents if anybody needs that. Um, but fundamentally, uh, I'm I'm just here to walk through some some really interesting work, um, that my team's been doing around, um,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/sn79oS4MZFI.txt]]
- Description cue: We've all seen website chat bots which can look up an order or answer a basic question -- but what does it take to build autonomous agents which manage long, delicate processes like multi-day...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Agent Architecture**.
