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
import { useApp } from '../context/AppContext.jsx';
import { fmtRs } from '../data/mockData.js';

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
  const { students, classes, loading, addStudent, updateStudent, deleteStudent, addClass, deleteClass } = useStudents();
  const { error: dbError, retry } = useApp();

  const [q, setQ]               = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [showAdd, setShowAdd]   = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);
  const [formError, setFormError] = useState('');

  // Class form
  const [className, setClassName] = useState('');
  const [classFee, setClassFee]   = useState('');
  const [classSaving, setClassSaving] = useState(false);
  const [classError, setClassError]   = useState('');

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
    e?.preventDefault?.();
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
    try {
      const { error } = editTarget
        ? await updateStudent(editTarget.id, payload)
        : await addStudent(payload);
      setSaving(false);
      if (error) { setFormError(error.message || 'Failed to save.'); return; }
      closeModal();
    } catch (err) {
      setSaving(false);
      setFormError(err.message || 'Unexpected error. Check your database connection.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this student?')) return;
    await deleteStudent(id);
  }

  async function handleAddClass(e) {
    e?.preventDefault?.();
    if (!className.trim()) { setClassError('Class name is required.'); return; }
    setClassSaving(true);
    setClassError('');
    try {
      const { error } = await addClass(className.trim(), classFee);
      setClassSaving(false);
      if (error) { setClassError(error.message || 'Failed to add class.'); return; }
      setClassName('');
      setClassFee('');
    } catch (err) {
      setClassSaving(false);
      setClassError(err.message || 'Unexpected error.');
    }
  }

  async function handleDeleteClass(id) {
    if (!window.confirm('Delete this class? Students keep their record but lose this class link.')) return;
    await deleteClass(id);
  }

  const classOptions = [
    { value: '', label: 'All Classes' },
    ...classes.map(c => ({ value: c.id, label: c.name })),
  ];

  const formClassOptions = [
    { value: '', label: classes.length ? 'Select class (optional)' : 'No classes yet — add one first' },
    ...classes.map(c => ({ value: c.id, label: `${c.name} · ${fmtRs(c.monthly_fee || 0)}` })),
  ];

  const rows = students.filter(s => {
    const matchQ = !q || s.name.toLowerCase().includes(q.toLowerCase()) || (s.class?.name || '').toLowerCase().includes(q.toLowerCase());
    const matchC = !classFilter || s.class_id === classFilter;
    return matchQ && matchC;
  });

  const dbBanner = dbError ? (
    <div style={{ padding: '12px 16px', marginBottom: 14, background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 'var(--radius-md)', color: 'var(--red-700)', fontSize: 'var(--fs-sm)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <Icon name="clock" size={16} />
      <span><strong>Database not connected:</strong> {dbError}</span>
      <Button size="sm" variant="secondary" onClick={retry} style={{ marginLeft: 'auto' }}>Retry</Button>
    </div>
  ) : null;

  const studentModal = (
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
        <div>
          <Select label="Class" value={form.class_id} onChange={set('class_id')} options={formClassOptions} />
          {classes.length === 0 && (
            <p style={{ margin: '6px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--blue-600)', cursor: 'pointer', fontWeight: 600 }}
               onClick={() => { setShowAdd(false); setShowClasses(true); }}>
              + Create a class first
            </p>
          )}
        </div>
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

  const classesModal = (
    <Modal
      open={showClasses}
      onClose={() => { setShowClasses(false); setClassError(''); }}
      title="Manage Classes"
      footer={<Button variant="secondary" onClick={() => { setShowClasses(false); setClassError(''); }}>Done</Button>}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        <form onSubmit={handleAddClass} style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
            <Input label="Class Name" placeholder="Class 9-A" value={className} onChange={e => setClassName(e.target.value)} />
            <Input label="Monthly Fee" placeholder="3500" value={classFee} onChange={e => setClassFee(e.target.value)} inputMode="numeric" iconLeft={<span style={{ fontWeight: 700 }}>₨</span>} />
          </div>
          <Button variant="primary" fullWidth loading={classSaving} onClick={handleAddClass} iconLeft={<Icon name="plus" size={15} />}>Add Class</Button>
        </form>
        {classError && (
          <div style={{ padding: '10px 14px', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)', color: 'var(--red-700)' }}>
            {classError}
          </div>
        )}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {classes.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
              No classes yet. Add your first class above.
            </div>
          ) : classes.map((c, i) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{c.name}</div>
              <div style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(c.monthly_fee || 0)}/mo</div>
              <IconBtn name="trash" title="Delete class" onClick={() => handleDeleteClass(c.id)} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        {studentModal}
        {classesModal}
        {dbBanner}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students…" iconLeft={<Icon name="search" size={16} />} />
          </div>
          <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => { setEditTarget(null); setForm(EMPTY_FORM); setShowAdd(true); }}>Add</Button>
        </div>
        <Button variant="secondary" fullWidth iconLeft={<Icon name="report" size={15} />} onClick={() => setShowClasses(true)} style={{ marginBottom: 14 }}>
          Manage Classes ({classes.length})
        </Button>
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
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                {s.parent_phone && (
                  <a href={`https://wa.me/${s.parent_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 34, background: 'var(--whatsapp)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', fontWeight: 700, textDecoration: 'none' }}>
                    <WhatsAppIcon size={14} color="#fff" /> {s.parent_phone}
                  </a>
                )}
                <IconBtn name="edit" title="Edit" onClick={() => openEdit(s)} />
                <IconBtn name="trash" title="Delete" onClick={() => handleDelete(s.id)} />
              </div>
            </div>
          ))}
          {rows.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
              {students.length === 0 ? 'No students yet. Tap "Add" to create one.' : 'No students match your search.'}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      {studentModal}
      {classesModal}
      {dbBanner}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
        <div style={{ width: 320 }}>
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students or class…" iconLeft={<Icon name="search" size={16} />} />
        </div>
        <div style={{ width: 180 }}>
          <Select value={classFilter} onChange={e => setClassFilter(e.target.value)} options={classOptions} />
        </div>
        <Button variant="secondary" iconLeft={<Icon name="report" size={16} />} style={{ marginLeft: 'auto' }} onClick={() => setShowClasses(true)}>
          Manage Classes ({classes.length})
        </Button>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />}
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
                  {students.length === 0 ? 'No students yet. Click "Add Student" to create your first one!' : 'No students match your search.'}
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
