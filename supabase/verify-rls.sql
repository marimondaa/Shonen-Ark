-- Run only in an isolated Supabase test project's SQL editor AFTER mvp.sql.
-- All fixtures are rolled back. Any assertion failure aborts the transaction.
begin;
insert into auth.users (id, email) values
 ('00000000-0000-4000-8000-000000001101', 'ark-rls-a@example.test'),
 ('00000000-0000-4000-8000-000000001102', 'ark-rls-b@example.test');
insert into public.ark_theories (id,user_id,author_name,title,summary,content,series,status) values
 ('00000000-0000-4000-8000-000000002101','00000000-0000-4000-8000-000000001101','Fixture A','Private draft','Private draft summary',repeat('Private evidence. ',5),'One Piece','draft'),
 ('00000000-0000-4000-8000-000000002102','00000000-0000-4000-8000-000000001101','Fixture A','Public theory','Published theory summary',repeat('Public evidence. ',5),'One Piece','published');
insert into public.ark_collections(id,user_id,title) values
 ('00000000-0000-4000-8000-000000003101','00000000-0000-4000-8000-000000001101','Private collection');

set local role anon;
do $$ begin
 if exists(select 1 from public.ark_theories where id='00000000-0000-4000-8000-000000002101') then raise exception 'Anonymous draft leak'; end if;
 if not exists(select 1 from public.ark_theories where id='00000000-0000-4000-8000-000000002102') then raise exception 'Published theory unreadable'; end if;
end $$;
reset role;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000001102',true);
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000001102","email":"ark-rls-b@example.test","role":"authenticated"}',true);
set local role authenticated;
do $$ declare affected integer; begin
 if exists(select 1 from public.ark_theories where id='00000000-0000-4000-8000-000000002101') then raise exception 'Cross-user draft leak'; end if;
 if exists(select 1 from public.ark_collections where id='00000000-0000-4000-8000-000000003101') then raise exception 'Cross-user collection leak'; end if;
 update public.ark_theories set title='Stolen theory' where id='00000000-0000-4000-8000-000000002102';
 get diagnostics affected = row_count;
 if affected <> 0 then raise exception 'Cross-user update allowed'; end if;
 delete from public.ark_theories where id='00000000-0000-4000-8000-000000002102';
 get diagnostics affected = row_count;
 if affected <> 0 then raise exception 'Cross-user delete allowed'; end if;
 begin
   insert into public.ark_bookmarks(user_id,theory_id,collection_id) values ('00000000-0000-4000-8000-000000001102','00000000-0000-4000-8000-000000002102','00000000-0000-4000-8000-000000003101');
   raise exception 'Cross-user collection assignment allowed';
 exception when insufficient_privilege then null;
 end;
end $$;
-- A reader may save a published theory in their own private library.
insert into public.ark_bookmarks(user_id,theory_id) values ('00000000-0000-4000-8000-000000001102','00000000-0000-4000-8000-000000002102');
reset role;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000001101',true);
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000001101","email":"ark-rls-a@example.test","role":"authenticated"}',true);
set local role authenticated;
do $$ begin
 if exists(select 1 from public.ark_bookmarks where user_id='00000000-0000-4000-8000-000000001102') then raise exception 'Cross-user saved-list leak'; end if;
 if not exists(select 1 from public.ark_theories where id='00000000-0000-4000-8000-000000002101') then raise exception 'Owner cannot read draft'; end if;
end $$;
insert into public.ark_bookmarks(user_id,theory_id,collection_id) values ('00000000-0000-4000-8000-000000001101','00000000-0000-4000-8000-000000002101','00000000-0000-4000-8000-000000003101');
delete from public.ark_collections where id='00000000-0000-4000-8000-000000003101';
do $$ begin
 if not exists(select 1 from public.ark_bookmarks where theory_id='00000000-0000-4000-8000-000000002101' and collection_id is null) then raise exception 'Deleting collection lost saved item'; end if;
end $$;
reset role;
rollback;
-- Success: all assertions passed, no fixtures remain.
