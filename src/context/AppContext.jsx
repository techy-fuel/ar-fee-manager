import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AppContext = createContext(null);

async function initAcademy() {
  const { data: existing } = await supabase.from('academies').select('*').limit(1).maybeSingle();
  if (existing) return existing;
  const { data: created } = await supabase
    .from('academies')
    .insert({ name: 'Al Rehman Academy', email: 'admin@alrehman.edu.pk', phone: '+92 42 35551234' })
    .select().single();
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
