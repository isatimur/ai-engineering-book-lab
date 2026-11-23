---
video_id: YIVkERhy8xo
playlist_index: 1204
title: "We're the bottleneck, but we don't have to be — Ido Salomon, AgentCraft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YIVkERhy8xo"
duration: "14:50"
duration_seconds: 890
view_count: 27000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/YIVkERhy8xo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-10-30T16:51:36+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ido Salomon, creator of AgentCraft and of MCP-UI (which became MCP Apps), argues that humans are the bottleneck in multi-agent work because steering, directing and reviewing many agents is exhausting, but that the skills to fix it already exist in strategy games. AgentCraft is a game-inspired orchestrator that raises the ceiling in three steps: visibility (a map of agents, files as runes, heat maps, a spacebar jump to whoever needs attention), autonomy (quests, orchestrators in containers, loops, a visual review kit), and collaboration (shared rooms with people and agents). An experimental mobile-game-style tool aims to lower the floor."
---

# We're the bottleneck, but we don't have to be — Ido Salomon, AgentCraft

## Summary
Ido Salomon created AgentCraft and MCP-UI, which became MCP Apps, and sits on the MCP steering committee. His question: if agents are so capable, why does nobody have an army of agents doing whatever they want? Spinning up 25 coding agents across several monitors sounds easy, but each one needs steering, direction and review, and at scale "it's just exhausting." So "we are the bottleneck." His claim is that the skills to cope already exist: supervising many units in Warcraft or The Sims is not so different from supervising agents. AgentCraft is "a game inspired orchestrator" built on that idea.

**The basics**
Each agent on the map is a real coding agent, detected on your machine or spawned from AgentCraft, with several harnesses supported. You prompt it in a side panel that also takes voice. Buildings on the map stand for functions: plugins and skills, an integrated terminal, integrated git.

**Step 1: visibility**
A side panel shows each agent's task, last action and current action, so you see who needs attention. The file system is projected onto the map, with files as "runes," so you see which agent touches which directory and when. Because the orchestrator sees all of this, it can draw heat maps. Like an RTS game, pressing spacebar jumps to the nearest thing that needs you, to answer a question or approve a plan.

**Step 2: autonomy**
Visibility is not enough. Watching files and tool calls is tiring, and nobody can hold 20 things in their head. Agents can scan the codebase and propose next tasks as "quests" you accept with one click. An orchestrator can break a general goal into parts and run them in a local container, so you do not babysit. Loops can scan Twitter or GitHub and build features in the background. To cope with five or 20 things to review at once, a review kit shows the changed files plus visual evidence (videos and screenshots), and can run several implementations in parallel so you pick the best.

**Step 3: collaboration**
Working alone with agents is "pretty lonely," and you may not be the right reviewer. AgentCraft rooms are hosted locally, reachable through tunnels. In his demo a product designer, his wife, joins; he sees her design work on his map and picks it up to implement while she keeps going. People and agents share a chat and a notice board, so everyone sees who does what. You can hand off or fork without being bound to git, and join from mobile or Telegram.

**Lowering the floor**
The feedback surprised him: children and people with no interest in productivity tools started orchestrating agents. That shifted his goal from raising the ceiling for power users to lowering the floor for "around 90% of the people in the world." An experimental tool, possibly called loopers, swaps the detailed RTS view for a mobile-game style: projects you return to, loops, and "I prompt, I get the result." He wants it customizable, since one person's easy interface is another's hard one. AgentCraft is installable with npx.

## Why it matters
- Names human attention, not agent capability, as the limit on running many agents, and offers a concrete UI answer.
- Borrows specific RTS patterns (a jump to the next item that needs attention, map projection, heat maps) as orchestration UX that other tools can copy.
- Shows a three-step path (visibility, then autonomy, then collaboration) for scaling from one agent to a team running many.
- The visual review kit, with videos, screenshots and parallel implementations, is a direct attack on the review bottleneck.
- Raises accessibility as a design goal: lowering the floor for non-developers, not only raising the ceiling for power users.

## Metadata
- Video: https://www.youtube.com/watch?v=YIVkERhy8xo
- Duration: 14:50
- Playlist index: 1204
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Okay. Hi everyone. Uh I'm Solomon. I am the creator of ATMCraft and I also created MCPUI which became MCP apps and MCP steering committee. I've done a bunch of other stuff. Uh but we're here to talk about why we're the bottleneck and why we don't have to be. So, uh as you all know and use every day, agents are amazing. There's so much they can do uh from generating cat memes to B2B SAS apps. So if they are so amazing, we have to ask why aren't we all unstoppable? Why doesn't everyone have an army of agents that just does whatever they want? So it should be relatively easy. I mean you just have a bunch of monitors and you spin up 25 cloud code agents and you're done. So the reality is that...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YIVkERhy8xo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
