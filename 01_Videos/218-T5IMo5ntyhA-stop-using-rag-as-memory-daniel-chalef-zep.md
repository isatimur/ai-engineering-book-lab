---
video_id: "T5IMo5ntyhA"
playlist_index: 218
title: "Stop Using RAG as Memory — Daniel Chalef, Zep"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=T5IMo5ntyhA"
duration: "7:02"
duration_seconds: 422
view_count: 2098
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/T5IMo5ntyhA.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:44:28+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Daniel Chalef (Zep) argues in 7 minutes that semantic similarity is not business relevance — and that frameworks treating memory as a vector store of arbitrary facts will always produce irrelevant or polluted retrievals. The core problem: a media assistant that learns 'I wake up at 7am' and 'my dog's name is Melody' will retrieve 'Melody' when asked about favorite music because semantic similarity has no causal or relational understanding. The fix is domain-aware memory: define business entity types (financial goals, debts, income sources) in Pydantic/Zod schemas, register them with Zep's graph framework (Graphiti), and the memory system only stores and retrieves what is domain-relevant. Live demo: finance coach agent stores $5,000/month rent as a 'debt account' entity within seconds of it being mentioned."
---
# Stop Using RAG as Memory — Daniel Chalef, Zep

## Summary
Daniel Chalef (Zep) delivers a 7-minute focused argument: vectorstore-based memory is architecturally wrong for agents that need to remember things about users across sessions, and the solution is domain-modeled memory backed by a temporal knowledge graph.

### The Problem: Semantic Similarity is Not Business Relevance
The example that opens the talk: a media assistant agent designed to remember music preferences (jazz, NPR, The Daily). Because the agent is conversational, it also picks up: "I wake up at 7am", "my dog's name is Melody." These get stored as facts in the vector database alongside "I like jazz."

When the user later asks for favorite tunes, the retrieval returns semantically similar facts — and "Melody" comes back because a dog named Melody has semantic overlap with musical terms. The agent surfaces irrelevant or misleading context.

Chalef's diagnosis: "Semantic similarity is not business relevance." Vectors are projections into an embedding space with no causal or relational structure. There is nothing in the vector representation that encodes "this fact is about a dog, not music."

The same failure mode happens in ChatGPT: it generates and stores arbitrary facts about users, then struggles with retrieval relevance.

### The Fix: Domain-Aware Memory via Graphiti
Zep's open-source framework Graphiti is a temporal graph framework. The developer defines business entity types as schemas (Pydantic, Zod, or Go structs), registers them with Zep, and Zep builds an ontology-aware knowledge graph that only captures domain-relevant information.

Example from the finance coach demo:
- Entity types: `financial_goals`, `debts`, `income_sources` — with field-level descriptions and valid value constraints
- Agent tool: `get_financial_snapshot` — runs multiple Zep graph queries concurrently, filtering by specific node types
- When the user says "I have $5,000/month rent," Zep parses the message and stores a `debt_account` entity with the relevant fields — within seconds

The graph can be browsed visually (the Zep frontend shows entity nodes and edges). Because retrieval filters by node type, it returns only domain-relevant facts, not arbitrary biographical details.

### Technical Framing
Chalef had spoken earlier in the conference about Graphiti's custom entity and edge model: developers define business objects from their domain, Zep uses these to build the graph ontology. The implication is that "memory" is not a general-purpose system — it should be modeled against the specific information that matters for the agent's task domain.

Note: Zep also published a research paper covering the technical underpinnings, linked in the talk.

## Why it matters
- The semantic-similarity-vs-business-relevance argument exposes a fundamental mismatch that affects any agent using a vanilla vector store for long-term memory.
- Domain schema definitions (Pydantic/Zod) as the interface for memory configuration is an elegant approach — developers already know how to write schemas.
- The temporal graph model captures relational structure (debts relate to income, goals relate to debts) that flat fact stores cannot express.
- At 7 minutes, this is one of the most compact talks in the corpus — the argument is self-contained and directly applicable.

## Metadata
- Video: https://www.youtube.com/watch?v=T5IMo5ntyhA
- Duration: 7:02
- Playlist index: 218
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] I'm here today to tell you that there's no onesizefits all memory. Um, and why you need to model your memory after your business domain. So, if you saw me a little bit earlier and I was talking about Graffiti, Zep's open-source temporal graph framework...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/T5IMo5ntyhA.txt]]
- Description cue: RAG is great for static knowledge retrieval—but terrible at memory. Vectorstore-based systems sold as memory lack relational and temporal awareness, leading agents astray with outdated or...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
