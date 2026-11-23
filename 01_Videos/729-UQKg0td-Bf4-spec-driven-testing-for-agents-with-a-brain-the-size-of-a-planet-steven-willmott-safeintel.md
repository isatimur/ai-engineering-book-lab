---
video_id: UQKg0td-Bf4
playlist_index: 729
title: "Spec-Driven Testing for Agents With A Brain the Size of A Planet — Steven Willmott, SafeIntelligence"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=UQKg0td-Bf4"
duration: "13:03"
duration_seconds: 783
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/UQKg0td-Bf4.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
  - "Security & Guardrails"
ingested_at: 2026-06-04T14:10:13+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Steven Willmott, CEO of SafeIntelligence, argues that a smarter agent is not always a better or safer one: large models can decode jailbreaks hidden in poems, broad remits widen the attack surface, and big models cost more. Teams should specify what an agent must do, beyond an eval data set: ground-truth examples, business rules (no discount over 10%), ontologies, internal terms, domain knowledge, rights and roles, and robustness needs such as typos and rephrasing. Feed that spec into security and robustness testing, keep it independent of the agent platform, version it in a repo, and use it to close the loop."
---

# Spec-Driven Testing for Agents With A Brain the Size of A Planet — Steven Willmott, SafeIntelligence

## Summary
Steven Willmott is CEO of SafeIntelligence, a three-year-old company that started with formal verification of ML models. It checks whole regions of the input space of vision and tabular models to see whether predictions tip over under perturbation. For language models, where it has no access to the model, it instead generates edge cases and test cases. This talk is not about spec-driven development of code. It is about how to specify what an agent itself is supposed to do.

**Marvin's problem: bigger is not always better**
The title points to Marvin, the depressed robot with a brain the size of a planet in The Hitchhiker's Guide to the Galaxy. Willmott names three problems with very capable agents. Some jailbreaks work better on large models: a small model does not understand an instruction wrapped in a poem, while a large one extracts and executes it. A broad remit creates more surface area to exploit and to test. And large models are slow and costly for simple jobs. So the goal is an agent built on a model good enough to perform but not capable of arbitrary harm. Harm has two sides: how flexibly it accepts instructions, and which tools and tasks it can run in your infrastructure. An agent that can wire millions is riskier than one that answers questions.

**What goes into an agent spec**
In ML, a data set and a metric such as F1 usually define good behaviour. Willmott says that is not enough once you deploy. A spec should also capture:
- *Ground truth:* examples of what good looks like.
- *Rules:* for a support agent, "don't ever give a discount more than 10%", or no refunds after 30 days. Proving a rule is never broken is hard.
- *Ontologies and dictionaries:* for example, the destinations one airline actually flies to.
- *Internal terminology* that only your company uses, so the tester knows which substitutions are valid.
- *Domain knowledge:* gross profit and gross sales are different, though a general LLM may confuse them.
- *Rights and roles:* behaviour logged in versus logged out, or with different permissions.
- *Robustness requirements:* in vision, runway detection at sunset, in fog or with camera shake; for agents, how many typos or rephrasings break the result.

He links this to the agent card from the A2A spec and to prompt-management platforms that record why a test exists. Even an agent card skill does not tell you the valid range of variation, such as who a meeting may be booked for. In engineering terms, these tests look like integration tests, and the aim is to make implicit expectations explicit.

**How the spec is used**
SafeIntelligence feeds specs into two kinds of testing. Security: an agent is most vulnerable at the edges of the domains it is willing to talk about and has the most power on its own tasks, so the spec shows where to probe. Robustness: vary the inputs and measure how wide a range it still handles correctly.

**Recommendations**
Specify agent behaviour. Keep the spec independent of the implementation, because you may move from one agent platform to another and want to keep your integration, unit and penetration tests. Use the spec to close the loop: run the agent automatically, find robustness gaps and iterate, a "backyard type of RL" around the outside of the model. Willmott, who helped write the OpenAPI spec at his previous API-infrastructure company, wants these specs stored in a GitHub repo and heavily versioned.

## Why it matters
- The poem-wrapped jailbreak example is a concrete argument that larger models can widen, not shrink, the safety surface of an agent.
- The seven-part spec checklist (ground truth, rules, ontologies, internal terms, domain knowledge, roles, robustness) is a practical template for agent eval design beyond a test set.
- Using the agent's own spec to aim security tests at its domain edges and its most powerful tasks is a clear red-teaming heuristic.
- Keeping behaviour specs independent of the agent platform treats evals as durable, portable assets, like integration tests.
- Robustness requirements such as typo and rephrasing tolerance carry the perturbation thinking of vision-model validation over to language agents.

## Metadata
- Video: https://www.youtube.com/watch?v=UQKg0td-Bf4
- Duration: 13:03
- Playlist index: 729
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[Security & Guardrails]]


## Transcript excerpt
> [music] >> So nice to meet you. I'm I'm Steve. Um I'm the CEO of Safe Intelligence. We're a company we've been around for 3 years. Um we really go very very deep into ML um validation. Um and actually we use formal verification techniques on especially we started out on vision models, tabular data models, bunch of other types of models. Um where we actually have the model available and we look at whole regions of the input space and see whether or not the test points that are there actually tip over and do the wrong thing um uh under perturbations. So that's where the company started out. We have a whole bunch of products in that space. Um and uh actually yesterday we we released a new...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/UQKg0td-Bf4.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Security & Guardrails**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://uk.linkedin.com/in/stevenwillmott>
