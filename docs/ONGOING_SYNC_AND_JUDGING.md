# Ongoing Sync and Judging Note

Purpose: keep future video ingests honest against the book’s current claims instead of letting new material accumulate as disconnected notes.

## When a new ingest lands
For each materially relevant video or cluster:
1. **Classify the delta**
   - new evidence for an existing claim
   - caveat against an existing claim
   - genuinely new claim that needs a ledger entry
   - hype/noise that should not move the manuscript
2. **Attach it to one layer**
   - chapter draft
   - claims ledger
   - evidence pack
   - public-safe derivative
3. **Record one judgment**
   - strengthens
   - complicates
   - narrows
   - no meaningful manuscript impact

## Judgment rubric
Use these questions before changing prose:
- Does this source move an existing claim from moderate to strong?
- Does it add a real caveat the book should acknowledge?
- Does it sharpen a blurry concept into a more operational one?
- Does it improve a public-safe derivative enough to justify updating it?
- Is this just another example of a pattern the manuscript already covers?

## Minimal update template
- **Source(s):**
- **Affected claim/chapter:**
- **Judgment:** strengthens | complicates | narrows | no impact
- **What changed in the manuscript:**
- **What stayed intentionally unchanged:**

## Current watch-areas
1. **MCP / skills / tool discovery**
   - watch for evidence about capability packaging, progressive disclosure, and distribution/governance
2. **Observability / eval convergence**
   - watch for trace-linked evaluation, production feedback loops, and privacy tradeoffs
3. **Durable / evented runtimes**
   - watch for concrete pause-resume, replay/snapshot, approval, and multi-agent coordination evidence
4. **AI-native organizations**
   - watch for evidence about review bottlenecks, coherence surfaces, and institution-wide operating models

## Anti-drift rule
If a new source only restates an already strong claim, prefer updating the evidence pack or ledger rather than touching chapter prose again.

## KB pipeline map (operating contract, 2026-08-01)

Every corpus pipeline, its trigger, and its storage class. A new session
should be able to operate the whole KB from this table.

| Pipeline | Trigger | Storage class | Freshness gate |
|---|---|---|---|
| Video ingest (notes+themes+synthesis) | nightly 07:00 UTC detect → **auto-ingest + PR when missing > 0** (manual `mode=check`/`mode=ingest` still available) | committed | channel-watcher issue auto-closes at 0 missing |
| Transcripts (raw VTT + plain) | ingest fetches; `ingest_ai_engineer_videos.fetch_transcript` backfills | **local-only** (gitignored) + private mirror `isatimur/ai-engineer-corpus-transcripts` | recount vs notes after ingest; push mirror |
| Whisper rescue (caption-less videos) | manual, local `whisper` base.en | local + mirror | permanent captions gap only |
| Video descriptions | ingest workflow step (`fetch_video_descriptions.py`, resumable) — runs on every nightly ingest | committed (`99_Meta/video-descriptions.jsonl`) | gaps = new videos only |
| Shared Artifacts registry + note sections | ingest workflow step (`build_shared_artifacts.py`, idempotent) — runs on every nightly ingest | committed | regenerated every ingest |
| Stats / evidence / sitemap / llms.txt | push-triggered CI (`stats-regen`, `evidence-regen`) + website prebuild | committed / build-time | CI |
| Manuscript↔site sync, audio, scores | `check_book_consistency.py` (CI + local) | committed | 3 gates; audio+scores regen are **key-gated** (`OPENAI_API_KEY`/`ELEVEN_API_KEY`, `OPENROUTER_API_KEY`) |
| Diagrams | `scripts/sync-diagrams.sh` (stale-aware) | committed | `diagrams-check` CI |

### Hard constraint: per-video fetches cannot run on CI

YouTube blocks datacenter IPs for **per-video** requests. On GitHub-hosted
runners the flat channel inventory listing succeeds, but transcripts and
descriptions come back empty — CI-created notes land with
`transcript_status: unavailable` and no transcript files. Verified 2026-08-04
(run 30933173400).

