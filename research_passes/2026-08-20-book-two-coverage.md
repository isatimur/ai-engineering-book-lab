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

---

## CORRECTION (2026-08-22) — the domain counts in this pass were inflated

While enriching the vertical talks to test the B2-B thesis, a worker reported
that one "finance" talk (#231, Nathan Lambert, AI2) contained **zero finance or
regulation content** — it is a taxonomy of reasoning skills. The keyword
`tax` had matched **"taxonomy"**.

Auditing the rest found the same class of error throughout:

| Domain | As published | Corrected | Inflated by |
|---|---|---|---|
| finance | 19 | 12 | +7 |
| legal | 15 | **5** | +10 |
| health | 22 | 14 | +8 |
| science | 21 | 9 | +12 |
| **total** | **77** | **40** | **+37 (~48%)** |

### What actually matched

- `tax` → "taxonomy" (#231), "prompt tax" (#391), "multimodal tax" (#789), "on-call tax" (#993) — three of those are *metaphors*, not finance.
- `bank` → the surname "Banks" (#182).
- `law` → **"claw"**. Nine OpenClaw talks (#015, #641, #672, #673, #701, #743, #790, #842, #908) landed in the legal bucket because `law` is a substring of `claw`. Also "Conway's law" (#460) and the surname "Lawrence" (#689).
- Genuinely legal/compliance content: roughly #154, #516, #793. Three, not fifteen.

There is an irony worth recording: "OpenClaw" is itself probably an ASR
mishearing recurring through this corpus, and it went on to pollute a domain
count by substring collision.

### What this does and does not change

- **Does not change:** the *direction* of the finding. Coverage in these
  domains is still 0–11%, and the training-side body (51 talks, 0% cited) did
  not use these fragile patterns and stands unaudited-but-plausible.
- **Does change:** the size of the evidence base under B2-B. It is ~40 talks,
  not ~77. That is still a book's worth of material, but the recommendation in
  `05_Book_Ideas/Book Two — Scoping from Uncovered Corpus.md` was argued on a
  number roughly twice as large as reality. Anyone weighing that recommendation
  should weigh the corrected figure.
- **Method lesson:** substring keyword matching on filenames needs word
  boundaries and a manual read of the hit list before any count is quoted. The
  original pass flagged its buckets as "directional evidence, not a census" —
  that caveat was correct and was still not enough, because the number got
  quoted downstream anyway.
