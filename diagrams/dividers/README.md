# Act Dividers

## Overview

The book has four acts. Each act opens with a divider page. `_gen_dividers.py`
draws all four as Excalidraw files in this directory:

- `act-1-problem.excalidraw`
- `act-2-scaffolding-stack.excalidraw`
- `act-3-stress-test.excalidraw`
- `act-4-widening.excalidraw`

Each divider shows the act header, a stamp with the act numeral, the act's
chapter list, a throughline banner, and an arc strip of the four acts with the
current act filled in.

## Interface

`_gen_dividers.py` is a script with no functions meant for import.

- `python3 diagrams/dividers/_gen_dividers.py` writes the four files and
  prints `wrote <name>` for each.
- `ACTS`: one dict per act, with keys `n`, `roman`, `name`, `chs`, `count`,
  `role`, `chapters`, `through`, `stroke`, `light`, `text`.
- `NODE_COLOR`, `NODE_LABEL`: the colour and label of each node in the arc
  strip.
- `build(act) -> list`: the Excalidraw elements for one act.
- Element helpers: `base`, `text`, `line`, `arrow`, `rect`, `ellipse`, `sid`.

## Invariants

- The output filename comes from `ACTS[*]["name"]`: lowercase, `"the "`
  removed, spaces turned into `-`. Renaming an act writes a new file and
  leaves the old one in place.
- Element ids and seeds come from the counter `_seed`, which starts at 1000.
  Every element has `updated=1`. A rerun with unchanged `ACTS` writes the same
  files.
- The arc strip has four fixed node positions (`cx = [236, 436, 636, 836]`).
  `ACTS` must hold exactly acts 1 to 4 to match `NODE_COLOR` and `NODE_LABEL`.

## Side Effects

- The script has no `if __name__ == "__main__":` guard. Running it, or
  importing it, overwrites the four `act-*.excalidraw` files in this
  directory.
- It writes with `open(path, "w")` and no `encoding=`, while
  `json.dump(..., ensure_ascii=False)` keeps non-ASCII characters such as `—`
  and `·`. The output depends on the platform's default encoding.

## Verification

- No test in `scripts/` covers this generator, and `ruff` does not lint it.
- Nearest gate: `python3 scripts/check_diagram_sync.py` (runs in
  `.github/workflows/diagrams-check.yml`). Its `SECTIONS` include
  `"dividers"`. It checks that each manifest source has a `.png` and that the
  `.png` was committed after its source. It does not run or check the
  generator.
- Its test suite: `python3 scripts/test_check_diagram_sync.py`
