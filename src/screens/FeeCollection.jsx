import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Input } from '../components/Input.jsx';
import { Select } from '../components/Select.jsx';
import { Icon } from '../components/Icon.jsx';
import { students as mockStudents } from '../data/mockData.js';
import { useStudents } from '../hooks/useStudents.js';
import { usePayments } from '../hooks/usePayments.js';
import { useAuth } from '../context/AuthContext.jsx';

export function FeeCollection({ isMobile }) {
  const { user } = useAuth();
  const { students: liveStudents } = useStudents();
  const { recordPayment } = usePayments();
  const studentList = user ? liveStudents : mockStudents;

  const [drag, setDrag] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    studentId: '', transactionId: '', amount: '', feeMonth: '', paymentDate: '', method: 'cash',
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    if (!user) { setSuccess(true); return; }
    setSaving(true);
    const student = liveStudents.find(s => s.name === form.studentId || s.id === form.studentId);
    const { error } = await recordPayment({
      student_id: student?.id,
      amount: Number(form.amount),
      fee_month: form.feeMonth || new Date().toISOString().slice(0, 10),
      payment_date: form.paymentDate || new Date().toISOString().slice(0, 10),
      transaction_id: form.transactionId,
      method: form.method,
      status: 'paid',
    });
    setSaving(false);
    if (!error) { setSuccess(true); setForm({ studentId: '', transactionId: '', amount: '', feeMonth: '', paymentDate: '', method: 'cash' }); }
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
          <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>jazzcash_receipt.png</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--green-600)', marginTop: 4, fontWeight: 600 }}>Uploaded · OCR scan complete</div>
        </>
      ) : (
        <>
          <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Drag &amp; drop a screenshot here</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 4 }}>or click to browse · PNG, JPG up to 10MB</div>
        </>
      )}
    </div>
  );

  const OcrAlert = () => uploaded ? (
    <div style={{ marginTop: 14, padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', display: 'flex', gap: 10 }}>
      <span style={{ color: 'var(--blue-600)', marginTop: 1 }}><Icon name="sparkles" size={18} /></span>
      <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--blue-800)' }}>
        <b>OCR detected:</b> Transaction TXN-3B81D2 · Rs 4,000 · 11 Jul 2025 · JazzCash. Review and confirm below.
      </div>
    </div>
  ) : null;

  const months = ['2025-07-01','2025-08-01','2025-09-01','2025-10-01','2025-11-01','2025-12-01'].map(m => {
    const d = new Date(m);
    return { label: d.toLocaleString('en', { month: 'long', year: 'numeric' }), value: m };
  });

  const PaymentForm = () => (
    <div style={{ display: 'grid', gap: 14 }}>
      {success && (
        <div style={{ padding: 12, background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 'var(--radius-md)', color: 'var(--green-700)', fontWeight: 600, fontSize: 'var(--fs-sm)' }}>
          Payment recorded successfully!
        </div>
      )}
      <Select label="Student" placeholder="Select student" value={form.studentId} onChange={set('studentId')}
        options={['Select student', ...studentList.map(s => s.name || s)]} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Input label="Transaction ID" value={form.transactionId} onChange={set('transactionId')} defaultValue={uploaded ? 'TXN-3B81D2' : ''} placeholder="TXN-…" />
        <Input label="Amount Received" value={form.amount} onChange={set('amount')} defaultValue={uploaded ? '4000' : ''} iconLeft={<span style={{ fontWeight: 700 }}>₨</span>} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Select label="Payment Method" value={form.method} onChange={set('method')}
          options={[{label:'Cash',value:'cash'},{label:'Bank Transfer',value:'bank_transfer'},{label:'JazzCash',value:'jazzcash'},{label:'EasyPaisa',value:'easypaisa'}].map(o=>o.label)} />
        <Input label="Payment Date" type="date" value={form.paymentDate} onChange={set('paymentDate')} defaultValue={uploaded ? '2025-07-11' : ''} iconLeft={<Icon name="calendar" size={15} />} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>Payment Status</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge variant="success" dot>Verified</Badge>
          <Badge variant="warning" dot>Pending</Badge>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <Card title="Upload Screenshot" subtitle="Auto-detect via OCR" style={{ marginBottom: 14 }}>
          <UploadArea />
          <OcrAlert />
        </Card>
        <Card title="Record Payment" footer={
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="primary" fullWidth loading={saving} iconLeft={<Icon name="checkSmall" size={16} />} onClick={handleSubmit}>Confirm Payment</Button>
            <Button variant="secondary" onClick={() => setSuccess(false)}>Cancel</Button>
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
        <Card title="Upload Payment Screenshot" subtitle="We auto-detect transaction details with OCR">
          <UploadArea />
          <OcrAlert />
        </Card>
        <Card title="Record Payment" subtitle="Confirm the detected details"
          footer={
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="primary" fullWidth loading={saving} iconLeft={<Icon name="checkSmall" size={16} />} onClick={handleSubmit}>Confirm Payment</Button>
              <Button variant="secondary" onClick={() => setSuccess(false)}>Cancel</Button>
            </div>
          }>
          <PaymentForm />
        </Card>
      </div>
    </div>
  );
}
