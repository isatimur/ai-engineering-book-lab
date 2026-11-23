---
video_id: vJukHCIv7Ck
playlist_index: 841
title: "Stop AI Agent Hallucinations: 5 Techniques + Production Patterns - Elizabeth Fuentes, AWS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=vJukHCIv7Ck"
duration: "55:19"
duration_seconds: 3319
view_count: 3500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/vJukHCIv7Ck.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Elizabeth Fuentes, AWS developer advocate, demos five anti-hallucination techniques that are code changes, not prompt changes, on a Strands travel agent: semantic tool selection (29 tools, about 3,000 tokens of schemas, cut to the top three tools), GraphRAG with Neo4j Cypher queries for counts and aggregates, an executor-validator-critic swarm that catches fabricated success, neuro-symbolic hooks that enforce rules like a 10-guest limit in Python, and runtime steering that lets the agent self-correct. Her thesis: prompts are suggestions; only code enforces logic."
---

# Stop AI Agent Hallucinations: 5 Techniques + Production Patterns - Elizabeth Fuentes, AWS

## Summary
Elizabeth Fuentes Leon, a developer advocate at AWS focused on agentic applications, presents five techniques that reduce agent hallucinations and token waste. Each one is "a code change, not a prompt change." She shows every technique with and without the fix, in Jupyter notebooks, on a travel agent with dummy tools built with Strands Agents, the open-source framework AWS maintains. The model in the demos is OpenAI.

**1. Semantic tool selection**
The agent has 29 tools. Each tool schema costs up to about 200 tokens, so every call carries about 3,000 tokens of tool descriptions before the user's message. She embeds the tool descriptions locally with a sentence-transformer model, retrieves the top three tools per query, and drops usage to fewer than 300 tool tokens. A ground-truth set of 90 queries measures accuracy. With memory, tools pile up in the conversation history, so she swaps tools in and out of the tool registry on each turn of the agent loop. In production, the AgentCore Gateway builds the tool index and routing for you.

**2. GraphRAG for exact answers**
Vector RAG works for open questions but fails on aggregation, counts and multi-hop questions. Vector search always returns something, and the model sees only the top chunks, so "it estimates" and presents the estimate as fact. She builds a knowledge graph from plain text with the Neo4j library, and the model writes Cypher queries that compute the answer over the full data set. For the question about hotels in Antarctica, plain RAG gives a long, vague reply. The graph agent gets zero rows and gives an honest no.

**3. Multi-agent validation**
A single agent that gets a tool error can rationalize it and report success. A Strands swarm chains an executor, a validator and a critic. When asked to book a hotel that does not exist, the executor gets the error, the validator catches it, the critic rejects it, and the user sees a clear failure instead of a fabricated confirmation.

**4. Neuro-symbolic guardians**
A rule such as a maximum of 10 guests per booking, written in the prompt or tool description, still gets ignored, because prompts are "suggestions, not constraints." She puts the rules in Python and attaches them to a hook that runs before each tool call, cancelling calls that break rules: valid dates, guest limits, payment before confirmation, no cancellation within 48 hours of check-in. Same model, tools and prompt, but different outcomes. AgentCore policies apply the same idea as a managed service.

**5. Runtime steering**
Hooks are all or nothing. For soft rules she uses an open-source agent control library. Rules live on a local server and the agent picks them up through an API, with no redeploy. In the demo, a booking for more guests than one room allows is split into two rooms, and the task completes. Her rule of thumb: hooks for hard constraints, steering for soft rules.

**Production path**
Bedrock AgentCore supplies the runtime, gateway, short- and long-term memory and CloudWatch observability. Tools run as Lambda functions, steering rules live in DynamoDB and go live on the next call, and Neo4j Aura DB can host the graph. The repo includes notebooks, apps and CDK deployment.

## Why it matters
- It names five failure modes (tool-schema bloat, sampled answers to counting questions, fabricated success, ignored prompt rules, hard stops) and pairs each with a code-level fix. That gives a clean taxonomy for a reliability chapter.
- The token arithmetic (about 3,000 tokens of tool schemas per call, cut to under 300) is a concrete cost argument for retrieval over tool definitions.
- The RAG versus GraphRAG demo shows why similarity search cannot answer aggregate questions, and why a computed query result can be checked when a guess cannot.
- The split between blocking hooks for hard constraints and server-side steering for soft rules is a useful design rule for guardrails that do not frustrate users.

## Metadata
- Video: https://www.youtube.com/watch?v=vJukHCIv7Ck
- Duration: 55:19
- Playlist index: 841
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi, today we are going to talk about how to stop AI agent hallucinations with five techniques beyond the prompt. Each one is a code change, not a prompt change. Let's see. Every time your AI agent responds, you are paying for the words going in and the words coming out. And your bill, you will see those calling tokens. Yeah. And the more tokens you are sending, the more you pay. And if what you send is not quite right, too much, or missing something important, your AI agent start to hallucinate. There are five techniques to help reduce tokens waste, improve accuracy, and catch failure before you submit them. And each one is a code change, not a prompt change at all. So, let's see it. First,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/vJukHCIv7Ck.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/elizabethfuentes12/why-agents-fail-sample-for-amazon-agentcore>
