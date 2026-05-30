# Chapter 7 Drafting Pass — 2026-05-31

## Date
2026-05-31

## Target
Chapter 7 — Security, Identity, and High-Stakes Trust. Move from Starter status to Drafting status per `programs/chapter_drafting_pass.md`. Third execution of the program after Ch 5 (2026-05-28) and Ch 8 (2026-05-30).

## Pass type
Per-chapter bounded drafting. Unlike Ch 5 and Ch 8, this is an *extend* pass rather than a write-from-scratch pass: the Starter shell was already prose-quality (~33 lines, named speakers, a worked tax-prep failure case, a delegated-authority framing).

## Inputs used
- `05_Book_Ideas/Chapter Packets v1/07_Security_Identity_and_High_Stakes_Trust.md` — packet v1 (13-source cluster including new MCP-era sources #32 Tun Shwe, #624 Sampath/Anthropic, #625 Morrow/GitHub, #627 Galow/WorkOS).
- `website/src/content/chapter-07.md` — Starter shell, already prose-quality with named speakers (Hron, Hanson, Matin, Grinich-attributed-incorrectly).
- `public/drafting/Chapter 7 - Security, Identity, and High-Stakes Trust.md` — pre-existing scratchpad (overwritten with the extended draft).
- `claims/Claims Ledger.md` — to cross-reference against existing claims #2, #8, #11, #12, #13, #18, #28 (all Ch 7 candidate-chapters or directly relevant) and pick next claim number (30).
- `website/src/content/chapter-01.md` · `chapter-03.md` · `chapter-05.md` · `chapter-08.md` — voice reference. Now includes the Ch 5 and Ch 8 drafts from this session, which serve as the strongest in-corpus voice match.
- `website/src/data/bookChapters.ts` — Ch 7 entry for status flip.

## Outputs changed
1. `public/drafting/Chapter 7 - Security, Identity, and High-Stakes Trust.md` — full draft, ~5,200 words across 9 sections + draft note + status note + corpus-correction note.
2. `website/src/content/chapter-07.md` — public-safe mirror; prose only, no scratch notes.
3. `claims/Claims Ledger.md` — appended claims 30–34 (no anchors per program). Existing claims #2, #8, #11, #12, #13, #18, #28 referenced in prose without re-registering.
4. `website/src/data/bookChapters.ts` — Ch 7 status flipped Starter → Drafting.
5. This file.

## Claims registered
- **30)** Identity is a first-class engineering object for agentic systems. Sources: #37 Auth0 (Riley & Galan), #150 Hanson/Keycard, #627 Galow/WorkOS.
- **31)** Sandbox, least privilege, and auditability are product infrastructure, not security overhead. Sources: #152 Matin/OpenAI, #31 Agrawal/Cloudflare, #149 Jmo/Apple PCC, #86 Myshatyn/Los Alamos.
- **32)** Protocol standardization expands the attack surface if governance lags. Sources: #32 Tun Shwe/Lenses, #624 Sampath/Anthropic, #148 Mytton/Arcjet.
- **33)** Enterprise MCP adoption converges on gateways, blessed platforms, and a root of trust. Sources: #624 Sampath, #625 Morrow/GitHub, #150 Hanson.
- **34)** Per-tool OAuth flows are a governance and IT visibility problem, not just a UX annoyance. Sources: #627 Galow/WorkOS, #150 Hanson, #625 Morrow.

Existing claims referenced in the chapter prose without re-registering:
- **2)** Chat is an insufficient control surface (delegation-vs-suggestion).
- **8)** Evals are a control system (cited via the audit-as-trust-model section).
- **11)** Durable state and workflow semantics are trust features (cited via least-privilege-across-steps argument).
- **12)** Human oversight is an architectural layer (cited via approval flows + revocable scope).
- **13)** High-stakes systems tune agency instead of maximizing it (cited via the Hron tax-prep vignette).
- **18)** Context failure is a capability-exposure problem (cross-load from Ch 5; ties capability flood to standardization argument).
- **28)** Context misassembly is the next failure frontier (cross-load from Ch 5; cited indirectly in the "authority boundary collapse" framing).

## Quality signals
- All 5 packet-pre-extracted quotes (Auth0 "Identity for AI agents…", Tun Shwe "won't survive production", Sampath "establish a root of trust", Sam Morrow PAT-scope + step-up OAuth, Galow cross-app access as trust bridge) used verbatim with attribution.
- Section count 9 (delegated-authority frame + 8 packet-anchored sections), within program's 6–10 range.
- Chapter promise from Starter shell preserved as the opening four paragraphs ("Once AI systems can act, trust stops being only a question of model quality…"). The tax-prep worked example and the closing "power must have shape" beat are both preserved unchanged.
- Voice continuity with chapters 1, 3, 5, 8 verified — declarative cadence, named-speaker-then-quote pattern, no AI-slop hedging.
- Handoffs in place: into Ch 8 ("The next chapter takes the chapter-7 frame and stress-tests it under realtime conditions… what happens when they have to ship under a 200-millisecond clock"). Cross-load references to Ch 6 (durable state as trust) and Ch 5 (capability-exposure) embedded in prose.

## Corpus correction
The Starter shell cited "Michael Grinich describes shadow or scoped identities" — Grinich is the WorkOS founder, but the packet's actual WorkOS source is **#627 Garrett Galow** on cross-app access for MCP. The draft updates this to Galow with the cross-app-access reframing throughout. Grinich may appear in other corpus material (he has spoken publicly on agent identity), but until a Grinich talk is in `01_Videos/`, the corpus-source cite must be Galow. Logged for the next anchoring pass to consider whether a Grinich talk exists in the channel queue and should be ingested.

## Unresolved questions
The packet listed 4 open questions; status of each after this pass:
- *How security-heavy should the book become before it loses the primary engineering narrative?* → Resolved by anchoring security in identity + sandbox + governance (engineering primitives) rather than in threat modeling or compliance checklists. The chapter reads as engineering even when the topic is security.
- *Is high-stakes legal work the best framing example, or does code-executing security resonate better?* → Resolved as: use both. Hron's tax-prep vignette carries the boundary-collapse argument; Matin/Agrawal/Apple-PCC carry the sandboxing argument. They reinforce rather than compete.
- *Which security principles belong in the main text versus sidebars/checklists?* → Resolved as: main text only. The manuscript voice is essay, not handbook. No sidebars in this chapter; checklists deferred to a possible "operator playbook" derivative if/when the book has one.
- *Should cross-app access be framed as a likely future pattern or as one possible enterprise path?* → Resolved as: framed as the currently most-defensible enterprise path, not the only future. The "Caveats" line in claim 34 explicitly names alternatives (per-team gateway approval, single-vendor SaaS bundles, custom IT-managed proxies).

## Next pass
- `source_anchoring_pass.md` against claims 25–34 from the Ch 5 + Ch 8 + Ch 7 drafting passes. The Ch 7 packet's strongest claims do not arrive with anchor tables (unlike the Ch 8 packet), so the next anchoring pass for claims 30–34 will be a from-scratch grep job using `99_Meta/scripts/anchor/cli.py` against each video's plain transcript. Total to anchor: 10 claims with roughly 3–5 supporting sources each → 30–50 anchors.
- `chapter_drafting_pass.md` against Chapter 9 (The AI-Native Organization) — last in the program's drafting order (5 → 8 → 7 → 9). Ch 9 sweeps across the whole stack; benefits from 5, 7, 8 being in Drafting status when it draws from them.
