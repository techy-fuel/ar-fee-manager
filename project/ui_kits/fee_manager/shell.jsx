/* Al Rehman Fee Manager UI Kit — app shell (Sidebar + Topbar). */
(function () {
  const { Avatar, Badge } = window.AlRehmanFeeManagerDesignSystem_ad9d9e;
  const Icon = window.Icon;

  const NAV = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'students', label: 'Students', icon: 'users' },
    { key: 'fees', label: 'Fee Collection', icon: 'wallet' },
    { key: 'reports', label: 'Reports', icon: 'report' },
    { key: 'reminders', label: 'WhatsApp Reminders', icon: 'phone' },
    { key: 'receipts', label: 'Receipts', icon: 'receipt' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ];

  function Sidebar({ active, onNavigate }) {
    return (
      <aside style={{
        width: 'var(--sidebar-width)', flex: 'none', background: 'var(--color-sidebar)',
        height: '100%', display: 'flex', flexDirection: 'column', position: 'relative',
      }}>
        <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="../../assets/logo-mark-white.svg" alt="" style={{ height: 36 }} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>Al Rehman</div>
            <div style={{ color: 'var(--text-on-dark-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Fee Manager</div>
          </div>
        </div>
        <nav style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {NAV.map((n) => {
            const on = active === n.key;
            return (
              <button key={n.key} onClick={() => onNavigate(n.key)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                background: on ? 'var(--color-sidebar-active)' : 'transparent',
                color: on ? '#fff' : 'var(--text-on-dark-muted)',
                fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: on ? 700 : 600,
                textAlign: 'left', transition: 'background var(--dur-fast), color var(--dur-fast)',
                boxShadow: on ? '0 4px 12px rgba(36,141,206,0.35)' : 'none',
              }}
                onMouseEnter={(e) => { if (!on) { e.currentTarget.style.background = 'var(--color-sidebar-hover)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={(e) => { if (!on) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-on-dark-muted)'; } }}
              >
                <Icon name={n.icon} size={19} />
                <span style={{ whiteSpace: 'nowrap' }}>{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div style={{ margin: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name="Imran Saleem" size="sm" />
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Imran Saleem</div>
              <div style={{ color: 'var(--text-on-dark-muted)', fontSize: 11 }}>Administrator</div>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-on-dark-muted)', display: 'inline-flex' }}><Icon name="logout" size={16} /></span>
          </div>
        </div>
      </aside>
    );
  }

  function Topbar({ title, subtitle, action }) {
    return (
      <header style={{
        height: 'var(--topbar-height)', flex: 'none', background: 'var(--color-surface)',
        borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center',
        gap: 16, padding: '0 28px',
      }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-0.01em', margin: 0 }}>{title}</h1>
          {subtitle && <p style={{ margin: '1px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{subtitle}</p>}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 38, padding: '0 12px', background: 'var(--slate-50)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', width: 240 }}>
            <Icon name="search" size={16} color="var(--text-faint)" />
            <input placeholder="Search…" style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 'var(--fs-sm)', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', width: '100%' }} />
          </div>
          <button style={{ position: 'relative', width: 38, height: 38, display: 'grid', placeItems: 'center', background: 'var(--color-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <Icon name="bell" size={18} />
            <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: '50%', background: 'var(--red-500)', border: '1.5px solid #fff' }} />
          </button>
          {action}
        </div>
      </header>
    );
  }

  Object.assign(window, { Sidebar, Topbar, NAV });
})();
