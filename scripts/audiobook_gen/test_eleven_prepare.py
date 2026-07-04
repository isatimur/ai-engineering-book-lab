from audiobook_gen import eleven
from audiobook_gen.eleven_prepare import (
    SEGMENT_OPENING_TAG,
    context_snippet,
    expand_spoken_tokens,
    prepare_chunk_text,
)


def test_expand_spoken_tokens_handles_tech_acronyms():
    text = expand_spoken_tokens("The API and LLM power AI agents via MCP.")
    assert "A P I" in text
    assert "L L M" in text
    assert "A I" in text
    assert "M C P" in text


def test_expand_spoken_tokens_handles_urls():
    text = expand_spoken_tokens("See https://example.com/path for details.")
    assert "example dot com" in text
    assert "slash path" in text


def test_expand_spoken_tokens_handles_versions():
    assert "version 3 point 1" in expand_spoken_tokens("Upgrade to v3.1 today.")


def test_prepare_chunk_text_adds_professional_tag_at_segment_start():
    text = prepare_chunk_text("Chapter one begins here.", segment_start=True)
    assert text.startswith(f"{SEGMENT_OPENING_TAG} Chapter one begins here.")


def test_prepare_chunk_text_preserves_paragraph_breaks():
    raw = "First paragraph.\n\nSecond paragraph."
    assert "\n\n" in prepare_chunk_text(raw)


def test_context_snippet_trims_long_neighbor_text():
    long_text = "word " * 200
    assert len(context_snippet(long_text, from_end=True)) == 500
    assert context_snippet(long_text, from_end=False) == long_text[:500]


def test_context_snippet_returns_none_for_empty():
    assert context_snippet(None) is None
    assert context_snippet("") is None
