import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { useApp } from '../context/AppContext.jsx';

export function useReminders() {
  const { academy } = useApp();
  const [reminders, setReminders] = useState([]);
  const [pending,   setPending]   = useState([]);
  const [loading,   setLoading]   = useState(true);

  const load = useCallback(async () => {
    if (!academy) return;
    setLoading(true);

    const now        = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

    // Get paid student IDs this month
    const { data: paidThisMonth } = await supabase
      .from('payments')
      .select('student_id')
      .eq('academy_id', academy.id)
      .eq('fee_month', monthStart)
      .eq('status', 'paid');

    const paidIds = (paidThisMonth ?? []).map(p => p.student_id);

    const [{ data: hist }, { data: allStudents }] = await Promise.all([
      supabase.from('reminders')
        .select('*, student:students(name)')
        .eq('academy_id', academy.id)
        .order('sent_at', { ascending: false })
        .limit(20),
      supabase.from('students')
        .select('id, name, parent_phone, class:classes(name, monthly_fee)')
        .eq('academy_id', academy.id)
        .eq('status', 'active'),
    ]);

    const pendingStudents = (allStudents ?? []).filter(s => !paidIds.includes(s.id));

    setReminders(hist ?? []);
    setPending(pendingStudents);
    setLoading(false);
  }, [academy]);

  useEffect(() => { load(); }, [load]);

  async function sendReminder(studentId, amount) {
    const { error } = await supabase.from('reminders').insert({
      academy_id: academy.id, student_id: studentId, amount, status: 'sent',
    });
    if (!error) await load();
    return { error };
  }

  async function sendAll() {
    if (!pending.length) return;
    const rows = pending.map(s => ({
      academy_id: academy.id,
      student_id: s.id,
      amount: s.class?.monthly_fee ?? 0,
      status: 'sent',
    }));
    const { error } = await supabase.from('reminders').insert(rows);
    if (!error) await load();
    return { error };
  }

  return { reminders, pending, loading, sendReminder, sendAll };
}
