---
video_id: "k1t2xyWMUdY"
playlist_index: 36
title: "How METR measures Long Tasks and Experienced Open Source Dev Productivity - Joel Becker, METR"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=k1t2xyWMUdY"
duration: "1:15:52"
duration_seconds: 4552
view_count: 10377
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/k1t2xyWMUdY.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T10:51:01+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Joel Becker of METR, in a mostly Q&A session, discusses why benchmark gains and METR's rising time horizons do not match the field: in METR's randomized study, 16 experienced open-source developers expected AI to speed them up but were slowed down. He argues self-reported speedups are unreliable, that tool unfamiliarity (a J-curve) explains little, and that the cause is a very high quality bar on mature repositories, where humans must verify and clean up AI output. He also argues a compute slowdown could delay time-horizon milestones, and proposes new measurement angles: time horizon under close monitoring, in-the-wild agent transcripts, and fuzzy real-world goals like those in AI Village."
---
# How METR measures Long Tasks and Experienced Open Source Dev Productivity - Joel Becker, METR

## Summary
Joel Becker of METR runs an informal, mostly Q&A session ("I have no plan for this session whatsoever") about two METR lines of work: the time-horizon measure of AI capability and a randomized study of experienced open-source developers. The recording starts mid-session, so the main results slides are referenced rather than presented in full. Several points below come from audience members and are marked as such.

**Compute and the time-horizon trend**
Becker sketches a paper's argument: if compute growth and log time-horizon growth are causally proportional, as a standard but "very contestable" economics assumption implies, then a slowdown in compute growth would halve time-horizon growth and push milestones like one-month tasks out a long way. He thinks dollars are the likelier constraint, more than power or physical limits, which Epoch's analyses suggest may not bite before 2030. He still calls straight lines on log-linear plots "a very highly underrated forecasting tool," barring a software-only singularity or another "transformer style moment."

**The developer study**
- Developers predicted that tasks would take about an hour and a half with AI and closer to two hours without. Tasks randomized to AI-allowed took a bit above two hours: a slowdown.
- An audience member notes that people answer "how productive did you feel" well, but are almost always wrong about how long a task took. Becker agrees, and says this is why he distrusts surveys of developer or researcher speedup as a measure of R&D automation.
- On the J-curve (an audience member cites Meta seeing one over three to six months after agent rollout): Becker thinks familiarity "is not explaining that much." All 16 developers used LLMs in their workflow; only Cursor was new to about three quarters. Subgroup plots show no clear trend, and the hours were coded conservatively: one developer logged 140 Cursor hours but sits in the 30 to 50 hour bin. He adds that none of the subset plots deserve much weight, and that watching hours of screen recordings convinced him more.
- His explanation: the repositories have a very high quality bar. AI moves in the right direction often, but misses project conventions and how parts fit together, so experts spend time verifying and cleaning up. The median PR in the study needed zero minutes of post-review work. On the Haskell compiler, its creator is known to argue in the comments for hours.
- An unpublished, randomized greenfield hackathon found AI-allowed teams scored roughly four percentile points higher, which he calls extremely noisy.

**Where AI may help less**
An audience member from data work argues that messy corporate data (thousands of similar "impressions" tables, field formats that change on unwritten dates, deployment data missing PR links) defeats today's agents on complex analysis such as P90 time between deployments by team. Becker admits he would expect a day of context-writing to help, but agrees no study covers data scientists.

**Next measurement ideas**
- Keep building longer tasks, as doubling time horizons will outrun task sets within about two to three years.
- Measure time horizon under close monitoring, for example AI monitors reading agent transcripts. He guesses this cuts the effective horizon by "an order of magnitude or two."
- Account for whether work can be built on later, which might cut hour-long tasks to 30 minutes.
- Mine in-the-wild agent transcripts: less experimental, but more real.
- Study fuzzy goals like AI Village, where agents fail even basic subsets of tasks such as running a merch store, ideally in a text-only setup.

## Why it matters
- One of the clearest data points for the gap between rising benchmarks and real expert productivity: the measured slowdown versus the predicted speedup.
- The perception-versus-measurement point warns against using developer self-reports as evidence of AI speedup.
- Gives a concrete mechanism for the slowdown on mature codebases: verification and cleanup cost when the quality bar is high, not lack of tool familiarity.
- Shows METR's method of triangulating with imperfect evidence sources (benchmarks, RCTs, hackathons, transcripts, open-ended agent villages) that have different pros and cons.
- Links capability forecasting to compute economics and to safety monitoring, framing time horizon under oversight as a separate, smaller number.

## Metadata
- Video: https://www.youtube.com/watch?v=k1t2xyWMUdY
- Duration: 1:15:52
- Playlist index: 36
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [music] >> Here's the very simple argument. If you look at the sub notion of compute over time, you know, this could be like R&D spending on computes. This could be the experimental computes, could be training compute, you know, whatever that some particular [clears throat] lab is is using. Looks like this, no surprise. If you have another chart of like, you know, log time horizon, let's say this this measure from the this figure that many of you would have seen on Twitter. Over time it looks like that. You know, let's say that this was like not merely a coincidence, but these things were causally proportional. In the sense that if if compute growth were to half, then time horizon growth...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/k1t2xyWMUdY.txt]]
- Description cue: AI models are crushing benchmarks. SWE-bench scores are climbing, and METR's measured time horizons are rising rapidly. Yet when we deployed these same models in a field study with experienced...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
