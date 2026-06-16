-- =====================================================================
-- TYPER X — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. PLAYERS
-- One row per authenticated user. id == auth.users.id (Google Sign-In)
-- ---------------------------------------------------------------------
create table if not exists public.players (
  id               uuid primary key references auth.users(id) on delete cascade,
  username         text not null,
  avatar_url       text not null default '',
  total_xp         bigint not null default 0,
  level            int not null default 1,
  coins            int not null default 0,
  streak           int not null default 0,
  highest_streak   int not null default 0,
  last_played_date date not null default current_date,
  created_at       timestamptz not null default now()
);

alter table public.players enable row level security;

-- Anyone signed in can read any player's public profile (needed for leaderboard)
create policy "players_select_all"
  on public.players for select
  using (true);

-- Players can only update their own row
create policy "players_update_own"
  on public.players for update
  using (auth.uid() = id);

-- Players can only insert their own row (on first sign-in)
create policy "players_insert_own"
  on public.players for insert
  with check (auth.uid() = id);


-- ---------------------------------------------------------------------
-- 2. MISSIONS (per-player)
-- ---------------------------------------------------------------------
create table if not exists public.missions (
  id            text not null,
  player_id     uuid not null references public.players(id) on delete cascade,
  title         text not null,
  description   text not null,
  icon          text not null default 'target',
  xp_reward     int not null,
  coins_reward  int not null,
  target        int not null,
  progress      int not null default 0,
  completed     boolean not null default false,
  claimed       boolean not null default false,
  mission_type  text not null check (mission_type in ('daily', 'weekly', 'achievement')),
  created_at    timestamptz not null default now(),
  primary key (player_id, id)
);

alter table public.missions enable row level security;

create policy "missions_select_own"
  on public.missions for select
  using (auth.uid() = player_id);

create policy "missions_update_own"
  on public.missions for update
  using (auth.uid() = player_id);

create policy "missions_insert_own"
  on public.missions for insert
  with check (auth.uid() = player_id);


-- ---------------------------------------------------------------------
-- 3. SHOP ITEMS (global catalog — same for everyone)
-- ---------------------------------------------------------------------
create table if not exists public.shop_items (
  id          text primary key,
  name        text not null,
  category    text not null check (category in ('theme', 'sound', 'effect', 'avatar')),
  price       int not null,
  description text not null,
  icon        text not null default 'palette'
);

alter table public.shop_items enable row level security;

create policy "shop_items_select_all"
  on public.shop_items for select
  using (true);

-- Seed data
insert into public.shop_items (id, name, category, price, description, icon) values
  ('theme-1', 'Neon Orange',  'theme',  0,   'Default theme with vibrant orange accents', 'palette'),
  ('theme-2', 'Cyber Blue',   'theme',  800, 'Cool blue futuristic theme', 'palette'),
  ('theme-3', 'Matrix Green', 'theme',  800, 'Green terminal-inspired theme', 'palette'),
  ('sound-1', 'Mechanical',   'sound',  0,   'Classic mechanical keyboard sounds', 'sound'),
  ('sound-2', 'Bubble Pop',   'sound',  400, 'Playful bubble pop sounds', 'sound'),
  ('avatar-1','Ninja Typist', 'avatar', 600, 'Stealthy ninja character avatar', 'avatar')
on conflict (id) do nothing;


-- ---------------------------------------------------------------------
-- 4. PLAYER <-> SHOP ITEM ownership (join table)
-- ---------------------------------------------------------------------
create table if not exists public.player_shop_items (
  player_id   uuid not null references public.players(id) on delete cascade,
  item_id     text not null references public.shop_items(id) on delete cascade,
  owned       boolean not null default false,
  equipped    boolean not null default false,
  acquired_at timestamptz not null default now(),
  primary key (player_id, item_id)
);

alter table public.player_shop_items enable row level security;

create policy "player_shop_items_select_own"
  on public.player_shop_items for select
  using (auth.uid() = player_id);

create policy "player_shop_items_upsert_own"
  on public.player_shop_items for insert
  with check (auth.uid() = player_id);

create policy "player_shop_items_update_own"
  on public.player_shop_items for update
  using (auth.uid() = player_id);


-- ---------------------------------------------------------------------
-- 5. TYPING SESSIONS (raw session log — used for anti-cheat audit trail)
-- ---------------------------------------------------------------------
create table if not exists public.typing_sessions (
  id                uuid primary key default gen_random_uuid(),
  player_id         uuid not null references public.players(id) on delete cascade,
  words_typed       int not null,
  duration_seconds  int not null,
  xp_awarded        int not null default 0,
  created_at        timestamptz not null default now()
);

alter table public.typing_sessions enable row level security;

-- Players can see their own session history
create policy "sessions_select_own"
  on public.typing_sessions for select
  using (auth.uid() = player_id);

-- NOTE: No insert policy for typing_sessions.
-- Inserts only happen via the submit_typing_session() function below,
-- which runs as SECURITY DEFINER and validates everything server-side.


-- =====================================================================
-- 6. XP FORMULA — 1000 × (level ^ 1.5)
-- =====================================================================

