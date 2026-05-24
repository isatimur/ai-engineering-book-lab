---
video_id: ohKt066uFhg
playlist_index: 671
title: "Viktor: AI Coworker That Lives in Slack — Fryderyk Wiatrowski"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ohKt066uFhg"
duration: "19:30"
duration_seconds: 1170
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ohKt066uFhg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:03:45+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Fryderyk Wiatrowski, co-founder of Victor, describes how his team built a company-level AI employee that lives inside Slack — not a chat assistant but an entity with its own integrations, memory, and proactive behavior. Launched in February (the year of the talk) as an experiment with zero growth expectations, Victor hit immediate product-market fit worldwide. The core architectural insight is that Slack's async latency actually makes long-running agents feel faster: when a Slack contact delivers a working app in 10 minutes you're amazed, whereas the same wait in a web UI chatbot feels broken. Victor supports 3,000 integrations (single team-admin connection shared across the entire workspace), runs on Claude Opus, and survived an A/B test against GPT-5-4 specifically because users rebelled at the personality change. The hard engineering problems are multi-user memory management (100 users = memory clutters 100× faster) and Slack-specific context routing — ensuring the growth channel's data doesn't leak into engineering channel replies."
---

# Viktor: AI Coworker That Lives in Slack — Fryderyk Wiatrowski

## Summary

Fryderyk Wiatrowski, co-founder of Victor, presents Victor not as a productivity chatbot but as a full company-level AI employee — one that lives where human employees live (Slack), has access to company tooling, and can act proactively across the entire organization.

### What Victor is and why Slack

Victor was launched in February as an internal experiment with no growth expectations. It found immediate product-market fit, with worldwide adoption that the team is still struggling to keep up with. The fundamental design decision — no web app, Slack-only — is deliberate on two levels:

1. **Presence**: Human employees don't live in web apps, they live in Slack. Making Victor interact through the same medium where teammates interact reduces the cognitive overhead of treating it as a tool.
2. **Latency perception**: Powerful agents take 10 minutes to complete tasks. In a chat interface, 10 minutes feels broken. In Slack, getting a working app back from a contact in 10 minutes is astonishing. The async channel flips the latency from a liability into a feature.

### Architecture and integration model

Victor connects to 3,000 integrations, but the company-agent design means one team admin connects an integration once and the entire workspace inherits it. This is the key distinction from personal agents like Claude Code or Open Claw: the integration graph is shared, not per-user. Wiatrowski gives the example of Meta Ads — in a 20-person growth team, you connect it once instead of 20 times, and Victor can proactively pull analytics data into any conversation where it's relevant.

### The model choice and the personality finding

Victor runs on Claude Opus. The team tried switching to GPT-5-4 because of better tool-calling and lower cost, but conducted an A/B test and found users "started raging." Wiatrowski describes Opus as having a "bit of a sassy" personality that users had developed an attachment to. This is a data point about model personality as a product variable, not just a capability variable.

### Hard engineering problems

- **Memory at scale**: Open Claw already raised concerns about memory getting cluttered over time for a single user. Victor has 100+ users per workspace, so the same memory architecture clutters 100× faster. Wiatrowski says they've solved this, though not with public details.
- **Slack context routing**: Victor operates across DMs, channels, and threads. The engineering challenge is ensuring that context from the executive channel doesn't leak into the engineering channel, and that private DMs don't surface in public threads. Channels act as permission scopes.
- **Thread continuity**: When a human starts a thread, forgets it, and opens a new DM to the same person, they carry forward the prior context implicitly. Victor has to explicitly resolve which prior sessions are relevant to a new DM.
- **Proactivity and trust**: Victor can proactively join conversations and, for example, check whether a claimed experiment result is statistically significant in PostHog. But shipping proactivity on day one caused security teams to panic. Wiatrowski's advice: earn trust with a few users first, then roll out gradually.

### The framing: a hire, not a tool

Wiatrowski closes with a customer story — a large e-commerce brand's admin accidentally connected their personal Gmail to Victor, and the whole team started asking Victor about the admin's personal emails. His punchline: "If you hire a new employee, do you give them access to your personal email? Probably not." The mistake revealed that users were treating Victor as a colleague, not a software product.

## Metadata
- Video: https://www.youtube.com/watch?v=ohKt066uFhg
- Duration: 19:30
- Playlist index: 671
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Um cool. So, my name is Fredrik. I'm the co-founder of Victor. Um Victor is the AI employee that probably most of you have heard of already. It's absolutely blowing up. We launched it in February this year zero expectations of growing at all. Uh it was actually an experiment and it surprised all of us immediate product market fit, you know, huge adoption worldwide. And yeah, we can't uh uh we can't catch up. Um so, what what is Victor? Uh Victor is an AI employee and when you think of an AI employee um you should think of it as just like a human employee. You know, lives where you live, lives in Slack. It doesn't have a web app. Um so, just like your teammates, you don't need to go to a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ohKt066uFhg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
