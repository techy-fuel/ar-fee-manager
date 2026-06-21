import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { useApp } from '../context/AppContext.jsx';

export function useStudents() {
  const { academy } = useApp();
  const [students, setStudents] = useState([]);
  const [classes,  setClasses]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  const load = useCallback(async () => {
    if (!academy) return;
    setLoading(true);
    const [{ data: s }, { data: c }] = await Promise.all([
      supabase.from('students')
        .select('*, class:classes(name, monthly_fee)')
        .eq('academy_id', academy.id)
        .order('name'),
      supabase.from('classes')
        .select('*')
        .eq('academy_id', academy.id)
        .order('name'),
    ]);
    setStudents(s ?? []);
    setClasses(c ?? []);
    setLoading(false);
  }, [academy]);

  useEffect(() => { load(); }, [load]);

  async function addStudent(data) {
    if (!academy) return { error: { message: 'Database not connected. Reload the page.' } };
    const { error } = await supabase.from('students').insert({ ...data, academy_id: academy.id });
    if (!error) await load();
    return { error };
  }

  async function updateStudent(id, data) {
    const { error } = await supabase.from('students').update(data).eq('id', id);
    if (!error) await load();
    return { error };
  }

  async function deleteStudent(id) {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (!error) await load();
    return { error };
  }

  async function addClass(name, monthly_fee) {
    if (!academy) return { error: { message: 'Database not connected. Reload the page.' } };
    const { error } = await supabase.from('classes').insert({ name, monthly_fee: Number(monthly_fee) || 0, academy_id: academy.id });
    if (!error) await load();
    return { error };
  }

  async function updateClass(id, name, monthly_fee) {
    const { error } = await supabase.from('classes').update({ name, monthly_fee: Number(monthly_fee) || 0 }).eq('id', id);
    if (!error) await load();
    return { error };
  }

  async function deleteClass(id) {
    // Unlink students first to avoid FK violation, then delete class
    await supabase.from('students').update({ class_id: null }).eq('class_id', id);
    const { error } = await supabase.from('classes').delete().eq('id', id);
    if (!error) await load();
    return { error };
  }

  async function bulkAddStudents(rows) {
    if (!academy) return { error: { message: 'Database not connected. Reload the page.' } };
    const { error } = await supabase.from('students').insert(rows.map(r => ({ ...r, academy_id: academy.id, status: 'active' })));
    if (!error) await load();
    return { error };
  }

  return { students, classes, loading, addStudent, updateStudent, deleteStudent, addClass, updateClass, deleteClass, bulkAddStudents, reload: load };
}
