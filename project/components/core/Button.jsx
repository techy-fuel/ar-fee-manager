import React from 'react';

/**
 * Al Rehman Fee Manager — Button
 * Primary action control. Variants, sizes, icon support, loading + disabled.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { height: 32, padding: '0 12px', fontSize: 'var(--fs-sm)', gap: 6, radius: 'var(--radius-sm)' },
    md: { height: 40, padding: '0 16px', fontSize: 'var(--fs-body)', gap: 8, radius: 'var(--radius-md)' },
    lg: { height: 48, padding: '0 22px', fontSize: 'var(--fs-h4)', gap: 9, radius: 'var(--radius-md)' },
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)', color: 'var(--color-on-primary)',
      border: '1px solid var(--color-primary)', boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--color-primary-hover)',
    },
    secondary: {
      background: 'var(--color-surface)', color: 'var(--text-primary)',
      border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--color-surface-hover)',
    },
    ghost: {
      background: 'transparent', color: 'var(--text-secondary)',
      border: '1px solid transparent', boxShadow: 'none',
      '--hover-bg': 'var(--color-surface-hover)',
    },
    subtle: {
      background: 'var(--color-primary-subtle)', color: 'var(--blue-700)',
      border: '1px solid var(--color-primary-border)', boxShadow: 'none',
      '--hover-bg': 'var(--blue-100)',
    },
    danger: {
      background: 'var(--status-danger-solid)', color: '#fff',
      border: '1px solid var(--status-danger-solid)', boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--red-600)',
    },
    whatsapp: {
      background: 'var(--whatsapp)', color: '#fff',
      border: '1px solid var(--whatsapp)', boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--whatsapp-dark)',
    },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, height: s.height, padding: s.padding, fontSize: s.fontSize,
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-snug)', lineHeight: 1,
        borderRadius: s.radius, cursor: disabled || loading ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto', whiteSpace: 'nowrap',
        transition: 'background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast), transform var(--dur-fast)',
        opacity: disabled ? 0.5 : 1,
        transform: hover && !disabled && !loading ? 'translateY(-1px)' : 'none',
        ...v,
        background: hover && !disabled && !loading ? v['--hover-bg'] : v.background,
        ...style,
      }}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}

function Spinner() {
  return (
    <span
      style={{
        width: 15, height: 15, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.45)', borderTopColor: '#fff',
        display: 'inline-block', animation: 'arfm-spin 0.7s linear infinite',
      }}
    >
      <style>{`@keyframes arfm-spin{to{transform:rotate(360deg)}}`}</style>
    </span>
  );
}
