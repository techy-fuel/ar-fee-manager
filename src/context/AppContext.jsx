import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AppContext = createContext(null);

async function initAcademy() {
  // Fetch all academies; pick the oldest so the same one is used every session.
  const { data, error } = await supabase.from('academies').select('*');
  if (error) throw new Error('Cannot read academies: ' + error.message);

  if (data && data.length) {
    const sorted = [...data].sort((a, b) =>
      String(a.created_at || '').localeCompare(String(b.created_at || '')));
    return sorted[0];
  }

  // None exist yet — create the default academy.
  const { data: created, error: insErr } = await supabase
    .from('academies')
    .insert({ name: 'Al Rehman Academy', email: 'admin@alrehman.edu.pk', phone: '+92 42 35551234' })
    .select().single();
  if (insErr) throw new Error('Cannot create academy: ' + insErr.message);
  return created;
}

export function AppProvider({ children }) {
  const [academy, setAcademy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  function init() {
    setLoading(true);
    setError('');
    initAcademy()
      .then(a => { setAcademy(a); setLoading(false); })
      .catch(e => { console.error('initAcademy failed:', e); setError(e.message || 'Database connection failed'); setLoading(false); });
  }

  useEffect(() => { init(); }, []);

  return (
    <AppContext.Provider value={{ academy, setAcademy, loading, error, retry: init }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
