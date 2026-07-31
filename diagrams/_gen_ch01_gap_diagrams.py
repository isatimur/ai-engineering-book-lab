"""Builds the Chapter 1 gap inline figures (fig5–fig8) for the Visual Guide.
Fills the headings that had no figure after the earlier pass was re-checked
against the current chapter text. Helpers + palette copied verbatim from
_gen_gap_diagrams.py; palette + signature mark follow diagrams/STYLE.md."""
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


EYEBROW = "CHAPTER 1  ·  THE SHIFT: FROM ASSISTANT TO DELEGATE"


# ── Ch1 · fig5 — capability is not expertise (heading 3) ──────────────────────
def ch01_fig5():
    e = []
    header(e, EYEBROW, "Capability Is Not Expertise",
           "A stronger model raises the ceiling. It does not supply the missing know-how.")
    # left panel — raw capability (impressive, wrong tool for the job)
    e.append(box(44, 176, 380, 212, AMBER_S, "#fffbeb"))
    e.append(T("RAW CAPABILITY", 44, 190, 15, AMBER_T, "center", 380))
    node(e, 74, 220, 320, 44, "300-IQ mathematician", AMBER_S, AMBER_F, 16, AMBER_T)
    e.append(T("asked to derive the 2025 tax code\nfrom first principles", 44, 278, 13, AMBER_S, "center", 380))
    e.append(box(74, 334, 320, 44, RED_S, RED_F, sw=1))
    e.append(T("brilliant · inconsistent ·\nwrong in ways that pass a glance", 74, 341, 12, RED_T, "center", 320))
    # right panel — supplied expertise (dependable execution)
    e.append(box(498, 176, 380, 212, GREEN_S, "#f0fdf4"))
    e.append(T("SUPPLIED EXPERTISE", 498, 190, 15, GREEN_S, "center", 380))
    node(e, 528, 220, 320, 44, "experienced tax professional", GREEN_S, GREEN_F, 15, GREEN_T)
    e.append(T("asked to apply the known\nprocedure, consistently", 498, 278, 13, GREEN_T, "center", 380))
    e.append(box(528, 334, 320, 44, GREEN_S, "#d1fae5", sw=1))
    e.append(T("dependable · inspectable ·\nrepeatable under review", 528, 341, 12, GREEN_T, "center", 320))
    # bridge
    e.append(T("what you\nactually need", 420, 240, 11, ORNG_S, "center", 82))
    e.append(arr(424, 281, 496, 281, ORNG_S, sw=3))
    # the practical move
    e.append(T("The move — don't wait for capability to grow into expertise:", 44, 404, 14, INK))
    e.append(T("package the missing context, conventions & procedures as reusable skills the agent loads.", 44, 426, 14, TITLE))
    # banner: quote + citation
    e.append(box(44, 462, 834, 58, BLUE_F, "#eff6ff", sw=1))
    e.append(T('"Agents have intelligence and capabilities, but not always expertise that we need for real work."',
               60, 472, 14, BLUE_S))
    e.append(T("— Barry Zhang & Mahesh Murag, Anthropic  ·  corpus video #83", 60, 496, 12, "#475569"))
    # amplifier caption
    e.append(T("Capability amplifies the workflow it runs inside: a strong model makes a good system better, a weak one worse.",
               44, 532, 12, GREY))
    save("ch01-fig5-capability-vs-expertise.excalidraw", e)


# ── Ch1 · fig6 — the two recurring cases (heading 4) ──────────────────────────
def ch01_fig6():
    e = []
    header(e, EYEBROW, "Two Cases, One Pattern",
           "Two composite stories track the same shift across very different work.")
    # left — Software Factory / Meridian
    e.append(box(44, 176, 410, 300, BLUE_S, "#eff6ff"))
    e.append(T("SOFTWARE FACTORY", 44, 190, 17, BLUE_S, "center", 410))
    e.append(T("“Meridian” · mid-size fintech", 44, 214, 13, "#475569", "center", 410))
    e.append(T("payments repo  +  strong coding model", 44, 238, 13, INK, "center", 410))
    e.append(T("magical on small tasks → scope grows → quality erratic", 44, 262, 12, AMBER_T, "center", 410))
    e.append(box(64, 288, 370, 84, BLUE_S, "#dbeafe", sw=1))
    e.append(T("must add:", 78, 296, 11, BLUE_S))
    e.append(T("harnesses · specs · validation\ncontext discipline · eval loops · review surfaces", 78, 314, 13, "#1e3a5f"))
    e.append(box(64, 384, 175, 34, NEU_S, NEU_F, sw=1))
    e.append(T("output: software", 64, 392, 12, NEU_T, "center", 175))
    e.append(box(259, 384, 175, 34, PURP_S, PURP_F, sw=1))
    e.append(T("drives Ch 3 · 4 · 6", 259, 392, 12, PURP_T, "center", 175))
    # right — High-Stakes Colleague / Hargrove
    e.append(box(468, 176, 410, 300, GREEN_S, "#f0fdf4"))
    e.append(T("HIGH-STAKES COLLEAGUE", 468, 190, 17, GREEN_S, "center", 410))
    e.append(T("“Hargrove” · mid-tier tax & advisory firm", 468, 214, 13, "#475569", "center", 410))
    e.append(T("a conversational assistant that summarizes & explains", 468, 238, 12.5, INK, "center", 410))
    e.append(T("helpful chat → asked for real work → fluency isn't enough", 468, 262, 12, AMBER_T, "center", 410))
    e.append(box(488, 288, 370, 84, GREEN_S, "#d1fae5", sw=1))
    e.append(T("must add:", 502, 296, 11, GREEN_S))
    e.append(T("provenance · access boundaries · retrieval\nstaged authority · durable runs · review points", 502, 314, 12, GREEN_T))
    e.append(box(488, 384, 175, 34, NEU_S, NEU_F, sw=1))
    e.append(T("output: judgment", 488, 392, 12, NEU_T, "center", 175))
    e.append(box(683, 384, 175, 34, PURP_S, PURP_F, sw=1))
    e.append(T("drives Ch 5 · 6 · 7", 683, 392, 12, PURP_T, "center", 175))
    # banner
    e.append(box(44, 496, 834, 50, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Both cases, one pattern: the more valuable the delegated work, the more the surrounding system matters.",
               60, 513, 13, BLUE_S))
    save("ch01-fig6-two-recurring-cases.excalidraw", e)


