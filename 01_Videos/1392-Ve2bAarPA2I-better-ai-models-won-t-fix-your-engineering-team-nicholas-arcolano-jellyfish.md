---
video_id: Ve2bAarPA2I
playlist_index: 1392
title: "Better AI Models Won't Fix Your Engineering Team — Nicholas Arcolano, Jellyfish"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Ve2bAarPA2I"
duration: "16:39"
duration_seconds: 999
view_count: 8300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Ve2bAarPA2I.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-31T00:09:43+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nicholas Arcolano, head of AI and research at Jellyfish, uses telemetry from about 50,000 engineers at 447 companies to argue that if AI is not delivering, it is probably not the model. In his model of merged PRs per engineer per week, the tool (harness plus model) explains under 1%, skill use 3%, token consumption 9%, company and team 12%, and the individual about three quarters. A natural experiment where Cursor pushed users to Grok showed no output change. Heavy skill use gives a 30% bump, 10x tokens roughly doubles output, and companies show a 2x spread at fixed spend, which is the lever leaders control."
---

# Better AI Models Won't Fix Your Engineering Team — Nicholas Arcolano, Jellyfish

## Summary
Nicholas Arcolano is head of AI and research at Jellyfish, which joins AI coding tool and agent telemetry with engineering workflow and outcome data across hundreds of thousands of developers at about 1,300 companies. His thesis, framed through golf: better clubs help, but if you are not getting the outcomes you want from AI, "it's actually not the model."

**The golf analogy and a natural experiment**
PGA driving distance rose about 20% since 1980, with a 15-yard jump in the solid-core ball era, so equipment matters. Model benchmarks show the same steady rise. But around the time SpaceX announced its acquisition of Cursor, Cursor promoted Grok in its UI and changed auto mode, and Jellyfish saw the biggest model shift it had ever recorded. Plotting each engineer's shift to Grok against their change in PR throughput relative to colleagues showed no correlation. Output did not change.

**The variance map**
On a curated set of about 50,000 engineers at 447 companies using Cursor and Claude Code this year, he splits what explains merged PRs per engineer per week:
- The tool (harness and model together, "your clubs"): under 1%. Switching between Opus and Sonnet, moving to ChatGPT, moving from Cursor to Claude Code, or moving from autocomplete to agentic mode is "a nothingburger."
- How well you use it (skills, Cursor rules, harness customization): about 3%. As of September almost half of engineer weeks had no skill use and only 12% had high use. At 30+ skill runs per engineer per week, output rises about 30%, more than any model change.
- How much you use it (tokens, active days): 9%. On about 500,000 developer weeks, more tokens mean more output with diminishing returns. Moving from the median to the top 10% roughly doubles output for about 10x the tokens.
- Where you work: 12%, about one third team and two thirds company (codebase, review process, culture). At fixed consumption, top-decile companies get 2x the output of bottom-decile ones.
- The individual: about three quarters. The engineer spread is 3.5x between bottom and top deciles.

**AI has not re-sorted engineers**
Across 10,000 ranked engineers, about 44% left the top quartile every half year before AI, and 41% after. Your best engineers before AI are still your best. Craft still matters, which is why the individual factor is so large.

**The leadership takeaway**
The tool takes up all the air on Twitter, but leaders cannot make models better and may face tighter budgets. They can control people and organization. Unlike golf, "you can change the course." Jellyfish publishes monthly benchmarks and research on this data.

## Why it matters
- It puts numbers on a common intuition: model and harness choice explain under 1% of the variance in output, while company and individual factors dominate.
- The Grok shift in Cursor is a rare natural experiment on model switching at scale, and it found no effect.
- It shows skill adoption is low in practice yet worth about a 30% output bump, a cheap lever for teams.
- The 2x company spread at fixed token spend gives leaders a measurable case for investing in codebase, review process and culture.
- The metric is merged PRs only, with no quality measure, which limits how far the conclusions reach.

## Metadata
- Video: https://www.youtube.com/watch?v=Ve2bAarPA2I
- Duration: 16:39
- Playlist index: 1392
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> I'm I'm Nicholas Arcolano. I'm the head of AI and research at Jellyfish. It's great to be back here at AI Engineer. And today I want to talk about why if you're not getting the outcomes that you want with AI, uh chances are it's actually not the model, the the problem is you. Um since we're here, uh you know, we're doing this this finance theme thing in the leadership track, we're going to start with a golf analogy. Seems appropriate. Uh is anybody here a golfer? Any golfers? Anybody? If you, okay. Um so yeah, I if you don't golf, bear with me. I apologize. If if you do golf, I also apologize. It's a very painful sport. Um I love golf. Uh I'm a bad golfer. Um it's part of the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Ve2bAarPA2I.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
