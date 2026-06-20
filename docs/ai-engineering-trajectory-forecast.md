# The AI Engineer's Journey — a corpus-grounded trajectory forecast

*Derived from the 767-video AI Engineer YouTube corpus (`01_Videos/`). Generated 2026-06-20.*

## Method (and its honest limits)

- **Time axis:** `playlist_index` 1→767 (oldest→newest). The channel publishes no
  per-video upload dates in the flat inventory, so this is an **ordinal** timeline,
  not calendar time. Bins are equal-count slices of the chronology.
- **Primary signal: video-title keywords.** Title terms are independent of the
  theme-tagger. (The auto-assigned `themes:` over-weight the "big-3" — Coding
  Agents / Agent Architecture / Evals — on recently ingested videos, so raw theme
  counts overstate the recent spike. Titles are the honest measure.)
- **Secondary signal: theme tags**, used only for the robust mid-corpus trends.
- **Not used: TimesFM.** It forecasts long, dated numeric series (hundreds of
  points). Our derived series are 6–8 noisy ordinal bins — running a foundation
  forecaster on them would manufacture false precision. A literal TimesFM run
  would require fetching real upload dates (767 per-video yt-dlp calls) to build
  monthly per-theme series; only then would model-based forecasting be defensible.

## Title-keyword prevalence over the chronology (% of videos per bin, old→NEW)

```
keyword                B1 B2 B3 B4 B5 B6   recent
agent(s)                26 26 37 35  9 38   ↑↑ +12pp   <- the spine of the field
coding/code             31 12 13 12 20 16   ↓  -6pp    foundational, steady
production/scale         9  6 12  5  9  9   ·  +2pp
context/memory+rag       5  7 11  8  8  8   ·  +2pp
eval/test                7  5 10 12  5  9   ·  +2pp
MCP                      3  3  9  1  2  6   ↑  +3pp     episodic, structural-trending
RL/training              5  2  2  6  4  5   ·  +2pp
voice/realtime           2  6  4  4  3  4   ·  -0pp     durable niche
security/trust           4  3  5  4  5  2   ·  -1pp
multi-agent/orchestr     3  2  3  4  1  1   ·  -2pp
```

## Theme-tag trends (robust mid-corpus signal)

- **Org Design & Leadership:** very high early (~40% of videos), declining late.
- **RAG & Retrieval:** rose to a peak (~31%) mid-corpus, then fell sharply —
  absorbed into the broader "context engineering," not abandoned.
- **Coding Agents / Evals & Reliability:** persistent throughout, surging recently.

## The three phases (the journey so far)

1. **"AI changes how we work."** Roots: org design, leadership, coding
   fundamentals. The conversation was human/team adaptation.
2. **"Make the model useful."** The retrieval era — RAG, models/inference, and the
   first evals. Peak RAG.
3. **"Agents + the scaffolding around them"** (leading edge). Agents are the spine
   — the single most persistent title term, rising to ~38%. Attention moves off
   the model onto the apparatus: evals, context, harnesses, runtimes. RAG fades as
   a standalone label as it dissolves into context engineering.

## Forecast — where the journey heads

| Signal | Trajectory | Read |
|---|---|---|
| Agents | ↑↑ dominant & rising | "Agent engineering" becomes *the* discipline; agent = default unit of work |
| Evals · Context · Runtimes · Harnesses | ↑ rising mid-tier | The scaffolding stack hardens — reliability from apparatus, not model cleverness |
| MCP / tooling | episodic → structural | Interoperability/standards layer (agent↔tool, agent↔agent) grows foundational |
| Org / AI-native org | ↓ in titles, ↑ in stakes | Frontier moves above the individual engineer to org-level transformation |
| Security / identity / trust | small → structural | Grows in lockstep with agent autonomy |
| Voice / realtime | flat niche | Durable, not a takeover |

**Meta-forecast (the corpus's own answer, from the book's closing chapter "What
Endures"):** what persists is not any model or tool generation — it is judgment,
taste, and the harness. The field's center of gravity is moving from
"which model" to "what apparatus makes delegation trustworthy."

## How to upgrade this to a real model forecast

1. Fetch real `upload_date` per video (`yt-dlp --no-flat-playlist`, ~767 calls).
2. Build monthly per-theme prevalence series (24+ points each).
3. Run TimesFM (or a simple Holt-Winters/Prophet baseline) per series for a
   6–12 month projection with confidence intervals.
4. Validate by back-testing: hold out the last N months, forecast, compare.
