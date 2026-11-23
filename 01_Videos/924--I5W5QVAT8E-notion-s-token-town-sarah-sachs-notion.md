---
video_id: -I5W5QVAT8E
playlist_index: 924
title: "Notion's Token Town — Sarah Sachs, Notion"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-I5W5QVAT8E"
duration: "23:55"
duration_seconds: 1435
view_count: 1400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-I5W5QVAT8E.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:15+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sarah Sachs, who leads AI engineering at Notion and negotiates its AI contracts, argues that token cost is the structural barrier to software factories and AI-native products. Model upgrades arrive with 3x more output tokens or 40% higher prices while revenue does not grow to match, and 'your supplier is your competitor.' Her playbook: stay model agnostic (Notion's auto model handles about 75% of traffic), route traffic by need instead of sending everything to the top model, judge cost per capability per second over whole trajectories, use open weights as leverage, run deterministic jobs on CPUs, and treat security and orchestration as the next frontier."
---

# Notion's Token Town — Sarah Sachs, Notion

## Summary
Sarah Sachs leads Notion's AI engineering teams and negotiates AI contracts "for a living." Her talk is about running software factories sustainably, without going from AI-pilled to AI-poor.

**Why most companies stall**
She frames AI adoption as a journey: thought partner, assistant, teammate, and finally AI as a system, where processes interface with each other. Nobody in the room claimed to have reached the last stage, and she cites that 88% of people cannot get past AI as an assistant. Notion's thesis: data is siloed and there is no durable system of record for human-agent collaboration. The other barrier is cost, which she calls "a structural barrier to entry" and perhaps the largest reason things fail at scale.

**The token market is a bad deal**
Two monthly scenarios: a reasoning model upgrades at the same per-token price but uses three times as many output tokens; or a new model version costs 40% more and its predecessor is deprecated in four months. Your revenue does not grow 40% or 3x in that time, so auto-upgrading gives someone a bad deal, customers or investors. Large enterprises can absorb this; the "Fortune 5 million" cannot. "Your supplier is your competitor": labs serve first-party products at a very different cost of goods and resell you tokens at a surcharge. Tie yourself to one provider and you have no exit. Win on product instead: data flywheels, knowing your customers, compelling UI and orchestration. "Bet on the frontier, not on the lab."

**Route traffic by need**
Not all traffic is equal. Large-scale data analysis may justify the top model; triaging an inbox on it is "ripping you off and ourselves." Model pricing behaves like neighbouring gas stations: the leader prices freely and the runner-up only needs to be slightly cheaper, so "price does not correlate with capability growth." The frontier leader changes month to month, so a single-lab marketing tie-in is a red flag, and a bigger discount rarely beats optionality, which is your leverage.

**The model-agnostic playbook**
- Treat the harness as model interoperability, even though switching models mid-transcript breaks the cache. Notion's auto model handles about 75% of traffic, part of its "AI Switzerland" approach.
- Measure cost per capability per second across whole trajectories, not single calls. Their web search provider, Parallel, is not the cheapest per call but wins on full search trajectories.
- Switch fast and often, and trade eval partnerships with labs instead of huge commits.
- Use open-weight models for moderate tasks. They now rival recent frontier models, give customers a lower cost floor and give you negotiating leverage; whatever is good enough today is likely covered by open weights in six months.
- CPUs over GPUs: Notion's new workers run plain code, because you do not need an LLM to turn a CSV into a PDF or run deterministic SQL.
- Governance: visibility into who uses data, plus control.

**After token town**
The next six months are about security, not capability. The lethal trifecta (private data, untrusted content, external communication) grows riskier as systems become more autonomous. Sandboxes add determinism and better token economics. Multi-agent orchestration is the hardest part; most factories today are engineers babysitting agents. Her demo shows a Notion task where a Claude agent drafts a spec as a live collaborative document, teammates and a customer-voice agent from Decagon fill gaps, Claude opens a PR, and a second coding agent reviews it and finds two issues. Notion runs most polish feedback this way internally.

## Why it matters
- Concrete pricing scenarios (3x output tokens at the same price, 40% price jumps with forced deprecation) show why token economics belong in architecture decisions.
- A 75% auto-routed traffic share is a real benchmark for how much work a model router can absorb in production.
- Cost per capability per second, measured on full trajectories, is a sharper eval metric than per-call price or latency.
- The supplier-is-competitor argument gives application builders a strategic case for model agnosticism over single-lab discounts.
- Offloading deterministic work to CPUs and code is a simple, often missed lever against token burn.

## Metadata
- Video: https://www.youtube.com/watch?v=-I5W5QVAT8E
- Duration: 23:55
- Playlist index: 924
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Okay. Hello. Okay. Before I get started, you guys, this is a huge keynote room. Can everyone like come forward because I'm talking to like four empty rows and disperse people. Do me a favor. I'm spending 30 minutes telling you all of our secrets. I can see you still. Thank you. Thank you. Thank you. Thank you. We're just going to chat. It's a giant room and there's 500 of us. This room is way larger than that. Thank you. Honestly, I knew you guys had it in you. It's really not so hard. Thank you. I also sit in the back. I also work during talks. I get it. I totally get it. I did all day, but not for me. Okay, I'm gonna start, but I'm gonna still point at you if you're in the back...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-I5W5QVAT8E.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
