---
video_id: 26RtyAm9y_Q
playlist_index: 1016
title: "The Dark Arts of Web Automation: Teaching Agents to Use Websites Like Humans — Corey Gallon, Rexmore"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=26RtyAm9y_Q"
duration: "21:38"
duration_seconds: 1298
view_count: 16000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/26RtyAm9y_Q.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:27:59+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Corey Gallon shows CDP-driven browser agents beat bot detection (Turnstile, MTCaptcha, reCAPTCHA v2) via a CLI-not-MCP stack and a three-rung escalation from synthetic clicks to human-like input."
---

# The Dark Arts of Web Automation: Teaching Agents to Use Websites Like Humans — Corey Gallon, Rexmore

## Summary
Corey Gallon (Rexmore) argues that a browser agent driven through the Chrome DevTools Protocol (CDP) is functionally indistinguishable from a human using a mouse, since Chrome stamps every input event "trusted" or "untrusted" based on its path rather than its source, and CDP-issued clicks land in the trusted bucket. His stack drives CDP from a CLI rather than an MCP server, using his own tool, Chrome Agent; he cites a study by Arise AI where CLI and MCP solved the same task at a similar ~83% success rate, but the CLI needed 7 turns and under a minute versus MCP's 71 round trips and 8 minutes, and notes Anthropic's reported figure that CLI-based tool calls can be up to 75x cheaper in tokens than MCP calls. He frames the interaction pattern as sense-act-verify, escalating only as needed up a three-rung "meatbag ladder": synthetic JavaScript clicks (free, but silently dropped by sites that check the trusted flag, demonstrated against a mock storefront's add-to-cart button), real CDP input-domain clicks (trusted, which defeats that check), and full human-like mouse and vision behavior for the hardest targets. He demonstrates that top rung defeating Cloudflare Turnstile (a blind trusted click computed from iframe/shadow-root screen coordinates), MTCaptcha (vision-read text typed back via trusted keystrokes), a drag-based jigsaw CAPTCHA (an eased, deliberately overshooting mouse path), and reCAPTCHA v2 via a split architecture — deterministic code drives the clicks and screenshots each round while a vision-and-reasoning agent only classifies the image tiles — fast enough to beat the challenge's per-round expiry clock.

## Why it matters
- Gives concrete, cited numbers for the CLI-vs-MCP tool-calling tradeoff (turns, wall-clock time, token cost) — direct evidence for agent-harness design decisions discussed elsewhere in this corpus.
- Documents specific adversarial bot-detection mechanics (Chrome's trusted/untrusted event stamping, shadow-root and cross-origin iframe isolation, mouse-path sampling) and working countermeasures — rare ground-level detail on the agents-vs-anti-bot arms race.
- The reCAPTCHA v2 split architecture (deterministic driver plus a narrow, vision-only model call per round) is a reusable pattern for keeping an agentic loop fast enough to meet a hard real-time constraint.

## Metadata
- Video: https://www.youtube.com/watch?v=26RtyAm9y_Q
- Duration: 21:38
- Playlist index: 1016
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. The dark arts of web automation. That sounds ominous, right? It sounds like something I'm going to teach you that you're going to need a lawyer for. Uh well, actually we'll come back to the lawyer in a minute, but a little bit of background. As I was preparing for this talk, OpenAI threatened to ban my account. Just for the work that I was doing in preparing for the talk. So, I checked my inbox a few days ago and got this. And that's a real shocker, right? So, what does one do to earn the ban hammer for cyber abuse with a web browser? Well, this. I was doing this. So, what you see here is every one of these is being solved by an AI agent with no human in the loop. And...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/26RtyAm9y_Q.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/captivus/chrome-agent>
