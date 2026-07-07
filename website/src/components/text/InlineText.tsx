import React from 'react';
import { GLOSSARY } from '../../data/glossary';
import { splitWithGlossary } from '../../lib/glossaryMatch';
import { useGlossary } from '../../lib/glossaryContext';
import { ListenWordRun } from './ListenWordRun';

type Props = {
  text: string;
  listen?: boolean;
};

export const InlineText = ({ text, listen = false }: Props) => {
  const { open } = useGlossary();
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index}>
              <ListenWordRun text={part.slice(2, -2)} listen={listen} />
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index}>
              <ListenWordRun text={part.slice(1, -1)} listen={listen} />
            </code>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index}>
              <ListenWordRun text={part.slice(1, -1)} listen={listen} />
            </em>
          );
        }
        const sub = splitWithGlossary(part, GLOSSARY);
        return sub.map((s, i) => {
          if (s.kind === 'text') {
            return <ListenWordRun key={`${index}-${i}`} text={s.value} listen={listen} />;
          }
          if (listen) {
            return <ListenWordRun key={`${index}-${i}`} text={s.value} listen={listen} />;
          }
          return (
            <button
              key={`${index}-${i}`}
              type="button"
              className="glossary-term"
              onClick={() => open(s.termId)}
              aria-label={`Open glossary for ${s.value}`}
            >
              {s.value}
            </button>
          );
        });
      })}
    </>
  );
};
