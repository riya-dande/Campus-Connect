import { Router } from "express";
import { announcements, chatThreads, studentProfile } from "../../data/mockDb";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", (_req, res) => {
  const unreadAnnouncements = announcements.filter((a) => !a.isRead).length;
  const unreadMessages = chatThreads.reduce((sum, chat) => sum + chat.unread, 0);

  res.json({
    summary: {
      name: studentProfile.name,
      major: studentProfile.major,
      year: studentProfile.year,
      semester: studentProfile.semester,
      cgpa: studentProfile.cgpa,
      attendance: studentProfile.attendance,
      streak: studentProfile.streak,
      unreadAnnouncements,
      unreadMessages,
    },
  });
});
