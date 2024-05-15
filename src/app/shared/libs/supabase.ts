import { environment } from '@envs/environment';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    environment.SUPABASE_URL!,
    environment.SUPABASE_ANON_KEY!,
)

export const supabaseAdmin = createClient(
    environment.SUPABASE_URL!,
    environment.SUPABASE_SERVICE_ROLE_KEY!,
)