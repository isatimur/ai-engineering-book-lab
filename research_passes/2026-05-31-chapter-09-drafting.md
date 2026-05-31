# Chapter 9 Drafting Pass — 2026-05-31

## Date
2026-05-31

## Target
Chapter 9 — The AI-Native Organization. Move from Starter status to Drafting status per `programs/chapter_drafting_pass.md`. Fourth and final execution in the 5 → 8 → 7 → 9 program order. Completes the four-chapter drafting program initiated 2026-05-28.

## Pass type
Per-chapter bounded drafting. Unique among the four passes in this program: the Ch 9 website mirror was already a fully-drafted ~75-line chapter with rich named-speaker prose and a complete argument arc — it had been written but never had its status flipped from Starter, and never had its strongest claims promoted to the ledger. This pass is a *promotion + ledger* pass, not a drafting pass.

## Inputs used
- `05_Book_Ideas/Chapter Packets v1/09_The_AI_Native_Organization.md` — packet v1 (18-source cluster covering operating model, hiring, compensation, ROI, software factory; 6 strongest claims; 4 useful quotes; 4 open questions).
- `website/src/content/chapter-09.md` — already a fully-drafted ~75-line chapter with rich prose and complete argument arc.
- `public/drafting/Chapter 9 - The AI-Native Organization.md` — held only the planning skeleton from an earlier pass (23 lines); brought up to match the published mirror with the planning skeleton preserved as a record.
- `claims/Claims Ledger.md` — to cross-reference against existing claim 16 ("AI-native advantage depends on organizational coherence, not output volume alone") and the broader set of claims this closing-arc chapter draws from.
- `website/src/data/bookChapters.ts` — Ch 9 entry for status flip.

## Outputs changed
1. `public/drafting/Chapter 9 - The AI-Native Organization.md` — promoted from planning skeleton to full draft; includes a draft-note frontmatter explaining the pass shape, the original planning skeleton preserved as a record, the full prose, and a status-note footer.
2. `claims/Claims Ledger.md` — appended claims 35–39 (no anchors per program). Existing claims #1, #3, #4, #8, #14, #16, #25, #28, #34 referenced in prose without re-registering.
3. `website/src/data/bookChapters.ts` — Ch 9 status flipped Starter → Drafting.
4. `website/src/content/chapter-09.md` — **unchanged**. The published prose was already at Drafting tier; rewriting it would have been churn for its own sake. The chapter's status changes because the ledger now reflects what the prose argues, not because the prose changed.
5. This file.

## Claims registered
- **35)** AI-native advantage is an operating-model redesign, not a procurement decision. Sources: #65 Shipper/Every, #137 Yaron/Amplify 2025 report, #199 From Hype to Habit, #62 Reock/DX.
- **36)** Broader creation requires tighter review and governance — they rise together or the first becomes a liability. Sources: #69 Orr/Zapier, #162 Lowe/i.AI, #188 Linkov/Wisedocs, #207 Glenfield/DevDay.
- **37)** Activity-based metrics misread motion as progress in AI-augmented work. Sources: #79 + #195 Denisov-Blanch Stanford studies, #101 Arcolano/Jellyfish 20M PRs, #63 Hezarkhani/Tenex.
- **38)** Review capacity is the throughput limit of an AI-native organization. Sources: #623 Appleton/GitHub, #629 Zakariasson/Cursor, #54 Kanat-Alexander/Capital One.
- **39)** Alignment debt is the AI-native equivalent of technical debt. Sources: #623 Appleton/GitHub (load-bearing), #160 Stein/Teammates, #629 Zakariasson/Cursor.

