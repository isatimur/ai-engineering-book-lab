---
video_id: _cVfz88_j7A
playlist_index: 883
title: "Can Oncology Workflows Run Without Human Touch? - Anant Shankhdhar, Risa Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_cVfz88_j7A"
duration: "16:41"
duration_seconds: 1001
view_count: 607
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_cVfz88_j7A.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:21:09+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anant Shankhdhar, an AI engineer at Risa Labs, explains how his team moved some oncology prior-authorization orders to 'no touch' submission with no human review. His thesis: start with deterministic checks, use agents only where rules cannot decide, and earn confidence by reconciling several sources of evidence instead of trusting one LLM extraction. Four agents (eligibility, auth status, medical necessity, submission) run in a chain; self-healing RPA configs scale payer-portal access, and a medical necessity agent with confidence scores escalates only the cases that need a clinician."
---

# Can Oncology Workflows Run Without Human Touch? - Anant Shankhdhar, Risa Labs

## Summary
Anant Shankhdhar is an AI engineer at Risa Labs, which automates oncology workflows. His case is prior authorization: filing for insurance approval of cancer drugs. The bots already ran each step, but a human reviewed every order before submission. His task was to find the orders that could go to submission with no human touch, and to build that path. Confidence was the key metric.

**The workflow and the four agents**
An order passes through intake, eligibility and benefits verification, auth-status checks, and submission. Each drug falls into one of three pathways: no auth required (NAR), auth on file, or auth required. The team built four agents: an EV agent for eligibility, an auth agent for drug status, a medical necessity agent (the "clinical brain"), and a submission agent.

**Eligibility: a unified service plus a deterministic engine**
Insurance data is scattered across dozens of portals, APIs and documents. A coverage orchestrator picks an API path or an RPA path per patient and returns a fixed coverage-result format. A deterministic decision engine then stops inactive coverage at once. Custom integrations per portal did not scale, so the team built a repository of common and custom RPA actions and used an LLM to generate the config for each portal. RPA is fragile, so a self-healing loop finds breaks during production hours and fixes them.

**Auth status: multi-source evidence beats one extraction**
A first LLM pipeline read patient notes and sorted drugs into the three pathways, defaulting to auth required. It failed for two reasons: the notes lacked data, and LLM extraction is non-deterministic, so a human still had to check it. The fix was more evidence. For auth on file, past authorization letters confirm the LLM's answer; where the sources agree, the status is trusted. For NAR, the team built a payer rule knowledge base in SQL from monthly payer documents, historical organization behavior, LLM extractions and regular portal checks. All of it stays configurable, so the team can pull cases back if something goes wrong. A side effect: some orders held only NAR or already-authorized drugs, so they needed no human at all.

**Medical necessity: reasoning with a confidence score**
Auth-required drugs need clinical reasoning. For each order, the agent reads the patient notes and the payer's policy criteria, queries a patient medical graph of extracted biomarkers, and asks an LLM to answer the criteria questionnaire with supporting and contradictory facts. It attaches a confidence score to each answer. High-confidence cases go forward; thin-evidence cases go to a clinician. The team has a publication on this agent.

**Submission and reuse**
The submission agent works like the EV agent: per-payer integrations built from LLM-driven configs and the shared tool repository. The agents now serve other workflows too; the necessity agent can answer workflow-specific questions about any patient.

His closing rules: deterministic checks first, agents only where rules cannot decide, multi-source evidence over single-source, self-healing to scale RPA, and a reasoning layer last.

## Why it matters
- A clear pattern for removing the human from a regulated workflow: route by confidence and escalate only low-confidence cases, instead of trying to automate every order.
- Shows why a single LLM extraction cannot remove human review, and how cross-checking against a second source (authorization letters, a payer rule database) makes the output trustworthy.
- LLM-generated RPA configs plus a self-healing loop is a concrete answer to the long tail of payer portals with no API.
- The layering order (deterministic engine, then evidence reconciliation, then LLM reasoning) is a reusable design for any agent system in healthcare or insurance.

## Metadata
- Video: https://www.youtube.com/watch?v=_cVfz88_j7A
- Duration: 16:41
- Playlist index: 883
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi everyone. My name is Anant Shankar. I am an AI engineer at Trisca and I'll be talking about oncology automating oncology workflows from end to end. So at Trisca, we are automating various workflows in oncology. One of such workflows is prior authorizations where we file for authorizations for drugs for cancer patients. So I'll give a brief overview about the workflow before we move further in the call. So the first step is that we intake the orders that we get on a daily basis. The second step is we verify whether the patient is actually eligible for getting the drugs based on the amount that they have in the insurance available with them. This is called eligibility and benefits...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_cVfz88_j7A.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

