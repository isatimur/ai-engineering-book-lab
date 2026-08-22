# Claims Ledger

This folder stores reusable, source-backed claims for the book.

Each ledger should track:
- claim
- why it matters
- support level
- supporting sources — as Source Anchors (video id + start/end timestamp + verbatim quote + confidence); see `programs/source_anchoring_pass.md`
- caveats / counterevidence
- candidate chapters
- reusable phrasing

## Writing anchors

Never hand-write the `**Anchor:**` line. The video id is wrapped in backticks,
and typing that inside a shell heredoc lets the shell execute it — which
silently swallowed the id twice, leaving anchors that pointed nowhere. Let the
tool emit the block:

```bash
cd 99_Meta/scripts/anchor
python3 cli.py --markdown <video_id> "verbatim phrase"
```

That prints the ledger-format `**Anchor:**` / `**Quote:**` pair, correctly
indented, ready to paste. Drop `--markdown` for JSON. Ids beginning with `-`
(valid base64url) are handled without needing `--`.
