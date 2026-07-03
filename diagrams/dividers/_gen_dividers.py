import json, os

OUT = os.path.dirname(os.path.abspath(__file__))

ACTS = [
    dict(n=1, roman="I", name="The Problem", chs="CHAPTERS 1–2", count="2 chapters",
         role="Define the real shift —\nand the enduring human role.",
         chapters=["Ch 1 · The Shift: From Assistant to Delegate",
                   "Ch 2 · Taste Still Matters When Code Gets Cheap"],
         through="Models create possibility",
         stroke="#c2410c", light="#fed7aa", text="#7c2d12"),
    dict(n=2, roman="II", name="The Scaffolding Stack", chs="CHAPTERS 3–7", count="5 chapters",
         role="The technical systems that make\ndelegated machine work dependable.",
         chapters=["Ch 3 · Harnesses, Specs & Codebases Agents Can Use",
                   "Ch 4 · Evals Are the Control System",
                   "Ch 5 · Context Is Infrastructure",
                   "Ch 6 · Runtimes, State & the Human Control Plane",
                   "Ch 7 · Security, Identity & High-Stakes Trust"],
         through="Scaffolding creates trust",
         stroke="#1e40af", light="#93c5fd", text="#1e3a5f"),
    dict(n=3, roman="III", name="The Stress Test", chs="CHAPTER 8", count="1 chapter",
         role="Push the framework\nto its hardest edges.",
         chapters=["Ch 8 · Realtime, Voice, and the Cost of Being Interruptible"],
         through="Stress-test the theory under harsh constraints",
         stroke="#b45309", light="#fde68a", text="#92400e"),
    dict(n=4, roman="IV", name="The Widening", chs="CHAPTERS 9–10", count="2 chapters",
         role="From systems design to organizations\nand durable truths.",
         chapters=["Ch 9 · The AI-Native Organization",
                   "Ch 10 · What Endures"],
         through="Organizations decide whether trust compounds",
         stroke="#047857", light="#a7f3d0", text="#065f46"),
]

NODE_COLOR = {1: "#c2410c", 2: "#2563eb", 3: "#b45309", 4: "#047857"}
NODE_LABEL = {1: "I · Problem", 2: "II · Scaffolding", 3: "III · Stress Test", 4: "IV · Widening"}

_seed = [1000]
def sid():
    _seed[0] += 1
    return _seed[0]

def base(t, x, y, w, h, **kw):
    e = dict(id=f"e{sid()}", type=t, x=x, y=y, width=w, height=h, angle=0,
             strokeColor=kw.get("stroke", "#1e293b"), backgroundColor=kw.get("bg", "transparent"),
             fillStyle="solid", strokeWidth=kw.get("sw", 2), strokeStyle=kw.get("ss", "solid"),
             roughness=0, opacity=100, groupIds=[], frameId=None,
             roundness=kw.get("round", None), seed=sid(), version=1, versionNonce=sid(),
             isDeleted=False, boundElements=[], updated=1, link=None, locked=False)
    return e

def text(s, x, y, size, color, align="left", w=None, font=3):
    lines = s.split("\n")
    width = w if w else int(max(len(l) for l in lines) * size * 0.62)
    h = int(len(lines) * size * 1.25)
    e = base("text", x, y, width, h, stroke=color)
    e.update(fontSize=size, fontFamily=font, text=s, originalText=s,
             textAlign=align, verticalAlign="top", baseline=int(size * 0.8), lineHeight=1.25, containerId=None)
    return e

def line(x1, y1, x2, y2, color, sw=2):
    e = base("line", x1, y1, abs(x2 - x1), abs(y2 - y1), stroke=color, sw=sw)
    e.update(points=[[0, 0], [x2 - x1, y2 - y1]], lastCommittedPoint=None,
             startBinding=None, endBinding=None, startArrowhead=None, endArrowhead=None)
    return e

