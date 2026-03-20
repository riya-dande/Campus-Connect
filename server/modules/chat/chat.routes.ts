import { Router } from "express";
import { getSupabaseAdminClient, getSupabaseAnonClient, isSupabaseConfigured } from "../../services/supabase";

export const chatRouter = Router();

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

async function ensureDefaultChannels(admin: ReturnType<typeof getSupabaseAdminClient>) {
  if (!admin) return [];
  const defaults = [
    { name: "announcements", description: "Official updates", type: "text" },
    { name: "general", description: "Student collaboration and updates", type: "text" },
    { name: "showcase", description: "Share your work", type: "text" },
    { name: "placements", description: "Placement drives and tips", type: "text" },
    { name: "random", description: "Anything goes", type: "text" },
  ];

  const { data: existing } = await admin.from("channels").select("id,name,description,type").in(
    "name",
    defaults.map((d) => d.name)
  );

  const existingNames = new Set((existing ?? []).map((c) => c.name));
  const missing = defaults.filter((d) => !existingNames.has(d.name));

  if (missing.length) {
    await admin.from("channels").insert(missing);
  }

  const { data: allChannels } = await admin
    .from("channels")
    .select("id,name,description,type")
    .order("name", { ascending: true });

  return allChannels ?? [];
}

chatRouter.get("/bootstrap", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const channels = await ensureDefaultChannels(admin);

  if (channels.length) {
    const { data: memberships } = await admin
      .from("channel_members")
      .select("channel_id")
      .eq("user_id", userId);
    const existingIds = new Set((memberships ?? []).map((m) => m.channel_id));
    const toInsert = channels
      .filter((c) => !existingIds.has(c.id))
      .map((c) => ({ channel_id: c.id, user_id: userId, role: "member" }));
    if (toInsert.length) {
      await admin.from("channel_members").insert(toInsert);
    }
  }

  return res.json({ channels });
});

chatRouter.get("/channels", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { data: channels, error } = await admin
    .from("channels")
    .select("id,name,description,type")
    .order("name", { ascending: true });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.json({ channels: channels ?? [] });
});

chatRouter.get("/channels/:id/messages", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { id } = req.params;
  const { data, error } = await admin
    .from("messages")
    .select("id,channel_id,sender_id,content,created_at")
    .eq("channel_id", id)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.json({ messages: data ?? [] });
});

chatRouter.get("/channels/:id/members", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { id } = req.params;
  const { data: members, error } = await admin
    .from("channel_members")
    .select("user_id,role")
    .eq("channel_id", id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const memberIds = (members ?? []).map((m) => m.user_id);
  if (!memberIds.length) {
    return res.json({ members: [] });
  }

  const { data: profiles } = await admin
    .from("users")
    .select("id,username,role,email")
    .in("id", memberIds);

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
  const merged = (members ?? []).map((m) => {
    const profile = profileMap.get(m.user_id);
    return {
      id: m.user_id,
      name: profile?.username ?? "Member",
      role: profile?.role ?? "student",
      email: profile?.email ?? "",
      memberRole: m.role ?? "member",
    };
  });

  return res.json({ members: merged });
});

chatRouter.post("/channels/:id/messages", async (req, res) => {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const { id } = req.params;
  const { content } = req.body as { content?: string };
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "content is required" });
  }

  const { data, error } = await admin
    .from("messages")
    .insert({
      channel_id: id,
      sender_id: userId,
      content: content.trim(),
    })
    .select("id,channel_id,sender_id,content,created_at")
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(201).json({ message: data });
});
