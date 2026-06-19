import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function usePayments({ studentId, month } = {}) {
  const { academy } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const load = useCallback(async () => {
    if (!academy) return;
    setLoading(true);
    let q = supabase
      .from('payments')
      .select('*, student:students(name, student_id, class:classes(name))')
      .eq('academy_id', academy.id)
      .order('created_at', { ascending: false });

    if (studentId) q = q.eq('student_id', studentId);
    if (month)     q = q.eq('fee_month', month);

    const { data, error: e } = await q;
    if (e) setError(e.message);
    setPayments(data ?? []);
    setLoading(false);
  }, [academy, studentId, month]);

  useEffect(() => { load(); }, [load]);

  async function recordPayment(data) {
    const { data: inserted, error } = await supabase
      .from('payments')
      .insert({ ...data, academy_id: academy.id })
      .select()
      .single();
    if (!error) load();
    return { data: inserted, error };
  }

  return { payments, loading, error, recordPayment, reload: load };
}

export function useDashboardStats() {
  const { academy } = useAuth();
  const [stats, setStats]       = useState(null);
  const [monthly, setMonthly]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!academy) return;
    load();
  }, [academy]);

  async function load() {
    setLoading(true);
    const year  = new Date().getFullYear();
    const start = `${year}-01-01`;
    const end   = `${year}-12-31`;

    const [{ data: payments }, { data: students }] = await Promise.all([
      supabase
        .from('payments')
        .select('amount, fee_month, status')
        .eq('academy_id', academy.id)
        .gte('fee_month', start)
        .lte('fee_month', end),
      supabase
        .from('students')
        .select('id, class:classes(monthly_fee)', { count: 'exact' })
        .eq('academy_id', academy.id)
        .eq('status', 'active'),
    ]);

    const collected  = (payments ?? []).filter(p => p.status === 'paid').reduce((s, p) => s + Number(p.amount), 0);
    const totalStudents = students?.length ?? 0;
    const avgFee     = students?.reduce((s, st) => s + Number(st.class?.monthly_fee ?? 0), 0) / (totalStudents || 1);
    const expected   = totalStudents * avgFee * 12;
    const pending    = expected - collected;
    const rate       = expected ? Math.round((collected / expected) * 100) : 0;

    setStats({ totalStudents, collected, expected, pending, rate });

    const months = Array.from({ length: 12 }, (_, i) => {
      const m = String(i + 1).padStart(2, '0');
      const label = new Date(year, i).toLocaleString('en', { month: 'short' });
      const monthPayments = (payments ?? []).filter(p => p.fee_month?.startsWith(`${year}-${m}`));
      const received = monthPayments.filter(p => p.status === 'paid').reduce((s, p) => s + Number(p.amount), 0);
      return { month: label, expected: totalStudents * avgFee, received };
    });
    setMonthly(months);
    setLoading(false);
  }

  return { stats, monthly, loading };
}
