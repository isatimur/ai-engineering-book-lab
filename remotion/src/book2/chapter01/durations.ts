/**
 * Frame budget for the Book 2, Chapter 1 explainer at FPS=30. Same ten-beat
 * shape and length (1,005 frames, about 33.5 s) as Book 1's episodes.
 */
export const SCENE_DURATIONS = {
  hook: 90, // "The model is no longer given."
  titleCard: 90, // "Behavior is trained in, not prompted in."
  menuIntro: 60, // post-training is a menu
  sft: 75, // supervised fine-tuning
  preference: 75, // preference optimization
  rft: 105, // reinforcement fine-tuning, held longer — the chapter's subject
  verifier: 90, // "a compiler cannot" be gamed
  quote: 150, // Cappelli quote + source anchor
  operations: 120, // four models in memory: an operations problem
  outro: 150, // cover + where to read it
} as const;

export const TOTAL_DURATION_IN_FRAMES = Object.values(SCENE_DURATIONS).reduce((sum, d) => sum + d, 0);
