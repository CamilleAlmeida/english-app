-- ============================================
-- English Spaced Repetition App — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- 1. Blocks
create table blocks (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null check (type in ('VOCAB', 'GRAMMAR')),
  "order" int not null,
  intro_card text,
  unlock_after uuid references blocks(id),
  created_at timestamptz default now()
);

-- 2. Items
create table items (
  id uuid primary key default uuid_generate_v4(),
  block_id uuid not null references blocks(id) on delete cascade,
  type text not null check (type in ('WORD', 'PHRASE', 'SENTENCE')),
  content_pt text not null,
  content_en text not null,
  hint text,
  difficulty int not null default 1 check (difficulty between 1 and 3),
  exercises jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

-- 3. User Progress
create table user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id uuid not null references items(id) on delete cascade,
  state text not null default 'NOVA' check (state in ('NOVA', '24H', '7D', '21D', 'DONE')),
  next_review_at timestamptz not null default now(),
  times_seen int not null default 0,
  times_correct int not null default 0,
  times_wrong int not null default 0,
  last_error_type text check (last_error_type in ('CONTENT', 'ATTENTION')),
  updated_at timestamptz default now(),
  unique(user_id, item_id)
);

-- 4. Sessions
create table sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('DAILY', 'SIMULATION')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  total_items int not null default 0,
  correct_count int not null default 0,
  wrong_count int not null default 0
);

-- 5. Error Log
create table error_log (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  item_id uuid not null references items(id) on delete cascade,
  user_answer text not null,
  correct_answer text not null,
  error_type text not null check (error_type in ('CONTENT', 'ATTENTION')),
  response_time_ms int not null,
  created_at timestamptz default now()
);

-- Indexes for performance
create index idx_user_progress_user on user_progress(user_id);
create index idx_user_progress_review on user_progress(user_id, state, next_review_at);
create index idx_items_block on items(block_id);
create index idx_error_log_session on error_log(session_id);
create index idx_sessions_user on sessions(user_id);

-- Row Level Security
alter table user_progress enable row level security;
alter table sessions enable row level security;
alter table error_log enable row level security;

-- RLS Policies: users can only see/edit their own data
create policy "Users can view own progress"
  on user_progress for select using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on user_progress for insert with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on user_progress for update using (auth.uid() = user_id);

create policy "Users can view own sessions"
  on sessions for select using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on sessions for insert with check (auth.uid() = user_id);

create policy "Users can update own sessions"
  on sessions for update using (auth.uid() = user_id);

create policy "Users can view own error logs"
  on error_log for select using (
    session_id in (select id from sessions where user_id = auth.uid())
  );

create policy "Users can insert own error logs"
  on error_log for insert with check (
    session_id in (select id from sessions where user_id = auth.uid())
  );

-- Blocks and Items are public (read-only for everyone)
alter table blocks enable row level security;
alter table items enable row level security;

create policy "Blocks are viewable by everyone"
  on blocks for select using (true);

create policy "Items are viewable by everyone"
  on items for select using (true);
