"""Builds the gap inline figures for Chapter 4 — "Evals Are the Control System".
Fills the 7 under-illustrated H2 sections; existing ch04-fig1/2/3 are reused
at their new index positions. Geometry follows templates/inline-figure.excalidraw
(760x460 canvas, 24px title, sig at y=88, caption y=398, citation y=422).
Helper pattern + palette copied from _gen_gap_diagrams.py (STYLE.md §1/§2)."""
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
CITE = "#64748b"
CAP = "#475569"

_s = [940000]
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

def node(e, x, y, w, h, label, s, f, size=15, tcol=None):
    e.append(box(x, y, w, h, s, f))
    lines = label.count("\n") + 1
    ty = int(y + (h - lines * size * 1.25) / 2)
    e.append(T(label, x, ty, size, tcol or s, "center", w))

def header4(e, fignum, title):
    e.append(T(f"CHAPTER 4  ·  FIGURE {fignum}", 40, 30, 13, GREY))
    e.append(T(title, 40, 50, 24, TITLE))
    e.append(ln(40, 88, 150, 88, "#3b82f6", sw=3))   # signature — blue (copilot)
    e.append(ln(150, 88, 260, 88, "#047857", sw=3))  # signature — green (colleague)

def footer4(e, caption, citation=None):
    e.append(T(caption, 40, 398, 13, CAP))
    if citation:
        e.append(T(citation, 40, 422, 12, CITE))

def save(name, els):
    doc = dict(type="excalidraw", version=2, source="https://excalidraw.com", elements=els,
               appState=dict(viewBackgroundColor="#ffffff", gridSize=20), files={})
    json.dump(doc, open(os.path.join(INLINE, name), "w"), ensure_ascii=False, indent=2)
    print("wrote inline/" + name)


# ── fig4 (index 2) · H2 "A failure slice from the factory floor" — admin-override regression ──
def ch04_fig4():
    e = []
    header4(e, 2, "The admin-override regression")
    # the agent's change (purple = AI)
    node(e, 44, 208, 150, 94, "Rate-limit\nrule\n(agent added)", PURP_S, PURP_F, 14, PURP_T)
    # split from rule to the two paths
    e.append(arr(196, 236, 246, 200, NEU_S))
    e.append(arr(196, 274, 246, 320, NEU_S))
    # path A — normal writes: rule is correct
    node(e, 250, 178, 180, 44, "Normal API writes", BLUE_S, BLUE_F, 14)
    e.append(arr(432, 200, 484, 200, NEU_S))
    node(e, 488, 178, 218, 44, "✓ throttled correctly", GREEN_S, GREEN_F, 14, GREEN_T)
    e.append(T("the rule this path needed", 488, 224, 11, GREEN_S, "center", 218))
    # why it slipped (amber = transient/hidden knowledge)
    e.append(box(250, 244, 456, 52, AMBER_S, AMBER_F, sw=1))
    e.append(T("WHY IT SLIPPED", 260, 250, 10, AMBER_S))
    e.append(T("the backfill exception lived only in an old review comment\n"
               "+ the one engineer who remembered that path was special", 260, 264, 11.5, AMBER_T))
    # path B — admin backfill: same rule, wrong here
    node(e, 250, 320, 180, 44, "Admin backfill path", BLUE_S, BLUE_F, 14)
    e.append(arr(432, 342, 484, 342, NEU_S))
    node(e, 488, 320, 218, 44, "✗ same throttle,\nwrong rule", RED_S, RED_F, 13, RED_T)
    e.append(T("backfills stall in production — found 2 days later", 488, 366, 11, RED_S, "center", 218))
    # all gates green (under the rule box, left column)
    e.append(box(44, 320, 190, 62, RED_S, "#fff5f5", sw=1))
    e.append(T("ALL GATES GREEN", 54, 326, 10, RED_T))
    e.append(T("type-checks ✓\nunit tests ✓\nPR “looks fine” ✓", 54, 340, 11.5, RED_T))
    footer4(e, "A rule that was right for one path was wrong for another — and every automated gate still passed.")
    save("ch04-fig4-admin-override-regression.excalidraw", e)


