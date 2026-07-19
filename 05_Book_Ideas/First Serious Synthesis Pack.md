# First Serious Synthesis Pack

Corpus size analyzed: **881 videos**
Transcript status mix: **{'auto_en_orig': 782, 'unavailable': 99}**

## What changed after full-corpus review

The corpus is now strong enough to stop treating the book as a loose trend survey.
A clearer thesis is emerging: **AI engineering is the discipline of turning model capability into dependable, high-leverage systems through scaffolding, evaluation, context design, and organizational adaptation.**

Across the full 881-video corpus, four things stand out most clearly:
- the book should be anchored in **production practice**, not model novelty
- **coding agents** are the best narrative entry point, but not the whole book
- **trust, control, and eval loops** are the hinge between demo and deployment
- **context, retrieval, security, and org design** are supporting systems, not side topics

## Evidence by layer

- **Agent architecture + coding systems** dominate the corpus (`Agent Architecture`: 222, `Coding Agents`: 280).
- **Reliability and evals** are now too large to be a chapter footnote (`Evals & Reliability`: 253).
- **Org design and leadership** remains a major recurring signal (`Org Design & Leadership`: 249).
- **Runtime/tooling/context infrastructure** is substantial and growing (`MCP & Tooling`: 91, `RAG & Retrieval`: 166).
- **Security/guardrails** and **voice/realtime** are narrower, but strategically important edge-pressure topics (`Security & Guardrails`: 29, `Voice & Realtime`: 41).

## Best current thesis

**From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems**

Why this is stronger than the earlier generic frame:
- it captures the corpus's center of gravity: moving from assistive tooling to delegated work
- it is broad enough to include coding, search, support, enterprise, and vertical agents
- it naturally creates a before/after arc: prompts → workflows → trusted systems → org redesign
- it is memorable without being tied to one vendor or one fleeting interface

## Most useful source clusters for the book

