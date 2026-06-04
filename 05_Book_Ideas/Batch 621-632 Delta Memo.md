# Batch 621-632 Delta Memo

## What changed because of videos 621-632
This 12-video batch does **not** overturn the book's core thesis or chapter architecture. It mostly strengthens and modernizes the existing argument with fresher evidence in four places:

1. **Harnesses are becoming software factories.**
   - The harness is no longer just repo rules + tests + tool wrappers.
   - New talks show staged pipelines (plan / produce / review / ship), reusable skills/plugins, and subagents working in parallel.
   - Best supporting videos: [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629]], [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]], [[621--QFHIoCo-Ko-full-walkthrough-workflow-for-ai-coding-matt-pocock|#621]].

2. **MCP is not just interoperability; it is a context + governance problem.**
   - Naive MCP design creates tool overload and context-window blowups.
   - Enterprise deployment pushes toward gateways, observability, access control, and trusted identity layers.
   - Best supporting videos: [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|#622]], [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624]], [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]], [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627]].

3. **Evals look more like shared platforms than local test loops.**
   - The newer evidence makes evals feel more organizational and infrastructural.
   - Observability and eval are increasingly one flywheel.
   - Best supporting video: [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]].

4. **AI-native orgs need shared alignment surfaces.**
   - Private agent workflows can create public coordination costs: duplicated work, surprise features, merge conflict debt, and PR review overload.
   - This sharpens the org chapter by adding "alignment debt" as a useful failure mode.
   - Best supporting video: [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623]].

## High-value claims / examples / quotes to preserve
- "We shouldn't be dumping loads of tools into context." — [[622-YBYUvGOuotE-mcp-mega-context-problem-matt-carey|#622]]
- Enterprises need a "root of trust" and often a gateway/blessed platform for MCP sprawl. — [[624-CD6R4Wf3jnY-what-we-learned-scaling-mcps-to-enterprise-karan-sampath-anthropic|#624]]
- GitHub materially reduced MCP context and token costs through tool grouping, intent-aware server behavior, and output reduction. — [[625-0n3MKk7r60w-lessons-from-scaling-github-s-remote-mcp-server-sam-morrow-github|#625]]
- Cross-app access uses the identity provider as a trust bridge between MCP clients and servers. — [[627-EmhRyw6xeT0-one-login-to-rule-them-all-cross-app-access-for-mcp-garrett-galow-workos|#627]]
- "An eval platform is not just a test runner." — [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]]
- "Observability and eval ... it's actually the same problem from a systems perspective." — [[628-_fQ7Z_Wfouk-why-building-eval-platforms-is-hard-phil-hetzel-braintrust|#628]]
- The "software factory" metaphor is now strong enough to recur across multiple chapters. — [[629-rnDm57Py54A-building-your-own-software-factory-eric-zakariasson-cursor|#629]]
- Codex's "unified agent harness" and bundled skills/apps/MCP/plugins make the harness thesis feel highly current. — [[632-MhHEGMFCEB0-codex-and-subagents-vaibhav-srivastav-katia-gil-guzman-openai|#632]]
- "None of our current tools give teams a shared space to discuss plans, gather the right context, and work with agents as a collective." — [[623-ClWD8OEYgp8-collaborative-ai-engineering-one-dev-two-dozen-agents-zero-alignment-maggie-appleton-githu|#623]]

## Thesis / structure impact
- **Core thesis:** unchanged, but strengthened.
- **Chapter structure:** unchanged.
- **Main refinement:** MCP shifts a bit more toward Chapter 5 (context management) plus Chapter 7 (identity/governance), while Chapter 6 focuses more cleanly on orchestration and control planes.
- **Best new recurring case-study candidate:** software factory + subagents.
