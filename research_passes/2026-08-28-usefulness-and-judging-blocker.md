# Research Pass — 2026-08-28 — Can we re-judge with Claude, and is usefulness 55.7 real?

Two questions, both answered against primary evidence. No chapter prose changed.

## 1. Can Claude Code re-judge the book? No — and it should not.

**Mechanically blocked.** `mash_core/model_factory.py` supports
`BOOK_MASH_JUDGE_PROVIDER=anthropic` (it is the *default*), but the construction is
`AnthropicModel(model_name, api_key=os.environ["ANTHROPIC_API_KEY"])` — a hard
`KeyError` without that variable. A Claude Code session is not an API key: this
session's auth cannot be handed to book-mash, and no `ANTHROPIC_API_KEY` is set in
the environment or in a repo `.env`.

**And it should not be forced even with a key.** The published score line
(`panel-3model-v1..v8`) is the median of one fixed panel: deepseek-chat,
llama-3.3-70b, qwen-2.5-72b. Introducing a Claude judge produces a *different
instrument*, not a newer reading of the same one — its numbers would not be
comparable to v1–v8, and mixing them into `judge-scores.json` or the history array
would silently break the trend `/quality` plots. If a Claude panel is ever wanted,
it belongs in a separate, separately-named series.

A Claude-authored per-paragraph score set was considered and **rejected**: it would
look like a re-score, sit in the same file shape, and invite exactly that confusion.

## 2. Why the OpenRouter runs fail — my earlier diagnosis was wrong

I claimed twice that the blocker was concurrency, then that it was the key's **$15
daily cap**. Both are wrong, and the second would have sent the operator to the
wrong setting.

```
GET /api/v1/credits   -> total_credits: 58,  total_usage: 58.180765957
GET /api/v1/auth/key  -> limit: 15, limit_remaining: 13.92, limit_reset: daily
```

**The account is overdrawn.** Usage exceeds purchased credits by about $0.18. The
key's "$13.92 remaining" is a per-key *budget knob*, not money — it can show a
healthy allowance over an empty account, which is precisely what misled me.

This explains every observation the concurrency story could not:

| observation | explained by |
|---|---|
| fails identically at `HEAVY=12`, `2`, and the shipped `1` | not concurrency-dependent at all |
| qwen returned **396 nulls twice**, byte-identical | deterministic: same oversized units fail every time |
| a single 32k-token call **succeeds** | small worst-case reserve clears a near-zero balance |
| `claim_defensibility` hit hardest (209–444/572) | it bundles the whole ledger — the largest reserve of any judge |
| ~$14 "remaining" while calls 402 | the knob is not the balance |

`402 in_flight_budget_exhausted` fires when a request's **reserved worst-case cost**
exceeds available account credit. At a balance of roughly zero, only cheap requests
clear.

**Correct operator action: add credits to the OpenRouter account.** Raising the
key's daily cap would change nothing. Until then v8 stands, and it is valid.

## 3. Is usefulness 55.7 a real weakness? Mostly yes.

This was the open question worth settling, since the number is the lowest on the
board and never moves between runs.

**It is not a stuck cache artifact.** The v8 distribution is **bimodal**, and the
mean sits in the valley between the two modes — it describes almost no real
paragraph:

| band | n | share |
|---|---|---|
| strong (80–100) | 187 | 35% |
| moderate (50–79) | 126 | 23% |
| weak (20–49) | 163 | 30% |
| fail (0–19) | 61 | 11% |

**Correction (2026-08-28, same day): the segmentation defect reported here does not
exist.** This section originally claimed two units scoring 0 were a markdown heading
(`## Constraints are a form of care`) and a four-word fragment, and derived a
"56.0 → 58.1" cleaning effect. That was an error of method.

Those unit ids came from `panel-3model-v8`, scored on snapshot **`e741`**. I resolved
their line numbers against the manuscript as it stands today (**`d473`**). Line ranges
had shifted between versions, so I read unrelated text and described it as the scored
unit. **Never resolve a unit id against a different snapshot than the run that
produced it.**

Asked directly, book-mash's loader produces **zero heading units**: `_load_chapter`
matches H1/H2/H3 and `continue`s, so a heading can never be flushed as a paragraph.
The defect was mine, not the tool's.

Recomputed against the agent run, whose snapshot matches the current files:

| unit kind | n | mean |
|---|---|---|
| headings | **0** | — |
| fragments (<12 words) | 35 | 20.6 |
| prose | 537 | **57.0** |
| all units | 572 | 54.8 |

The real cleaning effect is **54.8 → 57.0, about +2.2**, from excluding 35 short
fragments — the same order as the wrong number, reached honestly. Fragments are real
units of the manuscript (one-line landings, list stems), so excluding them is a
reporting choice, not a bug fix.

answer; it is not. Headings score near the mean, so only the 52 fragments drag, and
not by much.

**Conclusion: the score is substantially real.** 430 genuine prose paragraphs
average 57.0 — the rubric's "moderate: provides framing useful for later
application", just above "weak: descriptive only, no actionable lift". The honest
reading is that roughly a third of the book's paragraphs are strongly actionable and
roughly a third are descriptive.

The judges' low-end reasoning is also *correct* where it is not a segmentation
artifact — the recurring citation is "meta-commentary about the book's structure",
"transition prose", which the rubric explicitly defines as fail-band. Chapter
openers that announce what the chapter will do genuinely carry no operational lift.

## What this does not establish

Whether 57.0 is a *good* number for a book of this kind — there is no baseline to
compare against, and the rubric is calibrated to "can an engineer apply this on
Monday", which no book satisfies in every paragraph. Whether the wide judge spread
(66.2 / 46.2 / 51.8 across the three models) means the rubric is ambiguous — that
needs a variance run with a cache nonce, which `book-mash measure` still has no flag
for (`docs/judge-module-evaluation.md` already names it as the missing instrument).

## Recommended follow-ups, not started

1. ~~Exclude headings from paragraph units in the corpus loader.~~ **Withdrawn** —
   there are no heading units; see the correction above.
2. **Decide whether transition prose should be scored at all.** It is honestly
   fail-band under this rubric, but every book needs some, so it may belong in the
   already-existing `usefulness_connective` split rather than the headline mean.
3. **Add credits** if a current panel reading is wanted; otherwise keep v8.
