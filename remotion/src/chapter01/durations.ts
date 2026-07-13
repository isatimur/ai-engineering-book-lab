/**
 * Frame budget for each scene in the Chapter 1 explainer, at the series' FPS
 * (see `../theme.ts`). Kept in one place so `<Composition durationInFrames>`
 * in Root.tsx and the `<Series.Sequence>` calls in Chapter01.tsx can never
 * drift apart.
 */
export const SCENE_DURATIONS = {
  hook: 90, // "not that chat got better"
  titleCard: 90, // book title + chapter title
  frameworkIntro: 60, // "three words, three relationships"
  assistant: 75,
  copilot: 75,
  delegate: 105, // held longer — this is the book's actual subject
  loopShift: 90, // "steps out of the loop, re-enters at review"
  quote: 150, // Anthropic quote + source-anchor citation
  stats: 120, // corpus / claims / anchors
  outro: 150, // cover + CTA
} as const;

export const TOTAL_DURATION_IN_FRAMES = Object.values(SCENE_DURATIONS).reduce(
  (sum, d) => sum + d,
  0,
);
