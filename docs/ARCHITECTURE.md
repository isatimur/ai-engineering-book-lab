# Architecture

## Layers

### 1. Source layer
Usually local-first:
- `01_Videos/`
- transcript caches
- source inventories

### 2. Synthesis layer
Turns source notes into reusable knowledge:
- `02_Themes/`
- `03_People/`
- `04_Concepts/`

### 3. Evidence layer
Makes arguments reusable and reviewable:
- `claims/`
- `evidence/`

### 4. Manuscript layer
Turns synthesis into book material:
- `05_Book_Ideas/`
- chapter packets
- drafting layer

### 5. Research-org layer
Tells agents how to operate:
- `programs/`
- `tasks/`
- `research_passes/`

## Design principle
Keep raw corpus mostly stable. Improve the synthesis, evidence, and manuscript layers through bounded, logged agent passes.
