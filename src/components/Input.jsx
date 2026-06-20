import { useState, useRef, useId } from 'react';

export function Input({
  label = null,
  hint = null,
  error = null,
  iconLeft = null,
  iconRight = null,
  size = 'md',
  fullWidth = true,
  id,
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const sizes = {
    sm: { height: 34, font: 'var(--fs-sm)',  pad: 10 },
    md: { height: 40, font: 'var(--fs-body)', pad: 12 },
    lg: { height: 46, font: 'var(--fs-h4)',  pad: 14 },
  };
  const s = sizes[size] || sizes.md;
  const reactId = useId();
  const fieldId = id || reactId;
  const borderColor = error ? 'var(--status-danger-solid)' : focus ? 'var(--border-focus)' : 'var(--border-default)';

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ display: 'block', marginBottom: 6, fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: s.height, padding: `0 ${s.pad}px`,
          background: 'var(--color-surface)', border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)', cursor: 'text',
          boxShadow: focus ? (error ? 'var(--ring-danger)' : 'var(--ring-primary)') : 'var(--shadow-xs)',
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}>
        {iconLeft && <span style={{ display: 'inline-flex', color: 'var(--text-faint)', flex: 'none', pointerEvents: 'none' }}>{iconLeft}</span>}
        <input
          ref={inputRef}
          id={fieldId}
          onFocus={e => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
          onBlur={e => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
          style={{
            flex: 1, minWidth: 0, height: '100%', border: 'none', outline: 'none',
            background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: s.font,
            color: 'var(--text-primary)', cursor: 'text', ...inputStyle,
          }}
          {...rest}
        />
        {iconRight && <span style={{ display: 'inline-flex', color: 'var(--text-faint)', flex: 'none', pointerEvents: 'none' }}>{iconRight}</span>}
      </div>
      {(hint || error) && (
        <p style={{ margin: '6px 0 0', fontSize: 'var(--fs-xs)', color: error ? 'var(--status-danger-fg)' : 'var(--text-muted)' }}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
