import { Router } from "express";
import { getAnnouncements, getChatThreads, getStudentProfile } from "../../services/data.service";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", async (_req, res) => {
  const [profile, announcements, chatThreads] = await Promise.all([
    getStudentProfile(),
    getAnnouncements(),
    getChatThreads(),
  ]);

  const unreadAnnouncements = announcements.filter((a) => !a.isRead).length;
  const unreadMessages = chatThreads.reduce((sum, chat) => sum + chat.unread, 0);

  res.json({
    summary: {
      name: profile.name,
      major: profile.major,
      year: profile.year,
      semester: profile.semester,
      cgpa: profile.cgpa,
      attendance: profile.attendance,
      streak: profile.streak,
      unreadAnnouncements,
      unreadMessages,
    },
  });
});