Existing claims referenced in the chapter prose without re-registering (most cross-loaded of the four passes — this is the closing-arc chapter):
- **1)** Delegated execution (chapter opening: "AI does not simply make an organization faster. It moves where the scarce thing lives.").
- **3)** Reliability comes less from model cleverness than from surrounding scaffolding.
- **4)** Harness quality is a major determinant of coding-agent quality (cited via "a company is a harness for its own agents").
- **8)** Evals are a control system (cited via "review capacity is the throughput limit").
- **14)** The harness is evolving from a local loop into a staged software factory (Zakariasson Cursor framing).
- **16)** AI-native advantage depends on organizational coherence, not output volume alone (the chapter's broader thesis — kept distinct from the sharper new claim 35).
- **25)** Context engineering is a primary engineering discipline (cited via "context architecture engineers what the system sees").
- **28)** Context misassembly (cross-load from Ch 5).
- **34)** Per-tool OAuth flows are a governance problem (cited via the governance-and-review architecture thread).

## Quality signals
- All 4 packet-pre-extracted quotes (Shipper "10x difference…", Orr "Your support team should ship code", Appleton "None of our current tools give teams a shared space…", Appleton on going-fast-without-alignment) appear verbatim in the published prose with attribution.
- Section count 7 (1 lead + 5 named sections + closing "What this means for what endures"), within program's 6–10 range.
- The closing section explicitly stitches the whole book together: "Harnesses (Chapter 3) prepare the workplace. Evals (Chapter 4) measure the output. Context architecture (Chapter 5) engineers what the system sees. Runtimes (Chapter 6) carry the work across time and keep humans in control. Security and identity (Chapter 7) bound the authority. Realtime (Chapter 8) stress-tests all of it. Chapter 9's claim is that an organization is the macro-scale version of the same object."
- Handoff into Chapter 10 in place: "The final chapter asks what survives when the models, the tools, and the org charts have all turned over again."

## Unresolved questions
The packet listed 4 open questions; status of each after this pass (resolved by the existing prose):
- *How bold should the book be about role collapse and cross-functional code shipping?* → Resolved boldly. Lisa Orr's "Your support team should ship code" is the chapter's most provocative line and the prose leans into it rather than softening it.
- *Which ROI claims in the corpus are strong enough to foreground without overclaiming?* → Resolved by foregrounding only the large-sample studies (Denisov-Blanch Stanford 100k+ and 120k devs; Arcolano Jellyfish 20M PRs). Shipper's 10x figure is included as a *practitioner discontinuity claim* with explicit framing, not as a measurement.
- *Should hiring and org design get their own chapter or remain merged here?* → Resolved as merged. The hiring/comp threads (Hezarkhani, Glenfield) live as paragraphs inside the broader-creation-requires-tighter-governance argument rather than as standalone chapters. A separate org-design book may eventually exist; not in this manuscript.
- *Should the chapter introduce "alignment debt" as a core AI-native organizational failure mode?* → Resolved as **yes**, and promoted to a ledger claim (#39). The term is freshly coined and inherits authority from the well-established "technical debt" analogy; the ledger entry explicitly notes the analogy's imperfections.

## What this pass completes
With Ch 9 in Drafting status, the four-chapter program (5 → 8 → 7 → 9) is complete.

- **Drafting** (7 chapters): 1, 2, 3, **5**, **7**, **8**, **9**.
- **Outlined** (3 chapters): 4, 6, 10.
- **Starter** (0 chapters).

The book has crossed the threshold of "every promised chapter has prose under it." That has not been true since the manuscript was first announced.

## Next pass
- `source_anchoring_pass.md` against claims 25–39 from the four drafting passes. Total backlog: 15 claims, ~50–75 anchors. Recommended order:
  - **Ch 8 first** (claims 29) — packet pre-extracted anchors → paste-and-verify
  - **Ch 5 next** (claims 25–28) — anchor-from-scratch using `99_Meta/scripts/anchor/cli.py`
  - **Ch 7 next** (claims 30–34) — anchor-from-scratch
  - **Ch 9 last** (claims 35–39) — anchor-from-scratch; largest cluster
- After anchoring is closed: next milestone is moving chapters 4, 6, 10 from Outlined to Drafting. Their packets exist in `05_Book_Ideas/Chapter Packets v1/`. The drafting program runs cleanly against any chapter; the only question is order. Suggested: 6 first (runtime/control plane chapter, currently most cross-loaded from this session's passes), then 4 (evals, the chapter every other chapter cites), then 10 (closing arc).
