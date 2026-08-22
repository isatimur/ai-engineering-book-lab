---
video_id: "jdeMJJ_oNYg"
playlist_index: 516
title: "LLM Safeguards: Security Privacy Compliance Anti Hallucination: Daniel Whitenack"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=jdeMJJ_oNYg"
duration: "34:10"
duration_seconds: 2050
view_count: 1303
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/jdeMJJ_oNYg.txt"
themes:
  - "Security & Guardrails"
ingested_at: "2026-04-24T12:21:58+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A general enterprise LLM security checklist covering hallucination, prompt injection, and PII leakage, illustrated with a field-medic triage example rather than anything legal-specific."
---
# LLM Safeguards: Security Privacy Compliance Anti Hallucination: Daniel Whitenack

## Summary
Daniel Whitenack (Prediction Guard) presents a checklist of enterprise LLM deployment risks — hallucination, model supply-chain tampering, server-side security, PII/PHI leakage through RAG or logs, and prompt injection — drawn from real customer deployments rather than a single regulated domain; the one concrete high-stakes example he cites is a field-medic and military triage assistant, not a legal use case, despite the note's domain tag. For hallucination, instead of an LLM-as-judge he uses smaller fine-tuned factual-consistency models (an ensemble, in the tradition of UniEval/BARTScore) run against retrieved ground truth, a choice driven by latency: a second LLM call adds seconds, an NLP classifier adds milliseconds. For data leakage he layers PII/PHI detection filters in front of the model plus confidential-computing options (Intel SGX/TDX, remote attestation), because prompts and completions can sit unencrypted in logs or memory even after filtering strips the obvious fields. For agentic systems he names "excessive agency" (from the OWASP LLM Top 10) as the key new risk and recommends a dry-run-then-human-approval pattern before an agent executes any change, rather than granting it broad standing permissions.

## Why it matters
- The domain tag reads "legal," but the talk is a generic enterprise-security checklist; its one grounding example (field-medic/military triage) is a health-and-safety use case, not a legal one.
- The dry-run-then-approve pattern for agentic actions, and the deliberate choice of a lightweight classifier over an LLM-judge for latency, are the two concrete, transferable engineering decisions.
- A useful negative case for the thesis: the constraints named here (SOC2, PII detection, confidential computing) are general enterprise-security hygiene, not mechanisms specific to law or any one regulated vertical.

## Metadata
- Video: https://www.youtube.com/watch?v=jdeMJJ_oNYg
- Duration: 34:10
- Playlist index: 516
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]

## Transcript excerpt
> [Music] um so as we just heard and I'm sure you've heard throughout all of the all of the conference um AI offers this great um this great promise of us all having our co-pilots and everyone having assistance and all of us being a mented in amazing ways I don't know if you all work in real companies um but often times this is more like my experience of of of what's sort of AI adoption looks like in the uh in the actual Enterprise Real World um and and so that's what I want to talk about today and talk through some of those things um I I kind of want to as as was mentioned by Peter um we've been working for for quite a while now um thinking about how to deploy secure accurate AI systems with...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/jdeMJJ_oNYg.txt]]
- Description cue: Recorded live in San Francisco at the AI Engineer World's Fair. See the full schedule of talks at  & join us at the AI Engineer World's Fair...

## Book angles
- Could support a chapter/section on **Security & Guardrails**.
