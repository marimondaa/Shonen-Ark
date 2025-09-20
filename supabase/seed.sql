-- Optional seed data for local/dev
insert into public.news (title, slug, cover, content)
values ('Welcome to Shonen Ark', 'welcome-to-shonen-ark', null, '<p>First post.</p>')
on conflict (slug) do nothing;
