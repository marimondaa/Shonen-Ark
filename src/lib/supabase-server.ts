import { createClient } from '@supabase/supabase-js';

// Guard: prevent importing this module in the browser
if (typeof window !== 'undefined') {
  throw new Error('supabase-server.ts is server-only and must not be imported in the browser');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for server client');
}

// Centralized server-only Supabase client (service role)
export const serverSupabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export default serverSupabase;
