---
video_id: Sir59K8ZDPU
playlist_index: 916
title: "Why Agentic Systems Need Ontologies — Frank Coyle, UC Berkeley"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Sir59K8ZDPU"
duration: "21:18"
duration_seconds: 1278
view_count: 65000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Sir59K8ZDPU.txt"
themes:
  - "Agent Architecture"
  - "RAG & Retrieval"
ingested_at: 2026-07-26T22:22:02+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Frank Coyle, a UC Berkeley educator with 30 to 35 years in computer science, argues that agent loops need a symbolic check. LLMs are probabilistic by nature, so he pairs them with ontologies (entities, relationships and properties, after Gruber's 'formal specification of a shared conceptualization') in a neuro-symbolic design. RDFS domain and range rules and OWL transitive, functional and disjoint properties let a reasoner infer facts and reject bad tool results, such as a second refund on one order or a payout sent to the support desk. His rule: Pydantic at the door, ontology at the ledger, and side-effect-free agents."
---

# Why Agentic Systems Need Ontologies — Frank Coyle, UC Berkeley

## Summary
Frank Coyle teaches at UC Berkeley and has worked in computer science for 30 to 35 years, after an early career in neuroscience. He opens with his teaching motto, from Sister Corita Kent via John Cage: "There's no fail. There's only make." His thesis: agents and ontologies come from two old lineages that now converge, and the symbolic side can keep probabilistic LLMs "on its guardrails."

**Two lineages**
Agents go back to the 1956 founding of AI, McCarthy, Selfridge and Minsky's Society of Mind: things that perceive, decide and act. Ontologies go back to Aristotle's categories of being, later formalized by Quine and by Gruber in 1993 as "a formal specification of a shared conceptualization." That is what we want to hand our agents: our conceptualization of our domains. Combining the two is neuro-symbolic AI. He treats hallucination as a feature of LLMs, not a bug, which is exactly why they need a symbolic check.

**What an ontology is and how to build one**
An ontology is entities, relationships between them, and properties: a graph. Graph databases arose because relational tables were too rigid; adding a property or relationship does not force a schema rebuild. You can build top-down (experts model purchase orders, customers and representatives, as in 1980s expert systems, which failed to scale and led to an AI winter) or bottom-up from data such as customer interactions. Reuse existing vocabularies: schema.org, FOAF for social networks, Dublin Core for papers and books, and DBpedia behind Wikipedia.

**Inference that sits beside the graph**
- RDFS domain and range: if "teaches" has domain teacher and range student, then "Bob teaches Scooter" implies Bob is a teacher (and a person) and Scooter is a student.
- OWL transitive properties: ancestor-of chains yield new facts.
- OWL functional properties: "has father" allows only one value, so two names for Jim's father must be the same individual.
These rules are not stored in the graph; they sit "on the side" as derivations and constraints.

**Loops need checks**
Böhm and Jacopini showed in 1966 that sequence, conditionals and loops make a language Turing complete. Agents now have loops, which completes that set, but loops can run forever, drift as agents talk to each other, and burn tokens. He walks through a Python `while True` loop for a Claude agent: the LLM cannot act, it only proposes tool parameters; when the stop reason is tool use, your code runs the tool. The ontology belongs right after the tool runs: a validator checks the result against domain rules, and if it fails, the loop goes back to the LLM or to a human.

His slogan: "Pydantic at the door, ontology at the ledger." Pydantic types the inputs; the ontology checks the results. Agents should have no side effects until the ontology approves. Examples of errors OWL catches that English prompts struggle with: a second refund on the same order (functional property), a payout sent to the support desk instead of the buyer (customer and support rep as disjoint classes), and a made-up status like "probably shipped" when only paid, shipped or refunded is allowed.

## Why it matters
- "Pydantic at the door, ontology at the ledger" gives a clear two-layer validation pattern for tool-using agent loops.
- The refund, payout and status examples show concrete business errors that a symbolic reasoner catches deterministically where prompt instructions fail.
- It places the validator at a precise point in the loop: after the tool runs and before any side effect is committed.
- The reminder that existing vocabularies (schema.org, FOAF, Dublin Core) already exist lowers the cost of adopting ontologies for agent grounding.
- The expert-systems history frames neuro-symbolic agents as a return to symbolic AI, now with neural components that scale.

## Metadata
- Video: https://www.youtube.com/watch?v=Sir59K8ZDPU
- Duration: 21:18
- Playlist index: 916
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[RAG & Retrieval]]


## Transcript excerpt
> [music] >> Um, okay, we're going to launch here. So, my name is Frank Coyle. Um, I'm I'm an educator and teaching at Berkeley now. I've been doing this computer science stuff for oh, 30, 35 years. And um >> [snorts] >> I'm intro and right now it's kind of a critical time for uh poor computer science students. Used to be the used to be the only game in town. Degree was a guaranteed job, and now thanks to AI, it's not. But then again, 5,000 people are here. So, AI and and agents are um seem to be the way to go. So, the question is how do we leverage this new universe that we are moving quickly into. And so, I want to talk about how agents and ontologies will big word fit together. But before...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Sir59K8ZDPU.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **RAG & Retrieval**.

