# Localisation — design note

Not built. This states what shapes the design, measured rather than assumed,
so the scope decision is an informed one.

Status 2026-11-14: the site has **no i18n anything**. 21 dependencies, none of
them i18n; `index.html` hardcodes `<html lang="en">`.

## The constraint that decides the architecture

**Quotes cannot be translated.** Measured across both manuscripts:

| | words | quoted spans | words inside quotes |
|---|---|---|---|
| `public/drafting` (book 1) | 32,906 | 112 | 1,398 (4.2%) |
| `public/drafting-2` (book 2) | 15,047 | 67 | 1,209 (8.0%) |
| **total** | **47,953** | **179** | **2,607 (5.4%)** |

Every one of those spans is verbatim speech from an English tape, verified
against it by `verify_ledger`, `verify_prose_quotes`, `check_quote_speakers`,
`check_title_quotes` and `check_credited_unmatched`. Translate a quote and all
five stop applying — not fail, *stop applying*, because there is no Russian
tape to check against.

The Lab's claim is that the method is source-backed and the backing is
machine-checkable. A translated edition that translates its quotes keeps the
claim and loses the checking. That is the one outcome to avoid.

**So: translated prose, English quotes, translation of the quote alongside it.**
A reader sees what the speaker actually said and what it means. The gates keep
working because the English span is still there, verbatim, to be found.

This needs a gate of its own — every English quoted span in a source chapter
must appear, untouched, in its translation. Without it the first careless
translation pass silently dissolves the evidence layer, and nothing would
notice.

## The trap in the pipeline

`public/drafting/` and `website/src/content/` are **generated**.
`sync_manuscript_to_public.py` maps chapter number → file by matching
`^Chapter\s+(\d+)\b` over `iterdir()`, then writes English prose to whatever
that key points at:

```python
mapping[int(m.group(1))] = p   # last match wins
```

A translation filed as `Chapter 01 - Foo.ru.md` next to `Chapter 01 - Foo.md`
matches the same pattern, can win the key, and is then **overwritten with the
English chapter** on the next sync. Verified, not guessed.

Translations therefore live outside the generated directories, in a source
location of their own, and reach the site through the sync rather than around
it.

## Suggested phases

Ordered so that each is useful alone and the risky one comes last.

**1 — chrome.** ~56 UI literals across 8 components and 20 pages, a locale
route prefix, and a real `lang` attribute. No evidence risk: nothing here
quotes anybody. This is also where the i18n dependency choice gets made.

**2 — apparatus.** Claim headings, support levels, evidence-rail labels,
nav. Touches ledger vocabulary, so `CONTEXT.md` terms need target-language
equivalents fixed once and reused — the same discipline the English glossary
already imposes.

**3 — chapters.** 47,953 words, and the phase that needs the quote-fidelity
gate above in place *before* it starts, not after.

## Open, for the operator

1. **Which languages?** Russian is the assumption here, from the working
   language of the sessions, but nothing in the design depends on it.
2. **How far?** Chrome only is a weekend. All three phases is a translation
   project with a standing maintenance cost: every English edit re-stales its
   translation, exactly as prose edits re-stale panel badges today.
3. **Machine or human translation?** It decides whether phase 3 needs a review
   loop, and the honest answer may differ for chapters and for the apparatus.
