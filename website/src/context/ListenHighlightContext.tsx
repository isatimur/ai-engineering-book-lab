import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { chapters } from '../data/bookChapters';
import { useAudiobook } from './AudiobookContext';
import {
  activeDisplayWordIndex,
  activeSpokenWordIndex,
  isDisplayWordActive,
  loadChapterAlignment,
  type ChapterAlignment,
} from '../lib/listenAlignment';

type ListenWordContextType = {
  listenChapter: string | null;
  allocDisplayWordIndex: () => number;
  isWordActive: (displayIdx: number) => boolean;
};

const ListenWordContext = createContext<ListenWordContextType>({
  listenChapter: null,
  allocDisplayWordIndex: () => -1,
  isWordActive: () => false,
});

export const useListenWords = () => useContext(ListenWordContext);

export const ListenHighlightProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentIndex, isPlaying, currentTime } = useAudiobook();
  const [alignment, setAlignment] = useState<ChapterAlignment | null>(null);
  const wordCounter = useRef(0);

  const listenChapter =
    currentIndex >= 0 && isPlaying ? chapters[currentIndex]?.number ?? null : null;

  if (listenChapter) {
    wordCounter.current = 0;
  }

  useEffect(() => {
    if (currentIndex < 0) {
      setAlignment(null);
      return;
    }
    const num = chapters[currentIndex]?.number;
    if (!num) return;
    let cancelled = false;
    void loadChapterAlignment(num).then((doc) => {
      if (!cancelled) setAlignment(doc);
    });
    return () => {
      cancelled = true;
    };
  }, [currentIndex]);

  const activeSpokenIdx = useMemo(() => {
    if (!alignment || !isPlaying || currentIndex < 0) return -1;
    return activeSpokenWordIndex(alignment.words, currentTime);
  }, [alignment, currentTime, currentIndex, isPlaying]);

  const activeDisplayIdx = useMemo(() => {
    if (!alignment || activeSpokenIdx < 0) return null;
    return activeDisplayWordIndex(alignment, activeSpokenIdx);
  }, [alignment, activeSpokenIdx]);

  const scrollTarget = useRef<number | null>(null);
  useEffect(() => {
    if (activeDisplayIdx === null || !isPlaying) return;
    if (scrollTarget.current === activeDisplayIdx) return;
    scrollTarget.current = activeDisplayIdx;
    const el = document.querySelector(`[data-listen-word="${activeDisplayIdx}"]`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeDisplayIdx, isPlaying]);

  const allocDisplayWordIndex = useCallback(() => {
    const idx = wordCounter.current;
    wordCounter.current += 1;
    return idx;
  }, []);

  const isWordActive = useCallback(
    (displayIdx: number) => {
      if (!listenChapter || !alignment) return false;
      return isDisplayWordActive(alignment, activeSpokenIdx, displayIdx);
    },
    [alignment, activeSpokenIdx, listenChapter],
  );

  const value = useMemo(
    () => ({ listenChapter, allocDisplayWordIndex, isWordActive }),
    [listenChapter, allocDisplayWordIndex, isWordActive],
  );

  return <ListenWordContext.Provider value={value}>{children}</ListenWordContext.Provider>;
};
