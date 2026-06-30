"""Opening/closing credit narration text (ACX requires both)."""
from __future__ import annotations


def opening_text(title: str, author: str) -> str:
    return (
        f"{title}. Written by {author}. "
        "This audiobook is narrated by an AI voice."
    )


def closing_text(title: str) -> str:
    return f"This has been {title}. Thank you for listening."
