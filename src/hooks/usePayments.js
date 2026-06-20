import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { useApp } from '../context/AppContext.jsx';

export function usePayments() {
  const { academy } = useApp();
  const [payments, setPayments] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const load = useCallback(async () => {
    if (!academy) return;
    setLoading(true);
    const { data } = await supabase
      .from('payments')
      .select('*, student:students(name, student_id, parent_phone, class:classes(name))')
      .eq('academy_id', academy.id)
      .order('created_at', { ascending: false });
    setPayments(data ?? []);
    setLoading(false);
  }, [academy]);

  useEffect(() => { load(); }, [load]);

  async function recordPayment(data) {
    const { data: inserted, error } = await supabase
      .from('payments')
      .insert({ ...data, academy_id: academy.id })
      .select().single();
    if (!error) await load();
    return { data: inserted, error };
  }

  return { payments, loading, recordPayment, reload: load };
}

export function useDashboardStats() {
  const { academy } = useApp();
  const [stats,   setStats]   = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [yearly,  setYearly]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (academy) load(); }, [academy]);

  async function load() {
    setLoading(true);
    const year  = new Date().getFullYear();
    const start = `${year}-01-01`;
    const end   = `${year}-12-31`;

    const [{ data: payments }, { data: students }, { data: allPayments }] = await Promise.all([
      supabase.from('payments').select('amount, fee_month, status')
        .eq('academy_id', academy.id).gte('fee_month', start).lte('fee_month', end),
      supabase.from('students')
        .select('id, class:classes(monthly_fee)')
        .eq('academy_id', academy.id).eq('status', 'active'),
      supabase.from('payments').select('amount, fee_month, status')
        .eq('academy_id', academy.id).eq('status', 'paid'),
    ]);

    const collected     = (payments ?? []).filter(p => p.status === 'paid').reduce((s, p) => s + Number(p.amount), 0);
    const totalStudents = students?.length ?? 0;
    const avgFee        = totalStudents ? students.reduce((s, st) => s + Number(st.class?.monthly_fee ?? 0), 0) / totalStudents : 0;
    const expected      = totalStudents * avgFee * 12;
    const pending       = Math.max(0, expected - collected);
    const rate          = expected ? Math.round((collected / expected) * 100) : 0;

    setStats({ totalStudents, collected, expected, pending, rate });

    // Monthly chart data for current year — uses 'm' key to match chart components
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const m    = String(i + 1).padStart(2, '0');
      const label = new Date(year, i).toLocaleString('en', { month: 'short' });
      const monthPayments = (payments ?? []).filter(p => p.fee_month?.startsWith(`${year}-${m}`));
      const received = monthPayments.filter(p => p.status === 'paid').reduce((s, p) => s + Number(p.amount), 0);
      return { m: label, expected: Math.round(totalStudents * avgFee), received };
    });
    setMonthly(monthlyData);

    // Yearly revenue grouped by year (in thousands)
    const byYear = {};
    (allPayments ?? []).forEach(p => {
      const yr = p.fee_month?.slice(0, 4);
      if (yr) byYear[yr] = (byYear[yr] || 0) + Number(p.amount);
    });
    const yearlyData = Object.entries(byYear)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([y, total]) => ({ y, revenue: +(total / 1000000).toFixed(1) }));
    setYearly(yearlyData.length ? yearlyData : [{ y: String(year), revenue: 0 }]);

    setLoading(false);
  }

  return { stats, monthly, yearly, loading };
}
