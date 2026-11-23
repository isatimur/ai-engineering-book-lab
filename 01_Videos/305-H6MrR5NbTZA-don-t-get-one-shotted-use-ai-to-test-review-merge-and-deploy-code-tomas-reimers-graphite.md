---
video_id: "H6MrR5NbTZA"
playlist_index: 305
title: "Don’t get one-shotted: Use AI to test, review, merge, and deploy code — Tomas Reimers, Graphite"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=H6MrR5NbTZA"
duration: "5:45"
duration_seconds: 345
view_count: 590
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/H6MrR5NbTZA.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T12:12:54+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tomas Reimers, co-founder of Graphite, an AI code review company, argues in a six-minute lightning talk that AI has sped up the inner loop of writing code, so the outer loop of testing, review, merge and deploy is now the bottleneck. Problems that once hit only large companies now hit everyone. Bots and AI teammates are not enough: the whole tool chain must be AI-native, not just the IDE. He presents Diamond, Graphite's AI reviewer, and says its comments are accepted about 52% of the time, above the 45 to 50% rate for human comments, with fewer than 4% drawing a negative reaction."
---
# Don’t get one-shotted: Use AI to test, review, merge, and deploy code — Tomas Reimers, Graphite

## Summary
Tomas Reimers is a co-founder of Graphite, an AI code review company. This is a short lightning talk, under six minutes, and mostly a product pitch. The thesis is clear: AI has changed how code gets written, so the process that checks and ships code must change too.

**Two loops**
Software development has always had two loops. In the inner loop a developer gets the code working. In the outer loop the code is tested, reviewed, merged and deployed. Reimers says the inner loop is changing more than ever. He cites the GitHub developer survey: nearly every developer surveyed used AI tools inside and outside work, and 46% of code on GitHub is written by Copilot. Even on a pessimistic forecast, the share of AI-written code keeps rising.

**The outer loop is the bottleneck**
When Graphite started building Diamond, its AI code reviewer, about a year earlier, the team saw developers in its own organization adopt AI tools fast. AI can hallucinate, make mistakes and, "almost more scarily", add security vulnerabilities. Tools like Cursor, Windsurf and Copilot produced more code than ever, so developers had to review, test, merge and deploy more code than ever. Reimers' point: problems that used to affect only large companies now affect all companies.

**Requirements for a new outer loop**
These look like the problems large companies have always solved:
- tools to prioritize, track and get notified about pull requests;
- driver-assist features that help reviewers focus;
- optimized CI pipelines and merge queues to handle the volume;
- better deployment tools.

**AI-native, not just AI teammates**
Because AI creates the volume, Graphite argues AI can also absorb it, and remove the manual review work developers dislike. Graphite's early idea was to add AI teammates, such as background agents or reviewers. Reimers says that is part of the story but "we don't think that's enough". AI-generated feedback is not perfect, so bots alone fall short. The entire tool chain must be AI-native, not just the IDE, if developers become orders of magnitude more productive.

**Diamond by the numbers**
Diamond summarizes, prioritizes and reviews each change, draws on the codebase and change history, and integrates with CI to summarize errors and fix failures. Reimers pitches it as high signal, zero setup, one-click suggestions and customizable. His numbers: fewer than 4% of Diamond's comments get a negative reaction, and about 52% are accepted, meaning integrated into the pull request. Human comments are accepted about 45 to 50% of the time. He notes the 52% figure is new as of March, after a lot of tuning.

## Why it matters
- Names the inner loop / outer loop split cleanly. It is a useful frame for why faster code generation moves the bottleneck to review, CI and deployment.
- Lists the outer-loop requirements (PR triage, reviewer assist, merge queues, faster CI, deployment tools) as a checklist for teams adopting coding agents.
- Gives a concrete metric for an AI reviewer, comment acceptance rate against a human baseline, which teams can copy to evaluate their own review bots.
- The claim that AI teammates are not enough without AI-native tooling is a clear position to test against agent-first workflows elsewhere in the book.

## Metadata
- Video: https://www.youtube.com/watch?v=H6MrR5NbTZA
- Duration: 5:45
- Playlist index: 305
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> Awesome. [Music] Uh, hi everyone. My name is Tomas. I'm one of the co-founders of Graphite. Graphite is an AI code review uh, company. So to give some context on sort of where we see the industry right now and where we see it going. Software development currently and has always had two loops. The inner loop which is focused on development and the outer loop that's focused on review. Developers spend time in the inner loop. They get their code working. They get the feature the way they want it and then they go ahead and they move it to the outer loop where it's tested, reviewed, merged, deployed. We're seeing the inner loop change right now more than we've ever seen it. More developers are...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/H6MrR5NbTZA.txt]]
- Description cue: As AI tools like GitHub Copilot and ChatGPT help engineers generate code at an unprecedented rate, the “outer loop”—reviewing, testing, merging, and deploying—becomes more vital than...

## Book angles
- Could support a chapter/section on **Coding Agents**.
