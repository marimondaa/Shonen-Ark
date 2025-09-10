-- ===========================================
-- SHONEN ARK DATABASE SCHEMA
-- Backend & Automation Enhancement
-- ===========================================

-- Add missing tables for backend automation

-- ===========================================
-- 📝 PROJECTS TABLE (Enhanced)
-- ===========================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR NOT NULL CHECK (category IN ('fan-fights', 'audio-fx', 'character-designs', 'theories')),
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  file_url VARCHAR,
  thumbnail_url VARCHAR,
  file_size INTEGER,
  mime_type VARCHAR,
  duration INTEGER, -- for videos/audio
  metadata JSONB,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES users(id)
);

-- ===========================================
-- 📅 CALENDAR ENTRIES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS calendar_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anime_id INTEGER NOT NULL,
  title VARCHAR NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('anime', 'manga')),
  episode_number INTEGER,
  chapter_number INTEGER,
  release_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR NOT NULL,
  cover_image VARCHAR,
  banner_image VARCHAR,
  description TEXT,
  genres TEXT[],
  studio VARCHAR,
  average_score INTEGER,
  popularity INTEGER,
  anilist_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint to prevent duplicates
  UNIQUE(anime_id, type, episode_number, chapter_number)
);

-- ===========================================
-- 📧 NEWSLETTER SUBSCRIBERS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source VARCHAR, -- 'signup', 'manual', 'import'
  preferences JSONB DEFAULT '{}',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  last_email_sent TIMESTAMP WITH TIME ZONE,
  bounce_count INTEGER DEFAULT 0,
  
  -- Email validation
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ===========================================
-- 🔍 ADMIN LOGS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id),
  action VARCHAR NOT NULL,
  target_type VARCHAR, -- 'project', 'user', 'system'
  target_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Index for searching logs
  CHECK (admin_id IS NOT NULL OR admin_id = 'system')
);

-- ===========================================
-- 💬 PROJECT COMMENTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS project_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES project_comments(id), -- for replies
  is_deleted BOOLEAN DEFAULT FALSE,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 🏷️ PROJECT TAGS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS project_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR UNIQUE NOT NULL,
  category VARCHAR,
  color VARCHAR DEFAULT '#667eea',
  description TEXT,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 🔗 PROJECT TAG ASSOCIATIONS
-- ===========================================
CREATE TABLE IF NOT EXISTS project_tag_associations (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES project_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (project_id, tag_id)
);

-- ===========================================
-- 👍 PROJECT LIKES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS project_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate likes
  UNIQUE(project_id, user_id)
);

-- ===========================================
-- 🔔 NOTIFICATION QUEUE TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL, -- 'email', 'push', 'sms'
  channel VARCHAR NOT NULL, -- 'welcome', 'project_approved', 'comment_reply'
  subject VARCHAR,
  content TEXT NOT NULL,
  template_data JSONB,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 📈 ANALYTICS EVENTS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id UUID,
  event_type VARCHAR NOT NULL,
  event_data JSONB,
  page_url VARCHAR,
  referrer VARCHAR,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 🔧 SYSTEM SETTINGS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS system_settings (
  key VARCHAR PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  category VARCHAR DEFAULT 'general',
  is_public BOOLEAN DEFAULT FALSE,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- 📰 NEWS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  tags TEXT[],
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "news are publicly viewable" ON news
  FOR SELECT USING (true);

-- Optional: restrict inserts to authenticated users only
CREATE POLICY "authenticated can insert news" ON news
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ===========================================
-- 📚 COLLECTIONS TABLES
-- ===========================================
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_collections_owner ON collections(owner_id);
CREATE INDEX IF NOT EXISTS idx_collections_created_at ON collections(created_at DESC);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can view non-private collections" ON collections
  FOR SELECT USING (NOT is_private);

CREATE POLICY "owners can view their collections" ON collections
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "owners can insert collections" ON collections
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "owners can update their collections" ON collections
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "owners can delete their collections" ON collections
  FOR DELETE USING (owner_id = auth.uid());

-- Junction for items inside collections (generic)
CREATE TABLE IF NOT EXISTS collections_items (
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  item_type TEXT DEFAULT 'theory',
  added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (collection_id, item_id)
);

CREATE INDEX IF NOT EXISTS idx_collections_items_collection ON collections_items(collection_id);

ALTER TABLE collections_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can view items in non-private collections" ON collections_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id AND (NOT c.is_private OR c.owner_id = auth.uid())
    )
  );

