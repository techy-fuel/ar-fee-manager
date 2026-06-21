import { Icon } from '../components/Icon.jsx';

export function Topbar({ title, subtitle, action, searchQuery = '', onSearch }) {
  return (
    <header style={{
      height: 'var(--topbar-height)', flex: 'none',
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px',
    }}>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-0.01em', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ margin: '1px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, height: 38, padding: '0 12px',
          background: 'var(--slate-50)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)', width: 240,
        }}>
          <Icon name="search" size={16} color="var(--text-faint)" />
          <input
            value={searchQuery}
            onChange={e => onSearch?.(e.target.value)}
            placeholder="Search…"
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: 'var(--fs-sm)', fontFamily: 'var(--font-sans)',
              color: 'var(--text-primary)', width: '100%',
            }}
          />
        </div>
        <button style={{
          position: 'relative', width: 38, height: 38, display: 'grid', placeItems: 'center',
          background: 'var(--color-surface)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-secondary)',
        }}>
          <Icon name="bell" size={18} />
          <span style={{
            position: 'absolute', top: 7, right: 8, width: 7, height: 7,
            borderRadius: '50%', background: 'var(--red-500)', border: '1.5px solid #fff',
          }} />
        </button>
        {action}
      </div>
    </header>
  );
}
