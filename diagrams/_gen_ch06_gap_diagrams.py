"""Builds the Chapter 6 gap inline figures (fig5–fig13) for the Visual Guide.

Chapter 6 is the longest chapter (12 H2 headings). The website inserts one
inline figure after each H2 in document order (manifest filtered by chapter,
sorted by index; the k-th heading gets the k-th figure). Existing figs 1–4
cover 4 of the 12 headings; these 9 new figures close the rest.

DSL, palette, signature mark all follow diagrams/STYLE.md and mirror the
pattern in _gen_gap_diagrams.py. Every NEW figure carries the signature mark
(via header()). Citations are corpus-confirmed via claims/Claims Ledger.md;
the replay/snapshot figure has no confirmable corpus attribution, so it omits
the citation line rather than inventing one.
"""
import json, os

ROOT = os.path.dirname(os.path.abspath(__file__))
INLINE = os.path.join(ROOT, "inline")

# palette (STYLE.md §1)
BLUE_S, BLUE_F = "#1e3a5f", "#93c5fd"
GREEN_S, GREEN_F, GREEN_T = "#047857", "#a7f3d0", "#065f46"
RED_S, RED_F, RED_T = "#dc2626", "#fee2e2", "#991b1b"
AMBER_S, AMBER_F, AMBER_T = "#b45309", "#fef3c7", "#92400e"
PURP_S, PURP_F, PURP_T = "#6d28d9", "#ddd6fe", "#4c1d95"
ORNG_S, ORNG_F, ORNG_T = "#c2410c", "#fed7aa", "#7c2d12"
NEU_S, NEU_F, NEU_T = "#64748b", "#e2e8f0", "#334155"
TITLE = "#1e40af"
GREY = "#64748b"
INK = "#1e293b"
DARK_S, DARK_F = "#334155", "#1e293b"

_s = [70000]
def _id():
    _s[0] += 1
    return _s[0]

def base(t, x, y, w, h, stroke="#1e293b", bg="transparent", sw=2, ss="solid", rnd=None):
    return dict(id=f"g{_id()}", type=t, x=x, y=y, width=w, height=h, angle=0,
                strokeColor=stroke, backgroundColor=bg, fillStyle="solid", strokeWidth=sw,
                strokeStyle=ss, roughness=0, opacity=100, groupIds=[], frameId=None,
                roundness=rnd, seed=_id(), version=1, versionNonce=_id(), isDeleted=False,
                boundElements=[], updated=1, link=None, locked=False)

def T(s, x, y, size, color, align="left", w=None, font=3):
    lines = s.split("\n")
    width = w or int(max(len(l) for l in lines) * size * 0.6) + 4
    e = base("text", x, y, width, int(len(lines) * size * 1.25), stroke=color)
    e.update(fontSize=size, fontFamily=font, text=s, originalText=s, textAlign=align,
             verticalAlign="top", baseline=int(size * 0.8), lineHeight=1.25, containerId=None)
    return e

def box(x, y, w, h, stroke, bg, sw=2, ss="solid"):
    return base("rectangle", x, y, w, h, stroke=stroke, bg=bg, sw=sw, ss=ss, rnd={"type": 3})

def ln(x1, y1, x2, y2, color, sw=2, ss="solid"):
    e = base("line", x1, y1, abs(x2 - x1), abs(y2 - y1), stroke=color, sw=sw, ss=ss)
    e.update(points=[[0, 0], [x2 - x1, y2 - y1]], lastCommittedPoint=None,
             startBinding=None, endBinding=None, startArrowhead=None, endArrowhead=None)
    return e

def arr(x1, y1, x2, y2, color, sw=2, ss="solid", head="arrow"):
    e = base("arrow", x1, y1, abs(x2 - x1), abs(y2 - y1) or 1, stroke=color, sw=sw, ss=ss)
    e.update(points=[[0, 0], [x2 - x1, y2 - y1]], lastCommittedPoint=None,
             startBinding=None, endBinding=None, startArrowhead=None, endArrowhead=head)
    return e

