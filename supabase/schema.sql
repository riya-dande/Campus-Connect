-- CampusConnect schema for Supabase (run in SQL editor)

create extension if not exists "pgcrypto";

create type user_role as enum ('university_admin', 'college_admin', 'student');

create table if not exists universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text not null unique
);

create table if not exists colleges (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references universities(id) on delete cascade,
  college_name text not null,
  domain text not null unique
);

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  username text not null,
  role user_role not null,
  university_id uuid references universities(id) on delete set null,
  college_id uuid references colleges(id) on delete set null,
  roll_no text,
  year text,
  emp_id text,
  staff_role text,
  department text,
  created_at timestamp with time zone default now()
);

alter table users add column if not exists roll_no text;
alter table users add column if not exists year text;
alter table users add column if not exists emp_id text;
alter table users add column if not exists staff_role text;
alter table users add column if not exists department text;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    id,
    email,
    username,
    role,
    university_id,
    college_id,
    roll_no,
    year,
    emp_id,
    staff_role,
    department
  )
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'username',
      split_part(new.email, '@', 1)
    ),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'student'::user_role),
    nullif(new.raw_user_meta_data->>'university_id', '')::uuid,
    nullif(new.raw_user_meta_data->>'college_id', '')::uuid,
    new.raw_user_meta_data->>'roll_no',
    new.raw_user_meta_data->>'year',
    new.raw_user_meta_data->>'emp_id',
    new.raw_user_meta_data->>'staff_role',
    new.raw_user_meta_data->>'department'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

alter table universities enable row level security;
alter table colleges enable row level security;
alter table users enable row level security;

-- Public read for org data (needed for signup dropdowns)
create policy "Universities read" on universities
  for select using (true);

create policy "Colleges read" on colleges
  for select using (true);

-- Users: allow self insert/read/update
create policy "Users insert own profile" on users
  for insert with check (auth.uid() = id);

create policy "Users read own profile" on users
  for select using (auth.uid() = id);

create policy "Users update own profile" on users
  for update using (auth.uid() = id);

-- College admin can view users in same college
create policy "College admin read college users" on users
  for select using (
    exists (
      select 1 from users u
      where u.id = auth.uid()
        and u.role = 'college_admin'
        and u.college_id = users.college_id
    )
  );

-- University admin can view users in same university
create policy "University admin read university users" on users
  for select using (
    exists (
      select 1 from users u
      where u.id = auth.uid()
        and u.role = 'university_admin'
        and u.university_id = users.university_id
    )
  );

-- Tasks
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  tag text,
  priority text,
  due_at timestamp with time zone,
  is_done boolean default false,
  created_at timestamp with time zone default now()
);

alter table tasks enable row level security;

create policy "Tasks read own" on tasks
  for select using (auth.uid() = user_id);

create policy "Tasks insert own" on tasks
  for insert with check (auth.uid() = user_id);

create policy "Tasks update own" on tasks
  for update using (auth.uid() = user_id);

create policy "Tasks delete own" on tasks
  for delete using (auth.uid() = user_id);

create index if not exists tasks_user_id_idx on tasks(user_id);
create index if not exists tasks_due_at_idx on tasks(due_at);

-- Chat channels
create table if not exists channels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  type text default 'text',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- Channel members (many-to-many)
create table if not exists channel_members (
  channel_id uuid references channels(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text default 'member',
  joined_at timestamp with time zone default now(),
  primary key (channel_id, user_id)
);

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references channels(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

alter table channels enable row level security;
alter table channel_members enable row level security;
alter table messages enable row level security;

-- Channel access: user must be a member
create policy "Channels read for members" on channels
  for select using (
    exists (
      select 1 from channel_members m
      where m.channel_id = channels.id
        and m.user_id = auth.uid()
    )
  );

create policy "Channels insert self" on channels
  for insert with check (auth.uid() = created_by);

-- Members: manage own membership
create policy "Members read own" on channel_members
  for select using (auth.uid() = user_id);

create policy "Members insert own" on channel_members
  for insert with check (auth.uid() = user_id);

create policy "Members delete own" on channel_members
  for delete using (auth.uid() = user_id);

-- Messages: only members can read/insert
create policy "Messages read for members" on messages
  for select using (
    exists (
      select 1 from channel_members m
      where m.channel_id = messages.channel_id
        and m.user_id = auth.uid()
    )
  );

create policy "Messages insert for members" on messages
  for insert with check (
    auth.uid() = sender_id
    and exists (
      select 1 from channel_members m
      where m.channel_id = messages.channel_id
        and m.user_id = auth.uid()
    )
  );

create index if not exists channels_name_idx on channels(name);
create index if not exists channel_members_user_idx on channel_members(user_id);
create index if not exists messages_channel_idx on messages(channel_id);
