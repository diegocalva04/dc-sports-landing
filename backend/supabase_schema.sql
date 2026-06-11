create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text not null default 'dc-sports-landing',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Service role can manage contact messages"
on public.contact_messages
for all
to service_role
using (true)
with check (true);
