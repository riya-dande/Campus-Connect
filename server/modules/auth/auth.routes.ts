import { Router } from "express";
import { demoUsers, studentProfile } from "../../data/mockDb";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const found = demoUsers.find((u) => u.email === email && u.password === password);
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

authRouter.get("/me", (_req, res) => {
  res.json({ user: studentProfile });
});
