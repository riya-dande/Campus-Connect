import { Router } from "express";
import { announcements } from "../../data/mockDb";

export const announcementsRouter = Router();

announcementsRouter.get("/", (_req, res) => {
  res.json({ announcements });
});

announcementsRouter.patch("/:id/read", (req, res) => {
  const announcement = announcements.find((item) => item.id === req.params.id);
  if (!announcement) {
    return res.status(404).json({ message: "announcement not found" });
  }
  announcement.isRead = true;
  return res.json({ announcement });
});