### Cluster 1 — Foundations: software judgment still matters
- [[001-v4F1gFy-hqg-it-ain-t-broke-why-software-fundamentals-matter-more-than-ever-matt-pocock-ai-hero-mattpoc|#1 — It Ain't Broke: Why Software Fundamentals Matter More Than Ever — Matt Pocock, AI Hero @mattpocockuk]]
- [[006-wjk0ulMAkbc-taste-craft-a-conversation-with-tuomas-artman-cto-linear-gergely-orosz-the-pragmatic-engin|#6 — Taste & Craft: A Conversation with Tuomas Artman, CTO Linear & Gergely Orosz, @The Pragmatic Engineer]]
- [[014-_Zcw_sVF6hU-the-friction-is-your-judgment-armin-ronacher-cristina-poncela-cubeiro-earendil|#14 — The Friction is Your Judgment — Armin Ronacher & Cristina Poncela Cubeiro, Earendil]]
- [[059-IoiHI7p12Ao-no-more-slop-swyx|#59 — No More Slop – swyx]]
- [[073-JV-wY5pxXLo-from-vibe-coding-to-vibe-engineering-kitze-sizzy|#73 — From Vibe Coding To Vibe Engineering – Kitze, Sizzy]]
- [[106-JsKTQbT58BY-the-cure-for-the-vibe-coding-hangover-corey-j-gallon-rexmore|#106 — The Cure for the Vibe Coding Hangover — Corey J. Gallon, Rexmore]]
- [[127-n991Yxo1aOI-vibe-coding-with-confidence-itamar-friedman-qodo|#127 — Vibe Coding with Confidence — Itamar Friedman, Qodo]]
- [[131-g03m-WFEu1U-how-to-improve-your-vibe-coding-ian-butler|#131 — How to Improve your Vibe Coding — Ian Butler]]
- [[132-Dc3qOA9WOnE-vibes-won-t-cut-it-chris-kelly-augment-code|#132 — Vibes won't cut it — Chris Kelly, Augment Code]]

### Cluster 2 — Coding agents need harnesses, specs, and prepared codebases
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16 — Harness Engineering: How to Build Software When Humans Steer, Agents Execute — Ryan Lopopolo, OpenAI]]
- [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40 — Spec-Driven Development: Agentic Coding at FAANG Scale and Quality — Al Harris, Amazon Kiro]]
- [[042-rcsliSIy_YU-automating-large-scale-refactors-with-parallel-agents-robert-brennan-openhands|#42 — Automating Large Scale Refactors with Parallel Agents - Robert Brennan, OpenHands]]
- [[051-RFKCzGlAU6Q-how-claude-code-works-jared-zoneraich-promptlayer|#51 — How Claude Code Works - Jared Zoneraich, PromptLayer]]
- [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57 — Making Codebases Agent Ready – Eno Reyes, Factory AI]]
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72 — Coding Evals: From Code Snippets to Codebases – Naman Jain, Cursor]]
- [[077-I8fs4omN1no-hard-won-lessons-from-building-effective-ai-coding-agents-nik-pash-cline|#77 — Hard Won Lessons from Building Effective AI Coding Agents – Nik Pash, Cline]]
- [[087-wVl6ZjELpBk-future-proof-coding-agents-bill-chen-brian-fioca-openai|#87 — Future-Proof Coding Agents – Bill Chen & Brian Fioca, OpenAI]]
- [[096-qLqttdO33UM-vision-zero-bugs-johann-schleier-smith-temporal|#96 — Vision: Zero Bugs — Johann Schleier-Smith, Temporal]]
- [[177-DdaAABdAqZY-piloting-agents-in-github-copilot-christopher-harrison-microsoft|#177 — Piloting agents in GitHub Copilot - Christopher Harrison, Microsoft]]
- [[179-x_1EumTaXeE-beyond-the-prototype-using-ai-to-write-high-quality-code-josh-albrecht-imbue|#179 — Beyond the Prototype: Using AI to Write High-Quality Code - Josh Albrecht, Imbue]]
- [[180-o_hhkJtlbSs-software-development-agents-what-works-and-what-doesn-t-robert-brennan-openhands|#180 — Software Development Agents: What Works and What Doesn't - Robert Brennan, OpenHands]]
- [[181-MI83buT_23o-devin-2-0-and-the-future-of-swe-scott-wu-cognition|#181 — Devin 2.0 and the Future of SWE - Scott Wu, Cognition]]
- [[190-Zniw5c9_jx8-mentoring-the-machine-eric-hou-augment-code|#190 — Mentoring the Machine — Eric Hou, Augment Code]]
- [[210-TswQeKftnaw-ai-powered-entomology-lessons-from-millions-of-ai-code-reviews-tomas-reimers-graphite|#210 — AI powered entomology: Lessons from millions of AI code reviews — Tomas Reimers, Graphite]]

### Cluster 3 — Trust comes from evals, not vibes
- [[023-X4dEHRzBLmc-judge-the-judge-building-llm-evaluators-that-actually-work-with-gepa-mahmoud-mabrouk-agent|#23 — Judge the Judge: Building LLM Evaluators That Actually Work with GEPA — Mahmoud Mabrouk, Agenta AI]]
- [[043-SbcQYbrvAfI-build-a-prompt-learning-loop-sallyann-delucia-fuad-ali-arize|#43 — Build a Prompt Learning Loop - SallyAnn DeLucia & Fuad Ali, Arize]]
- [[050-2HNSG990Ew8-shipping-ai-that-works-an-evaluation-framework-for-pms-aman-khan-arize|#50 — Shipping AI That Works: An Evaluation Framework for PMs – Aman Khan, Arize]]
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72 — Coding Evals: From Code Snippets to Codebases – Naman Jain, Cursor]]
- [[112-a4BV0gGmXgA-five-hard-earned-lessons-about-evals-ankur-goyal-braintrust|#112 — Five hard earned lessons about Evals — Ankur Goyal, Braintrust]]
- [[121-MC55hdWLq4o-the-future-of-evals-ankur-goyal-braintrust|#121 — The Future of Evals - Ankur Goyal, Braintrust]]
- [[125-L8OoYeDI_ls-evals-are-not-unit-tests-ido-pesok-vercel-v0|#125 — Evals Are Not Unit Tests — Ido Pesok, Vercel v0]]
- [[126-CQGuvf6gSrM-2025-is-the-year-of-evals-just-like-2024-and-2023-and-john-dickerson-ceo-mozilla-ai|#126 — 2025 is the Year of Evals! Just like 2024, and 2023, and … — John Dickerson, CEO Mozilla AI]]
- [[153-wRJD0inpmjU-evaluating-ai-search-a-practical-framework-for-augmented-ai-systems-quotient-ai-tavily|#153 — Evaluating AI Search: A Practical Framework for Augmented AI Systems — Quotient AI + Tavily]]
- [[158-jxrGodnopHo-full-workshop-building-metrics-that-actually-work-david-karam-pi-labs-fmr-google-search|#158 — [Full Workshop] Building Metrics that actually work — David Karam, Pi Labs (fmr Google Search)]]
- [[170-89NuzmKokIk-strategies-for-llm-evals-guidellm-lm-eval-harness-openai-evals-workshop-taylor-jordan-smit|#170 — Strategies for LLM Evals (GuideLLM, lm-eval-harness, OpenAI Evals Workshop) — Taylor Jordan Smith]]
- [[184-o_LRtAomJCs-human-seeded-evals-samuel-colvin-pydantic|#184 — Human seeded Evals — Samuel Colvin, Pydantic]]
- [[198-kTnfJszFxCg-3-ingredients-for-building-reliable-enterprise-agents-harrison-chase-langchain-langgraph|#198 — 3 ingredients for building reliable enterprise agents - Harrison Chase, LangChain/LangGraph]]
- [[212-coKKKKh8Vns-how-to-run-evals-at-scale-thinking-beyond-accuracy-or-similarity-muktesh-mishra-adobe|#212 — How to run Evals at Scale: Thinking beyond Accuracy or Similarity — Muktesh Mishra, Adobe]]

### Cluster 4 — Context is infrastructure, not just prompt stuffing
- [[047-xz0-brt56L8-building-intelligent-research-agents-with-manus-ivan-leo-manus-ai-now-meta-superintelligen|#47 — Building Intelligent Research Agents with Manus - Ivan Leo, Manus AI (now Meta Superintelligence)]]
- [[048-Jty4s9-Jb78-jack-morris-stuffing-context-is-not-memory-updating-weights-is|#48 — Jack Morris: Stuffing Context is not Memory, Updating Weights is]]
- [[100-fh9LgKXBGnQ-enterprise-deep-research-the-next-killer-app-for-enterprise-ai-ofer-mendelevitch-vectara|#100 — Enterprise Deep Research: The Next Killer App for Enterprise AI — Ofer Mendelevitch, Vectara]]
- [[104-NTBX-wxUhHs-context-platform-engineering-to-reduce-token-anxiety-val-bercovici-weka|#104 — Context Platform Engineering to Reduce Token Anxiety — Val Bercovici, WEKA]]
- [[105-LLuKshphGOE-context-engineering-connecting-the-dots-with-graphs-stephen-chin-neo4j|#105 — Context Engineering: Connecting the Dots with Graphs — Stephen Chin, Neo4j]]
- [[118-9AQOvT8LnMI-wisdom-driven-knowledge-augmented-generation-at-scale-chin-keong-lam-patho-ai|#118 — Wisdom-Driven Knowledge Augmented Generation at Scale - Chin Keong Lam, Patho AI]]
- [[123-jryZvCuA0Uc-how-to-look-at-your-data-jeff-huber-chroma-jason-liu-567|#123 — How to look at your data — Jeff Huber (Chroma) + Jason Liu (567)]]
- [[154-W1MiZChnkfA-scaling-enterprise-grade-rag-lessons-from-legal-frontier-calvin-qi-harvey-chang-she-lance|#154 — Scaling Enterprise-Grade RAG: Lessons from Legal Frontier - Calvin Qi (Harvey), Chang She (Lance)]]
- [[156-w9u11ioHGA0-layering-every-technique-in-rag-one-query-at-a-time-david-karam-pi-labs-fmr-google-search|#156 — Layering every technique in RAG, one query at a time - David Karam, Pi Labs (fmr. Google Search)]]
- [[157-xnXqpUW_Kp8-building-a-smarter-ai-agent-with-neural-rag-will-bryk-exa-ai|#157 — Building a Smarter AI Agent with Neural RAG - Will Bryk, Exa.ai]]
- [[172-4Xe_iMYxBQc-information-retrieval-from-the-ground-up-philipp-krenn-elastic|#172 — Information Retrieval from the Ground Up - Philipp Krenn, Elastic]]
- [[193-hxFpUcvWPcU-how-to-build-enterprise-aware-agents-chau-tran-glean|#193 — How to build Enterprise Aware Agents - Chau Tran, Glean]]
- [[215-XNneh6-eyPg-practical-graphrag-making-llms-smarter-with-knowledge-graphs-michael-jesus-and-stephen-neo|#215 — Practical GraphRAG: Making LLMs smarter with Knowledge Graphs — Michael, Jesus, and Stephen, Neo4j]]
- [[216-yYxr6LdXNWM-knowledge-graphs-in-litigation-agents-tom-smoker-whyhow|#216 — Knowledge Graphs in Litigation Agents — Tom Smoker, WhyHow]]
- [[217-XlAIgmi_Vow-when-vectors-break-down-graph-based-rag-for-dense-enterprise-knowledge-sam-julien-writer|#217 — When Vectors Break Down: Graph-Based RAG for Dense Enterprise Knowledge - Sam Julien, Writer]]
- [[218-T5IMo5ntyhA-stop-using-rag-as-memory-daniel-chalef-zep|#218 — Stop Using RAG as Memory — Daniel Chalef, Zep]]
- [[219--tgQa8Fzf80-hybridrag-a-fusion-of-graph-and-vector-retrieval-mitesh-patel-nvidia|#219 — HybridRAG: A Fusion of Graph and Vector Retrieval  - Mitesh Patel, NVIDIA]]

### Cluster 5 — Reliable agents require runtimes, control planes, and state
- [[003-XNtkiQJ49Ps-agents-need-more-than-a-chat-jacob-lauritzen-cto-legora|#3 — Agents need more than a chat - Jacob Lauritzen, CTO Legora]]
- [[028-2czYyrTzILg-from-chaos-to-choreography-multi-agent-orchestration-patterns-that-actually-work-sandipan-|#28 — From Chaos to Choreography: Multi-Agent Orchestration Patterns That Actually Work — Sandipan Bhaumik]]
- [[038-k8cnVCMYmNc-openai-temporalio-building-durable-production-ready-agents-cornelia-davis-temporal|#38 — OpenAI + @Temporalio : Building Durable, Production Ready Agents - Cornelia Davis, Temporal]]
- [[044-kmV-qg4uoNI-building-durable-agents-with-workflow-devkit-ai-sdk-peter-wielander-vercel|#44 — Building durable Agents with Workflow DevKit & AI SDK - Peter Wielander, Vercel]]
- [[083-CEvIs9y1uog-don-t-build-agents-build-skills-instead-barry-zhang-mahesh-murag-anthropic|#83 — Don't Build Agents, Build Skills Instead – Barry Zhang & Mahesh Murag, Anthropic]]
- [[099-flf_IKnFYnE-from-stateless-nightmares-to-durable-agents-samuel-colvin-pydantic|#99 — From Stateless Nightmares to Durable Agents — Samuel Colvin, Pydantic]]
- [[111-12v5S1n1eOY-building-an-agentic-platform-ben-kus-cto-box|#111 — Building an Agentic Platform — Ben Kus, CTO Box]]
- [[138-8SUJEqQNClw-agents-vs-workflows-why-not-both-sam-bhagwat-mastra-ai|#138 — Agents vs Workflows: Why Not Both? — Sam Bhagwat, Mastra.ai]]
- [[164-UG9IAdmi2Dg-building-the-platform-for-agent-coordination-tom-moor-linear|#164 — Building the platform for agent coordination — Tom Moor, Linear]]
- [[167-1izYWsokr9s-scaling-ai-agents-without-breaking-reliability-preeti-somal-temporal|#167 — Scaling AI Agents Without Breaking Reliability — Preeti Somal, Temporal]]
- [[168-Fzb1a24hF-o-ship-agents-that-ship-a-hands-on-workshop-kyle-penfound-jeremy-adams-dagger|#168 — Ship Agents that Ship: A Hands-On Workshop - Kyle Penfound, Jeremy Adams, Dagger]]
- [[176-wXVvfFMTyzY-a2a-mcp-workshop-automating-business-processes-with-llms-damien-murphy-bench|#176 — A2A & MCP Workshop: Automating Business Processes with LLMs — Damien Murphy, Bench]]
- [[198-kTnfJszFxCg-3-ingredients-for-building-reliable-enterprise-agents-harrison-chase-langchain-langgraph|#198 — 3 ingredients for building reliable enterprise agents - Harrison Chase, LangChain/LangGraph]]
- [[201-sl3icG-IjHo-how-to-build-planning-agents-without-losing-control-yogendra-miraje-factset|#201 — How to Build Planning Agents without losing control - Yogendra Miraje, Factset]]
- [[202-j_TKDweOsYE-building-agents-the-hard-parts-rita-kozlov-cloudflare|#202 — Building Agents (the hard parts!) - Rita Kozlov, Cloudflare]]
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206 — From Copilot to Colleague: Trustworthy Agents for High-Stakes - Joel Hron, CTO Thomson Reuters]]
- [[208-5rMc-moNVx0-stateful-environments-for-vertical-agents-josh-purtell-synth-labs|#208 — Stateful environments for vertical agents — Josh Purtell, Synth Labs]]

### Cluster 6 — Adoption is organizational, economic, and political
- [[005-CS5Cmz5FssI-how-ai-is-changing-software-engineering-a-conversation-with-gergely-orosz-the-pragmatic-en|#5 — How AI is changing Software Engineering: A Conversation with Gergely Orosz, @The Pragmatic Engineer]]
- [[054-rT2Del5pwg4-developer-experience-in-the-age-of-ai-coding-agents-max-kanat-alexander-capital-one|#54 — Developer Experience in the Age of AI Coding Agents – Max Kanat-Alexander, Capital One]]
- [[062-PmZDupFP3UM-leadership-in-ai-assisted-engineering-justin-reock-dx-acq-atlassian|#62 — Leadership in AI Assisted Engineering – Justin Reock, DX (acq. Atlassian)]]
- [[063-4mRekpZpBZs-paying-engineers-like-salespeople-arman-hezarkhani-tenex|#63 — Paying Engineers like Salespeople – Arman Hezarkhani, Tenex]]
- [[065-MGzymaYBiss-dispatch-from-the-future-building-an-ai-native-company-dan-shipper-every-ai-i|#65 — Dispatch from the Future: building an AI-native Company – Dan Shipper, Every, AI & I]]
- [[069-RmJ4rTLV_x4-your-support-team-should-ship-code-lisa-orr-zapier|#69 — Your Support Team Should Ship Code – Lisa Orr, Zapier]]
- [[070-Q81AzlA-VE8-what-we-learned-deploying-ai-within-bloomberg-s-engineering-organization-lei-zhang-bloombe|#70 — What We Learned Deploying AI within Bloomberg’s Engineering Organization – Lei Zhang, Bloomberg]]
- [[079-JvosMkuNxF8-can-you-prove-ai-roi-in-software-eng-stanford-120k-devs-study-yegor-denisov-blanch-stanfor|#79 — Can you prove AI ROI in Software Eng? (Stanford 120k Devs Study) – Yegor Denisov-Blanch, Stanford]]
- [[101-WqZq8L-v9pA-what-data-from-20m-pull-requests-reveal-about-ai-transformation-nick-arcolano-jellyfish|#101 — What Data from 20m Pull Requests Reveal About AI Transformation — Nick Arcolano, Jellyfish]]
- [[102-QRWdapxMdSY-ai-copilots-for-tech-architecture-the-highest-roi-use-case-you-re-not-building-boris-b-cat|#102 — AI Copilots for Tech Architecture: The Highest-ROI Use Case You’re Not Building — Boris B., Catio]]
- [[135-3MZS5gNElZM-state-of-startups-and-ai-2025-sarah-guo-conviction|#135 — State of Startups and AI 2025 - Sarah Guo, Conviction]]
- [[137-mQ7_Zje7WKE-the-2025-ai-engineering-report-barr-yaron-amplify|#137 — The 2025 AI Engineering Report — Barr Yaron, Amplify]]
- [[160-PthmdT92qNg-shipping-products-when-you-don-t-know-what-they-can-do-ben-stein-teammates|#160 — Shipping Products When You Don't Know What they Can Do — Ben Stein, Teammates]]
- [[161-mHzJhXppwUA-shipping-something-to-someone-always-wins-kenneth-auchenberg-ex-stripe-vscode|#161 — Shipping something to someone always wins — Kenneth Auchenberg (ex. Stripe, VSCode)]]
- [[162-xzJdSi2Tsqw-why-your-product-needs-an-ai-product-manager-and-why-it-should-be-you-james-lowe-i-ai|#162 — Why your product needs an AI product manager, and why it should be you — James Lowe, i.AI]]
- [[169-YYNXFsUutbM-the-ai-engineer-s-guide-to-raising-vc-dani-grant-jam-chelcie-taylor-notable|#169 — The AI Engineer’s Guide to Raising VC — Dani Grant (Jam), Chelcie Taylor (Notable)]]
- [[188-SbUxRluVRwk-structuring-a-modern-ai-team-denys-linkov-wisedocs|#188 — Structuring a modern AI team — Denys Linkov, Wisedocs]]
- [[194-6WQYLQB0odc-monetizing-ai-alvaro-morales-orb|#194 — Monetizing AI — Alvaro Morales, Orb]]
- [[195-tbDDYKRFjhk-does-ai-actually-boost-developer-productivity-100k-devs-study-yegor-denisov-blanch-stanfor|#195 — Does AI Actually Boost Developer Productivity? (100k Devs Study) - Yegor Denisov-Blanch, Stanford]]
- [[199-3YGRcgZJ3yc-from-hype-to-habit-how-we-re-building-an-ai-first-saas-company-while-still-shipping-the-ro|#199 — From Hype to Habit: How We’re Building an AI-First SaaS Company—While Still Shipping the Roadmap]]
- [[205-Wv1tAxKYLeE-the-billable-hour-is-dead-long-live-the-billable-hour-kevin-madura-mo-bhasin-alix-partners|#205 — The Billable Hour is Dead; Long Live the Billable Hour — Kevin Madura + Mo Bhasin, Alix Partners]]
- [[207-Zqu0VaJw3vo-how-to-hire-ai-engineers-when-everyone-is-cheating-with-ai-beth-glenfield-devday|#207 — How to Hire AI Engineers when EVERYONE is cheating with AI — Beth Glenfield, DevDay]]

### Cluster 7 — Edge pressures: security, identity, realtime, and compliance
- [[031-AHtGAgQ0Q_Q-why-and-how-you-need-to-sandbox-ai-generated-code-harshil-agrawal-cloudflare|#31 — Why, and how you need to sandbox AI-Generated Code? — Harshil Agrawal, Cloudflare]]
- [[032-BurJvbqFr4c-your-insecure-mcp-server-won-t-survive-production-tun-shwe-lenses|#32 — Your Insecure MCP Server Won't Survive Production — Tun Shwe, Lenses]]
- [[037-VSdV-AdSlis-identity-for-ai-agents-patrick-riley-carlos-galan-auth0|#37 — Identity for AI Agents - Patrick Riley & Carlos Galan, Auth0]]
- [[085-hwCmfThIiS4-voicevision-rag-integrating-visual-document-intelligence-with-voice-response-suman-debnath|#85 — VoiceVision RAG - Integrating Visual Document Intelligence with Voice Response — Suman Debnath, AWS]]
- [[086-TnSGx36Ly0Q-government-agents-ai-agents-meet-tough-regulations-mark-myshatyn-los-alamos-national-lab|#86 — Government Agents: AI Agents Meet Tough Regulations — Mark Myshatyn, Los Alamos National Lab]]
- [[142-IA4lZjh9sTs-pipecat-cloud-enterprise-voice-agents-built-on-open-source-kwindla-hultman-kramer-daily|#142 — Pipecat Cloud: Enterprise Voice Agents Built On Open Source - Kwindla Hultman Kramer, Daily]]
- [[145-E71YtNbCFXY-your-realtime-ai-is-ngmi-sean-dubois-openai-kwindla-kramer-daily|#145 — Your realtime AI is ngmi — Sean DuBois (OpenAI), Kwindla Kramer (Daily)]]
- [[146-1v9zBiZKlIY-why-chatgpt-keeps-interrupting-you-dr-tom-shapland-livekit|#146 — Why ChatGPT Keeps Interrupting You — Dr. Tom Shapland, LiveKit]]
- [[148-Gi4V8viBGYQ-how-to-defend-your-sites-from-ai-bots-david-mytton-arcjet|#148 — How to defend your sites from AI bots — David Mytton, Arcjet]]
- [[149-CCsWZ5bJlO8-the-unofficial-guide-to-apple-s-private-cloud-compute-jmo-confsec|#149 — The Unofficial Guide to Apple’s Private Cloud Compute - Jmo, CONFSEC]]
- [[150-blmAkayzE8M-how-to-secure-agents-using-oauth-jared-hanson-keycard-passport-js|#150 — How to Secure Agents using OAuth — Jared Hanson (Keycard, Passport.js)]]
- [[152-w7IMuYsBNr8-openai-on-securing-code-executing-ai-agents-fouad-matin-codex-agent-robustness|#152 — OpenAI on Securing Code-Executing AI Agents — Fouad Matin (Codex, Agent Robustness)]]
- [[206-kDEvo2__Ijg-from-copilot-to-colleague-trustworthy-agents-for-high-stakes-joel-hron-cto-thomson-reuters|#206 — From Copilot to Colleague: Trustworthy Agents for High-Stakes - Joel Hron, CTO Thomson Reuters]]
- [[211-6Tpm4m1YxHk-critical-ai-inference-your-cio-can-trust-sahil-yadav-hariharan-ganesan-telemetrak|#211 — Critical AI Inference your CIO can Trust — Sahil Yadav, Hariharan Ganesan, Telemetrak]]

## Editorial recommendation

Do **not** write this as a comprehensive encyclopedia of the AI tooling landscape.
Write it as a practical field guide for senior builders: how to move from isolated AI assistance to trustworthy delegated systems without losing quality, control, or organizational coherence.

## Companion notes

- [[Book Angle Comparison]]
- [[Recommended Primary Book Angle]]
- [[Chapter Outline v1]]