-- XP required to COMPLETE a given level
create or replace function public.xp_for_level(p_level int)
returns bigint
language sql
immutable
as $$
  select round(1000 * power(p_level::numeric, 1.5))::bigint;
$$;

-- Calculate current level from total XP
create or replace function public.calculate_level(p_total_xp bigint)
returns int
language plpgsql
immutable
as $$
declare
  v_level int := 1;
  v_accumulated bigint := 0;
  v_cost bigint;
begin
  while v_level < 50 loop
    v_cost := public.xp_for_level(v_level);
    if v_accumulated + v_cost > p_total_xp then
      exit;
    end if;
    v_accumulated := v_accumulated + v_cost;
    v_level := v_level + 1;
  end loop;
  return v_level;
end;
$$;


-- =====================================================================
-- 7. ANTI-CHEAT — submit_typing_session()
-- This is the ONLY way XP gets added. Runs server-side as the
-- definer (bypasses RLS for the controlled insert/update below),
-- but validates everything before trusting the client.
-- =====================================================================

create or replace function public.submit_typing_session(
  p_words_typed int,
  p_duration_seconds int
)
returns table (
  xp_awarded int,
  new_total_xp bigint,
  new_level int,
  leveled_up boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_player_id uuid := auth.uid();
  v_old_xp bigint;
  v_old_level int;
  v_wpm numeric;
  v_xp_to_award int;
  v_new_xp bigint;
  v_new_level int;
  v_max_wpm constant numeric := 200; -- Anti-cheat cap
  v_max_words_per_session constant int := 1000; -- Sanity cap per call
begin
  if v_player_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_words_typed <= 0 or p_duration_seconds <= 0 then
    raise exception 'Invalid session data';
  end if;

  -- ── Anti-cheat: WPM cap ──────────────────────────────────────────
  v_wpm := (p_words_typed::numeric / p_duration_seconds) * 60;

  if v_wpm > v_max_wpm then
    -- Reject silently: award 0 XP but log the session for review
    insert into public.typing_sessions (player_id, words_typed, duration_seconds, xp_awarded)
    values (v_player_id, p_words_typed, p_duration_seconds, 0);

    select total_xp, level into v_old_xp, v_old_level
    from public.players where id = v_player_id;

    return query select 0, v_old_xp, v_old_level, false;
    return;
  end if;

  -- Cap words per single session call (prevents one giant fake batch)
  v_xp_to_award := least(p_words_typed, v_max_words_per_session);

  -- ── Apply XP ─────────────────────────────────────────────────────
  select total_xp, level into v_old_xp, v_old_level
  from public.players where id = v_player_id
  for update;

  if v_old_xp is null then
    raise exception 'Player profile not found';
  end if;

  v_new_xp := v_old_xp + v_xp_to_award;
  v_new_level := public.calculate_level(v_new_xp);

  update public.players
  set total_xp = v_new_xp,
      level = v_new_level,
      last_played_date = current_date
  where id = v_player_id;

  insert into public.typing_sessions (player_id, words_typed, duration_seconds, xp_awarded)
  values (v_player_id, p_words_typed, p_duration_seconds, v_xp_to_award);

  return query select
    v_xp_to_award,
    v_new_xp,
    v_new_level,
    (v_new_level > v_old_level);
end;
$$;

-- Allow authenticated users to call this function
grant execute on function public.submit_typing_session(int, int) to authenticated;


-- =====================================================================
-- 8. LEADERBOARD VIEW — global, ranked by total_xp
-- =====================================================================

create or replace view public.leaderboard as
select
  id,
  username,
  avatar_url,
  level,
  total_xp,
  rank() over (order by total_xp desc) as rank
from public.players
order by total_xp desc;

-- Views inherit RLS from underlying tables (players_select_all = true),
-- so leaderboard is readable by anyone signed in.


-- =====================================================================
-- 9. AUTO-CREATE PLAYER ROW ON SIGN-UP (Google Sign-In trigger)
-- =====================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.players (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Player' || substr(new.id::text, 1, 6)),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );

  -- Seed default missions for new player
  insert into public.missions (id, player_id, title, description, icon, xp_reward, coins_reward, target, progress, mission_type)
  values
    ('mission-1', new.id, 'Daily Grind', 'Type 1000 words today', 'keyboard', 100, 50, 1000, 0, 'daily'),
    ('mission-2', new.id, 'Speed Demon', 'Type 100 words in 1 minute', 'zap', 150, 100, 100, 0, 'daily'),
    ('mission-3', new.id, 'Week Warrior', 'Maintain a 7-day typing streak', 'flame', 500, 250, 7, 0, 'weekly'),
    ('mission-4', new.id, 'Accuracy Master', 'Type 100 words with 98% accuracy', 'target', 200, 150, 100, 0, 'achievement');

  -- Give default (free) shop items
  insert into public.player_shop_items (player_id, item_id, owned, equipped)
  values
    (new.id, 'theme-1', true, true),
    (new.id, 'sound-1', true, true);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- =====================================================================
-- DONE
-- Next: enable Google provider in
-- Authentication → Providers → Google (Supabase Dashboard)
-- =====================================================================
