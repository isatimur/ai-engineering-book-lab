import type { EditorialFigureData, FigureStat } from '../../data/figures/types';

/**
 * The text alternative for a figure's drawn body, built only from its data
 * (so it translates with the data). Joins with punctuation, never with
 * English words.
 */
const sentence = (parts: (string | undefined | false)[]) => parts.filter(Boolean).join(' — ');

const statLine = (s: FigureStat) =>
  sentence([`${s.value} ${s.text}`, s.items?.length ? s.items.join(', ') : undefined]);

export const describeFigure = (fig: EditorialFigureData): string => {
  const lines: string[] = [];
  switch (fig.layout) {
    case 'bars':
      lines.push(fig.scale);
      for (const r of fig.rows) lines.push(sentence([r.label, `${r.share}%`, r.text]));
      break;
    case 'compare':
      fig.sides.forEach((s, i) => {
        if (i === 1 && fig.shift) lines.push(`→ ${fig.shift} →`);
        lines.push(sentence([s.label, s.heading, s.items.join(' '), s.verdict]));
      });
      break;
    case 'flow':
      for (const lane of fig.lanes) {
        const stages = lane.stages.map((s) => [s.label, s.text, s.detail].filter(Boolean).join(', ')).join(' → ');
        lines.push(sentence([lane.label, stages, lane.span?.text]));
      }
      break;
    case 'matrix':
      if (fig.lead) lines.push(sentence([fig.lead.label, fig.lead.text, fig.divider]));
      for (const c of fig.cells) lines.push(sentence([c.label, c.text]));
      if (fig.result) lines.push(sentence([fig.result.label, fig.result.text]));
      break;
    case 'quote':
      for (const p of fig.points ?? []) lines.push(sentence([p.label, p.text]));
      break;
    case 'stats':
      break;
  }
  for (const s of fig.stats ?? []) lines.push(statLine(s));
  if (fig.note) lines.push(fig.note);
  return lines.map((l) => (/[.?!…]$/.test(l) ? l : `${l}.`)).join(' ');
};
