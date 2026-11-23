---
video_id: KA5kPbdkK2E
playlist_index: 735
title: "The agent that files its own bug reports — Benjamin Verbeek, Lovable"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=KA5kPbdkK2E"
duration: "19:05"
duration_seconds: 1145
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/KA5kPbdkK2E.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:10:26+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Benjamin Verbeek, member of technical staff at Lovable (200,000+ projects a day), describes two loops toward continuous learning at scale so non-technical users never get stuck. First, an LLM judge flags sessions that go from stuck to solved; the fix is clustered into a 'Lovable Stack Overflow' entry, checked by an agent eval, injected by a small model, and A/B tested with blank injections so stale entries get dropped. Second, the agent has a vent tool to complain to its creators in Slack; it found a copy bug with non-breaking spaces, flags incidents, and now feeds an agent that opens fix PRs."
---

# The agent that files its own bug reports — Benjamin Verbeek, Lovable

## Summary
Benjamin Verbeek is a member of technical staff at Lovable with a physics background (satellites, particle physics, fusion reactors). He works on what he calls the holy grail of AI engineering: "continuous learning at scale". The goal is that a mistake happens once and never again. He shows two mechanisms Lovable uses toward it.

**Why being stuck matters**
Lovable builds for "the 99% who can't code", and users stay on one project for a long time. When he joined about a year ago it had a few thousand users; now it creates over 200,000 projects a day. Technical users push through friction, for example by editing a config or adding an API key. Non-technical users give up at the first hard technical block and never see AI succeed. So no user may ever get stuck.

**Detecting stuck**
Signals include asking for the same thing more than once, complaining about an implementation, explicit failure, or abandoning a session. An LLM judge reads sessions and flags them. He splits stuck cases into those solvable with the right prompting, those that are simple gaps or bugs, and truly hard features that need weeks of work. The first two have "no excuse" not to improve fast.

**Mechanism 1: a Stack Overflow for Lovable**
Example: a user says scrolling is laggy; the agent claims a fix but makes it worse; after several rounds it finds the real cause, overlay text with individual gradients. The judge marks the moment the session went from stuck to not stuck, ideally not because the user quit. Lovable then asks what it should have injected at the start to jump straight to the solution. It clusters similar issues to avoid overfitting to one prompt, writes a knowledge entry, and has an agent (or sometimes a human) run a quick eval on the examples. At run time a lightweight model injects a matching entry into the main agent. For a small sample it injects a blank instead, and compares project success between the two groups to show good entries more and bad ones less. He stresses this step because the knowledge goes stale with every model release and feature change, and old entries cause context rot. Early data shows fewer stuck messages and more deploys, a key metric. All top models in Lovable's internal ranking use this information.

**Mechanism 2: the vent tool**
For things that should work but do not, they asked what a human would do: complain to the boss or vent in Slack. So they gave the agent a tool to send feedback when tools, docs or platform behaviour degrade its work: missing or unclear tools, mismatched schemas, conflicting docs, broken behaviour, repeated failures from environment limits. It is prompted to send feedback only when really frustrated, which keeps the signal high; an external reviewer forced to answer every turn overfits to noise. The agent has far more context on the cause than the user does. Examples: a complaint about awkward TypeScript types for a cubic bezier, and about 20 reports in the first hour that a copy tool failed on file names with spaces. A fix still failed, because screenshots from WhatsApp or Mac insert a non-breaking space the regex missed. Spikes in vent volume match incidents such as broken sandboxes. In-line feedback is also far cheaper than a frontier-level external reviewer. Now an agent dedupes the vents, investigates and opens PRs, which developers review and often merge. The agent once even complained that the vent tool was too easy to use.

## Why it matters
- The stuck-to-unstuck transition is a high-signal, automatically detectable label for mining fixes from production sessions.
- Injecting blanks for a sample of eligible cases turns a knowledge base into a running A/B test, a concrete defence against stale context and context rot.
- The vent tool shows that the agent, not the user, is often the best-placed reporter of tooling and platform bugs, as the non-breaking-space copy bug shows.
- Prompting feedback only on real frustration, instead of forcing a review every turn, is a reusable rule for keeping agent self-reports high signal.
- Vent spikes lining up with incidents suggest agent complaints can work as a production monitoring signal.

## Metadata
- Video: https://www.youtube.com/watch?v=KA5kPbdkK2E
- Duration: 19:05
- Playlist index: 735
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Let's get this party started. Do we have any Lovable users in here? Good, good, a few. Very nice. A warm welcome to to this talk on how Lovable is improving every hour, including this hour as I'm speaking. I'm Benjamin van Beek. I'm a member of technical staff of Lovable. It's so amazing that we are filling up this bonus room. I think we're around three times as many people as would have fit in the original. So, thanks to the organizers. Um This is my background. I used to work with satellites, particle physics, and fusion reactors. So, I have a physics background. And today, I'm working at Lovable and working towards what is maybe the holy grail of AI engineering right now,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/KA5kPbdkK2E.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://se.linkedin.com/in/benjamin-verbeek>
