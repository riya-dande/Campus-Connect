import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const clientOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: { "X-Client-Info": "campusconnect-server" },
  },
};

let anonClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

function buildClient(key: string) {
  return createClient(supabaseUrl, key, clientOptions);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey));
}

export function getSupabaseAnonClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!anonClient) anonClient = buildClient(supabaseAnonKey);
  return anonClient;
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceRoleKey) return null;
  if (!adminClient) adminClient = buildClient(supabaseServiceRoleKey);
  return adminClient;
}

export function getSupabaseClient(): SupabaseClient | null {
  return getSupabaseAdminClient() ?? getSupabaseAnonClient();
}

export function getSupabaseEnv() {
  return {
    supabaseUrl,
    supabaseAnonKey,
    supabaseServiceRoleKey,
  };
}
