---
video_id: JvKO40CFq-s
playlist_index: 909
title: "Full Workshop: Better Auth — Paola Estefania, Better Auth"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=JvKO40CFq-s"
duration: "40:56"
duration_seconds: 2456
view_count: 1600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/JvKO40CFq-s.txt"
themes:
  - "Agent Architecture"
ingested_at: 2026-07-26T22:21:51+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Paola Estefania of Better Auth runs an interactive workshop on agent security. Her thesis: today we hand agents our own tokens, so they pretend to be us; instead we should give agents their own identity and scoped authority. She walks through an open draft protocol built on three ideas (discovery through a well-known configuration endpoint and a capability directory generated from OpenAPI specs, fine-grained capabilities instead of broad scopes, and a per-agent private key that makes the agent a principal) and demos it over MCP: device-flow approval, read-only defaults, approval for send, audit logs per agent and instant revocation."
---

# Full Workshop: Better Auth — Paola Estefania, Better Auth

## Summary
Paola Estefania of Better Auth runs this workshop as a discussion with the room, not a step-by-step build. Her question: when you tell an agent to read your email or check your calendar, how does it get there? Most people connect an MCP server or paste a personal token, so the agent acts on their behalf "but pretending to be us." Her analogy is hiring: you never give a new hire the CEO's credentials; you give them their own email and their own access. So "hire your agent": give it authority, not your credentials.

**Three problems, one protocol**
- **Discovery.** Agents only know what they can do because a human wires it up by hand. The draft protocol proposes a well-known agent configuration endpoint, modeled on the OIDC well-known pattern, where a service publishes how agents interact with it and lists its capabilities. Until services adopt it, a directory acts as a "phone book": it converts a service's OpenAPI spec into a list of capabilities (her Gmail example lists about 20) and matches an agent's intent to them.
- **Authorization.** Scopes such as "read" are too broad. Capabilities are narrower actions, so a user can allow a get, deny a delete, and attach constraints such as maximum execution time.
- **Identity.** Each agent gets its own private key and signs its own tokens. A service then sees which agent acted on behalf of which user, instead of the agent "hiding behind the user." Agents always stay attached to a user, and the protocol adds a "host" (the place that created the agent) that can also be revoked.

**The live demo**
She connects the protocol's MCP server to a chat client and asks for her last email. The agent consults the directory, maps the intent to capabilities, and requests approval through device flow, treating the agent like another device. The dashboard then shows an "email reader" agent with its agent ID, user ID, host and log of actions. Hosts get read-only capabilities by default. When she asks it to send an email, it must request the send capability through an asynchronous back-channel approval before it acts. She then revokes the agent; the next request fails and a new identity has to ask again.

**Design positions from Q&A**
- Be "safe but not to be annoying": per-user and per-host policies avoid approval on every read.
- The server side verifies agents, issues grants and enforces constraints; the SDK side creates keys.
- The directory is not a real proxy, because a data proxy does not scale.
- The first draft dates from February and was enterprise-focused. A second draft will handle long-lived agents and agents owned by companies with policies.
- Unlike an AI gateway, the protocol treats agents as principals with their own identity, which gives a full lifecycle and traceability.

Her closing line: stop saying "pretend to be me" and start saying "act for me within these limits."

## Why it matters
- The hiring analogy gives a clear argument against the common pattern of pasting a personal token into an agent or MCP server.
- It names three separate gaps in agent security (discovery, fine-grained authorization, per-agent identity) and maps each to a concrete mechanism.
- Converting OpenAPI specs into a capability directory is a practical bridge for services that have not adopted any agent protocol.
- Per-agent keys make audit logs and single-agent revocation possible without disconnecting a whole integration.
- Read-only defaults plus approval on write is a concrete balance between safety and approval fatigue.

## Metadata
- Video: https://www.youtube.com/watch?v=JvKO40CFq-s
- Duration: 40:56
- Playlist index: 909
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]


## Transcript excerpt
> Well, hello everyone. Can you hear me all? Okay. Yes. Perfect. Well, welcome to our talk, our workshop actually. Um, I know maybe you were expecting uh Burgett also. he couldn't come but we make this workshop together for you. Okay. So as you see you have there a QR code you can go ahead and go there is um our page for Asian health protocol so that you have it and I don't have to spell it for you. Um, okay. So, my whole idea today is instead of like me telling you stuff and you do this and show you how to do stuff, I want us to take one hour at least to think about Asian security, Asians because sometimes we are excited about like this new AI era, right? But we never think about or maybe...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/JvKO40CFq-s.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://uy.linkedin.com/in/paolaestefaniadecamposdefranco>
