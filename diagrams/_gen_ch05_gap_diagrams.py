"""Builds the missing Chapter 5 inline gap figures (fig6–fig9).

Chapter 5 has 9 H2 headings; five figures already exist (fig1–fig5). This
script adds the four figures needed to give every heading a figure:

  fig6  →  heading 3  · "The High-Stakes Colleague needs more than access"
  fig7  →  heading 6  · "Memory is not the same thing as a long prompt"
  fig8  →  heading 8  · "Context quality is measured downstream"
  fig9  →  heading 9  · "Context is what makes intelligence situated"

DSL, palette and signature mark follow diagrams/STYLE.md and reuse the exact
constructors from _gen_gap_diagrams.py. Every figure carries the signature
mark (§2). Only quantified corpus claims are cited (§4/§6); the Hargrove scene,
the acceptance test and the amplification rule are book framing and carry no
fabricated corpus number.
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
CITE = "#475569"

EY = "CHAPTER 5  ·  CONTEXT IS INFRASTRUCTURE"

_s = [9600]
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

def save(name, els):
    doc = dict(type="excalidraw", version=2, source="https://excalidraw.com", elements=els,
               appState=dict(viewBackgroundColor="#ffffff", gridSize=None), files={})
    json.dump(doc, open(os.path.join(INLINE, name), "w"), ensure_ascii=False, indent=2)
    print("wrote inline/" + name)


# ─────────── fig6 · heading 3 — the misranked matter note (Hargrove scene) ───────────
def ch05_fig6():
    e = []
    header(e, EY, "The Misranked Matter Note",
           "The fluent answer cited a public explainer. The governing answer sat in a note nothing told it to prefer.")
    # left — the mechanism
    e.append(box(44, 180, 300, 66, ORNG_S, ORNG_F))
    e.append(T("REQUEST", 44, 190, 12, ORNG_S, "center", 300))
    e.append(T("“trace the support for this\nclient's long-standing deduction”", 44, 208, 13, ORNG_T, "center", 300))
    e.append(arr(194, 246, 194, 270, NEU_S))
    e.append(box(44, 272, 300, 74, BLUE_S, BLUE_F))
    e.append(T("FLAT SIMILARITY RANKING", 44, 284, 13, BLUE_S, "center", 300))
    e.append(T("ranks on wording overlap alone —\nno source type · no matter scope", 44, 304, 12, "#1e3a5f", "center", 300))
    e.append(arr(344, 309, 398, 309, NEU_S))

    # right — the two candidates, ranked (red on top = misranked, green below = governing)
    e.append(box(402, 180, 478, 118, RED_S, RED_F))
    e.append(T("①  RANKED FIRST   ·   looks decisive", 414, 190, 13, RED_T))
    e.append(T("Public explainer   (public web article)", 414, 216, 15, INK))
    e.append(T("wording ≈ matches the query almost perfectly", 414, 244, 12, RED_S))
    e.append(T("✗  wrong jurisdiction · not written for this client", 414, 268, 12, RED_S))

    e.append(T("▲  ranking inverted — the governing note is buried below", 402, 304, 12, RED_S, "center", 478))

    e.append(box(402, 328, 478, 118, GREEN_S, GREEN_F))
    e.append(T("②  RANKED BELOW   ·   nothing marked it authoritative", 414, 338, 13, GREEN_T))
    e.append(T("Matter note — senior attorney", 414, 364, 15, GREEN_T))
    e.append(T("the governing position · this client · this jurisdiction", 414, 392, 12, GREEN_S))
    e.append(T("✓  governing — the system had no way to prefer it", 414, 416, 12, GREEN_S))

    # fix banner
    e.append(box(44, 470, 836, 66, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("FIX — type the knowledge topology", 60, 480, 14, GREEN_T))
    e.append(T("source typing (internal precedent > public background)  ·  access boundaries per matter  ·  provenance on every answer",
               60, 504, 13, GREEN_S))
    # punchline
    e.append(box(44, 548, 836, 44, BLUE_F, "#eff6ff", sw=1))
    e.append(T("The remedy is not a smarter model — it's a topology the retrieval can rank by.", 60, 561, 16, BLUE_S))
    # scene note (book case, not a corpus quote)
    e.append(T("— Chapter 5, rendered scene: Hargrove's misranked matter note  (book case, not a corpus quote)",
               44, 604, 12, CITE))
    save("ch05-fig6-misranked-matter-note.excalidraw", e)


# ─────────── fig7 · heading 6 — 90% of the cost is input ───────────
def ch05_fig7():
    e = []
    header(e, EY, "90% of the Cost Is Input",
           "The bill is dominated by what you feed the model, not by what it writes back.")
    # stacked token-cost bar
    e.append(box(44, 190, 748, 72, AMBER_S, AMBER_F))
    e.append(T("INPUT   ·   90%", 44, 206, 20, AMBER_T, "center", 748))
    e.append(T("files · search results · context you send in", 44, 238, 12, AMBER_S, "center", 748))
    e.append(box(792, 190, 88, 72, GREEN_S, GREEN_F))
    e.append(T("OUTPUT", 792, 208, 11, GREEN_T, "center", 88))
    e.append(T("10%", 792, 226, 16, GREEN_T, "center", 88))
    e.append(T("token spend per turn — the two are not the same size", 44, 270, 11, GREY))

    # evidence card — indexing vs pasting whole files
    e.append(box(44, 300, 520, 118, DARK_S, DARK_F, sw=1))
    e.append(T("index a codebase, retrieve only the relevant slices:", 60, 314, 12.5, "#e2e8f0"))
    e.append(T("  paste whole files          input = 100%", 60, 340, 12.5, "#fca5a5"))
    e.append(T("  index + retrieve slices    input =   6%   (−94%)", 60, 362, 12.5, "#86efac"))
    e.append(T("  best case · one repo · smart agents already save some", 60, 388, 11.5, "#94a3b8"))

    # the cheaper-model lever (smaller than it looks)
    e.append(box(584, 300, 296, 118, NEU_S, "#f8fafc", sw=1))
    e.append(T("“Just use a cheaper model”?", 598, 312, 13, INK))
    e.append(T("Model      ≈ 30% of the bill.", 598, 338, 13, NEU_T))
    e.append(T("What you feed it ≈ 70%.", 598, 360, 13, NEU_T))
    e.append(T("→ model choice is the smaller lever", 598, 388, 12, RED_S))

    # citation + caveat
    e.append(T("“90% of your AI cost is input … only 10% is output.”  — Rajkumar Sakthivel, Tesco · corpus video #792",
               44, 434, 13, CITE))
    e.append(T("exact split varies by workload (output-heavy tasks invert it); the direction is robust.", 44, 458, 11, GREY))
    # punchline
    e.append(box(44, 498, 836, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Fix what you feed the model before you optimize which model.", 60, 513, 17, BLUE_S))
    save("ch05-fig7-cost-is-mostly-input.excalidraw", e)


# ─────────── fig8 · heading 8 — context quality is measured downstream ───────────
def ch05_fig8():
    e = []
    header(e, EY, "Context Quality Is Measured Downstream",
           "A clever retrieval trace proves nothing. Only the work improving does.")
    # left — the acceptance test
    e.append(box(44, 176, 420, 300, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("THE ACCEPTANCE TEST", 60, 188, 14, GREEN_T))
    e.append(T("any context change must make the system…", 60, 212, 12, GREEN_S))
    items = [
        "✓  complete real tasks more accurately",
        "✓  cite better evidence",
        "✓  reduce review burden",
        "✓  waste fewer tokens for the same result",
        "✓  feel trustworthy, not more theatrical",
    ]
    for i, it in enumerate(items):
        e.append(T(it, 60, 244 + i * 44, 14, GREEN_T))

    # right — score the two stages separately
    e.append(T("SCORE THE TWO STAGES SEPARATELY", 490, 188, 13, TITLE))
    e.append(box(490, 214, 390, 70, BLUE_S, BLUE_F, sw=1))
    e.append(T("①  RETRIEVAL  —  recall on the context layer", 504, 226, 13, BLUE_S))
    e.append(T("did the governing passage reach the\nassembled working set at all?", 504, 246, 12, "#1e3a5f"))
    e.append(arr(685, 286, 685, 300, NEU_S))
    e.append(box(490, 302, 390, 62, PURP_S, PURP_F, sw=1))
    e.append(T("②  GENERATION", 504, 312, 13, PURP_T))
    e.append(T("did the model then use it correctly?", 504, 334, 12, PURP_S))
    e.append(box(490, 382, 390, 84, RED_S, RED_F, sw=1))
    e.append(T("Score only the final answer and a", 504, 392, 12, RED_T))
    e.append(T("context-assembly bug looks exactly like", 504, 412, 12, RED_T))
    e.append(T("the model getting dumber — the upgrade", 504, 432, 12, RED_T))
    e.append(T("gets wasted on a retrieval problem.", 504, 452, 12, RED_T))

    # punchline
    e.append(box(44, 498, 836, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Evals tell you if the architecture helps; observability tells you where assembly failed.", 60, 513, 16, BLUE_S))
    e.append(T("— Chapter 5, paired with Chapter 4 (evals + observability); book framing, not a single corpus quote",
               44, 560, 12, CITE))
    save("ch05-fig8-acceptance-test.excalidraw", e)


# ─────────── fig9 · heading 9 — a better model amplifies both ───────────
def ch05_fig9():
    e = []
    header(e, EY, "A Better Model Amplifies Both",
           "Capability raises the return on good context and the cost of bad context.")
    # model node
    e.append(box(52, 286, 170, 96, PURP_S, PURP_F))
    e.append(T("STRONGER", 52, 308, 17, PURP_T, "center", 170))
    e.append(T("MODEL", 52, 330, 17, PURP_T, "center", 170))
    e.append(T("capability ↑", 52, 356, 12, PURP_S, "center", 170))
    # diverging, thickening arrows = amplification
    e.append(arr(222, 320, 358, 246, GREEN_S, sw=4))
    e.append(arr(222, 350, 358, 424, RED_S, sw=4))

    # good context → return up
    e.append(box(360, 196, 500, 104, GREEN_S, GREEN_F))
    e.append(T("GOOD context   →   RETURN ↑", 376, 210, 16, GREEN_T))
    e.append(T("does more with the right evidence, tools and state", 376, 240, 13, GREEN_S))
    e.append(T("the payoff of precise assembly grows", 376, 266, 12, GREEN_S))
    # bad context → cost up
    e.append(box(360, 372, 500, 104, RED_S, RED_F))
    e.append(T("BAD context   →   COST ↑", 376, 386, 16, RED_T))
    e.append(T("generates more persuasive nonsense, faster", 376, 416, 13, RED_S))
    e.append(T("the penalty of sloppy assembly grows too", 376, 442, 12, RED_S))

    # punchline
    e.append(box(44, 498, 816, 48, BLUE_F, "#eff6ff", sw=1))
    e.append(T("A better model is a reason to invest MORE in context, not less.", 60, 513, 17, BLUE_S))
    e.append(T("— Chapter 5, the amplification rule (book framing; no single corpus source)", 44, 560, 12, CITE))
    save("ch05-fig9-amplification-rule.excalidraw", e)


if __name__ == "__main__":
    ch05_fig6()
    ch05_fig7()
    ch05_fig8()
    ch05_fig9()
