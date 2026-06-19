import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Input } from '../components/Input.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../lib/supabase.js';

export function Settings({ isMobile }) {
  const { academy, signOut } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [form, setForm]     = useState({
    name:  academy?.name  || 'Al Rehman Academy',
    email: academy?.email || 'admin@alrehman.edu.pk',
    phone: academy?.phone || '+92 42 35551234',
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function saveAcademy(e) {
    e.preventDefault();
    setSaving(true);
    if (academy?.id) {
      await supabase.from('academies').update({ name: form.name, email: form.email, phone: form.phone }).eq('id', academy.id);
    }
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }
  const content = (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
      <Card title="Academy Information" footer={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button variant="primary" loading={saving} onClick={saveAcademy}>Save Changes</Button>
          {saved && <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--green-600)', fontWeight: 600 }}>Saved!</span>}
        </div>
      }>
        <div style={{ display: 'grid', gap: 14 }}>
          <Input label="Academy Name" value={form.name} onChange={set('name')} />
          <Input label="Contact Email" value={form.email} onChange={set('email')} />
          <Input label="Phone" value={form.phone} onChange={set('phone')} iconLeft={<Icon name="phone" size={15} />} />
        </div>
      </Card>

      <Card title="Academy Logo">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{
            width: 96, height: 96, borderRadius: 'var(--radius-lg)',
            background: 'var(--slate-50)', border: '1px solid var(--border-subtle)',
            display: 'grid', placeItems: 'center', padding: 12,
          }}>
            <img src="/assets/logo-mark.svg" alt="" style={{ maxHeight: '100%' }} />
          </div>
          <Button variant="secondary" iconLeft={<Icon name="upload" size={16} />}>Upload new logo</Button>
        </div>
      </Card>

      <Card title="WhatsApp Integration" subtitle="Reminder delivery">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: 14,
          background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)',
        }}>
          <WhatsAppIcon size={22} color="var(--whatsapp-dark)" />
          <div style={{ fontSize: 'var(--fs-sm)' }}>
            <b style={{ color: 'var(--green-700)' }}>Connected</b>
            <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>Business API · +92 300 1112233</div>
          </div>
          <Badge variant="success" dot style={{ marginLeft: 'auto' }}>Active</Badge>
        </div>
      </Card>

      <Card title="Payment Methods">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Bank Transfer', 'JazzCash', 'EasyPaisa', 'Cash'].map(m => (
            <Badge key={m} variant="brand">{m}</Badge>
          ))}
        </div>
      </Card>

      <Card title="Account" style={isMobile ? {} : { gridColumn: '1 / -1' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
            Signed in as <b style={{ color: 'var(--text-strong)' }}>{academy?.email || 'admin@alrehman.edu.pk'}</b>
          </div>
          <Button variant="danger" iconLeft={<Icon name="logout" size={16} />} onClick={signOut}>Sign Out</Button>
        </div>
      </Card>

      <Card title="User Roles & Permissions" style={isMobile ? {} : { gridColumn: '1 / -1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { role: 'Administrator', perms: ['Full access', 'Manage users', 'All reports'], badge: 'brand' },
            { role: 'Fee Collector',  perms: ['Record payments', 'View students', 'Generate receipts'], badge: 'info' },
            { role: 'Viewer',         perms: ['View dashboard', 'View reports'], badge: 'neutral' },
          ].map(({ role, perms, badge }) => (
            <div key={role} style={{ padding: 14, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--slate-50)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 'var(--fs-sm)' }}>{role}</span>
                <Badge variant={badge} size="sm">{badge === 'brand' ? 'Admin' : role === 'Fee Collector' ? 'Staff' : 'Read-only'}</Badge>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {perms.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
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