CREATE POLICY "owners can manage items in their collections" ON collections_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id AND c.owner_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id AND c.owner_id = auth.uid()
    )
  );

-- ===========================================
-- 📄 INDEXES FOR PERFORMANCE
-- ===========================================

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_creator_id ON projects(creator_id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_view_count ON projects(view_count DESC);

-- Calendar entries indexes
CREATE INDEX IF NOT EXISTS idx_calendar_entries_anime_id ON calendar_entries(anime_id);
CREATE INDEX IF NOT EXISTS idx_calendar_entries_type ON calendar_entries(type);
CREATE INDEX IF NOT EXISTS idx_calendar_entries_release_date ON calendar_entries(release_date);
CREATE INDEX IF NOT EXISTS idx_calendar_entries_status ON calendar_entries(status);

-- Newsletter subscribers indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at);

-- Admin logs indexes
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_action ON admin_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_logs_target ON admin_logs(target_type, target_id);

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_project_comments_project_id ON project_comments(project_id);
CREATE INDEX IF NOT EXISTS idx_project_comments_user_id ON project_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_project_comments_parent_id ON project_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_project_comments_created_at ON project_comments(created_at DESC);

-- Likes indexes
CREATE INDEX IF NOT EXISTS idx_project_likes_project_id ON project_likes(project_id);
CREATE INDEX IF NOT EXISTS idx_project_likes_user_id ON project_likes(user_id);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- Notification queue indexes
CREATE INDEX IF NOT EXISTS idx_notification_queue_user_id ON notification_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_queue_status ON notification_queue(status);
CREATE INDEX IF NOT EXISTS idx_notification_queue_scheduled_for ON notification_queue(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notification_queue_type ON notification_queue(type);

-- News indexes
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);

-- Collections indexes
CREATE INDEX IF NOT EXISTS idx_collections_owner ON collections(owner_id);
CREATE INDEX IF NOT EXISTS idx_collections_created_at ON collections(created_at DESC);

-- ===========================================
-- 🛡️ ROW LEVEL SECURITY POLICIES
-- ===========================================

-- Enable RLS on new tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections_items ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Public projects are viewable by all" ON projects
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (creator_id = auth.uid());

CREATE POLICY "Users can create their own projects" ON projects
  FOR INSERT WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (creator_id = auth.uid());

-- Calendar entries are publicly readable
CREATE POLICY "Calendar entries are publicly viewable" ON calendar_entries
  FOR SELECT TO public USING (true);

-- Comments policies
CREATE POLICY "Users can view approved project comments" ON project_comments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE id = project_id AND status = 'approved')
    OR user_id = auth.uid()
  );

CREATE POLICY "Users can create comments" ON project_comments
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own comments" ON project_comments
  FOR UPDATE USING (user_id = auth.uid());

-- Likes policies
CREATE POLICY "Users can view project likes" ON project_likes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE id = project_id AND status = 'approved')
  );

CREATE POLICY "Users can manage their own likes" ON project_likes
  FOR ALL USING (user_id = auth.uid());

-- Notification queue - users can only see their own
CREATE POLICY "Users can view their own notifications" ON notification_queue
  FOR SELECT USING (user_id = auth.uid());

-- Analytics - users can only see their own events
CREATE POLICY "Users can view their own analytics" ON analytics_events
  FOR SELECT USING (user_id = auth.uid());

-- News policies
CREATE POLICY "News are publicly viewable" ON news
  FOR SELECT USING (true);

CREATE POLICY "Authenticated can insert news" ON news
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Collections policies
CREATE POLICY "Public can view non-private collections" ON collections
  FOR SELECT USING (NOT is_private);

CREATE POLICY "Owners can view their collections" ON collections
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Owners can insert collections" ON collections
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their collections" ON collections
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete their collections" ON collections
  FOR DELETE USING (owner_id = auth.uid());

-- Collections items policies
CREATE POLICY "Public can view items in non-private collections" ON collections_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id AND (NOT c.is_private OR c.owner_id = auth.uid())
    )
  );

