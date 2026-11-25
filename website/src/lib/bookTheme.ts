import type { CSSProperties } from 'react';

/**
 * A book's colours. `paper` is the page, `ink` the body text, `accent` the
 * book's one loud colour (labels, rules, hover). Each pair the page prints
 * text in must pass WCAG AA (4.5:1); bookTheme.test.ts checks it.
 */
export type BookTheme = {
  accent: string;
  paper: string;
  ink: string;
};

/**
 * The CSS variables a page root sets, so every `var(--color-*)` class below
 * it takes the book's colours. Borders are the accent washed into the paper.
 */
export const themeStyle = (theme: BookTheme): CSSProperties =>
  ({
    '--color-paper': theme.paper,
    '--color-ink': theme.ink,
    '--color-accent': theme.accent,
    '--color-border': `color-mix(in srgb, ${theme.accent} 22%, ${theme.paper})`,
  }) as CSSProperties;

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

/** WCAG relative luminance of a #RRGGBB colour. */
export const luminance = (hex: string): number => {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`Not a #RRGGBB colour: ${hex}`);
  const n = parseInt(m[1], 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};

/** WCAG contrast ratio between two #RRGGBB colours, from 1 to 21. */
export const contrastRatio = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
