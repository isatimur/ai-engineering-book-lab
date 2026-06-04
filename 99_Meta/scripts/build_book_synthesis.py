#!/usr/bin/env python3
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[2]
VIDEO_DIR = ROOT / "01_Videos"
THEME_DIR = ROOT / "02_Themes"
BOOK_DIR = ROOT / "05_Book_Ideas"
META_DIR = ROOT / "99_Meta"

SYNTHESIS_PACK_PATH = BOOK_DIR / "First Serious Synthesis Pack.md"
ANGLE_COMPARISON_PATH = BOOK_DIR / "Book Angle Comparison.md"
PRIMARY_ANGLE_PATH = BOOK_DIR / "Recommended Primary Book Angle.md"
CHAPTER_OUTLINE_PATH = BOOK_DIR / "Chapter Outline v1.md"


@dataclass
class NoteRecord:
    note_name: str
    title: str
    playlist_index: int
    themes: list[str]
    transcript_status: str
    summary: str


def parse_frontmatter(text: str) -> dict[str, object]:
    if not text.startswith("---\n"):
        return {}
    match = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not match:
        return {}
    lines = match.group(1).splitlines()
    data: dict[str, object] = {}
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if re.match(r"^[A-Za-z0-9_]+:\s*$", line):
            key = line[:-1]
            items = []
            i += 1
            while i < len(lines) and re.match(r"^\s+-\s+", lines[i]):
                item = re.sub(r"^\s+-\s+", "", lines[i]).strip()
                if item.startswith('"') and item.endswith('"'):
                    item = item[1:-1].replace('\\"', '"')
                items.append(item)
                i += 1
            data[key] = items
            continue
        m = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", line)
        if m:
            key, value = m.groups()
            value = value.strip()
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1].replace('\\"', '"')
            elif re.fullmatch(r"-?\d+", value):
                value = int(value)
            data[key] = value
        i += 1
    return data


def load_notes() -> list[NoteRecord]:
    out: list[NoteRecord] = []
    for path in sorted(VIDEO_DIR.glob("*.md")):
        text = path.read_text(errors="ignore")
        fm = parse_frontmatter(text)
        idx = fm.get("playlist_index")
        if not isinstance(idx, int):
            continue
        themes = [str(t) for t in fm.get("themes", [])] if isinstance(fm.get("themes"), list) else []
        out.append(NoteRecord(
            note_name=path.stem,
            title=str(fm.get("title") or path.stem),
            playlist_index=idx,
            themes=themes,
            transcript_status=str(fm.get("transcript_status") or "unknown"),
            summary=str(fm.get("summary") or ""),
        ))
    return sorted(out, key=lambda r: r.playlist_index)


def link(record: NoteRecord) -> str:
    return f"[[{record.note_name}|#{record.playlist_index} — {record.title}]]"


def lines_for_records(records: Iterable[NoteRecord]) -> list[str]:
    return [f"- {link(r)}" for r in records]


def records_by_idx(records: list[NoteRecord]) -> dict[int, NoteRecord]:
    return {r.playlist_index: r for r in records}


def theme_counts(records: list[NoteRecord]) -> dict[str, int]:
    counts = {}
    for record in records:
        for theme in record.themes:
            counts[theme] = counts.get(theme, 0) + 1
    return dict(sorted(counts.items()))


