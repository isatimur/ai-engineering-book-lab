---
video_id: "9-vGxMoUM9Y"
playlist_index: 592
title: "Trust, but Verify: Shreya Rajpal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=9-vGxMoUM9Y"
duration: "19:41"
duration_seconds: 1181
view_count: 4710
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/9-vGxMoUM9Y.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:25:22+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Shreya Rajpal, co-founder and CEO of Guardrails AI, argues that LLMs are non-deterministic, so generative apps need a new paradigm: trust, but verify. Every output passes a verification suite of independent checks (hallucination against sources, PII, profanity, competitor mentions, executable code), and you use the output only if the suite passes. On failure, apply a policy: re-ask with the violation so the model self-heals, fix, filter, fall back, or log. Prompts and fine-tunes give no guarantee; ground checks in external systems, rules, or small classifiers before reaching for LLM self-reflection."
---
# Trust, but Verify: Shreya Rajpal

## Summary
Shreya Rajpal is a co-founder and the CEO of Guardrails AI, with about a decade in machine learning, including ML infrastructure and self-driving cars. Her thesis: generative AI needs a new programming paradigm, "trust but verify", because the technology is fundamentally non-deterministic.

**The problem**
Generative AI apps saw the fastest adoption of any consumer category but lower retention than traditional software, citing an investor article's charts. The common symptom: the app worked while prototyping and then behaved unreliably once shipped or tested by someone else. The root cause is stochasticity. A database query returns the correct answer every time, and that property lets us compose complex systems. An LLM returns different answers to the same question, so chained systems suffer compounding errors. Add hallucination, broken structure and prompt injection, and the fact that English is the only tool. So LLM use stays limited where correctness is critical; a wrong Copilot suggestion is fine to ignore, but high-value applications cannot work that way.

**The paradigm**
She quotes the creator of GitHub Copilot: add a constraint checker; on violation, inject what was generated and the rule broken, and regenerate. Guardrails, the open-source framework, implements this as a "safety firewall": every output passes a verification suite tuned to what the builder cares about. Examples: PII or PHI for a healthcare bot, profanity, competitor mentions (a McDonald's bot must never call Burger King the best burger), code that executes in your environment, and summaries grounded in the source. Use outputs only if the suite passes. On failure, policies include re-asking, programmatic fixing, filtering, falling back or refraining, and a no-op that just logs why a check failed. Re-asking taps the model's ability to self-heal when told why it is wrong, if you have the latency, dollar or token budget.

**Why not prompts or fine-tuning**
Prompts, RAG included, offer no guarantee. Her team ran the same LLM-as-evaluator experiment five times at zero temperature with no parameter changes and got different benchmark numbers. Training your own model is expensive and slow, and commercial APIs update models underneath you, so prompts that worked stop working.

**How to build a guardrail**
- Ground it in an external system: for text-to-SQL, re-asking against a sandbox with your database and schema "substantially" improved query correctness.
- Use rule-based heuristics, such as an extracted interest rate must end in a percent sign.
- Use traditional ML or high-precision classifiers for toxicity or harmful advice; "you don't need like a jackhammer to crack open a walnut".
- Finally, LLM self-reflection.

**Worked example**
A help-centre RAG chatbot must not hallucinate, swear or mention competitors. A provenance check requires every utterance to trace to the retrieved context, using embedding similarity, natural language inference classifiers and self-reflection. When the bot invents where a password setting lives, the check fails, a re-ask prompt pinpoints the hallucinated part and resupplies context, and the corrected answer passes. Guardrails also compiles validators into the prompt so the LLM hears the requirements up front.

## Why it matters
- The zero-temperature experiment, five identical runs with different benchmark numbers, is a concrete argument that prompting alone cannot guarantee behaviour.
- The output-validation loop with explicit failure policies (re-ask, fix, filter, fall back, no-op log) is a reusable reliability pattern for any LLM pipeline.
- Her ordering of guardrail techniques, external grounding and rules and small classifiers before LLM self-reflection, gives a cost and determinism ladder a chapter can adopt.
- The text-to-SQL sandbox result shows verification against a real runtime as the most reliable form of check.
- It frames the retention gap of generative AI apps as a reliability problem, which connects evals work to business outcomes.

## Metadata
- Video: https://www.youtube.com/watch?v=9-vGxMoUM9Y
- Duration: 19:41
- Playlist index: 592
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] hey everyone thank you for coming I am Shrea rajal I am the uh I one of the co-founders and the CEO of God rails AI uh and today we are going to be talking about trust but verify which is a new programming paradigms that we need as we're entering gen native uh application development uh before we get started a little bit about me uh uh as I mentioned I'm currently uh at God reals AI in the past I've spent about a decade or so working in machine learning uh previously I was the machine learning infrastructure lead at prase which is uh an infrastructure uh machine learning infrastructure company I spent uh a number of years in the self-driving car space working across the stack of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/9-vGxMoUM9Y.txt]]
- Description cue: Large Language Models (LLMs) such as ChatGPT have revolutionized AI applications, offering unprecedented potential for complex real-world scenarios. However, fully harnessing this potential...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

