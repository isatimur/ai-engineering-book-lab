from pathlib import Path

import pytest

from audiobook_gen.__main__ import build_parser, run_dry, slug


def test_parser_defaults():
    args = build_parser().parse_args([])
    assert args.engine == "openai"
    assert args.voice is None  # resolved per-engine in make_synth
    assert args.dry_run is False
    assert args.out == "dist/audiobook"
    assert args.source is None
    assert args.source_dir is None


def test_parser_source_and_source_dir_are_mutually_exclusive():
    with pytest.raises(SystemExit):
        build_parser().parse_args(["--source", "a.md", "--source-dir", "/some/dir"])


def test_parser_accepts_elevenlabs_engine():
    args = build_parser().parse_args(["--engine", "elevenlabs"])
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
    args = build_parser().parse_args(["--source", str(book)])
    plan = run_dry(args)
    assert plan.chapters == 2
    assert plan.chunks >= 2
    assert plan.est_usd > 0


def test_source_dir_concatenates_chapters_in_order(tmp_path):
    """--source-dir reads chapter-NN.md files in numeric order."""
    # Write three fake chapter files out of alphabetical order
    (tmp_path / "chapter-03.md").write_text(
        "# Chapter 3 — Gamma\n\n" + "Spoke words fill paragraphs now. " * 30 + "\n",
        encoding="utf-8",
    )
    (tmp_path / "chapter-01.md").write_text(
        "# Chapter 1 — Alpha\n\n" + "First chapter prose content here. " * 30 + "\n",
        encoding="utf-8",
    )
    (tmp_path / "chapter-02.md").write_text(
        "# Chapter 2 — Beta\n\n" + "Second chapter prose content now. " * 30 + "\n",
        encoding="utf-8",
    )

    args = build_parser().parse_args(["--source-dir", str(tmp_path)])
    plan = run_dry(args)

    assert plan.chapters == 3
    assert plan.chunks >= 3
    assert plan.est_usd > 0


def test_default_source_resolves_to_canonical_and_parses_ten_chapters():
    """With no --source or --source-dir, the canonical website/src/content is used."""
    args = build_parser().parse_args([])
    plan = run_dry(args)
    assert plan.chapters == 10
