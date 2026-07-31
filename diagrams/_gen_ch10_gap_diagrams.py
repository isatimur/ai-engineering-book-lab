"""Builds the conservative gap inline figure(s) for Chapter 10 — "What Endures".

Chapter 10 is deliberate principle-level synthesis, already thinned for
redundancy, with a protected final line. It should end up LESS densely
illustrated than other chapters — that is correct, not a shortfall.

Only ONE heading in the chapter has a genuinely distinct, concrete pattern
that is not already carried by an existing figure and that can be placed
correctly under the site's positional figure-insertion mechanism (the Nth
`## ` heading receives the Nth index-sorted figure; figures fill the first N
headings contiguously — see website ChapterArticle.tsx):

  H3 · "Delegation only becomes real when the environment carries part of
        the thinking"  ->  NEW  ch10-fig4-situated-intelligence

Palette + signature mark follow diagrams/STYLE.md. Pattern mirrors
_gen_gap_diagrams.py exactly (shared constructors, hand-specified layout)."""
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


# ───────────────────── Ch10 · fig4 — intelligence has to be situated ─────────────────────
def ch10_fig4():
    e = []
    header(e, "CHAPTER 10  ·  WHAT ENDURES",
           "Intelligence Has to Be Situated",
           "A model can be brilliant in isolation and still fail as a worker. The environment carries part of the thinking.")

    # ── LEFT panel — the model alone (naive / red) ──
    lx, lw = 44, 400
    e.append(box(lx, 172, lw, 264, RED_S, "#fff5f5", sw=2))
    e.append(T("MODEL ALONE  ·  no prepared environment", lx, 186, 14, RED_T, "center", lw))
    # the model, floating in empty space
    e.append(box(lx + 110, 236, 180, 60, PURP_S, PURP_F))
    e.append(T("the model", lx + 110, 256, 17, PURP_T, "center", 180))
    e.append(T("brilliant in isolation", lx, 306, 12, GREY, "center", lw))
    # the absences that make it fail as a worker
    e.append(T("✗ no repo    ✗ no specs    ✗ no validations\n✗ no memory    ✗ no runtime    ✗ no review",
               lx, 344, 12, RED_S, "center", lw))
    e.append(T("→ eloquent answer, unreliable worker", lx, 400, 13, RED_T, "center", lw))

    # ── transition (orange) ──
    e.append(arr(450, 300, 480, 300, ORNG_S, sw=3))
    e.append(T("situate\nit", 444, 262, 12, ORNG_S, "center", 44))

    # ── RIGHT panel — the model + prepared environment (engineered / green) ──
    rx, rw = 486, 440
    e.append(box(rx, 172, rw, 264, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("MODEL + PREPARED ENVIRONMENT", rx, 186, 14, GREEN_T, "center", rw))
    # the same model, now embedded
    e.append(box(rx + 150, 214, 140, 44, PURP_S, PURP_F))
    e.append(T("the model", rx + 150, 226, 15, PURP_T, "center", 140))
    e.append(T("the environment carries part of the thinking  ↓", rx, 266, 11, GREEN_S, "center", rw))
    # 8 environment affordances (the concrete list from the chapter)
    chips = ["prepared repo", "specs", "validations", "retrieval",
             "memory", "runtime", "permissions", "review"]
    cw, ch, gap = 98, 30, 8
    x0 = rx + 14
    for i, c in enumerate(chips):
        col, row = i % 4, i // 4
        cx = x0 + col * (cw + gap)
        cy = 286 + row * (ch + 8)
        e.append(box(cx, cy, cw, ch, GREEN_S, GREEN_F, sw=1))
        e.append(T(c, cx, cy + 7, 11, GREEN_T, "center", cw))
    e.append(T("→ intelligence becomes situated → dependable work", rx, 404, 13, GREEN_T, "center", rw))

    # ── quote banner (blue) ──
    by = 456
    e.append(box(44, by, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T('"Instead of micromanaging, I\'m scaffolding and providing context."  — Eric Hou, Augment Code  ·  corpus video #190',
               64, by + 14, 15, BLUE_S))
    # ── design line (grey) ──
    e.append(T("What endures is not prompt cleverness but environment design — weak environments are now punished faster.",
               44, 512, 13, GREY))

    save("ch10-fig4-situated-intelligence.excalidraw", e)


if __name__ == "__main__":
    ch10_fig4()
