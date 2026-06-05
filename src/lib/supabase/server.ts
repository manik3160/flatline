import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client for API routes
 * Uses service role or anon key depending on need
 */
export function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
