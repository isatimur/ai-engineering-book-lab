"""Builds the Chapter 8 gap inline figures (fig6–fig9).
Fills the four H2 headings that no existing ch08 figure covers:
  fig6 · H1  "Realtime exposes whether the rest of the architecture was honest"
  fig7 · H2  "Realtime systems reveal what chat can hide"
  fig8 · H7  "Voice makes the human control plane immediate"
  fig9 · H8  "Embodied edges make the same lesson even harsher"
Palette + signature mark follow diagrams/STYLE.md. Helpers mirror
_gen_gap_diagrams.py exactly."""
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

_s = [8600]
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


EYEBROW = "CHAPTER 8  ·  REALTIME, VOICE & THE COST OF BEING INTERRUPTIBLE"


# ─────────────── Ch8 · fig6 — voice is a systems stress test (H1) ───────────────
def ch08_fig6():
    e = []
    header(e, EYEBROW,
           "Voice Is a Systems Stress Test",
           "Chat hides a weak layer. Voice makes each one audible.")
    # column headers
    e.append(T("LAYER", 44, 184, 12, GREY))
    e.append(T("WEAK LAYER  →  WHAT THE CALLER HEARS", 310, 184, 12, GREY))
    rows = [
        ("Context — Ch 5", "the thread isn't held", "the agent fumbles, loses the thread"),
        ("Runtime — Ch 6", "it can't pause / resume", "interruptions break it"),
        ("Security — Ch 7", "authority stays ambient", "approvals go casual, scope leaks"),
        ("Control plane — Ch 6", "it's under-designed", "the user rescues every turn"),
        ("Tool layer", "slow · high-variance", "sounds incompetent, whatever the model"),
    ]
    y0, rh = 206, 54
    for i, (layer, weak, heard) in enumerate(rows):
        y = y0 + i * rh
        node(e, 44, y, 230, 44, layer, BLUE_S, BLUE_F, 14)
        e.append(arr(276, y + 22, 306, y + 22, NEU_S))
        e.append(box(310, y, 616, 44, RED_S, "#fff5f5", sw=2))
        e.append(T(weak, 326, y + 13, 14, RED_S))
        e.append(T("→", 560, y + 12, 16, NEU_S))
        e.append(T(heard, 590, y + 13, 14, RED_T))
    # banner
    by = y0 + len(rows) * rh + 10
    e.append(box(44, by, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("If the loop around the model is weak, voice is where you hear it first.",
               64, by + 15, 16, BLUE_S))
    e.append(T("— tool-call bottleneck: Neil Zeghidour, Gradium AI  ·  corpus video #662",
               44, by + 60, 12, "#475569"))
    save("ch08-fig6-realtime-stress-test.excalidraw", e)


# ─────────────── Ch8 · fig7 — three ways a live conversation breaks (H2) ───────────────
def ch08_fig7():
    e = []
    header(e, EYEBROW,
           "Three Ways a Live Conversation Breaks",
           "The test isn't eloquence. It's timing, overlap, and interruption.")
    cards = [
        dict(x=44,  n="1 · TIMING", head="it waits too long",
             brk="silence past the ~200 ms budget",
             like="sounds like:  a frozen line"),
        dict(x=344, n="2 · OVERLAP", head="it talks over you",
             brk="half-duplex — listen OR speak",
             like="sounds like:  no room to cut in"),
        dict(x=644, n="3 · INTERRUPTION", head="it loses the thread",
             brk="no clean way to redirect",
             like="sounds like:  the old question"),
    ]
    w, h, y = 282, 208, 180
    for c in cards:
        x = c["x"]
        e.append(box(x, y, w, h, RED_S, "#fff5f5", sw=2))
        e.append(T(c["n"], x + 18, y + 16, 17, RED_T))
        e.append(ln(x + 18, y + 46, x + w - 18, y + 46, "#fca5a5", sw=1))
        e.append(T("THE BREAK", x + 18, y + 58, 11, RED_S))
        e.append(T(c["head"], x + 18, y + 76, 14, INK, w=w - 36))
        e.append(box(x + 18, y + 118, w - 36, 40, DARK_S, DARK_F, sw=1))
        e.append(T(c["brk"], x + 28, y + 130, 11.5, "#fca5a5", w=w - 52))
        e.append(T(c["like"], x + 18, y + 172, 12, RED_S, w=w - 36))
    # banner
    by = y + h + 20
    e.append(box(44, by, 882, 50, BLUE_F, "#eff6ff", sw=1))
    e.append(T("A model can be perfectly articulate and still fail all three. Eloquence is not the test.",
               64, by + 16, 16, BLUE_S))
    e.append(T("— after Neil Zeghidour, Gradium AI  ·  corpus video #662",
               44, by + 64, 12, "#475569"))
    save("ch08-fig7-three-failure-modes.excalidraw", e)


# ─────────────── Ch8 · fig8 — the false-confidence trap (H7) ───────────────
def ch08_fig8():
    e = []
    header(e, EYEBROW,
           "The False-Confidence Trap",
           "The warmer the voice, the cheaper approval feels — right where it should cost more.")
    # LEFT panel — the trap (confirmation falls as warmth rises)
    lx, ly, lw, lh = 44, 178, 420, 252
    e.append(box(lx, ly, lw, lh, RED_S, "#fff5f5", sw=2))
    e.append(T("THE TRAP  ·  what the medium coaxes", lx + 16, ly + 12, 14, RED_T))
    # axes
    e.append(ln(lx + 70, ly + 60, lx + 70, ly + 210, NEU_S, sw=1))
    e.append(ln(lx + 70, ly + 210, lx + lw - 24, ly + 210, NEU_S, sw=1))
    e.append(T("felt need\nto confirm", lx + 12, ly + 66, 11, GREY))
    e.append(T("interface warmth →", lx + 150, ly + 218, 12, GREY))
    # downward trend
    e.append(arr(lx + 82, ly + 74, lx + lw - 30, ly + 196, RED_S, sw=3))
    e.append(T("users reveal more,\napprove more casually", lx + 150, ly + 96, 12, RED_S))
    # RIGHT panel — the rule (confirmation rises with consequence)
    rx, ry, rw, rh = 506, 178, 420, 252
    e.append(box(rx, ry, rw, rh, GREEN_S, "#f0fdf4", sw=2))
    e.append(T("THE RULE  ·  invert the intuition", rx + 16, ry + 12, 14, GREEN_T))
    e.append(ln(rx + 70, ry + 60, rx + 70, ry + 210, NEU_S, sw=1))
    e.append(ln(rx + 70, ry + 210, rx + rw - 24, ry + 210, NEU_S, sw=1))
    e.append(T("confirmation\nrigor", rx + 12, ry + 66, 11, GREY))
    e.append(T("consequence →", rx + 180, ry + 218, 12, GREY))
    e.append(arr(rx + 82, ry + 196, rx + rw - 30, ry + 74, GREEN_S, sw=3))
    e.append(T("the more consequential\nthe more deliberate", rx + 96, ry + 150, 12, GREEN_S))
    # transition
    e.append(arr(468, 304, 502, 304, ORNG_S, sw=3))
    e.append(T("invert", 462, 280, 12, ORNG_S))
    # banner (chapter line 72 — book voice, no corpus quote)
    by = 450
    e.append(box(44, by, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("A friendly voice does not make overscoped authority less dangerous.",
               64, by + 15, 16, BLUE_S))
    save("ch08-fig8-false-confidence-trap.excalidraw", e)


# ─────────────── Ch8 · fig9 — the forgiveness gradient (H8) ───────────────
def ch08_fig9():
    e = []
    header(e, EYEBROW,
           "The Forgiveness Gradient",
           "Each modality removes a hiding place. Text flatters; embodiment can't.")
    tiers = [
        dict(x=44,  name="TEXT", s=GREEN_S, f="#d1fae5", t=GREEN_T,
             a="hides latency behind a cursor",
             b="tolerates awkward pauses",
             c="user silently repairs the gaps"),
        dict(x=344, name="VOICE", s=AMBER_S, f=AMBER_F, t=AMBER_T,
             a="timing itself is audible",
             b="silence reads as incompetence",
             c="every interjection is a barge-in"),
        dict(x=644, name="EMBODIED", s=RED_S, f=RED_F, t=RED_T,
             a="delay becomes visible",
             b="state mismatch is dangerous",
             c="recovery matters more than words"),
    ]
    w, h, y = 282, 196, 178
    for tr in tiers:
        x = tr["x"]
        e.append(box(x, y, w, h, tr["s"], tr["f"], sw=2))
        e.append(T(tr["name"], x, y + 18, 22, tr["t"], "center", w))
        e.append(ln(x + 20, y + 58, x + w - 20, y + 58, tr["s"], sw=1))
        for j, key in enumerate(("a", "b", "c")):
            e.append(T("·  " + tr[key], x + 20, y + 74 + j * 34, 13, INK, w=w - 32))
    # gradient arrow underneath
    gy = y + h + 22
    e.append(arr(44, gy, 926, gy, NEU_S, sw=3))
    e.append(T("MORE FORGIVING", 44, gy + 10, 12, GREEN_S))
    e.append(T("what the system can hide  →  shrinks to nothing", 300, gy + 10, 12, GREY))
    e.append(T("LESS FORGIVING", 800, gy + 10, 12, RED_S))
    # banner (chapter close — book voice, no corpus quote)
    by = gy + 40
    e.append(box(44, by, 882, 46, BLUE_F, "#eff6ff", sw=1))
    e.append(T("Autonomy is a property of the whole scaffolding, not the model. Text just lets you pretend longer.",
               64, by + 16, 14, BLUE_S))
    save("ch08-fig9-forgiveness-gradient.excalidraw", e)


if __name__ == "__main__":
    ch08_fig6()
    ch08_fig7()
    ch08_fig8()
    ch08_fig9()
