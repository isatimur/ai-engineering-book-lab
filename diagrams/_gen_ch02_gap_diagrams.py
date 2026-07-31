"""Builds the gap inline figures for Chapter 2 — "Taste Still Matters When Code
Gets Cheap." One figure per under-illustrated H2 section. Reuses the DSL pattern
from _gen_gap_diagrams.py (base/T/box/ln/arr/header/node + palette). Palette and
signature mark follow diagrams/STYLE.md. Every claim carries a corpus video # if
one is confirmed in claims/Claims Ledger.md; authorial synthesis carries none."""
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

_s = [92000]
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


# ───────── Ch2 · fig4 — comprehension debt (H2: taste = quality discrimination) ─────────
def ch02_fig4():
    e = []
    header(e, "CHAPTER 2  ·  TASTE IS QUALITY DISCRIMINATION",
           "Comprehension Stops Being Free",
           "When you wrote every line, understanding came bundled with authorship. A model unbundles it.")
    # left — authorship (the old bundle)
    e.append(box(44, 158, 408, 196, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("AUTHORSHIP  ·  the old bundle", 44, 170, 14, GREEN_S, "center", 408))
    node(e, 72, 198, 352, 42, "You write every line", GREEN_S, GREEN_F, 15, GREEN_T)
    e.append(arr(248, 242, 248, 262, NEU_S))
    e.append(box(72, 264, 352, 46, GREEN_S, GREEN_F, sw=2))
    e.append(T("working code  ⊕  comprehension", 72, 279, 15, GREEN_T, "center", 352))
    e.append(T("understanding arrives free, with authorship", 44, 322, 12, GREEN_S, "center", 408))
    # right — delegation (the bundle breaks)
    e.append(box(474, 158, 452, 196, BLUE_S, "#eff6ff", sw=2))
    e.append(T("DELEGATION  ·  the bundle breaks", 474, 170, 14, BLUE_S, "center", 452))
    node(e, 560, 198, 280, 42, "Model writes the code", PURP_S, PURP_F, 15, PURP_T)
    e.append(arr(672, 240, 600, 262, NEU_S))
    e.append(arr(728, 240, 808, 262, NEU_S))
    e.append(box(494, 264, 196, 46, BLUE_S, BLUE_F, sw=2))
    e.append(T("working code  ✓", 494, 279, 14, BLUE_S, "center", 196))
    e.append(box(710, 264, 200, 46, RED_S, RED_F, sw=2))
    e.append(T("comprehension  ✗", 710, 279, 14, RED_T, "center", 200))
    e.append(T("a debt — understanding owed, payable after the fact", 474, 322, 12, RED_S, "center", 452))
    # banner — the load-bearing step
    e.append(box(44, 372, 882, 80, BLUE_F, "#eff6ff", sw=1))
    e.append(T("The load-bearing step  —  read the diff like an author", 64, 384, 16, BLUE_S))
    e.append(T("· reconstruct why each choice was made, not just that the lines parse", 64, 410, 13, INK))
    e.append(T("· trace one path the tests don't cover — ask whether the design would survive it", 64, 430, 13, INK))
    e.append(T("The model hands you working code you did not build — so understanding is no longer included.",
               44, 464, 13, CITE))
    save("ch02-fig4-comprehension-debt.excalidraw", e)


# ───────── Ch2 · fig5 — mode switch keyed to cost-of-wrong (H4: vibe coding is a mode) ─────────
def ch02_fig5():
    e = []
    header(e, "CHAPTER 2  ·  VIBE CODING IS A MODE",
           "Switch on the Cost of Being Wrong",
           "Vibe-code where a mistake is cheap. Leave it the moment the output has to endure.")
    # low-cost zone → vibe-code
    e.append(box(44, 172, 410, 152, AMBER_S, "#fffbeb", sw=2))
    e.append(T("LOW COST OF WRONG  →  VIBE-CODE", 44, 184, 13, AMBER_T, "center", 410))
    e.append(T("Goal: discovery — learn what is worth building.", 64, 212, 13, AMBER_T))
    e.append(T("fits:  prototypes · sketches · internal tools · one-off automation", 64, 240, 12, AMBER_S))
    e.append(T("a mistake here costs an afternoon.", 64, 288, 12, GREY))
    # switch arrow
    e.append(arr(458, 248, 512, 248, ORNG_S, sw=3))
    e.append(T("switch", 460, 224, 11, ORNG_S))
    # high-cost zone → production discipline
    e.append(box(516, 172, 410, 152, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("HIGH COST OF WRONG  →  PRODUCTION DISCIPLINE", 516, 184, 13, GREEN_T, "center", 410))
    e.append(box(536, 210, 372, 66, DARK_S, DARK_F, sw=1))
    e.append(T('production means:\n four-nines uptime · thousands of users · gigabytes of data', 550, 218, 12, "#86efac"))
    e.append(T("the moment a mistake is paid by people who never saw the prompt.", 516, 290, 11.5, GREEN_S, "center", 410))
    # the tell — the Monday
    e.append(box(44, 344, 882, 54, RED_S, "#fff5f5", sw=1))
    e.append(T("THE TELL — the Monday:", 64, 354, 14, RED_T))
    e.append(T("app works Friday → Monday it must change → no one understands it well enough to change it safely.", 64, 376, 13, RED_S))
    e.append(T("Not anti-vibe but mode-aware — the switch is keyed to what a wrong answer costs.", 44, 410, 13, CITE))
    e.append(T("— Chris Kelly, Augment Code · corpus video #132    ·    the Monday hangover: Corey Gallon, Rexmore · #106", 44, 432, 12, GREY))
    save("ch02-fig5-mode-switch-cost-of-wrong.excalidraw", e)


# ───────── Ch2 · fig6 — the framing gate (H5: framing is the new scarce skill) ─────────
def ch02_fig6():
    e = []
    header(e, "CHAPTER 2  ·  FRAMING IS THE NEW SCARCE SKILL",
           "The Framing Gate",
           "Six questions a task must answer before it is delegated — a gate it clears, not a courtesy.")
    # task (left)
    node(e, 44, 278, 166, 64, "Task", ORNG_S, ORNG_F, 18, ORNG_T)
    e.append(T("vague, or framed?", 44, 348, 11, GREY, "center", 166))
    e.append(arr(210, 310, 238, 310, NEU_S))
    # the gate (center)
    e.append(box(240, 158, 446, 300, BLUE_S, "#eff6ff", sw=2))
    e.append(T("THE FRAMING GATE  ·  six questions", 240, 168, 14, BLUE_S, "center", 446))
    qs = [
        "1 · What exactly is the task?",
        "2 · What counts as success?",
        "3 · What constraints matter?",
        "4 · Optimize for: speed · clarity · correctness · reversibility",
        "5 · What stays rough vs. must be production-grade now?",
        "6 · What makes it unacceptable even if it looks complete?",
    ]
    for i, q in enumerate(qs):
        y = 196 + i * 42
        e.append(box(258, y, 410, 34, BLUE_S, "#dbeafe", sw=1))
        e.append(T(q, 270, y + 9, 12.5, BLUE_S))
    # delegated execution (right)
    e.append(arr(686, 310, 714, 310, NEU_S))
    node(e, 716, 278, 182, 64, "Delegated\nexecution", BLUE_S, BLUE_F, 15)
    e.append(T("cheap · fast · faithful", 716, 348, 11, GREY, "center", 182))
    # skip-the-gate warning
    e.append(box(44, 470, 882, 42, RED_S, "#fff5f5", sw=1))
    e.append(T("Skip the gate and the generator sprints confidently in the wrong direction — plausible but misaligned, at scale.", 64, 483, 12.5, RED_S))
    e.append(T("These questions used to signal seniority; now they are the gate anyone clears before directing cheap execution.", 44, 522, 13, CITE))
    e.append(T('— Sean Grove, OpenAI · corpus video #265  ·  "the new scarce skill is writing specifications that fully capture the intent"', 44, 544, 12, GREY))
    save("ch02-fig6-framing-gate.excalidraw", e)


# ───────── Ch2 · fig7 — review / war on slop (H6: review outruns intuition) ─────────
def ch02_fig7():
    e = []
    header(e, "CHAPTER 2  ·  REVIEW OUTRUNS INTUITION",
           "Review Is Where Standards Survive Abundance",
           "Generation outruns intuition. Review is the mechanism that refuses slop before it compounds.")
    # generation firehose
    node(e, 44, 162, 196, 50, "Generation", PURP_S, PURP_F, 16, PURP_T)
    for i in range(6):
        e.append(box(268 + i * 70, 170, 60, 34, NEU_S, NEU_F, sw=1))
    e.append(T("artifacts, faster than intuition can validate — looks done, arrived fast, pressure to accept", 268, 214, 12, GREY))
    # slop, defined (dark card)
    e.append(box(44, 244, 410, 120, DARK_S, DARK_F, sw=1))
    e.append(T("SLOP", 64, 254, 14, "#fca5a5"))
    e.append(T("output that looks done but transfers its cost\ndownstream — consuming trust faster than\nit creates value.", 64, 282, 12.5, "#e2e8f0"))
    # review, defined
    e.append(box(474, 244, 452, 120, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("REVIEW  —  not bureaucratic blockage", 474, 254, 13, GREEN_T, "center", 452))
    e.append(T("quality discrimination: is this artifact\nactually fit for purpose?", 494, 282, 14, GREEN_T))
    e.append(T("the moment tacit standards become visible", 494, 336, 12, GREEN_S))
    # outcomes
    e.append(box(44, 382, 410, 44, RED_S, "#fff5f5", sw=1))
    e.append(T("skip it  →  reviewer fatigue · cognitive debt", 64, 394, 13, RED_S))
    e.append(box(474, 382, 452, 44, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("keep it  →  standards survive abundance", 494, 394, 13, GREEN_S))
    # economic realism
    e.append(box(44, 440, 882, 42, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Cheap output that needs expensive cleanup is not cheap. Fast drafts that hide slow confusion are not fast.", 64, 452, 14, BLUE_S))
    e.append(T('— swyx, "war on slop" · #59    ·    "code review is the most important skill" — Chris Kelly, Augment Code · #132', 44, 494, 12, CITE))
    save("ch02-fig7-review-war-on-slop.excalidraw", e)


# ───────── Ch2 · fig8 — constraints enable delegation (H7: constraints are care) ─────────
def ch02_fig8():
    e = []
    header(e, "CHAPTER 2  ·  CONSTRAINTS ARE A FORM OF CARE",
           "Constraints Are What Let You Delegate",
           "Confidence in fast generation comes from the verification wrapped around it — not the vibes.")
    # confidence banner
    e.append(box(44, 158, 882, 46, PURP_S, "#f5f3ff", sw=1))
    e.append(T("Verification = high-quality tests + a reviewing pass on the diff before it merges — not the vibes.", 64, 172, 14, PURP_T))
    # without constraints (red)
    e.append(box(44, 222, 410, 212, RED_S, "#fff5f5", sw=2))
    e.append(T("WITHOUT EXPLICIT CONSTRAINTS", 44, 234, 13, RED_T, "center", 410))
    for i, s in enumerate(["· wide, wasted search", "· evaluation stays unclear",
                            "· must hover over every step", "· quality norms live only in heads",
                            "· taste stays a private opinion"]):
        e.append(T(s, 66, 266 + i * 30, 13, RED_S))
    # with constraints (green) — five jobs
    e.append(box(474, 222, 452, 212, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("WITH EXPLICIT CONSTRAINTS  —  five jobs", 474, 234, 13, GREEN_T, "center", 452))
    for i, s in enumerate(["· reduce wasted search", "· make evaluation clearer",
                           "· preserve local quality norms", "· delegate without hovering",
                           "· turn taste into something operational"]):
        e.append(T(s, 496, 266 + i * 30, 13, GREEN_S))
    e.append(T("The team that can state its constraints delegates more safely than one relying on vibe, memory, and implied context.", 44, 452, 13, CITE))
    e.append(T('— Itamar Friedman, Qodo · corpus video #127  ·  "vibe coding with confidence"', 44, 474, 12, GREY))
    save("ch02-fig8-constraints-are-care.excalidraw", e)


# ───────── Ch2 · fig9 — layers vs. irreducible core (H8: the factory needs adults) ─────────
def ch02_fig9():
    e = []
    header(e, "CHAPTER 2  ·  THE FACTORY NEEDS ADULTS",
           "Better Harness, Same Need for Adults",
           "Every layer makes judgment scalable and inspectable. None removes the need for it.")
    # outer container — the automation layers
    e.append(box(44, 168, 882, 250, PURP_S, "#faf5ff", sw=2))
    e.append(T("AUTOMATION LAYERS  —  make judgment scalable & inspectable", 44, 180, 14, PURP_S, "center", 882))
    layers = ["repo structure / harness", "retrieval", "tools", "validation passes", "trajectory review"]
    for i, s in enumerate(layers):
        y = 212 + i * 38
        e.append(box(68, y, 360, 32, PURP_S, PURP_F, sw=1))
        e.append(T(s, 84, y + 8, 13, PURP_T))
        e.append(arr(432, y + 16, 466, y + 16, NEU_S))
    # irreducible core
    e.append(box(470, 206, 434, 176, BLUE_S, "#eff6ff", sw=2))
    e.append(T("THE IRREDUCIBLE CORE  —  human standards", 470, 216, 13, BLUE_S, "center", 434))
    for i, s in enumerate(["· decide what the harness should teach",
                           "· define acceptable tradeoffs",
                           "· set review boundaries & quality bars",
                           "· tell \"compiles\" from \"improves the system\""]):
        e.append(T(s, 492, 248 + i * 30, 13, BLUE_S))
    # banner
    e.append(box(44, 434, 882, 44, GREEN_F, "#f0fdf4", sw=1))
    e.append(T("AI does not make seniority irrelevant — it makes it more leveraged and more legible.", 64, 446, 15, GREEN_T))
    e.append(T("Software factory or high-stakes colleague: better harness and validation still cannot decide what \"good\" means.", 44, 488, 13, CITE))
    save("ch02-fig9-adults-in-the-room.excalidraw", e)


# ───────── Ch2 · fig10 — production → direction (H9: the job is shifting) ─────────
def ch02_fig10():
    e = []
    header(e, "CHAPTER 2  ·  FROM PRODUCTION TO DIRECTION",
           "Fundamentals Migrate Upward",
           "Fundamentals do not disappear. They move up into the more leveraged parts of the loop.")
    # production (lower, muted / machine-absorbed)
    e.append(box(44, 300, 360, 120, NEU_S, "#f1f5f9", sw=2))
    e.append(T("PRODUCTION  ·  token-making", 64, 312, 13, NEU_T))
    e.append(T("typing syntax · scaffolding · wiring · drafting", 64, 340, 12, NEU_T))
    e.append(T("→ increasingly machine-absorbed", 64, 368, 12, GREY))
    # migration arrow (upward)
    e.append(arr(410, 360, 494, 220, ORNG_S, sw=3))
    e.append(T("fundamentals\nmigrate upward", 406, 260, 11, ORNG_S))
    # direction (upper, leveraged)
    e.append(box(500, 158, 426, 262, BLUE_S, "#eff6ff", sw=2))
    e.append(T("DIRECTION  ·  the leveraged loop", 500, 170, 14, BLUE_S, "center", 426))
    for i, s in enumerate(["· framing tasks well", "· defining constraints", "· choosing abstractions",
                           "· sequencing work", "· reviewing outputs",
                           "· preserving coherence across artifacts",
                           "· deciding when to trust vs. narrow scope"]):
        e.append(T(s, 522, 202 + i * 30, 13, BLUE_S))
    # banner
    e.append(box(44, 440, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("What stays scarce is not producing tokens — it's directing production toward something durable and worth keeping.", 64, 455, 13, BLUE_S))
    e.append(T("Fundamentals migrate upward into the more leveraged parts of the loop. Don't confuse typing with thinking.", 44, 498, 13, CITE))
    save("ch02-fig10-production-to-direction.excalidraw", e)


if __name__ == "__main__":
    ch02_fig4()
    ch02_fig5()
    ch02_fig6()
    ch02_fig7()
    ch02_fig8()
    ch02_fig9()
    ch02_fig10()
