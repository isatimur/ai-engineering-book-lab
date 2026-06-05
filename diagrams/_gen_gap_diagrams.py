"""Builds the HIGH-priority gap inline figures for the Visual Guide.
Hand-specified elements per diagram; shared constructors only for boilerplate.
Palette + signature mark follow diagrams/STYLE.md."""
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

_s = [9000]
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


def save(name, els):
    doc = dict(type="excalidraw", version=2, source="https://excalidraw.com", elements=els,
               appState=dict(viewBackgroundColor="#ffffff", gridSize=None), files={})
    json.dump(doc, open(os.path.join(INLINE, name), "w"), ensure_ascii=False, indent=2)
    print("wrote inline/" + name)


# ───────────────────────── Ch5 · fig4 — misassembly vs hallucination ─────────────────────────
def ch05_fig4():
    e = []
    header(e, "CHAPTER 5  ·  CONTEXT IS INFRASTRUCTURE",
           "Misassembly Is Not Hallucination",
           "Both reach a wrong answer. Only one is fixed by a better model.")
    # pipeline
    py, ph = 250, 88
    e.append(box(44, py, 150, ph, ORNG_S, ORNG_F)); e.append(T("Corpus", 44, py + 32, 18, ORNG_T, "center", 150))
    e.append(arr(198, py + ph/2, 246, py + ph/2, NEU_S))
    e.append(box(250, py, 240, ph, BLUE_S, BLUE_F)); e.append(T("Context assembly\n(the substrate)", 250, py + 22, 17, BLUE_S, "center", 240))
    e.append(arr(494, py + ph/2, 542, py + ph/2, NEU_S))
    e.append(box(546, py, 170, ph, PURP_S, PURP_F)); e.append(T("Model", 546, py + 32, 18, PURP_T, "center", 170))
    e.append(arr(720, py + ph/2, 768, py + ph/2, NEU_S))
    e.append(box(772, py, 150, ph, NEU_S, NEU_F)); e.append(T("Answer", 772, py + 32, 18, NEU_T, "center", 150))

    # failure flags above the two origin boxes
    e.append(box(250, 168, 240, 56, RED_S, RED_F, sw=2))
    e.append(T("MISASSEMBLY", 250, 178, 16, RED_T, "center", 240))
    e.append(T("real docs · wrong combo, weight, freshness", 250, 200, 11, RED_S, "center", 240))
    e.append(arr(370, 224, 370, py - 2, RED_S))
    e.append(box(546, 168, 170, 56, RED_S, RED_F, sw=2))
    e.append(T("HALLUCINATION", 546, 178, 15, RED_T, "center", 170))
    e.append(T("invents what isn't there", 546, 200, 11, RED_S, "center", 170))
    e.append(arr(631, 224, 631, py - 2, RED_S))

    # fix labels under boxes
    e.append(T("FIX → rank · dedupe · freshen", 244, py + ph + 12, 13, GREEN_S, "center", 240))
    e.append(T("a better model just fails faster", 540, py + ph + 12, 12, RED_S, "center", 182))

    # evidence card
    cy = 420
    e.append(box(250, cy, 466, 124, DARK_S, DARK_F, sw=1))
    ev = ('retrieved for  "customer X":\n'
          '  doc_A   stale · Q1      averaged\n'
          '  doc_B   stale · Q2      averaged\n'
          '  doc_C   current · Q4    averaged\n'
          '⇒ half-current · nothing invented, nothing correct')
    e.append(T(ev, 268, cy + 14, 12.5, "#86efac"))
    e.append(T('— Jack Morris: "Stuffing context is not memory"  ·  corpus', 250, cy + 132, 12, "#475569", "center", 466))

    # punchline banner
    by = 576
    e.append(box(44, by, 878, 50, BLUE_F, "#eff6ff", sw=1))
    e.append(T("A better model produces a more confident wrong answer faster — the fix lives in the substrate.",
               64, by + 15, 17, BLUE_S))
    save("ch05-fig4-misassembly-vs-hallucination.excalidraw", e)


