#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from html import unescape
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[2]
TRANSCRIPT_DIR = ROOT / "99_Meta" / "transcripts"
BATCH_DIR = ROOT / "99_Meta" / "batches"
VIDEO_DIR = ROOT / "01_Videos"
THEME_DIR = ROOT / "02_Themes"
META_DIR = ROOT / "99_Meta"
BOOK_IDEAS_DIR = ROOT / "05_Book_Ideas"
SYNTHESIS_PACK_PATH = BOOK_IDEAS_DIR / "First Serious Synthesis Pack.md"
CORPUS_STATS_PATH = META_DIR / "Corpus Stats.md"
VIDEO_INVENTORY_PATH = META_DIR / "Video Inventory.md"
INVENTORY_DEFAULT = "/tmp/ai-engineer-videos.jsonl"


@dataclass
class Video:
    id: str
    title: str
    url: str
    description: str
    duration_string: str
    duration_seconds: int | None
    playlist_index: int | None
    view_count: int | None


@dataclass
class NoteRecord:
    note_name: str
    title: str
    playlist_index: int
    themes: list[str]
    transcript_status: str
    summary: str


THEME_RULES = [
    ("Coding Agents", ["coding agent", "claude code", "copilot", "cursor", "windsurf", "code mode", "code quality", "spec-driven", "software engineering", "ide", "developer workflow", "refactor", "code review", "legacy code"]),
    ("Agent Architecture", ["agent", "orchestration", "workflow", "durable", "autonomy", "planning", "subagent", "multi-agent", "agent swarm", "stateful"]),
    ("Evals & Reliability", ["eval", "benchmark", "judge", "reliability", "quality", "measurement", "verify", "observability", "test driven", "metrics"]),
    ("MCP & Tooling", ["mcp", "model context protocol", "tool calling", "tools", "skill", "runtime", "sdk"]),
    ("Voice & Realtime", ["voice", "realtime", "audio", "speech", "latency", "interrupt", "tts"]),
    ("RAG & Retrieval", ["rag", "retrieval", "search", "knowledge graph", "graphrag", "memory", "context engineering", "context window"]),
    ("Models & Inference", ["model", "inference", "gemma", "gemini", "rl", "reasoning", "fine-tuning", "quantization", "open model", "serving", "gpu"]),
    ("Org Design & Leadership", ["leadership", "manager", "cto", "company", "team", "roi", "agile", "enterprise", "org", "product", "adoption"]),
    ("Security & Guardrails", ["security", "guardrail", "sandbox", "oauth", "auth", "trustworthy", "secure", "privacy", "compliance", "red team"]),
]

IDEA_RULES = [
    ("AI engineering is becoming systems engineering, not prompt tinkering", ["system", "architecture", "workflow", "runtime", "platform", "durable", "stateful"]),
    ("Coding agents need harnesses, specs, and human steering", ["spec", "harness", "human", "control", "steer", "agentic coding", "coding agent"]),
    ("Evals are the operating system for trustworthy AI", ["eval", "benchmark", "judge", "metric", "verify", "quality"]),
    ("Context, memory, and retrieval beat naive long prompts", ["context", "memory", "retrieval", "rag", "knowledge graph", "graphrag"]),
    ("Reliability comes from constrained tools and durable workflows", ["durable", "workflow", "reliability", "constraint", "sandbox", "stateful"]),
    ("Developer taste and fundamentals matter more as code gets cheaper", ["fundamental", "taste", "craft", "slop", "quality", "judgment"]),
    ("The AI-native company reorganizes around leverage, not headcount", ["company", "team", "roi", "leader", "leadership", "org", "productivity"]),
    ("Open standards and MCP-like interfaces are shaping the agent runtime layer", ["mcp", "model context protocol", "tool", "sdk", "runtime"]),
    ("Voice and realtime AI are constrained by latency, turn-taking, and UX", ["voice", "realtime", "audio", "latency", "interrupt", "speech"]),
    ("Model progress matters, but the bottleneck is increasingly product and operational design", ["model", "inference", "reasoning", "fine-tuning", "product", "deployment", "production"]),
    ("Security and identity are first-class concerns for autonomous systems", ["security", "identity", "oauth", "auth", "secure", "trustworthy"]),
]


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return re.sub(r"-+", "-", text).strip("-")[:90]


