import type { Express } from "express";
import { Server } from "http";
import { Router } from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes";
import { announcementsRouter } from "./modules/announcements/announcements.routes";
import { academicRouter } from "./modules/academic/academic.routes";
import { communicationRouter } from "./modules/communication/communication.routes";
import { profileRouter } from "./modules/profile/profile.routes";
import { eventsRouter } from "./modules/events/events.routes";
import { aiRouter } from "./modules/ai/ai.routes";
import { mentorReply } from "./services/ai.service";

export async function registerRoutes(server: Server, app: Express): Promise<Server> {
  const api = Router();

  api.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "campusconnect-api" });
  });

  api.use("/auth", authRouter);
  api.use("/dashboard", dashboardRouter);
  api.use("/announcements", announcementsRouter);
  api.use("/academic", academicRouter);
  api.use("/communication", communicationRouter);
  api.use("/profile", profileRouter);
  api.use("/events", eventsRouter);
  api.use("/ai", aiRouter);

  // Backward compatibility with existing frontend chatbot endpoint
  api.post("/mentor/chat", (req, res) => {
    const { message } = req.body as { message?: string };
    if (!message) {
      return res.status(400).json({ message: "message is required" });
    }
    return res.json({ reply: mentorReply(message) });
  });

  app.use("/api", api);
  return server;
}
