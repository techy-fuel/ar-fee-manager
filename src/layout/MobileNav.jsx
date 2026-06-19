import { Icon, WhatsAppIcon } from '../components/Icon.jsx';

const TABS = [
  { key: 'dashboard', label: 'Home',     icon: 'home' },
  { key: 'students',  label: 'Students', icon: 'users' },
  { key: 'fees',      label: 'Collect',  icon: 'collect' },
  { key: 'reminders', label: 'Remind',   icon: 'phone' },
  { key: 'more',      label: 'More',     icon: 'grid' },
];

export function MobileNav({ active, onNavigate }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'var(--mobile-nav-h)',
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex', alignItems: 'stretch',
      zIndex: 100,
      boxShadow: '0 -4px 16px rgba(19,27,39,0.06)',
    }}>
      {TABS.map(tab => {
        const on = active === tab.key || (tab.key === 'more' && !TABS.slice(0, 4).some(t => t.key === active));
        const isWa = tab.key === 'reminders';
        return (
          <button
            key={tab.key}
            onClick={() => onNavigate(tab.key)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 4, border: 'none', background: 'transparent',
              cursor: 'pointer', padding: '8px 4px',
              color: on ? 'var(--color-primary)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast)',
            }}
          >
            {isWa && on
              ? <WhatsAppIcon size={20} color="var(--whatsapp)" />
              : <Icon name={tab.icon} size={20} />}
            <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: on ? 700 : 600 }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

const MORE_ITEMS = [
  { key: 'reports',  label: 'Reports',       icon: 'report',   subtitle: 'Monthly & yearly analytics' },
  { key: 'receipts', label: 'Receipts',      icon: 'receipt',  subtitle: 'Generate & share receipts' },
  { key: 'settings', label: 'Settings',      icon: 'settings', subtitle: 'Academy configuration' },
];

export function MoreMenu({ onNavigate }) {
  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800, color: 'var(--text-strong)', marginBottom: 16, letterSpacing: '-0.01em' }}>More</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MORE_ITEMS.map(item => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: 'var(--color-surface)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', cursor: 'pointer', textAlign: 'left', width: '100%',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <span style={{
              width: 42, height: 42, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center',
              background: 'var(--blue-50)', color: 'var(--blue-600)', flex: 'none',
            }}>
              <Icon name={item.icon} size={20} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-strong)' }}>{item.label}</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{item.subtitle}</div>
            </div>
            <Icon name="chevronRight" size={18} color="var(--text-faint)" style={{ marginLeft: 'auto' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function MobileHeader({ title, onBack }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '0 16px', height: 56,
    }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
        >
          <Icon name="chevronLeft" size={20} />
        </button>
      )}
      <h1 style={{ fontSize: 'var(--fs-h4)', fontWeight: 800, color: 'var(--text-strong)', margin: 0, letterSpacing: '-0.01em' }}>{title}</h1>
    </header>
  );
}
