import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Icon } from '../components/Icon.jsx';
import { ExpectedVsReceived } from '../charts/ExpectedVsReceived.jsx';
import { CollectionTrend } from '../charts/CollectionTrend.jsx';
import { DonutGauge } from '../charts/DonutGauge.jsx';
import { stats as mockStats, monthly as mockMonthly, transactions, fmtRs } from '../data/mockData.js';
import { useDashboardStats } from '../hooks/usePayments.js';
import { usePayments } from '../hooks/usePayments.js';
import { useApp } from '../context/AppContext.jsx';

const Legend = () => (
  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
    <Dot c="#a9d2ee" t="Expected" />
    <Dot c="#248dce" t="Received" />
  </div>
);
const Dot = ({ c, t }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>
    <span style={{ width: 9, height: 9, borderRadius: 3, background: c }} />
    {t}
  </span>
);
const KV = ({ label, value, color }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 'var(--fs-h4)', fontWeight: 800, color: color || 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
  </div>
);

export function Dashboard({ isMobile, onNavigate }) {
  const { academy } = useApp();
  const { stats: liveStats, monthly: liveMonthly, loading: statsLoading } = useDashboardStats();
  const { payments } = usePayments();

  const s       = (academy && liveStats) ? liveStats : mockStats;
  const monthly = (academy && liveMonthly?.length) ? liveMonthly : mockMonthly;
  const recentPayments = academy && payments.length
    ? payments.slice(0, 5).map(p => ({
        id: p.id,
        student: p.student?.name || '—',
        cls: p.student?.class?.name || '—',
        method: p.method?.replace('_', ' ') || '—',
        amount: p.amount,
        date: new Date(p.payment_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }),
      }))
    : transactions.slice(0, 5);

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <StatCard label="Total Students" value={s.totalStudents.toLocaleString()} tone="brand" icon={<Icon name="users" size={18} />} style={{ padding: 14 }} />
          <StatCard label="Collection %" value={s.rate + '%'} tone="brand" icon={<Icon name="trending" size={18} />} progress={s.rate} progressVariant="success" style={{ padding: 14 }} />
          <StatCard label="Collected" value={fmtRs(s.collected)} tone="success" icon={<Icon name="wallet" size={18} />} style={{ padding: 14 }} />
          <StatCard label="Pending" value={fmtRs(s.pending)} tone="warning" icon={<Icon name="clock" size={18} />} style={{ padding: 14 }} />
        </div>
        <Card title="Collection Rate" style={{ marginBottom: 14 }}>
          <div style={{ display: 'grid', placeItems: 'center', padding: '6px 0 10px' }}>
            <DonutGauge value={s.rate} size={140} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
            <KV label="Collected" value={fmtRs(s.collected)} color="var(--green-600)" />
            <KV label="Pending" value={fmtRs(s.pending)} color="var(--amber-600)" />
          </div>
        </Card>
        <Card title="Recent Payments" padding="none" style={{ marginBottom: 14 }}>
          {recentPayments.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <Avatar name={t.student} size="sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.student}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.method}</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--text-strong)' }}>{fmtRs(t.amount)}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>{t.date}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card title="Collection Trend" subtitle="Fees received over the year">
          <CollectionTrend data={monthly} height={180} />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginBottom: 22 }}>
        <StatCard label="Total Students" value={s.totalStudents.toLocaleString()} tone="brand" icon={<Icon name="users" size={22} />} delta="4.6%" deltaDirection="up" />
        <StatCard label="Expected Fee" value={fmtRs(s.expected)} tone="navy" icon={<Icon name="calendar" size={22} />} footnote={new Date().toLocaleString('en', { month: 'long', year: 'numeric' })} />
        <StatCard label="Collected Fee" value={fmtRs(s.collected)} tone="success" icon={<Icon name="wallet" size={22} />} delta="8.2%" deltaDirection="up" />
        <StatCard label="Pending Fee" value={fmtRs(s.pending)} tone="warning" icon={<Icon name="clock" size={22} />} delta="3.1%" deltaDirection="down" />
        <StatCard label="Collection %" value={s.rate + '%'} tone="brand" icon={<Icon name="trending" size={22} />} progress={s.rate} progressVariant="success" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title="Expected vs Received" subtitle={`Monthly fee collection · ${new Date().getFullYear()}`} actions={<Legend />}>
          <ExpectedVsReceived data={monthly} />
        </Card>
        <Card title="Collection Rate" subtitle="This month">
          <div style={{ display: 'grid', placeItems: 'center', padding: '6px 0 14px' }}>
            <DonutGauge value={s.rate} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
            <KV label="Collected" value={fmtRs(s.collected)} color="var(--green-600)" />
            <KV label="Pending" value={fmtRs(s.pending)} color="var(--amber-600)" />
          </div>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Collection Trend" subtitle="Received fees over the year">
          <CollectionTrend data={monthly} />
        </Card>
        <Card title="Recent Payments" subtitle="Latest verified transactions" padding="none"
          actions={<Button size="sm" variant="ghost" iconRight={<Icon name="chevronRight" size={15} />} onClick={() => onNavigate?.('fees')}>View all</Button>}>
          {recentPayments.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <Avatar name={t.student} size="sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{t.student}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.cls} · {t.method}</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(t.amount)}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>{t.date}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
