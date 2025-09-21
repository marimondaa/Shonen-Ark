-- Supabase init migration for Shonen Ark
-- Safe to run multiple times on fresh databases

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- NEWS
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  cover text,
  content text,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);
alter table public.news enable row level security;

drop policy if exists "news read all" on public.news;
create policy "news read all"
  on public.news for select
  using (true);

-- Authenticated users may write (adjust as needed)
drop policy if exists "news write auth" on public.news;
create policy "news write auth"
  on public.news for all
  to authenticated
  using (true)
  with check (true);

create index if not exists idx_news_published_at on public.news (published_at desc);

-- COLLECTIONS
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  owner_id uuid not null references auth.users(id) on delete cascade,
  is_private boolean default false,
  created_at timestamptz default now()
);
alter table public.collections enable row level security;

drop policy if exists "collections read public or owner" on public.collections;
create policy "collections read public or owner"
  on public.collections for select
  using (auth.uid() = owner_id or is_private = false);

drop policy if exists "collections insert owner only" on public.collections;
create policy "collections insert owner only"
  on public.collections for insert
  to authenticated
  with check (auth.uid() = owner_id);

drop policy if exists "collections update owner only" on public.collections;
create policy "collections update owner only"
  on public.collections for update
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "collections delete owner only" on public.collections;
create policy "collections delete owner only"
  on public.collections for delete
  to authenticated
  using (auth.uid() = owner_id);

-- COLLECTION ITEMS
create table if not exists public.collections_items (
  collection_id uuid references public.collections(id) on delete cascade,
  item_id text not null,
  added_at timestamptz default now(),
  primary key (collection_id, item_id)
);
alter table public.collections_items enable row level security;

drop policy if exists "collections_items read via parent" on public.collections_items;
create policy "collections_items read via parent"
  on public.collections_items for select
  using (
    exists (
      select 1 from public.collections c
      where c.id = collections_items.collection_id
        and (c.is_private = false or c.owner_id = auth.uid())
    )
  );

drop policy if exists "collections_items write owner only" on public.collections_items;
create policy "collections_items write owner only"
  on public.collections_items for all
  to authenticated
  using (
    exists (
      select 1 from public.collections c
      where c.id = collections_items.collection_id
        and c.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.collections c
      where c.id = collections_items.collection_id
        and c.owner_id = auth.uid()
    )
  );

create index if not exists idx_collections_owner on public.collections (owner_id);
create index if not exists idx_collections_items_collection on public.collections_items (collection_id);
