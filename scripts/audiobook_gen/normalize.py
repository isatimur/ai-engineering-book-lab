"""Turn book markdown into speech-friendly per-chapter prose."""
from __future__ import annotations

import re
from dataclasses import dataclass

CHAPTER_RE = re.compile(r"^#\s+(Chapter\b.*)$", re.MULTILINE)
SYMBOL_EXPANSIONS = [
    ("→", " to "), ("←", " from "), ("&", " and "),
    ("%", " percent "), ("e.g.", "for example"), ("i.e.", "that is"),
    ("etc.", "and so on"), ("—", ", "), ("–", ", "),
]


@dataclass
class Chapter:
    title: str
    text: str


def _strip_code_fences(md: str) -> str:
    return re.sub(r"```.*?```", " ", md, flags=re.DOTALL)


def _strip_draft_sections(md: str) -> str:
    # Remove a '## Draft note' / '## Draft status note' block up to the next heading.
    pattern = re.compile(
        r"^##\s+Draft(?:\s+status)?\s+note\b.*?(?=^#{1,2}\s|\Z)",
        re.MULTILINE | re.DOTALL | re.IGNORECASE,
    )
    return pattern.sub("", md)


def _clean_title(raw: str) -> str:
    # "Chapter 1 Draft v1 — The Shift" -> "Chapter 1 — The Shift"
    return re.sub(r"\s+Draft\s+v\d+\b", "", raw).strip()


def _to_spoken(body: str) -> str:
    text = body
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)          # images
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)        # links -> label
    text = re.sub(r"^\s*\|.*$", " ", text, flags=re.MULTILINE)  # table rows
    text = re.sub(r"\[\^[^\]]*\]", " ", text)                   # footnote refs
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)  # subheadings -> prose
    text = re.sub(r"^\s*>\s?", "", text, flags=re.MULTILINE)    # blockquotes
    text = text.replace("**", "").replace("__", "").replace("`", "")
    text = re.sub(r"(?<!\w)[*_](\S)", r"\1", text)              # leftover emphasis
    for src, dst in SYMBOL_EXPANSIONS:
        text = text.replace(src, dst)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def normalize_markdown(md: str, min_words: int = 50) -> list[Chapter]:
    md = _strip_code_fences(md)
    md = _strip_draft_sections(md)

    matches = list(CHAPTER_RE.finditer(md))
    chapters: list[Chapter] = []
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(md)
        body = md[start:end]
        spoken = _to_spoken(body)
        if len(spoken.split()) < min_words:
            continue  # drop thin draft-wrapper headings
        chapters.append(Chapter(title=_clean_title(m.group(1)), text=spoken))
    return chapters
