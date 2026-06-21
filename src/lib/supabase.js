import { createClient } from '@supabase/supabase-js';

const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzcmttd3pxemJpZXB5YnNrdXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NzAzMjYsImV4cCI6MjA5NzQ0NjMyNn0.sGaI5wwK-ZwCfRIFw7wajbaV9Ik4DLLf525WsksUXTE';

// Derive the project ref straight from the anon key (a JWT). This guarantees
// the URL always matches the key — a hand-typed URL once had a typo that broke
// every request, so we never trust a typed host over the key's own ref.
function refFromKey(jwt) {
  try {
    const payload = jwt.split('.')[1];
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return json.ref || null;
  } catch {
    return null;
  }
}

const ref     = refFromKey(key);
const envUrl  = import.meta.env.VITE_SUPABASE_URL;
const refHost = ref ? `https://${ref}.supabase.co` : null;

// Prefer the URL derived from the key. Only use an env URL if it matches the
// key's ref (otherwise it's a typo / wrong project and would fail to fetch).
let url = refHost;
if (envUrl && (!ref || envUrl.includes(ref))) url = envUrl;
if (!url) url = envUrl || 'https://xsrkmwzqzbiepybskuqy.supabase.co';

export const supabase = createClient(url, key);