def header(els, eyebrow, title, role, x=44):
    els.append(T(eyebrow, x, 30, 13, GREY))
    els.append(T(title, x - 2, 50, 33, TITLE))
    els.append(ln(x, 96, x + 110, 96, "#2563eb", sw=3))
    els.append(ln(x + 116, 96, x + 226, 96, "#047857", sw=3))
    els.append(T(role, x, 112, 15, GREY))

def node(e, x, y, w, h, label, s, f, size=15, tcol=None):
    e.append(box(x, y, w, h, s, f))
    lines = label.count("\n") + 1
    ty = int(y + (h - lines * size * 1.25) / 2)
    e.append(T(label, x, ty, size, tcol or s, "center", w))

def save(name, els):
    doc = dict(type="excalidraw", version=2, source="https://excalidraw.com", elements=els,
               appState=dict(viewBackgroundColor="#ffffff", gridSize=None), files={})
    json.dump(doc, open(os.path.join(INLINE, name), "w"), ensure_ascii=False, indent=2)
    print("wrote inline/" + name)


# ─────────────── index 2 · fig5 — software factory needs an OS ───────────────
def fig5_factory_os():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 2",
           "The Factory Needs an Operating System",
           "A prepared workshop is not enough. Durable execution needs an OS underneath.")
    # left — workshop without an OS (red)
    e.append(box(44, 168, 420, 250, RED_S, "#fff5f5", sw=2))
    e.append(T("WORKSHOP WITHOUT AN OS", 44, 182, 15, RED_T, "center", 420))
    e.append(T("talented workers · no foreman's board", 44, 206, 12, RED_S, "center", 420))
    for i, x in enumerate((70, 200, 330)):
        node(e, x, 236, 96, 44, "worker", PURP_S, PURP_F, 13)
    e.append(T("· retry reruns finished work\n· subagents diverge on stale branches\n"
               "· reviewer gets fragments, not a roll-up",
               64, 302, 12.5, RED_S))
    e.append(T("more workers only multiply confusion", 44, 388, 12, GREY, "center", 420))
    # transition
    e.append(arr(466, 293, 500, 293, ORNG_S, sw=3))
    # right — the factory OS (green)
    e.append(box(506, 168, 420, 250, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("THE FACTORY OS", 506, 182, 15, GREEN_T, "center", 420))
    prims = ["durable task identities", "queues", "checkpoints + resumability",
             "visibility / roll-up", "clear places for review"]
    for i, p in enumerate(prims):
        y = 210 + i * 40
        e.append(box(526, y, 380, 32, GREEN_S, GREEN_F, sw=1))
        e.append(T(p, 526, y + 8, 14, GREEN_T, "center", 380))
    # banner
    e.append(box(44, 438, 882, 52, BLUE_F, "#eff6ff", sw=1))
    e.append(T("A factory is a prepared environment plus a quality system —\n"
               "plus an operating system, or extra workers only add entropy.", 64, 448, 15, BLUE_S))
    e.append(T("— after Eric Zakariasson, Cursor · corpus video #629", 44, 500, 12, "#475569"))
    save("ch06-fig5-factory-operating-system.excalidraw", e)


# ─────────────── index 3 · fig6 — agentic systems are workflows with state ───────────────
def fig6_workflows_with_state():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 3",
           "Stateful Workflows, Not Loose Intelligence",
           "A useful agent is a stateful workflow with probabilistic decision nodes.")
    # workflow band
    y = 190
    node(e, 44, y, 120, 52, "plan", BLUE_S, BLUE_F, 14)
    e.append(arr(166, y + 26, 196, y + 26, NEU_S))
    node(e, 198, y, 140, 52, "decide\n(probabilistic)", PURP_S, PURP_F, 12, PURP_T)
    e.append(arr(340, y + 26, 370, y + 26, NEU_S))
    node(e, 372, y, 130, 52, "run tool", GREEN_S, GREEN_F, 14)
    e.append(arr(504, y + 26, 534, y + 26, NEU_S))
    node(e, 536, y, 130, 52, "validate", GREEN_S, GREEN_F, 14)
    e.append(arr(668, y + 26, 698, y + 26, NEU_S))
    node(e, 700, y, 130, 52, "await\napproval", AMBER_S, AMBER_F, 12, AMBER_T)
    e.append(arr(832, y + 26, 862, y + 26, NEU_S))
    node(e, 864, y, 60, 52, "resume", BLUE_S, BLUE_F, 12)
    # dashed arrows down into the state store
    for cx in (104, 268, 437, 601, 765):
        e.append(arr(cx, y + 52, cx, 300, NEU_S, sw=1, ss="dashed"))
    # state store
    e.append(box(44, 302, 880, 96, DARK_S, DARK_F, sw=1))
    e.append(T("STRUCTURED STATE  (not the prompt window)", 60, 314, 13, "#93c5fd"))
    e.append(T("task plan · tool runs · validation status · pending questions · "
               "approvals · artifact links", 60, 342, 13, "#e2e8f0"))
    e.append(T("Durability keeps the difference between what was said and what has happened.",
               60, 368, 12.5, "#86efac"))
    # banner + citation
    e.append(box(44, 420, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Workflow structure is not the opposite of agency — it is what makes agency survivable.",
               64, 435, 15, BLUE_S))
    e.append(T('"At its core, agentic AI is a complicated workflow that handles state and approvals." '
               "— Preeti Somal, Temporal · #167", 44, 480, 12, "#475569"))
    save("ch06-fig6-workflows-with-state.excalidraw", e)


