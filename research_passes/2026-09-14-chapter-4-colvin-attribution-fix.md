# Research Pass — 2026-09-14 — Chapter 4: a framing credited to a talk that never gave it

Triggered by `99_Meta/scripts/anchor/check_dropped_quotes_in_prose.py`, the gate added on
2026-09-13 that compares quotes the ledger has dropped against quotes the chapters still print.

## What the gate found

One candidate in book 1: Colvin's "We still want to build reliable scalable applications and
that is still hard", removed from claims#8 by the 09-04 audit (`8a04465`) and still in Chapter 4.

Reading the passage turned up a second, worse problem the gate could not name. Chapter 4 opened a
paragraph with "This is why human-seeded evals matter so much. Samuel Colvin's framing is useful
not because it romanticizes manual labor, but because it reminds us that humans are often the only
reliable source of task realism early on."

Talk #184 is titled *Human-seeded evals*. Its content is not. Across 2,302 words the word "eval"
appears twice, both times to disclaim it: "I'm not going to be able to get to the eval stuff
today" and "I won't talk about how eval split in because I don't have time." The words
"human-seeded", "seeded", "test set" and "benchmark" appear zero times. The talk is about Pydantic
and type safety. The 09-04 audit had already reached this conclusion from the other direction and
recorded it in claims#9.

So the chapter credited a named person with a substantive position sourced from nothing but his
talk's title, and "human-seeded" — a phrase appearing exactly once in the whole manuscript —
arrived the same way.

## What changed

One paragraph. The claim is real and the ledger already found the right source for it: claims#9
now cites Colvin from a different talk, #657, where he states the practice directly. The sentence
now carries that quote instead of the title-derived framing.

Chapter 4: 3,823 → 3,823 words. The old sentence also asserted humans are "the only reliable
source of task realism", which no source states; the replacement says what Colvin says.

## What was left alone, and why

The quote the gate actually flagged **stays**. "We still want to build reliable scalable
applications and that is still hard. Arguably it's actually harder with Gen AI than it was before"
is verbatim in #184, and Chapter 4 uses it under *Reliability got harder, not easier* for exactly
what it says. The audit removed it from an evals claim because it is not eval evidence; it was
never wrong as reliability evidence. The gate documents itself as a candidate detector at roughly
one-in-six precision, so a standing hit that has been read and judged sound is the expected
outcome, not a failure.

Colvin's other two appearances were checked and stand: the "mark its own homework" line is in #184
(the manuscript cleans up a stutter), and the longer-running-workflows line is from #99, a
different talk on its own subject.

## Gates

`verify_ledger` 243/243, `check_quote_speakers` **81/0** (up from 80 — the new quote is now
speaker-checked and passes), `check_title_quotes` 0, `verify_prose_quotes` 30 unmatched
(unchanged), website tests 97/97, sync round-tripped into all three generated copies.

No panel re-measurement: the OpenRouter balance is exhausted. Chapter 4's scores are unaffected by
a one-paragraph edit at identical word count, but they are now measured against slightly older
text, and Chapter 4 will badge stale on its next build like Chapter 2 did.

## What this does not establish

- **Book 2 has ten of these and none have been read.** Same gate, `--book 2`: ten dropped quotes
  still in prose, mostly company mission statements and talk openers, which is the same defect
  class. That is its own pass.
- **No gate catches this class.** `check_title_quotes.py` fires only on *quoted* spans matching a
  talk title. This was an unquoted attribution of a "framing" to a title-only source, and the only
  reason it surfaced was a neighbouring quote being dropped from the ledger. First instance, so no
  regression test yet; a second one should force the rule.
- A very old `--since` gives a false zero, because the removed-quote set is a diff against that
  commit's ledger. The finding is stable across every baseline from `a7de746` forward.
