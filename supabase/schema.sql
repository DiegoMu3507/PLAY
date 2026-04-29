-- supabase/schema.sql
-- Ejecutar en el SQL Editor de tu proyecto Supabase

-- Tabla de perfiles de usuario (extiende auth.users de Supabase)
create table public.user_profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text not null,
  type       text not null check (type in ('parent', 'child')),
  created_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can read own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Tabla de perfiles de hijos
create table public.child_profiles (
  id         uuid primary key default gen_random_uuid(),
  parent_id  uuid not null references public.user_profiles(id) on delete cascade,
  name       text not null,
  birth_year int  not null,
  avatar     text not null default '🧒'
);

alter table public.child_profiles enable row level security;

create policy "Parents can manage their children"
  on public.child_profiles for all
  using (auth.uid() = parent_id);

-- Tabla de sesiones de juego
create table public.game_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.user_profiles(id) on delete cascade,
  game_id          text not null,
  score            int  not null default 0,
  duration_seconds int  not null default 0,
  completed        boolean not null default false,
  played_at        timestamptz default now()
);

alter table public.game_sessions enable row level security;

create policy "Users can manage own sessions"
  on public.game_sessions for all
  using (auth.uid() = user_id);

-- Tabla de progreso por juego
create table public.progress (
  user_id        uuid not null references public.user_profiles(id) on delete cascade,
  game_id        text not null,
  best_score     int  not null default 0,
  times_played   int  not null default 0,
  skill_category text not null,
  updated_at     timestamptz default now(),
  primary key (user_id, game_id)
);

alter table public.progress enable row level security;

create policy "Users can manage own progress"
  on public.progress for all
  using (auth.uid() = user_id);

-- Tabla de logros
create table public.achievements (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.user_profiles(id) on delete cascade,
  achievement_key text not null,
  unlocked_at     timestamptz default now(),
  unique (user_id, achievement_key)
);

alter table public.achievements enable row level security;

create policy "Users can manage own achievements"
  on public.achievements for all
  using (auth.uid() = user_id);
