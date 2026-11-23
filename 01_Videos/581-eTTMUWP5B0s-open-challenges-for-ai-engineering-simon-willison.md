---
video_id: "eTTMUWP5B0s"
playlist_index: 581
title: "Open Challenges for AI Engineering: Simon Willison"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=eTTMUWP5B0s"
duration: "18:49"
duration_seconds: 1129
view_count: 8851
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/eTTMUWP5B0s.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
  - "Security & Guardrails"
ingested_at: "2026-04-24T12:24:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Simon Willison, creator of Datasette, stepping in at the last minute, says the GPT-4 barrier is broken: after 12 uncontested months, Gemini 1.5 Pro, Claude 3.5 Sonnet and open models such as Llama 3 70B now match it, and GPT-4 class models are free to consumers. He then names the open challenges: these tools are hard power-user tools (when does uploading a PDF to ChatGPT work?), an AI trust crisis over training on private data, prompt injection such as the markdown image exfiltration bug repeated by six teams, and slop, which he defines as AI content that is both unrequested and unreviewed."
---
# Open Challenges for AI Engineering: Simon Willison

## Summary
Simon Willison, creator of Datasette, replaced a last-minute OpenAI cancellation, and says he used a lot of LLM help to build the talk. His thesis: GPT-4 class models are now a commodity, which moves the hard problems from capability to usability, trust, security and responsibility.

**The GPT-4 barrier is gone**
GPT-4 shipped in March of the previous year and stayed uncontested for a solid 12 months, which he found "disheartening". That has changed. He rebuilt a popular chart of MMLU score versus cost per token by pasting it into Code Interpreter with new data. It shows three clusters: GPT-4 class models (Gemini 1.5 Pro, OpenAI's newest model, Claude 3.5 Sonnet); very cheap but good models (Gemini 1.5 Flash and Claude 3's cheapest tier); and GPT-3.5 Turbo, which is neither cheap nor good, so "stop using that thing". MMLU is "bar trivia", so he prefers "the Vibes": the Chatbot Arena's Elo ranking from blind pairwise votes. There, Llama 3 70B, an Nvidia model, Command R+ from Cohere, and models from Alibaba and DeepSeek sit near GPT-4 class. He had Claude 3.5 Sonnet build an animated Arena chart from two screenshots in about 20 minutes. Llama 3 70B runs on his Mac.

**Free GPT-4 class models, but hard to use**
OpenAI's best model and Claude 3.5 Sonnet are now effectively free to consumers, so many people will soon get the wake-up call the audience got a year ago. Yet ChatGPT is hard to use. When does uploading a PDF work? It must be searchable. Short PDFs go into the prompt, long ones are searched, tables and diagrams are mangled, screenshots of them work well, and sometimes Code Interpreter uses one of several PDF libraries. He only knows that list because he scrapes it with GitHub Actions. These are power-user tools, like Excel.

**The AI trust crisis**
Dropbox and Slack faced outrage over default opt-ins and vague terms, though neither trained models on customer data. You cannot convince people who believe otherwise. Anthropic stated it had not used customer data to train Claude 3.5 Sonnet, proving you do not need it. But training on an unlicensed web scrape is the "original sin" that undercuts such claims.

**Prompt injection**
His example is the markdown image exfiltration bug. A document tells the chatbot to render an image whose URL carries private data to an attacker's server. Researcher Johan found it in GitHub Copilot Chat, and the same bug hit ChatGPT, Google Bard, writer.com, Amazon Q and Google NotebookLM: "six different extremely talented teams". A funnier case: a RAG bot over his docs answered "what is the meaning of life" in the voice of a "witty Geral" (a pet persona), because semantic search matched a persona example in his release notes. "LMS are gullible": they believe anyone.

**Slop**
Slop is AI content that is "both unrequested and unreviewed". Like "spam", the word can make the bad behavior clear. Publishing means accountability: a human stakes their reputation; a model cannot. His call: the audience must set patterns for responsible use, then help everyone else.

## Why it matters
- Marks the moment GPT-4 class capability became a commodity across several vendors and open models, a reference point for any chapter on model choice.
- The PDF upload example is a sharp, testable case for why chat tools are power-user tools and why AI products need clearer documentation.
- The markdown image exfiltration bug, repeated across six products, is a canonical prompt-injection lesson: do not render untrusted image URLs in a chatbot with private data.
- Gives a usable definition of slop (unrequested and unreviewed) tied to human accountability for published content.
- Frames user trust about training data as a product and communication problem that facts alone do not fix.

## Metadata
- Video: https://www.youtube.com/watch?v=eTTMUWP5B0s
- Duration: 18:49
- Playlist index: 581
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]
- [[Security & Guardrails]]

## Transcript excerpt
> [Music] this was supposed to be open AI I am replacing open AI at the last minute which is super fun so you can bet I used a lot of llm assistance to pull things together that I'm going to be showing you today um but let's dive straight in I want to talk about the gp4 barrier right so back in um March of last year so just over a year ago gp4 was released and was obviously the best available model we all got into it it was super fun and then for 12 and it turns out that wasn't actually our first first exposure to GPT 4 a month earlier it had made the front page of the New York Times when Microsoft's Bing which was secretly Runing on a preview of gp4 tried to break up a reporter's marriage...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/eTTMUWP5B0s.txt]]
- Description cue: About Simon
Simon Willison is the creator of Datasette, an open source tool for exploring and publishing data. He currently works full-time building open source tools for data journalism, built...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Security & Guardrails**.


## Related notes
- Related note: [[591-AjLVoAu-u-Q-open-questions-for-ai-engineering-simon-willison|#591 — Open Questions for AI Engineering: Simon Willison]]
- Canonical companion for this topic pair: [[591-AjLVoAu-u-Q-open-questions-for-ai-engineering-simon-willison|#591 — Open Questions for AI Engineering: Simon Willison]]
