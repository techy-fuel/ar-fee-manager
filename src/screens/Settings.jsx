import { useState, useEffect, useRef } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Input } from '../components/Input.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { supabase } from '../lib/supabase.js';

const ALL_METHODS = ['Cash', 'Bank Transfer', 'JazzCash', 'EasyPaisa'];

export function Settings({ isMobile }) {
  const { academy, setAcademy } = useApp();
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState('');
  const [error, setError]         = useState('');
  const [form, setForm]           = useState({ name: '', email: '', phone: '' });
  const fileRef                   = useRef(null);
  const [logoSaving, setLogoSaving] = useState(false);

  // WhatsApp
  const [waNumber, setWaNumber]   = useState('');
  const [waSaving, setWaSaving]   = useState(false);

  // Payment methods
  const [methods, setMethods]     = useState(ALL_METHODS);
  const [methodSaving, setMethodSaving] = useState(false);

  useEffect(() => {
    if (academy) {
      setForm({ name: academy.name || '', email: academy.email || '', phone: academy.phone || '' });
      setWaNumber(academy.wa_number || '');
      const saved = academy.payment_methods;
      if (saved) setMethods(saved.split(',').map(s => s.trim()).filter(Boolean));
    }
  }, [academy]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  function flash(msg) { setSaved(msg); setTimeout(() => setSaved(''), 3000); }

  async function saveAcademy(e) {
    e?.preventDefault?.();
    if (!form.name.trim()) { setError('Academy name is required.'); return; }
    setSaving(true); setError('');
    const { data, error: err } = await supabase
      .from('academies')
      .update({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() })
      .eq('id', academy.id).select().single();
    setSaving(false);
    if (err) { setError(err.message || 'Failed to save.'); return; }
    setAcademy(data);
    flash('Saved!');
  }

  async function saveWa() {
    setWaSaving(true); setError('');
    const { data, error: err } = await supabase
      .from('academies')
      .update({ wa_number: waNumber.trim() })
      .eq('id', academy.id).select().single();
    setWaSaving(false);
    if (err) { setError(err.message || 'Failed to save. Run the SQL migration first.'); return; }
    setAcademy(data);
    flash('WhatsApp number saved!');
  }

  async function saveMethods() {
    setMethodSaving(true); setError('');
    const { data, error: err } = await supabase
      .from('academies')
      .update({ payment_methods: methods.join(',') })
      .eq('id', academy.id).select().single();
    setMethodSaving(false);
    if (err) { setError(err.message || 'Failed to save. Run the SQL migration first.'); return; }
    setAcademy(data);
    flash('Payment methods saved!');
  }

  function handleLogo(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    if (file.size > 600 * 1024) { setError('Logo too large — please use an image under 600 KB.'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = async () => {
      setLogoSaving(true);
      const { data, error: err } = await supabase
        .from('academies')
        .update({ logo_url: reader.result })
        .eq('id', academy.id).select().single();
      setLogoSaving(false);
      if (err) { setError(err.message || 'Failed to save logo. Run the SQL migration first.'); return; }
      setAcademy(data);
      flash('Logo saved!');
    };
    reader.readAsDataURL(file);
  }

  function toggleMethod(m) {
    setMethods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  }

  const content = (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>

      {/* ── Academy Information ── */}
      <Card title="Academy Information" footer={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button variant="primary" loading={saving} onClick={saveAcademy}>Save Changes</Button>
          {saved && <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--green-600)', fontWeight: 600 }}>{saved}</span>}
          {error && <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--red-600)' }}>{error}</span>}
        </div>
      }>
        <div style={{ display: 'grid', gap: 14 }}>
          <Input label="Academy Name" value={form.name} onChange={set('name')} />
          <Input label="Contact Email" value={form.email} onChange={set('email')} type="email" />
          <Input label="Phone" value={form.phone} onChange={set('phone')} iconLeft={<Icon name="phone" size={15} />} />
        </div>
      </Card>

      {/* ── Academy Logo ── */}
      <Card title="Academy Logo">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{
            width: 96, height: 96, borderRadius: 'var(--radius-lg)',
            background: 'var(--slate-50)', border: '1px solid var(--border-subtle)',
            display: 'grid', placeItems: 'center', padding: 12, overflow: 'hidden',
          }}>
            <img src={academy?.logo_url || '/assets/logo-mark.svg'} alt="" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} />
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleLogo(e.target.files?.[0])} />
            <Button variant="secondary" loading={logoSaving} iconLeft={<Icon name="upload" size={16} />} onClick={() => fileRef.current?.click()}>Upload new logo</Button>
            <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>PNG or JPG, up to 600 KB</p>
          </div>
        </div>
      </Card>

      {/* ── WhatsApp Integration ── */}
      <Card title="WhatsApp Integration" subtitle="Reminder delivery" footer={
        <Button variant="whatsapp" loading={waSaving} iconLeft={<WhatsAppIcon size={15} color="#fff" />} onClick={saveWa}>
          Save WhatsApp Number
        </Button>
      }>
        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: 12,
            background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)',
          }}>
            <WhatsAppIcon size={20} color="var(--whatsapp-dark)" />
            <div style={{ fontSize: 'var(--fs-sm)' }}>
              <b style={{ color: 'var(--green-700)' }}>Active</b>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>Reminders open WhatsApp with pre-filled messages</div>
            </div>
            <Badge variant="success" dot style={{ marginLeft: 'auto' }}>Ready</Badge>
          </div>
          <Input
            label="Academy WhatsApp Number"
            value={waNumber}
            onChange={e => setWaNumber(e.target.value)}
            placeholder="+92 300 1234567"
            iconLeft={<WhatsAppIcon size={15} color="var(--whatsapp-dark)" />}
          />
          <p style={{ margin: 0, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Parents can contact this number. Reminders are sent to each parent's own number.
          </p>
        </div>
      </Card>

      {/* ── Payment Methods ── */}
      <Card title="Payment Methods" subtitle="Select accepted methods" footer={
        <Button variant="primary" loading={methodSaving} onClick={saveMethods}>Save Payment Methods</Button>
      }>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {ALL_METHODS.map(m => {
            const active = methods.includes(m);
            return (
              <button
                key={m}
                onClick={() => toggleMethod(m)}
                style={{
                  padding: '8px 16px', borderRadius: 'var(--radius-full)',
                  border: `2px solid ${active ? 'var(--blue-500)' : 'var(--border-subtle)'}`,
                  background: active ? 'var(--blue-50)' : 'var(--color-surface)',
                  color: active ? 'var(--blue-700)' : 'var(--text-muted)',
                  fontWeight: 600, cursor: 'pointer', fontSize: 'var(--fs-sm)',
                  fontFamily: 'var(--font-sans)', transition: 'all var(--dur-fast)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                {active && <Icon name="check" size={13} />}
                {m}
              </button>
            );
          })}
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
          Click to toggle. Selected methods appear in the Fee Collection form.
        </p>
      </Card>

    </div>
  );

  if (isMobile) return <div style={{ padding: '16px 16px 80px' }}>{content}</div>;
  return <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>{content}</div>;
}