Consequence: **the nightly ingest is a detector and note-scaffolder; a local
pass is what completes the corpus.** After any CI ingest, run locally:

```bash
python3 99_Meta/scripts/update_ai_engineer_channel.py     # notes + transcripts
python3 99_Meta/scripts/fetch_video_descriptions.py       # descriptions
python3 99_Meta/scripts/build_shared_artifacts.py         # registry + note sections
python3 99_Meta/scripts/backfill_transcripts.py            # premiere-stranded notes
python3 99_Meta/scripts/corpus_health.py                  # confirm zero debt
python3 scripts/check_claims_integrity.py                 # anchors + prose quotes
cd 99_Meta/transcripts && git add -A && git commit -m sync && git push
```

Prefer running the local pass *instead of* merging the bot PR — the local run
produces correct frontmatter from the start rather than backfilling around a
stale `unavailable` status. `corpus_health.py` exists so this debt is never
invisible; it runs as the last step of the ingest workflow.

Permanent gaps (not debt): #783 went private upstream; #417 has no captions
(Whisper-transcribed locally instead).

**Premiere-stranded transcripts:** the channel inventory lists premieres days
early, so a note can be created before its video airs. Ingest only visits videos
with no note, so those never get a transcript later. Run
`python3 99_Meta/scripts/backfill_transcripts.py` after any ingest — it fetches
transcripts for existing notes that lack them and corrects their frontmatter.

### Prose quotes: a candidate-flagger, not a gate

`99_Meta/scripts/anchor/verify_prose_quotes.py` checks quoted spans in chapter
prose against the transcripts — the surface the ledger verifier does not cover.
Book 1 at 2026-08-26: **76 of 110 spans verified** in a transcript.

