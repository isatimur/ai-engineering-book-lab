---
video_id: "sl3icG-IjHo"
playlist_index: 201
title: "How to Build Planning Agents without losing control - Yogendra Miraje, Factset"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=sl3icG-IjHo"
duration: "15:58"
duration_seconds: 958
view_count: 9377
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/sl3icG-IjHo.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:43:42+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Yogendra Miraje (FactSet, financial data and software) makes a precise distinction between 'workflow agent' (workflow is static, agent runs it) and 'agentic workflow' (agent plans and runs a dynamic workflow) — and argues the second is what enterprises actually need for scale. The key architectural innovation is the Blueprint: a natural language decomposition of a task into steps that sits between the user query and the planner, preventing cognitive overload, limiting which tools reach the planner, and making agent behavior interpretable to non-technical stakeholders. Demonstrated on an NVIDIA earnings call preparation workflow. When not to use agentic workflows: fixed/repetitive tasks, strict compliance contexts, low-latency environments."
---
# How to Build Planning Agents without losing control - Yogendra Miraje, Factset

## Summary
Yogendra Miraje ("Yogi") works at FactSet, a financial data and software company. The talk draws from real enterprise agent deployment experience, with an explicit focus on control, reliability, and the ability to build on top of existing microservices investments.

### Key Definitional Distinction
Miraje flags that "workflow agent" and "agentic workflow" are often used interchangeably but mean different things:

- **Workflow agent**: the workflow is static and predefined; the agent runs it. Workflow is in control.
- **Agentic workflow**: the agent plans and executes a dynamic workflow based on goal, context, and feedback. Agent is always in control.

On the agentic spectrum (citing Andrew Ng's framing), agentic workflows have higher "agenticness." For enterprise use cases requiring automation at scale and reuse of existing microservices, agentic workflows are the target.

### Architecture: LLM Compiler Pattern
FactSet adapted the LLM Compiler architecture:

1. **Blueprint generator**: takes the user query, produces a high-level natural language plan (a "blueprint") — a series of steps expressed in terms of available tool capabilities
2. **Planner**: takes the blueprint, generates a detailed low-level execution plan (specific function calls)
3. **Executor**: executes the plan
4. **Joiner**: combines outputs from parallel tasks; decides whether to re-plan or return a response to the user
5. Recursion limit prevents infinite loops

Components are implemented as LangGraph nodes. Tool calls are built as MCP servers wrapping existing enterprise microservices.

### The Blueprint Layer: Why It Matters
The blueprint is the core architectural contribution of the talk. Its benefits:
- Reduces cognitive load on the planner (which otherwise becomes overwhelmed with too many tools and context)
- Provides fine-grained control over task planning
- Limits which tools are injected into the planner's context window — critical when you have large numbers of enterprise microservices as tools
- Makes agent behavior interpretable in natural language for non-technical stakeholders
- Enables blueprint-specific evals: compare generated blueprint against a "golden blueprint" using LLM-as-judge

### Concrete Example: NVIDIA Earnings Call Preparation
Simplified workflow: (1) summarize NVIDIA's previous earnings call, (2) retrieve current financial data for NVDA, (3) suggest discussion questions, (4) generate comprehensive report. The blueprint expresses this in natural language; the planner maps it to specific tool function calls with explicit context passing between tasks.

### Tool Design Principles
Tool-to-microservice mapping is not 1:1 — it's many-to-many. Key principle: think from the agent's point of view. Provide:
- Tool purpose (what it does)
- Detailed description (when to invoke it)
- Input/output contracts (how to use it)
- Validation checks as agent "brakes"

Build MCP servers for tools to enable standard, reusable interfaces across different AI applications in the organization.

### Eval Framework
Component evals + end-to-end evals are mandatory. Techniques by use case:
- Blueprint quality vs golden blueprint → LLM-as-judge
- Tool selection correctness → code-based evals
- Plan alignment with blueprint → LLM-as-judge
- Report formatting → human-in-the-loop

### When Not to Use Agentic Workflows
- Fixed, repetitive tasks (use ETL pipelines instead)
- Workflows that can't be captured as plans
- Strict compliance or safety-critical contexts requiring deterministic outcomes
- Low-latency or cost-constrained environments

## Why it matters
- The workflow-agent vs agentic-workflow distinction is precise vocabulary that helps teams communicate about where agent autonomy actually lives.
- The blueprint layer is a concrete, implementable pattern for the common "planner gets overwhelmed with tools" failure mode.
- Reusing existing enterprise microservices as MCP tool servers is a practical adoption path that avoids greenfield rewrites.
- The eval-by-component approach (separate evals for blueprint, tool selection, planning, and output) maps directly onto the layered architecture.

## Metadata
- Video: https://www.youtube.com/watch?v=sl3icG-IjHo
- Duration: 15:58
- Playlist index: 201
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Hi everyone, I'm Yogi. I work at Faxet, a financial data and software company. And today I'll be sharing some of my experience while building agent. In last few years we have seen tremendous growth in AI and especially in last couple of years we are on exponential curve of intelligence growth and yet it feels like when we are develop AI applications driving a monster truck through a crowded mall with a tiny joysticks. So AI applications have not seen its charge GPD moment yet...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/sl3icG-IjHo.txt]]
- Description cue: LLMs are getting smarter—but Agents are still unpredictable, unreliable, and hard to control.

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
