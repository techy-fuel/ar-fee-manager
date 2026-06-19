import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';
import { useReminders } from '../hooks/useReminders.js';
import { fmtRs } from '../data/mockData.js';

function waLink(phone, name, amount) {
  const num = phone?.replace(/\D/g, '') || '';
  const msg = encodeURIComponent(`Assalamu Alaikum! Dear parent of ${name}, your fee of Rs ${amount.toLocaleString()} is due this month. Please pay at your earliest. JazakAllah Khair.`);
  return `https://wa.me/${num}?text=${msg}`;
}

export function Reminders({ isMobile }) {
  const { reminders, pending, loading, sendReminder, sendAll } = useReminders();
  const [sent, setSent]       = useState({});
  const [sendingAll, setSendingAll] = useState(false);

  async function handleSendOne(s) {
    const amount = s.class?.monthly_fee ?? 0;
    const { error } = await sendReminder(s.id, amount);
    if (!error) {
      setSent(prev => ({ ...prev, [s.id]: true }));
      if (s.parent_phone) {
        window.open(waLink(s.parent_phone, s.name, amount), '_blank');
      }
    }
  }

  async function handleSendAll() {
    setSendingAll(true);
    const { error } = await sendAll();
    if (!error) {
      setSent(Object.fromEntries(pending.map(s => [s.id, true])));
    }
    setSendingAll(false);
  }

  const normalizedPending = pending;
  const normalizedReminders = reminders;

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 700, color: 'var(--text-strong)' }}>Pending Fees</h2>
            <p style={{ margin: '2px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
              {loading ? 'Loading…' : `${normalizedPending.length} parents to remind`}
            </p>
          </div>
          <Button variant="whatsapp" size="sm" loading={sendingAll} iconLeft={<WhatsAppIcon size={14} color="#fff" />} onClick={handleSendAll}>Send All</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {normalizedPending.map(s => (
            <div key={s.id} style={{ background: 'var(--color-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 14, boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name={s.name} size="sm" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{s.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.class?.name || '—'}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--amber-600)', fontVariantNumeric: 'tabular-nums' }}>
                  {fmtRs(s.class?.monthly_fee ?? 0)}
                </span>
              </div>
              {sent[s.id]
                ? <Badge variant="success" dot>Reminder Sent</Badge>
                : <Button variant="whatsapp" size="sm" fullWidth iconLeft={<WhatsAppIcon size={14} color="#fff" />} onClick={() => handleSendOne(s)}>Send Reminder</Button>}
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
            <div key={r.id || i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-50)', display: 'grid', placeItems: 'center', color: 'var(--whatsapp-dark)', flex: 'none' }}>
                <WhatsAppIcon size={15} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{r.student?.name || '—'}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                  {fmtRs(r.amount)} · {new Date(r.sent_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <span style={{ marginLeft: 'auto' }}>
                {r.status === 'failed' ? <Badge variant="danger">Failed</Badge> : <Badge variant="neutral">Sent</Badge>}
              </span>
            </div>
          ))}
          {normalizedReminders.length === 0 && !loading && (
            <div style={{ padding: '24px 20px', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', textAlign: 'center' }}>
              No reminders sent yet.
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <Card
          title="Pending Fee Students"
          subtitle={loading ? 'Loading…' : `${normalizedPending.length} parents to remind`}
          padding="none"
          actions={
            <Button variant="whatsapp" size="sm" loading={sendingAll} iconLeft={<WhatsAppIcon size={15} color="#fff" />} onClick={handleSendAll}>
              Send to All
            </Button>
          }>
          {normalizedPending.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <Avatar name={s.name} size="sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{s.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                  {s.class?.name || '—'}{s.parent_phone ? ` · ${s.parent_phone}` : ''}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--amber-600)', fontVariantNumeric: 'tabular-nums' }}>
                  {fmtRs(s.class?.monthly_fee ?? 0)}
                </span>
                {sent[s.id]
                  ? <Badge variant="success" dot>Sent</Badge>
                  : <Button variant="whatsapp" size="sm" iconLeft={<WhatsAppIcon size={14} color="#fff" />} onClick={() => handleSendOne(s)}>Remind</Button>}
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
            <div key={r.id || i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--green-50)', display: 'grid', placeItems: 'center', color: 'var(--whatsapp-dark)' }}>
                <WhatsAppIcon size={17} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{r.student?.name || '—'}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                  {fmtRs(r.amount)} · {new Date(r.sent_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <span style={{ marginLeft: 'auto' }}>
                {r.status === 'failed' ? <Badge variant="danger">Failed</Badge> : <Badge variant="neutral">Sent</Badge>}
              </span>
            </div>
          ))}
          {normalizedReminders.length === 0 && !loading && (
            <div style={{ padding: '24px 20px', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', textAlign: 'center' }}>
              No reminders sent yet.
            </div>
          )}
          <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)', background: 'var(--slate-50)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
            <Icon name="clock" size={14} /> Click "Remind" to open WhatsApp with a pre-filled message
          </div>
        </Card>
      </div>
    </div>
  );
}
