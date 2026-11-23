---
video_id: WJRdLNhrsLQ
playlist_index: 1037
title: "How to build an AI-Native Health Company — Dan Feng, Maven Clinic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WJRdLNhrsLQ"
duration: "17:19"
duration_seconds: 1039
view_count: 799
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/WJRdLNhrsLQ.txt"
themes:
  - "Org Design & Leadership"
ingested_at: 2026-08-20T22:28:41+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dan Feng of Maven Clinic, a digital health platform for women and families, describes a two-year move from a traditional tech company to an AI-native one. The frame has three parts: AI tools for internal work, AI in the product, and changed culture and process. Plans shrink to two-to-four-week sprints with one-or-two-page PRDs, because three-to-six-month plans break as models change. Senior engineers now implement with AI instead of delegating. Code review allows self-certified merges, a 500-line PR cap and stacked PRs. Reliability is set per task: multiple models must agree on reimbursement receipts, and tests must pass about 90% of repeated runs."
---

# How to build an AI-Native Health Company — Dan Feng, Maven Clinic

## Summary
Dan Feng is from Maven Clinic, which Feng calls the largest digital health platform for women and their families (maternity, fertility, parenting, menopause). Maven started its AI journey two years ago and built Maven Intelligence, an orchestration layer across its products. The thesis: there is no playbook for becoming AI native, and adoption is not optional, because "the farmers who can operate the tractor will replace the ones who cannot."

**Three parts of AI native**
- **Internal tools.** Before you ask someone else to do a task, ask whether AI can do it. Leaders, including in sales, now do tasks themselves instead of delegating.
- **AI in the product**, to improve user experience and cut operating cost. A 24/7 chatbot is the example, "way better and cheaper" than human agents.
- **Culture and process**, which Feng calls the most important part.

**Adoption by user group**
Early adopters need tools and a way to share what they learn. The majority need shared AI infrastructure, easy tools and a feedback channel. Many Maven engineers moved from Cursor last year to Claude Code this year, so the company supports both. Slow adopters need their concerns heard and a clear statement of where the company is heading.

**Hiring and rewards**
Senior engineers used to design a solution and hand implementation to others. Now they implement directly with AI, because delegation adds overhead. New hires must solve problems on their own. Maven hires for genuine interest in AI, product understanding (the PM-engineer line is blurring) and the ability to handle complex, ambiguous problems. Performance reviews now ask what each person has done with AI.

**Planning**
Building is now fast. Weeks of requirements and design up front no longer make sense, and teams never got them right anyway. A one-year vision is fine as inspiration. The real unit is a two-to-four-week sprint with a one-or-two-page PRD that serves as communication. Three-to-six-month plans are the awkward middle, because nobody knows what models can do in three months.

**Coding tools and code review**
The rollout started with the lowest-risk, easy-to-check tasks (unit tests, documentation) to build confidence and in-house rules and skills. Then AI coding tools became expected for all tasks, and the team asks engineers who decline why. Engineers now focus on review, architecture and evaluation. Output grew from hundreds to thousands of lines a day, and AI review tools help but are not trusted alone. So engineers may self-certify simple PRs and merge, staying accountable. Reviewed PRs stay under 500 lines, and big features use stacked PRs. The goal is to avoid the "rubber stamp", which gives false confidence. End-to-end automation, including self-healing from live traffic, is the goal and is "not there yet".

**Reliability**
Hallucination cannot be removed cheaply, so decide which failures are acceptable. A failed appointment booking at about 1 in 1,000 is tolerable because the user can retry. A wrong reimbursement amount is not. So several models read the same receipt, and the flow moves on only if they agree. Otherwise it offers a human agent. Hundreds of integration tests run many times each and must hold a high pass rate, for example 90%. After launch, an auto-eval system scores every conversation against rubrics, and a dedicated team spot-checks them, rising to about 20% review for new features.

## Why it matters
- Gives a concrete code-review policy for AI-scale output: self-certified merges with accountability, a 500-line cap, stacked PRs, and an explicit ban on rubber stamps.
- The per-task failure budget (appointment retry versus reimbursement amount) is a clear way to decide where to spend on reliability.
- Multi-model agreement with a human fallback is a simple, reusable pattern for high-stakes extraction.
- Repeated-run pass rates for integration tests show how test gates change when outputs are non-deterministic.
- Documents an org-level shift: shorter planning horizons, senior engineers implementing directly, and AI use in performance reviews.

## Metadata
- Video: https://www.youtube.com/watch?v=WJRdLNhrsLQ
- Duration: 17:19
- Playlist index: 1037
- Transcript status: `unavailable`

## Theme hooks
- [[Org Design & Leadership]]


## Transcript excerpt
> Transcript unavailable.

## Transcript notes
- Transcript not available during ingestion.

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
