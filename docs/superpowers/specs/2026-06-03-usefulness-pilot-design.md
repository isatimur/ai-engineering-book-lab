# Usefulness Pilot — Design Spec

**Date:** 2026-06-03
**Status:** Approved (verbal), pilot scope
**Topic surface:** `public/drafting/*.md` (canonical, MASH-judged) → propagate to `website/src/content/*.md`

## Problem

The MASH `usefulness` judge scores book-wide ~34 (vs humanness ~77). Its rubric is a
literal **"Monday test"**: *"could a working engineer change something on Monday because
of this paragraph?"* It rewards a paragraph containing **a decision, threshold, principle,
or named tool/trap** the reader can act on; it scores down landscape-description,
restatement, transitions, and "decorative metaphor with no operational lift."

The book is a synthesis/argument, so many paragraphs describe convergence without a
per-paragraph "do this" — hence the low score despite strong prose. The 700-talk corpus
is full of specific, actionable practitioner advice the chapters under-surface.

## Key mechanic (drives the approach)

`book-mash/corpus/loader.py` splits chapters into paragraph units on blank lines and does
**not** skip lists. The chapter usefulness score is a **per-paragraph average**. Therefore:
- An appended bulleted "takeaways" block = **one** scored unit → barely moves a ~15-paragraph chapter.
- Meaningfully raising usefulness requires giving **more existing paragraphs** operational lift → in-prose sharpening.

## Pilot

- **Chapter:** ch05 "Context Is Infrastructure" (usefulness 34.9) — representative technical
  chapter, corpus-rich with latent actionable content (RAG vs memory vs graph selection;
  progressive disclosure; KV-cache / context-assembly decisions). *Not* ch10 (the closing
  reflection is principle-not-action, atypical).
- **Approach (hybrid):**
  1. **Sharpen** the weakest landscape-describing paragraphs in place into decision /
     threshold / named-technique framing — *only where a source already in the chapter
     supports it* ("use X when Y", "the trap is Z").
  2. **Add** a concise "What to do with this" takeaways section (grounded bullets) — reader
     nicety + one strong unit.

## Hard fidelity rule

Every decision/threshold/action must trace to a source or claim **already in that chapter**.
Surface latent actionability the corpus supports; never invent advice. (Same posture as the
de-slop pass and the book's stated epistemics.)

## Validation

By inspection against the judge's Monday-test rubric, per changed paragraph. A true re-score
needs a MASH run (spend + the blocked throttling fix), so the pilot is eyeballed, not
re-judged — flagged honestly. Edits applied to `drafting/` then propagated to `content/`.

## Decision gate (after pilot)

Decide book-wide: hybrid everywhere · takeaways-only · or accept genre limits on reflective
chapters (ch10). Meta-trade-off to weigh: pushing usefulness up shifts the book toward
handbook-actionability, away from pure synthesis — author's call how far.

## Out of scope

- Re-running MASH to re-score (separate, needs spend + throttling fix).
- The other 9 chapters (book-wide rollout is the post-pilot decision).