def safe_yaml(value: str) -> str:
    value = value.replace('"', '\\"')
    return f'"{value}"'


def load_inventory(path: Path, limit: int | None = None) -> list[Video]:
    videos: list[Video] = []
    with path.open() as f:
        for line in f:
            row = json.loads(line)
            videos.append(
                Video(
                    id=row["id"],
                    title=row.get("title") or row["id"],
                    url=row.get("webpage_url") or row.get("url") or f"https://www.youtube.com/watch?v={row['id']}",
                    description=row.get("description") or "",
                    duration_string=row.get("duration_string") or "",
                    duration_seconds=int(row["duration"]) if row.get("duration") else None,
                    playlist_index=row.get("playlist_index"),
                    view_count=row.get("view_count"),
                )
            )
            if limit and len(videos) >= limit:
                break
    return videos


def ensure_dirs() -> None:
    for path in [TRANSCRIPT_DIR / "raw", TRANSCRIPT_DIR / "plain", BATCH_DIR, VIDEO_DIR, THEME_DIR, BOOK_IDEAS_DIR]:
        path.mkdir(parents=True, exist_ok=True)


def run(cmd: list[str], cwd: Path | None = None) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)


def fetch_transcript(video: Video) -> tuple[str, Path | None, Path | None]:
    raw_base = TRANSCRIPT_DIR / "raw" / video.id
    existing_vtt = list(raw_base.parent.glob(f"{video.id}*.vtt"))
    if not existing_vtt:
        cmd = [
            shutil.which("yt-dlp") or "yt-dlp",
            "--skip-download",
            "--write-auto-subs",
            "--sub-langs",
            "en,en-orig",
            "--sub-format",
            "vtt",
            "--output",
            str(raw_base) + ".%(ext)s",
            video.url,
        ]
        proc = run(cmd, cwd=ROOT)
        if proc.returncode != 0:
            return "unavailable", None, None
        existing_vtt = list(raw_base.parent.glob(f"{video.id}*.vtt"))
    preferred = None
    for suffix in [".en-orig.vtt", ".en.vtt"]:
        candidate = raw_base.parent / f"{video.id}{suffix}"
        if candidate.exists():
            preferred = candidate
            break
    if not preferred:
        return "unavailable", None, None
    transcript_status = "auto_en_orig" if preferred.name.endswith(".en-orig.vtt") else "auto_en"
    plain_path = TRANSCRIPT_DIR / "plain" / f"{video.id}.txt"
    if not plain_path.exists():
        plain_text = vtt_to_text(preferred.read_text(errors="ignore"))
        plain_path.write_text(plain_text)
    return transcript_status, preferred, plain_path


def vtt_to_text(vtt: str) -> str:
    lines = []
    seen = set()
    for raw_line in vtt.splitlines():
        line = raw_line.strip()
        if not line or line == "WEBVTT" or line.startswith("Kind:") or line.startswith("Language:"):
            continue
        if "-->" in line:
            continue
        if re.match(r"^\d+$", line):
            continue
        line = re.sub(r"<\d{2}:\d{2}:\d{2}\.\d{3}><c>", " ", line)
        line = re.sub(r"<\d{2}:\d{2}\.\d{3}><c>", " ", line)
        line = re.sub(r"</?c>", "", line)
        line = re.sub(r"<[^>]+>", "", line)
        line = unescape(line)
        line = re.sub(r"\s+", " ", line).strip()
        if not line:
            continue
        if line in seen:
            continue
        seen.add(line)
        lines.append(line)
    text = "\n".join(lines)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


