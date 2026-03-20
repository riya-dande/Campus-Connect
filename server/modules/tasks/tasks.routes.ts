import { Router } from "express";
import { getSupabaseAdminClient, getSupabaseAnonClient, isSupabaseConfigured } from "../../services/supabase";

export const tasksRouter = Router();

async function requireUserId(req: any, res: any): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ message: "supabase is not configured" });
    return null;
  }

  const supabase = getSupabaseAnonClient();
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!supabase || !token) {
    res.status(401).json({ message: "missing bearer token" });
    return null;
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    res.status(401).json({ message: error?.message ?? "invalid token" });
    return null;
  }

  return data.user.id;
}

tasksRouter.get("/", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { data, error } = await admin
    .from("tasks")
    .select("id,title,tag,priority,due_at,is_done,created_at")
    .eq("user_id", userId)
    .order("due_at", { ascending: true, nullsFirst: false });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.json({ tasks: data ?? [] });
});

tasksRouter.post("/", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { title, tag, priority, due_at } = req.body as {
    title?: string;
    tag?: string;
    priority?: string;
    due_at?: string | null;
  };

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "title is required" });
  }

  const { data, error } = await admin
    .from("tasks")
    .insert({
      user_id: userId,
      title: title.trim(),
      tag: tag ?? null,
      priority: priority ?? null,
      due_at: due_at ?? null,
    })
    .select("id,title,tag,priority,due_at,is_done,created_at")
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(201).json({ task: data });
});

tasksRouter.patch("/:id", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { id } = req.params;
  const { title, tag, priority, due_at, is_done } = req.body as {
    title?: string;
    tag?: string;
    priority?: string;
    due_at?: string | null;
    is_done?: boolean;
  };

  const { data, error } = await admin
    .from("tasks")
    .update({
      ...(title !== undefined ? { title } : {}),
      ...(tag !== undefined ? { tag } : {}),
      ...(priority !== undefined ? { priority } : {}),
      ...(due_at !== undefined ? { due_at } : {}),
      ...(is_done !== undefined ? { is_done } : {}),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select("id,title,tag,priority,due_at,is_done,created_at")
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.json({ task: data });
});

tasksRouter.delete("/:id", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { id } = req.params;
  const { error } = await admin.from("tasks").delete().eq("id", id).eq("user_id", userId);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(204).send();
});
