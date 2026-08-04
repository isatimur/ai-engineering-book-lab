---
video_id: "RmJ4rTLV_x4"
playlist_index: 69
title: "Your Support Team Should Ship Code – Lisa Orr, Zapier"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=RmJ4rTLV_x4"
duration: "16:06"
duration_seconds: 966
view_count: 2750
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/RmJ4rTLV_x4.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T10:52:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Zapier's Lisa Orr describes Scout, an agent that categorizes support tickets, assesses fixability, and generates GitLab merge requests via a plan/execute/validate pipeline; it now produces 40% of support's app fixes and roughly doubles fix velocity per person."
---
# Your Support Team Should Ship Code – Lisa Orr, Zapier

## Summary
Lisa Orr describes how Zapier tackled "app erosion" — constant breakage across its 8,000+ third-party integrations — through two experiments that eventually merged: letting the support team ship code fixes directly (starting on four target apps, with engineering reviewing every merge request) and building "Scout," a codegen tooling project. Scout began as a suite of standalone APIs (an LLM-based diagnosis tool that gathers and curates bug context, a unit test generator, a search-based test case finder) that saw poor adoption as a separate "autocode" playground until MCP let engineers pull the same tools into Cursor, and the diagnosis API in particular became popular enough that support embedded it directly into their Zapier automation. That success led Zapier to combine the tools into "Scout agent," which categorizes an incoming support ticket, assesses whether it's fixable, and if so runs a GitLab CI/CD pipeline (plan, execute, validate) using Scout MCP tools and the Cursor SDK to generate a merge request that support reviews, tests, and can iterate on by chatting with the agent directly in GitLab. Orr reports categorization/fixability accuracy around 75% on their evals, that Scout now generates 40% of support's app fixes, and that it has roughly doubled per-person fix velocity (from 1-2 to 3-4 tickets/week), with some support engineers going on to become full engineers.

## Why it matters
- A concrete, metrics-backed case study of an internal agent moving from "suite of tools nobody used" to "adopted after embedding via MCP" — a specific data point on why tool discoverability/embedding matters more than tool capability alone.
- The plan/execute/validate GitLab pipeline plus a chat-based iteration loop is a reusable architecture for turning a codegen agent output into a reviewable, correctable artifact rather than a one-shot patch.
- Orr's argument for routing fixes through support rather than engineering (closer to customer context, fresher logs, better placed to validate the fix matches the actual complaint) is a clear, arguable claim about where in an org an agent-augmented workflow creates the most leverage.

## Metadata
- Video: https://www.youtube.com/watch?v=RmJ4rTLV_x4
- Duration: 16:06
- Playlist index: 69
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [music] I'm so excited to tell you about how at Zapier we are empowering our support team to ship code. Before I tell you about that, has anybody here visited the Grand Canyon? It's a good amount. Anybody rafted through the Grand Canyon? I see one person. I just got off an 18-day trip rafting through the Grand Canyon over 200 miles. It was incredible. No internet, no cell service. The moment I got off, I found out I was giving this talk. I didn't think about uh work at all on the river, but once I got off, I started thinking about the parallels between the Grand Canyon and Zapier. And we have one thing in common, and that is erosion. Now, natural erosion happens over millions of years with...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/RmJ4rTLV_x4.txt]]
- Description cue: Zapier maintains 8000+ integrations that break as APIs change. We had thousands of backlog support tickets with dozens more arriving weekly. To keep up with the traffic, we started building...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
