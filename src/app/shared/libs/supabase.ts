import { environment } from '@envs/environment';
import { createClient } from '@supabase/supabase-js';
// import Config from '@envs/config.json'
import Config from '../../../config.json'

export const supabase = createClient(
    // environment.SUPABASE_URL!,
    environment.production ? Config.SUPABASE_URL! : environment.SUPABASE_URL!,
    // environment.SUPABASE_ANON_KEY!,
    environment.production ? Config.SUPABASE_ANON_KEY! : environment.SUPABASE_ANON_KEY!,
)

export const supabaseAdmin = createClient(
    // environment.SUPABASE_URL!,
    environment.production ? Config.SUPABASE_URL! : environment.SUPABASE_URL!,
    // environment.SUPABASE_SERVICE_ROLE_KEY!,
    environment.production ? Config.SUPABASE_SERVICE_ROLE_KEY! : environment.SUPABASE_SERVICE_ROLE_KEY!,
)