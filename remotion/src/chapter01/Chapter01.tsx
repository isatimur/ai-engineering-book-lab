import { AbsoluteFill, Series } from 'remotion';
import { theme } from '../theme';
import { useProgress } from './primitives';
import { SCENE_DURATIONS } from './durations';
import {
  HookScene,
  TitleScene,
  FrameworkIntroScene,
  AssistantScene,
  CopilotScene,
  DelegateScene,
  LoopShiftScene,
  QuoteScene,
  StatsScene,
  OutroScene,
} from './Scenes';

/** Thin progress rail pinned to the bottom edge — a quiet "how much is left" cue. */
const ProgressRail = () => {
  const progress = useProgress();
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', pointerEvents: 'none' }}>
      <div style={{ height: 3, backgroundColor: 'rgba(249,247,241,0.08)' }}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            backgroundColor: theme.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Chapter 1 explainer — the pilot episode of the series. Each scene's frame
 * budget lives in `durations.ts`; add a chapter by copying this folder,
 * swapping `Scenes.tsx`'s content for the new chapter's argument, and
 * registering a new `<Composition>` in `Root.tsx`.
 */
export const Chapter01 = () => (
  <>
    <Series>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.hook}>
        <HookScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.titleCard}>
        <TitleScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.frameworkIntro}>
        <FrameworkIntroScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.assistant}>
        <AssistantScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.copilot}>
        <CopilotScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.delegate}>
        <DelegateScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.loopShift}>
        <LoopShiftScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.quote}>
        <QuoteScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.stats}>
        <StatsScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.outro}>
        <OutroScene />
      </Series.Sequence>
    </Series>
    <ProgressRail />
  </>
);
