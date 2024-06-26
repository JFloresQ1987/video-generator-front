declare var ENV: any;

export const runtimeEnvironment = {
  API_URL: ENV.API_URL === '${API_URL}' ? '' : ENV.API_URL,
  SUPABASE_URL: ENV.SUPABASE_URL === '${SUPABASE_URL}' ? '' : ENV.SUPABASE_URL,
  SUPABASE_ANON_KEY: ENV.SUPABASE_ANON_KEY === '${SUPABASE_ANON_KEY}' ? '' : ENV.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: ENV.SUPABASE_SERVICE_ROLE_KEY === '${SUPABASE_SERVICE_ROLE_KEY}' ? '' : ENV.SUPABASE_SERVICE_ROLE_KEY,
  RECAPTCHA_V3_STACKBLITZ_KEY: ENV.RECAPTCHA_V3_STACKBLITZ_KEY === '${RECAPTCHA_V3_STACKBLITZ_KEY}' ? '' : ENV.RECAPTCHA_V3_STACKBLITZ_KEY,
  RECAPTCHA_V2_DUMMY_KEY: ENV.RECAPTCHA_V2_DUMMY_KEY === '${RECAPTCHA_V2_DUMMY_KEY}' ? '' : ENV.RECAPTCHA_V2_DUMMY_KEY,
};
