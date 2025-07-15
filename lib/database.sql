-- Shonen Ark Database Schema (Supabase PostgreSQL)
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends NextAuth users)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'fan' CHECK (role IN ('fan', 'creator', 'admin')),
  subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'creator', 'creator_pro')),
  subscription_expires_at TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Theories table
CREATE TABLE theories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  anime_series VARCHAR(255),
  tags TEXT[], -- Array of tags
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  moderation_status VARCHAR(20) DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')),
  ai_tags TEXT[], -- AI-generated tags
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Media table (images, videos, audio)
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER,
  url TEXT NOT NULL,
  uploader_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) CHECK (category IN ('image', 'video', 'audio', 'document')),
  anime_series VARCHAR(255),
  tags TEXT[],
  description TEXT,
  moderation_status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gigs/Jobs table
CREATE TABLE gigs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('voice-acting', 'music', 'design', 'animation', 'writing', 'other')),
  budget_min INTEGER,
  budget_max INTEGER,
  deadline DATE,
  poster_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  applications_count INTEGER DEFAULT 0,
  selected_applicant_id UUID REFERENCES users(id),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'escrowed', 'released', 'disputed')),
  stripe_payment_intent VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Community Projects table
CREATE TABLE community_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  organizer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 1,
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'active', 'completed', 'cancelled')),
  project_type VARCHAR(50) CHECK (project_type IN ('animation', 'amv', 'fan_dub', 'manga', 'other')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Project Participants table
CREATE TABLE project_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES community_projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100), -- animator, editor, voice actor, etc.
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Gig Applications table
CREATE TABLE gig_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gig_id UUID REFERENCES gigs(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  portfolio_links TEXT[],
  proposed_budget INTEGER,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  applied_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(gig_id, applicant_id)
);

-- Comments table (for theories and media)
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- for nested comments
  commentable_type VARCHAR(20) CHECK (commentable_type IN ('theory', 'media', 'gig')),
  commentable_id UUID NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  moderation_status VARCHAR(20) DEFAULT 'approved',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Likes/Votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  votable_type VARCHAR(20) CHECK (votable_type IN ('theory', 'media', 'comment')),
  votable_id UUID NOT NULL,
  vote_type VARCHAR(10) CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, votable_type, votable_id)
);

-- Calendar Events table (anime releases)
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('anime', 'manga')),
  episode_number INTEGER,
  chapter_number INTEGER,
  release_date DATE NOT NULL,
  anime_id INTEGER, -- AniList ID
  cover_image TEXT,
  score DECIMAL(3,1),
  status VARCHAR(50),
  source VARCHAR(20) DEFAULT 'anilist',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table (Stripe integration)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  plan_id VARCHAR(100) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- AI Moderation logs
CREATE TABLE moderation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type VARCHAR(20) CHECK (content_type IN ('theory', 'media', 'comment', 'gig')),
  content_id UUID NOT NULL,
  ai_provider VARCHAR(50), -- openai, etc.
  flagged BOOLEAN DEFAULT FALSE,
  confidence_score DECIMAL(3,2),
  flag_reasons TEXT[],
  moderator_id UUID REFERENCES users(id),
  action_taken VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_theories_author ON theories(author_id);
CREATE INDEX idx_theories_featured ON theories(featured);
CREATE INDEX idx_theories_moderation ON theories(moderation_status);
CREATE INDEX idx_theories_tags ON theories USING GIN(tags);
CREATE INDEX idx_media_uploader ON media(uploader_id);
CREATE INDEX idx_media_category ON media(category);
CREATE INDEX idx_gigs_poster ON gigs(poster_id);
CREATE INDEX idx_gigs_status ON gigs(status);
CREATE INDEX idx_gigs_type ON gigs(type);
CREATE INDEX idx_calendar_date ON calendar_events(release_date);
CREATE INDEX idx_votes_user_content ON votes(user_id, votable_type, votable_id);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE theories ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Anyone can read approved theories
CREATE POLICY "Anyone can view approved theories" ON theories
  FOR SELECT USING (moderation_status = 'approved');

-- Users can create theories
CREATE POLICY "Users can create theories" ON theories
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can update their own theories
CREATE POLICY "Users can update own theories" ON theories
  FOR UPDATE USING (auth.uid() = author_id);
