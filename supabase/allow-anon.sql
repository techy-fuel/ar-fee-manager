-- Run this in Supabase SQL Editor to allow anon access (no login required)

-- Disable RLS for single-academy use
alter table academies disable row level security;
alter table classes    disable row level security;
alter table students   disable row level security;
alter table payments   disable row level security;
alter table reminders  disable row level security;

-- Drop old auth-based policies (safe to ignore errors if they don't exist)
drop policy if exists "academy_self"  on academies;
drop policy if exists "classes_own"   on classes;
drop policy if exists "students_own"  on students;
drop policy if exists "payments_own"  on payments;
drop policy if exists "reminders_own" on reminders;
