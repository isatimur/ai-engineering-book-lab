---
video_id: AnsXWH2_EBU
playlist_index: 1428
title: "How Anthropic Merges 30,000 Code Changes a Day - Manish Kapur, Sonar & Addy Osmani, Anthropic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=AnsXWH2_EBU"
duration: "18:53"
duration_seconds: 1133
view_count: 26000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/AnsXWH2_EBU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-31T03:22:50+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Manish Kapur, who leads product and solution developer relations at Sonar, interviews Addy Osmani of Anthropic on who verifies the software factory. Writing code is solved; confidence is scarce. Anthropic went from about 2,500 merged changes a day in May to about 30,000 by having Claude do a first-pass review that tries the change like a real user, hooks that study diffs, team taste codified in shared agent instruction files, and humans checking the agent's evidence (browser videos, screenshots). Kapur adds Sonar's zero-trust, multi-layer verification (deterministic, agentic, supply chain) in every loop. Both say autonomy is earned, and agent-written PRs should be labeled."
---

# How Anthropic Merges 30,000 Code Changes a Day - Manish Kapur, Sonar & Addy Osmani, Anthropic

## Summary
Manish Kapur leads the product and solution developer relations team at Sonar. He runs this talk as a conversation with Addy Osmani, who spent about 14 years at Google and now works at Anthropic on the developer experience of Claude Code, a team that ships a couple of times every day. The topic is "who verifies the software factory": the gap between teams that merge agent PRs without reading them and teams that review every line.

**The problem in numbers**
A CircleCI analysis of 28 million CI workflows found throughput up about 59%, yet three in ten merge attempts fail. Kapur says 85% of organizations already use coding agents, and 76% of developers who generate AI code say it arrives faster than they can verify it. Sonar's upcoming state of code survey of over a thousand developers adds that 84% say AI gets features to production faster, PRs grow larger and more complex, and 31% more code reaches production without review.

**Light and dark factories**
Osmani's line: "a software factory is harnessing loops at scale." In a lights-on factory, agents plan, build, check and ship while humans apply judgment and taste. In a dark factory, people move up to intent and are pulled in only for the greatest exceptions. The more verification agents generate, the further a team can go dark. Sonar's survey puts software factory use at 5% of companies today, rising to 34%, and 39% in financial services.

**How Anthropic reviews at scale**
Anthropic merged about 2,500 changes a day in May and now about 30,000. A Claude.ai refresh that tripled performance took about 3,000 pull requests from engineers, designers and other functions. The workflow:
- Claude does a first-pass review and must try the experience like a real user: end-to-end tasks, browser checks, tools, linting.
- Hooks run on every edit and study diffs, so the PR is corrected fast.
- A code review product automates review as much as possible.
- Taste and best practice live in shared files such as Claude.md and agents.md that the agent consults.
- Humans check the agent's evidence: videos of it clicking through UI, screenshots for mobile and desktop.

Osmani says giving agents a way to verify correctness and completeness can make outcomes two to three times better. The next gains come from verification more than model quality, and teams need specifics: end-to-end tests, property tests, and visual verification tests.

**Sonar's layered view**
Kapur argues for zero-trust, multi-layered verification in every loop: the agentic loop, CI, and maintenance. Layer one is deterministic analysis for bugs and security issues such as SQL injection. Layer two is agentic review for logic and intent. Layer three is supply chain security for CVEs, malware and malicious packages. Osmani adds that enterprises worry about thousands of unknown agents, so control, permissions, sandboxing, agent identity and telemetry matter. Sonar calls its approach "guide rails" rather than guard rails.

**Lightning round**
By end of 2027, Osmani expects "light factories with some dark corners." Both want agent-written PRs labeled, for audits and for extra checks, while a human stays accountable. Leaders should push teams to define what verification means; juniors should learn many kinds of tests. Takeaways: fast to write is not fast to ship, verify everything, and autonomy is earned.

## Why it matters
- It shows concretely how a team merging about 30,000 changes a day verifies agent code: first-pass agent review that runs the product, hooks on diffs, and human review of evidence.
- The light versus dark factory spectrum gives teams a way to place themselves and to tie autonomy to verification.
- Sonar's three layers separate what deterministic tools, agent reviewers and supply chain scanners each catch.
- The case for labeling agent-written PRs links accountability and audit needs to review policy.

## Metadata
- Video: https://www.youtube.com/watch?v=AnsXWH2_EBU
- Duration: 18:53
- Playlist index: 1428
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> I'm pretty excited to be here and talk about who verifies the software factory. Uh before we get started, uh can you give me a quick show of hands? Uh raise your hand if your coding agent has pulled uh opened any pull request in the last 1 week. Almost everyone, thanks. And keep your hands raised up if you have merged pull requests and reviewed every line of code that was merged. Oh, I do see a few people. That's excellent. So, what I'm going to talk about is the gap between the uh two uh camps, uh merging requests without reviewing manually, and uh you know, merging requests uh after doing some reviews. So, my name is Manish Kapoor, and I lead the product and solution uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/AnsXWH2_EBU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
