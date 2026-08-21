---
video_id: iQ5xldZ9StU
playlist_index: 992
title: "Realtime multiplayer, automation, and you! — Idan Gazit, GitHub"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=iQ5xldZ9StU"
duration: "21:41"
duration_seconds: 1301
view_count: 2400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/iQ5xldZ9StU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-14T11:35:58+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "GitHub Next's Idan Gazit demos Agentic Workflows (markdown automations with YAML guardrails on tools/network/writes) and Ace, a cloud multiplayer coding tool inferring team decisions from chat."
---

# Realtime multiplayer, automation, and you! — Idan Gazit, GitHub

## Summary
Idan Gazit, who leads GitHub Next, demos two prototypes. Agentic Workflows are markdown-authored automations that compile into GitHub Actions YAML, with a YAML frontmatter block that deterministically restricts an agent's tool access, allowed network domains, and permitted write actions ("safe outputs," e.g. a single pull request, or explicitly "allowed to do nothing") so that guardrails can't be bypassed by prompting or prompt injection alone. He demonstrates the workflow auto-upgrading his personal Astro-based site across a two-major-version jump (Astro 5 to 7), reading changelogs, applying breaking-change fixes, and verifying the result with a build and a Cloudflare preview deploy, and notes the open-source Home Assistant project built an issue triager with it that walks Python stack traces to separate first-party from third-party bugs. Four stated security principles underlie this: defense in depth, never let an agent hold secrets directly (it must ask a separate "warden" process to make authenticated calls), stage and vet all writes, and log everything. The second prototype, Ace, is a Slack-like real-time multiplayer coding environment where each session runs as an isolated cloud micro-VM rather than on a laptop, lets teammates discuss decisions in chat and co-edit a shared markdown plan, and has the agent infer the final decision from the full conversation backscroll instead of requiring an explicit instruction. He also cites an unnamed longitudinal study of about 100 developers over thousands of hours claiming hands-on-keyboard typing is only about 5% of an engineer's job.

## Why it matters
- Shows a concrete pattern for constraining agent autonomy through declarative, out-of-band guardrails (YAML permissions, "safe outputs," a secret-holding "warden" process) rather than prompt-based rules, directly relevant to a chapter on agent security.
- The Home Assistant issue-triager example is a real production case of judgment-based automation that heuristic tooling could not do before, useful as a case study.
- Ace demonstrates an emerging interface pattern — cloud-hosted multiplayer sessions where agents infer decisions from team chat and shared docs — evidence that planning and review are collapsing into the build step itself.

## Metadata
- Video: https://www.youtube.com/watch?v=iQ5xldZ9StU
- Duration: 21:41
- Playlist index: 992
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> going to start 1 minute early, which gives me one extra minute. And then anybody who came on time is going to miss the super enthralling introduction. Hi, my name is Eitan. Nice to meet you all. Uh I lead GitHub Next, which is the Labs team of GitHub. I like to call us the Department of Fool Around and Find Out, but I usually don't say the word fool. We're the team that created Copilot uh and pioneered a ton of areas since then, right? Uh spec-based programming, natural language to app, lots more. Not everything uh that we do turns into a finished product. Our job is to sort of explore the future and scout it out. Um but our job is to reach for the GitHub that's going to be next...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/iQ5xldZ9StU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
