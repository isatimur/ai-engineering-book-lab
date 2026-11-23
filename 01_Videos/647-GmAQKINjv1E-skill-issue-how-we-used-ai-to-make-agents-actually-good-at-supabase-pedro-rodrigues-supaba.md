---
video_id: GmAQKINjv1E
playlist_index: 647
title: "Skill Issue: How We Used AI to Make Agents Actually Good at Supabase — Pedro Rodrigues, Supabase"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=GmAQKINjv1E"
duration: "1:18:41"
duration_seconds: 4721
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/GmAQKINjv1E.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-07T23:19:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Pedro Rodrigues, an AI tooling engineer at Supabase who works on agent experience, shows how skills teach agents what training data misses. In his demo, Claude Code builds a Postgres view that silently bypasses row-level security and leaks salary data to every user. A short security skill makes it add the security invoker flag. He explains progressive disclosure, why MCP and skills complement each other (the tool connects, the skill explains its use), and a with-skill versus without-skill eval loop. His live eval gave the wrong verdict because of a badly written assertion, which shows how tricky evals are."
---

# Skill Issue: How We Used AI to Make Agents Actually Good at Supabase — Pedro Rodrigues, Supabase

## Summary
Pedro Rodrigues, from Lisbon, is an AI tooling engineer at Supabase. His job is to make Supabase as agent-friendly as possible, which he calls agent experience, the agent version of developer experience. This opening workshop, renamed on the day to a "level up your skills" theme, covers two months of writing Supabase's own skills. His thesis: skills are "the secret sauce" for making agents good at a product. They carry knowledge that agents miss from training data, and they need evals like any other code.

**What a skill is**
A skill is a folder, not just a SKILL.md file. The front matter (name and description) loads first and acts as an envelope, so the agent decides when to read the rest. That is progressive disclosure, which MCP lacked. SKILL.md is "the index on steroids", pointing to reference files that can point to more files, plus scripts. MCP and skills are not rivals. MCP tools run server-side, need no local environment and carry auth; scripts depend on your OS. For a large database schema he would use an MCP tool that loads in chunks, plus a skill that explains how to use it.

**The demo: a silent RLS leak**
The app is a vibe-coded Next.js performance-review tool on Supabase with employees, managers and HR. He asks Claude Code, through the local Supabase MCP server (about 20 tools), to build a view of headcount and average salary per department. Claude creates and tests it and says it works. But an ordinary employee can see every department's salaries. A Postgres view runs with its creator's rights by default, so it bypasses row-level security on the tables. The fix is the security invoker flag, available since Postgres 15. His security skill states this, and asks that exposed schemas always have RLS enabled. With the skill loaded, Claude adds the flag. A second, deliberately planted policy bug was still unfixed when time ran out.

**Making skills load**
Descriptions that start with the verb "use" seemed to raise the load rate in his experiments with Claude. Writing use plus the skill name in the prompt loads it almost every time; a slash command guarantees it. Otherwise, test prompts that should and should not trigger the skill, and tune the description. He installs skills with an open npm package called skills, which works across agents, unlike vendor plugins.

**Evaluating skills**
He follows an OpenAI post on evaluating agent skills: define metrics, write the skill, run scenarios, grade, iterate. His harness uses the agent skills open standard's eval.json (prompt, expected output, assertions), resets the database, and runs headless Claude Code with and without the skill. The live run reported the opposite of the truth: the assertion checked a system catalog instead of the view, so the with-skill run failed and the other passed. His lesson: writing good scenarios and correct graders is the hard part, and LLM judges can hallucinate too.

**Production advice**
Locally, many installed skills cost little because descriptions are small. In CI, install only the skills a job needs. Treat published skills as documentation: update them when features change, and remove skills users never load.

## Why it matters
- A concrete, reproducible example of an agent reporting success while shipping a security hole (a view that bypasses row-level security), and of a few lines of skill text preventing it.
- Shows clearly how MCP and skills divide the work: the tool provides the integration, the skill provides the knowledge of how to use it.
- The failed live eval is a useful warning: a wrong assertion can invert the verdict, so graders need review as much as the skill does.
- Gives a simple starting harness for skill evals: the same prompts run with and without the skill, from a reset state, then graded.
- Practical tips on skill triggering (start with the verb use, test both positive and negative prompts) that a book on agent tooling can cite.

## Metadata
- Video: https://www.youtube.com/watch?v=GmAQKINjv1E
- Duration: 1:18:41
- Playlist index: 647
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone. Uh is everyone excited for the the conference? >> Awesome. We got a full house here. Uh it's very I'm very glad to be here. Very honored uh to be giving uh the opening or one of the opening workshops uh today. If you've noticed already uh the title is slightly different uh from what we have in the schedule. I've basically done a rebrand but the theme for the workshop will remain the same. Uh we went from skill issue to level up your skills. I've decided to move the skill issue title to to the keynote that I'm giving uh tomorrow. If you'll have time to to know more about what's the keynote is going to be about. Uh but mainly uh it's um this workshop. Basically, this workshop...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/GmAQKINjv1E.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://supabase.com/blog/authors/pedro_rodrigues>
