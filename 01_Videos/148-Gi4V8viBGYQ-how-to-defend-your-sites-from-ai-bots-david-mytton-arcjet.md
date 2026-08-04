---
video_id: "Gi4V8viBGYQ"
playlist_index: 148
title: "How to defend your sites from AI bots — David Mytton, Arcjet"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Gi4V8viBGYQ"
duration: "20:12"
duration_seconds: 1212
view_count: 2007
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Gi4V8viBGYQ.txt"
themes:
  - "Models & Inference"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:41:14+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Arcjet's David Mytton lays out 8 layered bot defenses, citing Wikipedia's 35% automated traffic and Read the Docs cutting bandwidth 800GB to 200GB a day by blocking AI crawlers."
---
# How to defend your sites from AI bots — David Mytton, Arcjet

## Summary
David Mytton (founder of Arcjet, a security SDK for developers) argues AI crawlers are measurably worsening a decades-old bot-traffic problem, citing Diaspora getting 24% of its traffic from GPTBot, Read the Docs cutting daily bandwidth from 800GB to 200GB by blocking AI crawlers, and Wikipedia spending up to 35% of its traffic serving automated clients. He distinguishes OpenAI's roughly four bot types by intent — OAI-SearchBot (indexing, generally wanted), ChatGPT-User (real-time fetches on a user's behalf), GPTBot (training data, no citation or benefit to site owners) — plus emerging "computer use"/operator agents that act autonomously and are hard to detect since they present as an ordinary Chrome browser. He walks through eight layered defenses in increasing sophistication: voluntary robots.txt, user-agent string matching (Arcjet maintains an open-source list of known bot user agents), reverse-DNS/IP verification for bots claiming to be Google/Bing/OpenAI, IP reputation and datacenter/geo signals (12% of Cloudflare's bot traffic last year came from AWS IP ranges), CAPTCHAs (increasingly trivial for LLMs to solve), proof-of-work challenges (via open-source proxies like Anubis, Go Away, and Nepenthes), emerging cryptographic client-signature standards (Cloudflare's HTTP message signatures, Apple's Privacy Pass/Private Access Tokens), and TLS/HTTP fingerprinting (the open-source JA4 hash) combined with rate limiting keyed to fingerprint or session rather than IP address.

## Why it matters
- Supplies hard traffic numbers (Diaspora 24% GPTBot, Read the Docs 800GB→200GB, Wikipedia 35%, AWS 12% of Cloudflare bot traffic) that make the "AI crawlers are a real infrastructure cost" claim falsifiable rather than anecdotal.
- Gives a named taxonomy of crawler intent (OAI-SearchBot vs. ChatGPT-User vs. GPTBot vs. autonomous operator agents) useful for a chapter distinguishing legitimate agentic traffic from scraping.
- Lays out a concrete, ordered defense stack (robots.txt through fingerprinting plus keyed rate limiting) that a book chapter on securing sites against agentic/AI traffic can cite directly rather than gesturing at "bot protection."

## Metadata
- Video: https://www.youtube.com/watch?v=Gi4V8viBGYQ
- Duration: 20:12
- Playlist index: 148
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Hi everyone. So my name is David. I'm the founder of ArtJet. We provide a security SDK for developers. So everything I'm going to be talking to you about today is what we've been building for the last few years, but how you can do it yourself. So, if you haven't had bots visiting your website and felt the pain, then you might be thinking, well, is this really a problem? Well, as as you just heard in the introduction, almost 50% of web traffic today is automated clients. And that varies depending on the industry. In gaming, that's almost 60% of all traffic is automated. And that's before the agent revolution has really kicked off. This isn't a new problem. It's been going on since...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Gi4V8viBGYQ.txt]]
- Description cue: Constantly seeing CAPTCHAs? It used to be easy to detect the humans from the droids, but what else can we do when synthetic clients make up nearly half of all web requests. Rotating IPs, spoofed...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Org Design & Leadership**.
