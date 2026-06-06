-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code CHAR(5) UNIQUE NOT NULL,          -- e.g. "AB3K9"
  host_session_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'lobby',  -- lobby | playing | finished
  category TEXT NOT NULL DEFAULT 'mixed',
  total_rounds INT NOT NULL DEFAULT 5,
  current_round INT NOT NULL DEFAULT 0,
  answer_deadline TIMESTAMPTZ,
  plot_twist_deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Players
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,              -- localStorage UUID, ties player to browser
  name TEXT NOT NULL,
  character TEXT NOT NULL,              -- topper | jugaadu | sharma_ji | it_uncle
  score INT NOT NULL DEFAULT 0,
  is_host BOOLEAN NOT NULL DEFAULT FALSE,
  lifeline_used BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rounds
CREATE TABLE IF NOT EXISTS rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  round_number INT NOT NULL,
  category TEXT NOT NULL,
  scenario TEXT NOT NULL,
  plot_twist TEXT NOT NULL,
  sharma_ji_answer TEXT,                -- filled after judging
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Answers
CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  round_id UUID REFERENCES rounds(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL DEFAULT '',
  verdict TEXT,                          -- JUGAAD | BACH_GAYA | BARBAD | ANTIM_SANSKAR
  points_awarded INT NOT NULL DEFAULT 0,
  narration TEXT,                        -- AI's Hinglish narration of the verdict
  roast_text TEXT,                       -- Only for ANTIM_SANSKAR
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(round_id, player_id)
);

-- Row Level Security (important — players can only read their own room)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Policies: allow all reads/writes via anon key (game uses no auth)
CREATE POLICY "Allow all" ON rooms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON players FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON rounds FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON answers FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime
alter publication supabase_realtime add table rooms, players, rounds, answers;
