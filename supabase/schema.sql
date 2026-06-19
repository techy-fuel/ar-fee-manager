-- Al Rehman Fee Manager — Supabase Schema
-- Run this in your Supabase SQL Editor

-- ─── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Academies (one per school/institute) ────────────────────────────────────
create table if not exists academies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text unique not null,
  phone       text,
  logo_url    text,
  wa_number   text,
  currency    text default 'PKR',
  created_at  timestamptz default now()
);

-- ─── User profiles (linked to auth.users) ────────────────────────────────────
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  academy_id  uuid references academies(id) on delete cascade,
  full_name   text,
  role        text check (role in ('admin','collector','viewer')) default 'admin',
  created_at  timestamptz default now()
);

-- ─── Classes ──────────────────────────────────────────────────────────────────
create table if not exists classes (
  id          uuid primary key default gen_random_uuid(),
  academy_id  uuid references academies(id) on delete cascade,
  name        text not null,
  monthly_fee numeric(10,2) default 0,
  created_at  timestamptz default now()
);

-- ─── Students ─────────────────────────────────────────────────────────────────
create table if not exists students (
  id              uuid primary key default gen_random_uuid(),
  academy_id      uuid references academies(id) on delete cascade,
  class_id        uuid references classes(id),
  student_id      text,
  name            text not null,
  parent_name     text,
  parent_phone    text,
  enrollment_date date,
  status          text check (status in ('active','inactive')) default 'active',
  created_at      timestamptz default now()
);

-- ─── Payments ─────────────────────────────────────────────────────────────────
create table if not exists payments (
  id              uuid primary key default gen_random_uuid(),
  academy_id      uuid references academies(id) on delete cascade,
  student_id      uuid references students(id) on delete cascade,
  amount          numeric(10,2) not null,
  fee_month       date not null,
  payment_date    date not null,
  method          text check (method in ('cash','bank_transfer','jazzcash','easypaisa')),
  transaction_id  text,
  receipt_no      text unique,
  screenshot_url  text,
  status          text check (status in ('paid','pending','partial')) default 'paid',
  notes           text,
  created_at      timestamptz default now()
);

-- ─── Reminders ────────────────────────────────────────────────────────────────
create table if not exists reminders (
  id          uuid primary key default gen_random_uuid(),
  academy_id  uuid references academies(id) on delete cascade,
  student_id  uuid references students(id) on delete cascade,
  amount      numeric(10,2),
  status      text check (status in ('sent','delivered','failed')) default 'sent',
  sent_at     timestamptz default now()
);

-- ─── Row-Level Security ───────────────────────────────────────────────────────
alter table academies  enable row level security;
alter table profiles   enable row level security;
alter table classes    enable row level security;
alter table students   enable row level security;
alter table payments   enable row level security;
alter table reminders  enable row level security;

-- Helper: get calling user's academy_id
create or replace function my_academy_id()
returns uuid language sql stable
as $$ select academy_id from profiles where id = auth.uid() $$;

-- Policies
create policy "academy_self"  on academies  for all using (id = my_academy_id());
create policy "profile_self"  on profiles   for all using (id = auth.uid());
create policy "classes_own"   on classes    for all using (academy_id = my_academy_id());
create policy "students_own"  on students   for all using (academy_id = my_academy_id());
create policy "payments_own"  on payments   for all using (academy_id = my_academy_id());
create policy "reminders_own" on reminders  for all using (academy_id = my_academy_id());

-- ─── Auto-create profile on signup ───────────────────────────────────────────
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  new_academy_id uuid;
begin
  insert into academies (name, email)
    values (
      coalesce(new.raw_user_meta_data->>'academy_name', 'My Academy'),
      new.email
    )
    returning id into new_academy_id;

  insert into profiles (id, academy_id, full_name, role)
    values (
      new.id,
      new_academy_id,
      coalesce(new.raw_user_meta_data->>'full_name', ''),
      'admin'
    );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ─── Auto-generate receipt numbers ───────────────────────────────────────────
create or replace function generate_receipt_no()
returns trigger language plpgsql as $$
declare
  seq int;
  yr  text;
begin
  yr  := to_char(now(), 'YYYY');
  select coalesce(max(cast(split_part(receipt_no, '-', 3) as int)), 0) + 1
    into seq from payments
    where academy_id = new.academy_id
      and receipt_no like 'ARA-' || yr || '-%';

  new.receipt_no := 'ARA-' || yr || '-' || lpad(seq::text, 5, '0');
  return new;
end;
$$;

create or replace trigger set_receipt_no
  before insert on payments
  for each row when (new.receipt_no is null)
  execute function generate_receipt_no();
