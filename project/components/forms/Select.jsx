import React from 'react';

/**
 * Al Rehman Fee Manager — Select
 * Styled native select with label / hint / error. Wraps a real <select> for accessibility.
 */
export function Select({
  label = null,
  hint = null,
  error = null,
  options = [],
  placeholder = null,
  size = 'md',
  fullWidth = true,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: { height: 34, font: 'var(--fs-sm)', pad: 10 },
    md: { height: 40, font: 'var(--fs-body)', pad: 12 },
    lg: { height: 46, font: 'var(--fs-h4)', pad: 14 },
  };
  const s = sizes[size] || sizes.md;
  const reactId = React.useId();
  const fieldId = id || reactId;
  const borderColor = error ? 'var(--status-danger-solid)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  const norm = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ display: 'block', marginBottom: 6, fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div
        style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          height: s.height, background: 'var(--color-surface)',
          border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-md)',
          boxShadow: focus ? (error ? 'var(--ring-danger)' : 'var(--ring-primary)') : 'var(--shadow-xs)',
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        <select
          id={fieldId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none', width: '100%', height: '100%',
            padding: `0 36px 0 ${s.pad}px`, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: s.font, color: 'var(--text-primary)', cursor: 'pointer',
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {norm.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', right: s.pad, pointerEvents: 'none' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {(hint || error) && (
        <p style={{ margin: '6px 0 0', fontSize: 'var(--fs-xs)', color: error ? 'var(--status-danger-fg)' : 'var(--text-muted)' }}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
