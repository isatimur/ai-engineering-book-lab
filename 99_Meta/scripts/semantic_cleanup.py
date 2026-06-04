#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[2]
VIDEO_DIR = ROOT / "01_Videos"
PEOPLE_DIR = ROOT / "03_People"
CONCEPTS_DIR = ROOT / "04_Concepts"
META_DIR = ROOT / "99_Meta"
AUDIT_DIR = META_DIR / "audits"
INVENTORY_PATH = Path("/tmp/ai-engineer-videos.jsonl")

import ingest_ai_engineer_videos as ingest


@dataclass
class Note:
    path: Path
    text: str
    frontmatter: dict[str, object]
    body: str
    video_id: str
    playlist_index: int
    title: str
    transcript_path: Path | None
    transcript_text: str
    summary: str
    themes: list[str]


PRIMARY_THEME_RULES = {
    "Coding Agents": [
        (8, ["coding agent", "agentic coding", "claude code", "github copilot", "copilot", "codex", "devin", "codegen", "vibe coding"]),
        (6, ["software development agents", "code review", "refactor", "codebase", "ide", "developer tool", "developer workflow"]),
        (4, ["software engineering", "write code", "engineering productivity"]),
    ],
    "Agent Architecture": [
        (8, ["multi-agent", "agent orchestration", "agent workflow", "durable agents", "stateful agents", "human control plane"]),
        (6, ["agent platform", "workflow", "orchestration", "durable", "stateful", "subagent", "skills instead"]),
        (4, ["agents need", "build agents", "agentic", "autonomy"]),
    ],
    "Evals & Reliability": [
        (9, ["evals", "evaluation", "judge the judge", "benchmark", "metrics", "reliability", "zero bugs"]),
        (6, ["quality", "testing", "verify", "verification", "measurement", "observability"]),
        (4, ["reliable", "production ready", "trust", "guardrail"]),
    ],
    "MCP & Tooling": [
        (10, ["model context protocol", "mcp server", "mcp"]),
        (6, ["tool calling", "agent sdk", "sdk", "runtime", "tooling", "protocol"]),
        (4, ["tools", "developer tool"]),
    ],
    "Voice & Realtime": [
        (10, ["realtime voice", "voice ai", "conversational ai", "turn-taking"]),
        (7, ["voice", "audio", "speech", "latency", "interrupting", "livekit", "pipecat"]),
        (4, ["realtime"]),
    ],
    "RAG & Retrieval": [
        (10, ["graphrag", "graph rag", "enterprise rag", "deep research", "knowledge graph"]),
        (7, ["rag", "retrieval", "search", "context engineering", "context platform", "knowledge app"]),
        (4, ["memory", "context"]),
    ],
    "Models & Inference": [
        (10, ["inference", "serving", "quantization", "open model", "gemma", "gemini", "sglang"]),
        (7, ["gpu", "mlx", "pareto frontier", "fine-tuning", "foundation model"]),
        (4, ["model"]),
    ],
    "Org Design & Leadership": [
        (10, ["cto", "leadership", "engineering organization", "ai-native company", "roi"]),
        (7, ["team", "manager", "enterprise", "product manager", "adoption", "startup", "raising vc"]),
        (4, ["company", "organization", "workforce"]),
    ],
    "Security & Guardrails": [
        (10, ["oauth", "identity for ai agents", "secure agents", "sandbox ai-generated code"]),
        (8, ["security", "secure", "sandbox", "compliance", "privacy", "auth0", "private cloud compute"]),
        (5, ["guardrail", "trust boundary"]),
    ],
}

CONCEPTS = {
    "Harness Engineering": ["harness engineering", "humans steer", "agents execute"],
    "Spec-Driven Development": ["spec-driven development", "spec driven"],
    "Context Engineering": ["context engineering", "context platform engineering", "token anxiety"],
    "Coding Evals": ["coding evals", "evals are not unit tests", "human seeded evals", "judge the judge"],
    "Model Context Protocol": ["model context protocol", "mcp"],
    "GraphRAG": ["graphrag", "graph rag", "graphs"],
    "Durable Agents": ["durable agents", "durable workflows", "stateful agents", "stateless nightmares"],
    "AI-Native Organization": ["ai-native company", "ai-native organization", "engineering organization", "ai transformation"],
    "Human Control Plane": ["human control plane", "human control", "humans steer"],
    "Vibe Coding": ["vibe coding", "vibes won't cut it", "vibe coding hangover"],
}

