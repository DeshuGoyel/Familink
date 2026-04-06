import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Use placeholder values when env vars are missing so the client doesn't
// throw at import time. WaitlistForm already guards actual calls with a
// VITE_SUPABASE_URL check before making any network requests.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export interface WaitlistEntry {
  id?: string;
  email: string;
  position?: number;
  created_at?: string;
  referral_source?: string;
  confirmed?: boolean;
}
