import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MotionValue } from 'motion/react';

import {
  audioManifest,
  formatAudioTime,
  globalTimeAtSegment,
  globalTimeToScroll,
  locateGlobalTime,
  parsePlaybackRate,
  scrollToGlobalTime,
  segmentUrl,
  type AudioManifest,
  type AudioSegment,
} from './audiobook';
import { loadAudioProgress, saveAudioProgress } from './readingProgress';

export type AudiobookState = {
  available: boolean;
  isPlaying: boolean;
  speed: string;
  speeds: string[];
  currentSeconds: number;
  totalSeconds: number;
  progress: number;
  currentLabel: string;
  formattedCurrent: string;
  formattedTotal: string;
  togglePlay: () => void;
  setSpeed: (speed: string) => void;
  seekToProgress: (progress: number) => void;
};

type Options = {
  manifest?: AudioManifest;
  scrollProgress?: MotionValue<number>;
  onScrollSync?: (progress: number) => void;
};

export function useAudiobook({ manifest = audioManifest, scrollProgress, onScrollSync }: Options = {}): AudiobookState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const segmentIndexRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState('1.5X');
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [segmentTime, setSegmentTime] = useState(0);

  const speeds = useMemo(() => ['1.0X', '1.5X', '2.0X', '2.5X', 'COLLISON'], []);
  const available = manifest.available && manifest.segments.length > 0;
  const totalSeconds = manifest.totalDurationSeconds;

  const globalTime = useMemo(
    () => globalTimeAtSegment(manifest.segments, segmentIndex, segmentTime),
    [manifest.segments, segmentIndex, segmentTime],
  );

  const progress = totalSeconds > 0 ? globalTime / totalSeconds : 0;
  const currentSegment: AudioSegment | undefined = manifest.segments[segmentIndex];
  const currentLabel = currentSegment?.title ?? 'Audiobook';
  const formattedCurrent = formatAudioTime(globalTime);
  const formattedTotal = formatAudioTime(totalSeconds);

  const persistProgress = useCallback(
    (t: number) => {
      if (totalSeconds > 0) saveAudioProgress(t / totalSeconds);
    },
    [totalSeconds],
  );

  const loadSegment = useCallback(
    (index: number, offsetSeconds = 0, autoplay = false) => {
      const seg = manifest.segments[index];
      if (!seg) return;

      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio;
      audio.preload = 'metadata';
      audio.playbackRate = parsePlaybackRate(speed);

      const onEnded = () => {
        const next = segmentIndexRef.current + 1;
        if (next < manifest.segments.length) {
          loadSegment(next, 0, true);
        } else {
          setIsPlaying(false);
          persistProgress(1);
        }
      };

      audio.onended = onEnded;
      audio.ontimeupdate = () => {
        const idx = segmentIndexRef.current;
        setSegmentTime(audio.currentTime);
        persistProgress(globalTimeAtSegment(manifest.segments, idx, audio.currentTime));
      };

      audio.src = segmentUrl(seg.src);
      segmentIndexRef.current = index;
      setSegmentIndex(index);
      setSegmentTime(offsetSeconds);

      const start = () => {
        if (offsetSeconds > 0) audio.currentTime = offsetSeconds;
        if (autoplay) {
          void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
      };

      if (audio.readyState >= 1) start();
      else audio.onloadedmetadata = start;
    },
    [manifest.segments, persistProgress, speed],
  );

  const seekGlobal = useCallback(
    (targetSeconds: number, autoplay = false) => {
      if (!available) return;
      const { segmentIndex: idx, offsetSeconds } = locateGlobalTime(manifest.segments, targetSeconds);
      loadSegment(idx, offsetSeconds, autoplay);
    },
    [available, loadSegment, manifest.segments],
  );

  const togglePlay = useCallback(() => {
    if (!available) return;

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    const saved = loadAudioProgress();
    const fromScroll = scrollProgress ? scrollToGlobalTime(scrollProgress.get(), totalSeconds) : null;
    const startAt = fromScroll ?? (saved !== null ? saved * totalSeconds : 0);
    seekGlobal(startAt, true);
  }, [available, isPlaying, scrollProgress, seekGlobal, totalSeconds]);

  const setSpeed = useCallback((next: string) => {
    setSpeedState(next);
    if (audioRef.current) audioRef.current.playbackRate = parsePlaybackRate(next);
  }, []);

  const seekToProgress = useCallback(
    (p: number) => {
      if (!available || totalSeconds <= 0) return;
      const target = Math.min(1, Math.max(0, p)) * totalSeconds;
      seekGlobal(target, isPlaying);
      onScrollSync?.(globalTimeToScroll(target, totalSeconds));
    },
    [available, isPlaying, onScrollSync, seekGlobal, totalSeconds],
  );

  // Keep playback rate in sync when speed label changes.
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = parsePlaybackRate(speed);
  }, [speed]);

  // Gentle scroll sync while audio plays.
  const lastScrollSync = useRef(0);
  useEffect(() => {
    if (!isPlaying || !onScrollSync || totalSeconds <= 0) return;
    const now = performance.now();
    if (now - lastScrollSync.current < 400) return;
    lastScrollSync.current = now;
    onScrollSync(progress);
  }, [globalTime, isPlaying, onScrollSync, progress, totalSeconds]);

  // Cleanup on unmount.
  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  return {
    available,
    isPlaying,
    speed,
    speeds,
    currentSeconds: globalTime,
    totalSeconds,
    progress,
    currentLabel,
    formattedCurrent,
    formattedTotal,
    togglePlay,
    setSpeed,
    seekToProgress,
  };
}