CREATE POLICY "Owners can manage items in their collections" ON collections_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id AND c.owner_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id AND c.owner_id = auth.uid()
    )
  );

-- ===========================================
-- 🔧 FUNCTIONS AND TRIGGERS
-- ===========================================

-- Update project counts function
CREATE OR REPLACE FUNCTION update_project_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update like count
    IF TG_TABLE_NAME = 'project_likes' THEN
      UPDATE projects SET like_count = like_count + 1 WHERE id = NEW.project_id;
    END IF;
    
    -- Update comment count
    IF TG_TABLE_NAME = 'project_comments' THEN
      UPDATE projects SET comment_count = comment_count + 1 WHERE id = NEW.project_id;
    END IF;
    
    RETURN NEW;
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Update like count
    IF TG_TABLE_NAME = 'project_likes' THEN
      UPDATE projects SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.project_id;
    END IF;
    
    -- Update comment count
    IF TG_TABLE_NAME = 'project_comments' THEN
      UPDATE projects SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = OLD.project_id;
    END IF;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_like_counts
  AFTER INSERT OR DELETE ON project_likes
  FOR EACH ROW EXECUTE FUNCTION update_project_counts();

CREATE TRIGGER trigger_update_comment_counts
  AFTER INSERT OR DELETE ON project_comments
  FOR EACH ROW EXECUTE FUNCTION update_project_counts();

-- Update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create timestamp triggers
CREATE TRIGGER trigger_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_calendar_entries_updated_at
  BEFORE UPDATE ON calendar_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_project_comments_updated_at
  BEFORE UPDATE ON project_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- 📊 DEFAULT SYSTEM SETTINGS
-- ===========================================
INSERT INTO system_settings (key, value, description, category, is_public) VALUES
  ('site_name', '"Shonen Ark"', 'Website name', 'general', true),
  ('site_description', '"Mystical anime fan platform featuring fusion UI design"', 'Site description for SEO', 'general', true),
  ('max_file_size_mb', '500', 'Maximum file upload size in MB', 'uploads', false),
  ('auto_approve_projects', 'false', 'Whether to auto-approve projects that pass safety checks', 'moderation', false),
  ('calendar_sync_interval_hours', '6', 'How often to sync calendar data', 'automation', false),
  ('newsletter_enabled', 'true', 'Whether newsletter signup is enabled', 'features', true),
  ('ai_content_review_enabled', 'true', 'Whether to use AI for content review', 'ai', false),
  ('maintenance_mode', 'false', 'Site maintenance mode', 'system', true),
  ('analytics_enabled', 'true', 'Whether analytics tracking is enabled', 'analytics', true)
ON CONFLICT (key) DO NOTHING;

-- ===========================================
-- 🏷️ DEFAULT PROJECT TAGS
-- ===========================================
INSERT INTO project_tags (name, category, color, description) VALUES
  ('naruto', 'anime', '#FF6B35', 'Content related to Naruto series'),
  ('one-piece', 'anime', '#1E90FF', 'Content related to One Piece series'),
  ('attack-on-titan', 'anime', '#8B4513', 'Content related to Attack on Titan'),
  ('demon-slayer', 'anime', '#DC143C', 'Content related to Demon Slayer'),
  ('my-hero-academia', 'anime', '#32CD32', 'Content related to My Hero Academia'),
  ('theory', 'content', '#9932CC', 'Fan theories and speculation'),
  ('analysis', 'content', '#4169E1', 'Detailed analysis content'),
  ('amv', 'content', '#FF1493', 'Anime music videos'),
  ('artwork', 'content', '#FF8C00', 'Fan art and character designs'),
  ('high-quality', 'quality', '#FFD700', 'High-quality content'),
  ('beginner-friendly', 'accessibility', '#98FB98', 'Content suitable for beginners'),
  ('spoiler-free', 'accessibility', '#87CEEB', 'Content without spoilers'),
  ('manga-spoilers', 'warning', '#FF4500', 'Contains manga spoilers'),
  ('nsfw', 'warning', '#B22222', 'Not safe for work content')
ON CONFLICT (name) DO NOTHING;

-- ===========================================
-- ✅ MIGRATION COMPLETE
-- ===========================================

SELECT 'Database migration completed successfully!' as status;