# ───────────────────────── Ch5 · fig5 — "RAG" is four jobs ─────────────────────────
def ch05_fig5():
    e = []
    header(e, "CHAPTER 5  ·  CONTEXT IS INFRASTRUCTURE",
           "“RAG” Is Four Different Jobs",
           "One word collapsed four patterns. Pick by the question, not the label.")
    cards = [
        dict(x=44,  y=170, name="Vector search", col=(BLUE_S, BLUE_F, BLUE_S),
             when="Q is about semantic similarity", ex="single embedding lookup → flat index"),
        dict(x=494, y=170, name="Graph traversal", col=(PURP_S, PURP_F, PURP_T),
             when="Q is about relationships", ex="who depends on whom · co-occurrence"),
        dict(x=44,  y=336, name="Hybrid", col=(GREEN_S, GREEN_F, GREEN_T),
             when="Q needs both at once", ex="fuse graph + vector (most enterprise Qs)"),
        dict(x=494, y=336, name="Neural-RAG", col=(ORNG_S, ORNG_F, ORNG_T),
             when="retrieval lives in the reasoning loop", ex="model decides what to search · when to stop"),
    ]
    w, h = 432, 150
    for c in cards:
        s, f, t = c["col"]
        e.append(box(c["x"], c["y"], w, h, s, f, sw=2))
        e.append(T(c["name"], c["x"] + 22, c["y"] + 20, 22, t))
        e.append(T("BEST WHEN", c["x"] + 22, c["y"] + 60, 11, s))
        e.append(T(c["when"], c["x"] + 22, c["y"] + 76, 16, INK, w=w - 44))
        e.append(box(c["x"] + 22, c["y"] + 108, w - 44, 28, DARK_S, DARK_F, sw=1))
        e.append(T(c["ex"], c["x"] + 34, c["y"] + 115, 12, "#e2e8f0"))
    # decision line banner
    by = 510
    e.append(box(44, by, 882, 92, NEU_S, "#f8fafc", sw=1))
    e.append(T("“We'll just add RAG” is no longer a design sentence. Make these explicit instead:", 64, by + 16, 15, INK))
    e.append(T("which pattern   ·   which data shape   ·   which ranking   ·   which freshness   ·   which reasoning surface",
               64, by + 48, 15, TITLE))
    save("ch05-fig5-retrieval-is-four-jobs.excalidraw", e)


