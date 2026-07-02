import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AUDIOBOOK, PLAYBACK_SPEEDS, type AudiobookTrack } from '../data/audiobook';

export type AudiobookContextType = {
  tracks: AudiobookTrack[];
  currentIndex: number; // -1 when nothing is loaded yet
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: number;
  speeds: readonly number[];
  playChapter: (index: number) => void;
  toggle: (fallbackIndex?: number) => void;
  seek: (seconds: number) => void;
  setSpeed: (speed: number) => void;
  next: () => void;
  prev: () => void;
};

const AudiobookContext = createContext<AudiobookContextType | undefined>(undefined);

export const AudiobookProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeedState] = useState(1);

  // Refs so the (mount-once) audio event handlers always see fresh values.
  const indexRef = useRef(currentIndex);
  indexRef.current = currentIndex;
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const loadAndPlay = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio || index < 0 || index >= AUDIOBOOK.length) return;
    const track = AUDIOBOOK[index];
    if (!audio.currentSrc.endsWith(track.src)) {
      audio.src = track.src;
      setCurrentTime(0);
      setDuration(track.approxSeconds); // optimistic until loadedmetadata corrects it
    }
    audio.playbackRate = speedRef.current;
    setCurrentIndex(index);
    void audio.play().catch(() => {/* ignore autoplay-gesture rejections */});
    if (typeof document !== 'undefined') {
      document
        .getElementById(`book-chapter-${track.number}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Create the audio element on the client only — never during SSG/SSR.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.playbackRate = speedRef.current;
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      const nextIdx = indexRef.current + 1;
      if (nextIdx < AUDIOBOOK.length) loadAndPlay(nextIdx);
      else setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, [loadAndPlay]);

  const toggle = useCallback((fallbackIndex = 0) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (indexRef.current < 0) {
      loadAndPlay(fallbackIndex);
    } else if (audio.paused) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [loadAndPlay]);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(seconds, audio.duration || seconds));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const setSpeed = useCallback((next: number) => {
    setSpeedState(next);
    speedRef.current = next;
    if (audioRef.current) audioRef.current.playbackRate = next;
  }, []);

  const next = useCallback(() => loadAndPlay(indexRef.current + 1), [loadAndPlay]);
  const prev = useCallback(() => loadAndPlay(Math.max(0, indexRef.current - 1)), [loadAndPlay]);

  return (
    <AudiobookContext.Provider
      value={{
        tracks: AUDIOBOOK,
        currentIndex,
        isPlaying,
        currentTime,
        duration,
        speed,
        speeds: PLAYBACK_SPEEDS,
        playChapter: loadAndPlay,
        toggle,
        seek,
        setSpeed,
        next,
        prev,
      }}
    >
      {children}
    </AudiobookContext.Provider>
  );
};

export const useAudiobook = () => {
  const ctx = useContext(AudiobookContext);
  if (!ctx) throw new Error('useAudiobook must be used within an AudiobookProvider');
  return ctx;
};
