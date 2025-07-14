// Placeholder Supabase client
// Replace with actual initialization when credentials are available
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)
