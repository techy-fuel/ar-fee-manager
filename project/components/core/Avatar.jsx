import React from 'react';

/**
 * Al Rehman Fee Manager — Avatar
 * Initials avatar with deterministic brand-tinted color. Used for students/parents/users.
 */
export function Avatar({
  name = '',
  src = null,
  size = 'md',
  square = false,
  style = {},
  ...rest
}) {
  const sizes = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
  const px = sizes[size] || sizes.md;
  const fontPx = Math.round(px * 0.38);

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '?';

  // deterministic tone from name
  const palette = [
    ['var(--blue-100)', 'var(--blue-700)'],
    ['var(--green-100)', 'var(--green-700)'],
    ['var(--amber-100)', 'var(--amber-700)'],
    ['#e6ddf7', '#5b3da8'],
    ['#d9eef5', '#0f6f8c'],
    ['#fbdce4', '#a8325a'],
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const [bg, fg] = palette[hash % palette.length];

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: px, height: px, flex: 'none',
        borderRadius: square ? 'var(--radius-md)' : '50%',
        background: src ? 'var(--slate-100)' : bg, color: fg,
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)',
        fontSize: fontPx, letterSpacing: '-0.01em', overflow: 'hidden',
        border: '1px solid rgba(19,27,39,0.06)', userSelect: 'none', ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </span>
  );
}
