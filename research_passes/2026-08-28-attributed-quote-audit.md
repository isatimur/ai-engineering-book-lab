# Research Pass — 2026-08-28 — Every attributed quotation, checked

The book's premise is that no claim ships without a source anchor. This pass tests
that promise where it is easiest to break: **quotations attributed to a named person**.

## Method

`verify_prose_quotes.py` reports quoted spans that are not verbatim in any transcript
— 34 at the start of this pass. Most are benign by design (the author's own rhetorical
questions in quotes, illustrative dialogue, talk titles). The risk sits in the subset
that a reader would read as *"this named person said this"*.

So: for each unmatched span, locate it in the compiled manuscript and look backwards
~220 characters for an attribution verb bound to a capitalised name (`X says`,
`X insists`, `X puts it`, …). That mechanically separates "author framing in quotes"
from "putting words in a real person's mouth".

**5 of 34** unmatched spans were attributed to a named person. Each was then searched
across all 1074 transcripts, line-joined and case-insensitive.

## Findings

| # | attribution | verdict |
|---|---|---|
| 1 | Hetzel — *"an eval platform is not just a test runner."* | **fabricated** |
| 2 | Jack Morris — *"Stuffing context is not memory."* | talk title, not spoken |
| 3 | Matt Carey — *"mega context problem"* | talk title, not spoken |
| 4 | Somal — workflow-history quote | real; ellipsis landed mid-phrase |
| 5 | Rexmore — *"then Monday rolls around…"* | real; ASR drift mid-quote |

### 1. The fabricated quote, still present after being found once

*"an eval platform is not just a test runner"* appears in **none** of Phil Hetzel's
four talks, and the string `test runner` occurs in exactly one transcript in the whole
corpus — Tejas Kumar (IBM), saying something else entirely: ML-world harnesses are
*"kind of like a test suite and a test runner"*.

This quote was identified as fabricated earlier in the project and **was still in the
manuscript**. The likeliest reason is the trap documented below: it was fixed in
`public/drafting/`, which is generated, and the next sync regenerated it away.

The underlying argument is sound and Hetzel does support it — he describes how hard
comparison is: *"it's really challenging to be able to compare directly experiments
over time."* So the fix keeps the argument and drops the invented quotation marks
rather than deleting the passage.

### 2 & 3. Talk titles presented as speech

Both are real phrases from real talks — they are the **titles**:
`048-…-jack-morris-stuffing-context-is-not-memory-updating-weights-is` and
`622-…-mcp-mega-context-problem-matt-carey`. Neither phrase occurs anywhere in the
speaker's own transcript (Morris: 0 hits across 11,931 + 3,651 words).

Under this book's standard a title is not an anchorable quote — it may have been
written by a conference editor, and it was not said on stage. Both are now attributed
as titles.

### 4 & 5. Real quotes with cosmetic drift

Somal's line is genuine; the book's ellipsis cut *"go in and you can"*, leaving
post-ellipsis text that is not verbatim. Restored. Rexmore's is genuine with ASR
noise mid-quote. Neither is an integrity problem.

## Result

Unmatched spans 34 → 31. **Zero remaining unmatched spans are attributed quotations
that fail verification**; the two that still show as attributed are #4 and #5, both
confirmed present in their sources. All 294 anchors resolve.

## The process defect this exposes, which matters more than the quotes

`public/drafting/` is **generated**. The source of truth is
`05_Book_Ideas/Drafting Layer/AI Engineering Book - Manuscript Draft.md`, and
`sync_manuscript_to_public.py` rebuilds drafting from it.

Editing `public/drafting/` therefore *appears* to work — the file changes, greps
confirm it, a commit captures it — and the next sync silently reverts it. That is
almost certainly what happened to the first Hetzel fix, and it happened again to me
in this session before I caught it by grepping for my own edits and getting zero hits.

**Rule: prose edits go to the compiled manuscript, never to `public/drafting/`.**
A verification step of "grep for your own change *after* running sync" catches it.

## What this does not establish

That every *matched* quotation is correctly attributed — a quote can be verbatim in
the corpus and still credited to the wrong speaker; this pass only tested presence.
And it covers book 1 prose only; book 2's 16 unmatched spans were not triaged.
