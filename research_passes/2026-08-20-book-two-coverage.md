# Research Pass — 2026-08-20 — Book-two coverage measurement

- **Target:** identify corpus material *From Copilot to Colleague* does not use, and whether any of it constitutes a second book
- **Pass type:** coverage measurement / scoping input
- **Inputs:** all 1047 `01_Videos/` notes, `claims/Claims Ledger.md` wikilinks
- **Output:** `05_Book_Ideas/Book Two — Scoping from Uncovered Corpus.md`

## Reproducible query

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book && python3 - << 'PY'
import re, pathlib, collections
ledger = pathlib.Path('claims/Claims Ledger.md').read_text()
cited_ids = {m[1] for m in re.findall(r'\[\[(\d+)-([A-Za-z0-9_-]{11})-', ledger)}
DOM = {
 'health/bio':   r'health|clinic|patient|medic|bio|genom|cell|drug|pharma|therap',
 'finance':      r'financ|bank|trading|invest|payment|fintech|tax|insur|audit',
 'legal':        r'legal|law|contract|compliance|attorney',
 'gen-media':    r'video|image|music|audio-gen|diffusion|generative-(video|image|media)|film|game',
 'training-side':r'post-training|continual-learning|rlhf|reinforcement|fine-tun|pre-training|distill|quantiz|serving|inference|gpu|kernel',
 'robotics/edge':r'robot|edge|on-device|embodied|drone|autonom(ous)?-vehicle',
 'science':      r'research|scientif|physics|chem|math-|proof|discovery',
}
counts=collections.Counter(); cit=collections.Counter()
for n in sorted(pathlib.Path('01_Videos').glob('*.md')):
    m=re.match(r'\d+-([A-Za-z0-9_-]{11})-',n.name)
    if not m: continue
    for tag,pat in DOM.items():
        if re.search(pat, n.name, re.I):
            counts[tag]+=1
            if m.group(1) in cited_ids: cit[tag]+=1
for tag,c in counts.most_common():
    print(f'{tag:16} {c:4} talks, {cit[tag]:3} cited, {100*cit[tag]/c:4.0f}%')
PY
```

## Result (2026-08-20, corpus 1047)

training-side 51/0 (0%) · robotics-edge 36/1 (3%) · gen-media 22/1 (5%) ·
health-bio 22/0 (0%) · science 21/2 (10%) · finance 19/2 (11%) · legal 15/3 (20%).
Corpus-wide 113 cited / 934 uncited.

## Caveat that matters

Keyword bucketing on filenames, so a talk can land in two buckets and a talk whose
domain is only in its body text is missed. The buckets are directional evidence of
where coverage is near-zero, not a census. The corpus-wide 934 figure must not be
read as "934 talks of missing book" — most of it is depth inside themes book 1
already covers (e.g. 472 uncited Coding Agents talks).

## Unresolved

Whether book 2 reuses book 1's evidence machine, whether practitioner interviews
are in scope for the vertical thesis, and whether scoping runs parallel to
finishing book 1. All three are operator calls, recorded in the scoping doc.
