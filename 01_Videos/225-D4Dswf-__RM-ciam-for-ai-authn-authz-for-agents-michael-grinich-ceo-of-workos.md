---
video_id: "D4Dswf-__RM"
playlist_index: 225
title: "CIAM for AI: Authn/Authz for Agents — Michael Grinich, CEO of WorkOS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=D4Dswf-__RM"
duration: "20:13"
duration_seconds: 1213
view_count: 1878
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/D4Dswf-__RM.txt"
themes:
  - "Agent Architecture"
ingested_at: "2026-04-24T12:08:53+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Michael Grinich, CEO of WorkOS, argues that agents need first-class identity: a hybrid of machine and human identity that logs in headlessly, keeps long-lived sessions, gets dynamic rather than least-privilege permissions, and stays tied to a person for compliance. He lays out four patterns (persona shadowing, delegation chains, capability tokens, human escalation, which causes consent fatigue) and surveys emerging standards such as user-managed access, GNAP (RFC 9635), OpenID Connect for agents and verifiable credentials. The common pattern today is middleware that treats the agent as untrusted. He predicts agents will drive 95% of app traffic."
---
# CIAM for AI: Authn/Authz for Agents — Michael Grinich, CEO of WorkOS

## Summary
Michael Grinich is CEO of WorkOS, which provides identity services to many SaaS and B2B products. AI companies are its fastest-growing segment, and Hex and Cursor are customers. CIAM stands for customer identity and access management. His real topic is login for agents. His thesis: agents are a new kind of actor, neither bot nor integration, and they need first-class identity before enterprises can safely give them the wide access that makes them useful.

**The problem**
He opens with an internal IT-support chatbot. A user asks it to delete unused files, and it replies that it deleted the production database. You can block the database, but agents are "only as powerful as the systems you give them", which also means Jira, Salesforce, Slack and email. Agents act on behalf of users and may need data from several users at once. Machine-to-machine auth does not fit, because agents behave more like people. They are a hybrid of machine and human identity.

**Why agent identity is hard**
- Headless login: agents must sign in without a browser, sometimes to click through a front end like a computer-use system. Sessions must be long-lived but not permanent, which raises questions about where credentials live and how they refresh.
- Least privilege breaks: you want narrow scopes, but a nondeterministic agent needs broad access, so permissions must be dynamic.
- Compliance: actions must trace back to a person. SOC 2 requires people to review code, so what happens when agents review it?
- Speed and scale: agents spawn agents and act fast, so their logs must reach enterprise logging systems.

**Four architecture patterns**
- Persona shadowing: a secondary identity that shadows a user with a subset of privileges, such as agent-one Michael. It is the most common pattern he sees in the wild and is safer than pure impersonation.
- Delegation chains: signed tokens, like JWTs, that carry the original user's authorization step by step through systems.
- Capability tokens: a time-bound voucher for one action, for example "agent X can read Bob's calendar for the next 60 minutes", similar to Google's macaroons work.
- Escalation to humans: approve every action. It satisfies compliance but causes consent fatigue, and users end up approving everything.

He suggests a mix, chosen per application and customer.

**Emerging standards**
The standard delegated-authorization protocol (captioned OOTH) now reaches MCP through a 2.1 authorization server separated from the resource server. But it was built for human consent and static scopes. User-managed access lets a user set policies for what an agent may do ahead of time. GNAP (RFC 9635) negotiates scopes dynamically while the agent runs. It is well designed but rarely implemented. OpenID Connect for agents is early and may not even be official. W3C verifiable credentials could let an agent prove that it acts for an employee.

**Middleware as the emerging pattern**
Because prompt injection and hijacking survive evals and guardrails, "you kind of have to treat your agent as like untrusted". Teams put a managed trust boundary between agent code and enterprise systems that logs and enforces. WorkOS offers an MCP identity product, fine-grained authorization and bot and fraud detection. He points to Microsoft workload identities and Cloudflare's MCP auth as well.

**What comes next**
The old trusted-versus-untrusted IT model is now a gray area. Today about 95% of app traffic is human. He expects it to shift to 50%, then to 95% agents. Like ghost kitchens, some apps will be used only through agents.

## Why it matters
- The four patterns give a vocabulary for agent authorization design: shadow identities, chained delegation, single-action capability tokens, and human approval with its consent-fatigue cost.
- His point that least privilege does not map cleanly to nondeterministic agents explains why dynamic scope negotiation (GNAP, user-managed access) matters.
- Treating the agent as untrusted and putting enforcement in middleware is a concrete security architecture that does not rely on prompts or evals holding.
- The compliance angle (every agent action tied to a person, SOC 2 code review) is a practical blocker for enterprise agent adoption that teams must plan for.

## Metadata
- Video: https://www.youtube.com/watch?v=D4Dswf-__RM
- Duration: 20:13
- Playlist index: 225
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]

## Transcript excerpt
> [Music] My talk that was up here said Syiam for AI. Um that's a bit of industry lingo. It stands for customer identity and access management. Really what I'm going to be talking about here is O login for agents. Um, we just heard from uh from someone from Hex. Hex is actually a work OS customer. We provide identity services to lots and lots of different SAS businesses, B2B products and our fastest growing segment is AI companies. Turns out AI products need identity and authentication. So we have a lot of experience seeing this. So I'm going to talk about um how you can bring identity specifically to aentic based applications what we're seeing in the world today. So to start I'll just start...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/D4Dswf-__RM.txt]]
- Description cue: AI agents are changing the way modern SaaS products operate. Whether automating workflows, integrating with APIs, or acting on behalf of users, AI-driven assistants and autonomous systems are...

## Book angles
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://workos.com/guides>
