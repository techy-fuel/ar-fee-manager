import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || 'https://xsrkmwzqziepybskuqy.supabase.co';
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzcmttd3pxemJpZXB5YnNrdXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NzAzMjYsImV4cCI6MjA5NzQ0NjMyNn0.sGaI5wwK-ZwCfRIFw7wajbaV9Ik4DLLf525WsksUXTE';

export const supabase = createClient(url, key);
