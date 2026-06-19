import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';
import { pending as mockPending, reminders as mockReminders, fmtRs } from '../data/mockData.js';

export function Reminders({ isMobile }) {
  const [sent, setSent] = useState({});

  const normalizedPending   = mockPending;
  const normalizedReminders = mockReminders;
  const loading = false;

  function handleSendAll() {
    setSent(Object.fromEntries(mockPending.map(p => [p.id, true])));
  }

  function handleSendOne(id) {
    setSent(prev => ({ ...prev, [id]: true }));
  }

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 700, color: 'var(--text-strong)' }}>Pending Fees</h2>
            <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{normalizedPending.length} parents to remind</p>
          </div>
          <Button variant="whatsapp" size="sm" iconLeft={<WhatsAppIcon size={14} color="#fff" />} onClick={handleSendAll}>Send All</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {normalizedPending.map(s => (
            <div key={s.id} style={{ background: 'var(--color-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 14, boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name={s.name} size="sm" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{s.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.cls}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--amber-600)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.fee)}</span>
              </div>
              {sent[s.id]
                ? <Badge variant="success" dot>Reminder Sent</Badge>
                : <Button variant="whatsapp" size="sm" fullWidth iconLeft={<WhatsAppIcon size={14} color="#fff" />} onClick={() => handleSendOne(s.id, s.fee)}>Send Reminder</Button>}
            </div>
          ))}
          {normalizedPending.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
              All fees paid for this month!
            </div>
          )}
        </div>
        <Card title="Reminder History" padding="none">
          {normalizedReminders.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-50)', display: 'grid', placeItems: 'center', color: 'var(--whatsapp-dark)', flex: 'none' }}>
                <WhatsAppIcon size={15} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{r.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{fmtRs(r.amount)} · {r.sent}</div>
              </div>
              <span style={{ marginLeft: 'auto' }}>
                {r.status === 'Failed' ? <Badge variant="danger">Failed</Badge> : <Badge variant="neutral">{r.status}</Badge>}
              </span>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <Card title="Pending Fee Students" subtitle={`${normalizedPending.length} parents to remind`} padding="none"
          actions={<Button variant="whatsapp" size="sm" iconLeft={<WhatsAppIcon size={15} color="#fff" />} onClick={handleSendAll}>Send to All</Button>}>
          {normalizedPending.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <Avatar name={s.name} size="sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{s.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.cls} · {s.wa}</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--amber-600)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.fee)}</span>
                {sent[s.id]
                  ? <Badge variant="success" dot>Sent</Badge>
                  : <Button variant="whatsapp" size="sm" iconLeft={<WhatsAppIcon size={14} color="#fff" />} onClick={() => handleSendOne(s.id, s.fee)}>Remind</Button>}
              </div>
            </div>
          ))}
          {normalizedPending.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
              All fees paid for this month!
            </div>
          )}
        </Card>
        <Card title="Reminder History" subtitle="Recent activity" padding="none">
          {normalizedReminders.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--green-50)', display: 'grid', placeItems: 'center', color: 'var(--whatsapp-dark)' }}>
                <WhatsAppIcon size={17} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{r.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{fmtRs(r.amount)} · {r.sent}</div>
              </div>
              <span style={{ marginLeft: 'auto' }}>
                {r.status === 'Failed' ? <Badge variant="danger">Failed</Badge> : <Badge variant="neutral">{r.status}</Badge>}
              </span>
            </div>
          ))}
          <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)', background: 'var(--slate-50)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
            <Icon name="clock" size={14} /> Automated reminders run every Monday at 9:00 AM
          </div>
        </Card>
      </div>
    </div>
  );
}