PEOPLE_SEEDS = {
    "Greg Brockman": [120],
    "Jensen Huang": [120],
    "Ryan Lopopolo": [16],
    "Al Harris": [40],
    "Thariq Shihipar": [45],
    "Eno Reyes": [57],
    "Naman Jain": [72],
    "Nik Pash": [77],
    "Barry Zhang": [83],
    "Mahesh Murag": [83],
    "Bill Chen": [87],
    "Brian Fioca": [87],
    "Johann Schleier-Smith": [96],
    "Val Bercovici": [104],
    "Stephen Chin": [105],
    "Jason Liu": [559, 612],
    "Simon Willison": [581, 591],
}

ORG_SEEDS = {
    "OpenAI": [16, 87, 120, 152],
    "Anthropic": [12, 45, 83],
    "Temporal": [38, 96, 167],
    "GitHub": [177, 492, 495],
    "WEKA": [104],
    "Neo4j": [105],
    "Braintrust": [112, 121, 290],
}

SUMMARY_TARGETS = {16, 40, 45, 57, 72, 77, 83, 87, 96, 104, 105, 120, 308, 310, 492, 495, 559, 581, 591, 612}
DUPLICATE_PAIRS = [(492, 495), (308, 310), (559, 612), (581, 591)]


def load_inventory() -> dict[str, dict]:
    out: dict[str, dict] = {}
    with INVENTORY_PATH.open() as f:
        for line in f:
            row = json.loads(line)
            out[row["id"]] = row
    return out


def split_frontmatter(text: str) -> tuple[str, str, dict[str, object]]:
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        return "", text, {}
    raw = m.group(1)
    body = m.group(2)
    return raw, body, ingest.parse_frontmatter(text)


def load_notes() -> list[Note]:
    notes: list[Note] = []
    for path in sorted(VIDEO_DIR.glob("*.md")):
        text = path.read_text(errors="ignore")
        _raw, body, fm = split_frontmatter(text)
        idx = fm.get("playlist_index")
        if not isinstance(idx, int):
            continue
        transcript_path = None
        tp = fm.get("transcript_path")
        if isinstance(tp, str) and tp:
            transcript_path = ROOT / tp
        transcript_text = transcript_path.read_text(errors="ignore") if transcript_path and transcript_path.exists() else ""
        notes.append(Note(
            path=path,
            text=text,
            frontmatter=fm,
            body=body,
            video_id=str(fm.get("video_id") or ""),
            playlist_index=idx,
            title=str(fm.get("title") or path.stem),
            transcript_path=transcript_path,
            transcript_text=transcript_text,
            summary=str(fm.get("summary") or ""),
            themes=[str(t) for t in fm.get("themes", [])] if isinstance(fm.get("themes"), list) else [],
        ))
    return notes


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def title_core(title: str) -> str:
    t = re.sub(r"^\[[^\]]+\]\s*", "", title)
    t = re.sub(r"\s*[—-]\s*[^—-]+$", "", t).strip()
    return t


def speaker_from_title(title: str) -> str | None:
    m = re.search(r"[—-]\s*([^,|\[]+)", title)
    return m.group(1).strip() if m else None


def score_theme(theme: str, title: str, description: str, transcript: str) -> int:
    score = 0
    hay_title = normalize(title)
    hay_desc = normalize(description)
    hay_head = normalize(transcript[:5000])
    for weight, needles in PRIMARY_THEME_RULES[theme]:
        for needle in needles:
            n = normalize(needle)
            if n in hay_title:
                score += weight + 4
            elif n in hay_desc:
                score += weight + 2
            elif n in hay_head:
                score += weight
    return score


