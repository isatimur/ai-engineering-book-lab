---
video_id: 1OMHGsUZiqA
playlist_index: 945
title: "How Forward Deployed Engineering is done at Kepler — Vinoo Ganesh"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=1OMHGsUZiqA"
duration: "22:20"
duration_seconds: 1340
view_count: 1600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/1OMHGsUZiqA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:10+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vinoo Ganesh, who built Palantir's Project Frontline rotation for about 350 forward deployed engineers and now builds the function at Kepler, argues that forward deployed engineering is a product strategy, not a go-to-market role. Four Palantir lessons: find the real problem (a 47-page dashboard spec became a 4-hour Slack alert), watch what users do (a one-night Parquet viewer unblocked a migration that cut a pipeline from 17 hours to 2), define the shared language or ontology, and ship every hack as if it will run for 18 months, because it will."
---

# How Forward Deployed Engineering is done at Kepler — Vinoo Ganesh

## Summary
Vinoo Ganesh started as a software engineer at Palantir, deployed to places like Iraq and Afghanistan, and built Project Frontline, the rotation that turned about 350 Palantir software engineers into forward deployed engineers (FDEs). He later built the same program at Citadel and now builds the function at Kepler. His one claim: forward deployed engineering "is a product strategy". An FDE extends the product team, not the go-to-market team, and is judged by the product solutions they generalize from the field. Foundry, he says, came from tens of thousands of hours of such field work.

**The failure that started it**
Around 2013 Palantir built Phoenix, a transaction store, "totally in isolation". At a large financial customer, blank dates defaulted to January 1, 1970. The retention design made a bucket for every 10-minute window since then: 2.3 million key spaces at 5 MB per Cassandra file handle, or 14 TB of RAM just to start. The gap was not research. It was building without being embedded with the customer.

**Lesson 1: detect the real problem, ship the real thing**
A shipping company's VP of operations wrote a 47-page spec for a 14-metric BI dashboard, a three-month project. Palantir spent four months scoping it. Then one engineer visited the site and asked what the dispatcher does first on Monday morning: check for late trucks and call to reroute. A Slack alert, built in 4 hours, solved it. Customers describe solutions, not problems. If the fix is under a day of work, build it and ship it. Whoever defines the problem owns the solution, and small fixes earn trust and access to the real problems.

**Lesson 2: actions speak louder than words**
A data quality engineer blocked a CSV-to-Parquet migration for about a year. On site, the team saw her download CSVs and open them by double-click to spot-check quality, which Parquet did not allow. They built a Parquet viewer that night; she approved within two days, and the pipeline went from 17 hours to about two. Watch for repeated tasks, copy-paste between tools, tab switching and phones pulled out mid-task. Ask what is the most annoying part of their morning. You cannot survey your way to this: "residents get the truth".

**Lesson 3: define the language**
Sales says customers, ops says clients, finance says billing entities, developers say org IDs. Mismatched terms break integrations and data quality. Palantir's ontology came from this: nouns for entities, verbs for operations. Users adopt your language with your product, so "if you become the linguistic foundation, you're locked in". He points to skills and MCPs as current examples.

**Lesson 4: ship fast, but build for production**
A quick Groovy data-retention script spread across an almost 100,000-person customer within 12 months and needed support for years; it became his nickname. "Every hack goes into production." Before shipping, ask: will this wake me at 2 a.m. in six months, who owns it after I leave, and does it belong in the core product? Ship as if it will run for 18 months.

## Why it matters
- It gives the FDE chapter a clear definition: a product-discovery function judged by what it generalizes into the product, not by customer success.
- The Phoenix and dashboard stories show the cost of building without embedding, with hard numbers (14 TB of RAM, four months of scoping versus a 4-hour fix).
- The list of observable signals (repeated tasks, copy-paste, tab switches, phones out) is a practical field checklist for anyone deploying AI into an enterprise.
- The ontology lesson links field work to platform lock-in: whoever defines the nouns and verbs owns the integration layer.

## Metadata
- Video: https://www.youtube.com/watch?v=1OMHGsUZiqA
- Duration: 22:20
- Playlist index: 945
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] It's kind of an emotional thing to hear uh series of folks who've kind of been talking about how Palenter used to do things. Um it's funny in the olden days and this what this talk will be about is largely uh Palin's focus of FTE became a go-to market strategy but it wasn't that in the beginning how we were figuring out how to build foundry was through the lens of a product strategy and so my talk is going to be how we used FDE as a product strategy in 2013 to make the data platform that enabled Palunteer to then become the thing that Kevin Nat and all these folks were able to build on and it ultimately comes from like the background of something pretty simple. So my background is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/1OMHGsUZiqA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