def arrow(x1, y1, x2, y2, color, sw=1.5):
    e = base("arrow", x1, y1, abs(x2 - x1), abs(y2 - y1), stroke=color, sw=sw)
    e.update(points=[[0, 0], [x2 - x1, y2 - y1]], lastCommittedPoint=None,
             startBinding=None, endBinding=None, startArrowhead=None, endArrowhead="arrow")
    return e

def rect(x, y, w, h, stroke, bg, sw=2, rnd=True):
    return base("rectangle", x, y, w, h, stroke=stroke, bg=bg, sw=sw,
                round={"type": 3} if rnd else None)

def ellipse(x, y, d, stroke, bg):
    return base("ellipse", x, y, d, d, stroke=stroke, bg=bg)

def build(act):
    els = []
    sc, lt, tx = act["stroke"], act["light"], act["text"]

    # ---- header (left column) ----
    els.append(text(f"ACT {act['roman']}  —  OF FOUR", 64, 50, 15, sc))
    els.append(text(act["name"], 62, 74, 46, sc))
    # signature mark: blue -> green
    els.append(line(66, 142, 176, 142, "#2563eb", sw=3))
    els.append(line(182, 142, 292, 142, "#047857", sw=3))
    els.append(text(act["role"], 64, 162, 17, "#475569"))

    # ---- right stamp ----
    els.append(rect(706, 60, 232, 232, sc, lt, sw=2, rnd=True))
    els.append(text(act["roman"], 706, 96, 120, sc, align="center", w=232))
    els.append(text(act["chs"], 706, 236, 16, sc, align="center", w=232))
    els.append(text(act["count"], 706, 262, 13, "#64748b", align="center", w=232))

    # ---- chapter list ----
    y = 244
    for ch in act["chapters"]:
        els.append(ellipse(66, y + 4, 11, sc, sc))
        els.append(text(ch, 90, y, 16, "#1e293b", w=600))
        y += 40

    # ---- throughline callout (consistent banner across all four) ----
    thru = f"→  {act['through']}"
    tw = int(len(thru) * 18 * 0.62)
    els.append(rect(58, 446, tw + 36, 44, lt, lt, sw=1, rnd=True))
    els.append(text(thru, 76, 458, 18, tx))

    # ---- arc progress strip ----
    els.append(text("THE ARC", 64, 556, 13, "#64748b"))
    cx = [236, 436, 636, 836]
    yc = 590
    r = 24
    # faint track behind
    els.append(line(cx[0], yc, cx[-1], yc, "#e2e8f0", sw=2))
    # arrows between nodes
    for i in range(3):
        els.append(arrow(cx[i] + r + 4, yc, cx[i + 1] - r - 4, yc, "#94a3b8", sw=1.5))
    for i in range(4):
        k = i + 1
        cur = (k == act["n"])
        ncol = NODE_COLOR[k]
        els.append(ellipse(cx[i] - r, yc - r, 2 * r,
                           ncol if cur else "#cbd5e1",
                           ncol if cur else "#f8fafc"))
        roman = {1: "I", 2: "II", 3: "III", 4: "IV"}[k]
        els.append(text(roman, cx[i] - r, yc - 11, 18,
                        "#ffffff" if cur else "#94a3b8", align="center", w=2 * r))
        lab = NODE_LABEL[k]
        els.append(text(lab, cx[i] - 80, yc + r + 8, 12,
                        "#334155" if cur else "#9aa3b2", align="center", w=160))
    return els

for act in ACTS:
    doc = dict(type="excalidraw", version=2, source="https://excalidraw.com",
               elements=build(act),
               appState=dict(viewBackgroundColor="#ffffff", gridSize=None), files={})
    name = f"act-{act['n']}-{act['name'].lower().replace('the ', '').strip().replace(' ', '-')}.excalidraw"
    path = os.path.join(OUT, name)
    json.dump(doc, open(path, "w"), ensure_ascii=False, indent=2)
    print("wrote", name)
