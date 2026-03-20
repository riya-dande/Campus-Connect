import { Router } from "express";
import { getAnnouncements, markAnnouncementRead } from "../../services/data.service";

export const announcementsRouter = Router();

announcementsRouter.get("/", async (_req, res) => {
  const announcements = await getAnnouncements();
  res.json({ announcements });
});

announcementsRouter.patch("/:id/read", async (req, res) => {
  const announcement = await markAnnouncementRead(req.params.id);
  if (!announcement) {
    return res.status(404).json({ message: "announcement not found" });
  }
  return res.json({ announcement });
});
