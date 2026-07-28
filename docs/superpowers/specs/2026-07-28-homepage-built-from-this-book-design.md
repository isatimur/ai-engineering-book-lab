# Homepage "Built from This Book" Cross-References — Design

**Date:** 2026-07-28
**Status:** Approved (pending implementation plan)
**Scope:** Add an introduction + cross-reference section on the homepage (`website/src/pages/Catalogue.tsx`) pointing to the standalone, open-source artifacts that either produced this book or were spun out of its ideas. Lightly edit the existing "About the Lab" footer narrative to name and link two of them where it currently only alludes to them.

---

## Background

The homepage already has a working template for this: a "CI that fails when docs lie" section cross-references **claims-ledger** (its own OSS repo, docs site, and fork sandbox) with an eyebrow label, headline, one-paragraph description, a verified-claims badge, and a row of link buttons.

Two more standalone artifacts exist but aren't cross-referenced anywhere on the homepage:

- **book-mash** (`github.com/isatimur/book-mash`) — the multi-judge measurement engine that scores this book's own manuscript (six judges, three craft + three epistemic dimensions). The "About the Lab" footer text already alludes to it ("quality judges for summaries, claims, and chapters") without naming or linking it. Its output is visible live on this site's own `/quality` page.
- **ai-native-org** (`github.com/isatimur/ai-native-org` + `ai-native-org.vercel.app`) — Chapter 9's constrained-delegation thesis, built out as a real three-plane agent-org operating model (ship-gate, sentinel, claims ledger). Only indirectly present today via the whitepaper link in the nav; "About the Lab" doesn't mention this lineage at all.

Out of scope: two internal repo-local automation runbooks (`.agents/skills/corpus-sync`, `.agents/skills/chapter-explainer-video`) are implementation detail, not public-facing products, and are deliberately excluded.

## Goal

1. Replace the single-artifact "CI that fails when docs lie" section with a 3-up **"Built from this book"** section covering claims-ledger (unchanged content), book-mash, and ai-native-org.
2. Lightly edit the "About the Lab" paragraph (`website/src/content/about-the-lab.md`) to name and link book-mash and ai-native-org where it currently only gestures at them — a small insertion, not a rewrite.
3. Extract the current inline claims-ledger JSX into a reusable `ArtifactCard` component so the section is three data-driven cards, not copy-pasted markup.

## Content

### Section copy

- Eyebrow: `Open source · built from this book`
- Headline: **Three things came out of writing this**
- Intro line: *The Method needed tools that didn't exist. They're all real, running, and open source.*

### Card 1 — claims-ledger (content unchanged from today)

- Label: `claims-ledger · open source`
- Headline: "CI that fails when docs lie"
- Description: "Same claim grammar as this book — now for your codebase. Every strong claim carries a verbatim quote anchor; stale pointers exit 11 in CI."
- Badge: existing verified-claims shields.io badge, linked to the GitHub repo
- Links: Website (`isatimur.github.io/claims-ledger/`) · GitHub repo (`github.com/isatimur/claims-ledger`) · Fact-checked ledgers (`/ledgers`, internal) · Fork sandbox (`github.com/isatimur/claims-ledger-sandbox/fork`)

### Card 2 — book-mash (new)

- Label: `book-mash · open source`
- Headline: "Turning \"this chapter feels weak\" into a number"
- Description: "The multi-judge measurement engine that scores every chapter of this book — six independent judges, three craft dimensions, three epistemic dimensions. Generic enough for any manuscript with a `book-mash.toml`."
- No badge (book-mash has no publish-time badge asset today)
- Links: GitHub repo (`github.com/isatimur/book-mash`) · See it scored (`/quality`, internal — this book's own live judge scorecards)

### Card 3 — ai-native-org (new)

- Label: `ai-native-org · open source`
- Headline: "Chapter 9, turned into a running system"
- Description: "The AI-Native Organization's three-plane design, built out as a real operating model for one operator running a fleet of agents — ship-gate, sentinel, claims ledger, all of it."
- No badge
- Links: GitHub repo (`github.com/isatimur/ai-native-org`) · Live site (`ai-native-org.vercel.app`) · Read the chapter (`/read/09-ai-native-org`, internal)

### "About the Lab" edit (`website/src/content/about-the-lab.md`)

Two targeted insertions into the existing paragraphs, not a rewrite:

1. In the bullet list ("bounded research passes... quality judges for summaries, claims, and chapters..."), turn "quality judges for summaries, claims, and chapters" into a link to book-mash's GitHub repo.
2. After the closing question ("...can a book become a public, self-improving research artefact?"), add one sentence: *"One idea already left the lab: Chapter 9's argument for constrained delegation became [ai-native-org](https://github.com/isatimur/ai-native-org), a running operating model, not just a claim."*

## Architecture

New component: `website/src/components/ArtifactCard.tsx`

```ts
type ArtifactLink = { label: string; href: string; external?: boolean };
type ArtifactCardProps = {
  label: string;       // e.g. "book-mash · open source"
  headline: string;
  description: string; // plain string; card renders it directly (no markdown needed)
  badge?: { src: string; alt: string; href: string };
  links: ArtifactLink[];
};
export const ArtifactCard = (props: ArtifactCardProps) => JSX.Element;
```

Visual style is lifted directly from the current inline claims-ledger markup (`font-mono` eyebrow, `font-serif` headline, `font-sans font-light` description, bordered pill link buttons) — no new visual design, just componentized.

`Catalogue.tsx` changes:
- Replace the current single `<section className="mt-16 pt-10 border-t ...">...</section>` (claims-ledger block) with a section wrapper containing the new eyebrow/headline/intro line, then a `grid grid-cols-1 md:grid-cols-3 gap-8` grid (matching the page's existing `max-w-[50rem]` container) rendering three `<ArtifactCard>`s from a local `ARTIFACTS` data array.
- No changes to the book cover, DefinitionBlock, "About the Lab" JSX shell, "For AI agents" links, or transition animation.

`about-the-lab.md` changes: text-only edits described above; `MarkdownBlock` already renders markdown links, so no component change needed there.

## Testing

- `npm run lint` (tsc --noEmit) and `npm test` (vitest) must still pass — no existing test references the claims-ledger section's markup directly (confirmed: no test file matches `claims-ledger` in `website/src/**/*.test.ts`), so no test updates are anticipated, but this should be verified during implementation.
- Manual/visual check: run `npm run dev`, confirm all three cards render, all links resolve (internal routes `/ledgers`, `/quality`, `/read/09-ai-native-org`; external links open in new tabs with `rel="noopener noreferrer"`), and the section reflows sensibly on mobile (single column) vs. desktop (three columns).
- Run `npm run build` and spot-check the built HTML for the section and the edited About the Lab paragraph, same verification pattern used for the prior SEO fixes in this repo.

## Non-goals

- No new visual design language — this reuses the existing card aesthetic exactly.
- No changes to claims-ledger's own copy or links.
- No inclusion of the two internal automation runbooks (corpus-sync, chapter-explainer-video).
- No changes to the site's nav (`ExploreMenu`) — the whitepaper link there is unaffected.
