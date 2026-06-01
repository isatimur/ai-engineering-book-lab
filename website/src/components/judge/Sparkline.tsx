// Minimal dependency-free SVG sparkline for version-over-version judge trends.
export const Sparkline = ({
  values,
  width = 120,
  height = 28,
  color = 'var(--color-ink)',
}: {
  values: (number | null)[];
  width?: number;
  height?: number;
  color?: string;
}) => {
  const pts = values
    .map((v, i) => ({ v, i }))
    .filter((p): p is { v: number; i: number } => p.v !== null && p.v !== undefined);
  if (pts.length === 0) return null;

  const n = values.length;
  const min = 0;
  const max = 100; // dims are 0–100
  const x = (i: number) => (n <= 1 ? width / 2 : (i / (n - 1)) * (width - 4) + 2);
  const y = (v: number) => height - 2 - ((v - min) / (max - min)) * (height - 4);

  const path = pts.map((p, k) => `${k === 0 ? 'M' : 'L'} ${x(p.i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];

  return (
    <svg width={width} height={height} role="img" aria-label="trend">
      {pts.length > 1 && <path d={path} fill="none" stroke={color} strokeWidth={1.5} />}
      <circle cx={x(last.i)} cy={y(last.v)} r={2.5} fill={color} />
    </svg>
  );
};
