from audiobook_gen.normalize import Chapter
from audiobook_gen.cost import build_plan


def test_counts_chars_and_chunks():
    # "word " is 5 chars; 800 words = 4000 chars (splits into 2 chunks),
    # 200 words = 1000 chars (fits in 1 chunk).
    chapters = [Chapter("Chapter 1 — A", "word " * 800), Chapter("Chapter 2 — B", "word " * 200)]
    plan = build_plan(chapters, max_chars=3500)
    assert plan.chapters == 2
    assert plan.chars == 5000
    assert plan.chunks == 3  # 4000 chars -> 2 chunks, 1000 chars -> 1 chunk


def test_cost_estimate_uses_rate():
    chapters = [Chapter("Chapter 1 — A", "z" * 1_000_000)]
    plan = build_plan(chapters, usd_per_million=15.0)
    assert round(plan.est_usd, 2) == 15.0


def test_plan_lines_are_human_readable():
    plan = build_plan([Chapter("Chapter 1 — A", "word " * 100)])
    assert any("Chapter 1 — A" in line for line in plan.lines)
    assert any("Estimated cost" in line for line in plan.lines)
