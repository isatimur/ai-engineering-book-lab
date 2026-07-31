"""Builds the gap inline figures for Chapter 9 — The AI-Native Organization.
Five NEW figures to close the per-heading illustration gap; the four existing
ch09 figures are reused at their best-fit headings (see _manifest_ch09_inline.json).
Hand-specified elements per diagram; shared constructors only for boilerplate.
Palette + signature mark follow diagrams/STYLE.md. Every quote is corpus-cited
with its confirmed video number (claims/Claims Ledger.md)."""
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

_s = [12000]
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


# ───────────── Ch9 · fig5 — heading 1: the Monday morning scene ─────────────
def ch09_fig5():
    e = []
    header(e, "CHAPTER 9  ·  THE AI-NATIVE ORGANIZATION",
           "The Monday Pile Isn’t the Problem",
           "Everyone was productive over the weekend. Coherence is what’s scarce now.")
    # left — the weekend pile, all green
    e.append(box(44, 168, 430, 322, NEU_S, "#f8fafc", sw=2))
    e.append(T("OVER THE WEEKEND  ·  everyone was productive", 44, 180, 13, NEU_T, "center", 430))
    pile = [
        ("12  pull requests", "✓", False),
        ("4  synthetic eval reports", "✓", False),
        ("2  security review requests", "✓", False),
        ("3  alternative onboarding flows", "✓", False),
        ("1  automation · touched 3 systems", "✓", False),
        ("admin-override regression · Ch.4 throttle", "buried", True),
    ]
    ry, rh = 210, 44
    for i, (lab, tag, bad) in enumerate(pile):
        y = ry + i * rh
        s, f, tc = (RED_S, RED_F, RED_T) if bad else (GREEN_S, "#ecfdf5", INK)
        e.append(box(58, y, 402, 36, s, f, sw=1))
        e.append(T(lab, 74, y + 10, 13, tc))
        e.append(T(tag, 380, y + 10, 12, s if bad else GREEN_S))
    e.append(T("one bad change, wearing the same green as the rest", 44, 470, 11, RED_S, "center", 430))
    # arrow into the reviewer
    e.append(arr(476, 320, 494, 320, NEU_S))
    # right — the Monday question
    e.append(box(496, 168, 430, 322, BLUE_S, "#eff6ff", sw=2))
    e.append(T("THE MONDAY QUESTION", 496, 180, 13, BLUE_S, "center", 430))
    e.append(T("Not   “is there enough work?”", 516, 214, 16, NEU_T))
    e.append(T("But   “which of this can I trust?”", 516, 242, 17, BLUE_S))
    for i, b in enumerate([
        "· which changes actually matter",
        "· which are duplicates of each other",
        "· which reflect strategy — not a private read",
        "· safe to merge · trial · ignore · distrust",
    ]):
        e.append(T(b, 522, 286 + i * 24, 13, INK))
    node(e, 514, 392, 394, 42, "1 staff engineer  ·  1 pair of eyes  ·  Monday 9:00", BLUE_S, BLUE_F, 13)
    e.append(T("abundant: output          scarce: attention to judge it", 496, 448, 12, GREY, "center", 430))
    # banner
    e.append(box(44, 508, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("The organization is no longer starved for output. It is starved for coherence.",
               64, 523, 17, BLUE_S))
    save("ch09-fig5-monday-morning.excalidraw", e)


# ───────────── Ch9 · fig6 — heading 2: seats vs approval paths ─────────────
def ch09_fig6():
    e = []
    header(e, "CHAPTER 9  ·  THE AI-NATIVE ORGANIZATION",
           "Count Seats, or Count Approval Paths",
           "Adoption by access looks transformative. Adoption by routing often hasn’t moved.")
    # left — measure by access
    e.append(box(44, 168, 430, 300, RED_S, "#fff5f5", sw=2))
    e.append(T("MEASURE BY ACCESS  —  count seats", 44, 180, 14, RED_T, "center", 430))
    e.append(T("licenses purchased          ↑ ↑", 68, 214, 14, INK))
    e.append(T("engineers with a seat        ↑ ↑", 68, 238, 14, INK))
    e.append(T("but the routing is unchanged:", 68, 272, 12, RED_S))
    node(e, 66, 296, 90, 34, "request", ORNG_S, ORNG_F, 12)
    e.append(arr(158, 313, 174, 313, NEU_S))
    node(e, 176, 296, 128, 34, "same approver", NEU_S, NEU_F, 12, NEU_T)
    e.append(arr(306, 313, 322, 313, NEU_S))
    node(e, 324, 296, 128, 34, "same gate → ship", NEU_S, NEU_F, 12, NEU_T)
    e.append(box(58, 402, 402, 46, RED_S, RED_F, sw=1))
    e.append(T("individuals a little faster — the operating model didn’t bend",
               58, 417, 12.5, RED_T, "center", 402))
    # right — measure by routing
    e.append(box(496, 168, 430, 300, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("MEASURE BY ROUTING  —  did a path change?", 496, 180, 14, GREEN_T, "center", 430))
    e.append(T("test:  did one approval path actually change?", 518, 214, 14, INK))
    e.append(T("before", 518, 250, 11, GREY))
    node(e, 518, 268, 100, 30, "request", ORNG_S, ORNG_F, 11)
    e.append(arr(620, 283, 634, 283, NEU_S))
    node(e, 636, 268, 118, 30, "human approver", NEU_S, NEU_F, 11, NEU_T)
    e.append(arr(756, 283, 770, 283, NEU_S))
    node(e, 772, 268, 66, 30, "ship", NEU_S, NEU_F, 11, NEU_T)
    e.append(T("after", 518, 312, 11, GREY))
    node(e, 518, 330, 100, 30, "request", ORNG_S, ORNG_F, 11)
    e.append(arr(620, 345, 634, 345, GREEN_S))
    node(e, 636, 330, 150, 30, "policy rail + checks", GREEN_S, GREEN_F, 11, GREEN_T)
    e.append(arr(788, 345, 802, 345, GREEN_S))
    node(e, 804, 330, 108, 30, "owner iff\nconsequential", GREEN_S, GREEN_F, 10, GREEN_T)
    e.append(box(510, 402, 402, 46, GREEN_S, GREEN_F, sw=1))
    e.append(T("the operating model bends → AI becomes formative",
               510, 417, 13, GREEN_T, "center", 402))
    # banner
    e.append(box(44, 486, 882, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("“There is a 10x difference between an org where 90% of engineers use AI vs one where 100% do.”",
               64, 498, 13.5, BLUE_S))
    e.append(T("— Dan Shipper, CEO, Every  ·  corpus video #65", 64, 517, 12, "#475569"))
    save("ch09-fig6-seats-vs-approval-path.excalidraw", e)


# ───────────── Ch9 · fig7 — heading 3: throughput ≠ velocity ─────────────
def ch09_fig7():
    e = []
    header(e, "CHAPTER 9  ·  THE AI-NATIVE ORGANIZATION",
           "More Output Is Not More Throughput",
           "An organization can produce far more work and still move slower.")
    # paradox bars
    e.append(T("OUTPUT / PERSON", 44, 178, 12, GREY))
    e.append(box(210, 172, 494, 26, "#cbd5e1", "#f1f5f9", sw=1))
    e.append(box(210, 172, 470, 26, AMBER_S, "#fbbf24", sw=1))
    e.append(T("↑↑↑   PRs opened · variants · tasks pushed into motion", 224, 178, 12.5, AMBER_T))
    e.append(T("ORG THROUGHPUT", 44, 214, 12, GREY))
    e.append(box(210, 208, 494, 26, "#cbd5e1", "#f1f5f9", sw=1))
    e.append(box(210, 208, 150, 26, RED_S, "#f87171", sw=1))
    e.append(T("↓  trusted work shipped, unreverted", 370, 214, 12.5, RED_S))
    # measure-the-outcome card (top right)
    e.append(box(724, 168, 202, 138, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("MEASURE THE OUTCOME", 724, 180, 11.5, GREEN_T, "center", 202))
    for i, m in enumerate(["· rework rate", "· % shipped, unreverted", "· time in review queue"]):
        e.append(T(m, 740, 206 + i * 22, 12.5, INK))
    e.append(T("not artifact volume", 724, 280, 11.5, GREY, "center", 202))
    # why the gap — pipeline
    node(e, 44, 262, 150, 44, "creation  ↑↑", PURP_S, PURP_F, 14, PURP_T)
    e.append(arr(196, 284, 238, 284, NEU_S))
    node(e, 240, 262, 220, 44, "REVIEW QUEUE — clogged", RED_S, RED_F, 14, RED_T)
    e.append(arr(462, 284, 504, 284, NEU_S))
    node(e, 506, 262, 160, 44, "ships: a trickle", NEU_S, NEU_F, 13, NEU_T)
    e.append(T("review queues clog   ·   priorities scatter   ·   trust in output declines",
               44, 320, 12.5, RED_S, "center", 622))
    # evidence card
    e.append(box(44, 352, 660, 92, DARK_S, DARK_F, sw=1))
    ev = ("Jellyfish  ·  ~20M pull requests\n"
          "  output volume  ↑        dashboards light up green\n"
          "  review · integration · trust  =  unmeasured, until it breaks")
    e.append(T(ev, 60, 362, 12.5, "#86efac"))
    e.append(T("— Nick Arcolano, Jellyfish  ·  corpus video #101", 724, 352, 12, "#475569", w=202))
    e.append(T("Local speed ≠ system\nthroughput.", 724, 396, 13, INK, w=202))
    # banner
    e.append(box(44, 468, 882, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("“Allocate judgment and attention — still scarce — not production capacity, now abundant.”",
               64, 480, 13.5, BLUE_S))
    e.append(T("— Justin Reock, DX  ·  corpus video #62", 64, 499, 12, "#475569"))
    save("ch09-fig7-throughput-not-velocity.excalidraw", e)


# ───────────── Ch9 · fig8 — heading 5: consensus review via cheap models ─────────────
def ch09_fig8():
    e = []
    header(e, "CHAPTER 9  ·  THE AI-NATIVE ORGANIZATION",
           "A Cheaper Verdict from Redundancy",
           "When generation is cheap, trust can come from many independent voters.")
    # left — one frontier judge
    e.append(box(44, 168, 300, 300, RED_S, "#fff5f5", sw=2))
    e.append(T("ONE FRONTIER JUDGE", 44, 180, 14, RED_T, "center", 300))
    node(e, 74, 222, 240, 62, "frontier model\nsingle judge", PURP_S, PURP_F, 15, PURP_T)
    e.append(T("$$$  per verdict", 74, 302, 13, RED_S, "center", 240))
    e.append(T("one viewpoint", 74, 326, 13, RED_S, "center", 240))
    e.append(T("human attention still\nthe hard constraint", 74, 352, 12, GREY, "center", 240))
    e.append(T("— Zack Proser, WorkOS · corpus video #761", 44, 442, 11, "#475569", "center", 300))
    # right — redundancy = cheap trust
    e.append(box(376, 168, 550, 300, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("REDUNDANCY = CHEAP TRUST", 376, 180, 14, GREEN_T, "center", 550))
    # pattern A — self-consistency
    e.append(T("① self-consistency — sample many, then vote", 392, 210, 13, GREEN_S))
    node(e, 392, 232, 84, 32, "prompt", ORNG_S, ORNG_F, 11)
    e.append(arr(478, 248, 490, 248, NEU_S))
    node(e, 492, 232, 148, 32, "cheap model × N", PURP_S, PURP_F, 11, PURP_T)
    e.append(arr(642, 248, 654, 248, NEU_S))
    node(e, 656, 232, 128, 32, "majority vote", GREEN_S, GREEN_F, 11, GREEN_T)
    e.append(arr(786, 248, 798, 248, NEU_S))
    node(e, 800, 232, 108, 32, "answer", NEU_S, NEU_F, 11, NEU_T)
    e.append(T("— Aakanksha Chowdhery, Reflection.ai · corpus video #251", 392, 272, 11.5, "#475569"))
    # pattern B — debate panel
    e.append(T("② debate panel — weaker models judge a stronger one", 392, 302, 13, GREEN_S))
    node(e, 392, 324, 108, 32, "weak LLM", PURP_S, "#ede9fe", 11, PURP_T)
    node(e, 508, 324, 108, 32, "weak LLM", PURP_S, "#ede9fe", 11, PURP_T)
    node(e, 624, 324, 108, 32, "weak LLM", PURP_S, "#ede9fe", 11, PURP_T)
    e.append(arr(734, 340, 748, 340, NEU_S))
    node(e, 750, 324, 158, 32, "verdict on strong model", GREEN_S, GREEN_F, 10, GREEN_T)
    e.append(T("they debate each other → a cheap judge that beats a frontier model", 392, 366, 11.5, INK))
    e.append(T("— Leonard Tang, Haize Labs · corpus video #116", 392, 388, 11.5, "#475569"))
    # tension banner (§6.4)
    e.append(box(44, 486, 882, 50, AMBER_S, AMBER_F, sw=1))
    e.append(T("Independence is the catch: one model sampled N× cancels noise, not shared bias —",
               64, 496, 13.5, AMBER_T))
    e.append(T("the voters have to be genuinely independent.", 64, 516, 13.5, AMBER_T))
    save("ch09-fig8-consensus-review.excalidraw", e)


# ───────────── Ch9 · fig9 — heading 7: accountability per widened path ─────────────
def ch09_fig9():
    e = []
    header(e, "CHAPTER 9  ·  THE AI-NATIVE ORGANIZATION",
           "Every Widened Path Names an Owner",
           "Blurred creation, sharpened accountability — assign owners before the path opens.")
    # widen
    node(e, 44, 168, 882, 44, "WIDEN CREATION:   support ships code  ·  product prototypes  ·  domain experts automate",
         PURP_S, PURP_F, 15, PURP_T)
    e.append(arr(485, 214, 485, 236, NEU_S))
    # the gate — name the owner
    e.append(box(44, 240, 882, 150, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("BEFORE IT OPENS — name the owner  (assign, don’t discover)", 44, 252, 14, GREEN_T, "center", 882))
    slots = [
        (64,  "① owns the\nproduction path"),
        (278, "② owns domain\ncorrectness"),
        (492, "③ owns security\nboundaries"),
        (706, "④ decides what\nstays human-gated"),
    ]
    for x, lab in slots:
        node(e, x, 286, 196, 74, lab, GREEN_S, GREEN_F, 13, GREEN_T)
    # outcomes
    e.append(box(44, 406, 430, 50, GREEN_S, GREEN_F, sw=1))
    e.append(T("all four named   →   democratization", 44, 422, 14, GREEN_T, "center", 430))
    e.append(box(496, 406, 430, 50, RED_S, RED_F, sw=1))
    e.append(T("any slot blank   →   accountability gap", 496, 415, 14, RED_T, "center", 430))
    e.append(T("(found after it ships)", 496, 436, 11, RED_S, "center", 430))
    # banner
    e.append(box(44, 474, 882, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Widened creation without an assigned owner is not democratization —",
               64, 484, 14, BLUE_S))
    e.append(T("it is an accountability gap waiting to be discovered.", 64, 503, 14, BLUE_S))
    save("ch09-fig9-accountability-owner.excalidraw", e)


if __name__ == "__main__":
    ch09_fig5()
    ch09_fig6()
    ch09_fig7()
    ch09_fig8()
    ch09_fig9()