def detect_themes(title: str, description: str, transcript: str) -> list[str]:
    scores = {theme: score_theme(theme, title, description, transcript) for theme in PRIMARY_THEME_RULES}
    ranked = sorted(scores.items(), key=lambda kv: (-kv[1], kv[0]))
    primary, primary_score = ranked[0]
    if primary_score < 6:
        return ["General AI Engineering"]
    themes = [primary]
    secondary, secondary_score = ranked[1]
    if secondary_score >= 8 and secondary_score >= primary_score * 0.6:
        themes.append(secondary)
    return themes


def sentenceish(text: str, limit: int = 210) -> str:
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"speaker info:.*", "", text, flags=re.I | re.S)
    text = re.sub(r"follow(?: us)? on.*", "", text, flags=re.I)
    text = re.sub(r"\s+", " ", text).strip(" -:\n\t")
    if not text:
        return ""
    parts = re.split(r"(?<=[.!?])\s+", text)
    sent = parts[0].strip(" -:\n\t")
    if len(sent) > limit:
        sent = sent[:limit].rsplit(" ", 1)[0].rstrip() + "…"
    return sent


def extract_focus(title: str, transcript: str) -> str:
    low = normalize(title + "\n" + transcript[:6000])
    if any(k in low for k in ["harness", "spec-driven", "agent ready", "future-proof coding", "copilot", "claude code", "coding agent"]):
        return "how teams constrain and steer coding agents in real codebases"
    if any(k in low for k in ["context engineering", "context platform", "graph", "retrieval", "rag", "token anxiety"]):
        return "how context and retrieval infrastructure shape downstream agent quality"
    if any(k in low for k in ["evals", "metrics", "judge", "zero bugs", "reliability"]):
        return "how evaluation loops turn agent output into something teams can trust"
    if any(k in low for k in ["mcp", "sdk", "workflow", "durable", "stateful"]):
        return "the runtime and workflow scaffolding required for dependable agents"
    if any(k in low for k in ["voice", "audio", "realtime"]):
        return "latency, turn-taking, and systems constraints in realtime AI"
    if any(k in low for k in ["security", "oauth", "sandbox", "identity"]):
        return "how security boundaries have to evolve once agents can act"
    if any(k in low for k in ["cto", "organization", "roi", "company", "leadership"]):
        return "how AI changes team structure, incentives, and operating models"
    if any(k in low for k in ["model", "inference", "serving", "gemma", "gemini"]):
        return "the model and systems tradeoffs behind production AI"
    return "what durable AI engineering practice looks like beyond demos"


def make_summary(note: Note, inventory: dict[str, dict]) -> str:
    inv = inventory.get(note.video_id, {})
    desc = sentenceish(str(inv.get("description") or "").replace("\r", " "))
    speaker = speaker_from_title(note.title)
    core = title_core(note.title)
    focus = extract_focus(note.title, note.transcript_text)
    lead = f"{speaker} argues that {core.lower()} is really about {focus}." if speaker else f"This talk argues that {core.lower()} is really about {focus}."
    transcript_line = sentenceish(note.transcript_text[:1200], 180)
    if transcript_line and transcript_line.lower().startswith(("music", "good morning", "welcome", "thank you")):
        transcript_line = ""
    parts = [lead]
    if desc and desc.lower() not in lead.lower():
        parts.append(desc)
    elif transcript_line and transcript_line.lower() not in lead.lower():
        parts.append(transcript_line)
    return " ".join(parts[:2])


def yaml_dump(fm: dict[str, object]) -> str:
    lines: list[str] = ["---"]
    key_order = [
        "video_id", "playlist_index", "title", "channel", "url", "duration", "duration_seconds", "view_count",
        "transcript_status", "transcript_path", "themes", "ingested_at", "source_inventory", "summary"
    ]
    for key in key_order:
        if key not in fm:
            continue
        value = fm[key]
        if isinstance(value, list):
            lines.append(f"{key}:")
            for item in value:
                lines.append(f"  - {ingest.safe_yaml(str(item))}")
        elif isinstance(value, int):
            lines.append(f"{key}: {value}")
        elif value is None:
            lines.append(f"{key}: null")
        else:
            lines.append(f"{key}: {ingest.safe_yaml(str(value))}")
    lines.append("---")
    return "\n".join(lines)


