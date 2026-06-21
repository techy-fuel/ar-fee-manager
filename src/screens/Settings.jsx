import { useState, useEffect, useRef } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Input } from '../components/Input.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { supabase } from '../lib/supabase.js';

export function Settings({ isMobile }) {
  const { academy, setAcademy } = useApp();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [error, setError]   = useState('');
  const [form, setForm]     = useState({ name: '', email: '', phone: '' });
  const fileRef = useRef(null);
  const [logoSaving, setLogoSaving] = useState(false);

  useEffect(() => {
    if (academy) {
      setForm({ name: academy.name || '', email: academy.email || '', phone: academy.phone || '' });
    }
  }, [academy]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function saveAcademy(e) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Academy name is required.'); return; }
    setSaving(true);
    setError('');
    const { data, error: err } = await supabase
      .from('academies')
      .update({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() })
      .eq('id', academy.id)
      .select().single();
    setSaving(false);
    if (err) { setError(err.message || 'Failed to save.'); return; }
    setAcademy(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
        .eq('id', academy.id)
        .select().single();
      setLogoSaving(false);
      if (err) { setError(err.message || 'Failed to save logo.'); return; }
      setAcademy(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    };
    reader.readAsDataURL(file);
  }

  const content = (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
      <Card title="Academy Information" footer={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button variant="primary" loading={saving} onClick={saveAcademy}>Save Changes</Button>
          {saved && <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--green-600)', fontWeight: 600 }}>Saved!</span>}
          {error && <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--red-600)' }}>{error}</span>}
        </div>
      }>
        <div style={{ display: 'grid', gap: 14 }}>
          <Input label="Academy Name" value={form.name} onChange={set('name')} />
          <Input label="Contact Email" value={form.email} onChange={set('email')} type="email" />
          <Input label="Phone" value={form.phone} onChange={set('phone')} iconLeft={<Icon name="phone" size={15} />} />
        </div>
      </Card>

      <Card title="Academy Logo">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{
            width: 96, height: 96, borderRadius: 'var(--radius-lg)',
            background: 'var(--slate-50)', border: '1px solid var(--border-subtle)',
            display: 'grid', placeItems: 'center', padding: 12, overflow: 'hidden',
          }}>
            <img src={academy?.logo_url || '/assets/logo-mark.svg'} alt="" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={e => e.target.style.display='none'} />
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleLogo(e.target.files?.[0])} />
            <Button variant="secondary" loading={logoSaving} iconLeft={<Icon name="upload" size={16} />} onClick={() => fileRef.current?.click()}>Upload new logo</Button>
            <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>PNG or JPG, up to 600 KB</p>
          </div>
        </div>
      </Card>

      <Card title="WhatsApp Integration" subtitle="Reminder delivery">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: 14,
          background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)',
        }}>
          <WhatsAppIcon size={22} color="var(--whatsapp-dark)" />
          <div style={{ fontSize: 'var(--fs-sm)' }}>
            <b style={{ color: 'var(--green-700)' }}>Active</b>
            <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>Reminders open WhatsApp with pre-filled messages</div>
          </div>
          <Badge variant="success" dot style={{ marginLeft: 'auto' }}>Ready</Badge>
        </div>
      </Card>

      <Card title="Payment Methods">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Bank Transfer', 'JazzCash', 'EasyPaisa', 'Cash'].map(m => (
            <Badge key={m} variant="brand">{m}</Badge>
          ))}
        </div>
      </Card>
    </div>
  );

  if (isMobile) {
    return <div style={{ padding: '16px 16px 80px' }}>{content}</div>;
  }

  return <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>{content}</div>;
}
