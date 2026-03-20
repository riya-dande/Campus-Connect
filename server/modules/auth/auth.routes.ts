import { Router } from "express";
import { demoUsers, studentProfile } from "../../data/mockDb";
import { getSupabaseAdminClient, getSupabaseAnonClient, isSupabaseConfigured } from "../../services/supabase";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, username, password } = req.body as { email?: string; username?: string; password?: string };
  const identifier = username ?? email;
  if (!identifier || !password) {
    return res.status(400).json({ message: "username/email and password are required" });
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAnonClient();
    const admin = getSupabaseAdminClient();
    if (!supabase) {
      return res.status(500).json({ message: "supabase anon client not configured" });
    }

    const normalized = identifier.trim();
    let loginEmail = normalized;
    const localPart = normalized.split("@")[0].toLowerCase();
    const tryLookupByLocal = async () => {
      if (!admin) {
        return null;
      }
      const { data: userRow, error: userError } = await admin
        .from("users")
        .select("email")
        .or(
          [
            `roll_no.ilike.${localPart}`,
            `emp_id.ilike.${localPart}`,
            `username.ilike.${localPart}`,
            `email.ilike.${localPart}@%`,
          ].join(",")
        )
        .limit(1)
        .maybeSingle();
      if (userError || !userRow?.email) {
        return null;
      }
      return userRow.email;
    };

    if (!normalized.includes("@")) {
      if (!admin) {
        return res.status(500).json({ message: "supabase admin client not configured" });
      }
      const lookupEmail = await tryLookupByLocal();
      if (!lookupEmail) {
        return res.status(401).json({ message: "invalid username or password" });
      }
      loginEmail = lookupEmail;
    }

    let { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password });
    if (error && normalized.includes("@")) {
      const fallbackEmail = await tryLookupByLocal();
      if (fallbackEmail && fallbackEmail !== loginEmail) {
        const retry = await supabase.auth.signInWithPassword({ email: fallbackEmail, password });
        data = retry.data;
        error = retry.error;
        loginEmail = fallbackEmail;
      }
    }
    if (error || !data.user) {
      return res.status(401).json({ message: error?.message ?? "invalid credentials" });
    }

    const user = data.user;
    let profile: { role?: string; username?: string; university_id?: string | null; college_id?: string | null } | null = null;
    if (admin) {
      const meta = user.user_metadata ?? {};
      const usernameFromMeta = (meta.username as string | undefined) ?? (meta.full_name as string | undefined) ?? user.email?.split("@")[0] ?? "student";
      const roleFromMeta = (meta.role as string | undefined) ?? "student";
      await admin.from("users").upsert(
        {
          id: user.id,
          email: user.email ?? loginEmail,
          username: usernameFromMeta,
          role: roleFromMeta,
          university_id: (meta.university_id as string | undefined) ?? null,
          college_id: (meta.college_id as string | undefined) ?? null,
          roll_no: (meta.roll_no as string | undefined) ?? null,
          year: (meta.year as string | undefined) ?? null,
          emp_id: (meta.emp_id as string | undefined) ?? null,
          staff_role: (meta.staff_role as string | undefined) ?? null,
          department: (meta.department as string | undefined) ?? null,
        },
        { onConflict: "id" }
      );
      const profileQuery = await admin
        .from("users")
        .select("role,username,university_id,college_id")
        .eq("id", user.id)
        .maybeSingle();
      profile = profileQuery.data ?? null;
    }

    return res.json({
      token: data.session?.access_token ?? null,
      user: {
        id: user.id,
        name: (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "Student",
        email: user.email ?? loginEmail,
        avatar:
          (user.user_metadata?.avatar_url as string | undefined) ??
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${(user.email ?? "student").split("@")[0]}`,
        role: profile?.role ?? user.user_metadata?.role ?? "student",
        username: profile?.username ?? user.user_metadata?.username ?? identifier,
        university_id: profile?.university_id ?? null,
        college_id: profile?.college_id ?? null,
      },
    });
  }

  const found = demoUsers.find((u) => {
    if (identifier.includes("@")) {
      return u.email === identifier && u.password === password;
    }
    return u.email.split("@")[0] === identifier && u.password === password;
  });
  if (!found) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  return res.json({
    token: "demo-jwt-token",
    user: {
      ...studentProfile,
      name: found.name,
      email: found.email,
    },
  });
});

authRouter.get("/me", async (req, res) => {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAnonClient();
    const authHeader = req.headers.authorization ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!supabase || !token) {
      return res.status(401).json({ message: "missing bearer token" });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ message: error?.message ?? "invalid token" });
    }

    const user = data.user;
    return res.json({
      user: {
        id: user.id,
        name: (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "Student",
        email: user.email ?? "student@campus.edu",
        avatar:
          (user.user_metadata?.avatar_url as string | undefined) ??
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${(user.email ?? "student").split("@")[0]}`,
      },
    });
  }

  return res.json({ user: studentProfile });
});

authRouter.post("/signup", async (req, res) => {
  const {
    email,
    password,
    name,
    username,
    role,
    universityId,
    collegeId,
    rollNo,
    year,
    empId,
    staffRole,
    department,
  } = req.body as {
    email?: string;
    password?: string;
    name?: string;
    username?: string;
    role?: string;
    universityId?: string;
    collegeId?: string;
    rollNo?: string;
    year?: string;
    empId?: string;
    staffRole?: string;
    department?: string;
  };
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  if (!isSupabaseConfigured()) {
    return res.status(503).json({ message: "supabase is not configured" });
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return res.status(500).json({ message: "supabase admin client not configured" });
  }

  const resolvedRole = role ?? "student";
  const resolvedUsername = username ?? name ?? email.split("@")[0];

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: name,
      username: resolvedUsername,
      role: resolvedRole,
      university_id: universityId ?? null,
      college_id: collegeId ?? null,
      roll_no: rollNo ?? null,
      year: year ?? null,
      emp_id: empId ?? null,
      staff_role: staffRole ?? null,
      department: department ?? null,
    },
  });

  if (error || !data.user) {
    return res.status(400).json({ message: error?.message ?? "signup failed" });
  }

  const { error: profileError } = await admin.from("users").upsert(
    {
      id: data.user.id,
      email: data.user.email ?? email,
      username: resolvedUsername,
      role: resolvedRole,
      university_id: universityId ?? null,
      college_id: collegeId ?? null,
      roll_no: rollNo ?? null,
      year: year ?? null,
      emp_id: empId ?? null,
      staff_role: staffRole ?? null,
      department: department ?? null,
    },
    { onConflict: "id" }
  );
  if (profileError) {
    return res.status(400).json({ message: profileError.message });
  }

  return res.status(201).json({
    user: {
      id: data.user.id,
      name: name ?? data.user.email ?? "Student",
      email: data.user.email ?? email,
      role: resolvedRole,
      username: resolvedUsername,
    },
  });
});
