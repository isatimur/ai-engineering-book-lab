import { InlineText } from './InlineText';

export const MarkdownBlock = ({ block }: { block: string }) => {
  if (block.startsWith('# ')) return <h1>{block.replace(/^#\s+/, '')}</h1>;
  if (block.startsWith('## ')) return <h2>{block.replace(/^##\s+/, '')}</h2>;
  if (block.startsWith('### ')) return <h3>{block.replace(/^###\s+/, '')}</h3>;

  if (block.startsWith('> ')) {
    return (
      <blockquote>
        <InlineText text={block.replace(/^>\s?/gm, '')} />
      </blockquote>
    );
  }
  if (/^- /.test(block)) {
    return (
      <ul>
        {block.split('\n').map((item) => (
          <li key={item}>
            <InlineText text={item.replace(/^-\s+/, '')} />
          </li>
        ))}
      </ul>
    );
  }
  if (/^\d+\. /.test(block)) {
    return (
      <ol>
        {block.split('\n').map((item) => (
          <li key={item}>
            <InlineText text={item.replace(/^\d+\.\s+/, '')} />
          </li>
        ))}
      </ol>
    );
  }
  return (
    <p>
      <InlineText text={block.replace(/\n/g, ' ')} />
    </p>
  );
};
