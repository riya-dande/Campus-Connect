import { Router } from "express";
import { buildAiInsights, mentorReply } from "../../services/ai.service";
import { studentProfile } from "../../data/mockDb";

export const aiRouter = Router();

aiRouter.get("/insights", (_req, res) => {
  res.json({
    insights: buildAiInsights(),
    context: {
      major: studentProfile.major,
      year: studentProfile.year,
      semester: studentProfile.semester,
    },
  });
});

aiRouter.post("/mentor/chat", (req, res) => {
  const { message } = req.body as { message?: string };
  if (!message) {
    return res.status(400).json({ message: "message is required" });
  }
  return res.json({ reply: mentorReply(message) });
});