# ─────────────── index 4 · fig7 — history is part of execution ───────────────
def fig7_history_is_execution():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 4",
           "History Is Execution, Not Just Debugging",
           "Persist a structured record of what happened — not a growing transcript of what was said.")
    # left — transcript (red)
    e.append(box(44, 176, 360, 250, RED_S, "#fff5f5", sw=2))
    e.append(T("TRANSCRIPT", 44, 190, 15, RED_T, "center", 360))
    e.append(T("“what was said”", 44, 214, 13, RED_S, "center", 360))
    for i in range(5):
        y = 244 + i * 30
        e.append(box(74, y, 300, 22, RED_S, "#fee2e2", sw=1))
        e.append(T("msg …", 84, y + 4, 11, RED_S))
    e.append(T("can't say what to retry, what was approved,\nwhat changed, or where to resume",
               64, 398, 11.5, RED_S))
    # arrow
    e.append(arr(408, 300, 442, 300, ORNG_S, sw=3))
    # right — structured history (green)
    e.append(box(448, 176, 478, 250, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("STRUCTURED HISTORY", 448, 190, 15, GREEN_T, "center", 478))
    e.append(T("“what has happened” — an event log the runtime can act on", 448, 214, 12, GREEN_S, "center", 478))
    uses = [("which steps retry safely", GREEN_S),
            ("which approvals were granted", GREEN_S),
            ("what state changed", GREEN_S),
            ("where to resume  ·  audit", GREEN_S)]
    for i, (u, c) in enumerate(uses):
        col = i % 2
        row = i // 2
        x = 468 + col * 228
        y = 246 + row * 60
        e.append(box(x, y, 210, 46, c, GREEN_F, sw=1))
        e.append(T(u, x, y + 14, 13, GREEN_T, "center", 210))
    e.append(T("one record serves execution, inspection, and tomorrow's evals",
               448, 396, 11.5, GREY, "center", 478))
    # citation
    e.append(box(44, 448, 882, 40, BLUE_F, "#eff6ff", sw=1))
    e.append(T('"We store all of the workflow history ... the visibility of what is happening." '
               "— Preeti Somal, Temporal · #167", 64, 461, 13, BLUE_S))
    save("ch06-fig7-history-is-execution.excalidraw", e)


# ─────────────── index 5 · fig8 — replay vs snapshot (no corpus attribution) ───────────────
def fig8_replay_vs_snapshot():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 5",
           "Replay or Snapshot",
           "Two ways to represent continuity — and the choice reveals what the team values.")
    # left — replay (blue / audit)
    e.append(box(44, 174, 420, 292, BLUE_S, "#eff6ff", sw=2))
    e.append(T("REPLAY", 44, 190, 20, BLUE_S, "center", 420))
    e.append(T("reconstruct state from an event history", 44, 218, 12, GREY, "center", 420))
    for i, x in enumerate((70, 168, 266, 364)):
        node(e, x, 250, 74, 34, f"e{i+1}", NEU_S, NEU_F, 12, NEU_T) if x != 364 else \
            node(e, x, 250, 60, 34, f"e{i+1}", NEU_S, NEU_F, 12, NEU_T)
    e.append(arr(254, 302, 254, 322, NEU_S))
    e.append(box(90, 324, 328, 34, BLUE_S, BLUE_F, sw=1))
    e.append(T("state  (reconstructed on demand)", 90, 332, 13, BLUE_S, "center", 328))
    e.append(T("REACH FOR IT WHEN", 64, 372, 11, BLUE_S))
    e.append(T("· causality & auditability are the point\n"
               "· state should emerge from recorded steps, not opaque blobs\n"
               "· exact reconstruction matters", 64, 390, 12, INK))
    # right — snapshot (green / fast resume)
    e.append(box(486, 174, 440, 292, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("SNAPSHOT", 486, 190, 20, GREEN_T, "center", 440))
    e.append(T("restore a saved checkpoint of working state", 486, 218, 12, GREY, "center", 440))
    e.append(box(536, 250, 150, 60, PURP_S, PURP_F, sw=1))
    e.append(T("checkpoint\n(frozen state)", 536, 264, 12, PURP_T, "center", 150))
    e.append(arr(690, 280, 726, 280, GREEN_S, sw=3))
    e.append(box(730, 250, 150, 60, GREEN_S, GREEN_F, sw=1))
    e.append(T("resume\ndirectly", 730, 264, 13, GREEN_T, "center", 150))
    e.append(T("REACH FOR IT WHEN", 506, 372, 11, GREEN_S))
    e.append(T("· fast continuation & elaborate live state dominate\n"
               "· pause/resume is frequent and should stay cheap\n"
               "· rebuilding everything from events is awkward", 506, 390, 12, INK))
    # decision banner — no corpus citation (unconfirmed)
    e.append(box(44, 484, 882, 50, "#f8fafc", "#f8fafc", sw=1))
    e.append(T("Reach for replay when causality is the point; reach for snapshots when cheap resume is.\n"
               "Either way, these are distributed-systems decisions now.", 64, 494, 14, TITLE))
    save("ch06-fig8-replay-vs-snapshot.excalidraw", e)


# ─────────────── index 7 · fig9 — the control plane rations two scarce resources ───────────────
def fig9_two_scarce_resources():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 7",
           "The Control Plane Rations Two Scarce Resources",
           "Attention and compute — spend each where it is most valuable, not everywhere.")
    # left — attention → checkpoint placement
    e.append(box(44, 172, 430, 296, BLUE_S, "#eff6ff", sw=2))
    e.append(T("ATTENTION  →  checkpoint placement", 44, 186, 14, BLUE_S, "center", 430))
    # run of low-risk steps with a few gates
    xs = [64, 132, 200, 268, 336, 404]
    kinds = ["g", "g", "gate", "g", "g", "gate"]
    for x, k in zip(xs, kinds):
        if k == "gate":
            node(e, x, 224, 58, 44, "REVIEW", BLUE_S, BLUE_F, 11)
        else:
            node(e, x, 224, 58, 44, "auto", GREEN_S, GREEN_F, 12)
    e.append(T("gates go where a step is:", 64, 284, 12, INK))
    e.append(T("· irreversible   · high blast-radius   · high uncertainty", 64, 304, 12, BLUE_S))
    e.append(box(64, 336, 386, 60, DARK_S, DARK_F, sw=1))
    e.append(T("not “keep a human in every loop” —\n“where is the human most valuable?”",
               76, 346, 13, "#93c5fd"))
    e.append(T("— Eric Zakariasson, Cursor · #629", 64, 404, 11, "#475569"))
    # right — compute → tiered model routing
    e.append(box(496, 172, 430, 296, PURP_S, "#f5f3ff", sw=2))
    e.append(T("COMPUTE  →  tiered model routing", 496, 186, 14, PURP_S, "center", 430))
    node(e, 516, 226, 110, 48, "router", PURP_S, PURP_F, 14, PURP_T)
    e.append(arr(626, 238, 660, 226, GREEN_S))
    e.append(arr(626, 262, 660, 274, RED_S))
    node(e, 664, 208, 244, 40, "cheap model  ·  simple queries", GREEN_S, GREEN_F, 12, GREEN_T)
    node(e, 664, 254, 244, 40, "expensive model  ·  complex queries", BLUE_S, BLUE_F, 12)
    e.append(box(516, 306, 392, 30, AMBER_S, AMBER_F, sw=1))
    e.append(T("flex tier: ~50% discount, but the request can be delayed", 516, 313, 12, AMBER_T, "center", 392))
    e.append(box(516, 342, 392, 52, DARK_S, DARK_F, sw=1))
    e.append(T("Route to the cheapest model that passes\n"
               "the eval — no cheaper. Misroutes botch hard work.",
               528, 350, 12, "#86efac"))
    e.append(T("— Voss, Arize · #681  ·  Vernade, DeepMind · #692",
               496, 404, 11, "#475569", "center", 430))
    # banner
    e.append(box(44, 484, 882, 40, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Which model runs a step is a control-plane decision, not a global default chosen once.",
               64, 496, 15, BLUE_S))
    save("ch06-fig9-two-scarce-resources.excalidraw", e)


