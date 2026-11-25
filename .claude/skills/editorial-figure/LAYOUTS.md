# Editorial figure data schema

The types live in `website/src/data/figures/types.ts`; that file is the source of truth. This page shows the shape of each layout and what it draws.

## Fields every figure has

```ts
{
  id: 'book1-ch01-fig3',             // matches the PNG it replaces
  layout: 'matrix',                  // one of the six below
  kicker: 'Chapter 1 · Figure 3 · Chat is the tip',  // brackets added by the component
  title: { lead: 'Chat is the visible surface. ', accent: 'The real system lives underneath.' },
  note?: 'One plain sentence under the body.',
  stats?: [{ value: '7', text: '…', hot?: true, basis: '<verbatim>', count?: ['…'], items?: ['…'] }],
  numbers?: [{ value: '300', basis: '<verbatim>' }],   // numbers printed in labels, not as stats
  quote?: { text: '<verbatim>', by: 'Name, Org', translation?: '…' },
  sources: 'Sources: #3 — Jacob Lauritzen, Legora · chapter 1',
}
```

`stats` draws big italic numbers in a row under the body. `items` prints short mono tags under a number (what was counted). `count` is evidence only and is never shown.

## `bars`: a share of a whole

```ts
{ layout: 'bars', scale: 'ONE CHANGE, IDEA TO USER',
  rows: [{ label: 'code', share: 15, text: 'the share flawless code could touch', hot: true }] }
```

A filled block `share`% wide, the rest dashed, `share%` in big italics below. Every `share` must be declared in `stats` or `numbers`.

## `compare`: a shift, or two peers

```ts
{ layout: 'compare', shift?: 'the shift',
  sides: [{ label, heading, items: ['…'], verdict?, hot? }, { … }] }
```

Two columns under a rule; `heading` in serif italics; `items` as a dash list; `verdict` under a thin rule. With `shift` an arrow and the words sit between the columns (before → after); without it the sides are peers. One column at narrow widths, with a downward arrow.

## `stats`: the numbers are the figure

```ts
{ layout: 'stats', stats: [ … ] }
```

Only `stats` is drawn, large. The `hot` stat is the conclusion and takes its own row.

## `flow`: stages in order

```ts
{ layout: 'flow',
  lanes: [{ label?, stages: [{ label, text?, detail?, hot? }], span?: { from, to, text } }] }
```

Each lane is a row of stages under rules, joined by arrows; `detail` prints in mono under the stage. `span` lays an accent band under stages `from`..`to` (0-based, inclusive) with its words. Two lanes compare two flows (the failure surface). Narrow: stages run downwards, the span becomes a rail beside them.

## `quote`: one sentence carries it

```ts
{ layout: 'quote', quote: { … }, points?: [{ label, text, hot? }] }
```

The quote prints large under the title; `points` sit under it in two columns (the contrast the quote implies).

## `matrix`: parts of a whole

```ts
{ layout: 'matrix', columns: 2 | 3 | 4,
  lead?: { label, text }, divider?: 'the part nobody demos',
  cells: [{ label, text?, hot? }], result?: { label, text } }
```

`lead` is the one thing above a dashed `divider` (what people see). `cells` sit in a grid under thin rules (four columns become two at medium widths, one when narrow). `result` is the convergence, behind an accent bar.
