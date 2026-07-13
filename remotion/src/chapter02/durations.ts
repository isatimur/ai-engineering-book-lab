/**
 * Frame budget for each scene in the Chapter 2 explainer, at FPS=30 (shared
 * across the series — see `chapter01/durations.ts`). Ten beats again, but the
 * hold times and beat shape are chapter 2's own — the pattern is reused, the
 * pacing isn't forced to match chapter 1.
 */
export const SCENE_DURATIONS = {
  hook: 90, // "Cheap code is easy to misread."
  titleCard: 90, // "Generation got cheaper. Bad decisions did not."
  frameworkIntro: 60, // "the scarcity that disappeared"
  criterion: 75, // write the success criterion before
  reviewer: 75, // keep a reviewer with veto after
  taste: 105, // TASTE, held longer — the chapter's actual subject
  tripwire: 90, // "if you can't name the failing condition..."
  quote: 150, // Sean Grove quote + source-anchor citation
  scarceSkills: 120, // framing / review as the two scarce skills
  outro: 150, // cover + CTA
} as const;

export const TOTAL_DURATION_IN_FRAMES = Object.values(SCENE_DURATIONS).reduce(
  (sum, d) => sum + d,
  0,
);
