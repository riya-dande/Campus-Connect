import { Router } from "express";
import { buildAiInsights, mentorReply } from "../../services/ai.service";
import { getStudentProfile } from "../../services/data.service";

export const aiRouter = Router();

aiRouter.get("/insights", async (_req, res) => {
  const profile = await getStudentProfile();
  res.json({
    insights: buildAiInsights(),
    context: {
      major: profile.major,
      year: profile.year,
      semester: profile.semester,
    },
  });
});

aiRouter.post("/mentor/chat", async (req, res) => {
  const { message } = req.body as { message?: string };
  if (!message) {
    return res.status(400).json({ message: "message is required" });
  }
  const reply = await mentorReply(message);
  return res.json({ reply });
});
