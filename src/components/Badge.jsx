export function Badge({ children, variant = 'neutral', size = 'md', dot = false, style = {}, ...rest }) {
  const variants = {
    neutral: { bg: 'var(--slate-100)',            fg: 'var(--slate-600)',           bd: 'var(--slate-200)',             solid: 'var(--slate-400)' },
    info:    { bg: 'var(--status-info-bg)',        fg: 'var(--status-info-fg)',       bd: 'var(--status-info-border)',    solid: 'var(--status-info-solid)' },
    success: { bg: 'var(--status-success-bg)',     fg: 'var(--status-success-fg)',    bd: 'var(--status-success-border)', solid: 'var(--status-success-solid)' },
    warning: { bg: 'var(--status-warning-bg)',     fg: 'var(--status-warning-fg)',    bd: 'var(--status-warning-border)', solid: 'var(--status-warning-solid)' },
    danger:  { bg: 'var(--status-danger-bg)',      fg: 'var(--status-danger-fg)',     bd: 'var(--status-danger-border)',  solid: 'var(--status-danger-solid)' },
    brand:   { bg: 'var(--blue-50)',               fg: 'var(--blue-700)',             bd: 'var(--blue-100)',              solid: 'var(--blue-500)' },
  };
  const sizes = {
    sm: { fontSize: 'var(--fs-2xs)', padding: dot ? '2px 8px 2px 6px' : '2px 8px',   gap: 5, dotSize: 5 },
    md: { fontSize: 'var(--fs-xs)',  padding: dot ? '3px 10px 3px 8px' : '3px 10px', gap: 6, dotSize: 6 },
  };
  const v = variants[variant] || variants.neutral;
  const s = sizes[size] || sizes.md;

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: s.gap,
        padding: s.padding, fontSize: s.fontSize, fontWeight: 'var(--fw-semibold)',
        fontFamily: 'var(--font-sans)', letterSpacing: 'var(--ls-snug)',
        lineHeight: 1.4, color: v.fg, background: v.bg,
        border: `1px solid ${v.bd}`, borderRadius: 'var(--radius-full)',
        whiteSpace: 'nowrap', ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: s.dotSize, height: s.dotSize, borderRadius: '50%', background: v.solid, flex: 'none' }} />}
      {children}
    </span>
  );
}
