import { useState, useRef } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Input } from '../components/Input.jsx';
import { Select } from '../components/Select.jsx';
import { Icon } from '../components/Icon.jsx';
import { useStudents } from '../hooks/useStudents.js';
import { usePayments } from '../hooks/usePayments.js';

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

export function FeeCollection({ isMobile, onNavigate }) {
  const { students, loading: studentsLoading } = useStudents();
  const { recordPayment } = usePayments();

  const fileRef = useRef(null);
  const [drag, setDrag]         = useState(false);
  const [file, setFile]         = useState(null);   // { name, url }
  const [saving, setSaving]     = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');
  const [form, setForm]         = useState(EMPTY_FORM);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const months = genMonths();

  const studentOptions = [
    { label: 'Select student', value: '' },
    ...students.map(s => ({
      label: `${s.name}${s.class?.name ? ' — ' + s.class.name : ''}`,
      value: s.id,
    })),
  ];

  const monthOptions = [{ label: 'Select fee month', value: '' }, ...months];

  function handleFile(f) {
    if (!f) return;
    if (file?.url) URL.revokeObjectURL(file.url);
    const url = f.type.startsWith('image/') ? URL.createObjectURL(f) : null;
    setFile({ name: f.name, url, size: f.size });

    // Auto-fill amount if the filename contains a number (e.g. "3500.png")
    const m = f.name.match(/(\d{3,6})/);
    if (m && !form.amount) setForm(prev => ({ ...prev, amount: m[1] }));
  }

  function clearFile() {
    if (file?.url) URL.revokeObjectURL(file.url);
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  }

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
    clearFile();
    setTimeout(() => setSuccess(false), 4000);
  }

  const noStudents = !studentsLoading && students.length === 0;

  const uploadArea = (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
      onClick={() => fileRef.current?.click()}
      style={{
        border: `2px dashed ${drag ? 'var(--blue-500)' : 'var(--border-default)'}`,
        background: drag ? 'var(--blue-50)' : 'var(--slate-50)',
        borderRadius: 'var(--radius-lg)', padding: isMobile ? '24px 16px' : '34px 20px',
        textAlign: 'center', cursor: 'pointer', transition: 'all var(--dur-base)',
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files?.[0])}
      />
      {file ? (
        <>
          {file.url ? (
            <img src={file.url} alt={file.name} style={{ maxHeight: 120, maxWidth: '100%', borderRadius: 'var(--radius-md)', margin: '0 auto 10px', display: 'block', boxShadow: 'var(--shadow-sm)' }} />
          ) : (
            <div style={{ width: 52, height: 52, margin: '0 auto 12px', borderRadius: '50%', background: 'var(--green-100)', display: 'grid', placeItems: 'center', color: 'var(--green-600)' }}>
              <Icon name="check" size={24} />
            </div>
          )}
          <div style={{ fontWeight: 700, color: 'var(--text-strong)', wordBreak: 'break-all' }}>{file.name}</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--green-600)', marginTop: 4, fontWeight: 600 }}>
            {(file.size / 1024).toFixed(0)} KB · attached
          </div>
          <button
            onClick={e => { e.stopPropagation(); clearFile(); }}
            style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--blue-600)', cursor: 'pointer', fontSize: 'var(--fs-xs)', fontWeight: 600 }}
          >
            Remove
          </button>
        </>
      ) : (
        <>
          <div style={{ width: 52, height: 52, margin: '0 auto 12px', borderRadius: '50%', background: 'var(--blue-100)', display: 'grid', placeItems: 'center', color: 'var(--blue-600)' }}>
            <Icon name="upload" size={24} />
          </div>
          <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Drag &amp; drop a screenshot here</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 4 }}>or click to browse · PNG, JPG up to 10MB</div>
        </>
      )}
    </div>
  );

  const paymentForm = (
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
      {noStudents && (
        <div style={{ padding: 12, background: 'var(--amber-50)', border: '1px solid var(--amber-200)', borderRadius: 'var(--radius-md)', color: 'var(--amber-700)', fontSize: 'var(--fs-sm)' }}>
          No students added yet.{' '}
          <span style={{ color: 'var(--blue-600)', cursor: 'pointer', fontWeight: 700 }} onClick={() => onNavigate?.('students')}>
            Add a student first →
          </span>
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
          {uploadArea}
        </Card>
        <Card title="Record Payment" footer={
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="primary" fullWidth loading={saving} iconLeft={<Icon name="checkSmall" size={16} />} onClick={handleSubmit}>Confirm Payment</Button>
            <Button variant="secondary" onClick={() => { setForm(EMPTY_FORM); setError(''); clearFile(); }}>Clear</Button>
          </div>
        }>
          {paymentForm}
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Upload Payment Screenshot" subtitle="Attach payment proof (optional)">
          {uploadArea}
        </Card>
        <Card title="Record Payment" subtitle="Enter the payment details"
          footer={
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="primary" fullWidth loading={saving} iconLeft={<Icon name="checkSmall" size={16} />} onClick={handleSubmit}>Confirm Payment</Button>
              <Button variant="secondary" onClick={() => { setForm(EMPTY_FORM); setError(''); clearFile(); }}>Clear</Button>
            </div>
          }>
          {paymentForm}
        </Card>
      </div>
    </div>
  );
}