def first_paragraph(description: str) -> str:
    text = description.replace("\r", "")
    text = re.sub(r"https?://\S+", "", text)
    blocks = [b.strip() for b in text.split("\n\n") if b.strip()]
    candidates: list[str] = []
    for block in blocks:
        if re.search(r"speaker info|timestamps|follow|subscribe|chapters", block, re.I):
            continue
        if block.startswith("-"):
            continue
        candidates.append(block)
    if not candidates:
        candidates = [line.strip() for line in text.splitlines() if line.strip() and not line.strip().startswith("-")]
    return candidates[0] if candidates else ""


def summarize(video: Video, transcript_text: str | None) -> str:
    desc = first_paragraph(video.description)
    title = video.title
    speaker_hint = ""
    m = re.search(r"[—-]\s*([^,]+)", title)
    if m:
        speaker_hint = m.group(1).strip()

    summary = []
    if speaker_hint:
        summary.append(f"{speaker_hint} shares a practical take on {re.sub(r'\s*[—-].*$', '', title).strip().rstrip('.')}.")
    else:
        summary.append(f"A practical talk on {re.sub(r'\s*[—-].*$', '', title).strip().rstrip('.')}.")

    if desc:
        desc_sentence = re.split(r"(?<=[.!?])\s+", desc.strip())[0].strip()
        if len(desc_sentence) > 220:
            desc_sentence = desc_sentence[:217].rstrip() + "..."
        summary.append(desc_sentence)

    if transcript_text:
        low = transcript_text.lower()[:4000]
        cues = []
        cue_map = [
            ("agent", "focuses on agent design and orchestration"),
            ("eval", "emphasizes evaluation and measurement"),
            ("mcp", "touches MCP and tool integration"),
            ("voice", "includes voice / realtime system concerns"),
            ("inference", "covers model serving or inference tradeoffs"),
            ("production", "keeps returning to production-grade engineering"),
            ("enterprise", "frames the problem through enterprise constraints"),
            ("code", "connects the topic back to software engineering practice"),
        ]
        for needle, phrase in cue_map:
            if needle in low and phrase not in cues:
                cues.append(phrase)
        if cues:
            summary.append("Key angle: " + "; ".join(cues[:2]) + ".")
    return " ".join(summary)


def transcript_excerpt(transcript_text: str | None, max_chars: int = 700) -> str:
    if not transcript_text:
        return "Transcript unavailable."
    text = re.sub(r"\s+", " ", transcript_text).strip()
    excerpt = text[:max_chars].rsplit(" ", 1)[0].strip()
    return excerpt + ("..." if len(text) > len(excerpt) else "")


def detect_themes(video: Video, transcript_text: str | None) -> list[str]:
    hay = f"{video.title}\n{video.description}\n{transcript_text or ''}".lower()
    themes = [name for name, needles in THEME_RULES if any(n in hay for n in needles)]
    return themes[:3] or ["General AI Engineering"]


