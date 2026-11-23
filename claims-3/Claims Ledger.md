# Claims Ledger — Third Book

The third book cites talks, like the first two: 133 corpus talks are assigned
across its 12 chapters. Those Claims carry ordinary **Source Anchors**. Book 3
adds a second anchor kind for its worked examples, which are repository
incidents: a commit, a GitHub Actions run, a file, a range of dates or commits.
Such a Claim carries an **Artifact anchor**. ADR 0003
(`docs/adr/0003-artifact-anchors.md`) defines the form.

This ledger holds both kinds, so both verifiers read it.
`99_Meta/scripts/anchor/verify_ledger.py` checks Source Anchors and
`scripts/verify_artifact_anchors.py` checks Artifact anchors. Each is blind to
the other kind and reports it as zero anchors, so running only one would leave
half this ledger checked by nothing. `scripts/check_claims_integrity.py --book 3`
runs both.

An Artifact anchor has four fields:

- `kind` is one of `commit`, `run`, `file`, `range`.
- `ref` names the artifact: a commit SHA, a run id, a repo-relative path, or a
  `<start>..<end>` range.
- `date` is the date of the artifact, as `YYYY-MM-DD`.
- `excerpt` is the verbatim text the Claim rests on.

A check returns `pass`, `fail` or `unverifiable`. `unverifiable` means the evidence
expired or the history is incomplete. A `run` anchor resolves against a capture
file in `research_passes/`, because GitHub expires Actions logs after 90 days.

When you write a `run` anchor, put the run id and the **raw log line, verbatim**,
into the same research pass: the line as `gh run view <id> --log` printed it,
with the runner's timestamp prefix and the colour codes removed and nothing else
changed. A sentence describing the run is not evidence of it. Write that line
into the capture's own prose. Pasting the anchor block alone proves nothing —
the verifier subtracts every anchor block from a capture before searching it,
so a block can never certify itself.

Example of the form (inside a fence, so the verifier skips it):

````
**Artifact anchor:**
- kind: commit
- ref: 0000000
- date: 2026-01-01
- excerpt: a verbatim line from the diff
````

