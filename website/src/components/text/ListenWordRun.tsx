import React from 'react';

import { useListenWords } from '../../context/ListenHighlightContext';

const splitWords = (text: string): string[] => text.split(/(\s+)/).filter((p) => p.length > 0);

type Props = {
  text: string;
  listen: boolean;
};

/** Render plain text with optional per-word karaoke spans. */
export const ListenWordRun = ({ text, listen }: Props) => {
  const { allocDisplayWordIndex, isWordActive } = useListenWords();

  if (!listen) return <>{text}</>;

  return (
    <>
      {splitWords(text).map((part, i) => {
        if (/^\s+$/.test(part)) {
          return <React.Fragment key={i}>{part}</React.Fragment>;
        }
        const idx = allocDisplayWordIndex();
        const active = isWordActive(idx);
        return (
          <span
            key={i}
            data-listen-word={idx}
            className={active ? 'listen-word listen-word-active' : 'listen-word'}
          >
            {part}
          </span>
        );
      })}
    </>
  );
};
