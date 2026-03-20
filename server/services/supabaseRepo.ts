import type { PostgrestError } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "./supabase";

function logSupabaseError(context: string, error: PostgrestError | null) {
  if (!error) return;
  console.warn(`[supabase] ${context}: ${error.message}`, {
    code: error.code,
    details: error.details,
    hint: error.hint,
  });
}

export async function fetchAll<T>(table: string): Promise<T[] | null> {
  if (!isSupabaseConfigured()) return null;
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client.from(table).select("*");
  if (error) {
    logSupabaseError(`select * from ${table}`, error);
    return null;
  }
  return (data ?? null) as T[] | null;
}

export async function fetchSingle<T>(table: string): Promise<T | null> {
  const rows = await fetchAll<T>(table);
  return rows?.[0] ?? null;
}

export async function updateById<T>(
  table: string,
  idColumn: string,
  id: string,
  changes: Record<string, unknown>,
): Promise<T | null> {
  if (!isSupabaseConfigured()) return null;
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from(table)
    .update(changes)
    .eq(idColumn, id)
    .select("*")
    .maybeSingle();

  if (error) {
    logSupabaseError(`update ${table} where ${idColumn} = ${id}`, error);
    return null;
  }

  return (data ?? null) as T | null;
}
