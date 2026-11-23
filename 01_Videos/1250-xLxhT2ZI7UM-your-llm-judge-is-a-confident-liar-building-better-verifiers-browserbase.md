---
video_id: xLxhT2ZI7UM
playlist_index: 1250
title: "Your LLM Judge Is a Confident Liar: Building Better Verifiers — Browserbase"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=xLxhT2ZI7UM"
duration: "21:14"
duration_seconds: 1274
view_count: 11000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/xLxhT2ZI7UM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T18:42:04+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Miguel, tech lead for Browserbase's agent platform, and a Microsoft researcher collaborating with Browserbase show that the LLM judges shipped with standard web-agent benchmarks are 'confidently wrong': one 7B web agent scored 74% under the official WebVoyager judge but 38% under their human-aligned universal verifier. Training on bad judges just makes 'a more competent liar'. Their verifier writes a task-specific rubric, ranks the most relevant screenshots per criterion, isolates errors, catches hallucinations and separates controllable from uncontrollable failures. It matches human-to-human agreement and yields better training data."
---

# Your LLM Judge Is a Confident Liar: Building Better Verifiers — Browserbase

## Summary
Two speakers present research published about a month before the talk. Miguel is tech lead for the agent platform at Browserbase, an infrastructure company that runs cloud browsers for web agents. His co-speaker is a Microsoft researcher who has worked with Browserbase on verifiers. Their claim: the LLM judges that come with popular web-agent benchmarks are "very confidently wrong". If you use them as an RL reward or as the signal for harness tuning, "you're not really training a better agent. You're just training a more competent liar."

**Why deterministic evals stopped scaling**
Miguel's open-source web agent framework began with deterministic evals. As models and the harness improved, the team kept patching static sites and adding checkpoints to long trajectories. The open web has many paths to success and no ground truth; pages change and blocks spoil the signal. So they turned to LLM judges, then checked those judges against human expert annotators.

**The 74% versus 38% gap**
Microsoft trained a 7B web browser agent. The official WebVoyager judge gave it a 74% success rate. Their new universal verifier, which closely agrees with human labels, gave 38%. Existing judges use small models, skip rubrics, ignore the relevant screenshots or drown in all of them, and sometimes do not read the final answer or action history.

**How the universal verifier works**
For a task such as booking the cheapest flight from Seattle to Boston, it:
1. Generates a rubric of about 10 success criteria.
2. Ranks the most relevant screenshots in the trajectory for each criterion.
3. Uses the top-K evidence to judge each criterion and flags contradictions between what the agent claimed and what the screen showed.
4. Outputs a process score (partial credit) and an outcome boolean: would a reasonable user consider the task done?

**Four principles, with examples**
- Grade only what was asked. A bad rubric for a Jakarta hotel-plus-coffee-shop task added "total price for the stay", which deflates scores unfairly.
- Do not cascade errors. Asked for the net worth of the NSync or Backstreet Boys member with the longest last name, the agent wrongly chose Timberlake over Kirkpatrick. It loses that criterion but still earns credit for reporting Timberlake's net worth correctly.
- Check ground-truth screenshots for hallucination. One agent reported a +6.2% caption-metric gain when the paper's abstract said 2.8%, a slip "even humans will not catch".
- Separate controllable from uncontrollable failure. If a plush toy is out of stock, the agent gets full process marks but the outcome fails. They wrote a schema of failure modes and how to assign credit for each.

**Proof it works**
Human annotators first judged trajectories alone, then saw the verifier's verdict and agreed or disagreed. The verifier sometimes caught what humans missed. False positives fell from almost half to zero. Its kappa agreement with humans (0.58) matched how often two humans agree with each other. In a second test they held the number of SFT examples fixed (3k or 9k trajectories) and filtered them by verifier. Data filtered by the better verifier trained a better model, at both scales. To avoid overfitting, they tuned on 50 self-labelled trajectories and held out 100 labelled by paid annotators with 2x overlap.

**Can auto research build the verifier?**
The two spent three weeks and about 30 experiments building it by hand. An auto research loop on Opus 4.6 ran the same number of experiments in about a day but reached only about 70% of their agreement. Seeded with their findings, it beat their best result. Labels, code and paper are open source, and a desktop version is in progress.

## Why it matters
- The 74% versus 38% result shows that a benchmark's built-in judge can more than double reported agent success, so headline numbers need verifier audits.
- The 'more competent liar' argument explains why a weak judge used as an RL reward or harness signal trains the wrong behaviour.
- The four rubric principles (grade only what was asked, isolate errors, check ground-truth evidence, separate controllable failure) form a ready design checklist for any LLM-as-judge.
- Filtering SFT data by verifier quality and measuring model gains is a practical second test of a judge, beyond human agreement.
- The auto research result (one day versus three weeks, about 70% of human-built quality, better when seeded) is a calibrated data point on where humans still add value in eval building.

## Metadata
- Video: https://www.youtube.com/watch?v=xLxhT2ZI7UM
- Duration: 21:14
- Playlist index: 1250
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Good afternoon everyone. Um, thank you for coming. Hope you've had a great expo so far. We're in the last stretch, but I know it's been a wonderful, wonderful expo, at least for me. So hopefully you're learning a lot and we can teach you a little bit more. Um, so I'm Miguel. I'm the tech lead for uh our agent platform at Browserbase. For those of you who don't know, browserbase is a infrastructure company for deploying agents on the web. Um it basically unlocks all of the web, not just what is easily accessible uh by managing browsers in the cloud and all the runtime that uh requires to do agentic web automation at scale. So um let >> and I'm Corby. I'm a researcher at Microsoft and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/xLxhT2ZI7UM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
