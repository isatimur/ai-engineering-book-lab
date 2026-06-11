import { chapters } from '../data/bookChapters';

const WORDS_PER_MINUTE = 238;

export const totalWordCount = chapters.reduce((sum, c) => sum + c.wordCount, 0);

export const readingMinutes = (words: number) => Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

export const formatReadingTime = (words: number) => {
  const minutes = readingMinutes(words);
  if (minutes < 60) return `${minutes} min read`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hours}h ${rem}m read` : `${hours}h read`;
};

export const bookReadingTime = formatReadingTime(totalWordCount);
