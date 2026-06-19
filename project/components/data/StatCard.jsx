import React from 'react';
import { ProgressBar } from './ProgressBar.jsx';

/**
 * Al Rehman Fee Manager — StatCard
 * Dashboard KPI card: tinted icon, big value, trend delta, optional progress meter.
 */
export function StatCard({
  label,
  value,
  icon = null,
  tone = 'brand',
  delta = null,
  deltaDirection = 'up',
  deltaLabel = 'vs last month',
  progress = null,
  progressVariant = null,
  footnote = null,
  style = {},
  ...rest
}) {
  const tones = {
    brand:   { bg: 'var(--blue-50)',   fg: 'var(--blue-600)' },
    success: { bg: 'var(--green-50)',  fg: 'var(--green-600)' },
    warning: { bg: 'var(--amber-50)',  fg: 'var(--amber-600)' },
    danger:  { bg: 'var(--red-50)',    fg: 'var(--red-600)' },
    navy:    { bg: 'var(--slate-100)', fg: 'var(--navy-800)' },
  };
  const t = tones[tone] || tones.brand;
  const up = deltaDirection === 'up';
  const deltaColor = up ? 'var(--green-600)' : 'var(--red-600)';
  const deltaBg = up ? 'var(--green-50)' : 'var(--red-50)';

  return (
    <div
      style={{
        background: 'var(--color-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--card-radius)', boxShadow: 'var(--card-shadow)',
        padding: 'var(--space-5)', display: 'flex', flexDirection: 'column',
        gap: 'var(--space-4)', ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)', letterSpacing: 'var(--ls-snug)' }}>
            {label}
          </div>
          <div style={{ marginTop: 6, fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-extra)', color: 'var(--text-strong)', letterSpacing: 'var(--ls-tight)', lineHeight: 1.05, fontVariantNumeric: 'tabular-nums' }}>
            {value}
          </div>
        </div>
        {icon && (
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, flex: 'none', borderRadius: 'var(--radius-md)', background: t.bg, color: t.fg }}>
            {icon}
          </span>
        )}
      </div>

      {(delta != null || footnote) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {delta != null && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: deltaBg, color: deltaColor, fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: up ? 'none' : 'scaleY(-1)' }}>
                <polyline points="3 17 9 11 13 15 21 7" />
                <polyline points="15 7 21 7 21 13" />
              </svg>
              {delta}
            </span>
          )}
          {deltaLabel && delta != null && (
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>{deltaLabel}</span>
          )}
          {footnote && <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{footnote}</span>}
        </div>
      )}

      {progress != null && (
        <ProgressBar value={progress} variant={progressVariant || tone} size="sm" />
      )}
    </div>
  );
}
