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
    parser.add_argument("--markdown", action="store_true",
                        help="emit the ledger-format Anchor/Quote block instead of JSON, "
                             "ready to paste into a claims file")
    # YouTube ids use the base64url alphabet, so they can begin with "-" (e.g.
    # "-npY6XjM8CQ") and argparse would read that as an option flag. Wrap such an
    # id in brackets, which extract_video_id already strips. (Prepending "--"
    # instead would work here but would stop later flags like --transcripts from
    # being parsed at all.)
    if argv is None:
        argv = sys.argv[1:]
    if argv and argv[0].startswith("-") and _BARE_ID.fullmatch(argv[0].strip()):
        argv = [f"[{argv[0].strip()}]", *argv[1:]]

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
    d = asdict(anchor)
    if args.markdown:
        # Ledger-format block. Emitting it here means callers never hand-write
        # the backticks around the video id — doing that inside a shell heredoc
        # silently ate the id twice, leaving anchors that pointed nowhere.
        print(f"    - **Anchor:** `{d['video_id']}` {d['start']} \u2192 {d['end']} "
              f"\u00b7 confidence: {d['confidence']}")
        print(f'    - **Quote:** "{d["quote"]}"')
        return 0
    json.dump(d, sys.stdout, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
