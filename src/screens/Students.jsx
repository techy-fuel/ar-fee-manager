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

const IconBtn = ({ name, onClick, title, color }) => (
  <button onClick={onClick} title={title} style={{
    width: 30, height: 30, display: 'grid', placeItems: 'center',
    border: '1px solid var(--border-subtle)', background: '#fff',
    borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: color || 'var(--text-muted)',
  }}>
    <Icon name={name} size={15} />
  </button>
);

const EMPTY_FORM = { name: '', parent_name: '', parent_phone: '', class_id: '', student_id: '', enrollment_date: '' };

export function Students({ isMobile, addStudentOpen, setAddStudentOpen, onCollectFee }) {
  const { students, classes, loading, addStudent, updateStudent, deleteStudent, addClass, updateClass, deleteClass, bulkAddStudents } = useStudents();
  const { error: dbError, retry } = useApp();

  const [q, setQ]               = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [showAdd, setShowAdd]   = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);
  const [formError, setFormError] = useState('');

  // Class add/edit form (shared fields)
  const [editClassId, setEditClassId] = useState(null);
  const [className, setClassName] = useState('');
  const [classFee, setClassFee]   = useState('');
  const [classSaving, setClassSaving] = useState(false);
  const [classError, setClassError]   = useState('');

  // Bulk import
  const [bulkText, setBulkText]     = useState('');
  const [bulkParsed, setBulkParsed] = useState(null);
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkError, setBulkError]   = useState('');

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

  function startEditClass(c) {
    setEditClassId(c.id);
    setClassName(c.name);
    setClassFee(String(c.monthly_fee || ''));
    setClassError('');
  }

  function cancelEditClass() {
    setEditClassId(null);
    setClassName('');
    setClassFee('');
    setClassError('');
  }

  async function handleSaveClass(e) {
    e?.preventDefault?.();
    if (!className.trim()) { setClassError('Class name is required.'); return; }
    setClassSaving(true);
    setClassError('');
    const { error } = editClassId
      ? await updateClass(editClassId, className.trim(), classFee)
      : await addClass(className.trim(), classFee);
    setClassSaving(false);
    if (error) { setClassError(error.message || 'Failed to save class.'); return; }
    setEditClassId(null);
    setClassName('');
    setClassFee('');
  }

  async function handleDeleteClass(id) {
    if (!window.confirm('Delete this class? Students in this class will be unlinked but kept.')) return;
    const { error } = await deleteClass(id);
    if (error) setClassError(error.message || 'Failed to delete class.');
  }

  function parseBulk() {
    const rows = bulkText.split('\n')
      .map(l => l.trim()).filter(Boolean)
      .map(line => {
        const sep = line.includes('\t') ? '\t' : ',';
        const [name, clsName, parentName, phone] = line.split(sep).map(s => s.trim().replace(/^["']|["']$/g, ''));
        const cls = classes.find(c => c.name.toLowerCase() === (clsName || '').toLowerCase());
        return { name, clsName: clsName || '', parentName: parentName || '', phone: phone || '', class_id: cls?.id || null, classFound: !!cls && !!clsName };
      })
      .filter(r => r.name);
    setBulkParsed(rows);
    setBulkError('');
  }

  async function handleBulkImport() {
    setBulkSaving(true);
    setBulkError('');
    const { error } = await bulkAddStudents(bulkParsed.map(r => ({
      name: r.name,
      parent_name: r.parentName || null,
      parent_phone: r.phone || null,
      class_id: r.class_id,
    })));
    setBulkSaving(false);
    if (error) { setBulkError(error.message || 'Import failed.'); return; }
    setShowBulk(false);
    setBulkText('');
    setBulkParsed(null);
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
      onClose={() => { setShowClasses(false); cancelEditClass(); }}
      title="Manage Classes"
      footer={<Button variant="secondary" onClick={() => { setShowClasses(false); cancelEditClass(); }}>Done</Button>}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Add / Edit form */}
        <form onSubmit={handleSaveClass} style={{ display: 'grid', gap: 10 }}>
          <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: editClassId ? 'var(--blue-600)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {editClassId ? `Editing: ${classes.find(c => c.id === editClassId)?.name || ''}` : 'Add New Class'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
            <Input label="Class Name" placeholder="Class 9-A" value={className} onChange={e => setClassName(e.target.value)} />
            <Input label="Monthly Fee" placeholder="3500" value={classFee} onChange={e => setClassFee(e.target.value)} inputMode="numeric" iconLeft={<span style={{ fontWeight: 700 }}>₨</span>} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="primary" fullWidth loading={classSaving} onClick={handleSaveClass} iconLeft={<Icon name={editClassId ? 'check' : 'plus'} size={15} />}>
              {editClassId ? 'Update Class' : 'Add Class'}
            </Button>
            {editClassId && (
              <Button variant="secondary" onClick={cancelEditClass}>Cancel</Button>
            )}
          </div>
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
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', background: editClassId === c.id ? 'var(--blue-50)' : 'transparent' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{c.name}</div>
              <div style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(c.monthly_fee || 0)}/mo</div>
              <IconBtn name="edit" title="Edit class" onClick={() => startEditClass(c)} color="var(--blue-500)" />
              <IconBtn name="trash" title="Delete class" onClick={() => handleDeleteClass(c.id)} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );

  const bulkModal = (
    <Modal
      open={showBulk}
      onClose={() => { setShowBulk(false); setBulkText(''); setBulkParsed(null); setBulkError(''); }}
      title="Bulk Import Students"
      footer={
        bulkParsed ? (
          <>
            <Button variant="secondary" onClick={() => setBulkParsed(null)}>Back</Button>
            <Button variant="primary" loading={bulkSaving} onClick={handleBulkImport}>Import {bulkParsed.length} Students</Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => { setShowBulk(false); setBulkText(''); setBulkParsed(null); }}>Cancel</Button>
            <Button variant="primary" onClick={parseBulk} disabled={!bulkText.trim()}>Preview</Button>
          </>
        )
      }
    >
      {!bulkParsed ? (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ padding: '10px 14px', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-xs)', color: 'var(--blue-700)', lineHeight: 1.6 }}>
            <strong>Format:</strong> One student per line<br />
            Name, Class Name, Parent Name, Phone<br />
            <em>You can paste directly from Excel (tab-separated)</em>
          </div>
          <textarea
            value={bulkText}
            onChange={e => setBulkText(e.target.value)}
            rows={9}
            placeholder={"Ahmed Ali, Class 9-A, Mr. Ali Khan, +92 300 1234567\nFatima Raza, Class 10, Mrs. Raza, +92 321 9876543"}
            style={{
              width: '100%', boxSizing: 'border-box', resize: 'vertical',
              padding: '10px 12px', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-xs)', lineHeight: 1.6, outline: 'none',
              color: 'var(--text-strong)', background: 'var(--color-surface)',
            }}
          />
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>
            {bulkParsed.length} students ready to import
            {bulkParsed.some(r => r.clsName && !r.classFound) && (
              <span style={{ color: 'var(--amber-600)', marginLeft: 8 }}>· Some classes not found (will be unlinked)</span>
            )}
          </div>
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: 320, overflowY: 'auto' }}>
            {bulkParsed.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', fontSize: 'var(--fs-sm)' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-strong)', minWidth: 0 }}>{r.name}</span>
                {r.clsName && (
                  <Badge variant={r.classFound ? 'success' : 'warning'}>{r.clsName}{r.classFound ? '' : ' ⚠'}</Badge>
                )}
                {r.phone && <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)', marginLeft: 'auto' }}>{r.phone}</span>}
              </div>
            ))}
          </div>
          {bulkError && (
            <div style={{ padding: '10px 14px', background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)', color: 'var(--red-700)' }}>
              {bulkError}
            </div>
          )}
        </div>
      )}
    </Modal>
  );

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        {studentModal}
        {classesModal}
        {bulkModal}
        {dbBanner}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students…" iconLeft={<Icon name="search" size={16} />} />
          </div>
          <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => { setEditTarget(null); setForm(EMPTY_FORM); setShowAdd(true); }}>Add</Button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <Button variant="secondary" fullWidth iconLeft={<Icon name="report" size={15} />} onClick={() => setShowClasses(true)}>
            Classes ({classes.length})
          </Button>
          <Button variant="secondary" fullWidth iconLeft={<Icon name="upload" size={15} />} onClick={() => setShowBulk(true)}>
            Import CSV
          </Button>
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
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                {s.parent_phone && (
                  <a href={`https://wa.me/${s.parent_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 34, background: 'var(--whatsapp)', color: '#fff', borderRadius: 'var(--radius-sm)', fontSize: 'var(--fs-xs)', fontWeight: 700, textDecoration: 'none' }}>
                    <WhatsAppIcon size={14} color="#fff" /> {s.parent_phone}
                  </a>
                )}
                <IconBtn name="wallet" title="Collect Fee" onClick={() => onCollectFee?.(s.id)} color="var(--blue-500)" />
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
      {bulkModal}
      {dbBanner}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
        <div style={{ width: 300 }}>
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search students or class…" iconLeft={<Icon name="search" size={16} />} />
        </div>
        <div style={{ width: 160 }}>
          <Select value={classFilter} onChange={e => setClassFilter(e.target.value)} options={classOptions} />
        </div>
        <Button variant="secondary" iconLeft={<Icon name="report" size={16} />} style={{ marginLeft: 'auto' }} onClick={() => setShowClasses(true)}>
          Manage Classes ({classes.length})
        </Button>
        <Button variant="secondary" iconLeft={<Icon name="upload" size={16} />} onClick={() => setShowBulk(true)}>
          Import CSV
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
                    <IconBtn name="wallet" title="Collect Fee" onClick={() => onCollectFee?.(s.id)} color="var(--blue-500)" />
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
