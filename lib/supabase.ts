import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized clients to avoid build-time errors when env vars aren't set
let _supabase: SupabaseClient | null = null;
let _serviceSupabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (!_supabase) {
        _supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }
    return _supabase;
}

export function getServiceSupabase(): SupabaseClient {
    if (!_serviceSupabase) {
        _serviceSupabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
    }
    return _serviceSupabase;
}

// Default export for backward compatibility
export const supabase = {
    get client() { return getSupabase(); }
};
