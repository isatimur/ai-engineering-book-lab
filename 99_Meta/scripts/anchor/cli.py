import argparse
import json
import re
import sys
from dataclasses import asdict
from pathlib import Path

from locate import locate_quote
from vtt import load_word_stream

# cli.py lives at <repo>/99_Meta/scripts/anchor/cli.py — parents[2] is 99_Meta.
_DEFAULT_TRANSCRIPTS = Path(__file__).resolve().parents[2] / "transcripts" / "raw"

_BARE_ID = re.compile(r"[A-Za-z0-9_-]{11}")
_WIKILINK_ID = re.compile(r"^\d+-([A-Za-z0-9_-]{11})(?=-|$)")


def extract_video_id(raw: str) -> str:
    s = raw.strip().strip("[]").split("|")[0].strip()
    if _BARE_ID.fullmatch(s):
        return s
    m = _WIKILINK_ID.match(s)
    if m:
        return m.group(1)
    raise ValueError(f"cannot extract video id from {raw!r}")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Locate a quote in a video's WebVTT transcript and print a Source Anchor."
    )
    parser.add_argument("video", help="11-char video id or a ledger wikilink target")
    parser.add_argument("phrase", help="search phrase to anchor")
    parser.add_argument("--transcripts", default=str(_DEFAULT_TRANSCRIPTS),
                        help="directory holding <video_id>.en.vtt files")
    args = parser.parse_args(argv)

    try:
        video_id = extract_video_id(args.video)
    except ValueError as exc:
        json.dump({"video_id": args.video, "error": str(exc)}, sys.stdout, ensure_ascii=False)
        sys.stdout.write("\n")
        return 1
    vtt_path = Path(args.transcripts) / f"{video_id}.en.vtt"
    if not vtt_path.exists():
        json.dump({"video_id": video_id, "error": f"transcript not found: {vtt_path}"},
                  sys.stdout, ensure_ascii=False)
        sys.stdout.write("\n")
        return 1

    stream = load_word_stream(str(vtt_path))
    anchor = locate_quote(stream, args.phrase, video_id)
    json.dump(asdict(anchor), sys.stdout, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
