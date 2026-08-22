# Chapter 6 — Regulated and High-Stakes Domains

## Role in the book

The densest chapter in Part II (~12 talks), covering the domains where a wrong answer has legal, financial, or clinical consequences: finance, legal, insurance, tax, government, and medicine. The argument is that these domains do not need a smarter general model — they need a different *engineering posture*: domain-trained or domain-evaluated models, verification built into the workflow rather than bolted on, compliance as a first-class constraint, and a human in the loop wherever the cost of error is unbounded. It runs in two movements — **professional services** (finance/legal/insurance/tax/government) and **healthcare and care** — that share one thesis: high stakes turn evaluation and verification from a nicety into the product.

## Supporting source cluster

### Movement A — Professional services (finance, legal, insurance, tax, government)

- [[423-MWTJIAwAAnk-trust-but-verify-knowledge-agents-for-finance-workflows-mike-conover|#423 — Trust, but Verify: Knowledge Agents for Finance Workflows — Mike Conover, Brightwave]]
- [[406-pPvoLjYj_mY-evaluating-domain-specific-llms-for-real-world-finance-waseem-alshikh-writer|#406 — Evaluating Domain-Specific LLMs for Real-World Finance — Waseem Alshikh, Writer]]
- [[473-of-SV35YqvY-training-albatross-an-expert-finance-llm-leo-pekelis|#473 — Training Albatross: An Expert Finance LLM — Leo Pekelis, Gradient]] *(reassigned from the part1/part2 overlap set)*
- [[154-W1MiZChnkfA-scaling-enterprise-grade-rag-lessons-from-legal-frontier-calvin-qi-harvey-chang-she-lance|#154 — Scaling Enterprise-Grade RAG: Lessons from the Legal Frontier — Calvin Qi (Harvey) & Chang She (LanceDB)]]
- [[469-IAdZxqjZ45U-optimizing-llms-in-insurance-with-dspy-jeronim-morina|#469 — Optimizing LLMs in Insurance with DSPy — Jeronim Morina]]
- [[197-_zl_zimMRak-how-intuit-uses-llms-to-explain-taxes-to-millions-of-taxpayers-jaspreet-singh-intuit|#197 — How Intuit Uses LLMs to Explain Taxes to Millions of Taxpayers — Jaspreet Singh, Intuit]]
- [[086-TnSGx36Ly0Q-government-agents-ai-agents-meet-tough-regulations-mark-myshatyn-los-alamos-national-lab|#86 — Government Agents: AI Agents Meet Tough Regulations — Mark Myshatyn, Los Alamos National Lab]]

### Movement B — Healthcare and care

- [[446-cZ5ZJy19KMo-mission-critical-evals-at-scale-learnings-from-100k-medical-decisions|#446 — Mission-Critical Evals at Scale: Learnings from 100k Medical Decisions — Anterior]]
- [[187-TquUsN1QsWs-ai-that-pays-lessons-from-revenue-cycle-nathan-wan-ensemble-health|#187 — AI That Pays: Lessons from Revenue Cycle — Nathan Wan, Ensemble Health]]
- [[883-_cVfz88_j7A-can-oncology-workflows-run-without-human-touch-anant-shankhdhar-risa-labs|#883 — Can Oncology Workflows Run Without Human Touch? — Anant Shankhdhar, Risa Labs]]
- [[339-sn79oS4MZFI-case-study-deep-dive-telemedicine-support-agents-with-langgraph-mcp-dan-mason|#339 — Telemedicine Support Agents with LangGraph/MCP — Dan Mason]]
- [[938-O72p-rBb2bA-evals-driven-development-for-a-mental-health-ai-coach-akele-reed-dave-revere-sondermind|#938 — Evals-Driven Development for a Mental Health AI Coach — Akele Reed & Dave Revere, SonderMind]]

## Strongest source-backed observations

1. **In high-stakes domains, evaluation is the product, not a checkpoint.** Real-time, reference-free evals are what earn customer trust when there is no room for error and no time for a human to check every output (#446, #938).
2. **The domain's reliability demands can force you to train your own model.** When chained financial workflows must be right, prompt engineering on a general model is not enough — the constraint drives a domain-trained model (#473, #406).
3. **"Trust, but verify" becomes an architecture, not a slogan.** Finance and legal agents are built so every claim is traceable to a source, because the cost of an unverifiable assertion is a lost deal or a lawsuit (#423, #154).
4. **The value is often in the boring, broken back office, not the clinical frontier.** In healthcare, the money and the failure are in revenue-cycle and prior-authorization workflows, not diagnosis (#187, #883).
5. **Compliance is a design input from day one.** Government and clinical deployments must clear specific regulatory stacks before they can be fielded at all; the standard playbook has no slot for this (#086, #938).
6. **Scale plus stakes changes the eval math.** Serving tens of millions of people or decisions means edge cases are certainties, so the eval system must run continuously in production, not once before launch (#446, #197).

## Useful quotes / excerpts

> "Almost half the hospitals in the country are losing money… and it's not because of the clinical costs. It's because of the broken and manual processes around the revenue cycle." — [[187-TquUsN1QsWs-ai-that-pays-lessons-from-revenue-cycle-nathan-wan-ensemble-health|Nathan Wan, Ensemble Health]] (#187)

> "One that supports mission-critical decisions like in healthcare where there's no room for error… we've scaled to now serve insurance providers covering 50 million American lives." — [[446-cZ5ZJy19KMo-mission-critical-evals-at-scale-learnings-from-100k-medical-decisions|Anterior]] (#446)

> "Today I'll be talking about how we trained large language models to be finance experts." — [[473-of-SV35YqvY-training-albatross-an-expert-finance-llm-leo-pekelis|Leo Pekelis, Gradient]] (#473)

> "We build a research agent that digests very large corpuses of content in the financial domain… you need to spot critical risk factors that would diminish asset performance." — [[423-MWTJIAwAAnk-trust-but-verify-knowledge-agents-for-finance-workflows-mike-conover|Mike Conover, Brightwave]] (#423)

> "TurboTax successfully processed 44 million tax returns for tax year 23, and that's really the scale we're going for." — [[197-_zl_zimMRak-how-intuit-uses-llms-to-explain-taxes-to-millions-of-taxpayers-jaspreet-singh-intuit|Jaspreet Singh, Intuit]] (#197)

> "We've actually been doing applied AI/ML for almost 70 years." — [[086-TnSGx36Ly0Q-government-agents-ai-agents-meet-tough-regulations-mark-myshatyn-los-alamos-national-lab|Mark Myshatyn, Los Alamos National Lab]] (#86)

## Open questions

- **Split or unify?** At 12 sources, professional-services (7) and healthcare (5) could become two chapters, giving Part II four. Kept unified because both movements argue the *same* thesis (stakes make verification the product); splitting risks two thinner chapters that repeat each other. Revisit if either movement deepens.
- Several talks here are eval-heavy (#446, #406, #938). Guard the boundary with book 1's evals chapter: book 1 is about *how to build* evals; this chapter is about *what stakes do to* evals. Keep the framing on the domain, not the technique.
- #473 (Albatross) is the resolved overlap video — it argues finance's constraints drive a trained model. Make sure the drafting keeps it as a domain argument here, not a training-technique reprise of Ch 1.
- Where does automation stop and the human start? #883 asks it in the title ("without human touch"); make the human-in-the-loop line an explicit thread rather than a per-talk aside.
