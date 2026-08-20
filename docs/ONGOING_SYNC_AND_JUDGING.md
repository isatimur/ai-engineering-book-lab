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

Deviation ledger: audiobook currently edge-tts interim (see memory/commit
cb503c0) pending OpenAI onyx re-render; note-quality LLM enrichment pass is
specified in `programs/note_enrichment_pass.md` and not yet run.
