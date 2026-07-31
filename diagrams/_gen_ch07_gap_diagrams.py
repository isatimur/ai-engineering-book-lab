"""Builds the missing Chapter 7 inline gap figures for the Visual Guide.
Hand-specified elements per diagram; shared constructors only for boilerplate.
Palette + signature mark follow diagrams/STYLE.md. DSL copied verbatim from
_gen_gap_diagrams.py so these render identically to ch07-fig4."""
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
CITE = "#475569"

EYE = "CHAPTER 7  ·  SECURITY, IDENTITY & HIGH-STAKES TRUST"

_s = [9700]
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


# ───────── Ch7 · fig5 — four-control default-on baseline (H2 #2: Sandboxes) ─────────
def ch07_fig5():
    e = []
    header(e, EYE, "Four Controls, On By Default",
           "Not hardening bolted on after an incident — the baseline a code-executing agent runs on.")
    e.append(box(44, 166, 882, 30, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("DEFAULT-ON BASELINE   —   each control bounds a different failure", 62, 173, 14, GREEN_T))
    cards = [
        ("1 · Sandbox",      "filesystem scoped\nexecution isolated", "a bad command",                     BLUE_S, BLUE_F, BLUE_S),
        ("2 · Network",      "egress explicit\nallow-listed",          "exfiltration",                     PURP_S, PURP_F, PURP_T),
        ("3 · Privilege",    "narrow by default\nstep-up to widen",    "over-reach when\nthe agent is wrong", AMBER_S, AMBER_F, AMBER_T),
        ("4 · Human review", "gate on the\ntrajectory",                "what the first\nthree let through", GREEN_S, GREEN_F, GREEN_T),
    ]
    x0, w, gap, y, h = 44, 212, 11, 214, 224
    for i, (name, how, bounds, s, f, t) in enumerate(cards):
        x = x0 + i * (w + gap)
        e.append(box(x, y, w, h, s, f, sw=2))
        e.append(T(name, x + 16, y + 16, 19, t))
        e.append(T(how, x + 16, y + 54, 13, INK))
        e.append(box(x + 16, y + 116, w - 32, 88, RED_S, "#fff5f5", sw=1))
        e.append(T("BOUNDS", x + 28, y + 126, 11, RED_S))
        e.append(T(bounds, x + 28, y + 148, 14, RED_T))
    by = 472
    e.append(box(44, by, 882, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("The model may improvise — the environment fails closed.", 64, by + 14, 17, BLUE_S))
    e.append(T("— Fouad Matin, OpenAI Codex  ·  corpus video #152", 44, by + 60, 13, CITE))
    save("ch07-fig5-four-control-baseline.excalidraw", e)


# ───────── Ch7 · fig6 — default-permission table (H2 #3: Least privilege) ─────────
def ch07_fig6():
    e = []
    header(e, EYE, "One Row Per Agent",
           "Least privilege as a product-design table: minimum access for which stage of the workflow.")
    xA, wA = 44, 196
    xR, wR = 250, 236
    xC, wC = 496, 214
    xB, wB = 720, 206
    e.append(T("AGENT", xA + 8, 176, 12, GREY))
    e.append(T("MAY READ", xR + 8, 176, 12, GREY))
    e.append(T("MAY ACT / WRITE", xC + 8, 176, 12, GREY))
    e.append(T("HARD BOUNDARY", xB + 8, 176, 12, GREY))
    rows = [
        ("Research\nagent",   (BLUE_S, BLUE_F, BLUE_S),   "broad corpus",         "✗  no write at all",      "cannot change anything"),
        ("Support\nagent",    (PURP_S, PURP_F, PURP_T),   "account metadata",     "✗  no refunds",           "read, never transact"),
        ("Legal\nworkflow",   (AMBER_S, AMBER_F, AMBER_T),"broad doc retrieval",  "✗  no external send",     "nothing leaves the org"),
        ("Scheduling\nagent", (GREEN_S, GREEN_F, GREEN_T),"read + write calendars","✗  no 3rd-party message","confirm before messaging"),
    ]
    y0, rh, h = 198, 78, 66
    for i, (name, (s, f, t), rd, act, bnd) in enumerate(rows):
        y = y0 + i * rh
        node(e, xA, y, wA, h, name, s, f, 15, t)
        e.append(box(xR, y, wR, h, "#cbd5e1", "#f8fafc", sw=1)); e.append(T(rd, xR + 14, y + 23, 15, INK))
        e.append(box(xC, y, wC, h, RED_S, "#fff5f5", sw=1)); e.append(T(act, xC + 14, y + 23, 15, RED_T))
        e.append(box(xB, y, wB, h, AMBER_S, AMBER_F, sw=1)); e.append(T(bnd, xB + 14, y + 25, 13, AMBER_T))
    cy = y0 + 4 * rh + 10
    e.append(box(44, cy, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Narrower powers reduce the tempting-but-unsafe paths the model can wander into.", 64, cy + 14, 16, BLUE_S))
    save("ch07-fig6-default-permission-table.excalidraw", e)


# ───────── Ch7 · fig7 — disputed-filing reconstruction (H2 #7: Inspectability) ─────────
def ch07_fig7():
    e = []
    header(e, EYE, "The Day a Filing Is Disputed",
           "A client disputes a position the assistant helped file. One question: what did it actually do?")
    # trigger (left)
    e.append(box(44, 196, 156, 100, AMBER_S, AMBER_F, sw=2))
    e.append(T("Client disputes\na filed position", 44, 216, 15, AMBER_T, "center", 156))
    e.append(T("→  what did it do?", 44, 266, 12, AMBER_S, "center", 156))
    e.append(arr(200, 246, 232, 246, NEU_S))
    # trajectory evidence card (center, dark)
    cx, cw = 236, 430
    e.append(box(cx, 176, cw, 252, DARK_S, DARK_F, sw=2))
    e.append(T("TRAJECTORY  —  reconstructed via the mediation layer", cx + 16, 188, 13, "#93c5fd"))
    ev = ("sources    matter #4417  —  3 files\n"
          "tool call  validation engine · filing-rules\n"
          "output     draft surfaced for review\n"
          "──────────────────────────────\n"
          "token      read-only\n"
          "scope      matter #4417  only\n"
          "send       ✗ denied  ·  no client delivery")
    e.append(T(ev, cx + 18, 216, 13, "#86efac"))
    # scope guard (right top) — read-only token stops wandering
    gx, gw = 700, 226
    e.append(box(gx, 176, gw, 100, NEU_S, "#e2e8f0", sw=2, ss="dashed"))
    e.append(T("other clients' matters", gx, 190, 12, NEU_T, "center", gw))
    e.append(T("#5120   #6033   #7781", gx, 212, 15, NEU_S, "center", gw))
    e.append(T("✗ out of scope — never reached", gx, 242, 12, RED_S, "center", gw))
    e.append(arr(666, 214, 698, 214, RED_S))
    e.append(T("read-only\ntoken", 646, 168, 10, RED_S, "center", 52))
    # outcome (right bottom)
    e.append(box(gx, 328, gw, 100, GREEN_S, GREEN_F, sw=2))
    e.append(T("Partner reconstructs\nthe path", gx, 346, 15, GREEN_T, "center", gw))
    e.append(T("→ stands behind the answer", gx, 392, 12, GREEN_S, "center", gw))
    e.append(arr(666, 378, 698, 378, GREEN_S))
    # counterfactual strip under the card
    e.append(box(cx, 438, cw, 34, RED_S, "#fff5f5", sw=1))
    e.append(T("Without that trail, the honest answer would be a shrug.", cx + 16, 446, 13, RED_T))
    # banner + citation
    by = 490
    e.append(box(44, by, 882, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Constrained execution plus inspectable paths — not unrestricted autonomy under perfect prevention.",
               64, by + 15, 15, BLUE_S))
    e.append(T("— Joel Hron, CTO, Thomson Reuters  ·  corpus video #206", 44, by + 60, 13, CITE))
    save("ch07-fig7-disputed-filing-reconstruction.excalidraw", e)


# ───────── Ch7 · fig8 — tuned autonomy, Colleague & Factory (H2 #8) ─────────
def ch07_fig8():
    e = []
    header(e, EYE, "Autonomy Is Dialed, Not Maximized",
           "Not “how much can it do?” but “what authority is right at this step, for this domain?”")
    lanes = [
        ("HIGH-STAKES COLLEAGUE", ["retrieve", "synthesize", "validate", "draft"], "human sign-off\nfile · send"),
        ("SOFTWARE FACTORY",      ["search", "summarize", "patch", "test"],        "gated\nmerge · deploy · env"),
    ]
    for li, (lane, steps, gate) in enumerate(lanes):
        ly = 190 + li * 152
        e.append(T(lane, 44, ly, 14, TITLE))
        e.append(T("autonomous  ▶", 44, ly + 24, 11, GREEN_S))
        x, sw_ = 44, 150
        for st in steps:
            node(e, x, ly + 44, sw_, 52, st, GREEN_S, GREEN_F, 15, GREEN_T)
            e.append(arr(x + sw_, ly + 70, x + sw_ + 16, ly + 70, NEU_S))
            x += sw_ + 16
        e.append(T("HUMAN", x, ly + 24, 11, RED_S))
        e.append(box(x, ly + 44, 200, 52, RED_S, RED_F, sw=2))
        e.append(T(gate, x, ly + 52, 14, RED_T, "center", 200))
    by = 498
    e.append(box(44, by, 882, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Trust comes not from proving it can do everything — but from deciding what it should never do casually.",
               64, by + 15, 15, BLUE_S))
    e.append(T("— Joel Hron, CTO, Thomson Reuters  ·  corpus video #206", 44, by + 60, 13, CITE))
    save("ch07-fig8-tuned-autonomy.excalidraw", e)


# ───────── Ch7 · fig9 — security is the architecture of deserved trust (H2 #9) ─────────
def ch07_fig9():
    e = []
    header(e, EYE, "Deserved Trust Has Shape",
           "Each control answers one question an institution must be able to answer.")
    rows = [
        ("Identity",                     "on whose behalf it acts",                    PURP_S, PURP_F, PURP_T),
        ("Authorization",                "which powers it actually holds",             BLUE_S, BLUE_F, BLUE_S),
        ("Sandboxing + least privilege", "contains the damage when it is wrong",       AMBER_S, AMBER_F, AMBER_T),
        ("Gateways + roots of trust",    "turns sprawl into governable infrastructure",ORNG_S, ORNG_F, ORNG_T),
        ("Audit + inspectable paths",    "machine action an institution can review",   GREEN_S, GREEN_F, GREEN_T),
    ]
    y0, rh, h = 182, 60, 50
    for i, (ctrl, ans, s, f, t) in enumerate(rows):
        y = y0 + i * rh
        e.append(box(44, y, 340, h, s, f, sw=2)); e.append(T(ctrl, 60, y + 16, 17, t))
        e.append(arr(388, y + h / 2, 420, y + h / 2, NEU_S))
        e.append(box(424, y, 502, h, "#cbd5e1", "#f8fafc", sw=1)); e.append(T(ans, 440, y + 17, 16, INK))
    by = y0 + 5 * rh + 12
    e.append(box(44, by, 882, 50, GREEN_F, "#f0fdf4", sw=1))
    e.append(T("A machine colleague is trustworthy only when its power has shape.", 64, by + 16, 17, GREEN_T))
    save("ch07-fig9-deserved-trust.excalidraw", e)


if __name__ == "__main__":
    ch07_fig5()
    ch07_fig6()
    ch07_fig7()
    ch07_fig8()
    ch07_fig9()
