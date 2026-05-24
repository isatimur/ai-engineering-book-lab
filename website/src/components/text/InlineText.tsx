import React from 'react';
import { GLOSSARY } from '../../data/glossary';
import { splitWithGlossary } from '../../lib/glossaryMatch';
import { useGlossary } from '../../lib/glossaryContext';

export const InlineText = ({ text }: { text: string }) => {
  const { open } = useGlossary();
  // First split by inline markdown markers (bold/code/italic), then within each
  // text-only segment, split by glossary terms.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        const sub = splitWithGlossary(part, GLOSSARY);
        return sub.map((s, i) => {
          if (s.kind === 'text') return <React.Fragment key={`${index}-${i}`}>{s.value}</React.Fragment>;
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
