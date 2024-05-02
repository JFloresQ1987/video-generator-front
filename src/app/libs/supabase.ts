import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://cchpxigprkbnjxdnnerd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaHB4aWdwcmtibmp4ZG5uZXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MzEwNjQsImV4cCI6MjAyOTQwNzA2NH0.lSIzUXRnYYftJ_p3RIEoD4bE_vkJLcAX1MnTi6VvfJs";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjaHB4aWdwcmtibmp4ZG5uZXJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzgzMTA2NCwiZXhwIjoyMDI5NDA3MDY0fQ.pVP8ZdK7_rneyZi4CNXFk9ZJwGP3yybkmkXmSDLe20g";

export const supabase = createClient(
    // process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!,
)

export const supabaseAdmin = createClient(
    // process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY!,
    SUPABASE_URL!,
    SUPABASE_SERVICE_ROLE_KEY!,
)