# ── Ch1 · fig7 — make the standard explicit (heading 5) ───────────────────────
def ch01_fig7():
    e = []
    header(e, EYEBROW, "Make the Standard Explicit",
           "A standard has to be made explicit before it can be delegated — or it's violated silently.")
    # left — tacit judgment carried in senior heads
    e.append(box(44, 180, 360, 250, AMBER_S, "#fffbeb"))
    e.append(T("TACIT JUDGMENT", 44, 194, 16, AMBER_T, "center", 360))
    e.append(T("carried in senior heads · never written down", 44, 218, 12, AMBER_S, "center", 360))
    e.append(T("SOFTWARE", 66, 250, 12, AMBER_T))
    e.append(T("local conventions\narchitecture taste\ndependency discipline\nrollback instinct\nperformance habits", 66, 270, 12, INK))
    e.append(T("PROFESSIONAL", 236, 250, 12, AMBER_T))
    e.append(T("source hierarchy\nprovenance awareness\nexception handling\ndomain caution\n“ready to trust?”", 236, 270, 12, INK))
    # gate
    e.append(arr(404, 305, 450, 305, NEU_S))
    e.append(box(452, 268, 150, 74, BLUE_S, "#dbeafe", sw=2))
    e.append(T("made explicit\nbefore\ndelegating?", 452, 279, 14, BLUE_S, "center", 150))
    # YES branch → delegable
    e.append(arr(602, 292, 648, 258, GREEN_S))
    e.append(T("yes", 610, 250, 11, GREEN_S))
    e.append(box(650, 224, 228, 62, GREEN_S, "#d1fae5", sw=2))
    e.append(T("DELEGABLE", 650, 234, 14, GREEN_T, "center", 228))
    e.append(T("survives handoff intact", 650, 256, 12, GREEN_T, "center", 228))
    # NO branch → violated silently
    e.append(arr(602, 320, 648, 356, RED_S))
    e.append(T("no", 610, 344, 11, RED_S))
    e.append(box(650, 348, 228, 62, RED_S, RED_F, sw=2))
    e.append(T("VIOLATED SILENTLY", 650, 358, 14, RED_T, "center", 228))
    e.append(T("the org never externalized it", 650, 380, 12, RED_T, "center", 228))
    # banner
    e.append(box(44, 460, 834, 62, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Cheap generation doesn't retire taste — it promotes it.", 60, 470, 15, BLUE_S))
    e.append(T("The new scarce skill: setting standards, framing tasks, and spotting slop before the system does.", 60, 494, 14, "#1e3a5f"))
    save("ch01-fig7-make-standards-explicit.excalidraw", e)


# ── Ch1 · fig8 — scattered practices → one discipline (heading 6) ─────────────
def ch01_fig8():
    e = []
    header(e, EYEBROW, "Not Subcultures — One Discipline",
           "Scattered practices converge on one question: is the delegated work trustworthy?")
    # left — the practices treated as separate subcultures
    e.append(T("TREATED AS SEPARATE SUBCULTURES", 44, 176, 12, GREY))
    chips = ["prompting", "retrieval", "evals", "workflow engines", "guardrails",
             "tool protocols", "observability", "sandboxing", "policy files", "approval systems"]
    for i, c in enumerate(chips):
        col, row = i // 5, i % 5
        x = 44 + col * 152
        y = 200 + row * 40
        e.append(box(x, y, 144, 30, NEU_S, NEU_F, sw=1))
        e.append(T(c, x, y + 7, 12, NEU_T, "center", 144))
    # converging arrows (fan-in)
    for sy in (215, 295, 375):
        e.append(arr(350, sy, 466, 250, ORNG_S, sw=2))
    # the one discipline
    e.append(box(470, 196, 408, 100, BLUE_S, "#eff6ff", sw=2))
    e.append(T("ONE DISCIPLINE", 470, 208, 14, BLUE_S, "center", 408))
    e.append(T("AI engineering — making delegated\nmachine work trustworthy", 470, 232, 16, "#1e3a5f", "center", 408))
    # the recurring questions (the discipline's spine)
    e.append(T("keeps returning to:", 470, 312, 12, GREEN_S))
    e.append(T("· is the environment legible?\n"
               "· do goals survive handoff?\n"
               "· can we tell it's doing useful work?\n"
               "· right info, right shape, right time?\n"
               "· can work persist, recover, be supervised?\n"
               "· where act freely vs. human decisive?", 470, 332, 12.5, GREEN_T))
    # banner
    e.append(box(44, 462, 834, 50, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Not rival subcultures — pieces of one discipline: making delegated machine work trustworthy.",
               60, 477, 14, BLUE_S))
    save("ch01-fig8-scattered-to-discipline.excalidraw", e)


if __name__ == "__main__":
    ch01_fig5()
    ch01_fig6()
    ch01_fig7()
    ch01_fig8()
