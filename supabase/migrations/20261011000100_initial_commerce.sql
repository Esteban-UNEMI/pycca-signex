-- Initial PYCCA schema. Apply only to the confirmed project after preflight.
begin;
-- Casa Viva / commerce studio
-- Base inicial para Supabase. Ejecutar en el SQL editor del proyecto.

create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'catalog_editor', 'store_operator', 'finance_analyst', 'seller', 'store_manager', 'inventory_operator', 'support_agent', 'customer');
create type public.order_status as enum ('pending', 'paid', 'preparing', 'ready_for_pickup', 'shipped', 'delivered', 'cancelled', 'refunded');
create type public.sales_channel as enum ('online', 'store');
create type public.fulfillment_method as enum ('delivery', 'pickup');
create type public.payment_status as enum ('pending', 'authorized', 'paid', 'failed', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  seller_id uuid references public.profiles(id) on delete set null,
  sku text not null unique,
  name text not null,
  slug text not null unique,
  description text,
  brand text,
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2) check (compare_at_price is null or compare_at_price >= price),
  cost numeric(12,2) check (cost is null or cost >= 0),
  rating numeric(2,1) not null default 0 check (rating between 0 and 5),
  review_count int not null default 0 check (review_count >= 0),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  name text not null,
  price numeric(12,2) check (price is null or price >= 0),
  compare_at_price numeric(12,2),
  attributes jsonb not null default '{}'::jsonb,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.product_attributes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  value text not null,
  sort_order int not null default 0
);

create table public.product_relations (
  product_id uuid not null references public.products(id) on delete cascade,
  related_product_id uuid not null references public.products(id) on delete cascade,
  relation_type text not null default 'related' check (relation_type in ('related', 'upsell', 'cross_sell', 'bundle')),
  sort_order int not null default 0,
  primary key (product_id, related_product_id, relation_type),
  check (product_id <> related_product_id)
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0,
  is_primary boolean not null default false
);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  address text,
  city text,
  phone text,
  latitude numeric,
  longitude numeric,
  is_online boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.inventory_levels (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  quantity int not null default 0 check (quantity >= 0),
  reserved int not null default 0 check (reserved >= 0),
  reorder_point int not null default 5 check (reorder_point >= 0),
  updated_at timestamptz not null default now(),
  unique(product_id, store_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.profiles(id) on delete set null,
  store_id uuid references public.stores(id) on delete set null,
  channel public.sales_channel not null default 'online',
  status public.order_status not null default 'pending',
  fulfillment public.fulfillment_method not null default 'delivery',
  payment_status public.payment_status not null default 'pending',
  subtotal numeric(12,2) not null default 0,
  shipping_total numeric(12,2) not null default 0,
  discount_total numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  shipping_address jsonb,
  pickup_person jsonb,
  city text,
  customer_note text,
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.order_status not null,
  note text,
  changed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  sku text,
  unit_price numeric(12,2) not null,
  quantity int not null check (quantity > 0),
  total numeric(12,2) generated always as (unit_price * quantity) stored
);

create table public.theme_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique default 'default',
  settings jsonb not null default '{"brand":"#064d49","accent":"#e98361","surface":"#f7f7f4","radius":"round","density":"comfortable"}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  customer_id uuid references public.profiles(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  title text,
  body text,
  is_verified_purchase boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.wishlists (
  customer_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (customer_id, product_id)
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percentage', 'fixed', 'free_shipping')),
  discount_value numeric(12,2) not null default 0 check (discount_value >= 0),
  minimum_amount numeric(12,2) not null default 0 check (minimum_amount >= 0),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  usage_limit int,
  used_count int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.shipping_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cities text[] not null default '{}',
  price numeric(12,2) not null default 0,
  free_from numeric(12,2),
  estimated_days text,
  is_active boolean not null default true
);

create table public.store_registers (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  code text not null unique,
  is_open boolean not null default false,
  opened_by uuid references public.profiles(id) on delete set null,
  opened_at timestamptz,
  closed_at timestamptz
);

create index products_category_idx on public.products(category_id);
create index products_brand_idx on public.products(brand);
create index product_variants_product_idx on public.product_variants(product_id);
create index product_attributes_product_idx on public.product_attributes(product_id);
create index inventory_product_idx on public.inventory_levels(product_id);
create index orders_customer_idx on public.orders(customer_id);
create index orders_status_idx on public.orders(status);
create index order_status_history_order_idx on public.order_status_history(order_id);
create index reviews_product_idx on public.reviews(product_id);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.stores enable row level security;
alter table public.inventory_levels enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.theme_settings enable row level security;
alter table public.brands enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_attributes enable row level security;
alter table public.product_relations enable row level security;
alter table public.order_status_history enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlists enable row level security;
alter table public.coupons enable row level security;
alter table public.shipping_zones enable row level security;
alter table public.store_registers enable row level security;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'catalog_editor', 'store_operator', 'finance_analyst', 'seller', 'store_manager', 'inventory_operator', 'support_agent')); $$;

create or replace function public.can_manage_catalog()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'catalog_editor')); $$;

create policy "Public can view active catalog" on public.categories for select using (is_active = true);
create policy "Public can view active brands" on public.brands for select using (is_active = true);
create policy "Public can view active products" on public.products for select using (is_active = true);
create policy "Public can view product images" on public.product_images for select using (true);
create policy "Public can view active variants" on public.product_variants for select using (is_active = true);
create policy "Public can view product attributes" on public.product_attributes for select using (true);
create policy "Public can view product relations" on public.product_relations for select using (true);
create policy "Public can view active stores" on public.stores for select using (is_active = true);
create policy "Public can view published reviews" on public.reviews for select using (is_published = true);
create policy "Public can view shipping zones" on public.shipping_zones for select using (is_active = true);
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Customers can view own orders" on public.orders for select using (auth.uid() = customer_id);
create policy "Customers can view own order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.customer_id = auth.uid()));

create policy "Staff can manage categories" on public.categories for all using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "Staff can manage products" on public.products for all using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "Staff can manage product images" on public.product_images for all using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "Staff can manage variants" on public.product_variants for all using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "Staff can manage attributes" on public.product_attributes for all using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "Staff can manage relations" on public.product_relations for all using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "Staff can manage inventory" on public.inventory_levels for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage orders" on public.orders for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage order items" on public.order_items for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage order history" on public.order_status_history for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage stores" on public.stores for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage registers" on public.store_registers for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff can manage theme" on public.theme_settings for all using (public.can_manage_catalog()) with check (public.can_manage_catalog());
create policy "Staff can manage reviews" on public.reviews for all using (public.is_staff()) with check (public.is_staff());
create policy "Customers manage own wishlist" on public.wishlists for all using (auth.uid() = customer_id) with check (auth.uid() = customer_id);
create policy "Staff can manage coupons" on public.coupons for all using (public.is_staff()) with check (public.is_staff());

-- En producción: añade políticas de escritura para admin/editor y un trigger que cree
-- profiles al registrarse en auth.users. No se dejan abiertas por defecto.

commit;
