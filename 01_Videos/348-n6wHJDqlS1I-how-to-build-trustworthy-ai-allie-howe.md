---
video_id: "n6wHJDqlS1I"
playlist_index: 348
title: "How to Build Trustworthy AI — Allie Howe"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=n6wHJDqlS1I"
duration: "24:22"
duration_seconds: 1462
view_count: 2981
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/n6wHJDqlS1I.txt"
themes:
  - "Security & Guardrails"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:14:42+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Allie Howe, a virtual CISO who works on AI security and compliance, defines trustworthy AI as AI security (how the world harms your app) plus AI safety (how your app harms the world), and argues that the builder, not the model vendor, carries the blame. She maps it to three stages: MLSecOps at build time (model provenance, notebook secrets, scanning for pickle serialization attacks), AI red teaming at test time, and runtime guardrails on inputs and outputs, which she calls the best first investment. She sketches guardrail points in the Fortnite Darth Vader voice pipeline, shows a custom guardrail blocking database edits, and shows how to prove controls to buyers in a SOC 2 trust center."
---
# How to Build Trustworthy AI — Allie Howe

## Summary
Allie Howe is a virtual CISO at a firm that sits at the intersection of AI security and compliance. Her thesis: you are responsible for what your AI does. She cites a chatbot that offered a Chevy Tahoe for a dollar, a prompt injection that made Slack AI leak private channel data, the Darth Vader NPC in Fortnite that said offensive things at launch, and a defamation suit against OpenAI that failed because ChatGPT warns users it can be wrong. The legal and brand risk lands on the company that ships the app.

**The recipe**
Trustworthy AI is AI security plus AI safety. Security asks how the outside world harms your AI application (prompt injection, jailbreaks). Safety asks how your application harms the world (dangerous instructions, bias, toxic output). Product, engineering and security teams share the work.

**From DevSecOps to MLSecOps, and a shift right**
Data scientists work in Databricks and Jupyter notebooks, outside the CI/CD pipelines where classic scanners live. Prompt attacks change fast and models are swapped often, so runtime matters more than in classic shift-left security. She maps the life cycle to three stages:
- Build: MLSecOps. Check model provenance (who built it, on what data, perhaps a nation state), look for secrets in notebooks, and scan models. Pickle deserialization runs arbitrary code, and she demos an open-source scanner from Protect AI that flags a model whose payload prints AWS keys. Hugging Face uses it to scan files.
- Test: AI red teaming for both security and safety. Run it continuously, use the findings to choose runtime guardrails, and compare models on the same prompts to spot odd answers that may point to a backdoor.
- Run: runtime security. If you invest in one area, pick this one, because it is often just an API or a Python module. It catches direct and indirect prompt injection (hidden in web pages or RAG documents), jailbreaks, and off-topic or unsafe prompts, on the input and on the output.

**Worked examples**
- Her guess at the Vader architecture: player audio goes to Fortnite servers, then ElevenLabs for speech to text, then Gemini, then back through ElevenLabs. She would put a guardrail closest to the model on both sides, and maybe before the paid speech call to save cost. Good runtime tools balance cost, latency and accuracy.
- An agent that matches patients to ALS clinical trials. A custom guardrail blocks a request to change a patient's data. Custom topics can also block business-level things, such as a carmaker's bot recommending a competitor.
- In a GRC platform, she adds a custom risk (brand damage from harmful output) and a custom control (validate AI outputs), then publishes it in a trust center. This can shorten sales cycles and spare you a long security questionnaire.

**Why care**
Security risk and business risk now align: an off-topic AI does not make money. AI magnifies gaps in data and supply-chain hygiene. Regulation is growing: ISO 42001, the EU AI Act (she cites a fine of about 20 million for a scraped face database), HIPAA, and FDA AI/ML guidance. Trust is what lets fields like healthcare use these systems.

## Why it matters
- Gives a short definition that separates two failure types: security (the world attacks the app) and safety (the app harms the world).
- Argues for shifting right: runtime guardrails are the cheapest, fastest first control for non-deterministic systems, with red teaming feeding them.
- Names a concrete supply-chain risk that AI teams often miss: pickle model serialization attacks, which scanners can catch before load.
- Shows where to place guardrails in a multi-hop voice pipeline and the cost, latency and accuracy trade-off at each point.
- Links security work to sales by turning guardrails into auditable compliance controls.

## Metadata
- Video: https://www.youtube.com/watch?v=n6wHJDqlS1I
- Duration: 24:22
- Playlist index: 348
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]
- [[Evals & Reliability]]

## Transcript excerpt
> Hi, my name is Ally How. I am a VCSO for Growth Cyber. We are a business that helps other companies build trustworthy AI. We sit at the intersection of AI security and compliance. Today, we're going to be talking about a variety of different topics. Namely, what is trustworthy AI? What goes into building trustworthy AI? And why you should care about trustworthy AI. So, to start off, who even needs trustworthy AI? Why do we care about it? Well, it's been in the news a lot, whether you realize it or not. All the way back in 2023, we all saw that case with the Chevy Tahoe incident where a user was able to um be offered a Chevy Tahoe from a chatbot for a dollar. So, that chatbot did not operate...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/n6wHJDqlS1I.txt]]
- Description cue: Trust is a multifaceted outcome that results when product and engineering teams work together to build AI that is aligned, explainable, and secure. Learn strategies for how to build trustworthy...

## Book angles
- Could support a chapter/section on **Security & Guardrails**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/protectai/modelscan>
- resource: <https://ashy-coast-00aeb501e.6.azurestaticapps.net/MS_AIRT_Lessons_eBook.pdf>
- resource: <https://azure.github.io/PyRIT>
- resource: <https://fingfx.thomsonreuters.com/gfx/legaldocs/egvblxokkvq/Walters%20v%20OpenAI%20-%20order.pdf>
- resource: <https://www.pillar.security/solutions>
- resource: <https://www.vanta.com/collection/trust/what-is-a-trust-center>
