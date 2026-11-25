import { useId, type CSSProperties } from 'react';
import type {
  BarsBody,
  CompareBody,
  EditorialFigureData,
  FigureQuote,
  FigureStat,
  FlowBody,
  MatrixBody,
  QuoteBody,
} from '../../data/figures/types';
import { describeFigure } from './describeFigure';
import './EditorialFigure.css';

/**
 * An editorial figure: a book diagram drawn as HTML from data
 * (data/figures). Kicker, serif title with an italic accent, one of six
 * layouts, big italic numbers, a verbatim quote, a mono sources line.
 * Sizes are container-query units, so the figure scales with its column and
 * reflows to one column when narrow. Every visible string comes from `fig`.
 */
export const EditorialFigure = ({ fig }: { fig: EditorialFigureData }) => {
  const titleId = `ef-${useId().replace(/:/g, '')}`;
  const bigQuote = fig.layout === 'quote' && fig.quote;
  return (
    <figure className={`ef ef--${fig.layout}`} aria-labelledby={titleId} data-figure-id={fig.id}>
      <div className="ef-in">
        <figcaption className="ef-head">
          <span className="ef-kicker">[ {fig.kicker} ]</span>
          <span className="ef-title" id={titleId}>
            {fig.title.lead}
            <em>{fig.title.accent}</em>
          </span>
        </figcaption>

        {bigQuote && fig.quote ? <Quote quote={fig.quote} big /> : null}

        <div className="ef-body" role="img" aria-label={describeFigure(fig)}>
          <Body fig={fig} />
          {fig.stats?.length ? <Stats stats={fig.stats} big={fig.layout === 'stats'} /> : null}
          {fig.note ? <p className="ef-note">{fig.note}</p> : null}
        </div>

        {!bigQuote && fig.quote ? <Quote quote={fig.quote} /> : null}
        <p className="ef-sources">{fig.sources}</p>
      </div>
    </figure>
  );
};

const Body = ({ fig }: { fig: EditorialFigureData }) => {
  switch (fig.layout) {
    case 'bars':
      return <Bars body={fig} />;
    case 'compare':
      return <Compare body={fig} />;
    case 'flow':
      return <Flow body={fig} />;
    case 'matrix':
      return <Matrix body={fig} />;
    case 'quote':
      return <Points body={fig} />;
    case 'stats':
      return null;
  }
};

const hot = (base: string, on?: boolean) => (on ? `${base} ${base}--hot` : base);

const Bars = ({ body }: { body: BarsBody }) => (
  <div className="ef-bars">
    <p className="ef-mono">{body.scale}</p>
    {body.rows.map((r) => (
      <div key={r.label} className={hot('ef-bar', r.hot)}>
        <span className="ef-bar-track">
          <span className="ef-bar-fill" style={{ width: `${r.share}%` }}>
            {r.label}
          </span>
          <span className="ef-bar-rest" />
        </span>
        <span className="ef-bar-note">
          <b>{r.share}%</b> {r.text}
        </span>
      </div>
    ))}
  </div>
);

const Compare = ({ body }: { body: CompareBody }) => (
  <div className={`ef-compare${body.shift ? '' : ' ef-compare--peers'}`}>
    {body.sides.map((s, i) => (
      <div key={s.label} className={hot('ef-side', s.hot)} style={{ gridArea: i === 0 ? 'a' : 'b' }}>
        <p className="ef-mono">{s.label}</p>
        <p className="ef-side-heading">{s.heading}</p>
        <ul className="ef-list">
          {s.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {s.verdict ? <p className="ef-verdict">{s.verdict}</p> : null}
      </div>
    ))}
    {body.shift ? (
      <p className="ef-shift" style={{ gridArea: 's' }}>
        <span className="ef-shift-arrow" aria-hidden="true" />
        {body.shift}
      </p>
    ) : null}
  </div>
);

const Flow = ({ body }: { body: FlowBody }) => (
  <div className="ef-flow">
    {body.lanes.map((lane, li) => (
      <div key={li} className="ef-lane-wrap">
        {lane.label ? <p className="ef-mono">{lane.label}</p> : null}
        <div className="ef-lane" style={{ '--n': lane.stages.length } as CSSProperties}>
          {lane.stages.map((s, i) => (
            <div
              key={`${s.label}-${i}`}
              className={hot('ef-stage', s.hot)}
              style={{ '--i': i + 1 } as CSSProperties}
            >
              <span className="ef-stage-label">{s.label}</span>
              {s.text ? <span className="ef-stage-text">{s.text}</span> : null}
              {s.detail ? <span className="ef-stage-detail">{s.detail}</span> : null}
            </div>
          ))}
          {lane.span ? (
            <>
              <span
                className="ef-span-bar"
                style={{ '--from': lane.span.from + 1, '--to': lane.span.to + 2 } as CSSProperties}
              />
              <span
                className="ef-span-text"
                style={{ '--from': lane.span.from + 1, '--to': lane.span.to + 2 } as CSSProperties}
              >
                {lane.span.text}
              </span>
            </>
          ) : null}
        </div>
      </div>
    ))}
  </div>
);

const Matrix = ({ body }: { body: MatrixBody }) => (
  <div className="ef-matrix">
    {body.lead ? (
      <div className="ef-lead">
        <span className="ef-lead-label">{body.lead.label}</span>
        <span className="ef-lead-text">{body.lead.text}</span>
      </div>
    ) : null}
    {body.divider ? (
      <p className="ef-divider">
        <span>{body.divider}</span>
      </p>
    ) : null}
    <div className={`ef-cells ef-cells--${body.columns}`}>
      {body.cells.map((c) => (
        <div key={c.label} className={hot('ef-cell', c.hot)}>
          <span className="ef-cell-label">{c.label}</span>
          {c.text ? <span className="ef-cell-text">{c.text}</span> : null}
        </div>
      ))}
    </div>
    {body.result ? (
      <div className="ef-result">
        <span className="ef-result-label">{body.result.label}</span>
        <span className="ef-result-text">{body.result.text}</span>
      </div>
    ) : null}
  </div>
);

const Points = ({ body }: { body: QuoteBody }) =>
  body.points?.length ? (
    <div className="ef-points">
      {body.points.map((p) => (
        <div key={p.label} className={hot('ef-point', p.hot)}>
          <p className="ef-mono">{p.label}</p>
          <p className="ef-point-text">{p.text}</p>
        </div>
      ))}
    </div>
  ) : null;

const Stats = ({ stats, big }: { stats: FigureStat[]; big: boolean }) => (
  <div className={`ef-stats${big ? ' ef-stats--big' : ''}`}>
    {stats.map((s) => (
      <div key={s.value + s.text} className={hot('ef-stat', s.hot)}>
        <b>{s.value}</b>
        <span className="ef-stat-text">{s.text}</span>
        {s.items?.length ? (
          <ul className="ef-tags">
            {s.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : null}
      </div>
    ))}
  </div>
);

const Quote = ({ quote, big = false }: { quote: FigureQuote; big?: boolean }) => (
  <blockquote className={`ef-quote${big ? ' ef-quote--big' : ''}`}>
    <p lang="en">“{quote.text}”</p>
    {quote.translation ? <p className="ef-quote-tr">{quote.translation}</p> : null}
    <footer>{quote.by}</footer>
  </blockquote>
);