# ─────────────── index 9 · fig10 — legacy systems become runtime components ───────────────
def fig10_legacy_as_runtime():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 9",
           "Legacy Systems Become Runtime Components",
           "Old enterprise software does not block the agent — it becomes tools the agent calls.")
    # center agent runtime
    e.append(box(392, 250, 180, 120, PURP_S, PURP_F, sw=2))
    e.append(T("AGENT\nRUNTIME", 392, 288, 18, PURP_T, "center", 180))
    e.append(T("the volatile\ncomponent", 392, 336, 11, PURP_S, "center", 180))
    # surrounding legacy systems, repurposed as tools/checkpoints
    legacy = [
        (44, 180, "validation engine"),
        (250, 176, "permission system"),
        (700, 176, "audit trail"),
        (44, 400, "database"),
        (700, 400, "workflow record"),
        (250, 404, "review queue"),
    ]
    for x, y, lab in legacy:
        node(e, x, y, 180, 56, lab, NEU_S, "#f1f5f9", 13, NEU_T)
        # arrow from runtime to tool (bidirectional-ish: agent calls it)
    # a couple of representative call arrows
    e.append(arr(392, 300, 224, 216, GREEN_S, sw=2))
    e.append(T("calls to inspect &\ncorrect its own work", 226, 226, 10.5, GREEN_S))
    e.append(arr(482, 250, 340, 204, GREEN_S, sw=2))
    e.append(arr(572, 300, 700, 208, GREEN_S, sw=2))
    e.append(arr(430, 370, 224, 428, GREEN_S, sw=2))
    e.append(arr(534, 370, 700, 428, GREEN_S, sw=2))
    e.append(arr(482, 370, 340, 432, GREEN_S, sw=2))
    # banner
    e.append(box(44, 474, 882, 52, BLUE_F, "#eff6ff", sw=1))
    e.append(T("The model is the volatile part; the rest of the runtime is older, stable parts —\n"
               "that is what keeps volatility from becoming operational chaos.", 64, 484, 15, BLUE_S))
    e.append(T("— Joel Hron, Thomson Reuters · corpus video #206", 44, 536, 12, "#475569"))
    save("ch06-fig10-legacy-as-runtime.excalidraw", e)


