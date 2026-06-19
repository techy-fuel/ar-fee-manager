import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Input } from '../components/Input.jsx';
import { Select } from '../components/Select.jsx';
import { Modal } from '../components/Modal.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';

const CLASS_OPTIONS = [
  { value: '', label: 'Select class' },
  ...['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'].map(c => ({ value: c, label: c })),
];
import { students as mockStudents, fmtRs } from '../data/mockData.js';

const feeBadge = s =>
  s === 'Paid'    ? <Badge variant="success" dot>Paid</Badge>
  : s === 'Pending' ? <Badge variant="warning" dot>Pending</Badge>
  : <Badge variant="danger" dot>Overdue</Badge>;

const IconBtn = ({ name, onClick }) => (
  <button onClick={onClick} style={{
    width: 30, height: 30, display: 'grid', placeItems: 'center',
    border: '1px solid var(--border-subtle)', background: '#fff',
    borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-muted)',
  }}>
    <Icon name={name} size={15} />
  </button>
);

const EMPTY_FORM = { name: '', parent_name: '', parent_phone: '', class_id: '', student_id: '', enrollment_date: '' };

export function Students({ isMobile }) {
  const [q, setQ]               = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [showAdd, setShowAdd]   = useState(false);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);
  const [formError, setFormError] = useState('');
  const [localStudents, setLocalStudents] = useState(mockStudents);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name.trim()) { setFormError('Student name is required.'); return; }
    setSaving(true);
    setFormError('');
    setTimeout(() => {
      const newStudent = {
        id: 'STD-' + String(localStudents.length + 1).padStart(3, '0'),
        name: form.name.trim(),
        cls: form.class_id || '—',
        fee: 0,
        status: 'Active',
        feeStatus: 'Pending',
        wa: form.parent_phone || '—',
      };
      setLocalStudents(prev => [...prev, newStudent]);
      setSaving(false);
      setShowAdd(false);
      setForm(EMPTY_FORM);
    }, 500);
  }

  const source = localStudents;
  const classOptions = ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  const rows = source.filter(s => {
    const matchQ = !q || s.name.toLowerCase().includes(q.toLowerCase()) || s.cls.toLowerCase().includes(q.toLowerCase());
    const matchC = !classFilter || classFilter === 'All Classes' || s.cls === classFilter;
    return matchQ && matchC;
  });

  const AddModal = () => (
    <Modal
      open={showAdd}
      onClose={() => { setShowAdd(false); setForm(EMPTY_FORM); setFormError(''); }}
      title="Add New Student"
      footer={
        <>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button variant="primary" loading={saving} onClick={handleAdd}>Add Student</Button>
        </>
      }
    >
      <form onSubmit={handleAdd} style={{ display: 'grid', gap: 14 }}>
        <Input label="Student Name *" placeholder="Ahmed Raza" value={form.name} onChange={set('name')} />
        <Input label="Student ID" placeholder="STD-001 (optional)" value={form.student_id} onChange={set('student_id')} />
        <Select label="Class" value={form.class_id} onChange={set('class_id')} options={CLASS_OPTIONS} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Input label="Parent Name" placeholder="Mr. Raza Khan" value={form.parent_name} onChange={set('parent_name')} />
          <Input label="Parent WhatsApp" placeholder="+92 300 1234567" value={form.parent_phone} onChange={set('parent_phone')} />
        </div>
        <Input label="Enrollment Date" type="date" value={form.enrollment_date} onChange={set('enrollment_date')} />
        {formError && (
          <div style={{ padding: '10px 14px', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)', color: 'var(--red-700)' }}>
            {formError}
          </div>
        )}
      </form>
    </Modal>
  );

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <AddModal />
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students…" iconLeft={<Icon name="search" size={16} />} />
          </div>
          <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => setShowAdd(true)}>Add</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rows.map(s => (
            <div key={s.id} style={{
              background: 'var(--color-surface)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: 14, boxShadow: 'var(--shadow-xs)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar name={s.name} size="sm" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 'var(--fs-body)' }}>{s.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{s.id}</div>
                </div>
                {feeBadge(s.feeStatus)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--fs-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{s.cls}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.fee)}/mo</span>
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <a href={`https://wa.me/${s.wa.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 34, background: 'var(--whatsapp)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', fontWeight: 700, textDecoration: 'none' }}>
                  <WhatsAppIcon size={14} color="#fff" /> {s.wa}
                </a>
              </div>
            </div>
          ))}
          {rows.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
              No students found.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <AddModal />
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
        <div style={{ width: 320 }}>
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students or class…" iconLeft={<Icon name="search" size={16} />} />
        </div>
        <div style={{ width: 160 }}>
          <Select value={classFilter} onChange={e => setClassFilter(e.target.value)} options={classOptions} />
        </div>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} style={{ marginLeft: 'auto' }} onClick={() => setShowAdd(true)}>
          Add Student
        </Button>
      </div>
      <Card padding="none">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
              {['Student', 'Class', 'Monthly Fee', 'Status', 'Fee Status', 'Parent WhatsApp', ''].map((h, i) => (
                <th key={i} style={{ textAlign: i === 2 ? 'right' : 'left', padding: '12px 18px', fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => (
              <tr key={s.id} style={{ borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '11px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.name} size="sm" />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{s.name}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{s.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '11px 18px', color: 'var(--text-secondary)' }}>{s.cls}</td>
                <td style={{ padding: '11px 18px', textAlign: 'right', fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.fee)}</td>
                <td style={{ padding: '11px 18px' }}>
                  {s.status === 'Active' ? <Badge variant="success" dot>Active</Badge> : <Badge variant="neutral" dot>Inactive</Badge>}
                </td>
                <td style={{ padding: '11px 18px' }}>{feeBadge(s.feeStatus)}</td>
                <td style={{ padding: '11px 18px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)' }}>{s.wa}</td>
                <td style={{ padding: '11px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 4 }}>
                    <IconBtn name="eye" />
                    <IconBtn name="edit" />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', background: 'var(--slate-50)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
          Showing {rows.length} of {source.length} students
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <Button size="sm" variant="secondary">Previous</Button>
            <Button size="sm" variant="secondary">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
