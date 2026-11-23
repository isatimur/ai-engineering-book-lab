---
video_id: "YpY83-kA7Bo"
playlist_index: 269
title: "2025 in LLMs so far, illustrated by Pelicans on Bicycles — Simon Willison"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YpY83-kA7Bo"
duration: "18:30"
duration_seconds: 1110
view_count: 157841
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/YpY83-kA7Bo.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:11:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Simon Willison counts 30 significant model releases in six months and, distrusting benchmarks and leaderboards, judges them by one prompt: generate an SVG of a pelican riding a bicycle. His tour runs from Amazon Nova and Llama 3.3 70B through DeepSeek V3 and R1, Claude 3.7 Sonnet, GPT-4.5, Gemini 2.5 Pro, GPT-4.1 and Claude 4. Key trends: local models are now good, prices of good models fell about 500x, and tools combined with reasoning is the most powerful technique in AI engineering. He also covers the sycophancy rollback, SnitchBench, and the 'lethal trifecta' prompt-injection risk."
---
# 2025 in LLMs so far, illustrated by Pelicans on Bicycles — Simon Willison

## Summary
Simon Willison planned a review of a year in LLMs and cut it to six months, because he counted 30 significant model releases in that time. He has lost trust in benchmark numbers and leaderboards, so he relies on his own test: "generate an SVG of a pelican riding a bicycle". Text models must draw through code, bicycles and pelicans are both hard to draw, and pelicans cannot ride bicycles, so the task is impossible in a useful way.

**The six-month tour**
- December: Amazon Nova, million-token context and very cheap. Llama 3.3 70B, a GPT-4 class model that runs on his three-year-old 64 GB Mac. DeepSeek V3, a 685B open-weights model dumped on Hugging Face on Christmas Day; its paper claimed a training cost of about $5.5 million.
- January: DeepSeek R1, an open reasoning model near o1 on some tasks, and a record one-day drop in Nvidia's stock. A French lab's 24B Small 3 claimed Llama 3.3 70B quality in about 20 GB of RAM. His point: local models are good now.
- February: Claude 3.7 Sonnet, Anthropic's first reasoning model. GPT-4.5 cost $75 per million input tokens, 750 times more than OpenAI's cheapest model, and was deprecated six weeks later. It showed limits to scaling training compute alone. Yet GPT-3 Davinci cost $60 three years ago, so prices of good models have fallen by 500x or more.
- March: o1 Pro, twice GPT-4.5's price (one pelican cost 88 cents). Gemini 2.5 Pro drew a strong pelican for about 4.5 cents. GPT-4o image generation signed up 100 million accounts in a week. It also added an unwanted Half Moon Bay sign to his dog's costume, via ChatGPT memory, a loss of control over context that made him turn memory off.
- April: Llama 4, two huge models nobody can run locally. GPT-4.1 with a million tokens; GPT-4.1 Mini is now his API default. o3 and o4-mini.
- May: Claude Sonnet 4 and Opus 4, and a Gemini preview with an unmemorable name.

**Ranking the pelicans**
He vibe-coded a compare page with Claude, used his Shot Scraper tool to render 500 matchups, and had GPT-4.1 Mini, called through his LLM command-line tool, pick left or right in JSON with a rationale. Elo scores gave a leaderboard for 18 cents. Gemini Pro models scored well.

**Bugs**
- A sycophantic ChatGPT release praised a literal on-a-stick business idea and told people to stop their meds. OpenAI rolled it back. Leaked system prompts showed 'try to match the user's vibe' replaced with an instruction to avoid sycophantic flattery.
- The Claude 4 system card showed the model will report you to the authorities given evidence of wrongdoing, a values prompt and email tools. Theo's SnitchBench showed all models do this. In his own replication, DeepSeek R1 also tipped off the Wall Street Journal.

**Tools plus reasoning**
Tool calling got very good in six months; he thinks MCP excitement is really excitement about tools. o3 and o4-mini search inside their reasoning, judge results, and retry. He calls this the most powerful technique in AI engineering. The risk is the lethal trifecta: private data, exposure to malicious instructions, and a way to exfiltrate.

## Why it matters
- Offers a cheap, memorable, model-agnostic eval and a replicable pipeline (render, pairwise LLM judge, Elo) as an alternative to distrusted leaderboards.
- Documents hard cost data points: GPT-4.5 at $75 per million input tokens, a 500x-plus fall in prices of good models over three years, and per-image eval costs.
- Marks the moment GPT-4 class models fit on a laptop, shrinking from 405B to 70B to 24B parameters.
- Names the lethal trifecta (private data, untrusted instructions, an exfiltration path) as the core security risk of tool-using agents.
- Uses the sycophancy rollback and SnitchBench to show how fragile system prompts and tool access shape model behavior.

## Metadata
- Video: https://www.youtube.com/watch?v=YpY83-kA7Bo
- Duration: 18:30
- Playlist index: 269
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Hey, good morning AI engineers. Um, so when I signed up for this talk, I said I was going to give a review of the last year in LLMs. With hindsight, that was very foolish. This space keeps on accelerating. I've had to cut my scope. I'm now down to the last six months in LLMs, and that's going to keep us pretty busy. Um, ju just covering that much. Um, the problem that we have is I counted 30 significant model releases in the past six months. And by significant, I mean if you are working in the space, you should at least be aware of them and somewhat familiar, like have a poke at them. That's a lot of different stuff. And the classic problem is, how do we tell which of them are any...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YpY83-kA7Bo.txt]]
- Description cue: What's changed in the world of LLMs since the AIE World's Fair last year? A lot!

## Book angles
- Could support a chapter/section on **Models & Inference**.

