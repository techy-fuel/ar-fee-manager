import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AppContext = createContext(null);

async function initAcademy() {
  // Always pick the oldest academy so the same one is used across sessions
  const { data: existing, error: selErr } = await supabase
    .from('academies')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1);
  if (selErr) console.error('initAcademy select error:', selErr.message);
  if (existing && existing.length) return existing[0];

  const { data: created, error: insErr } = await supabase
    .from('academies')
    .insert({ name: 'Al Rehman Academy', email: 'admin@alrehman.edu.pk', phone: '+92 42 35551234' })
    .select().single();
  if (insErr) console.error('initAcademy insert error:', insErr.message);
  return created;
}

export function AppProvider({ children }) {
  const [academy, setAcademy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAcademy()
      .then(a => { setAcademy(a); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AppContext.Provider value={{ academy, setAcademy, loading }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
