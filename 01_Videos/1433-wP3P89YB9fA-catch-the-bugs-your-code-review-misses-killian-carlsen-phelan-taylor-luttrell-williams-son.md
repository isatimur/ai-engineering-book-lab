---
video_id: wP3P89YB9fA
playlist_index: 1433
title: "Catch the Bugs Your Code Review Misses - Killian Carlsen-Phelan & Taylor Luttrell-Williams, Sonar"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wP3P89YB9fA"
duration: "38:07"
duration_seconds: 2287
view_count: 111
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/wP3P89YB9fA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-31T01:42:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Taylor Luttrell-Williams and Killian Carlsen-Phelan, who make developer content at Sonar, run a hands-on workshop on Gitar, a code change verification agent that complements SonarQube's static analysis by inferring intent. On a sample ticketing API they show three PRs: an out-of-the-box review catches a refund bug outside the diff, a review directory and rules enforce an all-in pricing business rule, and CI failure diagnosis with auto apply and auto merge fixes a double-scan bug until the pipeline goes green. They argue agent volume causes review bottlenecks and more incidents, so verification must beat human speed, and they mention cross-repo and cross-PR analysis."
---

# Catch the Bugs Your Code Review Misses - Killian Carlsen-Phelan & Taylor Luttrell-Williams, Sonar

## Summary
Taylor Luttrell-Williams and Killian Carlsen-Phelan make developer content at Sonar, the maker of SonarQube. This is a browser-only workshop on Gitar (the captions spell it several ways), which they call a "code change verification agent." Their question: agents write code faster than anyone can inspect it, so who verifies what they ship?

**The problem**
Agent output causes two issues. First, a review bottleneck: fixed-size teams face growing queues and merges left waiting. Second, more production incidents, because agents do not respect project architecture, coding standards or guidelines they lack context for. The answer must be faster and better than human review.

**What the tool claims**
Gitar is tuned for a high signal-to-noise ratio, since "every false positive is a token spent" and a fix attempt risks an unintended change. It diagnoses CI failures, separates real breakages from flaky or infrastructure noise, and fixes issues autonomously, iterating until CI passes. Users choose their level of automation. It draws context from PR diffs, comments, CI logs, project instructions and repository rules, and adds dashboards. It complements SonarQube: static analysis can trace a SQL injection through 20 files, but what "it can't do is infer intent."

**Exercise one: out-of-the-box review**
The sample app, Box Office, is a Python ticketing API for a small concert venue with orders, check-in and a test suite. A PR adds ticket transfers with validation and tests, and CI is green. The review finds that a buyer can refund and void a ticket after giving it away, which cancels the friend's ticket. The bug sits in the existing orders.py, not in the diff, so a human reviewer would need working knowledge of cancellations to catch it. Commenting a fix command makes the agent push a commit and re-verify until green.

**Exercise two: business rules as context**
A PR adds a $3.50 service fee, so a $50 ticket costs $53.50. The company rule is that every price shown is the all-in price. That is not an engineering bug, so it lives in a .gitar review directory of markdown context and a rules directory. A rule fires when pricing files change and lists customer-facing fields as all-in or not. Another example rule follows a pasted Slack link and checks code against the discussion.

**Exercise three: full pipeline automation**
They enable GitHub auto merge and a branch rule set that requires status checks to pass. A refactor of ticket scanning fails the test that a ticket cannot be scanned twice. The agent reads the CI logs, finds that a second scan returns 200, and with auto apply and auto merge turned on, pushes fixes and merges once the pipeline passes. Killian calls the manual log-inspection loop one of the biggest annoyances of his career.

**Further features**
Functional validation checks a PR against its Jira or Linear ticket, so a change is "correct and complete and not just clean." A knowledge feature learns conventions and false positives from feedback, weighted by reviewer seniority. Cross-repo analysis finds PRs that merge cleanly but break another repo. Cross-PR analysis checks in-flight PRs against each other, since two PRs can pass alone and break production together.

## Why it matters
- The refund-after-transfer bug is a clear example of a defect outside the PR diff that diff-only review misses.
- The all-in price rule shows how to encode business rules that are not code correctness into review context and rules.
- Automated CI-failure diagnosis with auto apply and auto merge shows what closing the fix loop looks like in practice.
- Cross-PR analysis names a risk that grows with agent count: changes that pass alone but break together.
- This is a vendor workshop, so its claims about signal and cost come without independent numbers.

## Metadata
- Video: https://www.youtube.com/watch?v=wP3P89YB9fA
- Duration: 38:07
- Playlist index: 1433
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> My name is Taylor Luttrell and I'm joined here by Kilian Carlson. Together we make developer content at Sonar, the maker of SonarQube. But today, in particular, we are jazzed, dare I say, to get you all up and running with Git Guardian so that you can both find and critically fix issues in your AI-generated code before they ever emerge. Now, before we dive into the hands-on demo itself, if you would please direct your attention to one of the screens on either side of this room, we've provided for you a QR code and also a link there below which, once followed, you can use to set up a free, I should note free, 14-day pro trial for Git Guardian. So, this is going to be really...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wP3P89YB9fA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
