#!/usr/bin/env python3
"""Rebuild evidence/Shared Artifacts.md and inject Artifacts sections into notes.

Reads 99_Meta/video-descriptions.jsonl, extracts every external artifact
(GitHub repos, arXiv papers, Hugging Face artifacts, deep-link resources)
speakers shipped alongside their talks, and:

  1. regenerates the registry at evidence/Shared Artifacts.md
  2. appends an "## Artifacts" section to any note that lacks one

Both outputs are deterministic and idempotent. Stdlib-only.
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "99_Meta" / "video-descriptions.jsonl"

URL_RE = re.compile(r"https?://[^\s\)\]\>\"',]+")
SKIP_HOSTS = {
    "youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com",
    "twitter.com", "x.com", "www.twitter.com", "instagram.com",
    "www.instagram.com", "linkedin.com", "www.linkedin.com", "facebook.com",
    "tiktok.com", "www.tiktok.com", "discord.gg", "discord.com", "t.me",
    "bit.ly", "lu.ma", "www.lu.ma", "apply.ai.engineer", "www.ai.engineer",
    "ai.engineer", "ti.to", "forms.gle", "docs.google.com",
    "buttondown.email", "substack.com", "goo.gl", "shorturl.at",
    "tinyurl.com", "eventbrite.com", "www.eventbrite.com",
}
# Known paper titles (extend as papers accrue; arXiv API can fill new ones).
PAPER_TITLES = {
    "2312.08914": "CogAgent: A Visual Language Model for GUI Agents",
    "2408.06072": "CogVideoX: Text-to-Video Diffusion Models with An Expert Transformer",
    "2507.01006": "GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable RL",
    "2507.19457": "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning",
    "2508.06471": "GLM-4.5: Agentic, Reasoning, and Coding (ARC) Foundation Models",
}


def classify(url: str, host: str):
    """Return (kind, canonical_url) or None. kind ∈ repo|paper|model|resource."""
    if host in SKIP_HOSTS or host.endswith(".youtube.com"):
        return None
    if host in ("github.com", "www.github.com"):
        parts = urlparse(url).path.strip("/").split("/")
        if len(parts) >= 2:
            return "repo", f"https://github.com/{parts[0]}/{parts[1]}"
        return None
    if host in ("arxiv.org", "www.arxiv.org"):
        u = url.replace("/pdf/", "/abs/").removesuffix(".pdf")
        return "paper", u.rstrip(".,;:!?").rstrip("/")
    if host == "huggingface.co":
        return "model", url.split("?")[0].rstrip("/")
    if urlparse(url).path not in ("", "/"):
        return "resource", url.split("?")[0].split("#")[0].rstrip(".,;:!?").rstrip("/")
    return "homepage", url.split("?")[0].rstrip("/")


def main() -> None:
    note_by_id: dict[str, Path] = {}
    meta_by_id: dict[str, tuple[int, str]] = {}
    for n in (ROOT / "01_Videos").glob("*.md"):
        m = re.match(r"(\d+)-([A-Za-z0-9_-]{11})-", n.name)
        if m:
            note_by_id[m.group(2)] = n
            meta_by_id[m.group(2)] = (int(m.group(1)), n.stem)

    registry = defaultdict(set)   # (kind, url) -> {(idx, stem)}
    per_note = defaultdict(dict)  # note path -> {url: kind}
    for line in SRC.read_text().splitlines():
        try:
            d = json.loads(line)
        except json.JSONDecodeError:
            continue
        vid = d.get("id")
        if vid not in note_by_id:
            continue
        for url in URL_RE.findall(d.get("description") or ""):
            host = (urlparse(url).hostname or "").lower()
            r = classify(url, host)
            if not r:
                continue
            kind, canon = r
            if kind != "homepage":
                per_note[note_by_id[vid]][canon] = kind
            # registry keeps homepages only when >=2 talks reference them
            registry[(kind, canon)].add(meta_by_id[vid])

    # --- 1. registry markdown ---
    def vref(r):
        return f"[[{r[1]}|#{r[0]}]]"

    def section(kind, keep=None):
        return sorted(
            ((u, sorted(rs)) for (k, u), rs in registry.items()
             if k == kind and (keep is None or keep(u, rs))),
            key=lambda x: (-len(x[1]), x[0]),
        )

    covered = len({v for rs in registry.values() for v in rs})
    out = [
        "# Shared Artifacts", "",
        "External artifacts referenced by corpus talks — the repos, papers, and",
        "resources speakers shipped alongside their videos. Extracted from full",
        "YouTube descriptions (`99_Meta/video-descriptions.jsonl`, refetchable);",
        "each entry links back to its source video note(s). Sister file:",
        "[[External References]] (sources the *book* engages with directly).", "",
        f"> Coverage: {covered} videos referenced at least one artifact; "
        f"corpus size {len(note_by_id)}.",
        "> Regenerate: `python3 99_Meta/scripts/fetch_video_descriptions.py && "
        "python3 99_Meta/scripts/build_shared_artifacts.py`", "",
    ]
    gh = section("repo")
    out += [f"## GitHub repositories ({len(gh)})", ""]
    out += [f"- <{u}> — " + ", ".join(vref(r) for r in rs[:4]) for u, rs in gh] + [""]
    pp = section("paper")
    out += [f"## Papers ({len(pp)})", ""]
    for u, rs in pp:
        title = PAPER_TITLES.get(u.rsplit("/", 1)[-1], u.rsplit("/", 1)[-1])
        out.append(f"- [{title}]({u}) — " + ", ".join(vref(r) for r in rs[:4]))
    out += ["", "> See also arXiv:2606.05608 (Cao, *Agentic Software*) in [[External References]].", ""]
    mh = section("model")
    out += [f"## Hugging Face artifacts ({len(mh)})", ""]
    out += [f"- <{u}> — " + ", ".join(vref(r) for r in rs[:4]) for u, rs in mh] + [""]
    deep = section("resource")
    deep += section("homepage", keep=lambda u, rs: len(rs) >= 2)
    deep.sort(key=lambda x: (-len(x[1]), x[0]))
    out += [f"## Deep-link resources ({len(deep)})", "",
            "Sites kept only when linked by ≥2 talks or pointing below a homepage",
            "(docs pages, posts, whitepapers).", ""]
    out += [f"- <{u}> — " + ", ".join(vref(r) for r in rs[:4]) for u, rs in deep] + [""]
    (ROOT / "evidence" / "Shared Artifacts.md").write_text("\n".join(out))

    # --- 2. per-note injection (idempotent) ---
    updated = 0
    for n, urls in per_note.items():
        s = n.read_text()
        if "## Artifacts" in s:
            continue
        lines = ["\n## Artifacts",
                 "Shipped alongside this talk (from the video description; "
                 "registry: `evidence/Shared Artifacts.md`):"]
        for url, kind in sorted(urls.items(), key=lambda x: (x[1], x[0])):
            lines.append(f"- {kind}: <{url}>")
        n.write_text(s.rstrip() + "\n" + "\n".join(lines) + "\n")
        updated += 1

    print(f"[artifacts] registry: {len(gh)} repos, {len(pp)} papers, "
          f"{len(mh)} hf, {len(deep)} deep links; notes updated: {updated}")


if __name__ == "__main__":
    main()
