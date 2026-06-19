import { Avatar } from '../components/Avatar.jsx';
import { Icon } from '../components/Icon.jsx';

const NAV = [
  { key: 'dashboard', label: 'Dashboard',          icon: 'dashboard' },
  { key: 'students',  label: 'Students',            icon: 'users' },
  { key: 'fees',      label: 'Fee Collection',      icon: 'wallet' },
  { key: 'reports',   label: 'Reports',             icon: 'report' },
  { key: 'reminders', label: 'WhatsApp Reminders',  icon: 'phone' },
  { key: 'receipts',  label: 'Receipts',            icon: 'receipt' },
  { key: 'settings',  label: 'Settings',            icon: 'settings' },
];

export function Sidebar({ active, onNavigate }) {
  const academyName = 'Al Rehman Academy';
  const userName = 'Administrator';
  const userRole = 'Administrator';

  return (
    <aside style={{
      width: 'var(--sidebar-width)', flex: 'none',
      background: 'var(--color-sidebar)',
      height: '100%', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/assets/logo-mark-white.svg" alt="" style={{ height: 36 }} />
        <div style={{ lineHeight: 1.1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>{academyName}</div>
          <div style={{ color: 'var(--text-on-dark-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Fee Manager</div>
        </div>
      </div>

      <nav style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {NAV.map(n => {
          const on = active === n.key;
          return (
            <NavItem key={n.key} {...n} active={on} onClick={() => onNavigate(n.key)} />
          );
        })}
      </nav>

      <div style={{ margin: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={userName} size="sm" />
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
            <div style={{ color: 'var(--text-on-dark-muted)', fontSize: 11 }}>{userRole}</div>
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--text-on-dark-muted)', display: 'inline-flex' }}>
            <Icon name="settings" size={16} />
          </span>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ key: _k, label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
        border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
        background: active ? 'var(--color-sidebar-active)' : 'transparent',
        color: active ? '#fff' : 'var(--text-on-dark-muted)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: active ? 700 : 600,
        textAlign: 'left', transition: 'background var(--dur-fast), color var(--dur-fast)',
        boxShadow: active ? '0 4px 12px rgba(36,141,206,0.35)' : 'none',
        width: '100%',
      }}
      onMouseEnter={e => {
        if (!active) { e.currentTarget.style.background = 'var(--color-sidebar-hover)'; e.currentTarget.style.color = '#fff'; }
      }}
      onMouseLeave={e => {
        if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-on-dark-muted)'; }
      }}
    >
      <Icon name={icon} size={19} />
      <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
    </button>
  );
}
