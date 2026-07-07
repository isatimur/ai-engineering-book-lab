from audiobook_gen.credits import opening_text, closing_text


def test_opening_includes_title_author_and_ai_disclosure():
    t = opening_text("From Copilot to Colleague", "Timur Isachenko")
    assert "From Copilot to Colleague" in t
    assert "Timur Isachenko" in t
    assert "AI" in t  # AI-narration disclosure


def test_closing_thanks_listener():
    t = closing_text("From Copilot to Colleague")
    assert "From Copilot to Colleague" in t
    assert "listening" in t.lower()
