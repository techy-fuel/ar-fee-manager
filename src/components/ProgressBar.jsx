export function ProgressBar({ value = 0, max = 100, variant = 'brand', size = 'md', showLabel = false, label = null, style = {}, ...rest }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const colors = {
    brand:   'var(--blue-500)',
    success: 'var(--green-500)',
    warning: 'var(--amber-500)',
    danger:  'var(--red-500)',
  };
  const heights = { sm: 6, md: 8, lg: 12 };
  const h = heights[size] || heights.md;
  const fill = colors[variant] || colors.brand;

  return (
    <div style={{ width: '100%', ...style }} {...rest}>
      {(showLabel || label) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-medium)', color: 'var(--text-muted)' }}>{label}</span>
          {showLabel && <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{ width: '100%', height: h, background: 'var(--chart-track)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%', background: fill,
          borderRadius: 'var(--radius-full)',
          transition: 'width var(--dur-slow) var(--ease-out)',
        }} />
      </div>
    </div>
  );
}
