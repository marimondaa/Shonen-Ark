import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with service role for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Client-side Supabase instance (for frontend)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar: string | null;
          provider: string | null;
          provider_id: string | null;
          account_type: 'fan' | 'creator' | 'admin';
          subscription_tier: 'free' | 'premium' | 'creator';
          subscription_status: string;
          stripe_customer_id: string | null;
          signup_completed_at: string | null;
          last_activity_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar?: string | null;
          provider?: string | null;
          provider_id?: string | null;
          account_type?: 'fan' | 'creator' | 'admin';
          subscription_tier?: 'free' | 'premium' | 'creator';
          subscription_status?: string;
          stripe_customer_id?: string | null;
          signup_completed_at?: string | null;
          last_activity_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar?: string | null;
          provider?: string | null;
          provider_id?: string | null;
          account_type?: 'fan' | 'creator' | 'admin';
          subscription_tier?: 'free' | 'premium' | 'creator';
          subscription_status?: string;
          stripe_customer_id?: string | null;
          signup_completed_at?: string | null;
          last_activity_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_activity: {
        Row: {
          id: string;
          user_id: string;
          activity_type: string;
          target_type: string | null;
          target_id: string | null;
          metadata: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_type: string;
          target_type?: string | null;
          target_id?: string | null;
          metadata?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_type?: string;
          target_type?: string | null;
          target_id?: string | null;
          metadata?: any | null;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          creator_id: string;
          title: string;
          description: string;
          category: string;
          status: 'pending' | 'approved' | 'rejected';
          file_url: string | null;
          thumbnail_url: string | null;
          metadata: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          title: string;
          description: string;
          category: string;
          status?: 'pending' | 'approved' | 'rejected';
          file_url?: string | null;
          thumbnail_url?: string | null;
          metadata?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creator_id?: string;
          title?: string;
          description?: string;
          category?: string;
          status?: 'pending' | 'approved' | 'rejected';
          file_url?: string | null;
          thumbnail_url?: string | null;
          metadata?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      calendar_entries: {
        Row: {
          id: string;
          anime_id: number;
          title: string;
          type: 'anime' | 'manga';
          episode_number: number | null;
          chapter_number: number | null;
          release_date: string;
          status: string;
          cover_image: string | null;
          anilist_data: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          anime_id: number;
          title: string;
          type: 'anime' | 'manga';
          episode_number?: number | null;
          chapter_number?: number | null;
          release_date: string;
          status: string;
          cover_image?: string | null;
          anilist_data?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          anime_id?: number;
          title?: string;
          type?: 'anime' | 'manga';
          episode_number?: number | null;
          chapter_number?: number | null;
          release_date?: string;
          status?: string;
          cover_image?: string | null;
          anilist_data?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          status: 'active' | 'unsubscribed';
          source: string | null;
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          status?: 'active' | 'unsubscribed';
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          status?: 'active' | 'unsubscribed';
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
      };
      admin_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          target_type: string | null;
          target_id: string | null;
          details: any | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          target_type?: string | null;
          target_id?: string | null;
          details?: any | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          target_type?: string | null;
          target_id?: string | null;
          details?: any | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
