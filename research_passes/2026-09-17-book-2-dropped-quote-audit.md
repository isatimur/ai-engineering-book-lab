# Research Pass — 2026-09-17 — Book 2: ten dropped-quote candidates read, two defects

Follow-on to `2026-09-14-chapter-4-colvin-attribution-fix.md`, which fixed the book 1 hit from
`99_Meta/scripts/anchor/check_dropped_quotes_in_prose.py` and left book 2's ten unread.

## Method

One reasoning agent, propose-only, one candidate at a time. For each: locate the passage in
`public/drafting-2/`, find the commit that dropped the quote from `claims-2/Claims Ledger.md`
(`git log -S`), read the stated reason, then judge whether the prose still leans on the quote for
the thing the audit removed it for. Every claim behind a proposed edit was re-verified against the
primary transcript by hand before applying.

The precedent from book 1 was the instruction that mattered: the *flagged* quote was sound, and the
defect was the unquoted attribution in the sentence beside it. Both defects found here have that
shape.

## Result: 8 sound, 2 defects

Two of the ten were not removals at all. The audit had **widened** the quote string (NYT's "Our
puzzles are made by people" and Cormac Brick's "we are going to need tiny models"), and the
detector fired on the string change. Six more were genuine removals where the prose frames the
quote honestly as what it is — a project self-description, a stated goal, a definition, a
practitioner reporting their own build — and does not use it to carry a thesis the talk never
argues. Chapter 3's Poolside passage already carries an explicit disclaimer that the code-first
rationale is Kahn's and not Poolside's, which is a previous fix holding.

### Defect 1 — Chapter 7 recruited a success story into a cautionary tale

The chapter read "The practitioners who tried it say the opposite" and then quoted Jeff Schomay.
His talk is an unbroken success story: the prompt "worked really well most of the time", the
images "worked out great", and of the generated content, "it was fitting it was varied it was
interesting so I was happy with this". The chapter also asserted that "making the generated
content actually good is the problem that remains" — a taste thesis absent from his talk, and
narrower than what the audit had already scoped him to.

The passage also italicised the game as *Infinite Game*, a proper title. Across 1,589 words Schomay
never names it; the only "infinite" is "a game of infinite exploration". The name comes from the
**video title**. That is the book 1 defect exactly.

Rewritten so Schomay reports what he actually reports (the generation worked; the coherence
strained, with his own words on fine-tuning for consistent style), and the harder-half argument
moves onto the Meta talk, which does make it: removing the barriers "doesn't mean everybody can
make a good game", and what separates good from bad "is still a lot of the typical stuff". That
also retires a quotation of Meta's *talk title* that the old passage used as the caution.

### Defect 2 — Chapter 1 credited Kyle Corbitt with three rungs he never mentions

"**His** maturity curve runs from simple instruction prompting, through few-shot examples and
retrieval, and only then to fine-tuning — with reinforcement learning further still." Across 4,052
words Corbitt says none of it. Whole-talk counts:

| term | occurrences |
|---|---|
| retriev | 0 |
| reinforc | 0 |
| few shot | 0 |
| vector, embedding | 0 |

His curve has two rungs, and he gives three reasons for climbing from one to the other: "cost…
latency… and then the final one is actually the quality, particularly the consistency of the
quality". The four-rung ladder is the *ledger entry's* synthesis, and the retrieval rung is
sourced to Abi Aryan one paragraph later — so the chapter was double-counting a borrowed rung as
Corbitt's.

Rewritten to his two rungs and his three reasons. The following paragraph said Aryan "makes the
same map"; with Corbitt's curve corrected that is no longer true, so it now says Aryan **widens**
it. Nothing is lost: retrieval stays in the chapter, correctly attributed.

## Gates

Book 1 gates unaffected and still clean (`verify_ledger` 243/243, `check_quote_speakers` 81/0,
`check_title_quotes` 0). `check_book_consistency` section (a) PASS. Website tests 97/97.
`website/scripts/sync-second-book.mjs` copied both edited chapters into `src/content-2/` and the
old wording is gone from the generated copies.

Every quotation introduced or retained in the two edited passages was checked as verbatim in
`99_Meta/transcripts/plain/` and confirmed present in the shipped file. Book 2 uses straight
quotes, book 1 uses curly; the edits follow book 2.

## What this does not establish

- **Correction (same day).** This note first said book 2 had almost no mechanical quote coverage
  because the three gates "are book 1 only — they reject `--book 2`". That was wrong. They reject
  `--book` but take `--glob`, and their own docstrings give the book 2 invocation. Run properly,
  book 2 was already clean: `check_quote_speakers` 56/0 and `check_title_quotes` 0.
  The real gap was worse and duller: **none of these gates had ever run in CI, for either book.**
  They ran when someone remembered, which is why both defects above were found by reading, months
  after they shipped. Fixed the same day — see `.github/workflows/evidence-gates.yml`.
- **How the wrong claim happened, twice now.** Both times I inferred a capability gap from a failed
  probe instead of reading the thing. `--book 2` erroring did not mean book 2 was unsupported, and
  5,712 cached qwen entries did not mean that cache was intact (see the 09-09 note). Read the
  docstring or the write path before asserting an absence.
- **The detector's hit count will not fall.** Both fixes keep the flagged quote, because in both
  cases the quote was fine and the prose around it was not. The ten stay ten; they are now read.
- **Three of the eight sound verdicts rest on the removal reason alone.** The surrounding
  paragraphs were not re-verified line by line against transcripts, only the parts load-bearing for
  the audit's stated reason.
