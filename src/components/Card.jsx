import { useState } from 'react';

export function Card({
  children,
  title = null,
  subtitle = null,
  actions = null,
  footer = null,
  padding = 'md',
  interactive = false,
  style = {},
  bodyStyle = {},
  ...rest
}) {
  const pads = { none: '0', sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };
  const pad = pads[padding] ?? pads.md;
  const [hover, setHover] = useState(false);
  const hasHeader = title || subtitle || actions;

  return (
    <section
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--card-radius)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--card-shadow)',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base)',
        transform: hover && interactive ? 'translateY(-2px)' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        overflow: 'hidden', ...style,
      }}
      {...rest}
    >
      {hasHeader && (
        <header style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 'var(--space-4)',
          padding: `${pad === '0' ? 'var(--space-5)' : pad} ${pad === '0' ? 'var(--space-5)' : pad} 0`,
        }}>
          <div style={{ minWidth: 0 }}>
            {title && <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', letterSpacing: 'var(--ls-snug)' }}>{title}</h3>}
            {subtitle && <p style={{ margin: '4px 0 0', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>{subtitle}</p>}
          </div>
          {actions && <div style={{ flex: 'none', display: 'flex', gap: 'var(--space-2)' }}>{actions}</div>}
        </header>
      )}
      <div style={{ padding: hasHeader && pad !== '0' ? `var(--space-4) ${pad} ${pad}` : pad, ...bodyStyle }}>
        {children}
      </div>
      {footer && (
        <footer style={{
          padding: `var(--space-4) ${pad === '0' ? 'var(--space-5)' : pad}`,
          borderTop: '1px solid var(--border-subtle)', background: 'var(--color-surface-sunken)',
        }}>
          {footer}
        </footer>
      )}
    </section>
  );
}
