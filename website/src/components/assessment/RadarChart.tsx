// Dependency-free SVG radar for the 5-dimension readiness profile.
// Pentagon with concentric guide rings; the data polygon is filled with the
// brand pink. Labels sit outside each vertex.

export type RadarPoint = { label: string; score: number };

const RINGS = [25, 50, 75, 100];

export const RadarChart = ({
  points,
  size = 360,
  max = 100,
}: {
  points: RadarPoint[];
  size?: number;
  max?: number;
}) => {
  const n = points.length;
  if (n < 3) return null;

  const cx = size / 2;
  const cy = size / 2;
  // Leave room for labels around the chart.
  const maxR = size / 2 - 64;

  // Vertex i sits at -90° + i*(360/n), so the first axis points straight up.
  const angle = (i: number) => (-Math.PI / 2) + (i * 2 * Math.PI) / n;
  const coord = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  const ringPolygon = (pct: number) =>
    points
      .map((_, i) => {
        const { x, y } = coord(i, (pct / max) * maxR);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  const dataPolygon = points
    .map((p, i) => {
      const { x, y } = coord(i, (Math.max(0, Math.min(max, p.score)) / max) * maxR);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="Readiness profile across five dimensions"
      className="mx-auto h-auto w-full max-w-[360px]"
    >
      {/* Guide rings */}
      {RINGS.map((pct) => (
        <polygon
          key={pct}
          points={ringPolygon(pct)}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={1}
        />
      ))}

      {/* Axes */}
      {points.map((_, i) => {
        const { x, y } = coord(i, maxR);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x.toFixed(1)}
            y2={y.toFixed(1)}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill="color-mix(in srgb, var(--color-pink) 55%, transparent)"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Vertices */}
      {points.map((p, i) => {
        const { x, y } = coord(i, (Math.max(0, Math.min(max, p.score)) / max) * maxR);
        return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={3} fill="var(--color-ink)" />;
      })}

      {/* Labels + scores outside each vertex */}
      {points.map((p, i) => {
        const { x, y } = coord(i, maxR + 22);
        const a = angle(i);
        const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
        return (
          <g key={i}>
            <text
              x={x.toFixed(1)}
              y={y.toFixed(1)}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="fill-[var(--color-ink)]"
              style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
            >
              {p.label}
            </text>
            <text
              x={x.toFixed(1)}
              y={(y + 13).toFixed(1)}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="fill-[var(--color-ink-muted)]"
              style={{ fontSize: 11, fontFamily: 'var(--font-serif)' }}
            >
              {Math.round(p.score)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
