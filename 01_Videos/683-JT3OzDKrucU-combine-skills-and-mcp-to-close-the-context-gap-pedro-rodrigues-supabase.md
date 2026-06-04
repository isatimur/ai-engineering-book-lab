---
video_id: JT3OzDKrucU
playlist_index: 683
title: "Combine Skills and MCP to Close the Context Gap — Pedro Rodrigues, Supabase"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=JT3OzDKrucU"
duration: "18:27"
duration_seconds: 1107
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/JT3OzDKrucU.txt"
themes:
  - "MCP & Tooling"
  - "Agent Architecture"
ingested_at: 2026-05-19T11:04:12+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Pedro Rodrigues (AI tooling engineer, Supabase) announces the Supabase agent skill and distills three principles from building it: don't duplicate docs (point to source), if it can be skipped it will be (put critical content in skill.md not reference files), and be opinionated (encode optimal workflows). Empirical result: MCP alone vs. MCP + skill tested across Claude Opus 4.6, Sonnet 4.6, GPT 5.4, GPT 5.4 mini — skills improve task completeness score on all four models. The context gap: agents have tools (MCP) but lack institutional guidance on how to use them safely — skills close that gap."
---

# Combine Skills and MCP to Close the Context Gap — Pedro Rodrigues, Supabase

## Summary

Pedro Rodrigues (AI tooling engineer, Supabase) announces the Supabase agent skill at AI Engineer and shares the lessons from building it — described as the most time he's spent on a single document since his master's thesis.

**The MCP vs. skills debate, resolved.** When Rodrigues submitted this talk, MCP vs. skills was still contested. By the conference, the consensus had shifted: they're complementary, not competing. MCP gives agents tools (what they can do); skills give agents guidance (how to do it safely and correctly). The new debate is MCP vs. CLI — but that's a different talk.

**The core problem — the context gap.** Agents are already smart enough to do routine tasks. But when they encounter something they haven't seen in training — like your specific product, your updated APIs, your security model — they need guidance. Without it, Supabase observed three failure modes:

1. Missing security pitfalls (e.g., the `security_invoker = true` flag on SQL views over RLS-protected tables — without this flag, the view silently bypasses row-level security, exposing data)
2. Operating on stale training data and being stubborn about seeking fresh information
3. Using suboptimal workflows that aren't tuned for how Supabase works

**What a skill is.** A skill is a folder containing: a frontmatter envelope (name + description, which controls when the agent loads it), a `skill.md` main instructions file, and optional reference files (scripts, documentation excerpts). The frontmatter is how the agent decides which skill to invoke — it's the routing mechanism.

**The empirical result.** Supabase tested the same prompt (create a SQL view over an RLS-protected table) in three conditions: baseline (no MCP, no skill), MCP only, and MCP + skill. Tested across four models: Claude Opus 4.6, Sonnet 4.6, GPT 5.4, GPT 5.4 mini. Result: **MCP + skill outperformed all other conditions on all four models.** Agent with skill correctly added `security_invoker = true`; agent with MCP only did not.

**Three principles for skill writing:**

**1. Don't duplicate information.** Treat skills like internal documentation: you wouldn't duplicate your documentation, so don't duplicate it in the skill. Point the agent to the authoritative source (your existing docs). But be stubborn — agents default to training data; you must explicitly instruct them to go fetch current information from the right place. Supabase is exposing its documentation over SSH as a filesystem interface, on the premise that agents are very good at navigating filesystems with standard Linux tools.

**2. If it can be skipped, it will be skipped.** Agents are lazy about fetching external content — it's expensive (tool calls, web fetches). They'll default to what's in training. Even when they load a skill, they're reluctant to load reference files. And if a problem requires more than one reference file, loading two is nearly impossible, three or four essentially impossible. Implication: critical content that the agent absolutely cannot miss must go in `skill.md` directly, not in a reference file. Supabase started with the security checklist in a reference file; the agent missed it repeatedly. Moved it to `skill.md` — problem solved.

**3. Be opinionated.** You know your product and its optimal workflows better than anyone. Don't be afraid to encode those workflows explicitly. Example: Supabase's schema management workflow in the skill — run direct DDL on development/staging, use the advisor to check for security/performance issues, fix issues, then create the migration file. This prevents agents from creating a migration file on every schema change (a known anti-pattern).

**Testing skills with evals.** Rodrigues notes that we can now test documentation — running a markdown file through evals. He used Braintrust to run six Supabase-specific scenarios across the test conditions, producing a task completeness score. "I've been testing a markdown file" is the punchline — but it's serious: skills are testable artifacts.

**The distribution problem.** A question from the audience surfaced an unsolved problem: how do you distribute skills across your organization? There is no standard registry or package manager. Current approaches: bundled in repos (`.claude/`, `.cursor/` directories), Vercel's skills package, plugin bundles. The space is fragmented and not yet standardized.

## Why it matters

The Supabase case is the most rigorous empirical test of MCP + skills vs. MCP alone in the corpus. The result — skills improve task completeness on all four models tested — validates the thesis that tools without guidance are necessary but insufficient. The three principles (don't duplicate, can't-skip content in skill.md, be opinionated) are directly applicable to anyone building skills for their own product. The distribution problem Rodrigues surfaces (no standard skill registry) is a genuine infrastructure gap that hasn't been solved.

## Metadata
- Video: https://www.youtube.com/watch?v=JT3OzDKrucU
- Duration: 18:27
- Playlist index: 683
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Agent Architecture]]
- [[Coding Agents]]

## Key claims (for claims ledger)
- MCP gives agents capability (tools); skills give agents guidance (how to use tools safely) — they are complementary, not competing.
- MCP + skill outperforms MCP alone on all four models tested (Claude Opus 4.6, Sonnet 4.6, GPT 5.4, GPT 5.4 mini) on Supabase-specific tasks.
- Agents are lazy about loading reference files — if it can be skipped, it will be; critical content must live in skill.md directly.
- Skills should encode optimal product workflows, not just facts — opinionated guidance about how to work with the product.
- There is no standard distribution mechanism for skills; the ecosystem is fragmented across repo-bundled files, Vercel's skills package, and agent-specific plugins.
- Skills are testable artifacts: you can run evals against a markdown file to verify agent behavior.

## Book angles
- Chapter 3 (MCP) — clearest empirical validation that MCP alone leaves a context gap; skills fill it.
- Chapter 6 (software factory) — skills as machine-readable SOPs encoding optimal workflows; the Supabase schema management workflow is a factory stage.
- Chapter 7 (reliability) — the `security_invoker` example: tools without guidance produce silently insecure outputs; skills as a reliability layer.
- Chapter 8 (constrained delegation) — skills as scope constraints: the agent can only operate within the workflows the skill defines as correct.

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/JT3OzDKrucU.txt]]
