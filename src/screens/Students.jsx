import { useState, useEffect } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Input } from '../components/Input.jsx';
import { Select } from '../components/Select.jsx';
import { Modal } from '../components/Modal.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';
import { useStudents } from '../hooks/useStudents.js';
import { fmtRs } from '../data/mockData.js';

const feeBadge = s =>
  s === 'Paid'    ? <Badge variant="success" dot>Paid</Badge>
  : s === 'Pending' ? <Badge variant="warning" dot>Pending</Badge>
  : <Badge variant="danger" dot>Overdue</Badge>;

const IconBtn = ({ name, onClick, title }) => (
  <button onClick={onClick} title={title} style={{
    width: 30, height: 30, display: 'grid', placeItems: 'center',
    border: '1px solid var(--border-subtle)', background: '#fff',
    borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-muted)',
  }}>
    <Icon name={name} size={15} />
  </button>
);

const EMPTY_FORM = { name: '', parent_name: '', parent_phone: '', class_id: '', student_id: '', enrollment_date: '' };

export function Students({ isMobile, addStudentOpen, setAddStudentOpen }) {
  const { students, classes, loading, addStudent, updateStudent, deleteStudent } = useStudents();

  const [q, setQ]               = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [showAdd, setShowAdd]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);
  const [formError, setFormError] = useState('');

  // Sync external open trigger (topbar button)
  useEffect(() => {
    if (addStudentOpen) {
      setShowAdd(true);
      setAddStudentOpen?.(false);
    }
  }, [addStudentOpen, setAddStudentOpen]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function openEdit(s) {
    setEditTarget(s);
    setForm({
      name: s.name || '',
      parent_name: s.parent_name || '',
      parent_phone: s.parent_phone || '',
      class_id: s.class_id || '',
      student_id: s.student_id || '',
      enrollment_date: s.enrollment_date || '',
    });
    setShowAdd(true);
  }

  function closeModal() {
    setShowAdd(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) { setFormError('Student name is required.'); return; }
    setSaving(true);
    setFormError('');
    const payload = {
      name: form.name.trim(),
      parent_name: form.parent_name.trim() || null,
      parent_phone: form.parent_phone.trim() || null,
      class_id: form.class_id || null,
      student_id: form.student_id.trim() || null,
      enrollment_date: form.enrollment_date || null,
      status: 'active',
    };
    const { error } = editTarget
      ? await updateStudent(editTarget.id, payload)
      : await addStudent(payload);
    setSaving(false);
    if (error) { setFormError(error.message || 'Failed to save.'); return; }
    closeModal();
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this student?')) return;
    await deleteStudent(id);
  }

  const classOptions = [
    { value: '', label: 'All Classes' },
    ...classes.map(c => ({ value: c.id, label: c.name })),
  ];

  const formClassOptions = [
    { value: '', label: 'Select class' },
    ...classes.map(c => ({ value: c.id, label: c.name })),
  ];

  const rows = students.filter(s => {
    const matchQ = !q || s.name.toLowerCase().includes(q.toLowerCase()) || (s.class?.name || '').toLowerCase().includes(q.toLowerCase());
    const matchC = !classFilter || s.class_id === classFilter;
    return matchQ && matchC;
  });

  const StudentModal = () => (
    <Modal
      open={showAdd}
      onClose={closeModal}
      title={editTarget ? 'Edit Student' : 'Add New Student'}
      footer={
        <>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="primary" loading={saving} onClick={handleSubmit}>
            {editTarget ? 'Save Changes' : 'Add Student'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <Input label="Student Name *" placeholder="Ahmed Raza" value={form.name} onChange={set('name')} />
        <Input label="Student ID" placeholder="STD-001 (optional)" value={form.student_id} onChange={set('student_id')} />
        <Select label="Class" value={form.class_id} onChange={set('class_id')} options={formClassOptions} />
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
        <StudentModal />
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students…" iconLeft={<Icon name="search" size={16} />} />
          </div>
          <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => { setEditTarget(null); setForm(EMPTY_FORM); setShowAdd(true); }}>Add</Button>
        </div>
        {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>Loading…</div>}
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
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{s.student_id || s.id.slice(0, 8)}</div>
                </div>
                {s.status === 'active' ? <Badge variant="success" dot>Active</Badge> : <Badge variant="neutral" dot>Inactive</Badge>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--fs-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{s.class?.name || '—'}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.class?.monthly_fee || 0)}/mo</span>
              </div>
              {s.parent_phone && (
                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  <a href={`https://wa.me/${s.parent_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 34, background: 'var(--whatsapp)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', fontWeight: 700, textDecoration: 'none' }}>
                    <WhatsAppIcon size={14} color="#fff" /> {s.parent_phone}
                  </a>
                </div>
              )}
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
      <StudentModal />
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
        <div style={{ width: 320 }}>
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students or class…" iconLeft={<Icon name="search" size={16} />} />
        </div>
        <div style={{ width: 180 }}>
          <Select value={classFilter} onChange={e => setClassFilter(e.target.value)} options={classOptions} />
        </div>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} style={{ marginLeft: 'auto' }}
          onClick={() => { setEditTarget(null); setForm(EMPTY_FORM); setShowAdd(true); }}>
          Add Student
        </Button>
      </div>
      <Card padding="none">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
              {['Student', 'Class', 'Monthly Fee', 'Status', 'Parent WhatsApp', ''].map((h, i) => (
                <th key={i} style={{ textAlign: i === 2 ? 'right' : 'left', padding: '12px 18px', fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Loading…</td>
              </tr>
            )}
            {rows.map((s, i) => (
              <tr key={s.id} style={{ borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '11px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.name} size="sm" />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{s.name}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{s.student_id || s.id.slice(0, 8)}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '11px 18px', color: 'var(--text-secondary)' }}>{s.class?.name || '—'}</td>
                <td style={{ padding: '11px 18px', textAlign: 'right', fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.class?.monthly_fee || 0)}</td>
                <td style={{ padding: '11px 18px' }}>
                  {s.status === 'active' ? <Badge variant="success" dot>Active</Badge> : <Badge variant="neutral" dot>Inactive</Badge>}
                </td>
                <td style={{ padding: '11px 18px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)' }}>
                  {s.parent_phone
                    ? <a href={`https://wa.me/${s.parent_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                        style={{ color: 'var(--whatsapp-dark)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <WhatsAppIcon size={12} color="var(--whatsapp-dark)" />{s.parent_phone}
                      </a>
                    : '—'}
                </td>
                <td style={{ padding: '11px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 4 }}>
                    <IconBtn name="edit" title="Edit" onClick={() => openEdit(s)} />
                    <IconBtn name="trash" title="Delete" onClick={() => handleDelete(s.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                  {students.length === 0 ? 'No students yet. Add your first student!' : 'No students match your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', background: 'var(--slate-50)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
          Showing {rows.length} of {students.length} students
        </div>
      </Card>
    </div>
  );
}
