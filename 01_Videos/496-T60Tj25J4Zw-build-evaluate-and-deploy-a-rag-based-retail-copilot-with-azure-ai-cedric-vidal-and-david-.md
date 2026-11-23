---
video_id: "T60Tj25J4Zw"
playlist_index: 496
title: "Build, Evaluate and Deploy a RAG-Based Retail Copilot with Azure AI: Cedric Vidal and David Smith"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=T60Tj25J4Zw"
duration: "1:57:58"
duration_seconds: 7078
view_count: 582
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/T60Tj25J4Zw.txt"
themes:
  - "Org Design & Leadership"
  - "Coding Agents"
ingested_at: "2026-04-24T12:20:44+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "David Smith and Cedric Vidal, principal AI advocates at Microsoft, with Miguel Martinez, run a hands-on workshop building the backend of a retail chatbot for a fictional outdoor store. A prompt flow DAG embeds the question, retrieves product markdown from Azure AI Search, looks up the logged-in customer's orders in Cosmos DB, fills a prompt template and calls GPT-3.5 Turbo. They argue that LLM apps need LLMOps: run the flow locally, deploy it as a container endpoint, then score relevance, groundedness, coherence and fluency with GPT-4 as judge, which catches the model inventing a toothbrush the store does not sell."
---
# Build, Evaluate and Deploy a RAG-Based Retail Copilot with Azure AI: Cedric Vidal and David Smith

## Summary
David Smith, a principal AI advocate at Microsoft with a background in data science and statistics, leads a two-hour hands-on workshop. Cedric Vidal, a fellow principal AI advocate, and Miguel Martinez, a senior technical specialist, help on the floor. Attendees fork a GitHub repo, open GitHub Codespaces, and sign in to a pre-provisioned Azure account. Much of the recording is floor help and audience Q&A.

**The app**
The setting is a Contoso outdoor retailer selling tents, boots and jackets. Customer Sarah Lee is logged in. The chatbot answers product questions ("what is a good tent that goes with the Trail Walker shoes") and history questions ("what have I already purchased"). The backend:
- Embed the question with Azure OpenAI.
- Search Azure AI Search for the nearest product pages. Each product is one markdown file, indexed without chunking for simplicity.
- Look up the customer and recent orders in Cosmos DB. About 12 customers are loaded.
- Fill a prompt template that loops over the matched products and past orders and tells the model to reference factual statements.
- Generate with GPT-3.5 Turbo, which is cheap and fast enough when the context is right.

**Prompt flow**
The pipeline is a prompt flow, defined in YAML or a Python DSL. Its graph view is "more of a visual reader" than an editor. The flow is a directed acyclic graph: every node always runs, with no conditional node execution and no loops. Conditionals and loops live inside Python nodes. Developers run it locally in Codespaces against cloud resources, then deploy it as a container app endpoint that the platform scales. Cosmos DB connects through a custom connection.

**Where the tools fit, per the presenters**
Semantic Kernel is the enterprise orchestrator with strict versioning. AutoGen comes from Microsoft Research and is "bleeding" edge. Prompt flow builds, evaluates and deploys one endpoint, and can also be embedded as a library. Copilot Studio builds whole apps, while AI Studio builds endpoints.

**Audience questions worth keeping**
- Vector search at scale: in their experience vector search alone is not enough. Hybrid keyword plus vector search beats either and is the Azure AI Search default.
- Access control: the app passes only a customer ID and the question. The flow queries the database with privileged access, and only generated text returns to the app. One attendee wanted the user's own token to flow through for row-level control. The presenters were not sure it is supported.
- Text-to-SQL over order history is a different design and opens a prompt-injection risk at the SQL generation step.
- PDFs and images: index PDFs in search, or chunk and embed them in memory for one session. Use Florence 2 or GPT-4o for images.

**Evaluation**
A notebook sends each question through the flow, then asks GPT-4 to score the answer from 0 to 5 for relevance, groundedness, coherence and fluency. "Tell me about your jackets" scores 5 for groundedness. An adversarial question about a toothbrush makes GPT-3.5 invent a travel toothbrush the store does not sell: groundedness 1, relevance 1, but coherence 4 and fluency 5. AI Studio runs the same scoring over a set of questions, responses and context, so the tests can be rerun when products change or the model is upgraded.

**The LLMOps loop**
Smith calls it "essentially the same as devops". Ideate, build a first flow, evaluate on sample data, then iterate on prompts and chunking. Red-team it, deploy with monitoring of sampled live traffic, watch daily groundedness charts for drift or attacks, and repeat.

## Why it matters
- It is a concrete, reproducible reference design for customer-aware RAG: vector search for products plus a relational lookup for the logged-in user, joined in a prompt template.
- The toothbrush test is a vivid example of why fluency and coherence scores can hide a groundedness failure, and why evals need adversarial, out-of-catalog questions.
- It shows a cheap model in production with a stronger model as judge, a common split between cost and evaluation quality.
- The access-control discussion separates a privileged flow, which returns only text to the app, from per-user delegated access, which remains an open problem.
- The field observation that hybrid keyword plus vector search beats tuned vector search alone is useful for any retrieval chapter.

## Metadata
- Video: https://www.youtube.com/watch?v=T60Tj25J4Zw
- Duration: 1:57:58
- Playlist index: 496
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Coding Agents]]

## Transcript excerpt
> [Music] uh this is the workshop on developing a production level rag workflow so you're in the right place if you want to learn how to build the back end for a chat application that works Al off of Open Ai and builds its answers based on information uh that we draw from databases and Vector databases we'll see all about that in this presentation today my name is David Smith uh I'm a principal AI Advocate at Microsoft I've been with Microsoft for about eight years now uh after my startup was acquired uh back in the Big Data space and I've been at Microsoft ever since um my background is in data science uh also did a lot of work as as a statistician uh and these days I'm a specialist in AI...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/T60Tj25J4Zw.txt]]
- Description cue: Building generative AI applications for production requires a paradigm shift to LLM Ops, with new tools, platforms and processes for orchestrating end-to-end development workflows. In this...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Coding Agents**.
