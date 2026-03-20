import { Router } from "express";
import { getChatThreads, getCounsellors } from "../../services/data.service";

export const communicationRouter = Router();

communicationRouter.get("/chats", async (_req, res) => {
  const chats = await getChatThreads();
  res.json({ chats });
});

communicationRouter.get("/counsellors", async (_req, res) => {
  const counsellors = await getCounsellors();
  res.json({ counsellors });
});
