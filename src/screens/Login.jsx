import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input.jsx';
import { Button } from '../components/Button.jsx';

export function Login() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode]   = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm]   = useState({ email: '', password: '', fullName: '', academyName: '' });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = mode === 'login'
      ? await signIn({ email: form.email, password: form.password })
      : await signUp({ email: form.email, password: form.password, fullName: form.fullName, academyName: form.academyName });
    if (err) setError(err.message);
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--color-bg)',
      display: 'grid', placeItems: 'center', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/assets/logo-stacked.svg" alt="Al Rehman Fee Manager" style={{ height: 64, marginBottom: 16 }} />
          <h1 style={{ margin: 0, fontSize: 'var(--fs-h3)', fontWeight: 800, color: 'var(--text-strong)' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
            {mode === 'login' ? 'Sign in to your academy' : 'Start managing fees today'}
          </p>
        </div>

        <div style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)', padding: 28,
        }}>
          <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
            {mode === 'signup' && (
              <>
                <Input label="Your Name" placeholder="Ahmed Khan" value={form.fullName} onChange={set('fullName')} required />
                <Input label="Academy Name" placeholder="Al Rehman Academy" value={form.academyName} onChange={set('academyName')} required />
              </>
            )}
            <Input label="Email" type="email" placeholder="admin@academy.edu.pk" value={form.email} onChange={set('email')} required />
            <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required />

            {error && (
              <div style={{
                padding: '10px 14px', background: 'var(--red-50)', border: '1px solid var(--red-200)',
                borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)', color: 'var(--red-700)',
              }}>
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" loading={loading} style={{ marginTop: 4 }}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', fontSize: 'inherit' }}
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', marginTop: 20 }}>
          Al Rehman Fee Manager · Secure & Encrypted
        </p>
      </div>
    </div>
  );
}
