begin;
-- PYCCA academic admin extension. Run AFTER schema.sql when the Supabase project is connected.
-- Local demo IDs need mapping to UUIDs during migration; this file does not import local data.
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text not null unique,
  phone text,
  city text,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.customers enable row level security;
drop policy if exists "Staff manage CRM customers" on public.customers;
create policy "Staff manage CRM customers" on public.customers for all to authenticated
using (public.is_staff()) with check (public.is_staff());

create table if not exists public.site_settings (
  id text primary key default 'main' check (id = 'main'),
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "Public read storefront settings" on public.site_settings;
create policy "Public read storefront settings" on public.site_settings for select using (true);
drop policy if exists "Catalog staff manage storefront settings" on public.site_settings;
create policy "Catalog staff manage storefront settings" on public.site_settings for all to authenticated
using (public.can_manage_catalog()) with check (public.can_manage_catalog());
drop policy if exists "Public read storefront theme" on public.theme_settings;
create policy "Public read storefront theme" on public.theme_settings for select using (true);
-- Real staff accounts must be created through Supabase Auth; never store passwords in these tables.
-- Checkout stock and order writes must become one database transaction/RPC when connecting Supabase.

commit;
