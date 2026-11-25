import { SeriesWithProgress } from '../../shared/primitives';
import { SCENE_DURATIONS } from './durations';
import {
  HookScene,
  TitleScene,
  MenuIntroScene,
  SftScene,
  PreferenceScene,
  RftScene,
  VerifierScene,
  QuoteScene,
  OperationsScene,
  OutroScene,
} from './Scenes';

/** Book 2, Chapter 1 explainer — the pilot for books 2 and 3 (same pattern as `chapter01/Chapter01.tsx`). */
export const Book2Chapter01 = () => (
  <SeriesWithProgress
    scenes={[
      { durationInFrames: SCENE_DURATIONS.hook, Component: HookScene },
      { durationInFrames: SCENE_DURATIONS.titleCard, Component: TitleScene },
      { durationInFrames: SCENE_DURATIONS.menuIntro, Component: MenuIntroScene },
      { durationInFrames: SCENE_DURATIONS.sft, Component: SftScene },
      { durationInFrames: SCENE_DURATIONS.preference, Component: PreferenceScene },
      { durationInFrames: SCENE_DURATIONS.rft, Component: RftScene },
      { durationInFrames: SCENE_DURATIONS.verifier, Component: VerifierScene },
      { durationInFrames: SCENE_DURATIONS.quote, Component: QuoteScene },
      { durationInFrames: SCENE_DURATIONS.operations, Component: OperationsScene },
      { durationInFrames: SCENE_DURATIONS.outro, Component: OutroScene },
    ]}
  />
);
