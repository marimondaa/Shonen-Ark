-- Shonen Ark MVP. Run this file once in a NEW or reviewed Supabase project.
-- Additive: historical tables are not modified. Do not run legacy migrations alongside it.
begin;
create table public.ark_theories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 40),
  title text not null check (char_length(title) between 5 and 140),
  summary text not null check (char_length(summary) between 10 and 400),
  content text not null check (char_length(content) between 50 and 20000),
  series text not null check (series in ('One Piece','Naruto','Bleach','Jujutsu Kaisen','Demon Slayer','Attack on Titan','Other')),
  status text not null default 'draft' check (status in ('draft','published')),
  spoiler boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.ark_theories enable row level security;
create policy theory_read on public.ark_theories for select using (status = 'published' or user_id = (select auth.uid()));
create policy theory_insert on public.ark_theories for insert to authenticated with check (user_id = (select auth.uid()));
create policy theory_update on public.ark_theories for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy theory_delete on public.ark_theories for delete to authenticated using (user_id = (select auth.uid()));
create index ark_theories_feed on public.ark_theories(status, created_at desc);
create index ark_theories_owner on public.ark_theories(user_id);

create table public.ark_collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 2 and 80),
  created_at timestamptz not null default now()
);
alter table public.ark_collections enable row level security;
create policy collection_owner on public.ark_collections for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create index ark_collections_owner on public.ark_collections(user_id);

create table public.ark_bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  theory_id uuid not null references public.ark_theories(id) on delete cascade,
  collection_id uuid references public.ark_collections(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key(user_id, theory_id)
);
alter table public.ark_bookmarks enable row level security;
create policy bookmark_read on public.ark_bookmarks for select to authenticated using (user_id = (select auth.uid()));
create policy bookmark_insert on public.ark_bookmarks for insert to authenticated with check (user_id = (select auth.uid()) and (collection_id is null or exists (select 1 from public.ark_collections c where c.id = collection_id and c.user_id = (select auth.uid()))) and exists (select 1 from public.ark_theories t where t.id = theory_id and (t.status = 'published' or t.user_id = (select auth.uid()))));
create policy bookmark_update on public.ark_bookmarks for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()) and (collection_id is null or exists (select 1 from public.ark_collections c where c.id = collection_id and c.user_id = (select auth.uid()))) and exists (select 1 from public.ark_theories t where t.id = theory_id and (t.status = 'published' or t.user_id = (select auth.uid()))));
create policy bookmark_delete on public.ark_bookmarks for delete to authenticated using (user_id = (select auth.uid()));

create table public.ark_gigs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 40),
  title text not null check (char_length(title) between 5 and 140),
  description text not null check (char_length(description) between 30 and 5000),
  budget text not null check (char_length(budget) between 2 and 80),
  contact_url text not null check (contact_url ~ '^https://' and char_length(contact_url) <= 500),
  status text not null default 'open' check (status in ('open','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.ark_gigs enable row level security;
create policy gig_read on public.ark_gigs for select using (status = 'open' or user_id = (select auth.uid()));
create policy gig_insert on public.ark_gigs for insert to authenticated with check (user_id = (select auth.uid()));
create policy gig_update on public.ark_gigs for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy gig_delete on public.ark_gigs for delete to authenticated using (user_id = (select auth.uid()));
create index ark_gigs_feed on public.ark_gigs(status, created_at desc);
create index ark_gigs_owner on public.ark_gigs(user_id);

create table public.ark_contact (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  subject text not null check (char_length(subject) between 5 and 140),
  message text not null check (char_length(message) between 20 and 5000),
  created_at timestamptz not null default now()
);
alter table public.ark_contact enable row level security;
create policy contact_insert on public.ark_contact for insert to authenticated with check (user_id = (select auth.uid()) and email = (select auth.jwt()->>'email'));
-- Contact messages are readable only through the project's trusted database administration.
revoke all on public.ark_theories, public.ark_gigs, public.ark_bookmarks, public.ark_collections, public.ark_contact from anon, authenticated;
grant select on public.ark_theories, public.ark_gigs to anon;
grant select, insert, update, delete on public.ark_theories, public.ark_gigs, public.ark_bookmarks, public.ark_collections to authenticated;
grant insert on public.ark_contact to authenticated;
commit;
