import argparse
import json
import re
from pathlib import Path

# build_evidence.py lives at <repo>/99_Meta/scripts/anchor/ — parents[3] is the repo root.
_REPO = Path(__file__).resolve().parents[3]
_DEFAULT_LEDGER = _REPO / "claims" / "Claims Ledger.md"
_DEFAULT_OUT = _REPO / "website" / "src" / "evidence.json"

_CLAIM = re.compile(r"^##\s+(\d+)\)\s+(.+?)\s*$", re.MULTILINE)
_SUPPORT = re.compile(r"\*\*Support level:\*\*\s*([A-Za-z]+)")
_CANDIDATE = re.compile(r"\*\*Candidate chapters:\*\*\s*([0-9,\s]+)")
_SOURCE_BULLET = re.compile(r"^\s*-\s+\[\[([^\]]+)\]\]")
_ANCHOR = re.compile(
    r"\*\*Anchor:\*\*\s*`([A-Za-z0-9_-]{11})`\s*"
    r"(\d\d:\d\d:\d\d\.\d\d\d)\s*(?:→|-{1,2}>)\s*(\d\d:\d\d:\d\d\.\d\d\d)"
    r".*?confidence:\s*(\w+)"
)
_QUOTE = re.compile(r'\*\*Quote:\*\*\s*"(.+)"\s*$')


def _to_seconds(ts: str) -> int:
    h, m, s = ts.split(":")
    return int(h) * 3600 + int(m) * 60 + int(float(s))


def _claim_blocks(text: str):
    matches = list(_CLAIM.finditer(text))
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        yield m.group(1), m.group(2).strip(), text[m.end():end]


def parse_ledger(ledger_path: str) -> list[dict]:
    text = Path(ledger_path).read_text(encoding="utf-8")
    claims: list[dict] = []
    for number, claim_text, body in _claim_blocks(text):
        support = _SUPPORT.search(body)
        candidate = _CANDIDATE.search(body)
        chapters = [int(n) for n in re.findall(r"\d+", candidate.group(1))] if candidate else []
        anchors: list[dict] = []
        current_label = ""
        pending: dict | None = None
        for line in body.splitlines():
            sb = _SOURCE_BULLET.match(line)
            if sb:
                inner = sb.group(1)
                current_label = inner.split("|", 1)[1].strip() if "|" in inner else inner.strip()
            a = _ANCHOR.search(line)
            if a:
                pending = {
                    "video_id": a.group(1),
                    "start": a.group(2),
                    "end": a.group(3),
                    "start_seconds": _to_seconds(a.group(2)),
                    "confidence": a.group(4).lower(),
                    "label": current_label,
                }
                continue
            q = _QUOTE.search(line)
            if q and pending is not None:
                pending["quote"] = q.group(1)
                anchors.append(pending)
                pending = None
        if anchors:
            claims.append({
                "claim_id": f"claims#{number}",
                "text": claim_text,
                "support_level": support.group(1).lower() if support else "moderate",
                "candidate_chapters": chapters,
                "anchors": anchors,
            })
    return claims


def build_index(claims: list[dict]) -> dict:
    index: dict[str, list[dict]] = {}
    for c in claims:
        entry = {k: c[k] for k in ("claim_id", "text", "support_level", "anchors")}
        for chapter in c["candidate_chapters"]:
            index.setdefault(str(chapter), []).append(entry)
    return index


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Build website/src/evidence.json from the anchored ledger.")
    parser.add_argument("--ledger", default=str(_DEFAULT_LEDGER))
    parser.add_argument("--out", default=str(_DEFAULT_OUT))
    args = parser.parse_args(argv)

    claims = parse_ledger(args.ledger)
    index = build_index(claims)
    Path(args.out).write_text(
        json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    total = sum(len(v) for v in index.values())
    print(f"evidence.json: {len(claims)} anchored claims -> {len(index)} chapters, {total} chapter-claim rows")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
