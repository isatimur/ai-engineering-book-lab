from pathlib import Path

from audiobook_gen.__main__ import build_parser, run_dry, slug


def test_parser_defaults():
    args = build_parser().parse_args(["--source", "book.md"])
    assert args.engine == "openai"
    assert args.voice is None  # resolved per-engine in make_synth
    assert args.dry_run is False
    assert args.out == "dist/audiobook"


def test_parser_accepts_elevenlabs_engine():
    args = build_parser().parse_args(["--source", "book.md", "--engine", "elevenlabs"])
    assert args.engine == "elevenlabs"


def test_slug_is_filesystem_safe():
    assert slug("Chapter 1 — The Shift: From Assistant") == "the-shift-from-assistant"


def test_run_dry_returns_plan(tmp_path):
    book = tmp_path / "book.md"
    book.write_text(
        "# Chapter 1 — A\n\n" + "Real prose sentence here. " * 30 + "\n\n"
        "# Chapter 2 — B\n\n" + "More prose follows along now. " * 30 + "\n",
        encoding="utf-8",
    )
    plan = run_dry(book)
    assert plan.chapters == 2
    assert plan.chunks >= 2
    assert plan.est_usd > 0
