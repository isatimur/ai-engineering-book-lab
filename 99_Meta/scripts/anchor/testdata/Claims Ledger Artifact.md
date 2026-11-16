# Claims Ledger — fixture with both anchor kinds

Example of the form (inside a fence, so no reader may count it):

```
**Artifact anchor:**
- kind: commit
- ref: 0000000
- date: 2026-01-01
- excerpt: this fenced example must never reach the evidence file
```

## 1) A bot push starts no workflow

**Support level:** strong
**Candidate chapters:** 2, 4

**Supporting sources:**

**Artifact anchor:**
- kind: commit
- ref: 2de004f
- date: 2026-11-16
- excerpt: run: gh workflow run website-deploy.yml --ref main

**Artifact anchor:**
- kind: run
- ref: 43779369138
- date: 2026-11-16
- excerpt: * [new ref]         504e5ac11c0dfa3aff8cc11934d58558699be940 -> origin/main

## 2) A claim that rests on a talk and a commit

**Support level:** moderate
**Candidate chapters:** 4

- [[206-joel-hron|#206 — Joel Hron]]
  - **Anchor:** `kDEvo2__Ijg` 00:11:46.320 → 00:11:52.880 (confidence: high)
  - **Quote:** "the north star has shifted from helpfulness to productive"

**Artifact anchor:**
- kind: file
- ref: stats.json
- date: 2026-11-15
- excerpt: "videos": 1455

## 3) A claim with no anchor of either kind

**Support level:** weak
**Candidate chapters:** 2
