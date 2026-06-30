from audiobook_gen.normalize import normalize_markdown, Chapter


def test_splits_on_chapter_headings():
    md = (
        "# Chapter 1 — The Shift\n\n"
        + "Body one here. " * 30 + "\n\n"
        "# Chapter 2 — Taste\n\n"
        + "Body two here. " * 30 + "\n"
    )
    chapters = normalize_markdown(md)
    assert [c.title for c in chapters] == ["Chapter 1 — The Shift", "Chapter 2 — Taste"]


def test_drops_thin_draft_wrapper_chapters():
    md = (
        "# Chapter 1 Draft v1 — The Shift\n\n"
        "## Draft note\n\nstub.\n\n"
        "# Chapter 1 — The Shift\n\n"
        + "Real body sentence. " * 20 + "\n"
    )
    chapters = normalize_markdown(md)
    assert len(chapters) == 1
    assert chapters[0].title == "Chapter 1 — The Shift"


def test_strips_code_fences_and_draft_notes():
    md = (
        "# Chapter 1 — X\n\n"
        + "Real prose here. " * 20 + "\n\n"
        "```python\nprint('should not be spoken')\n```\n\n"
        "## Draft status note\n\nthis should be removed too.\n"
    )
    text = normalize_markdown(md)[0].text
    assert "should not be spoken" not in text
    assert "removed too" not in text
    assert "Real prose here." in text


def test_expands_symbols_and_strips_markdown():
    md = "# Chapter 1 — X\n\n" + ("See **bold** and `code` from A → B, e.g. this. " * 20)
    text = normalize_markdown(md)[0].text
    assert "→" not in text and " to " in text
    assert "**" not in text and "`" not in text
    assert "for example" in text