# ── fig5 (index 4) · H4 "Real-world tasks beat synthetic cleverness" — revert & reproduce ──
def ch04_fig5():
    e = []
    header4(e, 4, "Revert, then reproduce")
    e.append(T("THE RECIPE  ·  mine the history of real engineering", 44, 158, 12, GREY))
    steps = [
        ("Crawl real\ncommits", ORNG_S, ORNG_F, ORNG_T, 13),
        ("Find a real\nfix (perf/bug)", BLUE_S, BLUE_F, None, 13),
        ("Revert it →\nbroken state", RED_S, RED_F, RED_T, 13),
        ("Hand agent\nthe broken repo", PURP_S, PURP_F, PURP_T, 12.5),
        ("Score: reached\nknown-good?", GREEN_S, GREEN_F, GREEN_T, 13),
    ]
    xs = [44, 178, 312, 446, 580]
    for i, (lbl, s, f, tc, sz) in enumerate(steps):
        node(e, xs[i], 186, 120, 74, lbl, s, f, sz, tc)
        if i < 4:
            e.append(arr(xs[i] + 120, 223, xs[i] + 134, 223, NEU_S))
    # the standard
    e.append(box(44, 288, 662, 40, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("THE STANDARD", 56, 295, 10, GREEN_S))
    e.append(T("tasks natural  ·  sourced from the real world  ·  reliably gradable", 56, 308, 13, GREEN_T))
    # the two rejected temptations
    e.append(box(44, 338, 322, 44, RED_S, "#fff5f5", sw=1))
    e.append(T("✗ SYNTHETIC CLEVERNESS", 54, 344, 10, RED_T))
    e.append(T("easy to score, unlike real work", 54, 358, 11.5, RED_S))
    e.append(box(378, 338, 328, 44, RED_S, "#fff5f5", sw=1))
    e.append(T("✗ UNSCORED REALISM", 388, 344, 10, RED_T))
    e.append(T("lifelike but can't grade consistently", 388, 358, 11.5, RED_S))
    footer4(e, "Don't invent benchmark toys — revert a real fix and score the return to known-good.",
            "— Naman Jain, Cursor · corpus video #72")
    save("ch04-fig5-revert-and-reproduce.excalidraw", e)


# ── fig6 (index 5) · H5 "Reliability got harder, not easier" — layers of evidence ──
def ch04_fig6():
    e = []
    header4(e, 5, "Self-verification is one layer, not proof")
    e.append(T("amber = machine self-check       green = evidence beyond the machine", 44, 128, 11.5, GREY))
    bands = [
        (150, AMBER_S, AMBER_F, AMBER_T, "1 · Static / type checks — “marks its own homework”",
         "✓ passed — missed it", RED_S, 14),
        (200, AMBER_S, AMBER_F, AMBER_T, "2 · Unit tests",
         "✓ passed — missed it", RED_S, 14),
        (250, GREEN_S, GREEN_F, GREEN_T, "3 · Eval slices + regression sets",
         "✗ caught the regression", GREEN_S, 14),
        (300, GREEN_S, GREEN_F, GREEN_T, "4 · Human review on consequential change",
         "confirms the scope", GREEN_S, 13.5),
    ]
    for y, s, f, tc, lbl, tag, tagc, sz in bands:
        e.append(box(44, y, 470, 42, s, f, sw=2))
        e.append(T(lbl, 58, int(y + 14), sz, tc))
        e.append(T(tag, 524, int(y + 14), 13, tagc))
    e.append(box(44, 354, 662, 32, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Self-verification catches errors a machine can already define — it can't certify the change was correct.",
               56, 362, 13, BLUE_S))
    footer4(e, "More capable models didn't dissolve reliability — the admin-override cleared every machine gate.",
            "— Samuel Colvin, Pydantic · corpus video #184")
    save("ch04-fig6-layers-of-evidence.excalidraw", e)


# ── fig7 (index 6) · H6 "Application-layer evals ..." — weight slices by consequence ──
def ch04_fig7():
    e = []
    header4(e, 6, "Weight slices by consequence")
    # naive — one averaged score
    e.append(box(44, 150, 300, 206, RED_S, "#fff5f5", sw=2))
    e.append(T("ONE AVERAGED SCORE", 44, 162, 13, RED_T, "center", 300))
    e.append(T("92%", 44, 194, 44, RED_T, "center", 300))
    e.append(T("every slice weighted the same", 44, 264, 12, RED_S, "center", 300))
    e.append(T("the rare, costly miss\nvanishes into the mean", 44, 294, 12, RED_S, "center", 300))
    # engineered — weighted by consequence
    e.append(box(376, 150, 330, 206, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("WEIGHTED BY CONSEQUENCE", 376, 162, 13, GREEN_T, "center", 330))
    rows = [
        ("movie-rec miss", 40, GREEN_S, GREEN_F, "low", GREEN_S),
        ("latency 3s → 10s", 95, AMBER_S, AMBER_F, "med", AMBER_S),
        ("contract-clause miss", 130, RED_S, RED_F, "HIGH", RED_S),
    ]
    for i, (lbl, bw, bs, bf, tag, tagc) in enumerate(rows):
        y = 200 + i * 36
        e.append(T(lbl, 388, y, 12, INK))
        e.append(box(540, y + 2, bw, 14, bs, bf, sw=1))
        e.append(T(tag, 540 + bw + 6, y, 11, tagc))
    e.append(T("a rare but expensive failure\noutweighs a common trivial one", 376, 314, 12, GREEN_S, "center", 330))
    footer4(e, "Not one universal score — weight each slice by consequence so the costly rare failure can't hide.",
            "— Ido Pesok, Vercel v0 · corpus video #125")
    save("ch04-fig7-weight-by-consequence.excalidraw", e)


# ── fig8 (index 8) · H8 "Evals are how teams externalize judgment" ──
def ch04_fig8():
    e = []
    header4(e, 8, "Evals externalize judgment")
    e.append(box(44, 158, 286, 132, NEU_S, "#f8fafc", sw=2))
    e.append(T("ASPIRATIONS  (in people's heads)", 44, 168, 12, NEU_T, "center", 286))
    e.append(T("“better answers”\n“cleaner patches”\n“safer behavior”", 60, 196, 14, INK))
    e.append(T("can't compare · can't enforce", 44, 266, 11.5, NEU_T, "center", 286))
    e.append(arr(334, 224, 392, 224, ORNG_S, sw=3))
    e.append(T("written down", 336, 202, 11, ORNG_S))
    e.append(box(396, 158, 310, 132, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("INSPECTABLE STANDARDS", 396, 168, 12, GREEN_T, "center", 310))
    e.append(T("· labeled examples\n· scoring rubrics\n· thresholds\n· review habits", 418, 192, 13, GREEN_T))
    e.append(box(44, 306, 662, 52, BLUE_F, "#eff6ff", sw=1))
    e.append(T("engineer: correctness   ·   PM: completion + delight   ·   cost   ·   support: escalation   ·   security: worst-case",
               56, 314, 12, BLUE_S))
    e.append(T("an eval system doesn't erase these tradeoffs — it makes them discussable.", 56, 334, 13, BLUE_S))
    footer4(e, "A standard that can't survive being written down as examples and thresholds was only a hope.")
    save("ch04-fig8-externalize-judgment.excalidraw", e)


# ── fig9 (index 9) · H9 "The control system is organizational, not only technical" ──
def ch04_fig9():
    e = []
    header4(e, 9, "From one hero to shared infrastructure")
    # hero phase (before)
    e.append(box(44, 158, 262, 196, RED_S, "#fff5f5", sw=2))
    e.append(T("THE HERO PHASE", 44, 168, 13, RED_T, "center", 262))
    e.append(T("one careful engineer\none spreadsheet\none growing pile\nof examples", 60, 198, 13.5, RED_T))
    e.append(T("single point of failure —\n“knows where the\nbodies are buried”", 44, 280, 11.5, RED_S, "center", 262))
    e.append(T("a start, not an end", 44, 334, 12, RED_T, "center", 262))
    e.append(arr(310, 256, 352, 256, ORNG_S, sw=3))
    # institutional (after) — shared object several groups feed
    chips = ["Eng", "Product", "Design", "Ops", "Domain"]
    for i, c in enumerate(chips):
        x = 358 + i * 70
        node(e, x, 158, 68, 30, c, PURP_S, PURP_F, 11, PURP_T)
        e.append(arr(x + 34, 188, 550, 204, PURP_S, sw=1))
    node(e, 460, 206, 180, 56, "EVAL PLATFORM\nshared infrastructure", BLUE_S, BLUE_F, 13)
    e.append(box(360, 278, 346, 74, GREEN_S, "#f0fdf4", sw=1))
    e.append(T("SOMEONE OWNS", 372, 284, 10, GREEN_S))
    e.append(T("· datasets   · failure labels   · slice upkeep\n· judge-vs-expert calls   · the tie to product",
               372, 300, 12, GREEN_T))
    footer4(e, "Evaluation moves from one overworked human to shared infrastructure the whole org argues over.",
            "— Phil Hetzel, Braintrust · corpus video #628")
    save("ch04-fig9-organizational-control.excalidraw", e)


# ── fig10 (index 10) · H10 "Evals are what make delegation trustworthy" ──
def ch04_fig10():
    e = []
    header4(e, 10, "The control system, assembled")
    parts = ["representative tasks", "credible scoring", "production observability",
             "regression sets from failures", "comparison loops", "mistakes → reusable tests"]
    for i, p in enumerate(parts):
        y = 150 + i * 36
        node(e, 44, y, 250, 30, p, BLUE_S, BLUE_F, 12)
        e.append(arr(294, y + 15, 358, 277, BLUE_S, sw=1))
    node(e, 360, 222, 150, 110, "THE\nCONTROL\nSYSTEM", PURP_S, PURP_F, 16, PURP_T)
    e.append(arr(510, 277, 556, 277, GREEN_S, sw=3))
    node(e, 560, 246, 150, 64, "SAFE TO\nTRUST", GREEN_S, GREEN_F, 16, GREEN_T)
    # the rejected default
    e.append(box(560, 150, 150, 44, RED_S, "#fff5f5", sw=1))
    e.append(T("ship on vibes", 560, 160, 13, RED_T, "center", 150))
    e.append(ln(578, 168, 692, 168, RED_S, sw=2))
    e.append(T("✗ the rejected default", 560, 176, 10, RED_S, "center", 150))
    footer4(e, "The question shifts from “is the model impressive?” to “is the system safe to trust?”")
    save("ch04-fig10-control-system.excalidraw", e)


if __name__ == "__main__":
    ch04_fig4()
    ch04_fig5()
    ch04_fig6()
    ch04_fig7()
    ch04_fig8()
    ch04_fig9()
    ch04_fig10()
