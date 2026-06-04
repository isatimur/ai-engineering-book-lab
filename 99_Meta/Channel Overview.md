# Channel Overview

## Source
- Channel: [AI Engineer](https://www.youtube.com/@aiDotEngineer)
- Inventory snapshot source: `/tmp/ai-engineer-videos.jsonl`
- Total videos in current inventory: 741

## What this knowledge base is for
This vault is a working research substrate for turning the AI Engineer channel into a real AI engineering knowledge experience:
- searchable video notes
- transcript-backed references
- recurring theme maps
- reusable engineering concepts
- practical patterns, tradeoffs, and failure modes
- book/chapter seeds for future writing

This is not meant to be a passive archive. The intended workflow is: gather the channel corpus, preserve source provenance, extract the durable AI engineering knowledge, connect related ideas, and rework the material into something useful for learning, reference, and production work.

## Current ingestion status
- Latest completed batch: `recent-709-741`
- Corpus notes created so far: `741`
- Transcript status mix: `auto_en_orig: 729, unavailable: 12`
- Notes created: `01_Videos/`
- Theme seeds created: `02_Themes/`
- Transcript cache created: `99_Meta/transcripts/`

## Working principle
Don’t try to summarize 741 videos by hand in one pass.
Instead:
1. ingest in reproducible batches
2. keep transcript provenance clear
3. extract theme hooks early
4. connect videos to people, companies, tools, and concepts
5. synthesize across notes after each batch
6. promote mature patterns into concept notes and chapter packets

## Re-ingestion command
```bash
cd ~/DEV/LifeOS/knowledge-bases/ai-engineer-book
./99_Meta/scripts/ingest_ai_engineer_videos.py --inventory /tmp/ai-engineer-videos.jsonl --limit 20 --offset 120 --batch-name recent-121-140
```
