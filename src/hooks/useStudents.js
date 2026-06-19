import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useStudents() {
  const { academy } = useAuth();
  const [students, setStudents]   = useState([]);
  const [classes, setClasses]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const load = useCallback(async () => {
    if (!academy) return;
    setLoading(true);
    const [{ data: s, error: se }, { data: c }] = await Promise.all([
      supabase
        .from('students')
        .select('*, class:classes(name, monthly_fee)')
        .eq('academy_id', academy.id)
        .order('name'),
      supabase
        .from('classes')
        .select('*')
        .eq('academy_id', academy.id)
        .order('name'),
    ]);
    if (se) setError(se.message);
    setStudents(s ?? []);
    setClasses(c ?? []);
    setLoading(false);
  }, [academy]);

  useEffect(() => { load(); }, [load]);

  async function addStudent(data) {
    const { error } = await supabase.from('students').insert({
      ...data,
      academy_id: academy.id,
    });
    if (!error) load();
    return { error };
  }

  async function updateStudent(id, data) {
    const { error } = await supabase.from('students').update(data).eq('id', id);
    if (!error) load();
    return { error };
  }

  async function deleteStudent(id) {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (!error) load();
    return { error };
  }

  return { students, classes, loading, error, addStudent, updateStudent, deleteStudent, reload: load };
}
