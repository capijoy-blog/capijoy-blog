create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null check (locale in ('pt','en','es')),
  title text not null,
  excerpt text,
  content_html text not null,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  updated_at timestamptz default now(),
  cover_image_url text
);

alter table public.posts enable row level security;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'posts_slug_key'
      and conrelid = 'public.posts'::regclass
  ) then
    alter table public.posts drop constraint posts_slug_key;
  end if;
end $$;

create unique index if not exists posts_slug_locale_key
  on public.posts (slug, locale);

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'posts'
      and policyname = 'read published'
  ) then
    create policy "read published" on public.posts for select
      using (status = 'published');
  end if;
end $$;
