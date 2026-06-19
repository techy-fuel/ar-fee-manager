import { useEffect } from 'react';
import { Button } from './Button.jsx';
import { Icon } from './Icon.jsx';

export function Modal({ open, onClose, title, children, footer, width = 480 }) {
  useEffect(() => {
    if (!open) return;
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(2px)',
        display: 'grid', placeItems: 'center', padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xl)',
          width: '100%', maxWidth: width, maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 700, color: 'var(--text-strong)' }}>{title}</h2>
          <button onClick={onClose} style={{ width: 30, height: 30, border: '1px solid var(--border-subtle)', background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>
            <Icon name="close" size={16} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
          {children}
        </div>
        {footer && (
          <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
