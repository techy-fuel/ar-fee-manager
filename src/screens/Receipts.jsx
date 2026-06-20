import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Input } from '../components/Input.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';
import { usePayments } from '../hooks/usePayments.js';
import { useApp } from '../context/AppContext.jsx';
import { fmtRs } from '../data/mockData.js';

function receiptNo(payment) {
  const year = payment.payment_date
    ? new Date(payment.payment_date).getFullYear()
    : new Date().getFullYear();
  return `REC-${year}-${(payment.id || '').slice(-5).toUpperCase()}`;
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtMonth(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en', { month: 'long', year: 'numeric' });
}

function methodLabel(m) {
  return { cash: 'Cash', bank_transfer: 'Bank Transfer', jazzcash: 'JazzCash', easypaisa: 'EasyPaisa' }[m] || (m || 'Cash');
}

const RField = ({ label, value, mono }) => (
  <div>
    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-strong)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</div>
  </div>
);

function ReceiptCard({ payment, academy, compact = false }) {
  const academyName = academy?.name || 'Al Rehman Academy';
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)',
      overflow: 'hidden', maxWidth: compact ? '100%' : 560,
    }}>
      <div style={{ background: 'var(--navy-900)', padding: compact ? '18px 20px' : '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: compact ? 18 : 22, letterSpacing: '-0.01em' }}>{academyName}</div>
        <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.85)' }}>
          <div style={{ fontWeight: 800, fontSize: compact ? 13 : 15, color: '#fff' }}>FEE RECEIPT</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>{receiptNo(payment)}</div>
        </div>
      </div>
      <div style={{ padding: compact ? 18 : 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: compact ? 14 : 18, marginBottom: compact ? 16 : 22 }}>
          <RField label="Student Name" value={payment.student?.name || '—'} />
          <RField label="Class" value={payment.student?.class?.name || '—'} />
          <RField label="Receipt Date" value={fmtDate(payment.payment_date || payment.created_at)} />
          <RField label="Fee Month" value={fmtMonth(payment.fee_month)} />
          <RField label="Transaction ID" value={payment.transaction_id || receiptNo(payment)} mono />
          <RField label="Payment Method" value={methodLabel(payment.method)} />
        </div>
        <div style={{ borderTop: '1px dashed var(--border-default)', paddingTop: compact ? 14 : 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
            <span>Monthly Tuition Fee</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>₨ {Number(payment.amount || 0).toLocaleString()}.00</span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: compact ? '10px 14px' : '14px 16px', marginTop: 8,
            background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)',
          }}>
            <span style={{ fontWeight: 700, color: 'var(--green-700)' }}>Amount Paid</span>
            <span style={{ fontWeight: 800, fontSize: compact ? 18 : 22, color: 'var(--green-700)', fontFamily: 'var(--font-mono)' }}>₨ {Number(payment.amount || 0).toLocaleString()}.00</span>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Badge variant="success" dot>Paid · Verified</Badge>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>Computer-generated · {academyName}</span>
        </div>
      </div>
    </div>
  );
}

const EMPTY_RECEIPT = {
  id: 'preview',
  student: { name: '—', class: { name: '—' } },
  payment_date: null,
  fee_month: null,
  transaction_id: null,
  method: 'cash',
  amount: 0,
};

export function Receipts({ isMobile }) {
  const { academy } = useApp();
  const { payments, loading } = usePayments();
  const [selected, setSelected] = useState(null);
  const [q, setQ]               = useState('');
  const [downloading, setDownloading] = useState(false);

  const filtered = payments.filter(p => {
    if (!q) return true;
    const name = (p.student?.name || '').toLowerCase();
    const cls  = (p.student?.class?.name || '').toLowerCase();
    return name.includes(q.toLowerCase()) || cls.includes(q.toLowerCase());
  });

  const current = selected || filtered[0] || null;

  async function handleDownload() {
    if (!current) return;
    setDownloading(true);
    const { downloadReceiptPdf } = await import('../lib/generateReceiptPdf.jsx');
    await downloadReceiptPdf({
      receiptNo:   receiptNo(current),
      studentName: current.student?.name || '—',
      className:   current.student?.class?.name || '—',
      date:        fmtDate(current.payment_date || current.created_at),
      feeMonth:    fmtMonth(current.fee_month),
      transactionId: current.transaction_id || receiptNo(current),
      method:      methodLabel(current.method),
      amount:      Number(current.amount || 0),
      academyName: academy?.name || 'Al Rehman Academy',
    });
    setDownloading(false);
  }

  function handleWhatsApp() {
    if (!current) return;
    const phone = current.student?.parent_phone?.replace(/\D/g, '') || '';
    const name  = current.student?.name || '';
    const msg   = encodeURIComponent(`Assalamu Alaikum! Dear parent of ${name}, your fee of Rs ${Number(current.amount).toLocaleString()} for ${fmtMonth(current.fee_month)} has been received. Receipt No: ${receiptNo(current)}. JazakAllah Khair.`);
    if (phone) window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  }

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <div style={{ marginBottom: 12 }}>
          <Input value={q} onChange={e => { setQ(e.target.value); setSelected(null); }} placeholder="Search by student…" iconLeft={<Icon name="search" size={16} />} />
        </div>
        {loading && <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>Loading…</div>}
        {!loading && !current && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
            No payments found. Record a payment first.
          </div>
        )}
        {current && (
          <>
            <ReceiptCard payment={current} academy={academy} compact />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <Button variant="primary" fullWidth loading={downloading} iconLeft={<Icon name="download" size={16} />} onClick={handleDownload}>Download PDF</Button>
              <Button variant="secondary" fullWidth iconLeft={<Icon name="print" size={16} />} onClick={() => window.print()}>Print</Button>
              <Button variant="whatsapp" fullWidth iconLeft={<WhatsAppIcon size={15} color="#fff" />} onClick={handleWhatsApp}>Send to Parent</Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
        {/* Left: payment list */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <Input value={q} onChange={e => { setQ(e.target.value); setSelected(null); }} placeholder="Search payments…" iconLeft={<Icon name="search" size={16} />} />
          </div>
          <Card padding="none">
            {loading && <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>Loading…</div>}
            {!loading && filtered.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
                No payments found.
              </div>
            )}
            {filtered.slice(0, 30).map((p, i) => {
              const active = (selected?.id || filtered[0]?.id) === p.id;
              return (
                <div key={p.id} onClick={() => setSelected(p)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                  borderTop: i ? '1px solid var(--border-subtle)' : 'none',
                  background: active ? 'var(--blue-50)' : 'transparent',
                  cursor: 'pointer',
                  borderLeft: active ? '3px solid var(--blue-500)' : '3px solid transparent',
                }}>
                  <Avatar name={p.student?.name || '?'} size="sm" />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.student?.name || '—'}
                    </div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                      {fmtDate(p.payment_date)} · {fmtRs(p.amount)}
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* Right: receipt preview + actions */}
        <div>
          {!loading && !current ? (
            <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
              Record a payment to generate receipts.
            </div>
          ) : current ? (
            <>
              <ReceiptCard payment={current} academy={academy} />
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <Button variant="primary" loading={downloading} iconLeft={<Icon name="download" size={16} />} onClick={handleDownload}>Download PDF</Button>
                <Button variant="secondary" iconLeft={<Icon name="print" size={16} />} onClick={() => window.print()}>Print</Button>
                <Button variant="whatsapp" iconLeft={<WhatsAppIcon size={15} color="#fff" />} onClick={handleWhatsApp}>Send to Parent</Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
