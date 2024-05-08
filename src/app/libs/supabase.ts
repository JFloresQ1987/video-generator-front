import { environment } from '@envs/environment';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    // process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    environment.SUPABASE_URL!,
    environment.SUPABASE_ANON_KEY!,
    // SUPABASE_URL!,
    // SUPABASE_ANON_KEY!,
)

export const supabaseAdmin = createClient(
    // process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY!,
    environment.SUPABASE_URL!,
    environment.SUPABASE_SERVICE_ROLE_KEY!,
    // SUPABASE_URL!,
    // SUPABASE_SERVICE_ROLE_KEY!,
)