def replace_section(body: str, heading: str, new_content: str) -> str:
    pattern = rf"(## {re.escape(heading)}\n)(.*?)(?=\n## |\Z)"
    repl = lambda m: m.group(1) + new_content.rstrip() + "\n"
    if re.search(pattern, body, re.S):
        return re.sub(pattern, repl, body, flags=re.S)
    return body.rstrip() + f"\n\n## {heading}\n{new_content.rstrip()}\n"


def refresh_note(note: Note, inventory: dict[str, dict]) -> bool:
    inv = inventory.get(note.video_id, {})
    description = str(inv.get("description") or "")
    new_themes = detect_themes(note.title, description, note.transcript_text)
    new_summary = make_summary(note, inventory) if note.playlist_index in SUMMARY_TARGETS else note.summary
    changed = new_themes != note.themes or new_summary != note.summary
    if not changed:
        return False
    fm = dict(note.frontmatter)
    fm["themes"] = new_themes
    fm["summary"] = new_summary
    body = note.body
    body = replace_section(body, "Summary", new_summary + "\n")
    body = replace_section(body, "Theme hooks", "\n".join(f"- [[{t}]]" for t in new_themes) + "\n")
    body = replace_section(body, "Book angles", "\n".join(f"- Could support a chapter/section on **{t}**." for t in new_themes) + "\n")
    note.path.write_text(yaml_dump(fm) + "\n" + body.lstrip("\n"))
    return True


def annotate_duplicates(notes_by_idx: dict[int, Note]) -> None:
    review_lines = ["# Duplicate & Near-Duplicate Review — 2026-04-24", "", "Reviewed conservatively. Kept both notes, but marked clearer canonical neighbors where appropriate.", ""]
    for a_idx, b_idx in DUPLICATE_PAIRS:
        a = notes_by_idx[a_idx]
        b = notes_by_idx[b_idx]
        a_len = len(a.transcript_text)
        b_len = len(b.transcript_text)
        canonical = a if a_len >= b_len else b
        other = b if canonical is a else a
        for src, dst in [(canonical, other), (other, canonical)]:
            text = src.path.read_text(errors="ignore")
            note_line = f"- Related note: [[{dst.path.stem}|#{dst.playlist_index} — {dst.title}]]"
            canonical_line = f"- Canonical companion for this topic pair: [[{canonical.path.stem}|#{canonical.playlist_index} — {canonical.title}]]"
            if "## Related notes\n" not in text:
                text += "\n\n## Related notes\n"
            if note_line not in text:
                text = text.rstrip() + f"\n{note_line}"
            if canonical_line not in text:
                text = text.rstrip() + f"\n{canonical_line}\n"
            src.path.write_text(text)
        review_lines += [
            f"## {a.path.stem} ↔ {b.path.stem}",
            f"- Canonical note: [[{canonical.path.stem}|#{canonical.playlist_index} — {canonical.title}]]",
            f"- Companion note: [[{other.path.stem}|#{other.playlist_index} — {other.title}]]",
            f"- Rationale: canonical note has the richer transcript footprint ({len(canonical.transcript_text)} vs {len(other.transcript_text)} chars) and should be the default landing point for synthesis/citations.",
            "- Action taken: added reciprocal Related notes links plus a canonical-companion hint; did not merge or delete either note.",
            "",
        ]
    (AUDIT_DIR / "Duplicate Review 2026-04-24.md").write_text("\n".join(review_lines).rstrip() + "\n")


def slug(text: str) -> str:
    return ingest.slugify(text)