# ─────────────── index 10 · fig11 — observability is part of the control plane ───────────────
def fig11_observability():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 10",
           "Observability Makes the Control Plane Real",
           "Monitoring asks “is it up?” Agent observability asks what it did and where it drifted.")
    # left — the four questions
    e.append(box(44, 174, 250, 230, BLUE_S, "#eff6ff", sw=2))
    e.append(T("WHAT IT MUST ANSWER", 44, 188, 13, BLUE_S, "center", 250))
    qs = ["what it believed\nit was doing", "what it\nactually did",
          "where it\ndrifted", "what a human\nshould inspect"]
    for i, q in enumerate(qs):
        y = 214 + i * 46
        e.append(T("· " + q.replace("\n", " "), 60, y, 13, INK))
    # center — the trace
    e.append(box(314, 174, 300, 230, DARK_S, DARK_F, sw=1))
    e.append(T("THE TRACE", 314, 188, 13, "#93c5fd", "center", 300))
    tr = ["plans", "tool calls", "state changes", "intermediate outputs",
          "timings", "durable-step boundaries"]
    for i, t in enumerate(tr):
        e.append(T("▸ " + t, 334, 214 + i * 28, 13, "#e2e8f0"))
    # right — two levels
    e.append(box(634, 174, 292, 230, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("TWO LEVELS AT ONCE", 634, 188, 13, GREEN_T, "center", 292))
    node(e, 654, 220, 252, 66, "deep single-trajectory\ninspection  (engineer debugs)",
         GREEN_S, GREEN_F, 12, GREEN_T)
    node(e, 654, 300, 252, 66, "roll-up supervision across\nmany tasks  (operator steers)",
         BLUE_S, BLUE_F, 12)
    # tension strip
    e.append(box(44, 418, 882, 52, AMBER_S, AMBER_F, sw=1))
    e.append(T("Tension: richer traces raise trust — and privacy, retention, security risk.\n"
               "Design it: redaction · selective retention · risk-based views.", 60, 428, 13, AMBER_T))
    e.append(T('"Observability and eval are the same problem." '
               "— Phil Hetzel, Braintrust · #628  ·  Boyd & Narasimhan, Microsoft · #680",
               44, 478, 12, "#475569"))
    save("ch06-fig11-observability-control-plane.excalidraw", e)


# ─────────────── index 11 · fig12 — isolation must be enforced by the environment ───────────────
def fig12_isolation_rungs():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 11",
           "Isolation Must Be Enforced by the Environment",
           "Independence is a property of the runtime, not a promise in the task split.")
    rungs = [
        ("shared dev setup", RED_S, RED_F, RED_T,
         "collides: same branch, ports, DB — one agent's migration breaks the rest"),
        ("git worktree", AMBER_S, AMBER_F, AMBER_T,
         "fine for TRUSTED edits — own branch, but shares the machine"),
        ("container", RED_S, "#fee2e2", RED_T,
         "NOT an isolation layer: agent code can get root and move laterally"),
        ("micro-VM", GREEN_S, GREEN_F, GREEN_T,
         "sandboxed computer on its own branch — switch between parallel tasks"),
    ]
    y0, rh = 178, 66
    e.append(T("weaker", 44, 158, 11, GREY))
    e.append(T("stronger", 44, y0 + 4 * rh + 4, 11, GREY))
    e.append(arr(30, 172, 30, y0 + 4 * rh, NEU_S, sw=2))
    for i, (name, s, f, t, note) in enumerate(rungs):
        y = y0 + i * rh
        e.append(box(44, y, 230, 52, s, f, sw=2))
        e.append(T(name, 44, y + 16, 16, t, "center", 230))
        e.append(box(288, y, 638, 52, NEU_S, "#f8fafc", sw=1))
        e.append(T(note, 306, y + 16, 13.5, INK))
    # rule banner
    by = y0 + 4 * rh + 22
    e.append(box(44, by, 882, 44, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Trusted edits → a worktree suffices. Untrusted, side-effecting agent code → a micro-VM.",
               64, by + 13, 15, BLUE_S))
    e.append(T('"If you just use containers ... that\'s not an isolation layer." — Rene Brandel, Casco · #151',
               44, by + 52, 12, "#475569"))
    e.append(T("micro-VM per session: Maggie Appleton, GitHub · #623   ·   taxonomy: Lou Bichard, Ona · #704",
               44, by + 70, 12, "#475569"))
    save("ch06-fig12-isolation-rungs.excalidraw", e)


