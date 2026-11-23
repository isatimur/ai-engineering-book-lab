---
video_id: _fHTqOs5wQA
playlist_index: 1244
title: "Build the Right Thing: Product Engineering (Part 1) — Kent C. Dodds, EpicProduct.engineer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_fHTqOs5wQA"
duration: "55:19"
duration_seconds: 3319
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_fHTqOs5wQA.txt"
themes:
  - "Coding Agents"
ingested_at: 2026-10-30T18:28:08+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kent C. Dodds opens a two-hour workshop with one thesis: when AI agents level the implementation playing field, the differentiator becomes building the right thing. Agents are 'homing' arrows that can hit any target, so the scarce skill is choosing which target matters. He draws the line between product engineer and product manager (the engineer owns data model, workflow shape, failure modes and the smallest slice), quotes podcast guests on the cost of building the wrong thing fast, including a 1.2 million Australian dollar product nobody used, and teaches The Mom Test on a live 'Just Get In' workshop-line app."
---

# Build the Right Thing: Product Engineering (Part 1) — Kent C. Dodds, EpicProduct.engineer

## Summary
Kent C. Dodds has taught experienced engineers full-time since 2019. This is part 1 of a two-hour workshop. He starts with his own "existential crisis": if an agent can write React, who needs a React course? His answer is to teach durable skills, not the technique of the week. Picture a future where agents do almost all the work; the slice humans still own is judgment about what to build.

**The thesis**
"When AI agents level the implementation playing field, the differentiator becomes building the right thing." His metaphor: engineers used to be expert archers. Now the arrows are close to "homing devices", so anyone can hit far more targets. The targets are not equal, and picking the valuable one is the skill. The question moves from "can we build it?" to "is it worth building?" It applies to enterprise feature requests as much as to startups.

**Warnings from his podcast guests**
- If you only turn tickets into code, "you look an awful lot like an agent".
- Building the thing right is downstream of building the right thing.
- The creator of Open Code: by default, new agent abilities go to working on the wrong things, and products get worse faster than ever. Agents never say "hold up".
- A Cloudflare product leader: a prototype can feel functional on the surface but not scale or handle edge cases. A product engineer owns it, throws it away, and has an agent rebuild it properly.
- Aaron Francis: you can do the wrong thing incredibly fast and feel like you are making progress.

**Product engineer, not product manager**
A product engineer links customer needs to technical choices so the team neither paints itself into a corner nor overbuilds. That covers the data model, workflow shape, observability, constraints, failure modes and the smallest slice. Examples: Instagram began as a check-in app called Bourbon and cut everything but photo sharing. Uncle Bob rode a telephone repair truck and saw 30 ways to improve his software. Michael at WorkOS chose a hosted product because security fixes cannot wait for customers to upgrade an npm package. Architecture changes stay expensive for the team and users, even if tokens are cheap. Engineers are now team leads over agents, so they must build a good "playground" of primitives and tests. Don Norman's Three Mile Island lesson: "user error does not exist"; the system was wrong.

**Q&A**
Hire for product engineering by asking what questions a candidate would ask to find the core problem, and what that implies for the system, not with no-agent coding tests. Never stop talking to customers. Look one neighbour out in the organisation so you reuse existing primitives. Engineers without product sense are the easiest to replace.

**The Mom Test, applied live**
The audience picked an example app: "Just Get In", which gets people into packed conference workshops. Dodds contrasts weak questions ("would you use this?", "what is the problem?") with strong ones: tell me about the last time this happened, what did you do instead, and what did it cost? Ask about past behaviour, never the future or your solution, or you collect compliments. If people cannot remember the last time, that is a signal too. One guest's team spent a year and 1.2 million Australian dollars building microservices to handle all of Australia logging in at once. Nobody used it. A two-week launch with manual integration would have taught them more. Close the loop with prototypes for early adopters: problems worth solving are the ones where people "run through the glass" to use a rough tool.

## Why it matters
- It states a clear thesis for a book chapter on the engineer's role after coding agents: implementation is commoditising, so judgment about what to build is the durable skill.
- The product engineer versus product manager split is concrete: the engineer owns data model, workflow shape, observability, failure modes and the smallest slice.
- The Open Code and Aaron Francis quotes name a real failure mode of agent speed: building the wrong thing faster and bloating products.
- The 1.2 million Australian dollar unused system is a vivid cost-of-overbuilding case to set against a two-week manual launch.
- The Mom Test question set (last time, workaround, cost) is a ready, reusable tool for validating agent-built features before engineering time goes in.

## Metadata
- Video: https://www.youtube.com/watch?v=_fHTqOs5wQA
- Duration: 55:19
- Playlist index: 1244
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]


## Transcript excerpt
> Okay. Hey everybody. We have like the line Stephen. Hey. Uh, we have a line that goes like all the way over here and a bottleneck right here that we're all engineers. We should be able to figure out how to solve this problem. No, just kidding. I I don't want to step on anybody's toes. Um, but if somebody wants to figure out what app he's using and help him get them through, that would be sweet. My name is Kent Seed Dods and we're just going to get started because we have two hours. I think we actually have plenty of time. Um, but uh I I don't want to have you all just waiting around. So, as people are filing in, be friendly and if you've got a seat next to you, like wave them over and let...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_fHTqOs5wQA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.

