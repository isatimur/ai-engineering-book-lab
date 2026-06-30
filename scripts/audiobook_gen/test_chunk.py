from audiobook_gen.chunk import chunk_text, MAX_CHARS


def test_short_text_is_single_chunk():
    assert chunk_text("One sentence. Two sentence.") == ["One sentence. Two sentence."]


def test_never_exceeds_limit():
    text = ("This is a sentence about agents and evals. " * 400).strip()
    chunks = chunk_text(text, max_chars=500)
    assert chunks  # non-empty
    assert all(len(c) <= 500 for c in chunks)
    # no words are lost or duplicated across the split
    assert "".join(chunks).replace(" ", "") == text.replace(" ", "")


def test_splits_on_sentence_boundaries():
    text = "Alpha one. Beta two. Gamma three."
    chunks = chunk_text(text, max_chars=15)
    # every chunk should end with a period (sentence boundary), none mid-word
    assert all(c.strip().endswith(".") for c in chunks)


def test_hard_splits_oversized_single_sentence():
    text = "word " * 300  # one 'sentence' with no terminator, > limit
    chunks = chunk_text(text.strip(), max_chars=100)
    assert all(len(c) <= 100 for c in chunks)


def test_default_limit_constant():
    assert MAX_CHARS == 3500
