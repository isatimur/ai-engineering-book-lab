export type WordTiming = {
  text: string;
  start: number;
  end: number;
};

export type ChapterAlignment = {
  chapter: string;
  spokenText: string;
  source: string;
  durationSeconds: number;
  words: WordTiming[];
  displayMap: Array<number | null>;
  displayWordCount: number;
};

export function alignmentUrl(chapterNumber: string): string {
  return `/audiobook/ch-${chapterNumber.padStart(2, '0')}.align.json`;
}

export async function loadChapterAlignment(chapterNumber: string): Promise<ChapterAlignment | null> {
  try {
    const res = await fetch(alignmentUrl(chapterNumber));
    if (!res.ok) return null;
    return (await res.json()) as ChapterAlignment;
  } catch {
    return null;
  }
}

export function activeSpokenWordIndex(words: WordTiming[], t: number): number {
  if (!words.length) return -1;
  if (t < words[0].start) return 0;
  if (t >= words[words.length - 1].end) return words.length - 1;
  let lo = 0;
  let hi = words.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const w = words[mid];
    if (t < w.start) hi = mid - 1;
    else if (t >= w.end) lo = mid + 1;
    else return mid;
  }
  return Math.max(0, Math.min(lo, words.length - 1));
}

/** Map spoken word index -> display word index (first match). */
export function activeDisplayWordIndex(alignment: ChapterAlignment, spokenIdx: number): number | null {
  if (spokenIdx < 0) return null;
  const hit = alignment.displayMap.findIndex((s) => s === spokenIdx);
  return hit >= 0 ? hit : null;
}

export function spokenIndexForDisplay(alignment: ChapterAlignment, displayIdx: number): number | null {
  const v = alignment.displayMap[displayIdx];
  return v === null || v === undefined ? null : v;
}

export function isDisplayWordActive(
  alignment: ChapterAlignment | null,
  activeSpokenIdx: number,
  displayWordIdx: number,
): boolean {
  if (!alignment || activeSpokenIdx < 0) return false;
  const mapped = alignment.displayMap[displayWordIdx];
  return mapped === activeSpokenIdx;
}
