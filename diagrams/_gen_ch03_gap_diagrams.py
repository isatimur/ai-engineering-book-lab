"""Builds the gap inline figures for Chapter 3 — the five headings that had no
figure once the existing three (repo interface / specs / factory) are remapped
to the headings they actually describe.

Helpers copied verbatim from _gen_gap_diagrams.py. Palette + signature mark
follow diagrams/STYLE.md. Every claim carries a ledger-confirmed corpus video #:
  Ryan Lopopolo, OpenAI      · #16
  Eno Reyes, Factory AI      · #57
  OpenAI Codex (subagents)   · #632
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
CITE = "#475569"
INK = "#1e293b"
DARK_S, DARK_F = "#334155", "#1e293b"
CODE = "#86efac"     # engineered / after code (STYLE §5)
PATH = "#4ade80"     # paths & identifiers
CODE_RED = "#fca5a5" # naive / before code

_s = [770000]
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

def box(x, y, w, h, stroke, bg, sw=2):
    return base("rectangle", x, y, w, h, stroke=stroke, bg=bg, sw=sw, rnd={"type": 3})

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

def cite(e, text, y):
    e.append(T(text, 44, y, 12.5, CITE))

def save(name, els):
    doc = dict(type="excalidraw", version=2, source="https://excalidraw.com", elements=els,
               appState=dict(viewBackgroundColor="#ffffff", gridSize=None), files={})
    json.dump(doc, open(os.path.join(INLINE, name), "w"), ensure_ascii=False, indent=2)
    print("wrote inline/" + name)


# ───────── ch03 · fig4 — the slop-era Tuesday (heading 1) ─────────
def ch03_fig4():
    e = []
    header(e, "CHAPTER 3  ·  THE SLOP ERA",
           "One Tuesday in the Slop Era",
           "A clean diff that compiles and passes tests can still carry two unwritten violations.")
    # Band 1 — the happy path that hides rot
    e.append(T("WHAT THE TEAM SAW", 44, 162, 12, GREY))
    node(e, 44, 184, 190, 66, "TASK\nmigrate 3 endpoints →\nnew state machine · keep style", ORNG_S, ORNG_F, 12, ORNG_T)
    e.append(arr(236, 217, 268, 217, NEU_S))
    node(e, 272, 184, 210, 66, "AGENT DIFF\nclean · compiles\ntests green", BLUE_S, BLUE_F, 13)
    e.append(arr(484, 217, 516, 217, NEU_S))
    node(e, 520, 184, 170, 66, "APPROVED\nby reviewer", GREEN_S, GREEN_F, 14, GREEN_T)
    e.append(T("looks like a win", 700, 210, 13, GREY))
    # Band 2 — what it hid: two rules written nowhere the agent could read
    e.append(T("WHAT IT HID  —  two rules written nowhere the agent could read", 44, 272, 13, RED_T))
    e.append(box(44, 294, 418, 72, RED_S, RED_F))
    e.append(T("①  banned parsing dependency", 60, 306, 15, RED_T))
    e.append(T("no lint rule · no doc — only in Slack", 60, 330, 12, RED_S))
    e.append(T("reviewer CAUGHT  ✓", 60, 348, 12, GREEN_S))
    e.append(box(478, 294, 448, 72, RED_S, RED_F))
    e.append(T("②  batched writes inside a loop", 494, 306, 15, RED_T))
    e.append(T("taught by a payments incident — only in an old PR comment", 494, 330, 12, RED_S))
    e.append(T("reviewer MISSED  ✗  →  shipped", 494, 348, 12, RED_S))
    # Band 3 — next morning: tacit rules made machine-readable
    e.append(T("THE NEXT MORNING  —  tacit rules made machine-readable", 44, 384, 13, GREEN_S))
    cards = [
        (44,  282, "examples/migrations/\n  state_machine_ok.md", "a checked-in accepted example"),
        (342, 262, ".eslintrc\n  no-restricted-imports:\n    [ fast-xml-parser ]", "a lint rule for the banned import"),
        (620, 306, "scripts/setup.sh\n  # one command, green tests", "a setup script — ends Slack archaeology"),
    ]
    for x, w, code, cap in cards:
        e.append(box(x, 408, w, 66, DARK_S, DARK_F, sw=1))
        e.append(T(code, x + 14, 418, 12, PATH))
        e.append(T(cap, x, 478, 11, GREY, w=w))
    # Banner + citation
    e.append(box(44, 508, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Not a hallucination — the agent guessed because the repo gave it nothing firm to stand on.",
               64, 524, 15, BLUE_S))
    cite(e, "— Ryan Lopopolo, OpenAI · corpus video #16", 566)
    save("ch03-fig4-slop-era-tuesday.excalidraw", e)


# ───────── ch03 · fig5 — a patch is ~500 unstated decisions (heading 3) ─────────
def ch03_fig5():
    e = []
    header(e, "CHAPTER 3  ·  WHERE SLOP COMES FROM",
           "A Patch Is ~500 Unstated Decisions",
           "The task names a few; the model silently samples the rest from what it has seen.")
    # written intent — small
    e.append(T("WRITTEN", 44, 162, 12, GREY))
    node(e, 44, 184, 176, 92, "TASK SPEC\nadd /refunds endpoint\nreturn 200 on success", ORNG_S, ORNG_F, 12, ORNG_T)
    e.append(arr(222, 230, 254, 230, NEU_S))
    # the unwritten cloud
    e.append(box(258, 168, 668, 138, NEU_S, "#f8fafc", sw=1))
    e.append(T("~500 NON-FUNCTIONAL DECISIONS  —  unwritten, inferred under uncertainty", 258, 178, 12, NEU_T, "center", 668))
    chips = ["naming", "proportion", "perf discipline", "dependency choice", "rollback safety",
             "test shape", "compatibility", "reviewability", "error shape", "logging"]
    cw, ch, gx, gy = 122, 34, 130, 46
    for i, c in enumerate(chips):
        col, row = i % 5, i // 5
        x = 272 + col * gx
        y = 204 + row * gy
        s, f, t = (RED_S, RED_F, RED_T) if c == "dependency choice" else (AMBER_S, AMBER_F, AMBER_T)
        node(e, x, y, cw, ch, c, s, f, 12, t)
    # one decision, two outcomes
    e.append(T("one unspecified decision  →  two outcomes", 44, 330, 13, GREY))
    e.append(box(44, 354, 418, 96, RED_S, RED_F))
    e.append(T("UNSPECIFIED", 60, 366, 13, RED_T))
    e.append(T("→ model samples 1 of the trillions of\n   lines it trained on\n→ a generic convention · NOT yours = slop", 60, 388, 12.5, RED_S))
    e.append(box(478, 354, 448, 96, GREEN_S, "#f0fdf4"))
    e.append(T("WRITTEN DOWN", 494, 366, 13, GREEN_T))
    e.append(T("→ examples/ + a lint rule pin the choice\n→ your convention, on every run = yours", 494, 388, 12.5, GREEN_S))
    # banner + citation
    e.append(box(44, 470, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Nothing makes the sample yours — until you externalize the decision the task left silent.",
               64, 485, 16, BLUE_S))
    cite(e, "— Ryan Lopopolo, OpenAI · corpus video #16", 528)
    save("ch03-fig5-unstated-decisions.excalidraw", e)


# ───────── ch03 · fig6 — agent-ready checklist (heading 5) ─────────
def ch03_fig6():
    e = []
    header(e, "CHAPTER 3  ·  AGENT-READY REPO",
           "Agent-Ready Is a Checklist, Not a Vibe",
           "Seven affordances that turn tacit standards into a surface an agent can run.")
    e.append(T("AFFORDANCE", 62, 160, 12, GREY))
    e.append(T("WHERE IT LIVES IN THE REPO", 488, 160, 12, GREY))
    rows = [
        ("stable folder structure", "src/   tests/   specs/"),
        ("explicit setup / build / run", "make setup · make test · make run"),
        ("strong type + lint + test gates", "tsc · eslint · pytest   (agent reruns)"),
        ("architecture decisions in files", "docs/adr/0007-state-machine.md"),
        ("examples of accepted patterns", "examples/{tests,api,migrations}"),
        ("specs stored close to the work", "specs/*.md   (survive handoff)"),
        ("narrower tools for common ops", "scripts/   not free-form shell"),
    ]
    y0, rh = 182, 40
    for i, (aff, art) in enumerate(rows):
        y = y0 + i * rh
        e.append(T("✓", 44, y + 6, 16, GREEN_S))
        e.append(T(aff, 70, y + 7, 15, INK))
        e.append(box(486, y, 440, 30, DARK_S, DARK_F, sw=1))
        e.append(T(art, 500, y + 8, 12.5, PATH))
    # the ratchet
    ry = y0 + 7 * rh + 6
    e.append(box(44, ry, 882, 52, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("THE RATCHET:  “a slop test is better than no test” → the next agent follows it → the rules tighten.",
               60, ry + 10, 14, GREEN_T))
    e.append(T("Ask the agent: “where are we not being opinionated enough about our linters?” — and let it write the rule.",
               60, ry + 30, 12.5, GREEN_S))
    cite(e, "— Eno Reyes, Factory AI · corpus video #57", ry + 66)
    save("ch03-fig6-agent-ready-checklist.excalidraw", e)


# ───────── ch03 · fig7 — subagents & specialization (heading 7) ─────────
def ch03_fig7():
    e = []
    header(e, "CHAPTER 3  ·  SUBAGENTS",
           "Specialization Is Encoded Judgment",
           "A role with narrow tools is process made explicit — but only past the reliability gate.")
    # master task
    node(e, 44, 196, 150, 72, "MASTER\nTASK", PURP_S, PURP_F, 15, PURP_T)
    e.append(arr(196, 232, 226, 232, NEU_S))
    # the gate before fan-out
    e.append(box(230, 190, 196, 84, AMBER_S, AMBER_F))
    e.append(T("GATE", 230, 200, 13, AMBER_T, "center", 196))
    e.append(T("single-task success\n≈ 100% ?", 230, 222, 14, AMBER_T, "center", 196))
    e.append(T("— Reyes · #57", 230, 258, 10, AMBER_S, "center", 196))
    # NO branch
    e.append(arr(328, 274, 328, 300, RED_S))
    e.append(box(232, 302, 196, 52, RED_S, RED_F, sw=1))
    e.append(T("NO → 20 agents multiply\nunverified output", 232, 312, 12, RED_T, "center", 196))
    # YES → decompose into roles
    e.append(arr(426, 232, 456, 232, GREEN_S))
    e.append(box(460, 168, 232, 260, PURP_S, "#f5f3ff", sw=1))
    e.append(T("DECOMPOSE INTO ROLES", 460, 178, 12, PURP_T, "center", 232))
    roles = ["research", "review", "refactor", "debug", "migration"]
    for i, r in enumerate(roles):
        node(e, 476, 200 + i * 34, 200, 26, r, PURP_S, PURP_F, 13, PURP_T)
    e.append(T("narrow tools + instructions\n= a role in the harness", 460, 378, 11, PURP_S, "center", 232))
    # recompose
    e.append(arr(692, 292, 722, 292, NEU_S))
    e.append(box(726, 168, 200, 260, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("RECOMPOSE", 726, 190, 14, GREEN_T, "center", 200))
    e.append(T("→  inspect\n→  evaluate\n→  merge", 748, 226, 14, GREEN_S))
    e.append(T("pieces must recombine,\nnot just run in parallel", 726, 380, 11, GREEN_S, "center", 200))
    # banner + citation
    e.append(box(44, 452, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("More workers without a stronger harness don't make a factory — they make chaos faster.",
               64, 467, 16, BLUE_S))
    cite(e, "— OpenAI Codex (subagents) · corpus video #632", 510)
    save("ch03-fig7-subagents-specialization.excalidraw", e)


# ───────── ch03 · fig8 — environment design is the edge (heading 8) ─────────
def ch03_fig8():
    e = []
    header(e, "CHAPTER 3  ·  THE DURABLE ADVANTAGE",
           "The Edge Is Environment, Not the Model",
           "A stronger model is bounded and shared. A legible repo compounds — and only you can build it.")
    # left — buy a stronger model
    e.append(box(44, 176, 400, 300, NEU_S, "#f8fafc", sw=2))
    e.append(T("BUY A STRONGER MODEL", 44, 190, 15, NEU_T, "center", 400))
    e.append(T("the visible magic:", 66, 226, 13, GREY))
    for i, t in enumerate(["·  edits a file", "·  writes a test", "·  proposes a patch"]):
        e.append(T(t, 78, 252 + i * 28, 15, INK))
    e.append(box(66, 356, 356, 40, NEU_S, NEU_F, sw=1))
    e.append(T("gain: bounded — the same models\neveryone else already has", 78, 362, 12, NEU_T))
    e.append(T("a lever, but not a moat", 44, 442, 13, GREY, "center", 400))
    # right — design the environment
    e.append(box(468, 176, 458, 300, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("DESIGN THE ENVIRONMENT", 468, 190, 15, GREEN_T, "center", 458))
    invests = ["legible repo", "externalized non-functional judgment",
               "reusable specs", "validations + repo affordances", "a staged software factory"]
    for i, t in enumerate(invests):
        w = 300 + i * 26
        x = 488
        node(e, x, 224 + i * 34, w, 26, t, GREEN_S, GREEN_F, 13, GREEN_T)
    e.append(box(752, 224, 156, 128, GREEN_S, "#a7f3d0", sw=2))
    e.append(T("5x", 752, 236, 30, GREEN_T, "center", 156))
    e.append(T("6x", 752, 272, 30, GREEN_T, "center", 156))
    e.append(T("7x", 752, 308, 30, GREEN_T, "center", 156))
    e.append(T("compounds — a moat you build", 468, 442, 13, GREEN_S, "center", 458))
    # banner + citation
    e.append(box(44, 496, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("“It's a choice that you as an organization have” — the model will not hand it to you.",
               64, 511, 16, BLUE_S))
    cite(e, "— Eno Reyes, Factory AI · corpus video #57", 554)
    save("ch03-fig8-environment-design.excalidraw", e)


if __name__ == "__main__":
    ch03_fig4()
    ch03_fig5()
    ch03_fig6()
    ch03_fig7()
    ch03_fig8()
