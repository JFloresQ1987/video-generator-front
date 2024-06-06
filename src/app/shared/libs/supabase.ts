import { environment } from '@envs/environment';
import { runtimeEnvironment } from '@envs/runtimeEnvironment';
import { createClient } from '@supabase/supabase-js';
// import Config from '../../../assets/config.json'
// import Config from '@envs/config.json'
// import Config from '../../../config.json'

export const supabase = createClient(
    // environment.SUPABASE_URL!,    
    environment.production ? runtimeEnvironment.SUPABASE_URL! : environment.SUPABASE_URL!,
    // environment.SUPABASE_ANON_KEY!,
    environment.production ? runtimeEnvironment.SUPABASE_ANON_KEY! : environment.SUPABASE_ANON_KEY!,
)

export const supabaseAdmin = createClient(
    // environment.SUPABASE_URL!,
    environment.production ? runtimeEnvironment.SUPABASE_URL! : environment.SUPABASE_URL!,
    // environment.SUPABASE_SERVICE_ROLE_KEY!,
    environment.production ? runtimeEnvironment.SUPABASE_SERVICE_ROLE_KEY! : environment.SUPABASE_SERVICE_ROLE_KEY!,
)