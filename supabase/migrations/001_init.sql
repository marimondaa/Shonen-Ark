-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'fan' CHECK (role IN ('fan', 'creator', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_public_read" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_own_update" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_own_insert" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Theories table
CREATE TABLE IF NOT EXISTS theories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE theories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "theories_published_or_own" ON theories
  FOR SELECT USING (status = 'published' OR user_id = auth.uid());

CREATE POLICY "theories_own_insert" ON theories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "theories_own_update" ON theories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "theories_own_delete" ON theories
  FOR DELETE USING (auth.uid() = user_id);

-- 3. Anime table
CREATE TABLE IF NOT EXISTS anime (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year INT,
  genres TEXT[],
  anilist_id INT UNIQUE,
  synced_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE anime ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anime_public_read" ON anime
  FOR SELECT USING (true);

-- 4. Gigs (job board) table
CREATE TABLE IF NOT EXISTS gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gigs_public_read" ON gigs
  FOR SELECT USING (status = 'open' OR creator_id = auth.uid());

CREATE POLICY "gigs_creator_write" ON gigs
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "gigs_creator_update" ON gigs
  FOR UPDATE USING (auth.uid() = creator_id);

-- 5. Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id),
  table_name TEXT,
  record_id UUID,
  changes JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_logs_admin_read" ON audit_logs
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));