# ─────────────── index 12 · fig13 — one missing primitive, three substitutes ───────────────
def fig13_coordination_substitutes():
    e = []
    header(e, "CHAPTER 6  ·  FIGURE 12",
           "One Missing Primitive, Three Substitutes",
           "Runtime, orchestration, and triggers are solved. Coordination is the gap.")
    # the missing primitive (dashed, on top)
    e.append(box(263, 166, 444, 66, RED_S, "#fff5f5", sw=2, ss="dashed"))
    e.append(T("MISSING:  COORDINATION", 263, 178, 14, RED_T, "center", 444))
    e.append(T("pick up tasks, signal done, hand off — no human stitching\n"
               "GitHub is not a coordination layer", 263, 200, 11.5, RED_S, "center", 444))
    # three substitute cards
    cards = [
        (44, "Serial execution", "Factory", ORNG_S, ORNG_F, ORNG_T,
         "one active writer ·\ntargeted internal parallelism",
         "eliminates coordination by\nconstruction · longest run 16 days", "#653"),
        (338, "File-based contract", "Anthropic", PURP_S, PURP_F, PURP_T,
         "planner · generator ·\nevaluator (own contexts)",
         "roles negotiate what done\nmeans, in files before code", "#691"),
        (632, "State machines", "Ona", BLUE_S, BLUE_F, BLUE_S,
         "durable execution ·\nexplicit workflows",
         "build coordination as state\nmachines + durable workflows", "#704"),
    ]
    w, h = 294, 176
    y = 258
    for x, name, org, s, f, t, mech, note, vid in cards:
        e.append(arr(x + w / 2, 232, x + w / 2, 256, NEU_S, sw=1, ss="dashed"))
        e.append(box(x, y, w, h, s, f, sw=2))
        e.append(T(name, x + 18, y + 16, 17, t))
        e.append(T(org + "  ·  " + vid, x + 18, y + 42, 12, s))
        e.append(box(x + 18, y + 64, w - 36, 48, DARK_S, DARK_F, sw=1))
        e.append(T(mech, x + 28, y + 72, 11.5, "#e2e8f0"))
        e.append(T(note, x + 18, y + 124, 11.5, INK))
    # banner
    e.append(box(44, 452, 882, 52, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Three substitutes for one primitive that does not yet exist —\n"
               "the runtime machinery that turns parallel intelligence into dependable work.",
               64, 462, 15, BLUE_S))
    e.append(T('"The thing that\'s missing is coordination." — Lou Bichard, Ona · #704  ·  '
               "Factory · #653  ·  Anthropic · #691", 44, 514, 12, "#475569"))
    save("ch06-fig13-coordination-substitutes.excalidraw", e)


if __name__ == "__main__":
    fig5_factory_os()               # index 2
    fig6_workflows_with_state()     # index 3
    fig7_history_is_execution()     # index 4
    fig8_replay_vs_snapshot()       # index 5
    fig9_two_scarce_resources()     # index 7
    fig10_legacy_as_runtime()       # index 9
    fig11_observability()           # index 10
    fig12_isolation_rungs()         # index 11
    fig13_coordination_substitutes()# index 12
