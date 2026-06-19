import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useReminders() {
  const { academy } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [pending, setPending]     = useState([]);
  const [loading, setLoading]     = useState(true);

  const load = useCallback(async () => {
    if (!academy) return;
    setLoading(true);

    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

    const [{ data: hist }, { data: pend }] = await Promise.all([
      supabase
        .from('reminders')
        .select('*, student:students(name)')
        .eq('academy_id', academy.id)
        .order('sent_at', { ascending: false })
        .limit(20),
      supabase
        .from('students')
        .select('id, name, parent_phone, class:classes(name, monthly_fee)')
        .eq('academy_id', academy.id)
        .eq('status', 'active')
        .not('id', 'in', `(
          select student_id from payments
          where academy_id = '${academy.id}'
            and fee_month = '${monthStart}'
            and status = 'paid'
        )`),
    ]);

    setReminders(hist ?? []);
    setPending(pend ?? []);
    setLoading(false);
  }, [academy]);

  useEffect(() => { load(); }, [load]);

  async function sendReminder(studentId, amount) {
    const { error } = await supabase.from('reminders').insert({
      academy_id: academy.id,
      student_id: studentId,
      amount,
      status: 'sent',
    });
    if (!error) load();
    return { error };
  }

  async function sendAll() {
    const rows = pending.map(s => ({
      academy_id: academy.id,
      student_id: s.id,
      amount: s.class?.monthly_fee ?? 0,
      status: 'sent',
    }));
    const { error } = await supabase.from('reminders').insert(rows);
    if (!error) load();
    return { error };
  }

  return { reminders, pending, loading, sendReminder, sendAll };
}
