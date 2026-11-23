---
video_id: "xzXdLRUyjUg"
playlist_index: 455
title: "Lets Build An Agent from Scratch"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=xzXdLRUyjUg"
duration: "19:29"
duration_seconds: 1169
view_count: 32413
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/xzXdLRUyjUg.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:19:03+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kam Lasater builds an agent with no framework, from the formula agent = LLM + memory + planning + tools + while loop. In five runnable steps he adds a plain OpenAI chat completion, an LLM-as-judge condition with a strict JSON done flag, a Google search tool he dispatches himself, parallel tool calls matched by tool call ID, and finally a to-do list tool. The to-do list gives read/write memory and planning, the LLM drives the loop, and the judge becomes a tool. That last step is where deterministic code starts to feel like an agent."
---
# Lets Build An Agent from Scratch

## Summary
Kam Lasater (the slides live on his personal site, linked below) gives a code walkthrough with three goals. He wants viewers to experience the simplest possible agent, to run and break the code, and to gain an intuition for what agent frameworks do underneath. He starts from one definition: an agent is an LLM, memory, planning, tools and a while loop. He splits memory into read and write, and the loop into a condition and the looping itself, then builds each piece in turn.

**Step 0: call an LLM**
A standard OpenAI chat completion, straight from the hello world docs.

**Step 1: the condition**
After the answer comes back, a second LLM call acts as judge: a "strict critic" decides whether the answer fully answers the question. The output is forced to a strict JSON schema with a Boolean done flag. The test question is the average wing speed of a swallow.

**Step 2: tools**
He adds a Google search tool through a search API service that returns easy JSON, and writes the tool config by hand so it can be inspected: name, description, strict schema, parameters (query, location) and required fields. The key point is that the OpenAI SDK does not run tools. Your code reads the tool calls, runs the function, pushes both the call and the result back into the conversation, and calls the model again until it is satisfied. The live run fails once on a validation constraint: the location parameter takes only specific strings.

**Step 3: parallel tool calls**
A refactor moves complete-with-tools into a utils file and runs every requested tool call in parallel. Each result carries its tool call ID so the model can match it, because the model may call the same tool several times with different inputs. His mental model: tools are text transformations, mostly string to string.

**Step 4: planning, the inflection point**
Steps 0 to 3 still feel deterministic. Step 4 adds a to-do list tool set: add to-dos, mark done, check done, check to-dos. Together with a browse-web tool that fetches a URL and converts it to markdown, this covers read, write and planning. The LLM itself now drives the loop through repeated tool calls, and the judge becomes a tool ("check goal done"). The system prompt tells the model to plan with the to-do list first, add any judge feedback as new to-dos, and report when done. It also adds today's date, because the model often does not know it. The main function shrinks to one call.

He warns that an agent can loop on tool calls forever. A common guardrail is a client-side cap on iterations. His demos research agent-building without a framework, then plan a Saturday date with dinner between 6 and 11 p.m. Next steps he suggests: a vector database, or loading browsed pages into an in-memory Chroma store for RAG.

## Why it matters
- It reduces agent to five concrete parts and builds each in under twenty minutes, a clear teaching sequence for a chapter on agent basics.
- It shows that the SDK does not execute tools: the client code owns dispatch, result ordering and tool call IDs.
- It marks a specific point where behaviour shifts from deterministic to agentic: when planning (a to-do list) and the stop condition (the judge) become tools the model calls itself.
- Treating LLM-as-judge as the loop's exit condition, with a strict Boolean schema, is a small, reusable pattern.
- It names a real failure mode, an endless tool-call loop, and the simple fix of capping iterations in client code.

## Metadata
- Video: https://www.youtube.com/watch?v=xzXdLRUyjUg
- Duration: 19:29
- Playlist index: 455
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> hi I'm Cam and I welcome you to my talk on how to build an agent so I have three goals for this talk I want you to experience the simplest version of what an agent could be um and I want you to feel comfortable in running and breaking the included code um I think the the running and breaking is very very important part to the learning um and I also want you to take away uh an intuition for how agents work or how other Frameworks work if you choose to go with some agent framework that's great um I want you to have some understanding of maybe the underlying the underpinning building blocks that they used to make it work so with that let's get to some slides okay great this is where you can...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/xzXdLRUyjUg.txt]]
- Description cue: Everyone is talking about agents and how powerful they are or will be. But what is an agent anyways? Down with corporate buzzword marketing speak, we are engineers, let’s build!

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://kamlasater.com/talks/agents-2025>