The other 34 are **not** a defect list, and the reason matters: **the transcript
is ASR output, not ground truth.** Chapter 8 quotes "voice-to-voice response
chain" where its transcript reads "voicetooice uh response chain" — the book is
more accurate than the thing it is being checked against. Of the 34: 8 are
question-form spans (the author's own framing in quote marks), 8 are short
fragments, and 18 are longer spans worth a human read. Treat it as a reading
list, never as a build gate.

**Book 2 checked 2026-08-27: 46 of 62 spans verified, no fabricated quotes.**
Its 16 misses are talk titles in quote marks (legitimate) and cases where the
book *corrects* ASR mangling — it prints "TurboTax" where the transcript has
"Turboax", and "GPT-4" where the transcript has "GPD 4". Worth noting that the
fast-drafted second book came through clean while book 1, written slowly,
carried one fabricated quotation (Ch4, fixed in fabaf7d). Care of drafting and
quote fidelity turned out to be independent.

### Quote fidelity: one command for both books

```bash
python3 scripts/check_claims_integrity.py          # both books, anchors + prose
python3 scripts/check_claims_integrity.py --book 2 # one book
python3 scripts/check_claims_integrity.py --strict # prose misses fail too
```

Status at 2026-08-27: **book 1 anchors 198/198, book 2 anchors 93/93**, prose
76/109 and 46/62. Exit 1 on any unresolved **anchor** — that is a hard defect.
Prose misses only fail under `--strict`, because a chapter legitimately differs
from an ASR transcript.

The two verifiers below still exist and are what this calls; use them directly
when you want one surface.

### Anchor verification is local-only, and must be run by hand

Nothing in CI verifies that a Source Anchor still resolves to its quote, and
nothing can: transcripts are gitignored, so a workflow version of this check
would pass vacuously on an empty transcript directory. Run it locally as part
of any claims work:

```bash
cd 99_Meta/scripts/anchor
python3 verify_ledger.py                                    # book 1
python3 verify_ledger.py --ledger "claims-2/Claims Ledger.md"   # book 2
```

State at 2026-08-25: **book 1 198/198, book 2 93/93.**

Two things learned building it:

- **The word-stream matcher loses confidence on long quotes** that span many
  caption cues. Two book-1 anchors were reported as failures while being
  present verbatim. The verifier now falls back to a normalised full-text
  search of the plain transcript before declaring rot — the same question a
  human asks ("are these words in this talk?"). Without that fallback the tool
  produces false alarms that send people editing correct ledgers.
- **One real defect was found and fixed.** A book-1 quote read "I want to to
  pay less" where the transcript says "I want to pay to to pay less" — a quote
  tidied during editing, exactly the drift the ledger rule ("never paraphrase a
  quote") exists to prevent. Corrected to verbatim.

### Re-scoring while chapters move: what the 2026-08-22 run taught

Gate (c) was cleared with the canonical panel (`panel-3model-v8`). Three things
are worth knowing before the next re-score:

1. **Never accept the dry-run's default judge.** `book-mash measure --dry-run`
   reports `claude-sonnet-4-6` and about $15.89. That model is *not* the
   canonical panel, and using it would make scores incomparable with v1–v8. The
   planner's cost table is hardcoded and its own comment says it will "disagree
   with reality" once models are swapped. Set
   `BOOK_MASH_JUDGE_PROVIDER=openrouter` plus `BOOK_MASH_JUDGE_MODEL=<model>`
   and run once per model:
   `deepseek/deepseek-chat`, `meta-llama/llama-3.3-70b-instruct`,
   `qwen/qwen-2.5-72b-instruct`. Real cost was **$1.28 across two attempts**,
   and only **$0.09** for the final set once the content-hash cache warmed.
2. **All three runs must share one `corpus_snapshot_hash`, and `panel_merge.py`
   enforces it.** The first attempt was refused: another session committed
   chapter edits mid-run, so deepseek scored snapshot `12a0`, llama and qwen
   scored `104a`, and the live manuscript had already moved to `e741`.
   Medianing across manuscript versions would describe no actual book. Check
   the hash before merging, or expect the refusal.
3. **The gate reads git commit dates, not file mtimes.** Regenerating
   `judge-scores.json` without committing it leaves the gate reporting DRIFT.

### Concurrency: the 2026-08-28 run (why a run can take an hour or 90 seconds)

A fourth thing, learned the expensive way. `book_mash/runners/measurement.py`
defaults to `BOOK_MASH_CONCURRENCY=3` and **`BOOK_MASH_HEAVY_CONCURRENCY=1`**.
Those defaults are sized for Anthropic's tight tokens-per-minute ceiling, and
the second one **serializes** the two large-prompt judges (`humanness`,
`claim_defensibility`) — well over a thousand sequential calls. On OpenRouter
that is pure waste, and the module's own comments say so: they recommend
`BOOK_MASH_CONCURRENCY=16` and `BOOK_MASH_HEAVY_CONCURRENCY=12` for providers
with generous limits, and note these are throughput knobs, not coverage ones,
so scores stay comparable across runs.

The first attempt ran **over an hour without finishing**. With the two env vars
set, the same judge finished in about **90 seconds**. Set them:

**Use the shipped defaults (`3` / `1`). Do not raise them on this key.**

```sh
# no concurrency env vars at all — the defaults are correct here
export BOOK_MASH_JUDGE_PROVIDER=openrouter BOOK_MASH_JUDGE_MODEL=<model>
```

Concurrency is **not** the variable. Three settings — `16/12`, `6/2`, and the
shipped `3/1` — all failed identically on 2026-08-28, and qwen returned **396 nulls
twice, byte-identical**. The real cause is an **overdrawn OpenRouter account**:

```
GET /api/v1/credits  -> total_credits: 58,  total_usage: 58.18   # <- the money
GET /api/v1/auth/key -> limit: 15, limit_remaining: 13.92        # <- a budget knob
```

`limit_remaining` is a per-key allowance, **not** a balance; it happily reports $13.92
over an empty account. `402 in_flight_budget_exhausted` fires when a request's
*reserved worst-case cost* exceeds available credit, so at a near-zero balance only
cheap requests clear — which is why `claim_defensibility` (it bundles the whole
ledger, the largest prompt of any judge) failed hardest at 209–444/572, while a
single 32k-token test call succeeded.

**Fix: add credits to the account.** Raising the key's daily cap does nothing.
Leave the concurrency defaults alone.

The damage was invisible in the run summary: every run reported
`Status: completed`, and the book-level heatmap printed a plausible
`claim_defensibility` of 94. Underneath, that dimension was mostly error rows —
deepseek 306/572 null, llama 444/572, qwen 435/572 — and the surviving score
came from whichever minority of units happened to succeed.

**The one check that catches this** (the summary will not):

```sh
# per-dim null count must be 0 for every member run
python3 -c "import json,collections,sys; d=json.load(open(sys.argv[1]))['scores']; \
print(collections.Counter(s['dim_name'] for s in d if s.get('score_0_100') is None))" \
  .book-mash-runs/<run-id>/scores.json
```

And in the merge output, **`panel-error / <2 votes` must be near zero**. A healthy
run reports 3; the broken one reported 489. That line is the load-bearing
signal — a "completed" status is not.

The heavy semaphore is not redundant with `_CONCURRENCY`: it exists *because*
raising it costs coverage. The module's own run-4 note (humanness 70%,
claim_defensibility 71%) documents the same failure from the other direction.
Read "throughput knob, not a coverage one" as applying to `_CONCURRENCY` only.

Two diagnostics, because the run is silent by default:

- **Output is fully buffered** — an empty log is normal, not a hang. Use
  `PYTHONUNBUFFERED=1`, or confirm progress out-of-band.
- **A genuinely stuck run has zero TCP connections.** `lsof -p <python-pid> |
  grep -c TCP` should show your concurrency setting. Zero CPU *and* zero
  connections is the wedge the per-unit wall-clock cap exists to catch;
  low CPU with N connections open is just network-bound, which is normal.

### Cache replay is not re-judgment — measure it

`panel-3model-v9` returned book-level numbers nearly identical to v8
(humanness, usefulness and evidence_density matched to one decimal). That is
**not** evidence of a stable judge: 74.3% of unit scores were replayed from the
content-hash cache because the paragraph text had not changed. The llama run
cost $0.0015, which is the tell.

Before reading a delta as a quality signal, measure the replay fraction —
compare non-derived unit scores between the two runs and count identical pairs.
In v9 the 453 fresh judgments were concentrated in `claim_defensibility` (435),
which bundles the ledger, and the ledger had just changed. That is the
correct behaviour for a content-hash cache, but a run summary alone cannot
distinguish it from a re-judgment. `docs/judge-module-evaluation.md` already
names the missing instrument: a "% identical (cache-replay)" indicator.

**Consequence, and it mirrors the audio policy above:** while chapters are being
actively edited, a scores run is stale within hours — the corpus moved three
times in roughly two hours during this run. Re-scoring on demand is cheap and
worth doing when you want a current reading, but a DRIFT on gate (c) shortly
after a re-score is **expected**, not a defect. The permanent fix is the same as
for audio: score once chapters freeze.

### Empty responses from llama are a routing problem, not a budget one (2026-09-03)

With a funded account, `meta-llama/llama-3.3-70b-instruct` still returned
`UnexpectedModelBehavior: Received empty model response` on roughly 60% of fresh
calls, twice in a row. It looked deterministic — the same 200 units failed both times —
but that was an artefact of the cache: a rerun only re-calls the failures, and 60% of
those fail again.

Replaying the failing units through the real judge with the raw response logged
settled it: under concurrency OpenRouter spills this model to **Novita**, which
answered **34 of 34** tool-calling requests with neither content nor a tool call.
**AkashML** answered **40 of 40** correctly, including the same units. Not context
length (failing paragraphs were *shorter* than passing ones), not prompt content (all
succeeded in isolation), not credit (balance intact throughout).

Fix that keeps the instrument unchanged: pin the upstream provider at the HTTP
client. Model slug, prompts, settings and cache keys are untouched, so scores stay
comparable with v1–v8. There is no env knob for this in `mash-core` yet; the run-time
shim lives at `/tmp/book-pass/measure-pinned.py` and injects
`provider: {order: ["AkashML","Groq"], allow_fallbacks: false}` into every request:

```sh
BOOK_MASH_JUDGE_PROVIDER=openrouter BOOK_MASH_JUDGE_MODEL=meta-llama/llama-3.3-70b-instruct \
OR_PROVIDER_ORDER=AkashML,Groq poetry run python measure-pinned.py measure --config <book>/book-mash.toml
```

`qwen/qwen-2.5-72b-instruct` has only two OpenRouter endpoints (DeepInfra, Novita),
both 32k context. `deepseek/deepseek-chat` needed no pin.

**And the mid-run corpus move happened again.** A peer session committed two
integrity fixes to Chapters 5 and 10 while the panel was running, so the first two
member runs (snapshot `54c7`) described superseded text and had to be redone on
`7c61`. The cache made that cheap (deepseek $0.009), but it is the same failure the
2026-08-22 note records. Before a panel run, check `ListAgents`/who else has the repo
open, and re-check the snapshot hash of every member before merging —
`panel_merge.py` refuses a mismatch, which is the last line of defence, not the first.

Two more facts from the same night. The claim-defensibility prompt is **~11k tokens**
(54 ledger entries), well inside every provider's window — context length was ruled out
for qwen too. And the shipped `3/1` concurrency is why a member run takes 60–90 minutes:
qwen answers in 3–8 s but humanness and claim_defensibility run one at a time. With a
funded account that is the only reason to raise `BOOK_MASH_HEAVY_CONCURRENCY`; for llama,
raise it only together with the provider pin, since load is what spills it to Novita.

**Cache replay carried stale unit ids — fixed in book-mash `bb6b1fb`.** The first
v9 merge reported `panel-error / <2 votes: 97` although every member had zero nulls.
Cause: the content-keyed cache returned each `JudgeScore` with the `unit_id` it had when
first cached, so paragraphs whose text was unchanged but whose line numbers had moved
were reported under old ids (263–334 per member), and members with different cache
coverage could not be aligned. Chapter and book rollups were never affected (the
chapter slug is inside the id); paragraph identity was. Cache hits now carry the current
id; a regression test shifts a chapter's lines between runs. Any earlier run that mixed
cache replay with fresh calls — v9's predecessors included — has this per-paragraph
caveat.

### Audio-freshness drift is ACCEPTED policy, not debt (operator decision, 2026-08-21)

**The audiobook is regenerated only once the chapters are final and no longer
changing.** Until then, gate (b) in `check_book_consistency.py` will report
audio DRIFT whenever a chapter is edited, and that is the correct, expected
reading — not a problem to fix and not a task to pick up.

Consequences to respect:
- Do **not** re-render audio to make the gate green. A green gate bought by
  re-narrating text that is about to change again is wasted spend and a false
  signal.
- Do **not** suppress or special-case the gate. It is accurately reporting that
  audio is behind the text; the drift is simply authorised. Hiding it would
  cost the one thing the gate exists to provide.
- When chapters do freeze, regenerate once, then the gate returns to PASS and
  stays there.
- Gate (c), scores freshness, is a **separate** matter and is *not* covered by
  this policy — it is blocked only on `OPENROUTER_API_KEY`.

Deviation ledger: audiobook currently edge-tts interim (see memory/commit
cb503c0), and re-rendering is deferred by the policy above rather than by the
missing key alone; the note-quality enrichment pass is complete for all
ledger-cited notes and for the newest wave (#984-1047), with ~787 uncited
notes corpus-wide still on ingest boilerplate by design.