def write_note(video: Video, transcript_status: str, plain_path: Path | None) -> Path:
    transcript_text = plain_path.read_text(errors="ignore") if plain_path and plain_path.exists() else None
    themes = detect_themes(video, transcript_text)
    slug = slugify(video.title)
    note_path = VIDEO_DIR / f"{video.playlist_index:03d}-{video.id}-{slug}.md"
    transcript_rel = plain_path.relative_to(ROOT).as_posix() if plain_path and plain_path.exists() else ""
    summary = summarize(video, transcript_text)
    excerpt = transcript_excerpt(transcript_text)

    content = f"""---
video_id: {video.id}
playlist_index: {video.playlist_index}
title: {safe_yaml(video.title)}
channel: "AI Engineer"
url: {safe_yaml(video.url)}
duration: {safe_yaml(video.duration_string)}
duration_seconds: {video.duration_seconds if video.duration_seconds is not None else 'null'}
view_count: {video.view_count if video.view_count is not None else 'null'}
transcript_status: {transcript_status}
transcript_path: {safe_yaml(transcript_rel)}
themes:
"""
    for theme in themes:
        content += f"  - {safe_yaml(theme)}\n"
    content += f"""ingested_at: {datetime.now(timezone.utc).replace(microsecond=0).isoformat()}
source_inventory: {safe_yaml(INVENTORY_DEFAULT)}
summary: {safe_yaml(summary)}
---

# {video.title}

## Summary
{summary}

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: {video.url}
- Duration: {video.duration_string}
- Playlist index: {video.playlist_index}
- Transcript status: `{transcript_status}`

## Theme hooks
"""
    for theme in themes:
        content += f"- [[{theme}]]\n"
    content += f"""

## Transcript excerpt
> {excerpt}

## Transcript notes
"""
    if transcript_rel:
        content += f"- Full cleaned transcript: [[{transcript_rel}]]\n"
    else:
        content += "- Transcript not available during ingestion.\n"
    if video.description.strip():
        desc = first_paragraph(video.description)
        if desc:
            content += f"- Description cue: {desc.strip()}\n"
    content += "\n## Book angles\n"
    for theme in themes:
        content += f"- Could support a chapter/section on **{theme}**.\n"

    note_path.write_text(content)
    return note_path


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


def load_existing_notes() -> list[NoteRecord]:
    records: list[NoteRecord] = []
    for path in sorted(VIDEO_DIR.glob("*.md")):
        text = path.read_text(errors="ignore")
        fm = parse_frontmatter(text)
        idx = fm.get("playlist_index")
        title = str(fm.get("title") or path.stem)
        if not isinstance(idx, int):
            continue
        themes = [str(t) for t in fm.get("themes", [])] if isinstance(fm.get("themes"), list) else []
        summary = str(fm.get("summary") or "")
        transcript_status = str(fm.get("transcript_status") or "unknown")
        records.append(
            NoteRecord(
                note_name=path.stem,
                title=title,
                playlist_index=idx,
                themes=themes or ["General AI Engineering"],
                transcript_status=transcript_status,
                summary=summary,
            )
        )
    return sorted(records, key=lambda r: r.playlist_index)


def build_theme_map_from_records(records: list[NoteRecord]) -> dict[str, list[NoteRecord]]:
    theme_to_notes: dict[str, list[NoteRecord]] = {}
    for record in records:
        for theme in record.themes:
            theme_to_notes.setdefault(theme, []).append(record)
    return dict(sorted(theme_to_notes.items()))


