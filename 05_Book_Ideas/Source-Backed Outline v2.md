# Source-Backed Outline v2

Working title: **From Copilot to Colleague**  
Working subtitle: **How AI Engineering Turns Models into Dependable Systems**

## Governing thesis
AI engineering is the discipline of making delegated machine work dependable. The hard part is not accessing a model. It is building the scaffolding around the model — specs, harnesses, context systems, eval loops, runtimes, controls, and organizational practices — so AI can move from suggesting to acting without collapsing trust.

## Narrative spine
The book should follow a clear arc:
1. **The transition** — why the relevant shift is from assistant to delegate.
2. **The discipline** — why judgment and engineering craft matter more under cheap generation.
3. **The scaffolding** — the technical systems that make delegated work reliable.
4. **The expansion** — how those same ideas generalize to context, runtime, security, and realtime systems.
5. **The reorganization** — how teams and companies adapt once AI becomes a participant in production work.
6. **The enduring principles** — what survives tool churn.

## Chapter-by-chapter outline

### 1. The Shift: From Assistant to Delegate
**Function:** Frame the real problem.  
**Main argument:** The important product shift is not better conversation but reliable delegated work.  
**Why this chapter exists:** It creates the book's central dramatic question: what must be built before AI can be trusted as a colleague?  
**Anchor sources:** [[003-XNtkiQJ49Ps-agents-need-more-than-a-chat-jacob-lauritzen-cto-legora|#3]], [[083-CEvIs9y1uog-don-t-build-agents-build-skills-instead-barry-zhang-mahesh-murag-anthropic|#83]], [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206]], [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]]

### 2. Taste Still Matters When Code Gets Cheap
**Function:** Re-establish engineering fundamentals as strategic assets.  
**Main argument:** When generation becomes cheap, taste, architecture, and judgment become more leveraged.  
**Why this chapter exists:** It prevents the book from sounding like autonomy hype and defines the human role more sharply.  
**Anchor sources:** [[001-v4F1gFy-hqg-it-ain-t-broke-why-software-fundamentals-matter-more-than-ever-matt-pocock-ai-hero-mattpoc|#1]], [[006-wjk0ulMAkbc-taste-craft-a-conversation-with-tuomas-artman-cto-linear-gergely-orosz-the-pragmatic-engin|#6]], [[059-IoiHI7p12Ao-no-more-slop-swyx|#59]], [[132-Dc3qOA9WOnE-vibes-won-t-cut-it-chris-kelly-augment-code|#132]]

### 3. Harnesses, Specs, and Codebases Agents Can Actually Use
**Function:** Introduce the first layer of scaffolding.  
**Main argument:** Agent quality depends heavily on the quality of the environment they operate in.  
**Why this chapter exists:** It is the technical hinge of the book, where the abstract trust problem becomes an environment-design problem.  
**Anchor sources:** [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16]], [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40]], [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57]], [[180-o_hhkJtlbSs-software-development-agents-what-works-and-what-doesn-t-robert-brennan-openhands|#180]], [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629]], [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]]

### 4. Evals Are the Control System
**Function:** Convert trust into measurement.  
**Main argument:** Reliable AI depends on continuous evaluation loops aimed at real work, not toy benchmarks.  
**Why this chapter exists:** It supplies the operational mechanism that makes the book's thesis falsifiable rather than rhetorical.  
**Anchor sources:** [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72]], [[125-L8OoYeDI_ls-evals-are-not-unit-tests-ido-pesok-vercel-v0|#125]], [[184-o_LRtAomJCs-human-seeded-evals-samuel-colvin-pydantic|#184]], [[212-coKKKKh8Vns-how-to-run-evals-at-scale-thinking-beyond-accuracy-or-similarity-muktesh-mishra-adobe|#212]], [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]]

### 5. Context Is Infrastructure
**Function:** Broaden the thesis from coding environments to knowledge environments.  
**Main argument:** Retrieval, memory, and context assembly are infrastructure layers that determine agent usefulness.  
**Why this chapter exists:** It shows that prompt quality is downstream of information architecture.  
**Anchor sources:** [[104-NTBX-wxUhHs-context-platform-engineering-to-reduce-token-anxiety-val-bercovici-weka|#104]], [[105-LLuKshphGOE-context-engineering-connecting-the-dots-with-graphs-stephen-chin-neo4j|#105]], [[193-hxFpUcvWPcU-how-to-build-enterprise-aware-agents-chau-tran-glean|#193]], [[218-T5IMo5ntyhA-stop-using-rag-as-memory-daniel-chalef-zep|#218]], [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|#622]], [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]]

### 6. Runtimes, State, and the Human Control Plane
**Function:** Explain what changes when agents operate over time and across tools.  
**Main argument:** Durable execution, explicit state, and designed human supervision are prerequisites for serious autonomy.  
**Why this chapter exists:** It extends scaffolding from local task execution to long-running systems.  
**Anchor sources:** [[038-k8cnVCMYmNc-openai-temporalio-building-durable-production-ready-agents-cornelia-davis-temporal|#38]], [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|#99]], [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167]], [[201-sl3icG-IjHo-how-to-build-planning-agents-without-losing-control-yogendra-miraje-factset|#201]], [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206]], [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623]], [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]]

### 7. Security, Identity, and High-Stakes Trust
**Function:** Surface the governance cost of agency.  
**Main argument:** Once systems can act, trust depends on identity, sandboxing, least privilege, and auditability.  
**Why this chapter exists:** It prevents the book from treating autonomy as a purely productivity problem.  
**Anchor sources:** [[031-AHtGAgQ0Q_Q-why-and-how-you-need-to-sandbox-ai-generated-code-harshil-agrawal-cloudflare|#31]], [[032-BurJvbqFr4c-your-insecure-mcp-server-won-t-survive-production-tun-shwe-lenses|#32]], [[037-VSdV-AdSlis-identity-for-ai-agents-patrick-riley-carlos-galan-auth0|#37]], [[150-blmAkayzE8M-how-to-secure-agents-using-oauth-jared-hanson-keycard-passport-js|#150]], [[152-w7IMuYsBNr8-openai-on-securing-code-executing-ai-agents-fouad-matin-codex-agent-robustness|#152]], [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624]], [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]], [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627]]

### 8. Realtime and Embodied Edges
**Function:** Stress-test the general theory under harsh constraints.  
**Main argument:** Voice, streaming, and embodied systems expose the importance of latency, interruption handling, and environment state.  
**Why this chapter exists:** It proves the book's framework generalizes beyond text-based coding systems.  
**Anchor sources:** [[026-IEF842ZEU5A-contact-center-voice-ai-low-latency-intelligence-extraction-from-messy-audio-streams-dippu|#26]], [[145-E71YtNbCFXY-your-realtime-ai-is-ngmi-sean-dubois-openai-kwindla-kramer-daily|#145]], [[146-1v9zBiZKlIY-why-chatgpt-keeps-interrupting-you-dr-tom-shapland-livekit|#146]], [[174-iS9YFW28XyM-waymo-s-emma-teaching-cars-to-think-jyh-jing-hwang-waymo|#174]]

### 9. The AI-Native Organization
**Function:** Move from systems design to organizational redesign.  
**Main argument:** The deepest gains come when companies redesign incentives, roles, and interfaces around AI participation.  
**Why this chapter exists:** It answers the management question that naturally follows the technical chapters.  
**Anchor sources:** [[065-MGzymaYBiss-dispatch-from-the-future-building-an-ai-native-company-dan-shipper-every-ai-i|#65]], [[069-RmJ4rTLV_x4-your-support-team-should-ship-code-lisa-orr-zapier|#69]], [[101-WqZq8L-v9pA-what-data-from-20m-pull-requests-reveal-about-ai-transformation-nick-arcolano-jellyfish|#101]], [[188-SbUxRluVRwk-structuring-a-modern-ai-team-denys-linkov-wisedocs|#188]], [[199-3YGRcgZJ3yc-from-hype-to-habit-how-we-re-building-an-ai-first-saas-company-while-still-shipping-the-ro|#199]], [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623]], [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629]]

### 10. What Endures
**Function:** Close on durable principles.  
**Main argument:** The stable truths are constrained delegation, explicit context, eval loops, stateful runtimes, and human judgment.  
**Why this chapter exists:** It leaves the reader with a portable mental model rather than a snapshot of 2026 tooling.  
**Anchor sources:** [[005-CS5Cmz5FssI-how-ai-is-changing-software-engineering-a-conversation-with-gergely-orosz-the-pragmatic-en|#5]], [[108-o3gmwzo-Mik-ai-changes-nothing-dax-raad-opencode|#108]], [[122-IHkyFhU6JEY-designing-ai-intensive-applications-swyx|#122]], [[124-qdmxApz3EJI-on-engineering-ai-systems-that-endure-the-bitter-lesson-omar-khattab-dspy-databricks|#124]], [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]], [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]]

## Editorial recommendation
This v2 outline is stronger than the original because it has a cleaner dependency structure:
- chapters 1-2 define the problem and the human role
- chapters 3-7 build the technical scaffolding stack
- chapter 8 serves as a stress test at the edges
- chapters 9-10 widen out to org design and enduring principles

The new batch does **not** break this structure. It mostly adds stronger contemporary evidence for:
- software-factory style harnesses and subagents in chapters 3 and 6
- MCP context management in chapter 5
- identity/gateway/security concerns in chapter 7
- collaborative alignment and operating-model redesign in chapter 9

## Likely manuscript-level throughline
A repeated line can carry the book:
**Models create possibility. Scaffolding creates trust. Organizations decide whether that trust compounds.**

## Main unresolved editorial decisions
1. Whether Chapter 8 should remain a full chapter or become a shorter horizon/interlude.
2. Whether MCP belongs mostly in Chapter 5 or Chapter 7, with Chapter 6 only covering orchestration implications.
3. How enterprise the tone should become after Chapter 5.
4. Which recurring case study should appear across multiple chapters to make the book feel less like a survey.
5. Whether to use the software factory / subagent pattern as the book's recurring coding case study.
