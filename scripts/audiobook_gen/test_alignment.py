from audiobook_gen.alignment import (
    active_word_index,
    build_display_map,
    chars_to_words,
    heuristic_word_timings,
    normalize_token,
    offset_words,
)


def test_chars_to_words_groups_non_space():
    words = chars_to_words(
        list("Hi there"),
        [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
        [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    )
    assert [w.text for w in words] == ["Hi", "there"]
    assert words[0].start == 0.0
    assert words[1].end == 0.8


def test_offset_words_shifts_times():
    words = offset_words(
        [__import__("audiobook_gen.alignment", fromlist=["WordTiming"]).WordTiming("a", 1.0, 1.5)],
        0.75,
    )
    assert words[0].start == 1.75


def test_build_display_map_aligns_normalized_tokens():
    spoken = ["The", "shift", "from", "assistant"]
    display = ["The", "Shift", "—", "from", "assistant"]
    m = build_display_map(spoken, display)
    assert m[0] == 0
    assert m[1] == 1
    assert m[2] is None
    assert m[3] == 2


def test_active_word_index_binary_search():
    from audiobook_gen.alignment import WordTiming

    words = [
        WordTiming("a", 0.0, 0.5),
        WordTiming("b", 0.5, 1.0),
        WordTiming("c", 1.0, 1.5),
    ]
    assert active_word_index(words, 0.6) == 1
    assert active_word_index(words, 0.0) == 0


def test_heuristic_word_timings_respects_head_tail():
    words = heuristic_word_timings("one two three", 10.0, head_silence=1.0, tail_silence=1.0)
    assert len(words) == 3
    assert words[0].start >= 1.0
    assert words[-1].end <= 9.0


def test_normalize_token_strips_punctuation():
    assert normalize_token("Shift—") == "shift"