def transcript_status_summary(records: list[NoteRecord]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for record in records:
        counts[record.transcript_status] = counts.get(record.transcript_status, 0) + 1
    return dict(sorted(counts.items()))


def record_text(record: NoteRecord) -> str:
    return f"{record.title} {record.summary} {' '.join(record.themes)}".lower()


def top_ideas(records: list[NoteRecord], limit: int = 10) -> list[tuple[str, int]]:
    scored: list[tuple[str, int]] = []
    for idea, needles in IDEA_RULES:
        score = sum(1 for r in records if any(n in record_text(r) for n in needles))
        scored.append((idea, score))
    return sorted(scored, key=lambda x: (-x[1], x[0]))[:limit]


def top_speakers(records: list[NoteRecord], limit: int = 12) -> list[tuple[str, int]]:
    counts = Counter()
    for r in records:
        m = re.search(r"[—-]\s*([^,|]+)", r.title)
        if not m:
            continue
        speaker = m.group(1).strip()
        if len(speaker) < 2:
            continue
        counts[speaker] += 1
    return counts.most_common(limit)


def strongest_theme_examples(theme_to_notes: dict[str, list[NoteRecord]], theme: str, limit: int = 5) -> list[NoteRecord]:
    notes = theme_to_notes.get(theme, [])
    return sorted(notes, key=lambda r: (-(len(r.summary)), r.playlist_index))[:limit]


def write_theme_notes(theme_to_notes: dict[str, list[NoteRecord]]) -> None:
    for theme, notes in theme_to_notes.items():
        path = THEME_DIR / f"{theme}.md"
        theme_counter = Counter()
        for record in notes:
            for other_theme in record.themes:
                if other_theme != theme:
                    theme_counter[other_theme] += 1
        lines = [f"# {theme}", "", "## Corpus coverage", "", f"- Total tagged videos: {len(notes)}", ""]
        lines += ["## Cross-video synthesis", ""]
        lines.append(f"- This theme appears across {len(notes)} talks, suggesting it is a durable pillar rather than a one-off trend.")
        if theme_counter:
            related = ", ".join(f"{name} ({count})" for name, count in theme_counter.most_common(3))
            lines.append(f"- Most common adjacent themes: {related}.")
        example_titles = "; ".join(f"#{r.playlist_index} {r.title}" for r in notes[:3])
        lines.append(f"- Representative talks: {example_titles}.")
        lines += ["", "## Seed videos", ""]
        for record in notes:
            lines.append(f"- [[{record.note_name}|#{record.playlist_index} — {record.title}]]")
        lines += ["", "## Notes", "", "- Use this note as the landing page for future hand-written synthesis and chapter extraction."]
        path.write_text("\n".join(lines) + "\n")


def write_batch_file(videos: list[Video], notes: list[Path], batch_name: str) -> Path:
    path = BATCH_DIR / f"{batch_name}.md"
    lines = [f"# Batch: {batch_name}", "", f"Videos ingested: {len(videos)}", ""]
    for video, note in zip(videos, notes):
        lines.append(f"- [[{note.stem}|#{video.playlist_index} — {video.title}]]")
    lines.append("")
    path.write_text("\n".join(lines))
    return path


def update_index(all_records: list[NoteRecord], batch_notes: list[Path], batch_name: str) -> None:
    index_path = META_DIR / "AI Engineer KB Index.md"
    lines = [
        "# AI Engineer KB Index",
        "",
        "- [[Channel Overview]]",
        "- [[Video Inventory]]",
        "- [[Theme Map]]",
        "- [[Book Outline Seeds]]",
        "- [[../06_Output_Playbooks/00_README|Output Playbooks]]",
        "",
        "## Ingestion",
        f"- [[batches/{batch_name}|Latest batch: {batch_name}]]",
        f"- Total video notes in corpus: {len(all_records)}",
        f"- Video notes created in this batch: {len(batch_notes)}",
        "",
        "## Themes",
    ]
    theme_files = sorted(p.stem for p in THEME_DIR.glob("*.md"))
    for theme in theme_files:
        lines.append(f"- [[{theme}]]")
    lines += [
        "",
        "## Output system",
        "- [[../06_Output_Playbooks/Topic-to-Output Matrix|Topic-to-Output Matrix]]",
        "- [[../06_Output_Playbooks/YouTube Episode Pipeline|YouTube Episode Pipeline]]",
        "- [[../06_Output_Playbooks/Book Production Map|Book Production Map]]",
        "- [[../06_Output_Playbooks/Research Pack Template|Research Pack Template]]",
    ]
    lines += ["", "## Recent notes", ""]
    for note in batch_notes:
        record = next((r for r in all_records if r.note_name == note.stem), None)
        if record:
            lines.append(f"- [[{record.note_name}|#{record.playlist_index} — {record.title}]]")
    index_path.write_text("\n".join(lines) + "\n")


def update_theme_map(theme_to_notes: dict[str, list[NoteRecord]]) -> None:
    path = META_DIR / "Theme Map.md"
    lines = ["# Theme Map", ""]
    for theme, notes in theme_to_notes.items():
        lines.append(f"## [[{theme}]]")
        lines.append("")
        lines.append(f"- Corpus count: {len(notes)}")
        for record in notes[:8]:
            lines.append(f"- [[{record.note_name}|#{record.playlist_index} — {record.title}]]")
        lines.append("")
    path.write_text("\n".join(lines) + "\n")


def update_book_outline(theme_to_notes: dict[str, list[NoteRecord]]) -> None:
    path = BOOK_IDEAS_DIR / "Book Outline Seeds.md"
    lines = [
        "# Book Outline Seeds",
        "",
        "## Possible sections",
        "",
        "1. Why fundamentals still matter in the age of AI coding",
        "2. Agents as systems: architecture, orchestration, and human control",
        "3. Evaluations, reliability, and production quality",
        "4. MCP, tool use, and the emerging agent runtime layer",
        "5. Org design: how teams, leaders, and companies adapt",
        "6. Security, guardrails, and the cost of unsafe autonomy",
        "7. Retrieval, memory, and knowledge substrates for durable AI apps",
        "",
        "## Supporting seed talks",
        "",
    ]
    for theme, notes in theme_to_notes.items():
        lines.append(f"### {theme}")
        lines.append(f"- Corpus coverage: {len(notes)} talks")
        for record in notes[:6]:
            lines.append(f"- [[{record.note_name}|#{record.playlist_index} — {record.title}]]")
        lines.append("")
    path.write_text("\n".join(lines) + "\n")


def write_corpus_stats(all_records: list[NoteRecord], theme_to_notes: dict[str, list[NoteRecord]]) -> None:
    status_counts = transcript_status_summary(all_records)
    lines = ["# Corpus Stats", "", f"- Total notes: {len(all_records)}", f"- Transcript status mix: {status_counts}", "", "## Theme counts", ""]
    for theme, notes in sorted(theme_to_notes.items()):
        lines.append(f"- {theme}: {len(notes)}")
    lines += ["", "## Frequent speakers", ""]
    for speaker, count in top_speakers(all_records):
        lines.append(f"- {speaker}: {count}")
    CORPUS_STATS_PATH.write_text("\n".join(lines) + "\n")


def write_video_inventory() -> None:
    rows: list[dict[str, object]] = []
    for path in sorted(VIDEO_DIR.glob("*.md")):
        fm = parse_frontmatter(path.read_text(errors="ignore"))
        idx = fm.get("playlist_index")
        if not isinstance(idx, int):
            continue
        rows.append({
            "playlist_index": idx,
            "title": str(fm.get("title") or path.stem),
            "url": str(fm.get("url") or ""),
            "video_id": str(fm.get("video_id") or ""),
            "duration": str(fm.get("duration") or ""),
        })
    rows.sort(key=lambda row: int(row["playlist_index"]))

    lines = ["# Video Inventory", "", f"Total videos: {len(rows)}", ""]
    for row in rows:
        title = row["title"]
        url = row["url"]
        video_id = row["video_id"]
        duration = row["duration"]
        if url:
            lines.append(f"{row['playlist_index']}. [{title}]({url}) — `{video_id}` — {duration}")
        else:
            lines.append(f"{row['playlist_index']}. {title} — `{video_id}` — {duration}")
    VIDEO_INVENTORY_PATH.write_text("\n".join(lines) + "\n")


def write_synthesis_pack(all_records: list[NoteRecord], theme_to_notes: dict[str, list[NoteRecord]]) -> None:
    ideas = top_ideas(all_records, 10)
    lines = [
        "# First Serious Synthesis Pack",
        "",
        f"Corpus size analyzed: **{len(all_records)} videos**",
        "",
        "## Top 10 recurring ideas",
        "",
    ]
    for i, (idea, score) in enumerate(ideas, start=1):
        lines.append(f"{i}. **{idea}** — signal in ~{score} notes")
    lines += [
        "",
        "## Rough table of contents for a potential book",
        "",
        "1. **Why AI Engineering Is a New Discipline** — from prompt hacks to engineered systems",
        "2. **Taste, Judgment, and Software Fundamentals** — what still matters when code is cheap",
        "3. **From Copilot to Colleague** — how coding agents actually fit into real workflows",
        "4. **Harnesses, Specs, and Human Control** — designing agentic systems people can trust",
        "5. **Evals as Operations** — measurement, verification, and continuous quality loops",
        "6. **Context Is Infrastructure** — retrieval, memory, GraphRAG, and context engineering",
        "7. **The Runtime Layer** — MCP, tools, durable workflows, and agent platforms",
        "8. **Security, Identity, and Guardrails** — why autonomy raises the cost of mistakes",
        "9. **The AI-Native Organization** — leadership, ROI, incentives, and team design",
        "10. **Where This Is Going** — voice, realtime, open models, and the changing shape of software",
        "",
        "## Strongest 3 book angles",
        "",
        "### 1) The Operating Manual for AI-Native Software Engineering",
        "**Pros**",
        "- Broadest coverage across the corpus: agents, evals, tooling, orgs, and production concerns.",
        "- Useful for senior engineers, tech leads, and CTOs rather than only prompt-level practitioners.",
        "- Matches the channel's strongest recurring pattern: building systems, not demos.",
        "**Cons**",
        "- Risks feeling too wide unless grounded in a few memorable case studies.",
        "- Needs disciplined structure to avoid becoming a survey book.",
        "",
        "### 2) How to Build Coding-Agent Systems That Don't Turn Into Slop",
        "**Pros**",
        "- Sharp market demand and lots of high-signal material in the corpus.",
        "- Clear narrative arc: fundamentals → harnesses → evals → rollout → org change.",
        "- Distinctive because the corpus repeatedly pushes past vibe coding into operational practice.",
        "**Cons**",
        "- Narrower than the full AI engineering space.",
        "- Can age faster if framed around specific tools instead of principles.",
        "",
        "### 3) The Human Control Plane for Agents",
        "**Pros**",
        "- Strong conceptual hook linking control, memory, evals, security, and workflow design.",
        "- Gives the book a clear thesis instead of a generic 'AI trends' compilation.",
        "- Plays well with enterprise readers who care about trust and governance.",
        "**Cons**",
        "- Slightly more abstract and less obviously discoverable as a book title/theme.",
        "- Needs concrete stories from coding, support, search, and ops to stay vivid.",
        "",
        "## Especially valuable videos / speakers to revisit manually",
        "",
        "### Videos",
    ]
    shortlist = [
        (16, "Harness Engineering: How to Build Software When Humans Steer, Agents Execute"),
        (40, "Spec-Driven Development: Agentic Coding at FAANG Scale and Quality"),
        (45, "Claude Agent SDK [Full Workshop]"),
        (57, "Making Codebases Agent Ready"),
        (72, "Coding Evals: From Code Snippets to Codebases"),
        (77, "Hard Won Lessons from Building Effective AI Coding Agents"),
        (83, "Don't Build Agents, Build Skills Instead"),
        (87, "Future-Proof Coding Agents"),
        (96, "Vision: Zero Bugs"),
        (104, "Context Platform Engineering to Reduce Token Anxiety"),
        (105, "Context Engineering: Connecting the Dots with Graphs"),
        (120, "#define AI Engineer")
    ]
    records_by_idx = {r.playlist_index: r for r in all_records}
    for idx, _label in shortlist:
        r = records_by_idx.get(idx)
        if r:
            lines.append(f"- [[{r.note_name}|#{r.playlist_index} — {r.title}]]")
    lines += ["", "### Speakers", ""]
    for speaker, count in top_speakers(all_records, 10):
        lines.append(f"- **{speaker}** — appears {count} times")
    SYNTHESIS_PACK_PATH.write_text("\n".join(lines) + "\n")


def update_channel_overview(all_records: list[NoteRecord], latest_batch_name: str) -> None:
    path = META_DIR / "Channel Overview.md"
    status_counts = transcript_status_summary(all_records)
    status_line = ", ".join(f"{k}: {v}" for k, v in status_counts.items()) or "none yet"
    total_videos = len(load_inventory(Path(INVENTORY_DEFAULT))) if Path(INVENTORY_DEFAULT).exists() else len(all_records)
    lines = [
        "# Channel Overview",
        "",
        "## Source",
        "- Channel: [AI Engineer](https://www.youtube.com/@aiDotEngineer)",
        f"- Inventory snapshot source: `{INVENTORY_DEFAULT}`",
        f"- Total videos in current inventory: {total_videos}",
        "",
        "## What this knowledge base is for",
        "This vault is a working research substrate for turning the AI Engineer channel into a real AI engineering knowledge experience:",
        "- searchable video notes",
        "- transcript-backed references",
        "- recurring theme maps",
        "- reusable engineering concepts",
        "- practical patterns, tradeoffs, and failure modes",
        "- book/chapter seeds for future writing",
        "",
        "This is not meant to be a passive archive. The intended workflow is: gather the channel corpus, preserve source provenance, extract the durable AI engineering knowledge, connect related ideas, and rework the material into something useful for learning, reference, and production work.",
        "",
        "## Current ingestion status",
        f"- Latest completed batch: `{latest_batch_name}`",
        f"- Corpus notes created so far: `{len(all_records)}`",
        f"- Transcript status mix: `{status_line}`",
        "- Notes created: `01_Videos/`",
        "- Theme seeds created: `02_Themes/`",
        "- Transcript cache created: `99_Meta/transcripts/`",
        "",
        "## Working principle",
        f"Don’t try to summarize {total_videos} videos by hand in one pass.",
        "Instead:",
        "1. ingest in reproducible batches",
        "2. keep transcript provenance clear",
        "3. extract theme hooks early",
        "4. connect videos to people, companies, tools, and concepts",
        "5. synthesize across notes after each batch",
        "6. promote mature patterns into concept notes and chapter packets",
        "",
        "## Re-ingestion command",
        "```bash",
        "cd ~/DEV/LifeOS/knowledge-bases/ai-engineer-book",
        f"./99_Meta/scripts/ingest_ai_engineer_videos.py --inventory {INVENTORY_DEFAULT} --limit 20 --offset 120 --batch-name recent-121-140",
        "```",
    ]
    path.write_text("\n".join(lines) + "\n")


def rebuild_corpus_artifacts(batch_notes: list[Path], batch_name: str) -> list[NoteRecord]:
    all_records = load_existing_notes()
    theme_to_notes = build_theme_map_from_records(all_records)
    write_theme_notes(theme_to_notes)
    write_video_inventory()
    update_theme_map(theme_to_notes)
    update_book_outline(theme_to_notes)
    write_corpus_stats(all_records, theme_to_notes)
    write_synthesis_pack(all_records, theme_to_notes)
    update_index(all_records, batch_notes, batch_name)
    update_channel_overview(all_records, batch_name)
    return all_records


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--inventory", default=INVENTORY_DEFAULT)
    parser.add_argument("--limit", type=int, default=20)
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument("--batch-name", default=None)
    args = parser.parse_args()

    ensure_dirs()
    all_videos = load_inventory(Path(args.inventory))
    videos = all_videos[args.offset: args.offset + args.limit]
    batch_name = args.batch_name or f"recent-{args.offset + 1:03d}-{args.offset + len(videos):03d}"

    notes: list[Path] = []
    for video in videos:
        transcript_status, _raw_path, plain_path = fetch_transcript(video)
        note_path = write_note(video, transcript_status, plain_path)
        notes.append(note_path)

    batch_file = write_batch_file(videos, notes, batch_name)
    all_records = rebuild_corpus_artifacts(notes, batch_name)

    print(json.dumps({
        "batch": batch_name,
        "videos": len(videos),
        "corpus_notes": len(all_records),
        "notes": [str(p.relative_to(ROOT)) for p in notes],
        "batch_file": str(batch_file.relative_to(ROOT)),
    }, indent=2))


if __name__ == "__main__":
    main()
