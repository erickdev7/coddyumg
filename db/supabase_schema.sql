-- Supabase schema for CoddyUMG
-- Ejecuta este archivo en el SQL Editor de Supabase.

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key,
  email text unique not null,
  full_name text,
  role text not null default 'student' check (role in ('student', 'teacher')),
  created_at timestamptz not null default now()
);

create table if not exists progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course text not null,
  activity text not null,
  completed boolean not null default false,
  score int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles
  add column if not exists role text not null default 'student';

alter table progress
  add column if not exists score int default 0;

alter table progress
  add column if not exists updated_at timestamptz not null default now();

create unique index if not exists progress_user_course_activity_idx
  on progress (user_id, course, activity);

create table if not exists course_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course text not null check (course in ('python', 'cpp', 'java')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references profiles(id) on delete set null
);

alter table course_enrollments
  add column if not exists reviewed_at timestamptz;

alter table course_enrollments
  add column if not exists reviewed_by uuid references profiles(id) on delete set null;

create unique index if not exists course_enrollments_user_course_idx
  on course_enrollments (user_id, course);

create index if not exists course_enrollments_status_idx
  on course_enrollments (status, requested_at);

create table if not exists course_content (
  id uuid primary key default gen_random_uuid(),
  course text not null,
  content_type text not null check (content_type in ('module', 'lesson', 'exercise', 'challenge', 'quiz')),
  module_number int,
  item_number int,
  title text not null,
  summary text,
  body text,
  example text,
  expected_output text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists course_content_lookup_idx
  on course_content (course, content_type, module_number, item_number);

-- Cuenta administradora/docente principal:
update profiles set role = 'student' where email <> 'eduaguilar619@gmail.com';
update profiles set role = 'teacher' where email = 'eduaguilar619@gmail.com';

-- El codigo de la aplicacion fuerza como docente solo a eduaguilar619@gmail.com.
