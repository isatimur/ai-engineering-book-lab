---
video_id: "aNmfvN6S_n4"
playlist_index: 544
title: "No more bad outputs with structured generation: Remi Louf"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=aNmfvN6S_n4"
duration: "15:32"
duration_seconds: 932
view_count: 10677
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/aNmfvN6S_n4.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:23:11+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Remi Louf, co-author and co-maintainer of the open-source Outlines library and CEO of the company behind it, argues that LLMs cannot be trusted to return consistent outputs, and that structured generation fixes this by masking any token that would break a regex, JSON schema or grammar. He claims it has near-zero inference overhead, makes generation faster by skipping known tokens, lifts valid JSON from a small share to 99.9% on a 7B open model, makes one-shot prompts about as accurate as eight-shot on GSM8K, and takes a small open model to 96.5% on a function-calling benchmark, above GPT-4's 93.5%."
---
# No more bad outputs with structured generation: Remi Louf

## Summary
Remi Louf is co-author and co-maintainer of Outlines, an open-source Python library for structured generation, and CEO and co-founder of the company behind it. His starting point: large language models are "fundamentally flawed" as software components. Computing rests on interfaces you can trust, and you cannot trust an LLM to return consistent output. Prompt a model to extract flight data as JSON, threaten it, use function calling, and you still sometimes get a JSON decode error. His view is that the technology for agents is not there yet, and structured generation is the fix.

**What Outlines is**
A library, not a framework, so it fits into your workflow. Major serving frameworks, including TGI, use it for function calling under the hood. It has 87 or 88 contributors. It targets open models through six integrations, including Transformers and MLX; the OpenAI integration exists mainly for comparison. You can constrain output with a regex (ask for the Google public DNS IP and get only the address, not 100 to 500 tokens of chatter), with a JSON schema or Pydantic-style model, with custom types such as a three-letter capitalised airport code, and with vision models that return valid JSON about an image.

**How it works**
A model outputs logits, a probability distribution over the next token. Logit processors already bias them for temperature and top-k or top-p sampling. Outlines adds one step: for each token, check whether adding it would violate the structure, and mask it if so. The idea is simple. Doing it efficiently is the hard part, and that is what he says sets it apart from libraries such as Guidance.

**Why you should always use it**
- **Most text is structured**: even GSM8K problems follow a fixed pattern with arithmetic defined by a context-free grammar.
- **Valid structure**: in an outside experiment on a 7B open model, valid JSON went from a small share of outputs (the captions garble the figure) to 99.9%, without prompt tuning.
- **Negligible overhead**: unlike Guidance, overhead stays near zero as output grows. The cost moves to a one-time compilation step.
- **Faster generation**: field names and brackets are known, so in one example only five of 10 tokens need generating. ChatGPT took 50 tokens to answer the DNS question; constrained, it took eight.
- **Better accuracy**: on GSM8K, structured one-shot prompting lands in the same ballpark as eight-shot. His reading is that examples teach the model the structure of the problem more than the task.
- **Stronger open models**: on a function-calling leaderboard, a small Microsoft model went from 86% to 96.5%, above the best GPT-4 at 93.5%, with no fine-tuning.

**What comes next**
They have generalised from regular expressions to context-free grammars, which can define code or protein structure, still with no overhead. They are adding semantic constraints: for text-to-SQL, models usually hallucinate table or column names, and constraints can guarantee the query runs, though not that it is right. They also plan to push constraints into the model architecture, so the model stops computing logits that get masked anyway. His closing claim: if you are not building a chatbot, you will adopt structured generation; it is only a matter of time.

## Why it matters
- Explains the mechanism of constrained decoding (logit masking) in plain terms, which helps reason about what it can and cannot guarantee.
- Reframes structured output as a speed and accuracy gain, not a cost: skipped tokens, near-zero overhead, and one-shot results close to eight-shot.
- The function-calling numbers support a concrete claim that small open models with constraints can beat a larger closed model without fine-tuning.
- The text-to-SQL example draws a clear line between a query that runs and a query that is correct, a useful distinction for reliability work.

## Metadata
- Video: https://www.youtube.com/watch?v=aNmfvN6S_n4
- Duration: 15:32
- Playlist index: 544
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] so yeah my name is Remy I'm the co-author and co-maintainer of the open source Library outlines which some of you might know and I'm also the CEO and co-founder of doxt or do text uh whichever you prefer uh we're more traditional machine learning people and the motivation for work is the very simple observation that large language models are fundamentally flawed I'll give you a very simple example um you're trying to extract flight information from a bunch of emails uh of course you want them to be you know a j Json object um you know with origin destination Etc so you go to open AI you prompt the model to death you threaten it uh you use function calling and what you get sometimes...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/aNmfvN6S_n4.txt]]
- Description cue: JSON, prompt formatting, hallucinations. If you feel uncomfortable, you have probably had to implement complex solutions to circumvent these problems. What if there was a way to increase the...

## Book angles
- Could support a chapter/section on **Models & Inference**.
