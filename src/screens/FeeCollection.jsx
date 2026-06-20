import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Input } from '../components/Input.jsx';
import { Select } from '../components/Select.jsx';
import { Icon } from '../components/Icon.jsx';
import { useStudents } from '../hooks/useStudents.js';
import { usePayments } from '../hooks/usePayments.js';
import { fmtRs } from '../data/mockData.js';

function genMonths() {
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
    const label = d.toLocaleString('en', { month: 'long', year: 'numeric' });
    return { value, label };
  });
}

const METHOD_OPTIONS = [
  { label: 'Cash',          value: 'cash' },
  { label: 'Bank Transfer', value: 'bank_transfer' },
  { label: 'JazzCash',      value: 'jazzcash' },
  { label: 'EasyPaisa',     value: 'easypaisa' },
];

const EMPTY_FORM = {
  student_id: '', transaction_id: '', amount: '',
  fee_month: '', payment_date: new Date().toISOString().slice(0, 10), method: 'cash',
};

export function FeeCollection({ isMobile }) {
  const { students } = useStudents();
  const { recordPayment } = usePayments();

  const [drag, setDrag]     = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState('');
  const [form, setForm]     = useState(EMPTY_FORM);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const months = genMonths();

  const studentOptions = [
    { label: 'Select student', value: '' },
    ...students.map(s => ({
      label: `${s.name}${s.class?.name ? ' — ' + s.class.name : ''}`,
      value: s.id,
    })),
  ];

  const monthOptions = [
    { label: 'Select fee month', value: '' },
    ...months,
  ];

  async function handleSubmit() {
    if (!form.student_id) { setError('Please select a student.'); return; }
    if (!form.amount || isNaN(Number(form.amount))) { setError('Enter a valid amount.'); return; }
    if (!form.fee_month) { setError('Select a fee month.'); return; }
    if (!form.payment_date) { setError('Enter a payment date.'); return; }

    setSaving(true);
    setError('');
    setSuccess(false);

    const { error: err } = await recordPayment({
      student_id:     form.student_id,
      amount:         Number(form.amount),
      fee_month:      form.fee_month,
      payment_date:   form.payment_date,
      method:         form.method,
      transaction_id: form.transaction_id || null,
      status:         'paid',
    });

    setSaving(false);
    if (err) { setError(err.message || 'Failed to record payment.'); return; }
    setSuccess(true);
    setForm({ ...EMPTY_FORM, payment_date: new Date().toISOString().slice(0, 10) });
    setUploaded(false);
    setTimeout(() => setSuccess(false), 4000);
  }

  const UploadArea = () => (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); setUploaded(true); }}
      onClick={() => setUploaded(true)}
      style={{
        border: `2px dashed ${drag ? 'var(--blue-500)' : 'var(--border-default)'}`,
        background: drag ? 'var(--blue-50)' : 'var(--slate-50)',
        borderRadius: 'var(--radius-lg)', padding: isMobile ? '24px 16px' : '34px 20px',
        textAlign: 'center', cursor: 'pointer',
        transition: 'all var(--dur-base)',
      }}
    >
      <div style={{
        width: 52, height: 52, margin: '0 auto 12px', borderRadius: '50%',
        background: 'var(--blue-100)', display: 'grid', placeItems: 'center', color: 'var(--blue-600)',
      }}>
        <Icon name={uploaded ? 'check' : 'upload'} size={24} />
      </div>
      {uploaded ? (
        <>
          <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>receipt.png</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--green-600)', marginTop: 4, fontWeight: 600 }}>Uploaded · Click form to fill manually</div>
        </>
      ) : (
        <>
          <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Drag &amp; drop a screenshot here</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 4 }}>or click to browse · PNG, JPG up to 10MB</div>
        </>
      )}
    </div>
  );

  const PaymentForm = () => (
    <div style={{ display: 'grid', gap: 14 }}>
      {success && (
        <div style={{ padding: 12, background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 'var(--radius-md)', color: 'var(--green-700)', fontWeight: 600, fontSize: 'var(--fs-sm)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="check" size={16} /> Payment recorded successfully!
        </div>
      )}
      {error && (
        <div style={{ padding: 12, background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 'var(--radius-md)', color: 'var(--red-700)', fontSize: 'var(--fs-sm)' }}>
          {error}
        </div>
      )}
      <Select label="Student *" value={form.student_id} onChange={set('student_id')} options={studentOptions} />
      <Select label="Fee Month *" value={form.fee_month} onChange={set('fee_month')} options={monthOptions} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Input label="Transaction ID" value={form.transaction_id} onChange={set('transaction_id')} placeholder="TXN-…" />
        <Input label="Amount Received *" value={form.amount} onChange={set('amount')} placeholder="e.g. 3500" iconLeft={<span style={{ fontWeight: 700 }}>₨</span>} inputMode="numeric" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Select label="Payment Method" value={form.method} onChange={set('method')} options={METHOD_OPTIONS} />
        <Input label="Payment Date *" type="date" value={form.payment_date} onChange={set('payment_date')} iconLeft={<Icon name="calendar" size={15} />} />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <Card title="Upload Screenshot" subtitle="Attach payment proof" style={{ marginBottom: 14 }}>
          <UploadArea />
        </Card>
        <Card title="Record Payment" footer={
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="primary" fullWidth loading={saving} iconLeft={<Icon name="checkSmall" size={16} />} onClick={handleSubmit}>Confirm Payment</Button>
            <Button variant="secondary" onClick={() => { setForm(EMPTY_FORM); setError(''); }}>Clear</Button>
          </div>
        }>
          <PaymentForm />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Upload Payment Screenshot" subtitle="Attach payment proof (optional)">
          <UploadArea />
        </Card>
        <Card title="Record Payment" subtitle="Enter the payment details"
          footer={
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="primary" fullWidth loading={saving} iconLeft={<Icon name="checkSmall" size={16} />} onClick={handleSubmit}>Confirm Payment</Button>
              <Button variant="secondary" onClick={() => { setForm(EMPTY_FORM); setError(''); }}>Clear</Button>
            </div>
          }>
          <PaymentForm />
        </Card>
      </div>
    </div>
  );
}