def status_counts(records: list[NoteRecord]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for record in records:
        counts[record.transcript_status] = counts.get(record.transcript_status, 0) + 1
    return dict(sorted(counts.items()))


def must(idx_map: dict[int, NoteRecord], ids: list[int]) -> list[NoteRecord]:
    missing = [i for i in ids if i not in idx_map]
    if missing:
        raise SystemExit(f"Missing expected note ids: {missing}")
    return [idx_map[i] for i in ids]


def write_synthesis_pack(records: list[NoteRecord]) -> None:
    idx = records_by_idx(records)
    counts = theme_counts(records)
    lines = [
        "# First Serious Synthesis Pack",
        "",
        f"Corpus size analyzed: **{len(records)} videos**",
        f"Transcript status mix: **{status_counts(records)}**",
        "",
        "## What changed after full-corpus review",
        "",
        "The corpus is now strong enough to stop treating the book as a loose trend survey.",
        "A clearer thesis is emerging: **AI engineering is the discipline of turning model capability into dependable, high-leverage systems through scaffolding, evaluation, context design, and organizational adaptation.**",
        "",
        f"Across the full {len(records)}-video corpus, four things stand out most clearly:",
        "- the book should be anchored in **production practice**, not model novelty",
        "- **coding agents** are the best narrative entry point, but not the whole book",
        "- **trust, control, and eval loops** are the hinge between demo and deployment",
        "- **context, retrieval, security, and org design** are supporting systems, not side topics",
        "",
        "## Evidence by layer",
        "",
        f"- **Agent architecture + coding systems** dominate the corpus (`Agent Architecture`: {counts.get('Agent Architecture', 0)}, `Coding Agents`: {counts.get('Coding Agents', 0)}).",
        f"- **Reliability and evals** are now too large to be a chapter footnote (`Evals & Reliability`: {counts.get('Evals & Reliability', 0)}).",
        f"- **Org design and leadership** remains a major recurring signal (`Org Design & Leadership`: {counts.get('Org Design & Leadership', 0)}).",
        f"- **Runtime/tooling/context infrastructure** is substantial and growing (`MCP & Tooling`: {counts.get('MCP & Tooling', 0)}, `RAG & Retrieval`: {counts.get('RAG & Retrieval', 0)}).",
        f"- **Security/guardrails** and **voice/realtime** are narrower, but strategically important edge-pressure topics (`Security & Guardrails`: {counts.get('Security & Guardrails', 0)}, `Voice & Realtime`: {counts.get('Voice & Realtime', 0)}).",
        "",
        "## Best current thesis",
        "",
        "**From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems**",
        "",
        "Why this is stronger than the earlier generic frame:",
        "- it captures the corpus's center of gravity: moving from assistive tooling to delegated work",
        "- it is broad enough to include coding, search, support, enterprise, and vertical agents",
        "- it naturally creates a before/after arc: prompts → workflows → trusted systems → org redesign",
        "- it is memorable without being tied to one vendor or one fleeting interface",
        "",
        "## Most useful source clusters for the book",
        "",
        "### Cluster 1 — Foundations: software judgment still matters",
        *lines_for_records(must(idx, [1, 6, 14, 59, 73, 106, 127, 131, 132])),
        "",
        "### Cluster 2 — Coding agents need harnesses, specs, and prepared codebases",
        *lines_for_records(must(idx, [16, 40, 42, 51, 57, 72, 77, 87, 96, 177, 179, 180, 181, 190, 210])),
        "",
        "### Cluster 3 — Trust comes from evals, not vibes",
        *lines_for_records(must(idx, [23, 43, 50, 72, 112, 121, 125, 126, 153, 158, 170, 184, 198, 212])),
        "",
        "### Cluster 4 — Context is infrastructure, not just prompt stuffing",
        *lines_for_records(must(idx, [47, 48, 100, 104, 105, 118, 123, 154, 156, 157, 172, 193, 215, 216, 217, 218, 219])),
        "",
        "### Cluster 5 — Reliable agents require runtimes, control planes, and state",
        *lines_for_records(must(idx, [3, 28, 38, 44, 83, 99, 111, 138, 164, 167, 168, 176, 198, 201, 202, 206, 208])),
        "",
        "### Cluster 6 — Adoption is organizational, economic, and political",
        *lines_for_records(must(idx, [5, 54, 62, 63, 65, 69, 70, 79, 101, 102, 135, 137, 160, 161, 162, 169, 188, 194, 195, 199, 205, 207])),
        "",
        "### Cluster 7 — Edge pressures: security, identity, realtime, and compliance",
        *lines_for_records(must(idx, [31, 32, 37, 85, 86, 142, 145, 146, 148, 149, 150, 152, 206, 211])),
        "",
        "## Editorial recommendation",
        "",
        "Do **not** write this as a comprehensive encyclopedia of the AI tooling landscape.",
        "Write it as a practical field guide for senior builders: how to move from isolated AI assistance to trustworthy delegated systems without losing quality, control, or organizational coherence.",
        "",
        "## Companion notes",
        "",
        "- [[Book Angle Comparison]]",
        "- [[Recommended Primary Book Angle]]",
        "- [[Chapter Outline v1]]",
    ]
    SYNTHESIS_PACK_PATH.write_text("\n".join(lines) + "\n")


def write_angle_comparison(records: list[NoteRecord]) -> None:
    counts = theme_counts(records)
    lines = [
        "# Book Angle Comparison",
        "",
        f"Corpus reference point: **{len(records)} videos**",
        "",
        "## Shortlist",
        "",
        "| Angle | What it optimizes for | Strengths | Risks | Verdict |",
        "| --- | --- | --- | --- | --- |",
        "| **From Copilot to Colleague** | Strong thesis + broad market relevance | Best blend of coding agents, trust, workflows, context, and org change | Needs discipline to avoid sprawl | **Best primary angle** |",
        "| **Operating Manual for AI-Native Software Engineering** | Breadth and executive usefulness | Covers the whole corpus cleanly | Can read like a survey/manual | Strong backup / subtitle material |",
        "| **Human Control Plane for Agents** | Conceptual distinctiveness | Excellent frame for trust, evals, security, state, governance | Slightly abstract and less searchable | Best framing device inside chapters |",
        "| **How to Build Coding-Agent Systems That Don't Turn Into Slop** | Sharp pain-driven positioning | Strongest wedge for current demand | Too narrow for enterprise/search/support/context material | Good spinoff or narrower edition |",
        "",
        "## Why the winner shifted",
        "",
        "Earlier checkpoint drafts leaned toward a broader operating-manual framing because the corpus was still growing.",
        f"With the full {len(records)}-video set in view, the sharper narrative now holds up better: the real transition isn't just 'AI-native engineering' in the abstract; it's the move from **assistant behavior** to **delegated colleague behavior**.",
        "",
        "That shift absorbs the corpus's biggest recurring tensions:",
        "- when can you trust an agent to act, not just suggest?",
        "- what scaffolding turns delegation into something safe and productive?",
        "- what changes in the codebase, runtime, and team when delegation becomes normal?",
        "",
        "## Corpus fit check",
        "",
        f"- Coding systems are overwhelmingly represented (`Coding Agents`: {counts.get('Coding Agents', 0)}).",
        f"- The trust layer is also massive (`Evals & Reliability`: {counts.get('Evals & Reliability', 0)}).",
        f"- Organizational adaptation is too common to ignore (`Org Design & Leadership`: {counts.get('Org Design & Leadership', 0)}).",
        f"- Context/runtime substrate is substantial enough to support full chapters (`MCP & Tooling`: {counts.get('MCP & Tooling', 0)}, `RAG & Retrieval`: {counts.get('RAG & Retrieval', 0)}).",
        "",
        "## Recommended packaging",
        "",
        "### Title candidate",
        "**From Copilot to Colleague**",
        "",
        "### Subtitle candidates",
        "- *How AI Engineering Turns Models into Dependable Systems*",
        "- *A Field Guide to Building Trustworthy AI Systems at Work*",
        "- *Harnesses, Evals, Context, and the New Software Stack*",
        "",
        "### Positioning sentence",
        "A practical book for senior engineers, tech leads, and CTOs on how to turn AI from a clever assistant into a reliable collaborator embedded in real products, workflows, and organizations.",
        "",
        "## Recommendation",
        "",
        "Use **From Copilot to Colleague** as the main book angle.",
        "Use **The Human Control Plane for Agents** as an internal framing motif.",
        "Use **The Operating Manual for AI-Native Software Engineering** as subtitle/marketing language if a publisher wants something more explicit.",
    ]
    ANGLE_COMPARISON_PATH.write_text("\n".join(lines) + "\n")


def write_primary_angle(records: list[NoteRecord]) -> None:
    idx = records_by_idx(records)
    lines = [
        "# Recommended Primary Book Angle",
        "",
        "## Working title",
        "**From Copilot to Colleague**",
        "",
        "## Working subtitle",
        "**How AI Engineering Turns Models into Dependable Systems**",
        "",
        "## Core promise",
        "This book explains how modern software teams move from using AI as an assistant to deploying AI as a constrained, trusted collaborator — without accepting slop, fragility, or organizational chaos.",
        "",
        "## Core audience",
        "- senior software engineers",
        "- staff+ engineers and architects",
        "- engineering managers / CTOs",
        "- AI product and platform leaders trying to move beyond pilots",
        "",
        "## Why this angle wins",
        "- It is sharper than 'AI engineering is changing everything'.",
        "- It is broader than a pure coding-agent book.",
        "- It captures the corpus's recurring move from suggestion to delegation.",
        "- It gives the book a natural dramatic question: **what must be true before software teams can trust AI to act?**",
        "",
        "## The governing thesis",
        "AI engineering is not primarily about better prompts. It is about designing the technical and organizational scaffolding that makes delegated machine work dependable: harnesses, specs, evals, context systems, runtimes, guardrails, and new team habits.",
        "",
        "## Non-goals",
        "- Not a vendor-by-vendor tooling catalog",
        "- Not a beginner intro to LLMs",
        "- Not a futurist AGI speculation book",
        "- Not a coding-agents-only screed",
        "",
        "## Best anchor talks",
        *lines_for_records(must(idx, [16, 40, 72, 83, 96, 104, 120, 167, 180, 198, 203, 206])),
        "",
        "## One-paragraph jacket version",
        "AI is no longer just autocomplete for knowledge work. Across software, search, support, legal, and enterprise operations, teams are trying to turn models into collaborators that can plan, retrieve, decide, and act. Most fail not because the models are weak, but because the surrounding systems are. *From Copilot to Colleague* shows what has to be built around AI — harnesses, evals, context, state, controls, and new operating habits — to make delegated machine work reliable enough for the real world.",
    ]
    PRIMARY_ANGLE_PATH.write_text("\n".join(lines) + "\n")


def write_chapter_outline(records: list[NoteRecord]) -> None:
    idx = records_by_idx(records)
    chapters = [
        (1, "The Shift: From Assistant to Delegate", "Why the important transition is not better chat UX but reliable delegated work.", [3, 10, 35, 83, 120, 138, 206]),
        (2, "Taste Still Matters When Code Gets Cheap", "Why fundamentals, judgment, craft, and constraint matter more — not less — in the AI era.", [1, 6, 14, 59, 73, 106, 127, 132]),
        (3, "Harnesses, Specs, and Codebases Agents Can Actually Use", "How to prepare the environment so coding agents can operate without wrecking the system.", [16, 40, 42, 57, 77, 87, 177, 179, 180, 181, 190]),
        (4, "Evals Are the Control System", "Why trust comes from measurement loops, seeded tests, and production-facing evaluation rather than benchmarks alone.", [23, 50, 72, 112, 121, 125, 126, 153, 170, 184, 212]),
        (5, "Context Is Infrastructure", "Retrieval, memory, GraphRAG, and enterprise context as first-class system design problems.", [47, 48, 100, 104, 105, 118, 154, 156, 157, 172, 193, 215, 218, 219]),
        (6, "Runtimes, State, and the Human Control Plane", "Durability, workflows, stateful environments, MCP/tool layers, and why autonomy needs architecture.", [28, 38, 44, 83, 99, 111, 164, 167, 176, 198, 201, 202, 208]),
        (7, "Security, Identity, and High-Stakes Trust", "Why OAuth, sandboxing, compliance, and trustworthy-action boundaries become central once agents can act.", [31, 32, 37, 86, 148, 149, 150, 152, 206, 211]),
        (8, "Realtime and Embodied Edges", "What voice, low-latency interaction, and robotics teach us about turn-taking, state, and operational constraints.", [26, 85, 128, 142, 143, 144, 145, 146, 147, 165, 174, 175]),
        (9, "The AI-Native Organization", "How incentives, hiring, product management, ROI, and team structure change when AI becomes part of the workforce.", [54, 62, 63, 65, 69, 79, 101, 102, 135, 137, 160, 162, 169, 188, 194, 195, 199, 205, 207]),
        (10, "What Endures", "Which principles survive tool churn: constrained delegation, explicit context, eval loops, and human judgment.", [5, 17, 60, 84, 108, 122, 124, 136, 214, 220]),
    ]

    lines = [
        "# Chapter Outline v1",
        "",
        "Working frame: **From Copilot to Colleague: How AI Engineering Turns Models into Dependable Systems**",
        "",
        "## Outline",
        "",
    ]
    for number, title, thesis, ids in chapters:
        lines.append(f"### Chapter {number} — {title}")
        lines.append("")
        lines.append(f"**Chapter thesis:** {thesis}")
        lines.append("")
        lines.append("**Supporting source cluster**")
        lines.extend(lines_for_records(must(idx, ids)))
        lines.append("")

    lines += [
        "## Notes on structure",
        "",
        "- Chapters 1-4 establish the core operating model: delegation requires scaffolding.",
        "- Chapters 5-8 widen the lens from coding to context, runtimes, trust, and realtime constraints.",
        "- Chapters 9-10 zoom out to organizational redesign and enduring principles.",
        "- The strongest recurring narrative move is: **demo -> deployment -> control -> organizational adaptation**.",
    ]
    CHAPTER_OUTLINE_PATH.write_text("\n".join(lines) + "\n")


def main() -> None:
    records = load_notes()
    write_synthesis_pack(records)
    write_angle_comparison(records)
    write_primary_angle(records)
    write_chapter_outline(records)
    print(f"Wrote: {SYNTHESIS_PACK_PATH.relative_to(ROOT)}")
    print(f"Wrote: {ANGLE_COMPARISON_PATH.relative_to(ROOT)}")
    print(f"Wrote: {PRIMARY_ANGLE_PATH.relative_to(ROOT)}")
    print(f"Wrote: {CHAPTER_OUTLINE_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
