import { useState, useEffect } from 'react';
import { Sidebar } from './layout/Sidebar.jsx';
import { Topbar } from './layout/Topbar.jsx';
import { MobileNav, MoreMenu, MobileHeader } from './layout/MobileNav.jsx';
import { Dashboard } from './screens/Dashboard.jsx';
import { Students } from './screens/Students.jsx';
import { FeeCollection } from './screens/FeeCollection.jsx';
import { Reports } from './screens/Reports.jsx';
import { Reminders } from './screens/Reminders.jsx';
import { Receipts } from './screens/Receipts.jsx';
import { Settings } from './screens/Settings.jsx';
import { Login } from './screens/Login.jsx';
import { Button } from './components/Button.jsx';
import { Icon } from './components/Icon.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

const SCREENS = {
  dashboard: Dashboard,
  students:  Students,
  fees:      FeeCollection,
  reports:   Reports,
  reminders: Reminders,
  receipts:  Receipts,
  settings:  Settings,
};

const TITLES = {
  dashboard: ['Dashboard', 'Fee collection overview · July 2025'],
  students:  ['Students', '1,284 enrolled across 24 classes'],
  fees:      ['Fee Collection', 'Record a payment from a screenshot'],
  reports:   ['Reports', 'Collection analytics & exports'],
  reminders: ['WhatsApp Reminders', 'Notify parents of pending fees'],
  receipts:  ['Receipts', 'Generate and share fee receipts'],
  settings:  ['Settings', 'Academy configuration'],
};

const MOBILE_MAIN_TABS = ['dashboard', 'students', 'fees', 'reminders'];

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

export function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

function AppInner() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [mobileTab, setMobileTab] = useState('dashboard');
  const isMobile = useIsMobile();

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
        <img src="/assets/logo-mark.svg" alt="" style={{ height: 40, marginBottom: 12, opacity: 0.5 }} />
        <div>Loading…</div>
      </div>
    </div>
  );

  if (!user) return <Login />;

  const navigate = key => {
    setPage(key);
    if (MOBILE_MAIN_TABS.includes(key)) setMobileTab(key);
    else setMobileTab('more');
  };

  if (isMobile) {
    return <MobileApp page={page} mobileTab={mobileTab} onNavigate={navigate} />;
  }

  const Screen = SCREENS[page];
  const [title, subtitle] = TITLES[page] || ['', ''];
  const action =
    page === 'dashboard' ? <Button variant="primary" iconLeft={<Icon name="plus" size={16} />}>Record Payment</Button>
    : page === 'students'  ? <Button variant="primary" iconLeft={<Icon name="plus" size={16} />}>Add Student</Button>
    : null;

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--color-bg)' }}>
      <Sidebar active={page} onNavigate={navigate} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Topbar title={title} subtitle={subtitle} action={action} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Screen />
        </div>
      </div>
    </div>
  );
}

function MobileApp({ page, mobileTab, onNavigate }) {
  const Screen = SCREENS[page];
  const isMore = !MOBILE_MAIN_TABS.includes(page);
  const isMoreTab = mobileTab === 'more';

  const getTitle = () => {
    if (isMore && isMoreTab && !Screen) return 'More';
    return TITLES[page]?.[0] || '';
  };

  const showBackOnMore = isMore && page !== 'more';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--color-bg)' }}>
      <MobileHeader
        title={getTitle()}
        onBack={showBackOnMore ? () => onNavigate('more') : null}
      />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {page === 'more' || (isMoreTab && !Screen)
          ? <MoreMenu onNavigate={onNavigate} />
          : <Screen isMobile />}
      </div>
      <MobileNav active={mobileTab} onNavigate={onNavigate} />
    </div>
  );
}