def build_people_and_concepts(notes_by_idx: dict[int, Note]) -> None:
    PEOPLE_DIR.mkdir(exist_ok=True)
    CONCEPTS_DIR.mkdir(exist_ok=True)
    for person, idxs in PEOPLE_SEEDS.items():
        records = [notes_by_idx[i] for i in idxs if i in notes_by_idx]
        if not records:
            continue
        orgs = sorted({re.search(r",\s*(.+)$", r.title).group(1).strip() for r in records if re.search(r",\s*(.+)$", r.title)})
        lines = [
            f"# {person}", "", "## Why this entity matters", "",
            f"- Recurs in the corpus as a useful speaker/operator to revisit for AI engineering judgment, practice, or framing.",
            f"- Current seed coverage: {len(records)} talk(s).", "",
            "## Related organizations", "",
        ]
        lines += [f"- {o}" for o in orgs] or ["- (add manually)"]
        lines += ["", "## Seed talks", ""]
        lines += [f"- [[{r.path.stem}|#{r.playlist_index} — {r.title}]]" for r in records]
        (PEOPLE_DIR / f"{person}.md").write_text("\n".join(lines) + "\n")
    for org, idxs in ORG_SEEDS.items():
        records = [notes_by_idx[i] for i in idxs if i in notes_by_idx]
        if not records:
            continue
        lines = [f"# {org}", "", "## Why this entity matters", "", f"- Appears repeatedly as an organization shaping tooling, infrastructure, or operating practice in the corpus.", "", "## Seed talks", ""]
        lines += [f"- [[{r.path.stem}|#{r.playlist_index} — {r.title}]]" for r in records]
        (PEOPLE_DIR / f"{org}.md").write_text("\n".join(lines) + "\n")
    all_notes = list(notes_by_idx.values())
    for concept, needles in CONCEPTS.items():
        matches = []
        for note in all_notes:
            hay = normalize(note.title + "\n" + note.summary + "\n" + note.transcript_text[:4000])
            if any(normalize(n) in hay for n in needles):
                matches.append(note)
        matches = sorted(matches, key=lambda n: n.playlist_index)[:12]
        if not matches:
            continue
        lines = [f"# {concept}", "", "## Why this concept matters", "", f"- This concept recurs across the corpus as a reusable framing device, practice, or systems pattern.", "", "## Seed talks", ""]
        lines += [f"- [[{r.path.stem}|#{r.playlist_index} — {r.title}]]" for r in matches]
        (CONCEPTS_DIR / f"{concept}.md").write_text("\n".join(lines) + "\n")


def write_indexes() -> None:
    people_files = sorted(p.stem for p in PEOPLE_DIR.glob("*.md"))
    concept_files = sorted(p.stem for p in CONCEPTS_DIR.glob("*.md"))
    (PEOPLE_DIR / "Index.md").write_text("# People & Organizations Index\n\n" + "\n".join(f"- [[{name}]]" for name in people_files if name != "Index") + "\n")
    (CONCEPTS_DIR / "Index.md").write_text("# Concepts Index\n\n" + "\n".join(f"- [[{name}]]" for name in concept_files if name != "Index") + "\n")


def write_weak_summary_backlog(notes_by_idx: dict[int, Note]) -> None:
    done = [i for i in sorted(SUMMARY_TARGETS) if i in notes_by_idx]
    remaining_candidates = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22, 23, 24]
    lines = ["# Weak Summary Backlog — 2026-04-24", "", "## Regenerated in this pass", ""]
    lines += [f"- [[{notes_by_idx[i].path.stem}|#{i} — {notes_by_idx[i].title}]]" for i in done]
    lines += ["", "## Still worth editorial attention", ""]
    lines += [f"- [[{notes_by_idx[i].path.stem}|#{i} — {notes_by_idx[i].title}]]" for i in remaining_candidates if i in notes_by_idx]
    (AUDIT_DIR / "Weak Summary Backlog 2026-04-24.md").write_text("\n".join(lines) + "\n")


def main() -> None:
    inventory = load_inventory()
    notes = load_notes()
    changed = 0
    for note in notes:
        if refresh_note(note, inventory):
            changed += 1
    notes = load_notes()
    notes_by_idx = {n.playlist_index: n for n in notes}
    annotate_duplicates(notes_by_idx)
    build_people_and_concepts(notes_by_idx)
    write_indexes()
    write_weak_summary_backlog(notes_by_idx)
    ingest.rebuild_corpus_artifacts([], "semantic-refresh-2026-04-24")
    print(json.dumps({
        "changed_notes": changed,
        "people_notes": len(list(PEOPLE_DIR.glob("*.md"))),
        "concept_notes": len(list(CONCEPTS_DIR.glob("*.md"))),
    }, indent=2))


if __name__ == "__main__":
    main()