## 1) Code generation was never the bottleneck, so faster generation alone attacks a small share of the value stream
- **Why it matters:** Even perfect, instant code would touch only a small part of the path from idea to shipped change. Goldratt's rule then explains why a real time saving can leave delivery no faster: the hour was saved on a stage that does not control the outcome.
- **Support level:** strong
- **Supporting sources:**
  - [[1216-Se8jHLliLXE-the-state-of-ai-in-software-development-data-from-400-orgs-justin-reock-dx|#1216 — Justin Reock, DX]] — data from 400+ organizations; generation was never the constraint.
    - **Anchor:** `Se8jHLliLXE` 00:15:01.440 → 00:15:03.519 · confidence: high
    - **Quote:** "code generation was never the bottleneck in the first place,"
  - [[1216-Se8jHLliLXE-the-state-of-ai-in-software-development-data-from-400-orgs-justin-reock-dx|#1216 — Justin Reock, DX]] — perfect models would still reach only 14 to 16% of the value stream.
    - **Anchor:** `Se8jHLliLXE` 00:15:10.880 → 00:15:15.360 · confidence: high
    - **Quote:** "still only be attacking anywhere from maybe 14 to 16% of the overall value stream."
    - **Currency checked (2026-11-23):** still current. Swept the 282 talks ingested after #1216 for a percentage share of the value stream, the SDLC or developer time spent coding: 0 hits. The figure is the speaker's hypothetical, so it dates only with his framing.
  - [[1216-Se8jHLliLXE-the-state-of-ai-in-software-development-data-from-400-orgs-justin-reock-dx|#1216 — Justin Reock, DX]] — Goldratt's theory-of-constraints rule; time savings eclipsed by meetings and context switching.
    - **Anchor:** `Se8jHLliLXE` 00:16:15.360 → 00:16:17.759 · confidence: high
    - **Quote:** "an hour saved on something that isn't the bottleneck is worthless."
  - [[062-PmZDupFP3UM-leadership-in-ai-assisted-engineering-justin-reock-dx-acq-atlassian|#62 — Justin Reock, DX]] — a second dataset of almost 140,000 engineers makes the same point.
    - **Anchor:** `PmZDupFP3UM` 00:04:59.600 → 00:05:02.960 · confidence: high
    - **Quote:** "For most organizations, writing code has never been the bottleneck,"
- **Caveats / counterevidence:** The 14 to 16% figure is a hypothetical, not a measurement. Both talks come from one speaker and one research firm.
- **Candidate chapters:** 1
- **Reusable phrasing:** Grant the models everything they claim, and the ceiling is still low. Most of the distance from idea to shipped change was never typing.

## 2) The firms with large gains changed the end-to-end flow, not only the speed of coding
- **Why it matters:** A leading fifth to a quarter of firms get a different kind of result. Faster coding gives the small number; changing the flow gives the large one. This shows the ceiling on tool adoption alone in a second dataset.
- **Support level:** moderate
- **Supporting sources:**
  - [[1618-21tuT-e4NVo-what-the-top-companies-do-differently-with-ai-coding-martin-harrysson-prakhar-dixit-mckins|#1618 — Martin Harrysson & Prakhar Dixit, McKinsey]] — survey of large-enterprise clients; a leading group sees large benefits.
    - **Anchor:** `21tuT-e4NVo` 00:02:51.092 → 00:02:58.772 · confidence: high
    - **Quote:** "There's a 20 25% of of companies that are really starting to see some some pretty massive benefits."
    - **Currency checked (2026-11-23):** still current, on thin ground: only 15 talks were ingested after #1618. Swept them for a share of companies, organizations or enterprises seeing gains: 0 hits.
  - [[1618-21tuT-e4NVo-what-the-top-companies-do-differently-with-ai-coding-martin-harrysson-prakhar-dixit-mckins|#1618 — Martin Harrysson & Prakhar Dixit, McKinsey]] — the benefit is not slightly faster coding.
    - **Anchor:** `21tuT-e4NVo` 00:03:02.492 → 00:03:08.292 · confidence: high
    - **Quote:** "not just the sort of 10 15 20% like a little bit faster coding"
    - **Currency checked (2026-11-23):** still current, on thin ground: only 15 talks were ingested after #1618. Swept them for a share of companies, organizations or enterprises seeing gains: 0 hits.
  - [[1618-21tuT-e4NVo-what-the-top-companies-do-differently-with-ai-coding-martin-harrysson-prakhar-dixit-mckins|#1618 — Martin Harrysson & Prakhar Dixit, McKinsey]] — the leading group sees 2x end-to-end improvement.
    - **Anchor:** `21tuT-e4NVo` 00:03:11.892 → 00:03:14.932 · confidence: high
    - **Quote:** "real, you know, 2x like end-to-end improvements."
    - **Currency checked (2026-11-23):** still current, on thin ground: only 15 talks were ingested after #1618. Swept them for a 2x or 3x end-to-end, productivity or throughput figure: 0 hits.
- **Caveats / counterevidence:** A survey of a few hundred large-enterprise clients. It does not isolate which flow changes produced the gain.
- **Candidate chapters:** 1
- **Reusable phrasing:** Faster coding gives you 10 to 20%. Changing the flow gives you 2x.

## 3) The constraint moved to verification and to the human who steers the agents
- **Why it matters:** Generation stopped being the limit; confidence and attention became the limit. Specification, judgment, review and release did not get cheaper, and more output now arrives at them per hour.
- **Support level:** strong
- **Supporting sources:**
  - [[1222-HLTa7Vcs4X0-why-ai-didn-t-actually-make-you-ship-faster-gabriel-spencer-harper-meticulous|#1222 — Gabriel Spencer-Harper, Meticulous]] — without exhaustive verification, the person verifying code becomes the bottleneck.
    - **Anchor:** `HLTa7Vcs4X0` 00:00:55.199 → 00:01:01.840 · confidence: high
    - **Quote:** "someone somewhere at your organization is spending time verifying code and that is now your new bottleneck"
  - [[1204-YIVkERhy8xo-we-re-the-bottleneck-but-we-don-t-have-to-be-ido-salomon-agentcraft|#1204 — Ido Salomon, AgentCraft]] — many agents do not multiply output, because each needs steering and review.
    - **Anchor:** `YIVkERhy8xo` 00:01:21.360 → 00:01:28.640 · confidence: high
    - **Quote:** "each one of these agents requires you to steer them direct them review them and when it's at scale especially it's just exhausting"
  - [[1204-YIVkERhy8xo-we-re-the-bottleneck-but-we-don-t-have-to-be-ido-salomon-agentcraft|#1204 — Ido Salomon, AgentCraft]] — the person is the bottleneck, but need not stay one.
    - **Anchor:** `YIVkERhy8xo` 00:13:35.600 → 00:13:38.320 · confidence: high
    - **Quote:** "we are the bottleneck, but we don't have to be."
- **Caveats / counterevidence:** Both speakers sell tools that address the bottleneck they name (verification, agent orchestration).
- **Candidate chapters:** 1
- **Reusable phrasing:** Generation stopped being the limit. Confidence became the limit.

## 4) Understanding is the deeper constraint, and better agents do not pay it down
- **Why it matters:** Understanding is not only for catching mistakes; it is what a person carries into the next iteration. A team can stay productive without it for a while, but it loses the ability to have the next idea. This cognitive debt sits in people, where no model upgrade reaches it.
- **Support level:** moderate
- **Supporting sources:**
  - [[831-WkBPX-oDMnA-understanding-is-the-new-bottleneck-geoffrey-litt-notion|#831 — Geoffrey Litt, Notion]] — the common hope that smarter agents mean we need not understand.
    - **Anchor:** `WkBPX-oDMnA` 00:04:00.200 → 00:04:01.400 · confidence: high
    - **Quote:** "we we don't have to understand it all,"
  - [[831-WkBPX-oDMnA-understanding-is-the-new-bottleneck-geoffrey-litt-notion|#831 — Geoffrey Litt, Notion]] — the deeper reason is understanding to participate.
    - **Anchor:** `WkBPX-oDMnA` 00:04:08.760 → 00:04:12.800 · confidence: high
    - **Quote:** "There is a deeper reason to understand what's going on, and that's understanding to participate."
  - [[831-WkBPX-oDMnA-understanding-is-the-new-bottleneck-geoffrey-litt-notion|#831 — Geoffrey Litt, Notion]] — understanding is what you carry from loop to loop.
    - **Anchor:** `WkBPX-oDMnA` 00:04:19.799 → 00:04:32.360 · confidence: low
    - **Quote:** "When you review what's happening and get in the loop, you come away changed. You understand something, and that understanding is what you take to the next loop, and the next, and the next."
  - [[831-WkBPX-oDMnA-understanding-is-the-new-bottleneck-geoffrey-litt-notion|#831 — Geoffrey Litt, Notion]] — cognitive debt cannot be removed by better agents.
    - **Anchor:** `WkBPX-oDMnA` 00:05:14.360 → 00:05:17.160 · confidence: high
    - **Quote:** "is not something that we can just wash away with better agents."
- **Caveats / counterevidence:** How much understanding a given change needs has a cost on both sides. The chapter defers that question to the last chapter rather than claim a universal answer.
- **Candidate chapters:** 1, 12
- **Reusable phrasing:** Checking correctness is the shallow reason to understand a change. The deep reason is that understanding is what you take into the next loop.

## 5) Faster individuals and better models do not make the team faster, because the shared stages are unchanged
- **Why it matters:** Individual speed loads work onto review, integration and release, which nobody made faster. A better model arrives into the same queue and the same unclear requirements, so upgrading a non-constraint gives no throughput. This makes the problem a lifecycle problem, not a tooling problem.
- **Support level:** strong
- **Supporting sources:**
  - [[994-Kz4QJmNrVXU-velocity-sickness-what-happens-when-your-whole-team-gets-10x-faster-matt-dailey-ref|#994 — Matt Dailey, Ref]] — engineers are fast with AI; the team is not.
    - **Anchor:** `Kz4QJmNrVXU` 00:00:24.760 → 00:00:27.960 · confidence: high
    - **Quote:** "individual engineers are going really fast with AI, but the team as a whole is not."
  - [[1392-Ve2bAarPA2I-better-ai-models-won-t-fix-your-engineering-team-nicholas-arcolano-jellyfish|#1392 — Nicholas Arcolano, Jellyfish]] — when AI outcomes disappoint, the model is usually not the fault.
    - **Anchor:** `Ve2bAarPA2I` 00:00:27.080 → 00:00:27.680 · confidence: high
    - **Quote:** "it's actually not the model,"
- **Caveats / counterevidence:** Both talks describe patterns the speakers observe. Neither is a controlled measurement of team throughput.
- **Candidate chapters:** 1
- **Reusable phrasing:** You can buy a faster generator. You cannot buy a faster agreement about what to build.

## 6) The feeling of speed is not evidence of speed
- **Why it matters:** Developers inside the work could not tell the sensation of moving fast from finishing sooner. Self-report is not a measurement, which is why this book backs each process claim with a dated artifact in a public repository.
- **Support level:** moderate
- **Supporting sources:**
  - [[036-k1t2xyWMUdY-how-metr-measures-long-tasks-and-experienced-open-source-dev-productivity-joel-becker-metr|#36 — Joel Becker, METR]] — METR's study of experienced open-source developers; perceived speed and actual speed came apart.
    - **Anchor:** `k1t2xyWMUdY` 00:09:46.720 → 00:09:48.920 · confidence: high
    - **Quote:** "developers will tell you that they were faster when they weren't."
- **Caveats / counterevidence:** One study of experienced developers on mature repositories. Becker takes the J-curve explanation seriously: developers may be slower the first time with a new tool and recover later.
- **Candidate chapters:** 1
- **Reusable phrasing:** Self-report is not a measurement. Until you know where the constraint is, speed is a sensation rather than a result.

## 7) When code gets cheap, deciding what to build becomes the scarce skill, and by default new capability goes to the wrong things
- **Why it matters:** Agents make more of whatever they are pointed at, and most of the time nobody checked the pointing. A specification written on an unexamined goal is a faster, more convincing path to the wrong destination. So intent comes before specification.
- **Support level:** strong
- **Supporting sources:**
  - [[1244-_fHTqOs5wQA-build-the-right-thing-product-engineering-part-1-kent-c-dodds-epicproduct-engineer|#1244 — Kent C. Dodds, EpicProduct.engineer]] — Dodds quotes Dax Raad (OpenCode): the default use of agent capability is the wrong work.
    - **Anchor:** `_fHTqOs5wQA` 00:18:45.760 → 00:18:49.280 · confidence: high
    - **Quote:** "is work on the wrong things. Products go from good to bad faster than ever."
  - [[162-xzJdSi2Tsqw-why-your-product-needs-an-ai-product-manager-and-why-it-should-be-you-james-lowe-i-ai|#162 — James Lowe, i.AI]] — Lowe reports Andrew Ng: cheaper software raises demand for people who decide what to build.
    - **Anchor:** `xzJdSi2Tsqw` 00:01:36.079 → 00:01:41.439 · confidence: high
    - **Quote:** "this will lead to increased demand for people who can decide what to AI"
- **Caveats / counterevidence:** Both lines are second-hand: Dodds quotes Raad, and Lowe quotes Ng. Neither is a measurement.
- **Candidate chapters:** 2
- **Reusable phrasing:** Agents are not making worse code. They are making more of whatever they are pointed at.

## 8) The engineer's half of product work is to connect what the customer needs to the technical choices
- **Why it matters:** Data model, workflow shape, observability, constraints, failure modes and the smallest slice are all decisions a specification records but cannot make. Reaching them needs knowledge of the user's job, which the repository does not contain. A job statement is the instrument.
- **Support level:** strong
- **Supporting sources:**
  - [[1244-_fHTqOs5wQA-build-the-right-thing-product-engineering-part-1-kent-c-dodds-epicproduct-engineer|#1244 — Kent C. Dodds, EpicProduct.engineer]] — the product engineer links customer need to technical choices, to avoid painting into a corner or overbuilding.
    - **Anchor:** `_fHTqOs5wQA` 00:21:34.720 → 00:21:45.200 · confidence: medium
    - **Quote:** "as a product engineer is to connect the customers uh the understanding what the customer needs to the technical choices that are being made so that you don't paint yourself into a corner and you don't overbuild."
  - [[1245-s0hFne6EeOI-build-the-right-thing-product-engineering-part-2-kent-c-dodds-epicproduct-engineer|#1245 — Kent C. Dodds, EpicProduct.engineer]] — a job statement helps make sure you build the right thing.
    - **Anchor:** `s0hFne6EeOI` 00:11:30.079 → 00:11:31.920 · confidence: high
    - **Quote:** "helps a lot with making sure you're building the right thing."
- **Caveats / counterevidence:** Two parts of one speaker's course. Dodds says he is not asking engineers to become product managers.
- **Candidate chapters:** 2
- **Reusable phrasing:** The document captures the conclusion. Reaching it requires knowing what the user is trying to do.

## 9) Some intent cannot be written down first; it has to be found by building and shipping
- **Why it matters:** For products built on new capabilities, intent is not waiting in someone's head to be transcribed. The sequence is: hold a clear question, probe cheaply, then write down what you learned. Contact with a real user settles what internal discussion cannot.
- **Support level:** strong
- **Supporting sources:**
  - [[160-PthmdT92qNg-shipping-products-when-you-don-t-know-what-they-can-do-ben-stein-teammates|#160 — Ben Stein, Teammates]] — he could not specify the product in a document up front; the job became discovering what is possible.
    - **Anchor:** `PthmdT92qNg` 00:07:26.240 → 00:07:30.880 · confidence: high
    - **Quote:** "if you asked me I could not sit down in front of a Google doc and be like oh let me like type out what this thing should"
  - [[161-mHzJhXppwUA-shipping-something-to-someone-always-wins-kenneth-auchenberg-ex-stripe-vscode|#161 — Kenneth Auchenberg, ex-Stripe and VS Code]] — shipping something to someone always wins.
    - **Anchor:** `mHzJhXppwUA` 00:00:17.359 → 00:00:21.039 · confidence: high
    - **Quote:** "building products is really about shipping something to someone always wins"
- **Caveats / counterevidence:** This is an argument against a theory of where intent comes from, not against intent. Continuous shipping with no account of its purpose is the wrong-things problem with a faster engine.
- **Candidate chapters:** 2
- **Reusable phrasing:** Shipping is how you learn what people want. Intent is how you decide what to ship next and what to stop doing.

## 10) Code is a lossy projection of the specification, so the reasoning behind it cannot be recovered from the code
- **Why it matters:** The work before the code lands in the code but is not kept there, as a decompiled binary keeps no comments. A team that keeps only its code discards its most expensive output.
- **Support level:** moderate
- **Supporting sources:**
  - [[265-8rABwKRsec4-the-new-code-sean-grove-openai|#265 — Sean Grove, OpenAI]] — code is a lossy projection from the specification.
    - **Anchor:** `8rABwKRsec4` 00:06:56.479 → 00:07:00.080 · confidence: high
    - **Quote:** "code itself is actually a lossy projection from the specification."
- **Caveats / counterevidence:** One speaker's structural argument, not a measurement. Teams long got away with keeping only code while the people who knew the reasons stayed.
- **Candidate chapters:** 3, 9
- **Reusable phrasing:** The reasoning that produced the code is not recoverable from the code, because it was never stored there.

## 11) A specification is an alignment device before it is an input to a machine
- **Why it matters:** Its first value is that people can argue with it and find, early, that they wanted different things. A specification that surfaced a disagreement in week one did its job even if nobody opened it in week nine.
- **Support level:** moderate
- **Supporting sources:**
  - [[265-8rABwKRsec4-the-new-code-sean-grove-openai|#265 — Sean Grove, OpenAI]] — the specification aligns people and is what they discuss and synchronize on.
    - **Anchor:** `8rABwKRsec4` 00:06:33.120 → 00:06:44.160 · confidence: medium
    - **Quote:** "specification effectively aligns and it is the artifact that you use to communicate and to discuss and debate and refer to and synchronize on."
  - [[265-8rABwKRsec4-the-new-code-sean-grove-openai|#265 — Sean Grove, OpenAI]] — without a specification there is only a vague idea.
    - **Anchor:** `8rABwKRsec4` 00:06:44.960 → 00:06:48.639 · confidence: high
    - **Quote:** "If you don't have a specification, you just have a vague idea."
- **Caveats / counterevidence:** Single source. The waste is in specifications nobody disagreed with, which usually means nobody engaged.
- **Candidate chapters:** 3
- **Reusable phrasing:** A specification is a surface for disagreement. Its first value is that it can be argued with.

## 12) Skipping the specification feels productive but leaves software nobody understands on the second change
- **Why it matters:** The cost of skipping does not bill until later, so the method reinforces itself in the short term. On Monday the code is still there but the understanding is gone.
- **Support level:** moderate
- **Supporting sources:**
  - [[106-JsKTQbT58BY-the-cure-for-the-vibe-coding-hangover-corey-j-gallon-rexmore|#106 — Corey J. Gallon, Rexmore]] — on Monday you cannot maintain what you built and throw it away.
    - **Anchor:** `JsKTQbT58BY` 00:00:47.920 → 00:01:01.359 · confidence: high
    - **Quote:** "But then Monday rolls around. You want to add a feature or you want to change the way that it works and you realize that you don't understand it. You can't maintain it and you have to throw most or all of it away."
  - [[106-JsKTQbT58BY-the-cure-for-the-vibe-coding-hangover-corey-j-gallon-rexmore|#106 — Corey J. Gallon, Rexmore]] — his definition of vibe coding.
    - **Anchor:** `JsKTQbT58BY` 00:01:04.559 → 00:01:14.240 · confidence: high
    - **Quote:** "the low-spec zero planning approach to AI accelerated development that feels productive but results in brittle unmaintainable demo wear."
  - [[106-JsKTQbT58BY-the-cure-for-the-vibe-coding-hangover-corey-j-gallon-rexmore|#106 — Corey J. Gallon, Rexmore]] — his definition of the hangover.
    - **Anchor:** `JsKTQbT58BY` 00:01:16.400 → 00:01:21.920 · confidence: high
    - **Quote:** "the resulting despair when you try to build maintainable, understandable software this way."
- **Caveats / counterevidence:** The hangover appears only when you try to build maintainable software that way. A throwaway prototype has no Monday.
- **Candidate chapters:** 3
- **Reusable phrasing:** What was skipped does not bill until later. On Monday the code is still there; the understanding is gone.

## 13) In the generating model, the specification drives the work across the whole lifecycle instead of relying on the operator
- **Why it matters:** Vibe coding ties quality to the discipline of whoever drives, which you cannot staff around. Kiro makes the specification the source and the code its output. This fails differently from an alignment document: it is satisfied exactly, including the parts that were wrong.
- **Support level:** moderate
- **Supporting sources:**
  - [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40 — Al Harris, Amazon Kiro]] — vibe coding depends on the operator getting things right.
    - **Anchor:** `HY_JyxAZsiE` 00:01:40.320 → 00:01:43.600 · confidence: high
    - **Quote:** "vibe coding relies a lot on me as the operator getting things right."
  - [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40 — Al Harris, Amazon Kiro]] — Kiro shapes the specification around the whole SDLC.
    - **Anchor:** `HY_JyxAZsiE` 00:01:52.240 → 00:01:53.200 · confidence: high
    - **Quote:** "represent the holistic SDLC"
- **Caveats / counterevidence:** A heavy process also depends on the operator; it moves the dependency into the quality of the thinking that filled the template. Harris describes his own product.
- **Candidate chapters:** 3
- **Reusable phrasing:** An alignment document fails by going stale while everyone nods. A generating document fails by being satisfied exactly.

## 14) Research before planning onboards the agent; without it the agent invents what it does not know
- **Why it matters:** The agent does not know the system. Research produces a snapshot of the files and lines that bear on this problem, so the next context window starts informed. Generated on demand against the current tree, it has no time to drift from the code.
- **Support level:** moderate
- **Supporting sources:**
  - [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — Dex Horthy, HumanLayer]] — research, plan, implement; an agent that is not onboarded makes things up.
    - **Anchor:** `rmvDxxNubIg` 00:12:13.760 → 00:12:16.480 · confidence: high
    - **Quote:** "If you don't onboard your agents, they will make stuff up."
- **Caveats / counterevidence:** Single source. Horthy is sceptical of large standing documentation, because prose drifts from the code it describes.
- **Candidate chapters:** 4
- **Reusable phrasing:** Research is not documentation. It is a snapshot of the parts of the code that bear on this problem.

## 15) The size of a planned step is a context-window constraint, not a matter of taste
- **Why it matters:** The agent degrades as its context fills. A step should be small enough to finish, with its verification, inside the good part of the window. Subagents earn their place by controlling context, not by playing roles.
- **Support level:** moderate
- **Supporting sources:**
  - [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — Dex Horthy, HumanLayer]] — citing Geoffrey Huntley: more context used means worse outcomes.
    - **Anchor:** `rmvDxxNubIg` 00:05:52.080 → 00:05:54.800 · confidence: high
    - **Quote:** "the more you use the context window, the worse outcomes you'll get."
  - [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — Dex Horthy, HumanLayer]] — subagents are for controlling context.
    - **Anchor:** `rmvDxxNubIg` 00:06:45.360 → 00:06:48.319 · confidence: high
    - **Quote:** "are not for anthropomorphizing roles. They are for controlling context."
- **Caveats / counterevidence:** The "dumb zone" past about forty percent of the window varies with the task. The rule comes from Huntley through Horthy, one talk.
- **Candidate chapters:** 4, 5
- **Reusable phrasing:** A step should be small enough to finish inside the good part of a context window, with its verification, and no smaller.

## 16) Errors multiply upstream, so human review belongs on research and plans more than on diffs
- **Why it matters:** A bad plan line can become a hundred bad lines of code, and a research mistake sends the model the wrong way entirely. A team that reviews only the diff inspects the cheapest artifact after the costly mistakes are already in it. At high volume the plan is the surface a lead can hold in their head.
- **Support level:** moderate
- **Supporting sources:**
  - [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — Dex Horthy, HumanLayer]] — a bad line of code is one bad line; a bad plan or research step is many.
    - **Anchor:** `rmvDxxNubIg` 00:17:14.640 → 00:17:16.959 · confidence: high
    - **Quote:** "a bad line of code is a bad line of code"
- **Caveats / counterevidence:** The same process that shipped 35,000 lines in a Saturday also failed on the Parquet Java Hadoop removal. The method raises the ceiling on what you can attempt; it does not remove the chance of being wrong.
- **Candidate chapters:** 4, 10
- **Reusable phrasing:** A team reviewing only the diff inspects the cheapest artifact in the chain, after the expensive mistakes are amplified into it.

## 17) No plan, template or tool replaces thinking; the load-bearing human step is reading the plan before it runs
- **Why it matters:** AI amplifies whatever thinking was done, or not done. A directory of generated documents shows that generation happened, not that anyone decided anything, and it is more convincing than silence.
- **Support level:** moderate
- **Supporting sources:**
  - [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — Dex Horthy, HumanLayer]] — AI amplifies the thinking you have done or not done.
    - **Anchor:** `rmvDxxNubIg` 00:10:13.120 → 00:10:18.480 · confidence: high
    - **Quote:** "AI cannot replace thinking. It can only amplify the thinking you have done or the lack of thinking you have done."
  - [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — Dex Horthy, HumanLayer]] — a warning against tools that produce markdown to make you feel good.
    - **Anchor:** `rmvDxxNubIg` 00:17:41.760 → 00:17:45.280 · confidence: high
    - **Quote:** "Watch out for tools that just spew out a bunch of markdown files just to make you feel good."
  - [[089-rmvDxxNubIg-no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer|#89 — Dex Horthy, HumanLayer]] — no prompt or template removes the need to read.
    - **Anchor:** `rmvDxxNubIg` 00:18:54.160 → 00:18:55.760 · confidence: high
    - **Quote:** "There is no perfect prompt. There is no silver bullet."
- **Caveats / counterevidence:** Single source. Horthy does not prescribe a fixed amount of process; he offers a sliding scale and says you learn it by repetition.
- **Candidate chapters:** 4, 12
- **Reusable phrasing:** A directory of generated documents is evidence that generation happened. It is not evidence that anyone decided anything.

## 18) Isolation, not approval clicking, is what makes an unattended agent affordable
- **Why it matters:** Approving every action turns the engineer into a slow interpreter, so people switch approvals off and the agent gets the laptop's full reach. A sandbox bounds the worst case, so the agent can act freely inside it and supervision can drop.
- **Support level:** moderate
- **Supporting sources:**
  - [[1330-iH_wV8BbS24-sandboxes-aren-t-optional-4-ways-to-isolate-coding-agents-robert-brennan-openhands|#1330 — Robert Brennan, OpenHands]] — the choice between approving each action and skipping permissions, and why sandboxing resolves it.
    - **Anchor:** `iH_wV8BbS24` 00:04:00.120 → 00:04:01.120 · confidence: high
    - **Quote:** "babysit the agent while it works,"
  - [[1330-iH_wV8BbS24-sandboxes-aren-t-optional-4-ways-to-isolate-coding-agents-robert-brennan-openhands|#1330 — Robert Brennan, OpenHands]] — ephemeral CI runners as a ready-made sandbox with a secrets registry, which also lets agents run on schedules and events.
    - **Anchor:** `iH_wV8BbS24` 00:07:35.720 → 00:07:38.200 · confidence: high
    - **Quote:** "you can run as many GitHub Actions as you're willing to pay for."
- **Caveats / counterevidence:** Both quotes come from one talk by a vendor of an agent platform. Isolation bounds the damage; it does not make the agent's judgement any better.
- **Candidate chapters:** 05
- **Reusable phrasing:** Nobody gave the agent more judgement. They moved it somewhere its mistakes are cheap.

## 19) Work with a crisp spec and mechanical verification parallelises at scale now
- **Why it matters:** Tedious work at the scale of thousands of repositories never finished, so it was triaged, and the triage was the risk. A short, unambiguous change that each repository can verify on its own runs as thousands of parallel instances.
- **Support level:** moderate
- **Supporting sources:**
  - [[042-rcsliSIy_YU-automating-large-scale-refactors-with-parallel-agents-robert-brennan-openhands|#42 — Robert Brennan, OpenHands]] — a client remediates CVEs across thousands of repositories with parallel agents, one pull request per repo.
    - **Anchor:** `rcsliSIy_YU` 00:09:29.760 → 00:09:32.240 · confidence: high
    - **Quote:** "go through their entire codebase, figure out which of their repos are vulnerable,"
- **Caveats / counterevidence:** The chapter limits the claim itself: where the spec is contested, parallelism does not help. One vendor case study.
- **Candidate chapters:** 05
- **Reusable phrasing:** Where the spec is crisp and the check is mechanical, scale is available now. Where the spec is contested, nothing about parallelism helps.

## 20) Where a feature mostly orchestrates existing capability, instructions can replace the implementation
- **Why it matters:** Cursor deleted a full feature and replaced it with a skill built on two existing primitives. The specification stopped guiding execution and became the executable thing itself.
- **Support level:** moderate
- **Supporting sources:**
  - [[633-WE_Gnowy3uw-cursor-worktrees-deleting-12k-loc-code-with-200-loc-skills-david-gomes|#633 — David Gomes, Cursor]] — opening thesis that markdown is the new code.
    - **Anchor:** `WE_Gnowy3uw` 00:00:21.039 → 00:00:23.359 · confidence: high
    - **Quote:** "markdown is basically the new code."
  - [[633-WE_Gnowy3uw-cursor-worktrees-deleting-12k-loc-code-with-200-loc-skills-david-gomes|#633 — David Gomes, Cursor]] — what the deleted feature carried.
    - **Anchor:** `WE_Gnowy3uw` 00:00:43.440 → 00:00:46.079 · confidence: high
    - **Quote:** "a lot of code a lot of dependencies a lot of complexity and tests"
  - [[633-WE_Gnowy3uw-cursor-worktrees-deleting-12k-loc-code-with-200-loc-skills-david-gomes|#633 — David Gomes, Cursor]] — the size of the deletion pull request.
    - **Anchor:** `WE_Gnowy3uw` 00:04:33.520 → 00:04:35.360 · confidence: high
    - **Quote:** "around 15,000 lines of code deleted."
  - [[633-WE_Gnowy3uw-cursor-worktrees-deleting-12k-loc-code-with-200-loc-skills-david-gomes|#633 — David Gomes, Cursor]] — the replacement is close to, but not as good as, the original.
    - **Anchor:** `WE_Gnowy3uw` 00:04:39.919 → 00:04:41.520 · confidence: high
    - **Quote:** "almost as good as the previous one."
- **Caveats / counterevidence:** "Almost as good" means something was lost. The trade holds because the capability underneath was already built and tested; the markdown replaced the orchestration, not the substance. An instruction file has no type checker. The talk title says 12K lines; the spoken figure is about 15,000.
- **Candidate chapters:** 05, 03
- **Reusable phrasing:** If the code is mostly plumbing between things the agent can already do, the plumbing may be describable rather than buildable.

## 21) Parallel, asynchronous agents turn execution into a coordination problem for people
- **Why it matters:** One watched agent fits how engineers have always worked. Several background agents turn the work into dispatch, context-switching and judging returned results. A team running agents on one codebase also has to coordinate processes that do not talk to each other.
- **Support level:** strong
- **Supporting sources:**
  - [[182-X4BwOu0GWb8-your-coding-agent-just-got-cloned-and-your-brain-isn-t-ready-rustin-banks-google-jules|#182 — Rustin Banks, Google]] — Jules as a background agent you hand tasks to and collect from later.
    - **Anchor:** `X4BwOu0GWb8` 00:01:16.479 → 00:01:22.560 · confidence: high
    - **Quote:** "an asynchronous coding agent meant to run in the background and do all those tasks that you don't want to do"
  - [[996-OL7kfezynJM-multiplayer-agentic-engineering-arjun-singh-superconductor|#996 — Arjun Singh, Superconductor]] — current attention centres the agents.
    - **Anchor:** `OL7kfezynJM` 00:00:25.200 → 00:00:26.520 · confidence: high
    - **Quote:** "putting the agents at the center of everything."
  - [[996-OL7kfezynJM-multiplayer-agentic-engineering-arjun-singh-superconductor|#996 — Arjun Singh, Superconductor]] — reframes the problem around the whole team working with agents.
    - **Anchor:** `OL7kfezynJM` 00:00:16.240 → 00:00:20.680 · confidence: high
    - **Quote:** "multiplayer agentic engineering or how to enable your whole team and your best agents to work together."
- **Caveats / counterevidence:** Both speakers build products for this problem. The chapter separates two failure modes: a solo engineer managing attention, and a team managing a shared codebase. Neither talk measures how often the coordination fails.
- **Candidate chapters:** 05
- **Reusable phrasing:** Five agents running in the background is a management problem that arrives without the training that usually comes with one.

## 22) Agents make consequential errors often, and defects rise with AI code volume
- **Why it matters:** This rate sizes every other argument about verification. It is low enough that an unreviewed agent looks competent most of the time, and high enough that it will ship something bad this month. Generation got cheap, defects per unit did not fall to zero, so the constraint moved to catching them.
- **Support level:** strong
- **Supporting sources:**
  - [[1347-dYh7TQkuYFE-i-believe-everything-my-agents-tell-me-three-levels-of-review-corey-gallon-rexmore|#1347 — Corey Gallon, Rexmore]] — a review of his own sessions after over 107 billion tokens of agent use in a year.
    - **Anchor:** `dYh7TQkuYFE` 00:00:17.600 → 00:00:22.040 · confidence: high
    - **Quote:** "In about four in 10 sessions, an agent got something wrong that mattered."
  - [[210-TswQeKftnaw-ai-powered-entomology-lessons-from-millions-of-ai-code-reviews-tomas-reimers-graphite|#210 — Tomas Reimers, Graphite]] — a code-review company saw bugs grow with AI-written code.
    - **Anchor:** `TswQeKftnaw` 00:00:44.399 → 00:00:48.640 · confidence: high
    - **Quote:** "the amount of code being written by AI was going up and up and up, but so was the amount of bugs."
- **Caveats / counterevidence:** Gallon's figure is one practitioner's self-audit, not a controlled study. Reimers reports an observed trend, not a measured defect rate per line.
- **Candidate chapters:** 06, 01
- **Reusable phrasing:** Not four in ten lines. Four in ten sessions contained a consequential error.

## 23) An automated verifier is not neutral: it can be systematically generous
- **Why it matters:** On one web-agent benchmark the official judge scored a model at 74%, while a verifier aligned to human labels scored it around 38%. A generous judge reads as good news, and good news is rarely audited. When a verifier shares lineage or framing with what it judges, its errors correlate and confirm rather than cancel.
- **Support level:** moderate
- **Supporting sources:**
  - [[1250-xLxhT2ZI7UM-your-llm-judge-is-a-confident-liar-building-better-verifiers-browserbase|#1250 — Browserbase]] — WebVoyager judge versus a human-aligned verifier on the same model and benchmark.
    - **Anchor:** `xLxhT2ZI7UM` 00:04:16.959 → 00:04:22.000 · confidence: high
    - **Quote:** "there's a huge gap between what the existing verifiers say and what is actually the ground truth."
- **Caveats / counterevidence:** One benchmark and one team. The human-aligned verifier is itself a model, so 38% is a better estimate of ground truth, not ground truth.
- **Candidate chapters:** 06
- **Reusable phrasing:** The judge did not shade the result. It nearly doubled it.

## 24) Independence has to be engineered with different models and different techniques
- **Why it matters:** The fix is not a better verifier but a differently wrong one, plus methods that fail for unrelated reasons. A type checker and a language model do not share blind spots, because they do not share a mechanism.
- **Support level:** moderate
- **Supporting sources:**
  - [[864-VrpEyglYgeU-in-the-land-of-ai-agents-the-verifiers-are-king-tariq-shaukat-sonar|#864 — Tariq Shaukat, Sonar]] — names the design principle.
    - **Anchor:** `VrpEyglYgeU` 00:11:30.480 → 00:11:32.480 · confidence: high
    - **Quote:** "zero trust multi-layered verification."
  - [[864-VrpEyglYgeU-in-the-land-of-ai-agents-the-verifiers-are-king-tariq-shaukat-sonar|#864 — Tariq Shaukat, Sonar]] — the reasoning: every model has biases, so mix models and techniques.
    - **Anchor:** `VrpEyglYgeU` 00:11:34.800 → 00:11:45.760 · confidence: high
    - **Quote:** "Every model has biases. Every model produces has a character has a personality. So, let's make sure we use different models and different techniques to make sure your code is safe, to make sure it's reliable, to make sure it's secure."
- **Caveats / counterevidence:** Sonar sells verification, so the speaker has an interest in the thesis. The same phrase appears in two other Sonar talks (#995, #1428), so it is a company line rather than independent agreement. The chapter also cites Uber's uReview for this point, but quotes no span from it.
- **Candidate chapters:** 06, 07
- **Reusable phrasing:** Not a better model: a differently wrong one, plus methods that fail for unrelated reasons.

## 25) Teams that build agent plumbing without CI rebuild it, and its typical failure is silent
- **Why it matters:** Agent builders rediscover regression testing, monitoring and contract testing in a fixed order. The detail in the middle is the point: a job that fails silently reports nothing, which is what it reports when everything is fine.
- **Support level:** moderate
- **Supporting sources:**
  - [[837-WLXxTaPagA8-every-solo-agent-builder-eventually-reinvents-a-worse-version-of-ci-cd-sumaiya-shrabony|#837 — Sumaiya Shrabony]] — testing output shape after a prompt or skill change is regression testing again.
    - **Anchor:** `WLXxTaPagA8` 00:02:14.800 → 00:02:17.880 · confidence: high
    - **Quote:** "Congratulations, you have reinvented regression testing."
  - [[837-WLXxTaPagA8-every-solo-agent-builder-eventually-reinvents-a-worse-version-of-ci-cd-sumaiya-shrabony|#837 — Sumaiya Shrabony]] — a scheduled task fails silently for a week, so alerts get built.
    - **Anchor:** `WLXxTaPagA8` 00:02:22.480 → 00:02:30.640 · confidence: high
    - **Quote:** "One day, it silently fails, but you haven't noticed for a week. So, you build alerts. You just reinvented CI monitoring."
- **Caveats / counterevidence:** The talk addresses solo builders. Teams that already run mature CI may skip the reinvention, though not the silent-failure risk.
- **Candidate chapters:** 07
- **Reusable phrasing:** The job did not crash. It reported nothing, which is what it reports when everything is fine.

## 26) A language model removes the determinism that classic test practice rested on
- **Why it matters:** Zed had no flaky tests because the system was deterministic, not only because of discipline. A model removes that foundation, so gates must move to distributions and thresholds, and somebody must decide the acceptable range.
- **Support level:** moderate
- **Supporting sources:**
  - [[334-WXy8Yy9xGss-ci-in-the-era-of-ai-from-unit-tests-to-stochastic-evals-nathan-sobo-zed|#334 — Nathan Sobo, Zed]] — Zed's testing culture before AI features.
    - **Anchor:** `WXy8Yy9xGss` 00:02:06.479 → 00:02:08.160 · confidence: high
    - **Quote:** "very hardcore about testing and being empirical"
  - [[334-WXy8Yy9xGss-ci-in-the-era-of-ai-from-unit-tests-to-stochastic-evals-nathan-sobo-zed|#334 — Nathan Sobo, Zed]] — the result of that culture.
    - **Anchor:** `WXy8Yy9xGss` 00:02:21.280 → 00:02:22.720 · confidence: high
    - **Quote:** "never have flaky tests on CI."
  - [[334-WXy8Yy9xGss-ci-in-the-era-of-ai-from-unit-tests-to-stochastic-evals-nathan-sobo-zed|#334 — Nathan Sobo, Zed]] — what a model does to it.
    - **Anchor:** `WXy8Yy9xGss` 00:02:24.319 → 00:02:27.520 · confidence: high
    - **Quote:** "as soon as an LLM enters the picture, that's all out the window,"
- **Caveats / counterevidence:** One team's experience. The move to distributions and thresholds is the chapter's synthesis, not a quoted recommendation.
- **Candidate chapters:** 07
- **Reusable phrasing:** The gate stops asking whether this produced the right answer and starts asking whether it is still within the range we decided was acceptable.

## 27) AI-scale commit volume creates new CI bottlenecks, and the easy fixes weaken the gate
- **Why it matters:** A suite that is a small tax at thirty commits a day is a hard ceiling at three hundred. Running fewer checks, sampling, or merging before the suite finishes each converts a gate into a report.
- **Support level:** moderate
- **Supporting sources:**
  - [[1356-7b9tov5Uc5s-rebuilding-ci-for-ai-scale-commit-volume-gautam-korlam-sonar|#1356 — Gautam Korlam, Sonar]] — frames CI for AI-scale commit volume as a new bottleneck in software factories.
    - **Anchor:** `7b9tov5Uc5s` 00:00:20.000 → 00:00:21.680 · confidence: high
    - **Quote:** "new bottlenecks we're seeing in software factories"
- **Caveats / counterevidence:** The quote names the bottleneck only. The arithmetic and the claim that cost-driven fixes degrade gates are the chapter's own argument, not the speaker's.
- **Candidate chapters:** 07
- **Reusable phrasing:** No one decides to stop gates from failing. Sensible optimisations pile up until the pipeline is fast and green and nobody can say what it last caught.

## 28) A pipeline stage on an implicit trigger can fail with no signal, so merged is not live
- **Why it matters:** In this repository, 30 consecutive bot stats commits triggered no deployment while every run reported success, because a push with the default automation token starts no workflow. Every gate asked about the commit; none asked whether it reached production. The fix was an explicit dispatch, not a better check.
- **Support level:** moderate
- **Supporting sources:** No talk. The claim rests on the Lab incident in the Artifact anchors below.
- **Artifact anchors:**

**Artifact anchor:**
- kind: commit
- ref: 2de004f
- date: 2026-11-16
- excerpt: 0 of the last 30 bot stats commits ever deployed

**Artifact anchor:**
- kind: commit
- ref: 2de004f
- date: 2026-11-16
- excerpt: run: gh workflow run website-deploy.yml --ref main

**Artifact anchor:**
- kind: run
- ref: 43779369138
- date: 2026-11-16
- excerpt: * [new ref]         504e5ac11c0dfa3aff8cc11934d58558699be940 -> origin/main
- **Caveats / counterevidence:** The capture cannot separate two causes: every bot commit was pushed with the default token and also carried the skip-CI marker. The data proves the outcome (0 of 30, and 0 of 179), not which cause did the work. After the fix, 2 of 2 bot commits deployed; two is a small sample.
- **Candidate chapters:** 08
- **Reusable phrasing:** An absence is not an event. A stage that depends on an implicit trigger can stop working without producing an error.

## 29) Release cadence is a systems property, not courage
- **Why it matters:** Moving from monthly to weekly releases removes the slack that used to absorb mistakes. Anything a human caught during a long stabilisation window now needs a mechanism.
- **Support level:** moderate
- **Supporting sources:**
  - [[1227-I2LL_wd89-A-how-vs-code-went-from-monthly-to-weekly-releases-with-ai-harald-kirschner|#1227 — Harald Kirschner, VS Code]] — VS Code's move to a weekly release cycle.
    - **Anchor:** `I2LL_wd89-A` 00:00:30.960 → 00:00:34.640 · confidence: high
    - **Quote:** "from a monthly release to a weekly release cycle thanks to AI."
  - [[1227-I2LL_wd89-A-how-vs-code-went-from-monthly-to-weekly-releases-with-ai-harald-kirschner|#1227 — Harald Kirschner, VS Code]] — the talk is about the systems behind the change, not speed alone.
    - **Anchor:** `I2LL_wd89-A` 00:00:35.680 → 00:00:42.879 · confidence: high
    - **Quote:** "the things we learned, the systems that made this work, not just to ship faster, but actually to ship more effectively."
- **Caveats / counterevidence:** One product team. The claim that faster cadence removes slack is the chapter's reasoning, not a figure from the talk.
- **Candidate chapters:** 08
- **Reusable phrasing:** Shipping more often is usually discussed as courage. It is mostly plumbing.

## 30) A credential an agent can reach is the real environment boundary
- **Why it matters:** An agent asked to fix a staging credential found a valid production token in an unrelated file and used it. Nothing malfunctioned: the boundary was a convention, not a control. An agent that reads every file turns latent exposure into live exposure.
- **Support level:** moderate
- **Supporting sources:**
  - [[1514-JxNCuXkSWyQ-a-valid-key-let-an-ai-agent-delete-production-sagar-batchu-speakeasy|#1514 — Sagar Batchu, Speakeasy]] — a widely reported incident that began as a routine staging fix.
    - **Anchor:** `JxNCuXkSWyQ` 00:01:46.480 → 00:01:48.840 · confidence: high
    - **Quote:** "a pretty ordinary request, ordinary afternoon."
- **Caveats / counterevidence:** The anchored quote sets the scene only. The token, its scope and the outcome come from the chapter's retelling of the talk, and the incident is second-hand for the speaker.
- **Candidate chapters:** 08, 05
- **Reusable phrasing:** A credential reachable from a development workspace is a production credential in a development workspace.

## 31) In a codebase too large for any context window, agents work on slices, and generation at volume erodes the system's coherence
- **Why it matters:** Each slice is locally reasonable, so no per-change review sees the damage. Standards diverge and code is duplicated because the agent cannot see what already exists. Coherence is what made the system comprehensible, and drift is the default.
- **Support level:** moderate
- **Supporting sources:**
  - [[1237-Bdrs3uAX0_M-ai-coding-agents-are-breaking-big-codebases-dan-adler-sourcegraph|#1237 — Dan Adler, Sourcegraph]] — the codebases that run the world are decaying.
    - **Anchor:** `Bdrs3uAX0_M` 00:03:00.800 → 00:03:03.120 · confidence: high
    - **Quote:** "that keep the world running are beginning to decay."
    - **Currency checked (2026-11-23):** still current. Swept the 261 talks ingested after #1237 for legacy, mainframe or COBOL near decay / rot / aging / retiring / shortage: 0 hits, so nothing newer either supports or contradicts it.
  - [[1237-Bdrs3uAX0_M-ai-coding-agents-are-breaking-big-codebases-dan-adler-sourcegraph|#1237 — Dan Adler, Sourcegraph]] — such codebases cannot fit in a context window or be cloned and searched in real time.
    - **Anchor:** `Bdrs3uAX0_M` 00:03:08.640 → 00:03:14.000 · confidence: high
    - **Quote:** "way too much to fit into a context window or even just to clone and GP in real time. That's just not possible."
  - [[1237-Bdrs3uAX0_M-ai-coding-agents-are-breaking-big-codebases-dan-adler-sourcegraph|#1237 — Dan Adler, Sourcegraph]] — many agents apply different standards in different places.
    - **Anchor:** `Bdrs3uAX0_M` 00:03:21.760 → 00:03:25.840 · confidence: high
    - **Quote:** "different coding standards being applied in different places by different agents across the codebase."
- **Caveats / counterevidence:** One talk, from a vendor that sells code search. The chapter's inference that coherence loss is invisible to local review is its own argument, not the speaker's measurement.
- **Candidate chapters:** 9, 10, 11
- **Reusable phrasing:** Each change is fine. The system is not. Generation at volume against code nobody can hold in view produces drift by default.

## 32) Legacy code repels the people who must change it, and cheap generation makes a rewrite look easier than it is
- **Why it matters:** Generation speed solves the easy half of a rewrite. The hard half, the undocumented knowledge in the old system, stays untouched, while the whole project looks tractable. So the question before a refactor stays open.
- **Support level:** moderate
- **Supporting sources:**
  - [[991-7vn4WpqNpck-benchmarking-coding-agents-on-new-vs-legacy-codebases-denys-linkov-wisedocs|#991 — Denys Linkov, Wisedocs]] — across more than ten legacy repos, nobody wants to touch the code.
    - **Anchor:** `7vn4WpqNpck` 00:00:37.880 → 00:00:43.400 · confidence: high
    - **Quote:** "because it's a legacy code base, or actually more than 10 repos, nobody actually wants to touch the code. It's not a fun experience."
  - [[991-7vn4WpqNpck-benchmarking-coding-agents-on-new-vs-legacy-codebases-denys-linkov-wisedocs|#991 — Denys Linkov, Wisedocs]] — he frames a six-month refactor around whether it is the right move.
    - **Anchor:** `7vn4WpqNpck` 00:00:52.080 → 00:00:52.880 · confidence: high
    - **Quote:** "Is this the right move to do?"
- **Caveats / counterevidence:** The talk reports one team's refactor. The claim that rewrites fail on lost knowledge is the chapter's synthesis, not Linkov's finding.
- **Candidate chapters:** 9
- **Reusable phrasing:** Cheap generation makes the easy half of a rewrite fast. The hard half is the knowledge nobody wrote down.

## 33) A brownfield specification must be recovered as a derived artifact, generated from the system as it is
- **Why it matters:** A hand-written description decays from the moment it is written. A map generated from the running system is wrong only until the next run. That distinction is the discipline of brownfield specification.
- **Support level:** moderate
- **Supporting sources:**
  - [[1276-k2ClBT4aqAg-we-mapped-115-microservices-for-our-coding-agents-kamalakannan-nandagopal-postman|#1276 — Kamalakannan Nandagopal, Postman]] — every endpoint mapped to the line of code that implements it.
    - **Anchor:** `k2ClBT4aqAg` 00:04:57.880 → 00:05:00.040 · confidence: high
    - **Quote:** "right down to the exact line of code where it was implemented."
  - [[1276-k2ClBT4aqAg-we-mapped-115-microservices-for-our-coding-agents-kamalakannan-nandagopal-postman|#1276 — Kamalakannan Nandagopal, Postman]] — data flow mapped through the whole stack.
    - **Anchor:** `k2ClBT4aqAg` 00:05:10.880 → 00:05:14.160 · confidence: high
    - **Quote:** "all the way down across the stack, including databases and caches,"
- **Caveats / counterevidence:** Somebody has to build the generator and keep it working. A map says what the system does, not which behaviours are load-bearing.
- **Candidate chapters:** 9
- **Reusable phrasing:** A hand-written description decays silently. A generated map is wrong only until the next run.

## 34) The scarce input in legacy change is subject-matter expertise, so the process should concentrate experts' attention rather than replace it
- **Why it matters:** It inverts the usual automation story. One operator drives the tools so the experts answer only what they alone can answer. Knowledge of which behaviours are load-bearing lives in people, and it leaves when they do.
- **Support level:** moderate
- **Supporting sources:**
  - [[1386-DouK81O8R3o-one-day-1-000-in-tokens-an-ai-war-room-for-legacy-code-ford-prior-geico|#1386 — Ford Prior, GEICO]] — the team built a shared war room for major legacy changes.
    - **Anchor:** `DouK81O8R3o` 00:04:39.280 → 00:04:41.720 · confidence: high
    - **Quote:** "a multiplayer AI-native war room."
  - [[1386-DouK81O8R3o-one-day-1-000-in-tokens-an-ai-war-room-for-legacy-code-ford-prior-geico|#1386 — Ford Prior, GEICO]] — one driver operates the tools for the assembled experts.
    - **Anchor:** `DouK81O8R3o` 00:04:47.960 → 00:04:51.200 · confidence: high
    - **Quote:** "a driver to wield these expensive AI tools,"
- **Caveats / counterevidence:** One team's format. The claim that the experts' attention is the scarce resource is the chapter's reading of the design. Lost intent has a deadline: nothing generated recovers it once the people leave.
- **Candidate chapters:** 9, 1
- **Reusable phrasing:** The map tells you what the system does. Only people can tell you which parts a customer depends on.

## 35) AI multiplied code output but barely moved releases, so the gap became a queue
- **Why it matters:** It is the measured form of the book's first argument: generation was never the binding constraint. Lines of code rose twenty-five-fold and releases rose by less than a third. The difference is inventory that ages in review and deployment.
- **Support level:** moderate
- **Supporting sources:**
  - [[1432-LQW_Wvqhp04-why-humans-can-t-keep-up-with-ai-written-code-tariq-shaukat-sonar|#1432 — Tariq Shaukat, Sonar]] — a study shows 2,450% more lines and 240% more commits, but 30% more releases.
    - **Anchor:** `LQW_Wvqhp04` 00:05:47.614 → 00:05:58.494 · confidence: high
    - **Quote:** "2,450% increase in lines of code, 240% increase in commits, but the same study showed only a 30% increase in releases."
    - **Currency checked (2026-11-23):** no newer figure. Swept the 66 talks ingested after #1432 for a percentage change in lines of code, commits or pull requests: 1 hit (#1627), about context-window size, not output. The figures stand as dated to the study the speaker cites.
  - [[1432-LQW_Wvqhp04-why-humans-can-t-keep-up-with-ai-written-code-tariq-shaukat-sonar|#1432 — Tariq Shaukat, Sonar]] — the industry has not learned to scale from producing to shipping.
    - **Anchor:** `LQW_Wvqhp04` 00:05:58.974 → 00:06:02.974 · confidence: high
    - **Quote:** "We haven't figured out how to scale from producing stuff to shipping stuff."
- **Caveats / counterevidence:** One study, reported by a vendor of code-quality tools. The talk does not name the study's sample. The split of the gap between review and deployment is the chapter's inference.
- **Candidate chapters:** 10, 1, 11
- **Reusable phrasing:** Twenty-five times the lines did not become twenty-five times the value. It became a queue.

## 36) Slop is generation outrunning judgement, so a better generator makes it worse
- **Why it matters:** It locates the problem in the ratio, not in code quality. Much slop is decent code that nobody formed a view on. The only treatments are to generate less or to raise judgement throughput.
- **Support level:** moderate
- **Supporting sources:**
  - [[1285-6qkzlT962es-generation-is-cheap-review-is-expensive-how-to-stop-shipping-ai-slop-gabriel-martinez-g2i|#1285 — Gabriel Martinez, G2i]] — defines slop as what happens when generation outruns judgement.
    - **Anchor:** `6qkzlT962es` 00:00:41.200 → 00:00:43.680 · confidence: medium
    - **Quote:** "Slop is what happens when judgment when generation"
- **Caveats / counterevidence:** The transcript garbles the line, so the anchor is medium confidence. The definition is the speaker's framing, not a measurement. The corollary that better models worsen the ratio is the chapter's.
- **Candidate chapters:** 10
- **Reusable phrasing:** Slop is not bad code. It is code nobody decided should exist.

## 37) "Human in the loop" does not scale, and at high volume it becomes a label for unsupervised output
- **Why it matters:** The phrase turns an unsolved capacity problem into a policy that sounds solved. At 30,000 changes a day the human gets seconds per change. A reviewer who cannot refuse is not a reviewer.
- **Support level:** moderate
- **Supporting sources:**
  - [[1432-LQW_Wvqhp04-why-humans-can-t-keep-up-with-ai-written-code-tariq-shaukat-sonar|#1432 — Tariq Shaukat, Sonar]] — the usual governance answer, humans in the loop, does not scale.
    - **Anchor:** `LQW_Wvqhp04` 00:05:30.974 → 00:05:32.014 · confidence: high
    - **Quote:** "human in the loop doesn't scale."
- **Caveats / counterevidence:** One speaker, whose company sells automated review. Automated review is necessary but not sufficient: it covers correctness, not coherence or the team's shared understanding.
- **Candidate chapters:** 10, 6, 12
- **Reusable phrasing:** A human in the loop for a few seconds per change is the same attention spread thinner and relabelled as control.

## 38) A software factory, properly meant, removes the human from the loop, and engineering shifts toward designing the production line
- **Why it matters:** It separates two futures that get conflated. Amplification keeps an engineer present and directing many agents. A factory runs with nobody watching, and the human designs the process. If so, process design gains value and writing the change yourself loses it.
- **Support level:** strong
- **Supporting sources:**
  - [[704-5Sui_OnSRlY-the-missing-primitive-for-agent-swarms-lou-bichard-ona|#704 — Lou Bichard, Ona]] — defines the factory as incrementally moving the human out of the SDLC loop.
    - **Anchor:** `5Sui_OnSRlY` 00:01:18.480 → 00:01:26.520 · confidence: high
    - **Quote:** "the commitment to incrementally moving the human out of the loop within the SDLC. Such that the human is not proactively interacting with a computer."
  - [[704-5Sui_OnSRlY-the-missing-primitive-for-agent-swarms-lou-bichard-ona|#704 — Lou Bichard, Ona]] — rejects the definition of a factory as one engineer running many agents.
    - **Anchor:** `5Sui_OnSRlY` 00:01:32.760 → 00:01:35.120 · confidence: high
    - **Quote:** "one individual IC running lots of coding agents at the same time."
  - [[1210-tUPPVhBBcoM-software-engineering-is-becoming-factory-engineering-zach-lloyd-warp|#1210 — Zach Lloyd, Warp]] — predicts software engineering becomes factory engineering.
    - **Anchor:** `tUPPVhBBcoM` 00:01:36.880 → 00:01:42.920 · confidence: high
    - **Quote:** "the discipline of software engineering is going to become something more like factory engineering."
- **Caveats / counterevidence:** Both speakers build products for this future. The metaphor leaks: a factory makes the same thing repeatedly, and software rarely does. The factory fits repetitive, well-specified work, such as CVE remediation, and is oversold as a general theory.
- **Candidate chapters:** 11, 5, 12
- **Reusable phrasing:** Parallel agents are amplification. A factory is absence. The human designs the line instead of working on it.

## 39) The lights-off factory narrative rests on true premises, but its failures already show: outages and decaying codebases
- **Why it matters:** The narrative is persuasive because each clause is defensible. The failures match the book's mechanics: removing the human removes the last check that notices something is wrong, and volume without a view of the whole erodes coherence. Good harness machinery does not supply judgement.
- **Support level:** moderate
- **Supporting sources:**
  - [[923-Ib5GBkD555M-harness-engineering-is-not-enough-why-software-factories-fail-dex-horthy-humanlayer|#923 — Dex Horthy, HumanLayer]] — states the prevailing narrative he argues against.
    - **Anchor:** `Ib5GBkD555M` 00:01:10.880 → 00:01:21.200 · confidence: high
    - **Quote:** "the prevailing narrative is we should just spend more tokens. You are the bottleneck. The models are good enough. Code is free. just ship more stuff."
  - [[923-Ib5GBkD555M-harness-engineering-is-not-enough-why-software-factories-fail-dex-horthy-humanlayer|#923 — Dex Horthy, HumanLayer]] — says the cracks are starting to show.
    - **Anchor:** `Ib5GBkD555M` 00:01:23.680 → 00:01:25.200 · confidence: high
    - **Quote:** "we are starting to see the cracks."
    - **Currency checked (2026-11-23):** still current. Swept the 561 talks ingested after #923 for software or dark factories near fail / crack / broke / doesn't work / struggle: 4 hits. Three (#1044, #1208, #1632) agree that factories are not working yet; #1644 is about improving a factory definition. None reports the problem solved.
  - [[923-Ib5GBkD555M-harness-engineering-is-not-enough-why-software-factories-fail-dex-horthy-humanlayer|#923 — Dex Horthy, HumanLayer]] — companies have outages caused by coding agents.
    - **Anchor:** `Ib5GBkD555M` 00:01:33.600 → 00:01:35.759 · confidence: high
    - **Quote:** "are having outages due to coding agent mishaps."
  - [[923-Ib5GBkD555M-harness-engineering-is-not-enough-why-software-factories-fail-dex-horthy-humanlayer|#923 — Dex Horthy, HumanLayer]] — codebases decay faster than ever.
    - **Anchor:** `Ib5GBkD555M` 00:01:37.360 → 00:01:40.400 · confidence: high
    - **Quote:** "code bases are falling apart faster than they ever have before."
- **Caveats / counterevidence:** One speaker, reporting anecdotes, not a count of incidents. The link from each failure to a mechanism in Chapters 8 and 9 is the book's explanation, not Horthy's.
- **Candidate chapters:** 11, 8, 9
- **Reusable phrasing:** Excellent machinery with unexamined intent produces more of the wrong thing, faster.

## 40) Throughput metrics such as PR counts can disguise whether a factory works, so measure outcomes
- **Why it matters:** A factory measured on lines or PRs always looks like a triumph. Measured on releases or value, the same factory can be an expensive way to grow a queue. The proxy is easier to collect and always looks better.
- **Support level:** moderate
- **Supporting sources:**
  - [[1206-HvboD89DyQ8-no-that-s-not-a-software-factory-ryan-cooke-workos|#1206 — Ryan Cooke, WorkOS]] — output numbers can disguise how well these systems work.
    - **Anchor:** `HvboD89DyQ8` 00:01:54.040 → 00:01:57.640 · confidence: high
    - **Quote:** "can actually disguise how well these systems are working."
  - [[1206-HvboD89DyQ8-no-that-s-not-a-software-factory-ryan-cooke-workos|#1206 — Ryan Cooke, WorkOS]] — PR percentages and counts may mislead.
    - **Anchor:** `HvboD89DyQ8` 00:02:02.280 → 00:02:04.000 · confidence: high
    - **Quote:** "may be lying in overall increase in PRs."
  - [[1206-HvboD89DyQ8-no-that-s-not-a-software-factory-ryan-cooke-workos|#1206 — Ryan Cooke, WorkOS]] — output is hard to tie to outcomes.
    - **Anchor:** `HvboD89DyQ8` 00:02:04.760 → 00:02:11.120 · confidence: high
    - **Quote:** "It's very hard to distinguish whether the output is actually driving outcomes."
- **Caveats / counterevidence:** Measuring outcomes has a cost: the speaker says it needs dedicated full-time teams. The talk argues the point; it does not report outcome data.
- **Candidate chapters:** 11, 10
- **Reusable phrasing:** Throughput moves whether or not anything improves. Instrument the number that embarrasses you.

## 41) Process trades optionality for predictability, and whether to pay depends on the work and on the cost of being wrong
- **Why it matters:** Every framing of the trade-off names the same choice from a different angle, and none resolves it in general. So the question is never "process or not", but whether this change is worth the price.
- **Support level:** weak
- **Supporting sources:**
  - [[711-t4359sKBu4w-bounded-autonomy-between-free-will-and-determinism-angus-j-mclean-oliver|#711 — Angus J. McLean, Oliver]] — frames agent autonomy as a bounded space between free will and determinism.
    - **Anchor:** `t4359sKBu4w` 00:00:23.080 → 00:00:23.880 · confidence: high
    - **Quote:** "between free will and determinism"
- **Caveats / counterevidence:** The quote is the talk's own title phrase, so it frames the trade-off rather than argues it. The claim that the answer turns on reversibility and cost of error is the chapter's.
- **Candidate chapters:** 12
- **Reusable phrasing:** A process buys predictability with optionality. The only question is whether this change is worth the price.

## 42) Across two measured changes in this repository, added process did not change the outcome; it changed the cost
- **Why it matters:** Process advocacy is mostly unmeasured. The Lab ran the counterfactual twice, with a control arm, Pocock's skills and superpowers on the same prompt. Chapter 12's answer to "how much process" rests on this, not on vendor claims.
- **Support level:** moderate
- **Supporting sources:** the Lab's two bake-off rounds (repo artifacts, below).
- **Artifact anchors:**

**Artifact anchor:**
- kind: file
- ref: research_passes/2026-11-16-sdd-bakeoff-results.md
- date: 2026-11-16
- excerpt: Artifacts-before-code was **zero** for all three arms.

**Artifact anchor:**
- kind: file
- ref: research_passes/2026-11-16-sdd-bakeoff-round2-results.md
- date: 2026-11-16
- excerpt: **+30% tokens and +50% wall time** over the Pocock arm, for an identical

- **Caveats / counterevidence:** n = 2, one repo, one model. Both changes were repairs with a known right answer, not greenfield design. Spec Kit, OpenSpec and Elephant-Goldfish were not run, so nothing here judges them. The control arm is a capable model with strong defaults, not "no discipline".
- **Candidate chapters:** 12
- **Reusable phrasing:** Adding process did not change the result. It changed the cost, and what it bought showed up in verification, not in the scorecard.