# ───────────────────────── Ch6 · fig4 — agency dial ─────────────────────────
def ch06_fig4():
    e = []
    header(e, "CHAPTER 6  ·  RUNTIMES, STATE & THE HUMAN CONTROL PLANE",
           "Agency Is a Dial, Not a Switch",
           "Set autonomy per step — by how irreversible, risky, and observable it is.")
    e.append(T("STEP", 44, 178, 12, GREY))
    e.append(T("AGENCY   (bar length = autonomy)", 330, 178, 12, GREY))
    e.append(T("WHAT RE-ENTERS", 668, 178, 12, GREY))
    rows = [
        ("Draft & explore",        "auto",      300, "g", "runs unattended"),
        ("Run tests",              "auto",      300, "g", "runs unattended"),
        ("Edit shared config",     "oversight", 196, "a", "notify + roll-up view"),
        ("Open a pull request",    "review",    150, "a", "human review gate"),
        ("Deploy / irreversible",  "gated",      66, "r", "explicit approval"),
    ]
    fill = {"g": ("#34d399", GREEN_S), "a": ("#fbbf24", AMBER_S), "r": ("#f87171", RED_S)}
    y0, rh = 200, 58
    for i, (name, lvl, w, c, re) in enumerate(rows):
        y = y0 + i * rh
        e.append(T(name, 44, y + 14, 16, INK, w=280))
        e.append(box(330, y + 10, 300, 28, "#cbd5e1", "#f1f5f9", sw=1))
        fc, sc = fill[c]
        e.append(box(330, y + 10, w, 28, sc, fc, sw=1))
        e.append(T(lvl, 342, y + 17, 13, "#0f172a"))
        e.append(T(re, 668, y + 14, 15, NEU_T, w=270))
    # quote + design test
    e.append(box(44, 516, 882, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T('"Agency is not a binary thing but a lever you can dial." — Joel Hron, Thomson Reuters  ·  corpus',
               64, 531, 15, BLUE_S))
    e.append(T("A reversible step gated like an irreversible one spends scarce human attention in the wrong place.",
               44, 580, 13, GREY))
    save("ch06-fig4-agency-dial.excalidraw", e)


# ───────────────────────── Ch7 · fig4 — enterprise MCP gateway + root of trust ─────────────────────────
def ch07_fig4():
    e = []
    header(e, "CHAPTER 7  ·  SECURITY, IDENTITY & HIGH-STAKES TRUST",
           "Enterprise MCP Has One Shape",
           "Don't ship servers one at a time. Build the platform: a gateway and a root of trust.")
    # agents (left)
    e.append(box(44, 226, 158, 150, PURP_S, PURP_F))
    e.append(T("Agents /\nMCP clients", 44, 268, 17, PURP_T, "center", 158))
    e.append(T("real principals\n· scoped tokens", 44, 322, 11, PURP_S, "center", 158))
    e.append(arr(206, 301, 252, 301, NEU_S))
    # gateway container (center)
    e.append(box(256, 176, 430, 320, BLUE_S, "#eff6ff", sw=2))
    e.append(T("1 · MCP GATEWAY  —  ROOT OF TRUST", 256, 190, 15, BLUE_S, "center", 430))
    pieces = [
        ("2 · Policy plane", "who may call what, when"),
        ("3 · Registry", "blessed servers, reviewed before entry"),
        ("4 · Permissions", "identity × tool × approval"),
        ("5 · Audit log", "every invocation recorded"),
    ]
    for i, (h, sub) in enumerate(pieces):
        y = 222 + i * 64
        e.append(box(276, y, 390, 52, BLUE_S, "#dbeafe", sw=1))
        e.append(T(h, 290, y + 9, 15, BLUE_S))
        e.append(T(sub, 290, y + 29, 12, "#475569"))
    e.append(arr(690, 301, 736, 301, NEU_S))
    # blessed servers (right)
    e.append(T("Blessed servers", 742, 200, 12, GREEN_T, "center", 184))
    for i, s in enumerate(["✓  GitHub", "✓  Calendar", "✓  Documents"]):
        y = 226 + i * 64
        e.append(box(742, y, 184, 52, GREEN_S, GREEN_F, sw=1))
        e.append(T(s, 742, y + 16, 16, GREEN_T, "center", 184))
    e.append(T("step-up OAuth →\ncapability follows authority", 742, 420, 11, GREEN_S, "center", 184))
    # before strip (red)
    e.append(box(44, 512, 882, 40, RED_S, RED_F, sw=1))
    e.append(T("✕  Before:  standing credential → every tool · full authority · no expiry · no record",
               64, 524, 14, RED_T))
    # banner
    e.append(T('Miss any one of the five and that\'s where the boundary fails first.  — Karan Sampath, Anthropic  ·  corpus',
               44, 566, 13, GREY))
    save("ch07-fig4-enterprise-mcp-gateway.excalidraw", e)


# ───────────────────────── Ch1 · fig4 — failure surface stretches ─────────────────────────
def ch01_fig4():
    e = []
    header(e, "CHAPTER 1  ·  THE SHIFT: FROM ASSISTANT TO DELEGATE",
           "The Failure Surface Stretches",
           "Suggestion is supervised by construction. Delegation isn't.")
    # Row 1 — assistant
    e.append(T("ASSISTANT — “tell me”   ·   human reads every word", 44, 178, 14, BLUE_S))
    node(e, 44, 200, 120, 46, "Ask", ORNG_S, ORNG_F, 16)
    e.append(arr(166, 223, 196, 223, NEU_S))
    node(e, 198, 200, 150, 46, "Suggest", BLUE_S, BLUE_F, 16)
    e.append(arr(350, 223, 380, 223, NEU_S))
    node(e, 382, 200, 180, 46, "Human reads  ✓", GREEN_S, GREEN_F, 15)
    e.append(T("✗ caught here", 382, 250, 12, RED_S, "center", 180))
    e.append(box(198, 270, 150, 16, RED_S, RED_F, sw=1))
    e.append(T("failure surface: one response", 198, 288, 11, RED_S))
    e.append(T("a wrong suggestion = a wrong sentence, caught in context", 44, 310, 13, GREY))
    # Row 2 — delegate
    e.append(T("DELEGATE — “go do”   ·   human waits for the result", 44, 360, 14, ORNG_S))
    node(e, 44, 382, 120, 46, "Delegate", ORNG_S, ORNG_F, 16)
    xs = [196, 318, 440, 562]
    labels = ["step 1", "step 2", "step 3", "step 4"]
    for i, (x, lb) in enumerate(zip(xs, labels)):
        if i == 1:
            node(e, x, 382, 110, 46, "step 2  ✗", RED_S, RED_F, 15, RED_T)
        else:
            sub = "built on" if i >= 2 else ""
            node(e, x, 382, 110, 46, (lb + ("\n" + sub if sub else "")), BLUE_S, BLUE_F, 15)
        if i < 3:
            e.append(arr(x + 110, 405, x + 122, 405, NEU_S))
    e.append(arr(164, 405, 196, 405, NEU_S))
    e.append(arr(672, 405, 686, 405, NEU_S))
    node(e, 688, 382, 170, 46, "Review  👁", GREEN_S, GREEN_F, 15)
    e.append(T("✗ surfaces here — downstream", 688, 432, 11, RED_S, "center", 170))
    e.append(box(318, 452, 540, 16, RED_S, RED_F, sw=1))
    e.append(T("failure surface: the whole workflow", 318, 470, 11, RED_S))
    e.append(T("a wrong delegated action = a wrong artifact other work now depends on", 44, 492, 13, GREY))
    # banner
    e.append(box(44, 524, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("The error no longer surfaces when it happens — it surfaces later, after it has been built on.",
               64, 539, 16, BLUE_S))
    save("ch01-fig4-failure-surface-stretches.excalidraw", e)


# ───────────────────────── Ch8 · fig4 — half-duplex ceiling ─────────────────────────
def ch08_fig4():
    e = []
    header(e, "CHAPTER 8  ·  REALTIME, VOICE & THE COST OF BEING INTERRUPTIBLE",
           "Half-Duplex Is the Ceiling",
           "Listen or speak — never both. The limit is the architecture, not the model.")
    # left panel — half-duplex
    e.append(box(44, 178, 420, 250, RED_S, "#fff5f5", sw=2))
    e.append(T("HALF-DUPLEX  ·  one channel at a time", 44, 192, 15, RED_T, "center", 420))
    seg = [("listen", BLUE_S, BLUE_F), ("speak", GREEN_S, GREEN_F),
           ("listen", BLUE_S, BLUE_F), ("speak", GREEN_S, GREEN_F)]
    for i, (lb, s, f) in enumerate(seg):
        node(e, 58 + i * 99, 236, 95, 44, lb, s, f, 13)
    e.append(T("✗ overlap     ✗ back-channeling (“mhm”)     ✗ barge-in", 44, 312, 13, RED_S, "center", 420))
    e.append(T("every micro-decision collapses to: am I listening, or speaking?", 44, 352, 12, GREY, "center", 420))
    # right panel — full-duplex
    e.append(box(486, 178, 440, 250, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("FULL-DUPLEX  ·  both at once", 486, 192, 15, GREEN_T, "center", 440))
    e.append(box(502, 232, 408, 40, BLUE_S, BLUE_F, sw=1)); e.append(T("listen  ▶▶▶  (continuous)", 502, 244, 13, BLUE_S, "center", 408))
    e.append(box(502, 278, 408, 40, GREEN_S, GREEN_F, sw=1)); e.append(T("speak  ▶▶▶  (continuous)", 502, 290, 13, GREEN_T, "center", 408))
    e.append(T("✓ overlap     ✓ back-channeling     ✓ barge-in", 486, 332, 13, GREEN_S, "center", 440))
    e.append(T("trade: weaker reasoning · research frontier (Moshi)", 486, 372, 12, GREY, "center", 440))
    # banner + design test
    e.append(box(44, 446, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T('"The model is either listening or it\'s speaking." — Neil Zeghidour, Gradium AI  ·  corpus', 64, 461, 15, BLUE_S))
    e.append(T("Stacking wait-buttons and silence thresholds are symptoms — the lever is the architecture.", 44, 506, 13, GREY))
    save("ch08-fig4-half-duplex-ceiling.excalidraw", e)


# ───────────────────────── Ch8 · fig5 — latency masking ─────────────────────────
def ch08_fig5():
    e = []
    header(e, "CHAPTER 8  ·  REALTIME, VOICE & THE COST OF BEING INTERRUPTIBLE",
           "Mask Latency, Don't Just Minimize It",
           "When a tool call can take 4s, you can't optimize into a 200ms budget. Fill the gap.")
    # budget vs tool-call reference
    e.append(T("turn budget", 44, 184, 12, GREEN_S))
    e.append(box(132, 180, 26, 22, GREEN_S, GREEN_F, sw=1)); e.append(T("200ms", 162, 184, 12, GREEN_S))
    e.append(T("tool-call latency", 320, 184, 12, RED_S))
    e.append(box(440, 180, 300, 22, RED_S, RED_F, sw=1)); e.append(T("0.5 – 4 s  (variance is the killer)", 452, 184, 12, RED_T))
    # Row A — unmasked
    e.append(T("UNMASKED", 44, 240, 14, RED_T))
    node(e, 44, 262, 120, 46, "user EOU", ORNG_S, ORNG_F, 14)
    node(e, 180, 262, 470, 46, "·  ·  ·   SILENCE — tool runs ~3s   ·  ·  ·", RED_S, RED_F, 14, RED_T)
    node(e, 664, 262, 120, 46, "reply", NEU_S, NEU_F, 14)
    e.append(T("dead line — sounds frozen", 180, 312, 12, RED_S, "center", 470))
    # Row B — masked
    e.append(T("MASKED", 44, 360, 14, GREEN_S))
    node(e, 44, 382, 120, 46, "user EOU", ORNG_S, ORNG_F, 14)
    e.append(box(180, 382, 470, 46, "#cbd5e1", "#f1f5f9", sw=1)); e.append(T("tool runs in the background", 180, 442, 11, GREY, "center", 470))
    node(e, 188, 386, 210, 38, "“one moment…” filler", GREEN_S, GREEN_F, 13)
    node(e, 404, 386, 238, 38, "clarifying question", GREEN_S, GREEN_F, 13)
    node(e, 664, 382, 120, 46, "reply", GREEN_S, GREEN_F, 14)
    e.append(T("conversation stays alive — the 3s call disappears into the rhythm", 180, 460, 12, GREEN_S, "center", 470))
    # banner
    e.append(box(44, 500, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T('"While it waits for the result, it can keep the conversation going." — Neil Zeghidour  ·  corpus', 64, 515, 15, BLUE_S))
    save("ch08-fig5-latency-masking.excalidraw", e)


# ───────────────────────── Ch9 · fig4 — review is the bottleneck ─────────────────────────
def ch09_fig4():
    e = []
    header(e, "CHAPTER 9  ·  THE AI-NATIVE ORGANIZATION",
           "Review Is the New Bottleneck",
           "You can only safely create as fast as you can trustworthily review.")
    # left — review harder (doesn't scale)
    e.append(T("✗  REVIEW HARDER — doesn't scale", 44, 178, 14, RED_T))
    node(e, 44, 202, 410, 38, "Creation:  people + agents", PURP_S, PURP_F, 14)
    for i in range(7):
        e.append(box(48 + i * 58, 250, 50, 28, BLUE_S, BLUE_F, sw=1))
    e.append(T("weekend pile of PRs · drafts · automations", 44, 284, 11, GREY, "center", 410))
    e.append(arr(249, 246, 249, 308, NEU_S))
    node(e, 159, 310, 180, 40, "HUMAN REVIEW", RED_S, RED_F, 14, RED_T)
    e.append(arr(249, 350, 249, 372, NEU_S))
    node(e, 199, 374, 110, 34, "ships (trickle)", NEU_S, NEU_F, 12, NEU_T)
    e.append(T("giant queues, no context —\nwasted & duplicate work (Appleton)", 44, 418, 12, RED_S, "center", 410))
    # right — review as a system
    e.append(T("✓  REVIEW AS A SYSTEM", 486, 178, 14, GREEN_T))
    node(e, 486, 202, 440, 38, "Creation:  people + agents", PURP_S, PURP_F, 14)
    e.append(arr(706, 240, 706, 250, NEU_S))
    node(e, 486, 252, 440, 40, "1 · automated checks + evals  →  clear routine", GREEN_S, "#dcfce7", 14, GREEN_T)
    e.append(arr(706, 292, 706, 300, NEU_S))
    node(e, 486, 302, 440, 40, "2 · triage:  must-see  vs  ship-on-green", GREEN_S, "#dcfce7", 14, GREEN_T)
    e.append(arr(706, 342, 706, 350, NEU_S))
    node(e, 486, 352, 440, 40, "3 · human on consequential  +  roll-up view", GREEN_S, "#dcfce7", 14, GREEN_T)
    e.append(arr(706, 392, 706, 400, NEU_S))
    node(e, 486, 402, 440, 38, "ships  —  full throughput", GREEN_S, GREEN_F, 14, GREEN_T)
    # banner
    e.append(box(44, 470, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Eval + review capacity is the throughput limit of the entire company. — after Appleton, Arcolano  ·  corpus",
               64, 485, 15, BLUE_S))
    save("ch09-fig4-review-bottleneck.excalidraw", e)


if __name__ == "__main__":
    ch01_fig4()
    ch05_fig4()
    ch05_fig5()
    ch06_fig4()
    ch07_fig4()
    ch08_fig4()
    ch08_fig5()
    ch09_fig4()
