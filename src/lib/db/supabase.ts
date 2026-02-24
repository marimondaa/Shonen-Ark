import { createClient } from '@supabase/supabase-js';
import { Database } from '../supabase'; // Re-use existing types for now, will move later

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Backend v2 Supabase Client (Admin/Service Role)
 * Used for server-side operations that bypass RLS or require admin access.
 */
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

/**
 * Utility to get a client for a specific user (if using Supabase Auth sessions)
 */
export const createTypedClient = (accessToken?: string) => {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
            }
        }
    );
};
